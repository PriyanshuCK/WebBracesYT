import {
  Circle,
  Icon,
  Img,
  Layout,
  Line,
  makeScene2D,
  Node,
  Path,
  Polygon,
  Ray,
  Rect,
  Spline,
} from "@motion-canvas/2d";
import {
  all,
  createRef,
  createRefMap,
  delay,
  Direction,
  makeRef,
  range,
  slideTransition,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import {
  ExtendedCircle,
  ExtendedFillSVG,
  ExtendedRect,
  ExtendedStrokeSVG,
  Face,
  Grid,
} from "../nodes";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import colors, { colorPalettes } from "../lib/colors";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import err1 from "../images/err1.png";
import err2 from "../images/err2.png";
import err3 from "../images/err3.png";
import {
  Bucket,
  ManWalkingStroke,
  ManWalkingStrokeLeft,
  Plant,
  Tree,
} from "../lib/svgs";

export default makeScene2D(function* (view) {
  view.fontFamily("Geist");
  // view.add(
  //   <>
  //     <Grid />
  //   </>
  // );

  yield* slideTransition(Direction.Right, 0.5);

  const num4 = createRef<Path>();
  const head4 = createRef<ExtendedTxt>();
  const texts = createRefMap<ExtendedTxt>();
  const rays = createRefMap<Ray>();
  const circles = createRefMap<ExtendedCircle>();
  const waterDropRays: Ray[] = [];
  const nodes = createRefMap<Node>();
  const splines = createRefMap<Spline>();
  // const videos = createRefMap<Video>();
  const images = createRefMap<Img>();
  const paths = createRefMap<Path>();
  const icons = createRefMap<Icon>();
  const lines = createRefMap<Line>();
  const layouts = createRefMap<Layout>();
  const faces = createRefMap<Face>();
  const rects = createRefMap<Rect>();
  const sSvgs = createRefMap<ExtendedStrokeSVG>();
  const fSvgs = createRefMap<ExtendedFillSVG>();

  view.add(
    <>
      <Path
        ref={num4}
        lineWidth={0.5}
        stroke={colors.orange[500]}
        data={
          "M5.4375 0.375C6.125 0.416667 6.6875 0.447917 7.125 0.46875C7.58333 0.489583 7.94792 0.5 8.21875 0.5C8.53125 0.520833 8.77083 0.520833 8.9375 0.5H9.75C10.0625 0.5 10.5 0.510417 11.0625 0.53125C11.6458 0.53125 12.4062 0.541667 13.3438 0.5625C13.2396 0.708333 13.1562 0.885417 13.0938 1.09375C13.0312 1.30208 12.9792 1.51042 12.9375 1.71875C12.875 1.94792 12.8333 2.19792 12.8125 2.46875C12.7917 2.80208 12.75 3.32292 12.6875 4.03125C12.6458 4.63542 12.5833 5.47917 12.5 6.5625C12.4375 7.625 12.3542 9.01042 12.25 10.7188C12.8542 10.7188 13.375 10.6667 13.8125 10.5625C14.25 10.4375 14.6146 10.2917 14.9062 10.125C15.2396 9.95833 15.5104 9.76042 15.7188 9.53125C15.8229 9.40625 15.9375 9.27083 16.0625 9.125C16.1667 9 16.3021 8.86458 16.4688 8.71875C16.6354 8.57292 16.8125 8.41667 17 8.25C16.9583 8.8125 16.9271 9.30208 16.9062 9.71875C16.8854 10.1146 16.8646 10.4479 16.8438 10.7188C16.8229 11.0312 16.8021 11.2812 16.7812 11.4688C16.7812 11.6979 16.7604 12 16.7188 12.375C16.6771 12.7083 16.6354 13.1562 16.5938 13.7188C16.5521 14.2604 16.5104 14.9479 16.4688 15.7812C16.2604 15.3646 16.0625 15.0417 15.875 14.8125C15.7083 14.5625 15.5625 14.375 15.4375 14.25C15.2708 14.1042 15.125 14 15 13.9375C14.8542 13.8958 14.6562 13.8542 14.4062 13.8125C14.1771 13.7708 13.8854 13.75 13.5312 13.75C13.1979 13.7292 12.7604 13.7083 12.2188 13.6875C12.2188 14.9167 12.2396 15.9062 12.2812 16.6562C12.3438 17.4062 12.4062 17.9896 12.4688 18.4062C12.5521 18.9062 12.6458 19.2604 12.75 19.4688C12.875 19.6562 13.0521 19.875 13.2812 20.125C13.4896 20.3542 13.7708 20.625 14.125 20.9375C14.4792 21.25 14.9375 21.6042 15.5 22C15.0208 22.1042 14.5625 22.1771 14.125 22.2188C13.7083 22.2396 13.3229 22.2708 12.9688 22.3125C12.5729 22.3542 12.1979 22.375 11.8438 22.375C11.4688 22.375 11.0104 22.3958 10.4688 22.4375C9.98958 22.4792 9.39583 22.5208 8.6875 22.5625C7.97917 22.6042 7.125 22.6562 6.125 22.7188C6.47917 22.3646 6.76042 22.0417 6.96875 21.75C7.19792 21.4375 7.375 21.1667 7.5 20.9375C7.64583 20.6875 7.75 20.4688 7.8125 20.2812C7.85417 20.0521 7.91667 19.6667 8 19.125C8.0625 18.6667 8.13542 18.0312 8.21875 17.2188C8.30208 16.4062 8.39583 15.3333 8.5 14L0 14.0938L0.15625 12C1.17708 10.5417 1.98958 9.33333 2.59375 8.375C3.21875 7.39583 3.69792 6.60417 4.03125 6C4.40625 5.3125 4.67708 4.77083 4.84375 4.375C4.94792 4 5.04167 3.60417 5.125 3.1875C5.20833 2.83333 5.28125 2.41667 5.34375 1.9375C5.40625 1.4375 5.4375 0.916667 5.4375 0.375ZM8.875 11.0312C8.91667 10.4688 8.94792 9.95833 8.96875 9.5C9.01042 9.02083 9.04167 8.60417 9.0625 8.25C9.08333 7.85417 9.09375 7.47917 9.09375 7.125V5.96875C9.09375 5.59375 9.09375 5.15625 9.09375 4.65625C9.11458 4.13542 9.13542 3.55208 9.15625 2.90625L4.5625 11.0938L8.875 11.0312Z"
        }
        scale={10}
        end={0}
        position={[spaceNX["0.5"], spaceNY[1.25]]}
      />
      <ExtendedTxt
        ref={head4}
        text={"Growth Mindset"}
        opacity={0}
        y={spaceY[2]}
        fontWeight={600}
        fontSize={spaceY[2]}
        textAlign={"center"}
      />
    </>
  );

  yield* num4().end(1, 1.5);
  yield* all(head4().opacity(1, 1), head4().y(0, 1));

  yield* waitUntil("likePlant");

  view.add(
    <>
      <ExtendedStrokeSVG
        ref={sSvgs.plant}
        svg={Plant}
        size={spaceY[2]}
        lineWidth={0.5}
        color="green"
      />
      <ExtendedStrokeSVG
        ref={sSvgs.bucket}
        svg={Bucket}
        size={spaceY[1.5]}
        position={[spaceNX[1], spaceNY[2]]}
        lineWidth={0.5}
        color="slate"
      />
      <ExtendedStrokeSVG
        ref={sSvgs.tree}
        svg={Tree}
        size={spaceY[5]}
        lineWidth={0.5}
        color="green"
      />
    </>
  );

  yield* all(
    num4().opacity(0, 1),
    head4().opacity(0, 1),
    sSvgs.plant().write(2),
    delay(2, sSvgs.bucket().write(1)),
    delay(5, sSvgs.tree().write(2)),
    delay(5, sSvgs.plant().opacity(0, 1)),
    delay(4, sSvgs.bucket().opacity(0, 1)),
    delay(2.5, sSvgs.plant().size(spaceY[3], 4))
  );

  view.add(
    <>
      <Face ref={faces.successful} size={spaceY[3]} highlighted scale={0} />
    </>
  );

  yield* all(sSvgs.tree().opacity(0, 1), faces.successful().scale(1, 1));

  yield* waitUntil("growthMindset");

  view.add(
    <>
      <ExtendedTxt
        ref={texts.growthMindset}
        fontWeight={500}
        fontSize={spaceY[1]}
      />
      <ExtendedTxt
        ref={texts.intelligenceNotFixed}
        text={"intelligence🧠 and abilities💪🏻\naren't fixed"}
        textAlign={"center"}
        fontWeight={500}
        fontSize={spaceY[1]}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.intelligence}
        text={"intelligence"}
        fill={colors.pink[500]}
        fontWeight={500}
        fontSize={spaceY[1]}
        opacity={0}
        stroke={colors.pink[500]}
        lineWidth={1}
        position={[-393, -54]}
      />
      <ExtendedTxt
        ref={texts.abilities}
        text={"abilities"}
        fill={colors.yellow[500]}
        fontWeight={500}
        fontSize={spaceY[1]}
        opacity={0}
        stroke={colors.yellow[500]}
        lineWidth={1}
        position={[350, -54]}
      />
      <ExtendedTxt
        ref={texts.butCanBe}
        text={"but can be developed✅\nwith effort and persistence"}
        textAlign={"center"}
        fontWeight={500}
        fontSize={spaceY[1]}
        y={spaceY[1.5]}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.canBeDeveloped}
        text={"can be developed"}
        fill={colors.green[500]}
        fontWeight={500}
        fontSize={spaceY[1]}
        opacity={0}
        stroke={colors.green[500]}
        lineWidth={1}
        position={[20, spaceY[1.5] + -54]}
      />
      <ExtendedTxt
        ref={texts.effort}
        text={"effort"}
        fill={colors.cyan[500]}
        fontWeight={500}
        fontSize={spaceY[1]}
        opacity={0}
        stroke={colors.cyan[500]}
        lineWidth={1}
        position={[-247, spaceY[1.5] + 54]}
      />
      <ExtendedTxt
        ref={texts.persistence}
        text={"persistence"}
        fill={colors.indigo[500]}
        fontWeight={500}
        fontSize={spaceY[1]}
        opacity={0}
        stroke={colors.indigo[500]}
        lineWidth={1}
        position={[323.5, spaceY[1.5] + 54]}
      />
    </>
  );

  yield* all(
    faces.successful().opacity(0, 1),
    texts.growthMindset().text("Growth Mindset", 1)
  );

  yield* waitUntil("intelligenceNotFixed");

  yield* all(
    texts.growthMindset().opacity(0, 1),
    texts.intelligenceNotFixed().opacity(1, 1),
    texts.intelligence().opacity(1, 1),
    texts.abilities().opacity(1, 1)
  );

  yield* waitUntil("butCanBe");
  yield* all(
    texts.intelligenceNotFixed().y(spaceNY[1.5], 1),
    texts.intelligence().y(spaceNY[1.5] - 54, 1),
    texts.abilities().y(spaceNY[1.5] - 54, 1),
    texts.butCanBe().opacity(1, 1),
    texts.canBeDeveloped().opacity(1, 1),
    texts.effort().opacity(1, 1),
    texts.persistence().opacity(1, 1)
  );

  yield* waitUntil("aimForFruit");

  view.add(
    <>
      <Spline
        ref={splines.branch1}
        lineWidth={6}
        lineCap={"round"}
        end={0}
        opacity={0}
        stroke={"#855c52"}
        points={[
          [spaceNX[4], spaceY[2]],
          [spaceNX[3], spaceY[1.75]],
          [0, 0],
          [spaceX[2], spaceY[1]],
          [spaceX[3.5], spaceY[0.5]],
        ]}
      />
      <Spline
        ref={splines.branch2}
        lineWidth={6}
        lineCap={"round"}
        end={0}
        opacity={0}
        stroke={"#855c52"}
        points={[
          [0, 0],
          [spaceX[2], spaceNY[1]],
          [spaceX[3.5], spaceNY[0.5]],
          [spaceX[4.5], spaceNY[1]],
        ]}
      />
      <Icon
        ref={icons.apple1}
        icon={"noto-v1:red-apple"}
        size={spaceY[1]}
        position={[spaceX[2], spaceY[1.33]]}
        opacity={0}
      />
      <Icon
        ref={icons.apple2}
        icon={"noto-v1:red-apple"}
        size={spaceY[1]}
        position={[spaceX[4], spaceNY[0.33]]}
        opacity={0}
      />
      <ExtendedCircle
        ref={circles.apple}
        size={spaceY[3]}
        lineWidth={6}
        color="green"
        scale={0}
        position={icons.apple2().position()}
      />
    </>
  );

  yield* all(
    texts.intelligenceNotFixed().opacity(0, 0.5),
    texts.intelligence().opacity(0, 0.5),
    texts.abilities().opacity(0, 0.5),
    texts.butCanBe().opacity(0, 0.5),
    texts.canBeDeveloped().opacity(0, 0.5),
    texts.effort().opacity(0, 0.5),
    texts.persistence().opacity(0, 0.5),
    splines.branch1().end(1, 2),
    splines.branch1().opacity(1, 1),
    delay(1, splines.branch2().end(1, 1)),
    delay(1, splines.branch2().opacity(1, 1)),
    delay(1.25, icons.apple1().opacity(1, 1)),
    delay(1.75, icons.apple2().opacity(1, 1)),
    delay(2, circles.apple().opacity(0, 2)),
    delay(2, circles.apple().scale(1, 2))
  );

  view.add(
    <>
      <ExtendedTxt
        ref={texts.push}
        fontSize={spaceY[1]}
        fontWeight={500}
        textAlign={"center"}
      />
    </>
  );

  yield* all(
    splines.branch1().end(0, 1),
    splines.branch1().opacity(0, 1),
    splines.branch2().end(0, 1),
    splines.branch2().opacity(0, 1),
    icons.apple1().scale(0, 1),
    icons.apple2().scale(0, 1),
    texts.push().text("Push yourself", 1.5),
    delay(
      3,
      texts.push().text("Push yourself\nslightly beyond your\ncomfort zone", 3)
    )
  );

  view.add(
    <>
      <Icon
        ref={icons.brain1}
        icon={"twemoji:brain"}
        size={spaceY[1]}
        x={spaceNX["3.5"]}
        opacity={0}
      />
      <Icon
        ref={icons.brain2}
        icon={"twemoji:brain"}
        size={spaceY[2]}
        x={spaceX["4"]}
        opacity={0}
        scale={0.5}
      />
      <Ray
        ref={rays.challengeBrain}
        fromX={spaceNX[2]}
        toX={spaceX[2]}
        lineWidth={4}
        stroke={colors.slate[0]}
        endArrow
        lineDash={[5, 10]}
        end={0}
        opacity={0}
      >
        <ExtendedTxt
          ref={texts.challengeBrain}
          y={spaceNY["1"]}
          fontSize={spaceY["0.5"]}
          fontWeight={500}
          textAlign={"center"}
        />
      </Ray>
    </>
  );

  yield* all(
    texts.push().opacity(0, 1),
    icons.brain1().opacity(1, 1),
    delay(0.25, rays.challengeBrain().end(1, 1)),
    delay(0.25, rays.challengeBrain().opacity(1, 1)),
    delay(0.25, texts.challengeBrain().text("overcome\nchallenges", 1)),
    delay(1.5, icons.brain2().opacity(1, 1)),
    delay(1.5, icons.brain2().scale(1, 1))
  );

  yield* waitUntil("overcomingChallenges");

  view.add(
    <>
      <ExtendedTxt
        ref={texts.overcomingChallenges}
        fontSize={spaceY[0.75]}
        fontWeight={500}
        fill={colors.slate[300]}
      />
      <ExtendedTxt
        ref={texts.buildsConfi}
        fontSize={spaceY[1]}
        fontWeight={500}
        y={spaceY["0.75"]}
      />
      <ExtendedTxt
        ref={texts.adaptableToNew}
        fontSize={spaceY[1]}
        fontWeight={500}
        y={spaceY["1.25"]}
        textAlign={"center"}
      />
    </>
  );

  yield* all(
    icons.brain1().scale(0, 1),
    icons.brain2().scale(0, 1),
    rays.challengeBrain().end(0, 1),
    rays.challengeBrain().opacity(0, 1),
    texts.overcomingChallenges().text("Overcoming challenges:", 1),
    delay(1, texts.buildsConfi().text("⇢ builds confidence😎", 1)),
    delay(1, texts.overcomingChallenges().y(spaceNY[0.75], 1)),
    delay(
      3,
      texts
        .adaptableToNew()
        .text("⇢ makes you adaptable\n\tto new challenges💪🏻", 2)
    ),
    delay(3, texts.overcomingChallenges().y(spaceNY[2.25], 1)),
    delay(3, texts.buildsConfi().y(spaceNY[0.75], 1))
  );

  yield* waitUntil("youRNotConfined");

  view.add(
    <>
      <ExtendedTxt
        ref={texts.youRNotConfinedTo}
        text={"you're not confined\nto your\ncurrent level of knowledge"}
        fontSize={spaceY[1]}
        fontWeight={500}
        opacity={0}
        textAlign={"center"}
      />
      <ExtendedTxt
        ref={texts.youRNotConfined}
        text={"you're not confined"}
        fontSize={spaceY[1]}
        fontWeight={500}
        opacity={0}
        position={[0, -108]}
        fill={colors.orange[500]}
        stroke={colors.orange[500]}
        lineWidth={1}
      />
      <ExtendedTxt
        ref={texts.currentKnow}
        text={"current level of knowledge"}
        fontSize={spaceY[1]}
        fontWeight={500}
        opacity={0}
        position={[0, 108]}
        fill={colors.green[500]}
        stroke={colors.green[500]}
        lineWidth={1}
      />
    </>
  );

  yield* all(
    texts.overcomingChallenges().opacity(0, 0.5),
    texts.buildsConfi().opacity(0, 0.5),
    texts.adaptableToNew().opacity(0, 0.5),
    texts.youRNotConfinedTo().opacity(1, 0.5),
    texts.youRNotConfined().opacity(1, 0.5),
    texts.currentKnow().opacity(1, 0.5)
  );

  yield* waitUntil("withRightAttitude");

  view.add(
    <>
      <ExtendedTxt
        ref={texts.withRightAttitudeAlways}
        text={"with the right attitude,\nyou can always improve"}
        fontSize={spaceY[1]}
        fontWeight={500}
        textAlign={"center"}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.youCan}
        text={"you can"}
        fontSize={spaceY[1]}
        fontWeight={500}
        textAlign={"center"}
        opacity={0}
        position={[-338, 54]}
        fill={colors.sky[500]}
        stroke={colors.sky[500]}
        lineWidth={1}
      />
      <ExtendedTxt
        ref={texts.improve}
        text={"improve"}
        fontSize={spaceY[1]}
        fontWeight={500}
        textAlign={"center"}
        opacity={0}
        position={[335, 54]}
        fill={colors.sky[500]}
        stroke={colors.sky[500]}
        lineWidth={1}
      />
    </>
  );

  yield* all(
    texts.youRNotConfinedTo().opacity(0, 0.5),
    texts.youRNotConfined().opacity(0, 0.5),
    texts.currentKnow().opacity(0, 0.5),
    texts.withRightAttitudeAlways().opacity(1, 0.5),
    texts.youCan().opacity(1, 0.5),
    texts.improve().opacity(1, 0.5)
  );

  yield* waitUntil("shyAway");

  view.add(
    <>
      <ExtendedCircle
        ref={circles.problem}
        size={spaceY[1.5]}
        x={spaceNX[0.5]}
        scale={0}
      >
        <ExtendedTxt
          ref={texts.problem}
          text={"?"}
          fontWeight={500}
          fontSize={spaceY[1]}
        />
      </ExtendedCircle>
      <ExtendedStrokeSVG
        ref={sSvgs.manWalking}
        svg={ManWalkingStroke}
        size={spaceY[2]}
        x={spaceX[0.5]}
        lineWidth={0.5}
      />
      <ExtendedStrokeSVG
        ref={sSvgs.manWalkingLeft}
        svg={ManWalkingStrokeLeft}
        size={spaceY[2]}
        x={spaceX[3]}
        lineWidth={0.5}
      />
      <ExtendedTxt
        ref={texts.opportunities}
        fontSize={spaceY["0.5"]}
        fontWeight={500}
        y={spaceY[1.5]}
        x={()=>circles.problem().x()}
      />
    </>
  );

  sSvgs.manWalkingLeft().stroke(sSvgs.manWalking().stroke())

  yield* all(
    texts.withRightAttitudeAlways().opacity(0, 0.5),
    texts.youCan().opacity(0, 0.5),
    texts.improve().opacity(0, 0.5),
    circles.problem().scale(1, 1),
    circles.problem().x(spaceNX[3], 3),
    sSvgs.manWalking().x(spaceX[3], 3),
    sSvgs.manWalking().write(2)
  );

  yield* waitUntil("embrace")

  yield* all(
    sSvgs.manWalking().opacity(0, 1),
    sSvgs.manWalkingLeft().opacity(1, 1.5),
    sSvgs.manWalkingLeft().write(1),
    delay(0.75,texts.opportunities().text("opportunities💡", 1)),
    circles.problem().x(spaceNX[1.5], 3),
    sSvgs.manWalking().x(spaceX[1.5], 3),
    sSvgs.manWalkingLeft().x(spaceX[1], 3),
  );

  view.add(
    <>
    <ExtendedTxt ref={texts.byContiChallenge} fontSize={spaceY[0.75]} fontWeight={500} />
    </>
  )

  yield* all(
    circles.problem().scale(0, 1),
    sSvgs.manWalkingLeft().opacity(0, 1),
    texts.opportunities().opacity(0, 1),
    texts.byContiChallenge().text("By continuously challenging yourself,", 2),
  )

  yield* waitUntil("betterProgrammer")

  view.add(
    <>
    <ExtendedTxt ref={texts.betterProgrammer} fontWeight={500} fontSize={spaceY[1]} x={spaceX["0.25"]/2}/>
    <ExtendedTxt ref={texts.resilience} fontWeight={500} fontSize={spaceY[1]} y={spaceY["1"]} x={spaceNX[2]} textAlign={"center"}/>
    </>
  )

  yield* all(
    texts.byContiChallenge().fontSize(spaceY["0.5"], 1),
    texts.byContiChallenge().fill(colors.slate[300], 1),
    texts.byContiChallenge().position([spaceNX[3.5], spaceNY[1.25]], 1),
    texts.betterProgrammer().text("⇢ become better programmer🧑🏻‍💻", 1.5),
    delay(2, texts.resilience().text("⇢ develop resilience to\n\ttackle obstacles🦾", 2)),
    delay(2, texts.betterProgrammer().y(spaceNY["0.75"], 1)),
    delay(2, texts.byContiChallenge().y(spaceNY[2], 1)),
  )
  
  yield* waitFor(2.75);
  yield* all(
    texts.byContiChallenge().opacity(0, 0.5),
    texts.betterProgrammer().opacity(0, 0.5),
    texts.resilience().opacity(0, 0.5),
  )
});
