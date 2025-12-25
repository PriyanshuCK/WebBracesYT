import { Layout, makeScene2D } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Grid } from "../nodes";
import { all, createRef, delay, Direction, slideTransition, waitUntil } from "@motion-canvas/core";
import spaceX, { spaceNX, spaceY } from "../lib/space";
import { ExtendedTxt } from "../nodes/ExtendedTxt";

export default makeScene2D(function*(view) {
  view.fontFamily('Geist');
  view.fill(colors.zinc[950]);
  // view.opacity(0.7);
  // view.add(<Grid />);

  yield* slideTransition(Direction.Right, 0.75);
  const c1 = createRef<Layout>();
  const c2 = createRef<Layout>();
  const c3 = createRef<Layout>();
  const c1r1 = createRef<ExtendedTxt>();
  const c1r2 = createRef<ExtendedTxt>();
  const c1r3 = createRef<ExtendedTxt>();
  const c1r4 = createRef<ExtendedTxt>();
  const c2r1 = createRef<ExtendedTxt>();
  const c2r2 = createRef<ExtendedTxt>();
  const c2r3 = createRef<ExtendedTxt>();
  const c2r4 = createRef<ExtendedTxt>();
  const c3r1 = createRef<ExtendedTxt>();
  const c3r2 = createRef<ExtendedTxt>();
  const c3r3 = createRef<ExtendedTxt>();
  const c3r4 = createRef<ExtendedTxt>();
  view.add(
    <>
      <Layout
        ref={c1}
        layout
        direction="column"
        gap={spaceY[0.5]}
      // x={spaceNX[7.67] + 8}
      // x={spaceNX[2.67] + 4}
      >
        <ExtendedTxt
          ref={c1r1}
          text={"(space)"}
          opacity={0}
        />
        <ExtendedTxt
          ref={c1r2}
          text={"+"}
          opacity={0}
        />
        <ExtendedTxt
          ref={c1r3}
          text={"~"}
          opacity={0}
        />
        <ExtendedTxt
          ref={c1r4}
          text={">"}
          opacity={0}
        />
      </Layout>
      <Layout
        ref={c2}
        layout
        direction="column"
        gap={spaceY[0.5]}
      //  x={spaceNX[4] + 6}
      // x={spaceX[1]}
      >
        <ExtendedTxt
          ref={c2r1}
          text={"Descendant combinator"}
          fontWeight={300}
          opacity={0}
        />
        <ExtendedTxt
          ref={c2r2}
          text={"Next-sibling combinator"}
          fontWeight={300}
          opacity={0}
        />
        <ExtendedTxt
          ref={c2r3}
          text={"Subsequent-sibling combinator"}
          fontWeight={300}
          opacity={0}
        />
        <ExtendedTxt
          ref={c2r4}
          text={"Child combinator"}
          fontWeight={300}
          opacity={0}
        />
      </Layout>
      <Layout
        ref={c3}
        layout
        direction="column"
        gap={spaceY[0.5]}
      //x={spaceX[3.67]}
      >
        <ExtendedTxt
          ref={c3r1}
          text={"Selects elements anywhere inside another element (at any depth). "}
          fontWeight={300}
          opacity={0}
        />
        <ExtendedTxt
          ref={c3r2}
          text={"Selects elements that are direct children of a given parent."}
          fontWeight={300}
          opacity={0}
        />
        <ExtendedTxt
          ref={c3r3}
          text={"Selects the immediately next sibling element."}
          fontWeight={300}
          opacity={0}
        />
        <ExtendedTxt
          ref={c3r4}
          text={"Selects all siblings that come after the first element."}
          fontWeight={300}
          opacity={0}
        />
      </Layout>
    </>
  )

  yield* all(
    c1r1().opacity(1, 0.75),
    delay(0.2, c1r2().opacity(1, 0.75)),
    delay(0.4, c1r3().opacity(1, 0.75)),
    delay(0.6, c1r4().opacity(1, 0.75)),
  )

  yield* waitUntil("called-combinators");
  yield* all(
    c1().x(spaceNX[2.67] + 4, 0.75),
    c2().x(spaceX[1], 0.75),
    c2r1().opacity(1, 0.75),
    delay(0.2, c2r2().opacity(1, 0.75)),
    delay(0.4, c2r3().opacity(1, 0.75)),
    delay(0.6, c2r4().opacity(1, 0.75)),
  )

  yield* waitUntil("explore-them");
  yield* all(
    c1().x(spaceNX[7.67] + 8, 0.75),
    c2().x(spaceNX[4] + 6, 0.75),
    c3().x(spaceX[3.67], 0.75),
    c3r1().opacity(1, 0.75),
    delay(0.2, c3r2().opacity(1, 0.75)),
    delay(0.4, c3r3().opacity(1, 0.75)),
    delay(0.6, c3r4().opacity(1, 0.75)),
  )

  yield* waitUntil("s10b-end");
});
