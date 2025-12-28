import { Code, lines, makeScene2D, word } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Cursor, Grid, ViewportManager } from "../nodes";
import { all, createRef, DEFAULT, Direction, Reference, slideTransition, waitUntil } from "@motion-canvas/core";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import eqh1 from "../images/s15/eqh1.png";
import eqh2 from "../images/s15/eqh2.png";
import eqv1 from "../images/s15/eqv1.png";
import eqv2 from "../images/s15/eqv2.png";

export default makeScene2D(function*(view) {
  view.fontFamily('Geist');
  view.fill(colors.zinc[950]);
  // view.add(<Grid />);
  const cursor = createRef<Cursor>();
  view.add(
    <>
      <Cursor
        ref={cursor}
        color="green"
        opacity={0}
        position={[spaceX[0.5], spaceNY[2.75]]}
      />
    </>
  )

  const viewportManager = new ViewportManager()
    .addHtml(`\
<h1>Heading</h1>

<p>Outside paragraph</p>

<div class="sidebar">
  <p>Sidebar paragraph</p>
</div>
`)
    .addCss(`\
h1, .sidebar p {
  color: blue;
}
`)
    .addBrowser();

  viewportManager.addToView(view);
  const wrapper = viewportManager.getWrapper();
  const refs = viewportManager.getViewportRefs();
  const htmlCode: Reference<Code> = refs.html?.code;
  const cssCode: Reference<Code> = refs.css?.code;

  yield* all(
    viewportManager.animateToPresetLayout("EQ_H", { duration: 0.75, browserImage: eqh1 }),
    htmlCode().selection(word(0, 0, 0), 0.75),
    slideTransition(Direction.Right, 0.75),
  );

  yield* waitUntil("this-rule");
  yield* all(
    cursor().opacity(1, 0.75),
    cursor().position([spaceNX[0.5], spaceNY[3.75]], 0.75),
  )

  yield* waitUntil("space-special");
  yield* cursor().position([spaceNX[0.5] - 10, spaceNY[4.5] + 8], 0.75);

  yield* waitUntil("selects-paras");
  yield* all(
    htmlCode().selection(DEFAULT, 0.75),
    cursor().position([spaceNX[6], spaceNY[2]], 0.75).wait(0.5).to([spaceNX[6.25], spaceNY[2.5]], 0.75),
  )

  yield* waitUntil("that-space");
  viewportManager.updateLayoutDimensions(spaceX[18], spaceY[4]);
  yield* all(
    viewportManager.animateToPresetLayout("EQ_H", { duration: 0.75, browserImage: eqh2 }),
    wrapper().size([spaceX[18], spaceY[4]], 0.75),
    wrapper().y(spaceNY[3], 0.75),
  )
  yield* waitUntil("descendant-combinator");
  const desComb = createRef<ExtendedTxt>();
  const desComb1 = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={desComb}
        fontSize={spaceY[0.5]}
      />
      <ExtendedTxt
        ref={desComb1}
        fontSize={spaceY[0.5]}
        y={spaceY[1]}
        text={"→ selects elements inside other elements"}
        opacity={0}
      />
    </>
  )

  yield* all(
    desComb().text("Space = Descendant Combinator", 1.75),
    cursor().opacity(0, 0.75),
    cursor().position([spaceNX[5.25], spaceNY[1.5]], 0.75),
  );

  yield* waitUntil("it-selects");
  yield* all(
    desComb1().opacity(1, 0.75),
    desComb().fontSize(spaceY[0.33], 0.75),
  )

  yield* waitUntil("dont-worry");
  const dontWorry = createRef<ExtendedTxt>();
  const anotherVid = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={dontWorry}
        fontSize={spaceY[0.5]}
        text={"Don't worry 😌"}
        opacity={0}
        y={spaceY[3]}
      />
      <ExtendedTxt
        ref={anotherVid}
        fontSize={spaceY[0.5]}
        text={"Combinators are a topic for another video ✨"}
        opacity={0}
        y={spaceY[4]}
      />
    </>
  )
  yield* dontWorry().opacity(1, 0.75);
  yield* anotherVid().opacity(1, 0.75);

  yield* waitUntil("heres-where")
  viewportManager.updateLayoutDimensions(spaceX[18], spaceY[10]);
  yield* all(
    viewportManager.animateToPresetLayout("EQ_V", { duration: 0.75, browserImage: eqv1 }),
    wrapper().size([spaceX[18], spaceY[10]], 0.75),
    wrapper().y(spaceY[0], 0.75),
    htmlCode().code.replace(lines(0, 6), `\
<p>
  Use <strong>bold text</strong>,
  add a <a href="#">link</a>,
  or wrap content in a <span>span</span>.
</p>
`, 0.75),
    cssCode().code.replace(lines(0, 2), `\
p * {
  color: red;
}
`, 0.75),
    desComb().opacity(0, 0.75),
    desComb1().opacity(0, 0.75),
    dontWorry().opacity(0, 0.75),
    anotherVid().opacity(0, 0.75),
  )

  yield* waitUntil("combine-with");
  cursor().position([spaceNX[7.33], spaceY[0]]);
  yield* all(
    cursor().opacity(1, 0.75),
    cursor().position([spaceNX[8.33], spaceNY[1]], 0.75),
  )
  yield* cursor().position([spaceNX[8.5] - 4, spaceNY[1]], 0.75)

  yield* waitUntil("this-reads")
  const evenNested = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={evenNested}
        text={"p * → selects all elements inside <p>\n(even deeply nested)"}
        textAlign={"center"}
        opacity={0}
      />
    </>
  )
  yield* all(
    evenNested().opacity(1, 0.75),
    cursor().position([0, spaceY[0.5]], 0.75)
  );

  yield* waitUntil("p-has")
  yield* cursor().position([spaceNX[8.5], spaceNY[4.5]], 0.75);
  yield* waitUntil("bold");
  yield* cursor().position([spaceNX[5.67], spaceNY[4]], 0.75);
  yield* cursor().position([spaceNX[7.25] + 8, spaceNY[3.5]], 0.75);
  yield* cursor().position([spaceNX[4.5], spaceNY[3]], 0.75);

  yield* waitUntil("all-of-them")
  yield* cursor().position([spaceNX[8], spaceY[3]], 0.75).to([spaceNX[3], spaceY[3]], 0.75);

  yield* waitUntil("but-the-para")
  yield* cursor().position([spaceNX[4.5], spaceY[3]], 0.75);

  yield* waitUntil("scratching")
  viewportManager.updateLayoutDimensions(spaceX[9], spaceY[10]);
  yield* all(
    viewportManager.animateToPresetLayout("EQ_V", { duration: 0.75, browserImage: eqv2 }),
    wrapper().size([spaceX[9], spaceY[10]], 0.75),
    wrapper().x(spaceNX[4.5], 0.75),
    evenNested().opacity(0, 0.75),
    cursor().opacity(0, 0.75),
    cursor().position([spaceNX[3.5], spaceY[4]], 0.75),
  )

  yield* waitUntil("upcoming")
  const upcoming = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={upcoming}
        text={"Coming up next 👀\n• Combinators\n• Pseudo-classes\n• Pseudo-elements"}
        x={spaceX[4.5]}
        fontSize={spaceY[0.5]}
        opacity={0}
      />
    </>
  )
  yield* upcoming().opacity(1, 0.75),

    yield* waitUntil("s15-end");

})
