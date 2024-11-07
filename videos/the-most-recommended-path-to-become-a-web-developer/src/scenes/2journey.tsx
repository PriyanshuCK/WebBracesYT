import { Img, Layout, Line, makeScene2D, Ray, Spline } from "@motion-canvas/2d";
import {
  all,
  createRefMap,
  delay,
  Direction,
  easeOutCubic,
  fadeTransition,
  linear,
  slideTransition,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { Grid } from "../nodes";
import colors from "../lib/colors";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import { ExtendedTxt } from "../nodes/ExtendedTxt";

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  // view.add(
  //   <>
  //     <Grid />
  //   </>
  // );

  const lines = createRefMap<Line>();
  const splines = createRefMap<Spline>();
  const rays = createRefMap<Ray>();
  const texts = createRefMap<ExtendedTxt>();
  const layouts = createRefMap<Layout>()

  view.add(
    <>
      <Line
        ref={lines.journeyGraph}
        lineWidth={3}
        stroke={colors.slate[0]}
        lineCap={"round"}
        startArrow
        endArrow
        arrowSize={16}
        points={[
          [spaceNX[8], spaceNY[4]],
          [spaceNX[8], spaceY[4]],
          [spaceX[9], spaceY[4]],
        ]}
      />
      <ExtendedTxt ref={texts.phases} text={"The Four Phases of a Programmer's Journey"} fontSize={spaceY["0.5"]} fontWeight={500} y={spaceNY["4.75"]} />
      <Spline
        ref={splines.hand}
        lineWidth={4}
        stroke={colors.sky[500]}
        lineCap={"round"}
        points={[
          [spaceNX[8], spaceY[3]],
          [spaceNX[6.5], spaceNY[0.5]],
          [spaceNX[4], spaceY[2.75]],
          [spaceX[1], spaceY[3]],
          [spaceX[8], spaceNY[2]],
        ]}
        end={0}
      />
      <Spline
        ref={splines.cliff}
        lineWidth={4}
        stroke={colors.yellow[500]}
        lineCap={"round"}
        points={[
          [spaceNX[8], spaceY[3]],
          [spaceNX[6.5], spaceNY[0.5]],
          [spaceNX[4], spaceY[2.75]],
          [spaceX[1], spaceY[3]],
          [spaceX[8], spaceNY[2]],
        ]}
        start={0.175}
        end={0.175}
        opacity={0}
      />
      <Spline
        ref={splines.desert}
        lineWidth={4}
        stroke={colors.red[500]}
        lineCap={"round"}
        points={[
          [spaceNX[8], spaceY[3]],
          [spaceNX[6.5], spaceNY[0.5]],
          [spaceNX[4], spaceY[2.75]],
          [spaceX[1], spaceY[3]],
          [spaceX[8], spaceNY[2]],
        ]}
        start={0.336}
        end={0.336}
        opacity={0}
      />
      <Spline
        ref={splines.upswing}
        lineWidth={4}
        stroke={colors.emerald[500]}
        lineCap={"round"}
        points={[
          [spaceNX[8], spaceY[3]],
          [spaceNX[6.5], spaceNY[0.5]],
          [spaceNX[4], spaceY[2.75]],
          [spaceX[1], spaceY[3]],
          [spaceX[8], spaceNY[2]],
        ]}
        start={0.605}
        end={0.605}
        opacity={0}
      />
      <Ray
        ref={rays.p12}
        lineWidth={2}
        stroke={colors.slate[0]}
        lineCap={"round"}
        lineDash={[2, 8]}
        fromY={spaceNY[2]}
        toY={spaceY[0]}
        x={spaceNX[6.5]}
        end={0}
        opacity={0}
      />
      <Ray
        ref={rays.p23}
        lineWidth={2}
        stroke={colors.slate[0]}
        lineCap={"round"}
        lineDash={[2, 8]}
        fromY={spaceNY[2]}
        toY={spaceY[3]}
        x={spaceNX[4.5]}
        end={0}
        opacity={0}
      />
      <Ray
        ref={rays.p34}
        lineWidth={2}
        stroke={colors.slate[0]}
        lineCap={"round"}
        lineDash={[2, 8]}
        fromY={spaceNY[1]}
        toY={spaceY[3.5]}
        x={spaceX[1]}
        end={0}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.confidence}
        text={"Confidence"}
        rotation={-90}
        position={[spaceNX[8.5], spaceNY[2.5]]}
        fontWeight={500}
      />
      <ExtendedTxt
        ref={texts.competence}
        text={"Competence"}
        position={[spaceX[7.5], spaceY[4.5]]}
        fontWeight={500}
      />
      <ExtendedTxt
        ref={texts.hand}
        text={"hand-holding\nhoneymoon"}
        fill={colors.sky[500]}
        position={[spaceNX[6.75], spaceNY[3]]}
        fontWeight={500}
        opacity={0}
        textAlign={"center"}
      />
      <ExtendedTxt
        ref={texts.cliff}
        text={"cliff of\nconfusion"}
        fill={colors.yellow[500]}
        position={[spaceNX[5.5], spaceNY[1.75]]}
        fontWeight={500}
        opacity={0}
        textAlign={"center"}
      />
      <ExtendedTxt
        ref={texts.desert}
        text={"desert of despair"}
        fill={colors.red[500]}
        position={[spaceNX[1.75], spaceY[0.5]]}
        fontWeight={500}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.upswing}
        text={"upswing of awesome"}
        fill={colors.emerald[500]}
        position={[spaceX[3], spaceY[0]]}
        fontWeight={500}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.job}
        text={"Job Ready"}
        fill={colors.slate[0]}
        position={[spaceX[8], spaceNY[2.5]]}
        fontWeight={500}
        opacity={0}
      />
    </>
  );

  yield* slideTransition(Direction.Bottom, 1),
    yield* all(
      splines.hand().end(0.174, 16, linear),
      delay(2, texts.hand().opacity(1, 1)),
      delay(16, splines.cliff().end(0.336, 12, linear)),
      delay(16, splines.cliff().opacity(1, 0.25)),
      delay(15, rays.p12().end(1, 2)),
      delay(15, rays.p12().opacity(1, 1)),
      delay(16, texts.cliff().opacity(1, 1)),
      delay(28, splines.desert().end(0.605, 26, linear)),
      delay(28, splines.desert().opacity(1, 0.25)),
      delay(30, texts.desert().opacity(1, 1)),
      delay(27, rays.p23().end(1, 2)),
      delay(27, rays.p23().opacity(1, 1)),
      delay(54, splines.upswing().end(1, 20, linear)),
      delay(54, splines.upswing().opacity(1, 0.25)),
      delay(52, texts.upswing().opacity(1, 1)),
      delay(52.5, rays.p34().end(1, 2)),
      delay(52.5, rays.p34().opacity(1, 1)),
      delay(73, texts.job().opacity(1, 1)),
    );
  
  yield* waitUntil("nowTalk")
  
  view.add(
    <>
          <Layout
        ref={layouts.problems}
        layout
        direction={"column"}
        justifyContent={"start"}
        gap={spaceY["0.5"]}
      >
        <ExtendedTxt
          ref={texts.problem1}
          text={"🤔 Why can't developers apply what they learn?"}
          fontSize={56}
          fontWeight={400}
          opacity={0}
        />
        <ExtendedTxt
          ref={texts.problem2}
          text={"😫 Where to seek support when learning alone?"}
          fontSize={56}
          fontWeight={400}
          opacity={0}
        />
        <ExtendedTxt
          ref={texts.problem3}
          text={"🌱 Why do developers struggle to adapt to new technologies?"}
          fontSize={56}
          fontWeight={400}
          opacity={0}
        />
      </Layout>
</>
  )
  yield* all(
    lines.journeyGraph().start(0.5, 1),
    lines.journeyGraph().end(0.5, 1),
    lines.journeyGraph().opacity(0, 1),
    splines.hand().end(0, 1),
    splines.cliff().end(0, 1),
    splines.desert().end(0, 1),
    splines.upswing().end(0, 1),
    splines.hand().opacity(0, 1),
    splines.cliff().opacity(0, 1),
    splines.desert().opacity(0, 1),
    splines.upswing().opacity(0, 1),
    texts.confidence().opacity(0, 1),
    texts.competence().opacity(0, 1),
    texts.job().opacity(0, 1),
    texts.hand().opacity(0, 1),
    texts.cliff().opacity(0, 1),
    texts.desert().opacity(0, 1),
    texts.upswing().opacity(0, 1),
    texts.phases().opacity(0, 1),
    rays.p12().end(0, 1),
    rays.p12().opacity(0, 1),
    rays.p23().end(0, 1),
    rays.p23().opacity(0, 1),
    rays.p34().end(0, 1),
    rays.p34().opacity(0, 1),
    delay(1, texts.problem1().opacity(1, 1)),
    delay(1.25, texts.problem2().opacity(1, 1)),
    delay(1.5, texts.problem3().opacity(1, 1)),
  )

  yield* waitUntil("commonStruggle");
  yield* all(
    texts.problem2().opacity(0, 1),
    texts.problem3().opacity(0, 1),
    delay(1, layouts.problems().position([spaceX["1.75"], spaceY["1.25"]], 1)),
)

  yield* waitUntil("scene2End");

});
