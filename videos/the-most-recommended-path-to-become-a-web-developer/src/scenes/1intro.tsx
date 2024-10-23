import { Img, Layout, makeScene2D, Path, SVG, Txt } from "@motion-canvas/2d";
import {
  all,
  any,
  createRefMap,
  delay,
  fadeTransition,
  linear,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { ExtendedFillSVG, ExtendedRect, Grid } from "../nodes";
import colors from "../lib/colors";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import { JourneyTitle, OdinProject } from "../lib/svgs";

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  // view.add(
  //   <>
  //     <Grid />
  //   </>
  // );

  const texts = createRefMap<Txt>();
  const svgs = createRefMap<SVG>();
  const rects = createRefMap<ExtendedRect>();
  const layouts = createRefMap<Layout>();

  view.add(
    <>
      <ExtendedTxt
        ref={texts.mostRecommendedPath}
        text={"The most recommended path"}
        fontSize={spaceY[1]}
        fontWeight={500}
        y={-54}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.mostRecommended}
        text={"most recommended"}
        fontSize={spaceY[1]}
        fontWeight={500}
        fill={colors.green[500]}
        stroke={colors.green[500]}
        lineWidth={1}
        y={-54}
        x={-18}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.learnWeb}
        fontSize={spaceY[1]}
        fontWeight={500}
        y={54}
      />
    </>
  );
  yield* all(
    texts.mostRecommended().opacity(1, 1),
    texts.mostRecommendedPath().opacity(1, 1)
  );
  yield* texts.learnWeb().text("to learn web development", 1);

  view.add(
    <SVG
      ref={svgs.odinProject}
      svg={OdinProject}
      height={spaceY[4]}
      opacity={0}
      y={spaceY[1]}
    />
  );

  const pathsOdin = svgs.odinProject().wrapper.children() as Path[];
  for (const path of pathsOdin) {
    path.stroke(path.fill()).lineWidth(0.5).end(0);
    path.fill(null);
  }

  yield* all(
    ...pathsOdin.map((path, index) => delay(0.075 * index, path.end(1, 0.75))),
    ...pathsOdin.flatMap((path, index) => [
      delay(0.05 * (index + 1), path.fill(path.stroke(), 0.75)),
      delay(0.05 * (index + 1), path.lineWidth(0, 0.75)),
    ]),
    texts.mostRecommended().opacity(0, 1),
    texts.mostRecommendedPath().opacity(0, 1),
    texts.learnWeb().opacity(0, 1),
    svgs.odinProject().opacity(1, 2),
    svgs.odinProject().y(0, 2)
  );

  yield* waitUntil("common");

  view.add(
    <>
      <ExtendedRect
        ref={rects.unique}
        width={spaceX[7]}
        height={spaceY[5]}
        position={[spaceX[0], spaceY[2.5]]}
        lineDash={[8, 16]}
        color="sky"
        opacity={0}
      >
        <ExtendedRect
          ref={rects.uniqueHead}
          width={spaceX[4]}
          height={spaceY["1"]}
          y={spaceNY[2.5]}
          lineWidth={0}
          fill={colors.sky[500]}
        >
          <ExtendedTxt
            ref={texts.unique}
            text={"Unique Features"}
            fontSize={40}
            fontWeight={500}
            fill={colors.sky[950]}
          />
        </ExtendedRect>
        <Layout
          ref={layouts.unique}
          layout
          direction={"column"}
          gap={spaceY["0.25"]}
          position={[spaceNX["0.25"], spaceY["0.25"]]}
        >
          <ExtendedTxt
            ref={texts.unique1}
            fontSize={40}
            opacity={0}
            text={"🌐 Open-source"}
          />
          <ExtendedTxt
            ref={texts.unique2}
            fontSize={40}
            opacity={0}
            text={"💡 Focus on problem-solving"}
          />
          <ExtendedTxt
            ref={texts.unique3}
            fontSize={40}
            opacity={0}
            text={"📂 Git from Day One"}
          />
          <ExtendedTxt
            ref={texts.unique4}
            fontSize={40}
            opacity={0}
            text={"🛠️ Real-world techniques"}
          />
          <ExtendedTxt
            ref={texts.unique5}
            fontSize={40}
            opacity={0}
            text={"💻 Flexible Learning Path"}
          />
        </Layout>
      </ExtendedRect>
      <ExtendedRect
        ref={rects.common}
        width={spaceX[7]}
        height={spaceY[5]}
        y={spaceY[3.5]}
        lineDash={[8, 16]}
        color="amber"
        opacity={0}
      >
        <ExtendedRect
          ref={rects.commonHead}
          width={spaceX[4.25]}
          height={spaceY["1"]}
          y={spaceNY[2.5]}
          lineWidth={0}
          fill={colors.amber[500]}
        >
          <ExtendedTxt
            ref={texts.common}
            text={"Common Features"}
            fontSize={40}
            fontWeight={500}
            fill={colors.amber[950]}
          />
        </ExtendedRect>
        <Layout
          ref={layouts.common}
          layout
          direction={"column"}
          gap={spaceY["0.25"]}
          position={[spaceNX["0.25"], spaceY["0.25"]]}
        >
          <ExtendedTxt
            ref={texts.common1}
            opacity={0}
            fontSize={40}
            text={"🆓 Free"}
          />
          <ExtendedTxt
            ref={texts.common2}
            opacity={0}
            fontSize={40}
            text={"📚 Comprehensive curriculum"}
          />
          <ExtendedTxt
            ref={texts.common3}
            opacity={0}
            fontSize={40}
            text={"🛤️ Structured learning path"}
          />
          <ExtendedTxt
            ref={texts.common4}
            opacity={0}
            fontSize={40}
            text={"💼 Job-oriented focus"}
          />
          <ExtendedTxt
            ref={texts.common5}
            opacity={0}
            fontSize={40}
            text={"🏃‍♂️ Self-Paced Learning"}
          />
        </Layout>
      </ExtendedRect>
    </>
  );

  yield* any(
    rects.common().opacity(1, 1),
    rects.common().y(spaceY["2.5"], 1),
    svgs.odinProject().height(spaceY[3], 1),
    svgs.odinProject().y(spaceNY[3], 1),
    rects.common().lineDashOffset(300, 10, linear),
    delay(0.2, texts.common1().opacity(1, 0.75)),
    delay(0.4, texts.common2().opacity(1, 0.75)),
    delay(0.6, texts.common3().opacity(1, 0.75)),
    delay(0.8, texts.common4().opacity(1, 0.75)),
    delay(1, texts.common5().opacity(1, 0.75))
  );

  yield* waitUntil("unique");

  yield* any(
    rects.common().x(spaceNX[4.5], 1),
    rects.unique().opacity(1, 1),
    rects.unique().x(spaceX["4.5"], 1),
    rects.unique().lineDashOffset(150, 5, linear),
    delay(0.3, texts.unique1().opacity(1, 0.75)),
    delay(0.5, texts.unique2().opacity(1, 0.75)),
    delay(0.7, texts.unique3().opacity(1, 0.75)),
    delay(0.9, texts.unique4().opacity(1, 0.75)),
    delay(1.1, texts.unique5().opacity(1, 0.75))
  );

  yield* waitUntil("problems");

  view.add(
    <>
      <ExtendedTxt
        ref={texts.solves}
        text={"solves"}
        opacity={0}
        fontSize={spaceY["0.5"]}
        y={spaceNY[0.75]}
      />
      <Layout
        ref={layouts.problems}
        layout
        direction={"column"}
        justifyContent={"start"}
        gap={spaceY["0.25"]}
        y={spaceY[2]}
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
  );

  yield* all(
    texts.solves().opacity(1, 1),
    delay(1, texts.problem1().opacity(1, 1)),
    delay(1.5, texts.problem2().opacity(1, 1)),
    delay(2, texts.problem3().opacity(1, 1)),
    rects.common().scale(0, 1),
    rects.unique().scale(0, 1),
    svgs.odinProject().height(spaceY[2], 1),
    svgs.odinProject().y(spaceNY[2.5], 1)
  );

  yield* waitUntil("journeyTitle")

  view.add(
    <>
      <SVG
        ref={svgs.journeyTitle}
        svg={JourneyTitle}
        height={spaceY[1.5]}
      />
      <ExtendedTxt ref={texts.basedOn} text={"based on Erik Trautman's blog:\nWhy Learning to Code is So Damn Hard"} opacity={0} fill={colors.slate[400]} fontSize={spaceY["0.5"]} y={spaceY[1.5]} textAlign={"center"}/>
    </>
  );

  const pathsJourney = svgs.journeyTitle().wrapper.children() as Path[];
  for (const path of pathsJourney) {
    path.stroke(path.fill()).lineWidth(0.25).end(0);
    path.fill(null);
  }

  yield* all(
    texts.solves().opacity(0, 1),
    svgs.odinProject().opacity(0, 1),
    texts.problem1().opacity(0, 1),
    texts.problem2().opacity(0, 1),
    texts.problem3().opacity(0, 1),
  );

  yield* all(
    ...pathsJourney.map((path) => path.end(1, 3)),
    ...pathsJourney.flatMap((path) => [
      delay(2.5, path.fill(path.stroke(), 2)),
    ]),
    delay(2,texts.basedOn().opacity(1,1)),
    delay(2,svgs.journeyTitle().y(spaceNY[0.5], 1)),
  )
  
  yield* waitFor(1);
});
