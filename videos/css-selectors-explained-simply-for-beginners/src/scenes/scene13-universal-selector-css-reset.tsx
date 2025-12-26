import { Img, makeScene2D } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Cursor, ExtendedCircle, ExtendedRect, Grid } from "../nodes";
import { all, createRef, Direction, slideTransition, waitUntil } from "@motion-canvas/core";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import ua1Img from "../images/s13/ua1.png";

export default makeScene2D(function*(view) {
  view.fontFamily('Geist');
  view.fill(colors.zinc[950]);
  view.add(<Grid />);

  yield* slideTransition(Direction.Right);

  const mostUse = createRef<ExtendedTxt>();
  const cssReset = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={mostUse}
        text={"Most common use of the universal selector"}
        fontSize={spaceY[0.5]}
        opacity={0}
      />
      <ExtendedTxt
        ref={cssReset}
        fontSize={spaceY[0.5]}
        fontWeight={600}
      />
    </>
  )

  yield* all(
    mostUse().opacity(1, 0.75),
  )

  yield* waitUntil("css-reset");
  yield* all(
    mostUse().fontSize(spaceY[0.33], 0.75),
    mostUse().y(spaceNY[1], 0.75),
  )

  yield* cssReset().text("CSS Reset", 1);

  yield* waitUntil("every-browser-gives")
  const ua1 = createRef<Img>();
  const rect1 = createRef<ExtendedRect>();
  const circle1 = createRef<ExtendedCircle>();
  const cursor = createRef<Cursor>();
  view.add(
    <>
      <Img
        ref={ua1}
        src={ua1Img}
        scale={0.3}
        y={spaceY[1] + 12}
        opacity={0}
      />
      <ExtendedRect
        ref={rect1}
        size={[spaceX[4.5], spaceY[0.75] + 8]}
        position={[spaceX[2] - 12, spaceY[1] + 8]}
        lineWidth={6}
        opacity={0}
        scale={0.5}
      />
      <ExtendedCircle
        ref={circle1}
        size={spaceY[0.67]}
        position={[spaceNX[5.75] + 5, spaceNY[2.25] + 2]}
        lineWidth={8}
        opacity={0}
        scale={0.5}
      />
      <Cursor
        ref={cursor}
        color={"green"}
        opacity={0}
        position={[spaceX[1.25], spaceY[2]]}
      />
    </>
  )
  yield* all(
    ua1().opacity(1, 0.75),
    mostUse().opacity(0, 0.75),
    cssReset().opacity(0, 0.75),
    ua1().y(8, 0.75),
    ua1().scale(0.42, 0.75),
  )

  yield* waitUntil("default-styles");
  yield* all(
    rect1().opacity(1, 0.75),
    rect1().scale(1, 0.75),
    circle1().opacity(1, 0.75),
    circle1().scale(1, 0.75),
  )

  yield* waitUntil("called-UA");
  yield* all(
    cursor().opacity(1, 0.75),
    cursor().position([spaceX[2.25], spaceY[1]], 0.75),
  )

  yield* waitUntil("s13-end");

})
