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

export default makeScene2D(function* (view) {
  view.fontFamily("Geist");
  // view.add(
  //   <>
  //     <Grid />
  //   </>
  // );

  yield* slideTransition(Direction.Right, 0.5);

  const num3 = createRef<Path>();
  const head3 = createRef<ExtendedTxt>();
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
        ref={num3}
        lineWidth={0.5}
        stroke={colors.orange[500]}
        data={
          "M0.96875 0.15625C1.32292 0.40625 1.6875 0.59375 2.0625 0.71875C2.4375 0.84375 2.77083 0.9375 3.0625 1C3.41667 1.08333 3.76042 1.125 4.09375 1.125C4.51042 1.125 4.88542 1.07292 5.21875 0.96875C5.57292 0.864583 5.95833 0.760417 6.375 0.65625C6.79167 0.552083 7.27083 0.46875 7.8125 0.40625C8.35417 0.322917 9.03125 0.3125 9.84375 0.375C10.6562 0.4375 11.3854 0.625 12.0312 0.9375C12.6771 1.22917 13.2188 1.60417 13.6562 2.0625C14.1146 2.5 14.4688 2.98958 14.7188 3.53125C14.9688 4.07292 15.0938 4.625 15.0938 5.1875C15.0521 6.04167 14.9167 6.84375 14.6875 7.59375C14.4792 8.23958 14.1562 8.875 13.7188 9.5C13.2812 10.1042 12.6354 10.5312 11.7812 10.7812C12.8229 10.9271 13.6354 11.1979 14.2188 11.5938C14.8229 11.9896 15.2917 12.3958 15.625 12.8125C16 13.3125 16.2604 13.8542 16.4062 14.4375C16.5312 15.2083 16.5208 16 16.375 16.8125C16.2292 17.6042 15.9583 18.3542 15.5625 19.0625C15.1875 19.75 14.6667 20.3646 14 20.9062C13.3542 21.4271 12.5729 21.8125 11.6562 22.0625C11.0312 22.2292 10.3125 22.2708 9.5 22.1875C8.70833 22.0833 7.9375 21.9375 7.1875 21.75C6.4375 21.5625 5.76042 21.375 5.15625 21.1875C4.55208 21 4.13542 20.9167 3.90625 20.9375C3.71875 20.9583 3.5 21.0312 3.25 21.1562C3.02083 21.2604 2.75 21.4271 2.4375 21.6562C2.14583 21.8646 1.79167 22.1667 1.375 22.5625C1.47917 21.625 1.55208 20.875 1.59375 20.3125C1.65625 19.75 1.70833 19.3021 1.75 18.9688C1.79167 18.5938 1.8125 18.3125 1.8125 18.125V17.4375C1.8125 17.1875 1.80208 16.8646 1.78125 16.4688C1.76042 16.0729 1.73958 15.5729 1.71875 14.9688C2.78125 16.2604 3.78125 17.2292 4.71875 17.875C5.65625 18.5208 6.47917 18.9896 7.1875 19.2812C8.02083 19.6146 8.78125 19.7708 9.46875 19.75C10.0521 19.7083 10.5208 19.5208 10.875 19.1875C11.2292 18.8333 11.4792 18.4167 11.625 17.9375C11.7708 17.4583 11.8229 16.9479 11.7812 16.4062C11.7396 15.8438 11.6042 15.3229 11.375 14.8438C11.1667 14.3438 10.875 13.9167 10.5 13.5625C10.125 13.1875 9.6875 12.9583 9.1875 12.875C8.58333 12.7708 8.01042 12.7604 7.46875 12.8438C6.98958 12.9062 6.48958 13.0521 5.96875 13.2812C5.44792 13.4896 5.01042 13.8542 4.65625 14.375C4.61458 14.0208 4.58333 13.7188 4.5625 13.4688C4.5625 13.2188 4.55208 13.0104 4.53125 12.8438C4.51042 12.6562 4.5 12.5208 4.5 12.4375C4.5 12.3333 4.48958 12.1771 4.46875 11.9688C4.44792 11.8021 4.42708 11.5833 4.40625 11.3125C4.40625 11.0208 4.38542 10.6562 4.34375 10.2188C4.71875 10.3229 5.07292 10.4062 5.40625 10.4688C5.73958 10.5104 6.03125 10.5417 6.28125 10.5625C6.57292 10.5833 6.84375 10.5833 7.09375 10.5625C7.40625 10.5417 7.78125 10.4271 8.21875 10.2188C8.67708 9.98958 9.10417 9.6875 9.5 9.3125C9.89583 8.9375 10.2083 8.48958 10.4375 7.96875C10.6875 7.44792 10.7708 6.875 10.6875 6.25C10.5 4.97917 10.0729 4.07292 9.40625 3.53125C8.76042 2.96875 8.09375 2.70833 7.40625 2.75C6.94792 2.8125 6.40625 3.03125 5.78125 3.40625C5.23958 3.71875 4.59375 4.19792 3.84375 4.84375C3.11458 5.46875 2.28125 6.35417 1.34375 7.5C1.38542 6.9375 1.40625 6.4375 1.40625 6C1.40625 5.54167 1.40625 5.16667 1.40625 4.875C1.40625 4.52083 1.39583 4.20833 1.375 3.9375L1.28125 3C1.23958 2.6875 1.19792 2.29167 1.15625 1.8125C1.11458 1.33333 1.05208 0.78125 0.96875 0.15625Z"
        }
        scale={10}
        end={0}
        position={[spaceNX["0.5"], spaceNY[1.25]]}
      />
      <ExtendedTxt
        ref={head3}
        text={"Have Faith"}
        opacity={0}
        y={spaceY[2]}
        fontWeight={600}
        fontSize={spaceY[2]}
        textAlign={"center"}
      />
      <ExtendedTxt
        ref={texts.problemsSolvable}
        text={"Problems are Solvable"}
        y={spaceY[2]}
        fontWeight={500}
        fontSize={spaceY["1"]}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.solvable}
        text={"Solvable"}
        y={spaceY[2]}
        fontWeight={500}
        fontSize={spaceY["1"]}
        opacity={0}
        fill={colors.green[500]}
        stroke={colors.green[500]}
        lineWidth={1}
        x={292}
      />
    </>
  );

  yield* num3().end(1, 1);
  yield* all(head3().opacity(1, 1), head3().y(0, 1));
  yield* all(
    delay(0.5, texts.problemsSolvable().opacity(1, 1)),
    delay(0.5, texts.solvable().opacity(1, 1)),
    head3().y(spaceNY[1], 1),
    num3().y(spaceNY[2.25], 1)
  );

  yield* waitUntil("oneThing");

  view.add(
    <>
      <Line
        ref={lines.faithGraph}
        stroke={colors.slate[0]}
        lineWidth={4}
        lineCap={"round"}
        startArrow
        endArrow
        points={[
          [spaceNX[6], spaceNY[4]],
          [spaceNX[6], spaceY[2]],
          [spaceX[6], spaceY[2]],
        ]}
        start={1 / 3}
        end={1 / 3}
      />
    </>
  );

  yield* all(
    head3().opacity(0, 0.5),
    num3().opacity(0, 0.5),
    texts.problemsSolvable().opacity(0, 0.5),
    texts.solvable().opacity(0, 0.5),
    lines.faithGraph().start(0, 1),
    lines.faithGraph().end(1, 1)
  );

  view.add(
    <>
      <ExtendedTxt
        ref={texts.experienced}
        fontSize={spaceY["0.5"]}
        position={[spaceX[3], spaceY[3.5]]}
        textAlign={"center"}
        fill={colors.gray[400]}
      />
      <ExtendedTxt
        ref={texts.beginner}
        fontSize={spaceY["0.5"]}
        position={[spaceNX[3], spaceY[3.5]]}
        textAlign={"center"}
        fill={colors.gray[400]}
      />
      <ExtendedRect
        ref={rects.faithExp}
        highlighted
        height={spaceY[0]}
        position={[spaceX[3], 157.5]}
        color="green"
        opacity={0}
      />
      <ExtendedRect
        ref={rects.faithBeg}
        highlighted
        height={spaceY["0"]}
        position={[spaceNX[3], 157.5]}
        color="green"
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.faith}
        fontSize={spaceY["0.5"]}
        fontWeight={500}
        position={[spaceNX[6.5], spaceNY["3"]]}
        rotation={-90}
        fill={colors.green[500]}
      />
    </>
  );

  yield* all(
    texts.experienced().text("Experienced\nProgrammer", 1),
    delay(1.5, texts.beginner().text("Beginner\nProgrammer", 1)),
    delay(1.75, rects.faithExp().opacity(1, 1)),
    delay(1.75, rects.faithBeg().opacity(1, 1)),
    delay(2, texts.faith().text("Faith", 1)),
    delay(2, rects.faithExp().height(spaceY["4.5"], 1)),
    delay(2, rects.faithBeg().height(spaceY["0.25"], 1)),
    delay(2, rects.faithExp().y(spaceNY["0.5"], 1)),
    delay(2, rects.faithBeg().y(146.25, 1))
  );

  yield* waitUntil("everyProbSol");

  view.add(
    <>
      <ExtendedTxt
        ref={texts.everyProbSol}
        text={"Every problem has a solution"}
        fontSize={spaceY[1]}
        fontWeight={500}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.solution}
        text={"solution"}
        fontSize={spaceY[1]}
        fontWeight={500}
        opacity={0}
        fill={colors.green[500]}
        stroke={colors.green[500]}
        lineWidth={1}
        x={442}
      />
      <ExtendedTxt
        ref={texts.problem}
        text={"problem"}
        fontSize={spaceY[1]}
        fontWeight={500}
        opacity={0}
        fill={colors.red[500]}
        stroke={colors.red[500]}
        lineWidth={1}
        x={-177}
      />
      <ExtendedTxt
        ref={texts.notObvious}
        fontSize={spaceY["0.75"]}
        fontWeight={500}
        y={spaceY[1]}
      />
    </>
  );

  yield* all(
    texts.experienced().opacity(0, 1),
    texts.beginner().opacity(0, 1),
    texts.faith().opacity(0, 1),
    rects.faithExp().height(0, 1),
    rects.faithBeg().height(0, 1),
    rects.faithExp().opacity(0, 1),
    rects.faithBeg().opacity(0, 1),
    lines.faithGraph().start(1 / 3, 1),
    lines.faithGraph().end(1 / 3, 1),
    lines.faithGraph().opacity(0, 1),
    texts.everyProbSol().opacity(1, 1),
    texts.solution().opacity(1, 1),
    texts.problem().opacity(1, 1),
    delay(
      2,
      texts.notObvious().text("even if it's not immediately obvious", 2)
    ),
    delay(2, texts.everyProbSol().y(spaceNY[1], 1)),
    delay(2, texts.problem().y(spaceNY[1], 1)),
    delay(2, texts.solution().y(spaceNY[1], 1))
  );

  yield* waitUntil("knowingKey");

  const sparkleIcons: Icon[] = [];

  view.add(
    <>
      {range(60).map((index) => (
        <Icon
          ref={makeRef(sparkleIcons, index)}
          icon={"ph:sparkle-light"}
          size={Math.random() * spaceY["1"]}
          color={
            colors[
              colorPalettes[
                Math.floor(Math.random() * colorPalettes.length)
              ] as keyof typeof colors
            ][500]
          }
          position={[Math.random() * 1152 - 288, Math.random() * 810 - 405]}
          scale={0}
        />
      ))}
      <Icon
        ref={icons.key}
        icon={"material-symbols:key-outline-rounded"}
        size={spaceY[1]}
        color={colors.green[500]}
        position={[Math.random() * 576 - 96, Math.random() * 450 - 225]}
        scale={0}
      />
      <Icon
        ref={icons.door}
        icon={"material-symbols:door-sliding-rounded"}
        size={spaceY[3]}
        color={colors.orange[500]}
        x={spaceNX[6]}
        scale={0}
      />
      <ExtendedCircle
        ref={circles.key}
        size={spaceY[3]}
        position={() => icons.key().position()}
        color="green"
        scale={0}
        lineWidth={8}
      />
    </>
  );

  yield* all(
    texts.everyProbSol().opacity(0, 1),
    texts.solution().opacity(0, 1),
    texts.problem().opacity(0, 1),
    texts.notObvious().opacity(0, 1),
    ...sparkleIcons.map((sparkle, i) => delay(i * 0.03, sparkle.scale(1, 1))),
    delay(0.5, icons.key().scale(1, 1)),
    delay(1.5, icons.door().scale(1, 1)),
    delay(2.5, circles.key().scale(1, 1.75)),
    delay(2.5, circles.key().opacity(0, 1.75))
  );

  view.add(
    <>
      <ExtendedCircle
        ref={circles.born}
        size={spaceY[3]}
        color="cyan"
        scale={0}
      >
        <Icon
          ref={icons.born}
          icon={"ph:baby"}
          color={colors.cyan[500]}
          size={spaceY[1.5]}
        />
        <ExtendedRect
          ref={rects.born}
          width={spaceX[3.25]}
          height={spaceY["0.67"]}
          color="cyan"
          y={spaceY["1.5"]}
        >
          <ExtendedTxt
            ref={texts.born}
            text={"Born with this faith"}
            fill={colors.cyan[950]}
            fontWeight={500}
          />
        </ExtendedRect>
      </ExtendedCircle>
      <Ray
        ref={rays.born}
        lineWidth={8}
        stroke={colors.red[500]}
        fromX={spaceNX[3]}
        toX={spaceX[3]}
        rotation={15}
        lineCap={"round"}
        end={0}
        opacity={0}
      />
    </>
  );

  rects.born().fill(colors.cyan[500]);

  yield* all(
    ...sparkleIcons.map((sparkle, i) => delay(i * 0.01, sparkle.scale(0, 0.5))),
    icons.key().scale(0, 1),
    icons.door().scale(0, 1),
    circles.born().scale(1, 1),
    rays.born().rotation(30, 2),
    rays.born().end(1, 2),
    rays.born().opacity(1, 2)
  );

  yield* waitUntil("cultivated");

  view.add(
    <>
      <ExtendedTxt
        ref={texts.faithCultiExp}
        text={"Faith is cultivated\nthrough experience"}
        fontSize={spaceY[1]}
        fontWeight={500}
        opacity={0}
        textAlign={"center"}
      />
      <ExtendedTxt
        ref={texts.faithCulti}
        text={"Faith"}
        fontSize={spaceY[1]}
        fontWeight={500}
        opacity={0}
        fill={colors.green[500]}
        stroke={colors.green[500]}
        lineWidth={1}
        position={[-270, -54]}
      />
      <ExtendedTxt
        ref={texts.expCulti}
        text={"experience"}
        fontSize={spaceY[1]}
        fontWeight={500}
        opacity={0}
        fill={colors.sky[500]}
        stroke={colors.sky[500]}
        lineWidth={1}
        position={[177, 54]}
      />
    </>
  );

  yield* all(
    circles.born().scale(0, 1),
    rays.born().end(0, 1),
    rays.born().opacity(0, 1),
    texts.faithCultiExp().opacity(1, 1),
    texts.faithCulti().opacity(1, 1),
    texts.expCulti().opacity(1, 1)
  );

  yield* waitUntil("solveProblem");

  view.add(
    <>
      <ExtendedCircle
        ref={circles.problem}
        size={spaceY[3]}
        color="emerald"
        scale={0}
      >
        <Icon
          ref={icons.problem}
          icon={"material-symbols:question-mark-rounded"}
          color={colors.emerald[500]}
          size={spaceY[1.5]}
        />
        <ExtendedRect
          ref={rects.problem}
          width={spaceX[2.75]}
          height={spaceY["0.67"]}
          color="emerald"
          y={spaceY["1.5"]}
        >
          <ExtendedTxt
            ref={texts.problem}
            text={"Solve a problem"}
            fill={colors.emerald[950]}
            fontWeight={500}
          />
        </ExtendedRect>
      </ExtendedCircle>
      <ExtendedCircle
        ref={circles.error}
        size={spaceY[3]}
        color="rose"
        scale={0}
        x={spaceX[2]}
      >
        <Icon
          ref={icons.error}
          icon={"material-symbols:error-outline-rounded"}
          color={colors.rose[500]}
          size={spaceY[1.5]}
        />
        <ExtendedRect
          ref={rects.error}
          width={spaceX[2.5]}
          height={spaceY["0.67"]}
          color="rose"
          y={spaceY["1.5"]}
        >
          <ExtendedTxt
            ref={texts.error}
            text={"Debug an error"}
            fill={colors.rose[950]}
            fontWeight={500}
          />
        </ExtendedRect>
      </ExtendedCircle>
      <ExtendedCircle
        ref={circles.function}
        size={spaceY[3]}
        color="indigo"
        scale={0}
        x={spaceX[4]}
      >
        <Icon
          ref={icons.function}
          icon={"f7:function"}
          color={colors.indigo[500]}
          size={spaceY[1.5]}
        />
        <ExtendedRect
          ref={rects.function}
          width={spaceX[3.25]}
          height={spaceY["0.67"]}
          color="indigo"
          y={spaceY["1.5"]}
        >
          <ExtendedTxt
            ref={texts.function}
            text={"Develop a function"}
            fill={colors.indigo[950]}
            fontWeight={500}
          />
        </ExtendedRect>
      </ExtendedCircle>
    </>
  );

  rects.problem().fill(colors.emerald[500]);
  rects.error().fill(colors.rose[500]);
  rects.function().fill(colors.indigo[500]);

  yield* all(
    texts.faithCultiExp().opacity(0, 1),
    texts.faithCulti().opacity(0, 1),
    texts.expCulti().opacity(0, 1),
    circles.problem().scale(1, 1),
    delay(1.5, circles.error().scale(1, 1)),
    delay(1.5, circles.problem().x(spaceNX[2], 1)),
    delay(3.5, circles.function().scale(1, 1)),
    delay(3.5, circles.problem().x(spaceNX[4], 1)),
    delay(3.5, circles.error().x(spaceX[0], 1))
  );

  yield* waitUntil("faithMuscle");

  view.add(
    <>
      <ExtendedTxt
        ref={texts.faithMuscle}
        fontSize={spaceY[1]}
        fontWeight={500}
      />
    </>
  );

  yield* all(
    circles.problem().scale(0, 1),
    circles.error().scale(0, 1),
    circles.function().scale(0, 1),
    delay(0.5, texts.faithMuscle().text("⇡ Faith 💪🏻", 1))
  );

  yield* waitUntil("goWrong");

  view.add(
    <>
      <ExtendedTxt ref={texts.goWrong} fontSize={spaceY[1]} fontWeight={500} />
      <ExtendedTxt
        ref={texts.canFix}
        fontSize={spaceY[1]}
        fontWeight={500}
        textAlign={"center"}
      />
    </>
  );

  yield* all(
    texts.faithMuscle().opacity(0, 1),
    texts.goWrong().text("Things go wrong", 1),
    delay(1, texts.canFix().text("But they can\nalso be fixed✅", 2)),
    delay(1, texts.goWrong().opacity(0, 1))
  );

  view.add(
    <>
      <Face ref={faces.you} size={spaceY[3]} scale={0} />
      <Line
        ref={lines.youSmile}
        lineWidth={4}
        stroke={faces.you().stroke()}
        points={[
          [spaceX[0.75], spaceY[0.5]],
          [0, spaceY[1.5]],
          [spaceNX[0.75], spaceY[0.5]],
        ]}
        radius={1000}
        start={0.5}
        y={() => faces.you().y()}
        end={0.5}
        opacity={0}
      />
    </>
  );

  yield* all(
    texts.canFix().opacity(0, 1),
    faces.you().scale(1, 1),
    lines.youSmile().start(0, 1),
    lines.youSmile().end(1, 1),
    lines.youSmile().opacity(1, 1)
  );

  view.add(
    <>
      <Img
        ref={images.err1}
        src={err1}
        width={spaceX[14]}
        y={spaceY[3]}
        opacity={0}
        radius={16}
      />
      <Img
        ref={images.err2}
        src={err2}
        width={spaceX[14]}
        y={294}
        opacity={0}
        radius={16}
      />
      <Img
        ref={images.err3}
        src={err3}
        width={spaceX[14]}
        y={361}
        opacity={0}
        radius={16}
      />
    </>
  );

  yield* waitUntil("looseConfi");

  yield* all(
    delay(1.5, images.err1().opacity(1, 1)),
    delay(1.5, images.err1().y(spaceY[2], 1)),
    delay(1.5, faces.you().y(spaceNY[2], 1)),
    lines.youSmile().points(
      [
        [spaceX[0.75], spaceY[0.67]],
        [0, spaceY[0]],
        [spaceNX[0.75], spaceY[0.67]],
      ],
      1
    )
  );

  yield* waitUntil("evenExperienced");

  const multiFaces: Face[] = [];

  view.add(
    <>
      {range(5).map((index) => {
        return (
          <Face
            ref={makeRef(multiFaces, index)}
            highlighted
            position={[spaceX[3] * index - spaceX[6], spaceNY[3]]}
            scale={0}
            size={spaceY[2]}
          />
        );
      })}
    </>
  );

  yield* all(
    faces.you().scale(0, 1),
    lines.youSmile().start(0.5, 1),
    lines.youSmile().end(0.5, 1),
    lines.youSmile().opacity(0, 1),
    ...multiFaces.map((face, i) => delay(0.2 * i, face.scale(1, 1))),
    delay(2, images.err1().y(112, 1)),
    delay(2, images.err2().opacity(1, 1)),
    delay(4, images.err3().opacity(1, 1)),
    delay(4, images.err1().y(31, 1)),
    delay(4, images.err2().y(212, 1))
  );

  view.add(
    <>
      <ExtendedTxt
        ref={texts.unwavering}
        fontSize={spaceY["0.75"]}
        fontWeight={500}
        y={spaceY[1]}
        textAlign={"center"}
      />
      <ExtendedTxt
        ref={texts.wayForward}
        fontSize={spaceY["1"]}
        fontWeight={500}
        y={spaceY[1]}
        textAlign={"center"}
        text={"There's always a way forward🛣️"}
        opacity={0}
      />
    </>
  );

  yield* all(
    images.err1().opacity(0, 1),
    images.err2().opacity(0, 1),
    images.err3().opacity(0, 1),
    texts.unwavering().text("They've developed an\nunwavering faith", 2.5),
    delay(2.5, texts.unwavering().opacity(0, 1)),
    delay(2.5, texts.wayForward().opacity(1, 1))
  );

  yield* waitUntil("takeaway");

  view.add(
    <>
      <ExtendedTxt
        ref={texts.takeaway}
        fontSize={spaceY[0.75]}
        fontWeight={500}
        textAlign={"center"}
      />
    </>
  );

  yield* all(
    texts.wayForward().opacity(0, 1),
    ...multiFaces.map((face, i) => delay(0.2 * i, face.scale(0, 1))),
    texts.takeaway().text("The most important\ntakeaway✨ of this video:", 2)
  );

  yield* waitUntil("hvFaith");

  view.add(
    <>
      <ExtendedTxt
        ref={texts.haveFaith}
        text={"Have Faith"}
        fontSize={spaceY["1.25"]}
        fontWeight={600}
        fill={colors.slate[300]}
        position={[spaceNX[3.75], spaceY[0]]}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.with}
        text={"With"}
        fontSize={spaceY["0.75"]}
        fontWeight={500}
        fill={colors.slate[300]}
        position={[spaceX[3.75], spaceNY[1.5]]}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.patience}
        text={"Patience"}
        fontSize={spaceY["1"]}
        fontWeight={600}
        fill={colors.teal[500]}
        position={[spaceX[3.75], spaceY[0]]}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.persistence}
        text={"Persistence"}
        fontSize={spaceY["1"]}
        fontWeight={600}
        fill={colors.amber[500]}
        position={[spaceX[3.75], spaceY[0.75]]}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.thinking}
        text={"Thinking"}
        fontSize={spaceY["1"]}
        fontWeight={600}
        fill={colors.purple[500]}
        position={[spaceX[3.75], spaceY[1.5]]}
        opacity={0}
      />
      <ExtendedRect
        ref={rects.haveFaith}
        size={0}
        position={[spaceNX["7.75"], spaceNY["5"]]}
        color="slate"
        highlighted
        radius={32}
        opacity={0}
      />
      <Icon
        ref={icons.sparkle}
        icon={"ph:sparkle-light"}
        size={spaceY[1]}
        position={[spaceNX["3.75"], spaceNY[2]]}
        color={colors.slate[0]}
        scale={0}
      />
    </>
  );

  yield* all(
    texts.takeaway().opacity(0, 1),
    texts.haveFaith().opacity(1, 1),
    delay(0.9, texts.with().opacity(1, 1)),
    delay(0.9, texts.patience().opacity(1, 1)),
    delay(1.8, texts.persistence().opacity(1, 1)),
    delay(1.8, texts.patience().y(spaceNY[0.75], 1)),
    delay(1.8, texts.with().y(spaceNY[2.25], 1)),
    delay(2.7, texts.thinking().opacity(1, 1)),
    delay(2.7, texts.persistence().y(spaceY[0], 1)),
    delay(2.7, texts.patience().y(spaceNY[1.5], 1)),
    delay(2.7, texts.with().y(spaceNY[3], 1))
  );

  view.add(
    <>
      <ExtendedTxt
        ref={texts.nWorking}
        fontSize={spaceY[1]}
        fontWeight={500}
        position={[spaceNX[5], spaceY[4]]}
        fill={colors.red[500]}
      />
      <ExtendedTxt
        ref={texts.working}
        fontSize={spaceY[1]}
        fontWeight={500}
        position={[spaceX[5.33], spaceY[4]]}
        fill={colors.green[500]}
      />
      <Line
        ref={lines.left}
        stroke={colors.slate[0]}
        lineWidth={4}
        points={[
          [spaceNX[7.5], spaceY[3.25]],
          [spaceNX[9], spaceY[2]],
          () => rects.haveFaith().left(),
        ]}
        radius={200}
        lineDash={[10, 10]}
        endArrow
        end={0}
        opacity={0}
      />
      <Line
        ref={lines.right}
        stroke={colors.slate[0]}
        lineWidth={4}
        points={[
          () => rects.haveFaith().right(),
          [spaceX[9], spaceY[2]],
          [spaceX[7], spaceY[3.25]],
        ]}
        radius={200}
        lineDash={[10, 10]}
        endArrow
        startOffset={spaceY["0.25"]}
        end={0}
        opacity={0}
      />
    </>
  );

  yield* all(
    texts.with().y(spaceNY[4], 1),
    texts.patience().y(spaceNY[2.5], 1),
    texts.persistence().y(spaceNY[1], 1),
    texts.thinking().y(spaceY["0.5"], 1),
    texts.haveFaith().y(spaceNY["1"], 1),
    rects.haveFaith().height(spaceY[6.75], 1),
    rects.haveFaith().width(spaceX[15], 1),
    rects.haveFaith().opacity(1, 1),
    rects.haveFaith().position([spaceNX["0.25"], spaceNY["1.67"]], 1),
    delay(1, texts.nWorking().text("Not Working", 1)),
    delay(1, lines.left().end(1, 1)),
    delay(1, lines.left().opacity(1, 1)),
    delay(1.5, texts.working().text("Working", 1)),
    delay(1.5, lines.right().end(1, 1)),
    delay(1.5, lines.right().opacity(1, 1))
  );

  yield* waitUntil("staring");

  faces.you().y(spaceNY[3]);

  yield* all(
    rects.haveFaith().opacity(0, 1),
    texts.haveFaith().opacity(0, 1),
    texts.with().opacity(0, 1),
    texts.patience().opacity(0, 1),
    texts.persistence().opacity(0, 1),
    texts.thinking().opacity(0, 1),
    texts.nWorking().opacity(0, 1),
    texts.working().opacity(0, 1),
    lines.left().opacity(0, 1),
    lines.right().opacity(0, 1),
    lines.left().end(0, 1),
    lines.right().end(0, 1),
    faces.you().scale(1, 1),
    lines.youSmile().start(0, 1),
    lines.youSmile().end(1, 1),
    lines.youSmile().opacity(1, 1),
    images.err1().opacity(1, 1),
    images.err2().opacity(1, 1),
    images.err3().opacity(1, 1)
  );

  yield* waitUntil("deepBreath");

  yield* all(
    lines.youSmile().points(
      [
        [spaceX[0.75], spaceY[0.5]],
        [0, spaceY[1.5]],
        [spaceNX[0.75], spaceY[0.5]],
      ],
      1
    )
  );

  yield* waitUntil("everyBug");

  icons.problem().icon("solar:bug-linear");
  texts.problem().text("Bugs have cause");
  texts.error().text("Errors have solution");
  texts.function().text("Goals can be accomplished");
  rects.problem().width(spaceX[3]);
  rects.error().width(spaceX[3.33]);
  rects.function().width(spaceX[4.5]);
  circles.problem().x(0);
  circles.error().x(spaceX["2.5"]);

  yield* all(
    lines.youSmile().start(0.5, 1),
    lines.youSmile().end(0.5, 1),
    lines.youSmile().opacity(0, 1),
    images.err1().opacity(0, 1),
    images.err2().opacity(0, 1),
    images.err3().opacity(0, 1),
    faces.you().scale(0, 1),
    circles.problem().scale(1, 1),
    delay(2, circles.error().scale(1, 1)),
    delay(2, circles.problem().x(spaceNX["2.5"], 1)),
    delay(4, circles.function().scale(1, 1)),
    delay(4, circles.problem().x(spaceNX["5"], 1)),
    delay(4, circles.function().x(spaceX["5"], 1)),
    delay(4, circles.error().x(0, 1)),
  );

  yield* waitFor(1);
});
