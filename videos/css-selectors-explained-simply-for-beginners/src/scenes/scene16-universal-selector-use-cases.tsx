import { Code, Img, lines, makeScene2D } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { CSSCode, Cursor, Grid } from "../nodes";
import { all, createRef, Direction, slideTransition, waitUntil } from "@motion-canvas/core";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import ui1Img from "../images/s16/beq1.png"
import ui2Img from "../images/s16/beq2.png"
import boxImg from "../images/s16/box.png"
import tweetSS from "../images/s16/tweetFeb1st.png"
import boxModelImg from "../images/s16/box_model_boxes.png"

export default makeScene2D(function*(view) {
  view.fontFamily('Geist');
  view.fill(colors.zinc[950]);
  // view.add(<Grid />);
  yield* slideTransition(Direction.Right, 0.75);

  const twoUses = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={twoUses}
        fontSize={spaceY[0.5]}
      />
    </>
  )
  yield* twoUses().text("Real-world uses of the universal selector →", 2);

  yield* waitUntil("first")
  const ui1 = createRef<Img>();
  const ui2 = createRef<Img>();
  const cssCode = createRef<Code>();
  const cursor = createRef<Cursor>();
  view.add(
    <>
      <Img
        ref={ui1}
        src={ui1Img}
        opacity={0}
        scale={0}
        radius={16}
        stroke={colors.zinc[500]}
        lineWidth={16}
      />
      <Img
        ref={ui2}
        src={ui2Img}
        opacity={0}
        scale={0.5}
        radius={16}
        stroke={colors.zinc[500]}
        lineWidth={16}
      />
      <CSSCode
        ref={cssCode}
        code={`\
* {
  outline: 1px solid red;
}
`}
        x={spaceNX[4.5]}
        fontSize={spaceX[0.5]}
        opacity={0}
      />
      <Cursor
        ref={cursor}
        color="green"
        opacity={0}
        position={[spaceNX[0.5], spaceY[0]]}
      />
    </>
  )

  yield* all(
    ui1().opacity(1, 0.75),
    ui1().scale(0.5, 0.75),
    twoUses().opacity(0, 0.75),
  )

  yield* waitUntil("this-rule")
  yield* all(
    cssCode().opacity(1, 0.75),
    ui2().x(spaceX[4.5], 0.75),
    ui1().x(spaceX[4.5], 0.75),
    ui1().opacity(0, 0.75),
    ui2().opacity(1, 0.75),
  )

  yield* waitUntil("second")
  const bS = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={bS}
        fontSize={spaceY[0.5]}
      />
    </>
  )
  yield* all(
    cssCode().opacity(0, 0.75),
    cssCode().y(spaceY[1], 0.75),
    ui2().y(spaceY[1], 0.75),
    ui2().opacity(0, 0.75),
  )
  yield* bS().text("Resetting Box-Sizing", 1)

  yield* waitUntil("this-rule-box")
  const box = createRef<Img>();
  view.add(
    <>
      <Img
        ref={box}
        src={boxImg}
        opacity={0}
        scale={0}
        radius={16}
        stroke={colors.violet[500]}
        lineWidth={16}
        x={spaceX[4.5]}
      />
    </>
  )

  cssCode().code.replace(lines(0, 2), `\
* {
  box-sizing: border-box;
}
`)

  yield* all(
    box().scale(0.5, 0.75),
    box().opacity(1, 0.75),
    bS().opacity(0, 0.75),
    cssCode().opacity(1, 0.75),
    cssCode().y(0, 0.75),
  )

  yield* waitUntil("feb1st");
  const tweetImg = createRef<Img>();
  view.add(
    <>
      <Img
        ref={tweetImg}
        src={tweetSS}
        radius={32}
        stroke={colors.lime[500]}
        lineWidth={4}
        opacity={0}
        scale={0.9}
        position={[spaceNX[4.5], spaceY[2.5]]}
        height={spaceY[5]}
      />
    </>
  );
  yield* all(
    cssCode().y(spaceNY[3], 0.75),
    tweetImg().opacity(1, 0.75),
    tweetImg().y(spaceY[1.5], 0.75),
  )

  yield* waitUntil("dont-worry")
  yield* all(
    cssCode().opacity(0, 0.75),
    tweetImg().opacity(0, 0.75),
    cssCode().y(spaceNY[2], 0.75),
    tweetImg().y(spaceY[2.5], 0.75),
    box().x(0, 0.75),
  )

  yield* waitUntil("box-model")
  const boxModelTxt = createRef<ExtendedTxt>();
  const boxModel = createRef<Img>();
  view.add(
    <>
      <ExtendedTxt
        ref={boxModelTxt}
        fontSize={spaceY[0.5]}
        position={[spaceNX[4.5], spaceNY[3]]}
      />
      <Img
        ref={boxModel}
        src={boxModelImg}
        opacity={0}
        scale={0}
        radius={16}
        stroke={colors.zinc[500]}
        lineWidth={16}
        position={[spaceNX[4.5], spaceY[1]]}
      />
    </>
  )
  yield* all(
    boxModel().opacity(1, 0.75),
    boxModel().scale(0.4, 0.75),
    boxModelTxt().text("CSS Box Model", 0.75),
    box().x(spaceX[4.5], 0.75),
  )

  yield* waitUntil("this-video")
  yield* all(
    boxModel().opacity(0, 0.75),
    boxModel().scale(0.2, 0.75),
    boxModelTxt().opacity(0, 0.75),
    box().opacity(0, 0.75),
    box().y(spaceY[1], 0.75),
  )

  yield* waitUntil("s16-end")
})
