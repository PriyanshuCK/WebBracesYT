import { Circle, Code, Img, Layout, lines, makeScene2D, Rect, Spline } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Cursor, ExtendedRect, Grid, ViewportManager } from "../nodes";
import { all, createRef, delay, Direction, Reference, slideTransition, waitUntil } from "@motion-canvas/core";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import eqh1 from "../images/s4/eqh1.png";
import beq1 from "../images/s4/beq1.png";
import css_spec from "../images/s4/css-spec-case-insensitivity.png"

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
    .addCss(`\
.myclass {
  font-size: 1rem;
}
.MyClass {
  font-size: 2rem;
}
.MYCLASS {
  font-size: 3rem;
}
`)
    .addBrowser(eqh1);

  viewportManager.addToView(view);
  const refs = viewportManager.getViewportRefs();
  const htmlCode: Reference<Code> = refs.html?.code;
  const cssCode: Reference<Code> = refs.css?.code;
  const browserViewport = refs.browser?.viewport;

  const cursor = createRef<Cursor>();
  view.add(
    <>
      <Cursor ref={cursor} position={[spaceX[6.5], spaceNY[0.5]]} opacity={0} color={"green"} />
    </>
  );

  yield* all(
    slideTransition(Direction.Right, 0.75),
    viewportManager.animateToPresetLayout('EQ_H'),
  );

  yield* all(
    cursor().opacity(1, 0.75),
    cursor().position([spaceX[5.5], spaceNY[2.25]], 0.75),
  );

  yield* waitUntil("exactly-as");
  yield* all(
    cursor().position([spaceNX[6], spaceNY[1.5]], 1),
    htmlCode().selection(htmlCode().findAllRanges(/class="[^"]+"/g), 0.75),
    cssCode().selection(lines(9), 0.75),
  );

  yield* waitUntil("these-three");
  yield* cursor().position([spaceNX[6.25], spaceNY[4.5]], 1);

  yield* waitUntil("completely-different");
  yield* all(
    cursor().position([spaceNX[2.25], spaceNY[4.5]], 1),
    cssCode().selection(
      cssCode().findAllRanges(/\.[A-Za-z_][A-Za-z0-9_-]*/g),
      0.75
    ),
  );
  yield* cursor().position([spaceNX[1.25], spaceNY[1.75]], 1);

  yield* waitUntil("why-confusion");

  const wrapper = viewportManager.getWrapper();
  const whyConfusion = createRef<ExtendedTxt>();
  view.add(
    <ExtendedTxt ref={whyConfusion} y={spaceNY[4.5]} fontSize={spaceY[0.5]} fontWeight={500} opacity={0} />
  );

  viewportManager.updateLayoutDimensions(spaceX[18], spaceY[8]);
  yield* all(
    wrapper().size([spaceX[18], spaceY[8]], 0.75),
    wrapper().y(spaceY[1], 0.75),
    whyConfusion().text("Here's why people get confused!", 1),
    viewportManager.animateToPresetLayout('B_EQ', { browserImage: beq1 }),
    whyConfusion().opacity(1, 0.75),
    cursor().opacity(0, 0.75),
    htmlCode().fontSize(spaceY[0.25], 0.75),
    cssCode().fontSize(spaceY[0.25], 0.75),
  );

  yield* browserViewport().opacity(0, 0.75);

  yield* waitUntil("cssDoesntCare");
  const cssSpecImg = createRef<Rect>();
  const cssArc = createRef<Circle>();
  const cssDoesntCare = createRef<ExtendedTxt>();
  view.add(
    <>
      <Rect
        ref={cssSpecImg}
        layout
        position={[spaceX[4.5], spaceY[1]]}
        lineWidth={8}
        radius={12}
        stroke={colors.violet[500]}
        scale={0.5}
        opacity={0}
      >
        <Img
          src={css_spec}
          radius={12}
        />
      </Rect>
      <Circle
        ref={cssArc}
        stroke={colors.slate[0]}
        lineWidth={4}
        height={spaceY[4]}
        width={spaceX[6]}
        startAngle={-90}
        endAngle={-90}
        opacity={0}
        lineCap={"round"}
        endArrow
        arrowSize={16}
      />
      <ExtendedTxt
        ref={cssDoesntCare}
        position={[spaceX[5], spaceNY[2]]}
      />
    </>
  )

  yield* cssSpecImg().opacity(1, 0.75);
  yield* all(
    cssArc().opacity(1, 0.75),
    cssArc().endAngle(-18, 0.75),
  );
  yield* cssDoesntCare().text("CSS treats selectors case-insensitively", 1.5);

  yield* waitUntil("s4-end");
});
