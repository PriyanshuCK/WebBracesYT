import { Code, makeScene2D, word } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Cursor, Grid, ViewportManager } from "../nodes";
import { all, createRef, DEFAULT, Direction, Reference, slideTransition, waitUntil } from "@motion-canvas/core";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import eqh1 from "../images/s15/eqh1.png";
import eqh2 from "../images/s15/eqh2.png";

export default makeScene2D(function*(view) {
  view.fontFamily('Geist');
  view.fill(colors.zinc[950]);
  view.add(<Grid />);
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

  yield* desComb().text("Space = Descendant Combinator", 1.75);

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

  yield* waitUntil("s15-end");

})
