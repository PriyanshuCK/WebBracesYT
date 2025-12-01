import { Code, Layout, lines, makeScene2D, word } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Cursor, Grid, ViewportManager } from "../nodes";
import { all, createRef, delay, Direction, Reference, slideTransition, waitUntil } from "@motion-canvas/core";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import beq1 from "../images/s9/beq1.png"
import eqh1 from "../images/s9/eqh1.png"

export default makeScene2D(function*(view) {
  view.fontFamily('Geist');
  view.fill(colors.zinc[950]);
  view.opacity(0.7);
  view.add(<Grid />);

  const table = createRef<Layout>();
  const leftColumn = createRef<Layout>();
  const rightColumn = createRef<Layout>();
  const selectorHeader = createRef<ExtendedTxt>();
  const selectsHeader = createRef<ExtendedTxt>();
  const selector1 = createRef<ExtendedTxt>();
  const selects1 = createRef<ExtendedTxt>();
  const selector2 = createRef<ExtendedTxt>();
  const selects2 = createRef<ExtendedTxt>();
  const selector3 = createRef<ExtendedTxt>();
  const selects3 = createRef<ExtendedTxt>();
  const cursor = createRef<Cursor>();
  view.add(
    <>
      <Layout
        ref={table}
        layout
        gap={spaceX[1]}
        position={[spaceX[1.25], spaceY[0]]}
      >
        <Layout
          ref={leftColumn}
          layout
          direction="column"
          height={spaceY[4]}
          justifyContent="space-around"
        >
          <ExtendedTxt
            ref={selectorHeader}
            text="Selector"
            fontSize={spaceY[0.5]}
            fontWeight={500}
          />
          <ExtendedTxt
            ref={selector2}
            text="p"
            fontSize={spaceY[0.33] + 4}
            fill={"#e0787b"}
            opacity={0}
          />
          <ExtendedTxt
            ref={selector1}
            text=".card"
            fontSize={spaceY[0.33] + 4}
            fill={"#f7cd7a"}
            opacity={0}
          />
          <ExtendedTxt
            ref={selector3}
            text="#title"
            fontSize={spaceY[0.33] + 4}
            fill={"#8aa9f9"}
            opacity={0}
          />
        </Layout>

        <Layout
          ref={rightColumn}
          layout
          direction="column"
          height={spaceY[4]}
          justifyContent="space-around"
        >
          <ExtendedTxt
            ref={selectsHeader}
            text="Selects"
            fontSize={spaceY[0.5]}
            fontWeight={500}
          />
          <ExtendedTxt
            ref={selects2}
            text="all <p> elements"
            fontSize={spaceY[0.33]}
            opacity={0}
          />
          <ExtendedTxt
            ref={selects1}
            text="elements with the highlight class"
            fontSize={spaceY[0.33]}
            opacity={0}
          />
          <ExtendedTxt
            ref={selects3}
            text="the element with the highlight id"
            fontSize={spaceY[0.33]}
            opacity={0}
          />
        </Layout>
      </Layout>
      <Cursor
        ref={cursor}
        color={"green"}
        opacity={0}
        y={spaceY[1.75]}
      />
    </>
  );

  yield* slideTransition(Direction.Right, 0.75);

  yield* waitUntil("type-selectors");
  cursor().position([spaceNX[1.33], spaceY[0.5]]);
  yield* all(
    cursor().opacity(1, 0.75),
    cursor().position([spaceNX[2.33], -8], 0.75),
    selector2().opacity(1, 0.75),
    selects2().opacity(1, 0.75),
  )
  yield* all(
    selector1().opacity(1, 0.75),
    selects1().opacity(1, 0.75),
    cursor().position([spaceNX[2.25], spaceY[0.75]], 0.75),
  )

  yield* all(
    selector3().opacity(1, 0.75),
    selects3().opacity(1, 0.75),
    cursor().position([spaceNX[2.25], spaceY[1.75]], 0.75),
  )

  yield* waitUntil("lets-talk");
  yield* all(
    cursor().opacity(0, 0.75),
    cursor().position([spaceNX[1.25], spaceY[2.75]], 0.75),
  )

  yield* waitUntil("selector-lists-title");
  const title = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={title}
        fontSize={spaceY[0.67]}
        fontWeight={600}
      />
    </>
  )
  yield* all(
    selectorHeader().opacity(0, 0.75),
    selectsHeader().opacity(0, 0.75),
    selector1().opacity(0, 0.75),
    selects1().opacity(0, 0.75),
    selector2().opacity(0, 0.75),
    selects2().opacity(0, 0.75),
    selector3().opacity(0, 0.75),
    selects3().opacity(0, 0.75),
    delay(0.5, title().text("Selector Lists", 1)),
  )

  yield* waitUntil("instead-of")
  yield* all(
    title().y(spaceNY[4.5], 0.75),
  )

  yield* waitUntil("separate-rules");
  const column1 = createRef<Layout>();
  const column2 = createRef<Layout>();
  const column3 = createRef<Layout>();
  const h1 = createRef<ExtendedTxt>();
  const h2 = createRef<ExtendedTxt>();
  const h3 = createRef<ExtendedTxt>();
  const arrow1 = createRef<ExtendedTxt>();
  const arrow2 = createRef<ExtendedTxt>();
  const arrow3 = createRef<ExtendedTxt>();
  const blue1 = createRef<ExtendedTxt>();
  const blue2 = createRef<ExtendedTxt>();
  const blue3 = createRef<ExtendedTxt>();
  view.add(
    <>
      <Layout
        ref={column1}
        layout
        direction="column"
        x={spaceNX[1.5]}
        gap={spaceY[0.25]}
      >
        <ExtendedTxt
          ref={h1}
          text="h1"
          fontSize={spaceY[0.5]}
          opacity={0}
          fill={"#F07178"}
        />
        <ExtendedTxt
          ref={h2}
          text="h2"
          fontSize={spaceY[0.5]}
          opacity={0}
          fill={"#F07178"}
        />
        <ExtendedTxt
          ref={h3}
          text="h3"
          fontSize={spaceY[0.5]}
          opacity={0}
          fill={"#F07178"}
        />
      </Layout>
      <Layout
        ref={column2}
        layout
        direction="column"
        gap={spaceY[0.25]}
      >
        <ExtendedTxt
          ref={arrow1}
          text="→"
          fontSize={spaceY[0.5]}
          opacity={0}
        />
        <ExtendedTxt
          ref={arrow2}
          text="→"
          fontSize={spaceY[0.5]}
          opacity={0}
        />
        <ExtendedTxt
          ref={arrow3}
          text="→"
          fontSize={spaceY[0.5]}
          opacity={0}
        />
      </Layout>
      <Layout
        ref={column3}
        layout
        direction="column"
        x={spaceX[1.5]}
        gap={spaceY[0.25]}
      >
        <ExtendedTxt
          ref={blue1}
          text={"blue"}
          fill={colors.blue[500]}
          fontSize={spaceY[0.5]}
          opacity={0}
        />
        <ExtendedTxt
          ref={blue2}
          text={"blue"}
          fontSize={spaceY[0.5]}
          fill={colors.blue[500]}
          opacity={0}
        />
        <ExtendedTxt
          ref={blue3}
          text={"blue"}
          fill={colors.blue[500]}
          fontSize={spaceY[0.5]}
          opacity={0}
        />
      </Layout>
    </>
  )
  yield* all(
    h1().opacity(1, 0.75),
    arrow1().opacity(1, 0.75),
    blue1().opacity(1, 0.75),
    delay(0.2, h2().opacity(1, 0.75)),
    delay(0.2, arrow2().opacity(1, 0.75)),
    delay(0.2, blue2().opacity(1, 0.75)),
    delay(0.4, h3().opacity(1, 0.75)),
    delay(0.4, arrow3().opacity(1, 0.75)),
    delay(0.4, blue3().opacity(1, 0.75)),
  )

  yield* waitUntil("group-together");
  yield* all(
    h1().opacity(0, 0.75),
    arrow1().opacity(0, 0.75),
    blue1().opacity(0, 0.75),
    h3().opacity(0, 0.75),
    arrow3().opacity(0, 0.75),
    blue3().opacity(0, 0.75),
    delay(0.25, h2().text("h1, h2, & h3", 1.25)),
    delay(0.25, column1().x(spaceNX[2], 1.25)),
  )

  yield* waitUntil("lets-say-you-want");
  const viewportManager = new ViewportManager()
    .addHtml()
    .addCss()
    .addBrowser();
  viewportManager.addToView(view);
  const wrapper = viewportManager.getWrapper();
  const refs = viewportManager.getViewportRefs();
  const htmlCode: Reference<Code> = refs.html?.code;
  const cssCode: Reference<Code> = refs.css?.code;

  viewportManager.updateLayoutDimensions(spaceX[18], spaceY[8]);
  viewportManager.removeViewport("css");
  yield* all(
    viewportManager.animateToLayout({ duration: 0.75, browserImage: beq1 }),
    wrapper().size([spaceX[18], spaceY[8]], 0.75),
    wrapper().y(spaceY[1], 0.75),
    htmlCode().code.append(`\
<h1>Main Heading</h1>
<p>
  Some introductory text...
</p>

<h2>Subheading</h2>
<p>
  Details about this section...
</p>

<h3>Section Title</h3>
<p>
  Additional information here...
</p>
`, 0.75),
    h2().opacity(0, 0.75),
    arrow2().opacity(0, 0.75),
    blue2().opacity(0, 0.75),
    title().fontSize(spaceY[0.5], 0.75),
    title().fontWeight(500, 0.75),
  );

  yield* waitUntil("all-your-headings")
  cursor().position([spaceNX[4], spaceNY[2]]);
  yield* all(
    htmlCode().selection(htmlCode().findAllRanges(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/g), 0.75),
  )

  yield* waitUntil("h1")
  yield* all(
    cursor().opacity(1, 0.75),
    cursor().position([spaceNX[7], spaceNY[2.5]], 0.75),
  )
  yield* cursor().position([spaceNX[7.25], spaceY[0]], 0.5);
  yield* cursor().position([spaceNX[6.75], spaceY[2.25]], 0.5);

  yield* waitUntil("without-selector-lists")
  yield* all(
    cursor().opacity(0, 0.75),
    cursor().position([spaceNX[4.25], spaceY[3.25]], 0.75),
  )
  yield* waitUntil("you-would-write-this");
  viewportManager.showViewport("css");
  yield* all(
    viewportManager.animateToPresetLayout("EQ_H", { duration: 0.75, browserImage: eqh1 }),
    cssCode().code.append(`\
h1 {
  color: blue;
}
h2 {
  color: blue;
}
h3 {
  color: blue;
}
`, 0.75),
    cursor().opacity(1, 0.75),
    cursor().position([spaceNX[0.5], spaceY[1.25]], 0.75),
  )

  yield* waitUntil("lots-of-repetition");
  yield* cursor().position([spaceNX[0.5], spaceNY[1.75]], 0.75).to([spaceNX[0.5], spaceY[1.25]], 0.75);

  yield* waitUntil("with-selector-lists");
  yield* all(
    cssCode().code.replace(lines(0, 8), `\
h1, h2, h3 {
  color: blue;
}
`, 0.75),
    cursor().opacity(0, 0.75),
    cursor().position([spaceX[0.5], spaceY[2.25]], 0.75),
  )
  yield* waitUntil("you-can-combine-them");
  cursor().position([spaceNX[1.33], spaceNY[1.5]]);
  yield* all(
    cursor().opacity(1, 0.75),
    cursor().position([spaceNX[2.33] + 4, spaceNY[2.5] + 8], 0.75).wait(0.2).to([spaceNX[1.67] + 8, spaceNY[2.5] + 8], 0.75),
    cssCode().selection(word(0, 0, 10), 0.75),
  )

  yield* waitUntil("reads-as-h1")
  yield* cursor().x(spaceNX[2.5] - 8, 0.75).to(spaceNX[1.75] - 8, 0.75).to(spaceNX[1.25], 0.75);

  yield* waitUntil("should-all-blue");
  yield* all(
    cursor().position([spaceNX[1.33] - 8, spaceNY[2]], 0.75),
    cssCode().selection(lines(1), 0.75),
  )

  yield* waitUntil("s9-end");
})
