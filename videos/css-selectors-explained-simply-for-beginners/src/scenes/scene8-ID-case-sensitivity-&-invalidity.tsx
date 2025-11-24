import { Code, lines, makeScene2D } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Cursor, Grid, ViewportManager } from "../nodes";
import { all, createRef, DEFAULT, delay, Direction, Reference, slideTransition, waitUntil } from "@motion-canvas/core";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import eqh1 from "../images/s8/eqh1.png";
import eqh2 from "../images/s8/eqh2.png";

export default makeScene2D(function*(view) {
  view.fontFamily('Geist');
  view.fill(colors.zinc[950]);
  // view.opacity(0.7);
  view.add(<Grid />);

  const viewportManager = new ViewportManager()
    .addHtml(`\
<p id="myclass">
  Hello World
</p>
<p id="MyClass">
  Hello World
</p>
<p id="MYCLASS">
  Hello World
</p>
`)
    .addCss(`\
#myclass {
  font-size: 1rem;
}
#MyClass {
  font-size: 2rem;
}
#MYCLASS {
  font-size: 3rem;
}
`)
    .addBrowser(eqh1);

  viewportManager.addToView(view);
  const refs = viewportManager.getViewportRefs();
  const htmlCode: Reference<Code> = refs.html?.code;
  const cssCode: Reference<Code> = refs.css?.code;
  const browserViewport = refs.browser?.viewport;
  const wrapper = viewportManager.getWrapper();
  viewportManager.updateLayoutDimensions(spaceX[18], spaceY[8]);

  const cursor = createRef<Cursor>();
  const title = createRef<ExtendedTxt>();
  view.add(
    <>
      <Cursor ref={cursor} position={[spaceNX[5.33], spaceNY[1.5]]} opacity={0} color={"green"} />
      <ExtendedTxt
        ref={title}
        fontSize={spaceY[0.5]}
        fontWeight={500}
        y={spaceNY[4.5]}
      />
    </>
  );

  yield* all(
    wrapper().y(spaceY[1], 0.75),
    wrapper().size([spaceX[18], spaceY[8]], 0.75),
    slideTransition(Direction.Right, 0.75),
    viewportManager.animateToPresetLayout('EQ_H'),
    title().text("ID Naming Rules — Same as Classes!", 1.25),
  );

  yield* waitUntil("IDs-case-sensitive");
  yield* all(
    cursor().opacity(1, 0.75),
    cursor().position([spaceNX[6.5], spaceNY[2.5]], 0.75).to([spaceNX[6.5], spaceY[0.33]], 0.75),
  );

  yield* waitUntil("same-naming-rules");
  viewportManager.removeViewport("browser");
  yield* all(
    htmlCode().code.replace(lines(0, 8), `\
<div id="user-name">
  kebab-case (recommended)
</div>
<div id="user_name">
  snake_case (ok)
</div>
<div id="userName">
  camelCase (ok)
</div>

<div id="1st-item">
  starts with a number (avoid!)
  Allowed by HTML, but problematic for CSS 
selectors
</div>
`, 0.75),
    cssCode().code.replace(lines(0, 8), `\
#user-name {
  font-weight: 700;
}
#user_name {
  font-style: italic;
}
#userName {
  text-decoration: underline;
}

#\\31 st-item {
/* escaping is error-prone and hard to read
   avoid starting with a number */
  color: crimson;
}
`, 0.75),
    viewportManager.animateToLayout({ duration: 0.75 }),
    cursor().opacity(0, 0.75),
  )

  yield* waitUntil("cant-start-with-number");
  yield* all(
    cursor().opacity(1, 0.75),
    cursor().position([spaceNX[7.25] + 6, spaceY[2.25]], 0.75),
    htmlCode().selection(lines(9, 14), 0.75),
    cssCode().selection(lines(10, 15), 0.75),
  )

  yield* waitUntil("stick-with-letters")
  yield* all(
    htmlCode().selection(lines(0, 7), 0.75),
    cssCode().selection(lines(0, 7), 0.75),
    cursor().opacity(0, 0.75),
  )

  yield* waitUntil("hyphens");
  yield* all(
    cursor().opacity(1, 0.75),
    cursor().position([spaceNX[6.5], spaceNY[2.5]], 0.75),
    htmlCode().selection(lines(0, 2), 0.75),
    cssCode().selection(lines(0, 2), 0.75),
  )

  yield* waitUntil("underscores");
  yield* all(
    cursor().position([spaceNX[6.5], spaceNY[1]], 0.75),
    htmlCode().selection(lines(3, 5), 0.75),
    cssCode().selection(lines(3, 5), 0.75),
  )

  yield* waitUntil("same-ID-twice");
  htmlCode().selection(DEFAULT);
  cssCode().selection(DEFAULT);
  viewportManager.showViewport("browser");
  yield* all(
    viewportManager.animateToPresetLayout('EQ_H', { duration: 0.75, browserImage: eqh2 }),
    title().text("Duplicate IDs", 1.25),
    htmlCode().code.replace(lines(0, 14), `\
<div id="highlight">
  First element using #highlight
</div>
`, 0.75),
    cssCode().code.replace(lines(0, 14), `\
#highlight {
  color: green;
}
`, 0.75),
    cursor().opacity(0, 0.5),
  )
  yield* all(
    htmlCode().code.append(`\
<div id="highlight">
  Second element using #highlight
</div>
`, 0.75),
    delay(0.5, cursor().opacity(1, 0.75)),
  );

  yield* waitUntil("s8-end");
})
