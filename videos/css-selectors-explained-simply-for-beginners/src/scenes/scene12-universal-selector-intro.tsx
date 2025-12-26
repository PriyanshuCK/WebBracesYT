import { Code, Img, Layout, lines, makeScene2D } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { CSSCode, Cursor, Grid } from "../nodes";
import { all, createRef, Direction, slideTransition, waitFor, waitUntil } from "@motion-canvas/core";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import ss1 from "../images/s12/eqh1.png"
import ss2 from "../images/s12/eqh2.png"

export default makeScene2D(function*(view) {
  view.fontFamily('Geist');
  view.fill(colors.zinc[950]);
  // view.add(<Grid />);

  const table = createRef<Layout>();
  const leftColumn = createRef<Layout>();
  const rightColumn = createRef<Layout>();
  const selector1 = createRef<ExtendedTxt>();
  const selects1 = createRef<ExtendedTxt>();
  const selector2 = createRef<ExtendedTxt>();
  const selects2 = createRef<ExtendedTxt>();
  const selector3 = createRef<ExtendedTxt>();
  const selects3 = createRef<ExtendedTxt>();
  const selector4 = createRef<ExtendedTxt>();
  const selects4 = createRef<ExtendedTxt>();
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
          height={spaceY[3]}
          justifyContent="space-around"
        >
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
          <ExtendedTxt
            ref={selector4}
            text="Selector lists (,)"
            fontSize={spaceY[0.33] + 4}
            opacity={0}
          />
        </Layout>

        <Layout
          ref={rightColumn}
          layout
          direction="column"
          height={spaceY[3]}
          justifyContent="space-around"
        >
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
          <ExtendedTxt
            ref={selects4}
            text="shares styles across multiple selectors"
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
  cursor().position([spaceNX[2], spaceY[0.25]]);
  yield* all(
    cursor().opacity(1, 0.75),
    cursor().position([spaceNX[3] - 8, spaceNY[0.75]], 0.75),
    selector2().opacity(1, 0.75),
    selects2().opacity(1, 0.75),
  )

  yield* waitUntil("class-selectors");
  yield* all(
    selector1().opacity(1, 0.75),
    selects1().opacity(1, 0.75),
    cursor().position([spaceNX[2.75], spaceY[0]], 0.75),
  )

  yield* waitUntil("id-selectors");
  yield* all(
    selector3().opacity(1, 0.75),
    selects3().opacity(1, 0.75),
    cursor().position([spaceNX[2.75], spaceY[0.67]], 0.75),
  )

  yield* waitUntil("selector-lists");
  yield* all(
    selector4().opacity(1, 0.75),
    selects4().opacity(1, 0.75),
    cursor().position([spaceNX[1] + 8, spaceY[1.33]], 0.75),
  )

  yield* waitUntil("select-every");
  const ssOne = createRef<Img>();
  const ssTwo = createRef<Img>();
  const arrTxt = createRef<ExtendedTxt>();
  const css = createRef<Code>();
  view.add(
    <>
      <Img
        ref={ssOne}
        src={ss1}
        radius={32}
        stroke={colors.emerald[500]}
        lineWidth={16}
        y={spaceY[1]}
        opacity={0}
        scale={0.5}
      />
      <Img
        ref={ssTwo}
        src={ss2}
        radius={32}
        stroke={colors.emerald[500]}
        lineWidth={16}
        opacity={0}
        scale={0.5}
      />
      <ExtendedTxt
        ref={arrTxt}
        text={"select every element\n&\nstyle →"}
        textAlign={"center"}
        fontSize={spaceY[0.5]}
        opacity={0}
      />
      <CSSCode
        ref={css}
        code={`\
* {
  outline: 1px solid blue;
}
`}
        opacity={0}
        y={spaceNY[1]}
      />
    </>
  )

  yield* all(
    ssOne().opacity(1, 0.75),
    ssOne().y(0, 0.75),
    table().opacity(0, 0.75),
    table().y(spaceY[1], 0.75),
    cursor().opacity(0, 0.75),
  )

  yield* waitUntil("at-once");
  yield* all(
    ssOne().x(spaceNX[6], 0.75),
    ssTwo().opacity(1, 0.75),
    ssTwo().x(spaceX[6], 0.75),
    arrTxt().opacity(1, 0.75),
  )

  yield* waitUntil("written-with-star");
  yield* all(
    css().opacity(1, 0.75),
    arrTxt().y(spaceY[1], 0.75),
    arrTxt().fontSize(spaceY[0.33], 0.75),
  )

  yield* waitUntil("just-a-star");
  cursor().position([spaceNX[1] - 8, spaceNY[0.67] + 8]);
  yield* all(
    cursor().opacity(1, 0.75),
    cursor().position([spaceNX[2] - 8, spaceNY[1.67] + 8], 0.75),
  )

  yield* waitUntil("so-when-I-write")
  yield* all(
    ssOne().opacity(0, 0.75),
    ssTwo().opacity(0, 0.75),
    arrTxt().opacity(0, 0.75),
    css().y(0, 0.75),
    css().fontSize(spaceY[0.5], 0.75),
    cursor().opacity(0, 0.75),
    css().code.replace(lines(1), `\
  color: blue;
`, 0.75),
  )

  yield* waitUntil("every-element-type")
  cursor().position([spaceNX[0.75], spaceNY[1]]);
  yield* all(
    cursor().opacity(1, 0.75),
    cursor().position([spaceNX[1.75], spaceNY[1]], 0.75),
  )

  yield* waitUntil("make-blue")
  yield* all(
    cursor().position([spaceX[1], spaceNY[0.25] + 8], 0.75),
  )

  yield* waitUntil("s12-end");
})
