import { Code, Img, Layout, makeScene2D } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { CSSCode, Cursor, ExtendedCircle, ExtendedRect, Grid } from "../nodes";
import { all, createRef, Direction, slideTransition, waitUntil } from "@motion-canvas/core";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import ua1Img from "../images/s13/ua1.png";
import ua2zImg from "../images/s13/ua2z.png";
import ua2hImg from "../images/s13/ua2h.png";
import ua3zImg from "../images/s13/ua3z.png";
import ua3hImg from "../images/s13/ua3h.png";

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

  yield* waitUntil("the-problem");
  const ua2z = createRef<Img>();
  const ua2h = createRef<Img>();
  const ua3z = createRef<Img>();
  const ua3h = createRef<Img>();
  const firefox = createRef<ExtendedTxt>();
  const chrome = createRef<ExtendedTxt>();
  const rect2 = createRef<ExtendedRect>();
  const rect3 = createRef<ExtendedRect>();
  const mayDiffer = createRef<ExtendedTxt>();
  view.add(
    <>
      <Img
        ref={ua2z}
        src={ua2zImg}
        opacity={0}
        scale={0}
        position={[spaceNX[3], spaceNY[3.5]]}
      />
      <Img
        ref={ua3z}
        src={ua3zImg}
        opacity={0}
        scale={0}
        position={[spaceNX[3], spaceY[1]]}
        radius={16}
      />
      <Img
        ref={ua2h}
        src={ua2hImg}
        opacity={0}
        scale={0}
        position={[spaceX[3], spaceNY[3.5]]}
      />
      <Img
        ref={ua3h}
        src={ua3hImg}
        opacity={0}
        scale={0}
        position={[spaceX[3], spaceY[1]]}
        radius={16}
      />
      <ExtendedTxt
        ref={firefox}
        text={"Firefox"}
        position={[spaceNX[3], spaceNY[4.5]]}
        fontSize={spaceY[0.5]}
        opacity={0}
      />
      <ExtendedTxt
        ref={chrome}
        text={"Chrome"}
        position={[spaceX[3], spaceNY[4.5]]}
        fontSize={spaceY[0.5]}
        opacity={0}
      />
      <ExtendedRect
        ref={rect2}
        size={[spaceX[2.5] - 8, spaceY[0.33] + 8]}
        position={[spaceNX[3.75] - 4, spaceNY[0.25] + 8]}
        lineWidth={6}
        opacity={0}
        scale={0.5}
      />
      <ExtendedRect
        ref={rect3}
        size={[spaceX[2.5] - 8, spaceY[0.33]]}
        position={[spaceX[2.75], spaceY[3.75] + 4]}
        lineWidth={6}
        opacity={0}
        scale={0.5}
      />
      <ExtendedTxt
        ref={mayDiffer}
        y={spaceY[5.25]}
      />

    </>
  )

  yield* all(
    ua1().opacity(0, 0.75),
    ua1().scale(0.3, 0.75),
    rect1().opacity(0, 0.75),
    rect1().scale(0.5, 0.75),
    circle1().opacity(0, 0.75),
    circle1().scale(0.5, 0.75),
    cursor().opacity(0, 0.75),
    cursor().position([spaceX[1.25], spaceY[2]], 0.75),
    ua2z().opacity(1, 0.75),
    ua2z().scale(0.5, 0.75),
    ua3z().opacity(1, 0.75),
    ua3z().scale(0.4, 0.75),
    ua2h().opacity(1, 0.75),
    ua2h().scale(0.5, 0.75),
    ua3h().opacity(1, 0.75),
    ua3h().scale(0.4, 0.75),
    firefox().opacity(1, 0.75),
    chrome().opacity(1, 0.75),
  )

  yield* waitUntil("not-the-same");
  yield* all(
    rect2().opacity(1, 0.75),
    rect2().scale(1, 0.75),
    rect3().opacity(1, 0.75),
    rect3().scale(1, 0.75),
    mayDiffer().text("*UA styles may differ", 1.25),
  )

  yield* waitUntil("this-rule");
  const css = createRef<Code>();
  const min = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={min}
        fontSize={spaceY[0.5]}
        y={spaceNY[3.5]}
      />
      <CSSCode
        ref={css}
        code={`\
* {
  margin: 0;
  padding: 0;
}
`}
        opacity={0}
        y={spaceY[1]}
        fontSize={spaceY[0.5]}
      />
    </>
  )

  yield* all(
    css().opacity(1, 0.75),
    css().y(0, 0.75),
    rect2().opacity(0, 0.75),
    rect3().opacity(0, 0.75),
    rect2().scale(0.5, 0.75),
    rect3().scale(0.5, 0.75),
    mayDiffer().opacity(0, 0.75),
    ua2z().opacity(0, 0.75),
    ua3z().opacity(0, 0.75),
    ua2h().opacity(0, 0.75),
    ua3h().opacity(0, 0.75),
    firefox().opacity(0, 0.75),
    chrome().opacity(0, 0.75),
  )

  yield* min().text("Minimal CSS Reset", 1.25);

  yield* waitUntil("s13-end");

})
