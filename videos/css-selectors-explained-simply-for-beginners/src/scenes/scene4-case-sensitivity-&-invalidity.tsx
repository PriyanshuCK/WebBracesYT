import { Code, Layout, makeScene2D } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Cursor, ExtendedRect, Grid, ViewportManager } from "../nodes";
import { all, createRef, Direction, Reference, slideTransition, waitUntil } from "@motion-canvas/core";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import { spaceNX, spaceNY, spaceY } from "../lib/space";

export default makeScene2D(function*(view) {
  view.fontFamily('Geist');
  view.fill(colors.zinc[950]);
  view.opacity(0.3);
  view.add(<Grid />);

  yield* slideTransition(Direction.Right, 0.75);

  const doubtEmoji = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={doubtEmoji}
        text={"🤔"}
        fontSize={spaceY[1]}
        position={[0, spaceY[1]]}
        opacity={0}
        rotation={-15}
      />
    </>
  );

  yield* all(
    doubtEmoji().opacity(1, 0.75),
    doubtEmoji().y(0, 0.75),
    doubtEmoji().rotation(0, 0.75),
  );

  yield* waitUntil("are-case-sensitive");
  const areClassSelectorsCaseSensitive = createRef<ExtendedTxt>();
  const threeSelectorsLayout = createRef<Layout>();
  const selectorsHighlight = createRef<ExtendedRect>();
  const sameOrDifferentTxt = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={areClassSelectorsCaseSensitive}
        fontSize={spaceY[0.75]}
        opacity={0}
        y={spaceNY[3.5]}
      />
      <Layout
        ref={threeSelectorsLayout}
        layout
        direction={"column"}
        gap={spaceY[0.25]}
        opacity={0}
      >
        <ExtendedTxt text={".myclass"} fontSize={spaceY[0.5]} />
        <ExtendedTxt text={".MyClass"} fontSize={spaceY[0.5]} />
        <ExtendedTxt text={".MYCLASS"} fontSize={spaceY[0.5]} />
      </Layout>
      <ExtendedRect
        ref={selectorsHighlight}
        size={0}
        position={[spaceNX[1.5], spaceNY[1.5]]}
        highlighted
        opacity={0}
      />
      <ExtendedTxt
        ref={sameOrDifferentTxt}
        y={spaceY[3.5]}
        opacity={0}
        fontSize={spaceY[0.5]}
      />
    </>
  );

  yield* all(
    doubtEmoji().y(spaceY[1], 0.75),
    doubtEmoji().opacity(0, 0.75),
    doubtEmoji().rotation(15, 0.75),
    areClassSelectorsCaseSensitive().opacity(1, 0.75),
    areClassSelectorsCaseSensitive().text("Are class selectors", 1.5),
    threeSelectorsLayout().opacity(1, 0.75),
    selectorsHighlight().size([spaceY[3], spaceY[3]], 0.75),
    selectorsHighlight().position(0, 0.75),
    selectorsHighlight().opacity(1, 0.75),
  );

  yield* all(
    areClassSelectorsCaseSensitive().text("Are class selectors case-sensitive?", 1),
    sameOrDifferentTxt().text("same or different? 🤔", 1),
    sameOrDifferentTxt().opacity(1, 0.75),
    sameOrDifferentTxt().y(spaceY[2.5], 0.75),
  );

  yield* waitUntil("different");
  yield* sameOrDifferentTxt().text("Different!", 0.75);

  yield* waitUntil("whenWorkingWithHTML");
  const workingWithHTMLTxt = createRef<ExtendedTxt>();
  const classNamesSensitiveTxt = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={workingWithHTMLTxt}
        fontSize={spaceY[0.75]}
      />
      <ExtendedTxt
        ref={classNamesSensitiveTxt}
        fontSize={spaceY[0.75]}
      />
    </>
  )

  yield* all(
    areClassSelectorsCaseSensitive().opacity(0, 0.75),
    threeSelectorsLayout().opacity(0, 0.75),
    selectorsHighlight().end(0, 0.75),
    selectorsHighlight().opacity(0, 0.75),
    sameOrDifferentTxt().opacity(0, 0.75),
    workingWithHTMLTxt().text("When working with HTML,", 1),
  )

  yield* all(
    workingWithHTMLTxt().fontSize(spaceY[0.5], 0.75),
    workingWithHTMLTxt().y(spaceNY[1.5], 0.75),
    classNamesSensitiveTxt().text("class names are case-sensitive!", 1),
  )

  yield* waitUntil("the-browser");

  yield* all(
    workingWithHTMLTxt().opacity(0, 0.5),
    classNamesSensitiveTxt().opacity(0, 0.5),
  );

  const viewportManager = new ViewportManager()
    .addHtml(`\
<p class="myclass">
  Hello World
</p>
<p class="MyClass">
  Hello World
</p>
<p class="MYCLASS">
  Hello World
</p>
`)
    .addCss()
    .addBrowser();

  viewportManager.addToView(view);

  const refs = viewportManager.getViewportRefs();
  const htmlCode: Reference<Code> = refs.html?.code;
  const cssCode: Reference<Code> = refs.css?.code;
  const cssViewport = refs.css?.viewport;

  yield* all(
    slideTransition(Direction.Right, 0.75),
    viewportManager.animateToPresetLayout('EQ_H'),
  );

  const cursor = createRef<Cursor>();
  view.add(
    <>
      <Cursor ref={cursor} position={[spaceNX[4.5], spaceNY[3.5]]} opacity={0} color={"green"} />
    </>
  );

  yield* waitUntil("s4-end");
});
