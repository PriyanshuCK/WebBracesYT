import { Code, Layout, makeScene2D } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Cursor, Grid, ViewportManager } from "../nodes";
import { all, createRef, delay, Direction, Reference, slideTransition, waitUntil } from "@motion-canvas/core";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";

export default makeScene2D(function*(view) {
  view.fontFamily('Geist');
  view.fill(colors.zinc[950]);
  // view.opacity(0.3);
  // view.add(<Grid />);

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
          />
          <ExtendedTxt
            ref={selector1}
            text=".highlight"
            fontSize={spaceY[0.33] + 4}
            fill={"#f7cd7a"}
          />
          <ExtendedTxt
            ref={selector3}
            text="#highlight"
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
          />
          <ExtendedTxt
            ref={selects1}
            text="elements with the highlight class"
            fontSize={spaceY[0.33]}
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

  yield* all(
    slideTransition(Direction.Right, 0.75),
    delay(0.5, cursor().opacity(1, 0.75)),
    delay(0.5, cursor().position([spaceNX[1.75], spaceY[0.75] + 8], 0.75)),
  )

  yield* waitUntil("id-selectors-let");
  yield* all(
    selector3().opacity(1, 0.75),
    selects3().opacity(1, 0.75),
    cursor().position([spaceNX[1.75], spaceY[1.75] + 8], 0.75),
  )

  yield* cursor().x(spaceX[5] - 8, 1.75);

  yield* waitUntil("one-crucial-difference");
  yield* all(
    cursor().position([spaceX[6], spaceY[2.75]], 0.75),
    cursor().opacity(0, 0.75),
  );

  yield* waitUntil("while-you-can-give")
  const viewportManager = new ViewportManager()
    .addHtml()
    .addCss();

  viewportManager.addToView(view);
  const wrapper = viewportManager.getWrapper();
  const refs = viewportManager.getViewportRefs();
  const htmlCode: Reference<Code> = refs.html?.code;
  const cssCode: Reference<Code> = refs.css?.code;

  viewportManager.updateLayoutDimensions(spaceX[18], spaceY[3]);
  yield* all(
    viewportManager.animateToLayout({ duration: 0.75 }),
    wrapper().size([spaceX[18], spaceY[3]], 0.75),
    wrapper().y(spaceNY[3.5], 0.75),
    table().y(spaceY[1], 0.75),
  );

  cursor().position([spaceNX[5.33] - 8, spaceNY[2.5]]);
  yield* all(
    htmlCode().code.append(`\
<!-- Reusing classes: 👍 -->
<div class="card">Card 1</div>
<div class="card">Card 2</div>
`, 0.75),
    cssCode().code.append(`\
.card {
  padding: 1rem;
  background: #f0f0f0;
  border-radius: 8px;
}
`, 0.75),
    cursor().opacity(1, 0.75),
    cursor().position([spaceNX[6.33] - 8, spaceNY[3.5]], 0.75),
  );

  yield* waitUntil("an-id-must-be-unique")
  viewportManager.updateLayoutDimensions(spaceX[18], spaceY[4]);
  yield* all(
    table().y(spaceY[2], 0.75),
    htmlCode().code.append(`\

<!-- Reusing IDs: ❌ (invalid) -->
<p id="title">Heading</p>
<p id="title">Another Heading</p>
`, 0.75),
    cssCode().code.append(`\
#title {
  color: blue;
}
`, 0.75),
    wrapper().size([spaceX[18], spaceY[4]], 0.75),
    wrapper().y(spaceNY[3], 0.75),
    viewportManager.animateToLayout({ duration: 0.75 }),
    cursor().position([spaceNX[7.25] + 8, spaceNY[1.75] + 8], 0.75),
  )

  yield* cursor().position([spaceNX[4.5] + 8, spaceNY[2.5]], 0.75)

  yield* waitUntil("s5-end");
});
