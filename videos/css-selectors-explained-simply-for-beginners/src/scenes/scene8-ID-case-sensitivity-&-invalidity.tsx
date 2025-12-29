import { Circle, Code, Img, Line, lines, makeScene2D } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Cursor, ExtendedRect, Face, Grid, ViewportManager } from "../nodes";
import { all, createRef, DEFAULT, delay, Direction, Reference, slideTransition, waitUntil } from "@motion-canvas/core";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import eqh1 from "../images/s8/eqh1.png";
import eqh2 from "../images/s8/eqh2.png";
import eqh3 from "../images/s8/eqh3.png";
import pass1 from "../images/passportBlack.png"
import pass2 from "../images/passportBlack1.png"

export default makeScene2D(function*(view) {
  view.fontFamily('Geist');
  view.fill(colors.zinc[950]);
  // view.opacity(0.7);
  // view.add(<Grid />);

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
  cursor().position([spaceNX[5.5], spaceY[0]])
  yield* all(
    htmlCode().code.append(`\
<div id="highlight">
  Second element using #highlight
</div>
`, 0.75),
    delay(0.5, cursor().opacity(1, 0.75)),
    delay(0.5, cursor().position([spaceNX[6.5], spaceNY[1]], 0.75)),
  );

  yield* waitUntil("this-breaks-one-per-page");
  yield* all(
    htmlCode().code.insert([3, 20], ` ❌`, 0.75),
    cursor().position([spaceNX[5.5], spaceY[0]], 0.75),
    cursor().opacity(0, 0.75),
  )

  yield* waitUntil("css-might-work");
  yield* all(
    cursor().position([spaceNX[1.5], spaceNY[2]], 0.75),
    cursor().opacity(1, 0.75),
  )

  yield* waitUntil("style-both-elements");
  yield* all(
    cursor().position([spaceX[4.5], spaceNY[1.67]], 0.75),
  )

  yield* waitUntil("but-invalid-HTML");
  yield* all(
    cursor().position([spaceNX[5], spaceNY[1]], 0.75),
  )

  viewportManager.updateLayoutDimensions(spaceX[18], spaceY[3]);

  yield* waitUntil("think-of-it-like");
  const face1 = createRef<Face>();
  const face2 = createRef<Face>();
  const subTxt = createRef<ExtendedTxt>();
  const passport1 = createRef<Img>();
  const passport2 = createRef<Img>();

  view.add(
    <>
      <Img
        ref={passport1}
        src={pass1}
        radius={16}
        scale={0.6}
        y={spaceY[1.75]}
        opacity={0}
      />
      <Img
        ref={passport2}
        src={pass2}
        radius={16}
        scale={0.6}
        y={spaceY[1.75]}
        opacity={0}
      />
      <Face
        ref={face1}
        y={spaceY[4.5]}
        opacity={0}
        scale={0.75}
      />
      <Face
        ref={face2}
        y={spaceY[4.5]}
        opacity={0}
        scale={0.75}
      />
      <ExtendedTxt
        ref={subTxt}
        position={[spaceX[4], spaceY[4.5]]}
        text={"❌"}
        fontSize={spaceY[0.5]}
        fontWeight={500}
        opacity={0}
      />
    </>
  );

  yield* all(
    passport1().opacity(1, 0.75),
    face1().opacity(1, 0.75),
    passport1().x(spaceNX[3], 0.75),
    face1().x(spaceNX[3], 0.75),
    passport2().opacity(1, 0.75),
    passport2().x(spaceX[3], 0.75),
    face2().opacity(1, 0.75),
    face2().x(spaceX[3], 0.75),
    cursor().position([spaceNX[4], spaceY[0]], 0.75),
    cursor().opacity(0, 0.75),
    viewportManager.animateToPresetLayout('EQ_H', { duration: 0.75, browserImage: eqh3 }),
    wrapper().size([spaceX[18], spaceY[3]], 0.75),
    wrapper().y(spaceNY[2.25], 0.75),
  )
  cursor().position([spaceX[2.5], spaceY[2.25]]);
  yield* all(
    subTxt().opacity(1, 0.75),
    cursor().opacity(1, 0.75),
    cursor().position([spaceX[3.5], spaceY[3.25]], 0.75),
  );

  yield* waitUntil("total-chaos");
  yield* all(
    subTxt().text("🚨", 0.75),
    cursor().opacity(0, 0.75),
    cursor().position([spaceX[4.5], spaceY[4.25]], 0.75),
  );

  yield* waitUntil("browser-wont-show-error")
  viewportManager.updateLayoutDimensions(spaceX[18], spaceY[8])
  yield* all(
    passport1().opacity(0, 0.75),
    passport1().y(spaceY[3.5], 0.75),
    passport2().opacity(0, 0.75),
    passport2().y(spaceY[3.5], 0.75),
    face1().opacity(0, 0.75),
    face1().scale(0, 0.75),
    face2().opacity(0, 0.75),
    face2().scale(0, 0.75),
    subTxt().opacity(0, 0.75),
    wrapper().size([spaceX[18], spaceY[8]], 0.75),
    wrapper().y(spaceY[1], 0.75),
    viewportManager.animateToPresetLayout('EQ_H', { duration: 0.75, browserImage: eqh2 }),
  )

  yield* waitUntil("behave-unpredictably")
  yield* title().text("Duplicate IDs 👎🏻", 0.75);

  yield* waitUntil("keep-ids-unique")
  viewportManager.removeViewport("browser");
  yield* all(
    htmlCode().code.replace(lines(0, 5), `\
<body>
  <h1 id="main-title">
    ... 
  </h1>
  <section id="hero-section">
    ... 
  </section>
  ...
</body>
`, 0.75),
    cssCode().code.replace(lines(0, 2), `\
#main-title {
  font-size: 2rem;
  font-weight: 700;
}
#hero-section {
  padding: 20px;
  background: #f0f8ff;
}
`, 0.75),
    viewportManager.animateToLayout({ duration: 0.75 }),
    title().text("", 0.75).to("IDs Must Be Unique", 0.75),
  )

  yield* waitUntil("s8-end");
})
