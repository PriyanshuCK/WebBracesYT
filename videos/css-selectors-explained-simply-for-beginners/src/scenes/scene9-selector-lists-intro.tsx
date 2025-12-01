import { Layout, makeScene2D } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Cursor, Grid, ViewportManager } from "../nodes";
import { all, createRef, delay, Direction, slideTransition, waitUntil } from "@motion-canvas/core";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";

export default makeScene2D(function*(view) {
  view.fontFamily('Geist');
  view.fill(colors.zinc[950]);
  // view.opacity(0.7);
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

  yield* waitUntil("s9-end");
})
