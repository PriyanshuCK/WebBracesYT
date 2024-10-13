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
  any,
  Color,
  createRef,
  createRefMap,
  createSignal,
  delay,
  Direction,
  easeInCubic,
  easeInOutBounce,
  easeInOutQuad,
  easeOutBounce,
  easeOutCubic,
  linear,
  loopFor,
  makeRef,
  range,
  slideTransition,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import colors, { colorPalettes } from "../lib/colors";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import {
  ExtendedCircle,
  ExtendedFillSVG,
  ExtendedRect,
  ExtendedStrokeSVG,
  Face,
  Grid,
} from "../nodes";
import err1 from "../images/err1.png";
import err2 from "../images/err2.png";
import err3 from "../images/err3.png";
import centerDiv from "../images/centerDiv.png";
import {
  Brain,
  Broom,
  Bulb,
  Dumbbells,
  HotCup,
  ManWalking,
  ManWalkingStroke,
  Music,
  MusicNote,
  PaintBrush,
  SearchStroke,
  WeightLiftD,
} from "../lib/svgs";

export default makeScene2D(function* (view) {
  view.fontFamily("Geist");
  // view.add(
  //   <>
  //     <Grid />
  //   </>
  // );

  yield* slideTransition(Direction.Right, 0.5);

  const colors500 = [
    "#ef4444", // red-500
    "#f97316", // orange-500
    "#f59e0b", // amber-500
    "#eab308", // yellow-500
    "#84cc16", // lime-500
    "#22c55e", // green-500
    "#10b981", // emerald-500
    "#14b8a6", // teal-500
    "#06b6d4", // cyan-500
    "#0ea5e9", // sky-500
    "#3b82f6", // blue-500
    "#6366f1", // indigo-500
    "#8b5cf6", // violet-500
    "#a855f7", // purple-500
    "#d946ef", // fuchsia-500
    "#ec4899", // pink-500
    "#f43f5e", // rose-500
  ];
  const colors700 = [
    "#b91c1c", // red
    "#c2410c", // orange
    "#b45309", // amber
    "#a16207", // yellow
    "#4d7c0f", // lime
    "#15803d", // green
    "#047857", // emerald
    "#0f766e", // teal
    "#0e7490", // cyan
    "#0369a1", // sky
    "#1d4ed8", // blue
    "#4338ca", // indigo
    "#6d28d9", // violet
    "#7e22ce", // purple
    "#a21caf", // fuchsia
    "#be185d", // pink
    "#be123c", // rose
  ];

  const num2 = createRef<Path>();
  const head2 = createRef<ExtendedTxt>();
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
        ref={num2}
        lineWidth={0.5}
        stroke={colors.orange[500]}
        data={
          "M0.28125 0.96875C0.677083 1.26042 1.07292 1.47917 1.46875 1.625C1.88542 1.75 2.26042 1.83333 2.59375 1.875C2.96875 1.9375 3.34375 1.94792 3.71875 1.90625C4.07292 1.86458 4.4375 1.73958 4.8125 1.53125C5.1875 1.32292 5.625 1.10417 6.125 0.875C6.625 0.645833 7.20833 0.447917 7.875 0.28125C8.5625 0.09375 9.38542 0 10.3438 0C10.7604 0 11.1979 0.0833333 11.6562 0.25C12.1354 0.416667 12.5938 0.635417 13.0312 0.90625C13.4688 1.15625 13.8646 1.4375 14.2188 1.75C14.5938 2.0625 14.875 2.375 15.0625 2.6875C15.2708 3 15.4167 3.51042 15.5 4.21875C15.5833 4.90625 15.6146 5.65625 15.5938 6.46875C15.5729 7.28125 15.5 8.08333 15.375 8.875C15.2708 9.66667 15.1146 10.3125 14.9062 10.8125C14.6562 11.25 14.1771 11.8125 13.4688 12.5C12.8646 13.0833 11.9583 13.8333 10.75 14.75C9.54167 15.6667 7.91667 16.7604 5.875 18.0312C7.08333 18.0104 8.09375 17.9792 8.90625 17.9375C9.73958 17.875 10.4167 17.8125 10.9375 17.75C11.5417 17.6667 12.0208 17.5833 12.375 17.5C12.6875 17.375 13.0208 17.1979 13.375 16.9688C13.6667 16.7604 13.9792 16.4896 14.3125 16.1562C14.6667 15.8229 15.0104 15.3854 15.3438 14.8438C15.4062 15.9688 15.4688 16.8542 15.5312 17.5C15.5729 17.875 15.6042 18.1979 15.625 18.4688C15.6458 18.7188 15.6667 19.0104 15.6875 19.3438C15.7083 19.6354 15.7188 19.9688 15.7188 20.3438C15.7396 20.7188 15.7708 21.1146 15.8125 21.5312C14.7708 21.2604 13.8229 21.0521 12.9688 20.9062C12.1146 20.7396 11.3854 20.625 10.7812 20.5625C10.0729 20.4792 9.4375 20.4375 8.875 20.4375C8.29167 20.4583 7.64583 20.5104 6.9375 20.5938C6.3125 20.6771 5.5625 20.8021 4.6875 20.9688C3.83333 21.1146 2.86458 21.3333 1.78125 21.625C1.69792 21.3958 1.625 21.1667 1.5625 20.9375C1.5 20.6875 1.44792 20.4479 1.40625 20.2188C1.34375 19.9688 1.29167 19.7188 1.25 19.4688C1.20833 19.2188 1.16667 18.9792 1.125 18.75C1.08333 18.5417 1.05208 18.3229 1.03125 18.0938C1.01042 17.8646 0.989583 17.6458 0.96875 17.4375C2.63542 16.375 3.98958 15.4167 5.03125 14.5625C6.07292 13.6875 6.89583 12.9479 7.5 12.3438C8.1875 11.6354 8.70833 10.9896 9.0625 10.4062C9.41667 9.69792 9.70833 8.91667 9.9375 8.0625C10.1667 7.20833 10.2396 6.41667 10.1562 5.6875C10.0938 4.95833 9.84375 4.36458 9.40625 3.90625C8.96875 3.42708 8.27083 3.21875 7.3125 3.28125C6.6875 3.32292 6.09375 3.54167 5.53125 3.9375C4.98958 4.33333 4.48958 4.8125 4.03125 5.375C3.57292 5.9375 3.16667 6.54167 2.8125 7.1875C2.45833 7.8125 2.15625 8.40625 1.90625 8.96875C1.67708 9.53125 1.48958 10 1.34375 10.375C1.21875 10.75 1.15625 10.9479 1.15625 10.9688C1.13542 11.0104 1.10417 10.8542 1.0625 10.5C1.04167 10.1458 1.01042 9.70833 0.96875 9.1875C0.947917 8.64583 0.916667 8.08333 0.875 7.5C0.833333 6.91667 0.791667 6.42708 0.75 6.03125C0.729167 5.71875 0.697917 5.3125 0.65625 4.8125C0.59375 4 0.46875 2.71875 0.28125 0.96875Z"
        }
        scale={10}
        end={0}
        position={[spaceNX["0.5"], spaceNY[1.25]]}
      />
      <ExtendedTxt
        ref={head2}
        text={"Embrace Failures"}
        opacity={0}
        y={spaceY[2]}
        fontWeight={600}
        fontSize={spaceY[2]}
      />
    </>
  );

  yield* num2().end(1, 1);
  yield* all(head2().opacity(1, 1), head2().y(0, 1));
  const circleYouProgress = createSignal(0);
  const i1 = Math.floor(Math.random() * colors500.length);
  const i2 = Math.floor(Math.random() * colors500.length);
  const i3 = Math.floor(Math.random() * colors500.length);
  const i4 = Math.floor(Math.random() * colors500.length);

  view.add(
    <>
      <Spline
        ref={splines.journey}
        lineWidth={4}
        stroke={colors.slate[0]}
        points={[
          [spaceNX[6.5], spaceY[5]],
          [spaceNX[4.75], spaceY[4.75]],
          [spaceNX[3.75], spaceY[4]],
          [spaceNX[2.75], spaceY[4.25]],
          [spaceNX[2], spaceY[3.25]],
          [spaceNX[1], spaceY[3.75]],
          [spaceX[1], spaceY[2.5]],
          [spaceX[2.5], spaceY[3]],
          [spaceX[4], spaceY[1]],
          [spaceX[5.25], spaceY[1.25]],
          [spaceX[6.5], spaceY[0]],
        ]}
        opacity={0}
        end={0.1}
      />
      <ExtendedTxt
        ref={texts.yourProJourney}
        text={"Your Programming Journey"}
        fontSize={spaceY[0.5]}
        position={[spaceX[5.5], spaceY[4.75]]}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.failuresInevitable}
        text={"Failures are inevitable"}
        fontSize={spaceY[1]}
        fontWeight={500}
        y={spaceNY["3.5"]}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.inevitable}
        text={"inevitable"}
        fontSize={spaceY[1]}
        fontWeight={500}
        position={[261.4, spaceNY["3.5"]]}
        fill={colors.red[500]}
        lineWidth={1}
        stroke={colors.red[500]}
        opacity={0}
      />
      <ExtendedCircle
        ref={circles.you}
        position={() =>
          splines.journey().getPointAtPercentage(circleYouProgress()).position
        }
        color="orange"
        scale={0}
      />
      <ExtendedTxt
        ref={texts.you}
        text={"You"}
        position={() => circles.you().position()}
        opacity={0}
        textAlign={"center"}
      />
      <Node ref={nodes.failureCircles}>
        <ExtendedCircle
          ref={circles.fail1}
          fill={colors700[0]}
          color="red"
          position={[-265, 382]}
          size={spaceY["0.33"]}
          lineWidth={4}
          scale={0}
        />
        <ExtendedCircle
          ref={circles.fail2}
          fill={colors700[0]}
          color="red"
          position={[-102, 336]}
          size={spaceY["0.33"]}
          lineWidth={4}
          scale={0}
        />
        <ExtendedCircle
          ref={circles.fail3}
          fill={colors700[0]}
          color="red"
          position={[230, 272]}
          size={spaceY["0.33"]}
          lineWidth={4}
          scale={0}
        />
        <ExtendedCircle
          ref={circles.fail4}
          fill={colors700[0]}
          color="red"
          position={[493, 114]}
          size={spaceY["0.33"]}
          lineWidth={4}
          scale={0}
        />
      </Node>
    </>
  );

  yield* all(
    head2().opacity(0, 0.5),
    num2().opacity(0, 0.5),
    circleYouProgress(0.555, 4),
    circles.you().scale(1, 1),
    circles.you().size(spaceY[2], 4),
    texts.you().opacity(1, 1),
    texts.yourProJourney().opacity(1, 1),
    splines.journey().opacity(1, 1),
    splines.journey().end(1, 2),
    delay(3.6, circles.fail1().scale(1, 1)),
    delay(4.2, texts.failuresInevitable().opacity(1, 1)),
    delay(4.2, texts.inevitable().opacity(1, 1)),
    delay(3.8, circles.fail2().scale(1, 1)),
    delay(4, circles.fail3().scale(1, 1)),
    delay(4.2, circles.fail4().scale(1, 1))
  );

  view.add(
    <>
      <ExtendedCircle
        ref={circles.youEyeL}
        x={spaceNX[0.5]}
        color="orange"
        size={spaceY["0.33"]}
        scale={0}
        fill={colors.orange[700]}
        lineWidth={3}
        y={() => circles.you().y() + spaceNY["0.5"]}
      />
      <ExtendedCircle
        ref={circles.youEyeR}
        x={spaceX[0.5]}
        color="orange"
        size={spaceY["0.33"]}
        scale={0}
        fill={colors.orange[700]}
        lineWidth={3}
        y={() => circles.you().y() + spaceNY["0.5"]}
      />
      <Line
        ref={lines.youSmile}
        lineWidth={4}
        stroke={colors.orange[500]}
        points={[
          [spaceX[0.75], spaceY[0.5]],
          [0, spaceY[1.5]],
          [spaceNX[0.75], spaceY[0.5]],
        ]}
        radius={1000}
        start={0.5}
        y={() => circles.you().y()}
        end={0.5}
      />
    </>
  );

  yield* waitUntil("itsEasy");

  yield* all(
    splines.journey().opacity(0, 0.5),
    circles.fail1().scale(0, 0.5),
    circles.fail2().scale(0, 0.5),
    circles.fail3().scale(0, 0.5),
    circles.fail4().scale(0, 0.5),
    texts.yourProJourney().opacity(0, 0.5),
    texts.failuresInevitable().opacity(0, 0.5),
    texts.inevitable().opacity(0, 0.5),
    circles.you().size(spaceY[3], 0.5),
    circles.you().position([0, 0], 0.5),
    circles.you().highlight(true, 0.5),
    texts.you().opacity(0, 0.5),
    circles.youEyeL().scale(1, 1),
    circles.youEyeR().scale(1, 1),
    lines.youSmile().start(0, 1),
    lines.youSmile().end(1, 1),
    delay(
      1,
      lines.youSmile().points(
        [
          [spaceX[0.75], spaceY[0.67]],
          [0, spaceY[0.5]],
          [spaceNX[0.75], spaceY[0.67]],
        ],
        1
      )
    )
  );

  view.add(
    <>
      <Img
        ref={images.err1}
        src={err1}
        width={spaceX[14]}
        y={135}
        opacity={0}
      />
      <Img
        ref={images.err2}
        src={err2}
        width={spaceX[14]}
        y={249}
        opacity={0}
      />
      <Img
        ref={images.err3}
        src={err3}
        width={spaceX[14]}
        y={316}
        opacity={0}
      />
    </>
  );

  yield* all(
    circles.you().y(spaceNY[3.5], 1),
    images.err1().opacity(1, 1),
    delay(1.5, images.err1().y(67, 1)),
    delay(1.5, images.err2().opacity(1, 1)),
    delay(
      1.5,
      lines.youSmile().points(
        [
          [spaceX[0.75], spaceY[0.67]],
          [0, spaceY[0]],
          [spaceNX[0.75], spaceY[0.67]],
        ],
        1
      )
    ),
    delay(3, images.err1().y(-14, 1)),
    delay(3, images.err2().y(167, 1)),
    delay(3, images.err3().opacity(1, 1)),
    delay(
      3,
      lines.youSmile().points(
        [
          [spaceX[0.75], spaceY[0.67]],
          [0, spaceNY[0.5]],
          [spaceNX[0.75], spaceY[0.67]],
        ],
        1
      )
    )
  );

  view.add(
    <>
      <ExtendedTxt
        ref={texts.butOkay}
        text={"But that's okay!"}
        fontWeight={500}
        fontSize={spaceY[1]}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.okay}
        text={"okay"}
        fontWeight={500}
        fontSize={spaceY[1]}
        fill={colors.green[500]}
        x={206}
        lineWidth={1}
        stroke={colors.green[500]}
        opacity={0}
      />
    </>
  );

  yield* all(
    circles.you().scale(0, 1),
    circles.youEyeL().scale(0, 1),
    circles.youEyeR().scale(0, 1),
    lines.youSmile().start(0.5, 1),
    lines.youSmile().end(0.5, 1),
    images.err1().opacity(0, 1),
    images.err2().opacity(0, 1),
    images.err3().opacity(0, 1),
    texts.butOkay().opacity(1, 1),
    texts.okay().opacity(1, 1)
  );

  view.add(
    <>
      <ExtendedTxt
        ref={texts.failure}
        text={"Failures don't mean"}
        fontWeight={500}
        fontSize={spaceY[1]}
        opacity={0}
      />
    </>
  );

  yield* all(
    texts.butOkay().opacity(0, 1),
    texts.okay().opacity(0, 1),
    delay(0.5, texts.failure().opacity(1, 1)),
    delay(
      1.25,
      texts.failure().text("Failures don't mean,\n⇢ you're stupid", 1.25)
    ),
    delay(
      2.67,
      texts
        .failure()
        .text("Failures don't mean,\n⇢ you're stupid\n⇢ you won't succeed", 1.5)
    )
  );

  const circlesArray: ExtendedCircle[] = [];
  const peopleNodes: Node[] = [];
  view.add(
    <>
      <ExtendedTxt
        ref={texts.happens}
        fontWeight={500}
        fontSize={spaceY[1]}
        y={spaceNY[2.5]}
      />
      <Node ref={nodes.everyone}>
        {range(12).map((index) => {
          const colorIndex = Math.floor(Math.random() * colors500.length);
          return (
            <>
              <Node
                ref={makeRef(peopleNodes, index)}
                scale={0}
                position={[
                  spaceX[1.5] * index - 792,
                  spaceY[1] * (index % 2) + spaceY[1],
                ]}
              >
                <Circle
                  ref={makeRef(circlesArray, index)}
                  stroke={colors500[colorIndex]}
                  lineWidth={4}
                  size={spaceY[1]}
                  fill={new Color(colors500[colorIndex]).alpha(0.1)}
                />
                <Circle
                  x={() => circlesArray[index].x() - 16.32}
                  y={() => circlesArray[index].y() - 15.3}
                  size={16}
                  fill={colors700[colorIndex]}
                  stroke={colors500[colorIndex]}
                  lineWidth={3}
                />
                <Circle
                  x={() => circlesArray[index].x() + 16.32}
                  y={() => circlesArray[index].y() - 15.3}
                  size={16}
                  fill={colors700[colorIndex]}
                  stroke={colors500[colorIndex]}
                  lineWidth={3}
                />
              </Node>
            </>
          );
        })}
      </Node>
    </>
  );

  yield* texts.failure().opacity(0, 1);

  yield* all(
    texts.happens().text("This happens with everyone...", 1),
    ...peopleNodes.map((node, i) => delay(0.1 * i, node.scale(1, 1)))
  );

  yield* waitUntil("evenExperienced");

  yield* all(
    texts.happens().opacity(0, 1),
    ...peopleNodes.map(
      (node, i) => i != 4 && delay(0.05 * (11 - i), node.scale(0, 1))
    ),
    splines.journey().opacity(1, 1),
    peopleNodes[4].position([spaceX[1], spaceY["2.25"]], 1),
    peopleNodes[4].scale(1.5, 1),
    delay(1, peopleNodes[4].position([spaceX["2.25"], spaceY[2.75]], 2))
  );

  view.add(
    <>
      <Line
        ref={lines.expSmile}
        lineWidth={4}
        stroke={colors.slate[100]}
        points={[
          [spaceX[0.33], spaceY[0.25]],
          [0, spaceY[0.75]],
          [spaceNX[0.33], spaceY[0.25]],
        ]}
        radius={1000}
        start={0.5}
        end={0.5}
      />
    </>
  );

  yield* all(
    peopleNodes[4].position([0, 0], 1),
    splines.journey().opacity(0, 1),
    delay(1, lines.expSmile().start(0, 1)),
    delay(1, lines.expSmile().end(1, 1))
  );

  view.add(
    <>
      <ExtendedTxt
        ref={texts.failuresOpportunities}
        fontSize={spaceY[1]}
        fontWeight={500}
        y={spaceNY[4]}
        textAlign={"center"}
      />
    </>
  );

  yield* all(
    splines.journey().opacity(1, 1),
    circles.fail1().scale(1, 1),
    circles.fail2().scale(1, 1),
    circles.fail3().scale(1, 1),
    circles.fail4().scale(1, 1),
    delay(0.25, texts.failuresOpportunities().text("Failures", 1)),
    delay(
      2.25,
      texts.failuresOpportunities().text("Failures are opportunities", 1.5)
    ),
    delay(2.2, circles.fail1().fill(colors.green[700], 1)),
    delay(2.2, circles.fail1().stroke(colors.green[500], 1)),
    delay(2.4, circles.fail2().fill(colors.green[700], 1)),
    delay(2.4, circles.fail2().stroke(colors.green[500], 1)),
    delay(2.6, circles.fail3().fill(colors.green[700], 1)),
    delay(2.6, circles.fail3().stroke(colors.green[500], 1)),
    delay(2.8, circles.fail4().fill(colors.green[700], 1)),
    delay(2.8, circles.fail4().stroke(colors.green[500], 1)),
    delay(
      3.67,
      texts
        .failuresOpportunities()
        .text("Failures are opportunities\nto learn & grow", 1.5)
    )
  );

  view.add(
    <>
      <Icon
        ref={icons.message}
        icon={"material-symbols:chat-error-rounded"}
        size={spaceY[1.25]}
        x={spaceNX[2.5]}
        color={colors.red[500]}
        scale={0}
      />
      <Icon
        ref={icons.bug}
        icon={"solar:bug-linear"}
        size={spaceY[1.25]}
        x={spaceX[0]}
        color={colors.teal[500]}
        scale={0}
      />
      <Icon
        ref={icons.head}
        icon={"emojione-monotone:thinking-face"}
        size={spaceY[1.25]}
        x={spaceX[2.5]}
        color={colors.yellow[500]}
        scale={0}
      />
      <ExtendedTxt
        ref={texts.goldenOppo}
        fontSize={spaceY[1]}
        fontWeight={500}
        y={spaceY[1]}
      />
    </>
  );

  yield* all(
    texts.failuresOpportunities().opacity(0, 1),
    splines.journey().opacity(0, 1),
    circles.fail1().scale(0, 1),
    circles.fail2().scale(0, 1),
    circles.fail3().scale(0, 1),
    circles.fail4().scale(0, 1),
    lines.expSmile().start(0.5, 1),
    lines.expSmile().end(0.5, 1),
    peopleNodes[4].scale(0, 1),
    delay(0, icons.message().scale(1, 1)),
    delay(1.25, icons.bug().scale(1, 1)),
    delay(2.5, icons.head().scale(1, 1)),
    delay(4, icons.message().y(spaceNY[1], 1)),
    delay(4, icons.bug().y(spaceNY[1], 1)),
    delay(4, icons.head().y(spaceNY[1], 1)),
    delay(4.5, texts.goldenOppo().text("opportunity", 1)),
    delay(6.25, texts.goldenOppo().text("opportunity to learn", 1))
  );

  view.add(
    <>
      <Face
        ref={faces.you}
        color="orange"
        size={spaceY["2.5"]}
        highlighted
        scale={0}
      />
      <Node ref={nodes.expected}>
        <ExtendedTxt
          ref={texts.knowEvery1}
          text={"How to center a div?"}
          opacity={0}
          position={[0, spaceY[4.5]]}
          fontSize={spaceY["0.33"]}
        />
        <ExtendedTxt
          ref={texts.knowEvery2}
          text={"'let' vs 'var' vs 'const'"}
          opacity={0}
          position={[spaceNX[5], 0]}
          fontSize={spaceY["0.33"]}
        />
        <ExtendedTxt
          ref={texts.knowEvery3}
          text={"purpose of 'async' and 'await'"}
          opacity={0}
          position={[0, spaceNY[4.5]]}
          fontSize={spaceY["0.33"]}
        />
        <ExtendedTxt
          ref={texts.knowEvery4}
          text={"optimizing images for the web"}
          opacity={0}
          position={[spaceNX[5], spaceY[3]]}
          fontSize={spaceY["0.33"]}
        />
        <ExtendedTxt
          ref={texts.knowEvery5}
          text={"binary search algorithm"}
          opacity={0}
          position={[spaceX[5], spaceY[3]]}
          fontSize={spaceY["0.33"]}
        />
        <ExtendedTxt
          ref={texts.knowEvery6}
          text={"'margin' vs 'padding'"}
          opacity={0}
          position={[spaceX[5], 0]}
          fontSize={spaceY["0.33"]}
        />
        <ExtendedTxt
          ref={texts.knowEvery7}
          text={"'innerHTML' vs 'textContent'"}
          opacity={0}
          position={[spaceNX[5], spaceNY[3]]}
          fontSize={spaceY["0.33"]}
        />
        <ExtendedTxt
          ref={texts.knowEvery8}
          text={"purpose of the :has selector"}
          opacity={0}
          position={[spaceX[5], spaceNY[3]]}
          fontSize={spaceY["0.33"]}
        />
      </Node>
    </>
  );

  yield* waitUntil("notExpected");

  yield* all(
    icons.message().scale(0, 1),
    icons.bug().scale(0, 1),
    icons.head().scale(0, 1),
    texts.goldenOppo().opacity(0, 1),
    faces.you().scale(1, 1),
    delay(1.6, texts.knowEvery1().opacity(1, 1)),
    delay(1.8, texts.knowEvery2().opacity(1, 1)),
    delay(2, texts.knowEvery3().opacity(1, 1)),
    delay(2.2, texts.knowEvery4().opacity(1, 1)),
    delay(2.4, texts.knowEvery5().opacity(1, 1)),
    delay(2.6, texts.knowEvery6().opacity(1, 1)),
    delay(1.2, texts.knowEvery7().opacity(1, 1)),
    delay(1.4, texts.knowEvery8().opacity(1, 1))
  );

  const sparkleIcons: Icon[] = [];

  view.add(
    <>
      {range(50).map((index) => (
        <Icon
          ref={makeRef(sparkleIcons, index)}
          icon={"ph:sparkle-light"}
          size={Math.random() * spaceY["0.75"]}
          color={
            colors[
              colorPalettes[
                Math.floor(Math.random() * colorPalettes.length)
              ] as keyof typeof colors
            ][500]
          }
          position={[Math.random() * 1632 - 816, Math.random() * 810 - 405]}
          scale={0}
        />
      ))}
    </>
  );

  yield* all(
    nodes.expected().opacity(0, 1),
    faces.you().scale(0, 1),
    ...sparkleIcons.map((sparkle, i) =>
      delay(i / 50, sparkle.scale(Math.random() + 0.5, 2, easeInOutBounce))
    ),
    ...sparkleIcons.map((sparkle, i) =>
      delay(i / 50 + 2, sparkle.scale(i / 50 + 0.5, 2, easeInOutBounce))
    ),
    ...sparkleIcons.map((sparkle, i) =>
      delay(i / 50 + 4, sparkle.scale(Math.random() + 0.5, 2, easeInOutBounce))
    ),
    ...sparkleIcons.map((sparkle, i) =>
      delay(i / 50 + 6, sparkle.scale(i / 50 + 0.5, 2, easeInOutBounce))
    )
  );

  view.add(
    <>
      <ExtendedCircle
        ref={circles.bubble1}
        position={[spaceX[1.25], spaceNY[1.25]]}
        color="slate"
        scale={0}
        size={spaceY["0.25"]}
      />
      <ExtendedCircle
        ref={circles.bubble2}
        position={[spaceX[1.67], spaceNY[1.67]]}
        color="slate"
        scale={0}
        size={spaceY["0.5"]}
      />
      <ExtendedCircle
        ref={circles.bubble3}
        position={[spaceX[2.33], spaceNY[2.33]]}
        color="slate"
        scale={0}
        size={spaceY[1]}
      >
        <ExtendedTxt
          text={"?"}
          fontSize={spaceY["0.67"]}
          fill={colors.red[500]}
          fontWeight={500}
        />
      </ExtendedCircle>
    </>
  );

  const multiFaces: Face[] = [];

  view.add(
    <>
      {range(15).map((index) => {
        return (
          <Face
            ref={makeRef(multiFaces, index)}
            highlighted
            position={[
              spaceX[2] * Math.floor(index % 5) - spaceX[4],
              spaceY[2] * Math.floor(index / 5) - spaceY[2],
            ]}
            scale={0}
          />
        );
      })}
    </>
  );

  yield* all(
    multiFaces[7].scale(2, 1),
    ...sparkleIcons.map((sparkle) => sparkle.scale(0, 1)),
    delay(0.4, circles.bubble1().scale(1, 1)),
    delay(0.6, circles.bubble2().scale(1, 1)),
    delay(0.8, circles.bubble3().scale(1, 1))
  );

  yield* waitUntil("first");

  yield* all(
    circles.bubble1().scale(0, 1),
    circles.bubble2().scale(0, 1),
    circles.bubble3().scale(0, 1),
    ...multiFaces.map((face, i) => delay(0.04 * i + 1, face.scale(1, 1)))
  );

  const quesMarks: ExtendedTxt[] = [];

  view.add(
    <>
      <ExtendedTxt
        ref={texts.quesMarkU}
        text={"?"}
        fontSize={spaceY["0.67"]}
        fontWeight={500}
        position={[spaceX["0.67"], spaceNY["0.5"]]}
        opacity={0}
      />
      {range(5).map((index) => (
        <ExtendedTxt
          ref={makeRef(quesMarks, index)}
          text={"?"}
          fontSize={spaceY["0.67"]}
          fontWeight={500}
          position={[
            spaceX["0.67"] + spaceX[2] * index - spaceX[4],
            spaceNY["0.5"] +
              spaceNY[2] * Math.floor(Math.random() * 2.5) +
              spaceY[2],
          ]}
          opacity={0}
        />
      ))}
    </>
  );

  yield* texts.quesMarkU().opacity(1, 1), yield* waitUntil("encountered");
  yield* all(...quesMarks.map((mark, i) => delay(0.3 * i, mark.opacity(1, 1))));

  view.add(
    <>
      <ExtendedRect
        ref={rects.searchBar}
        width={spaceX[1]}
        radius={100}
        layout
        alignItems={"center"}
        paddingLeft={spaceX["0.25"]}
        gap={spaceX["0.25"]}
      >
        <ExtendedStrokeSVG
          ref={sSvgs.search}
          svg={SearchStroke}
          size={spaceY["0.5"]}
          color="slate"
          lineWidth={1.5}
        />
        <ExtendedTxt ref={texts.centerDiv} fontSize={spaceY["0.5"]} />
      </ExtendedRect>
    </>
  );

  yield* all(
    ...multiFaces.map((face, i) => delay(0.01 * i, face.scale(0, 0.75))),
    ...quesMarks.map((mark, i) => delay(0.05 * i, mark.scale(0, 0.75))),
    texts.quesMarkU().opacity(0, 0.5),
    sSvgs.search().write(),
    delay(0.5, texts.centerDiv().text("How to center a div?", 1)),
    rects.searchBar().width(spaceX[8], 1)
  );

  view.add(
    <>
      <Img
        ref={images.centerDiv}
        src={centerDiv}
        radius={16}
        stroke={rects.searchBar().stroke()}
        lineWidth={4}
        y={spaceY[2]}
        opacity={0}
      />
    </>
  );

  yield* all(
    images.centerDiv().y(spaceY[0.75], 1),
    images.centerDiv().opacity(1, 1),
    rects.searchBar().y(spaceNY[3], 1),
    texts.centerDiv().fontSize(spaceY["0.33"], 1),
    sSvgs.search().size(spaceY["0.33"], 1),
    rects.searchBar().height(spaceY["0.75"], 1),
    rects.searchBar().width(images.centerDiv().width(), 1),
    rects.searchBar().lineWidth(2, 1)
  );

  yield* waitUntil("takeBreak");

  view.add(
    <>
      <ExtendedTxt
        ref={texts.break}
        fontSize={spaceY[1]}
        fontWeight={500}
        y={spaceNY[1]}
      />
      <ExtendedStrokeSVG
        ref={sSvgs.cup}
        svg={HotCup}
        size={spaceY[2]}
        opacity={0}
        y={spaceY[2]}
      />
    </>
  );

  yield* all(
    texts.break().text("Take frequent breaks", 2),
    images.centerDiv().opacity(0, 1),
    rects.searchBar().opacity(0, 1),
    sSvgs.cup().opacity(1, 1),
    sSvgs.cup().y(spaceY[1], 2),
    delay(0.25, sSvgs.cup().write(2.5))
  );

  view.add(
    <>
      <ExtendedTxt
        ref={texts.breaksWaste}
        fontWeight={500}
        fontSize={spaceY[1]}
      />
    </>
  );

  yield* all(
    sSvgs.cup().scale(0, 0.5),
    texts.break().opacity(0, 0.5),
    texts.breaksWaste().text("Breaks waste time❌", 1.5)
  );

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
    </>
  );

  yield* all(
    circles.problem().scale(1, 1),
    texts.breaksWaste().opacity(0, 0.5),
    circles.problem().x(spaceNX[1.5], 2),
    sSvgs.manWalking().x(spaceX[1.5], 2),
    sSvgs.manWalking().write(2)
  );

  view.add(
    <>
      <ExtendedFillSVG
        ref={fSvgs.broom}
        svg={Broom}
        size={spaceY[0.75]}
        position={[spaceX[1], spaceNY[1]]}
        lineWidth={1}
        opacity={0}
      />
      <ExtendedFillSVG
        ref={fSvgs.bulb}
        svg={Bulb}
        size={spaceY[1]}
        position={[spaceX[1], spaceNY[1]]}
        lineWidth={1}
        color="yellow"
      />
      <ExtendedFillSVG
        ref={fSvgs.brain}
        svg={Brain}
        size={spaceY[2]}
        lineWidth={1}
        opacity={0}
      />
    </>
  );

  yield* all(
    fSvgs.brain().write(0.1),
    fSvgs.broom().write(0.1),
    circles.problem().scale(0, 1),
    sSvgs.manWalking().scale(0, 1),
    fSvgs.brain().opacity(1, 1),
    fSvgs.broom().opacity(1, 1),
    delay(0.25, fSvgs.broom().rotation(-20, 0.25, easeInCubic)),
    delay(0.5, fSvgs.broom().rotation(0, 0.25, linear)),
    delay(0.75, fSvgs.broom().rotation(20, 0.25, linear)),
    delay(1, fSvgs.broom().rotation(0, 0.25, easeOutCubic)),
    delay(1.25, fSvgs.broom().scale(0, 0.5)),
    delay(2, fSvgs.bulb().write(1))
  );

  view.add(
    <>
      <ExtendedFillSVG
        ref={fSvgs.manWalking}
        svg={ManWalking}
        size={spaceY[1.5]}
        position={[spaceX["0"], spaceY[0]]}
        lineWidth={0.5}
      />
      <ExtendedFillSVG
        ref={fSvgs.music}
        svg={MusicNote}
        size={spaceY[1]}
        position={[spaceX["1"], spaceY[0]]}
        lineWidth={1.5}
      />
      <ExtendedFillSVG
        ref={fSvgs.paintBrush}
        svg={PaintBrush}
        size={spaceY[1]}
        position={[spaceX["2"], spaceY[0]]}
        lineWidth={1}
      />
    </>
  );

  yield* all(
    fSvgs.brain().scale(0, 0.5),
    fSvgs.bulb().scale(0, 0.5),
    fSvgs.manWalking().write(1),
    delay(1, fSvgs.manWalking().x(spaceNX[1], 1)),
    delay(1, fSvgs.music().write(1)),
    delay(2, fSvgs.manWalking().x(spaceNX[2], 1)),
    delay(2, fSvgs.music().x(spaceX[0], 1)),
    delay(2, fSvgs.paintBrush().write(1))
  );

  yield* waitUntil("askHelp");

  view.add(
    <>
      <ExtendedTxt
        ref={texts.askHelp}
        fontSize={spaceY[1]}
        fontWeight={500}
        textAlign={"center"}
      />
    </>
  );

  yield* all(
    texts.askHelp().text("Don't be afraid to\nask for help", 2),
    fSvgs.manWalking().scale(0, 1),
    fSvgs.music().scale(0, 1),
    fSvgs.paintBrush().scale(0, 1)
  );

  const polygon = createRef<Polygon>();

  view.add(
    <>
      <Face ref={faces.friend} size={spaceY[2]} highlighted scale={0} />
      <Face
        ref={faces.fellow}
        size={spaceY[2]}
        highlighted
        scale={0}
        x={spaceX[1.5]}
      />
      <Polygon
        ref={polygon}
        sides={3}
        lineWidth={8}
        stroke={"white"}
        size={spaceY[2]}
        x={spaceX[3]}
        scale={0}
      >
        {range(6).map((index) => {
          const colorIndex = Math.floor(Math.random() * colors500.length);
          return (
            <Circle
              fill={colors500[colorIndex]}
              stroke={colors700[colorIndex]}
              lineWidth={4}
              size={spaceY["0.33"]}
              position={() => polygon().vertex(index)}
              opacity={() => polygon().vertexCompletion(index)}
            />
          );
        })}
      </Polygon>
      <ExtendedTxt
        ref={texts.peopleHelp}
        fontSize={spaceY[1]}
        fontWeight={500}
        y={spaceY[1.5]}
        textAlign={"center"}
      />
      <ExtendedTxt
        ref={texts.specially}
        fontSize={spaceY[0.75]}
        fontWeight={500}
        y={spaceY[2]}
        textAlign={"center"}
      />
    </>
  );

  yield* all(
    texts.askHelp().opacity(0, 1),
    faces.friend().scale(1, 1),
    delay(1.5, faces.fellow().scale(1, 1)),
    delay(1.5, faces.friend().x(spaceNX[1.5], 1)),
    delay(3, polygon().scale(1, 1)),
    delay(3, polygon().sides(6, 2)),
    delay(3, faces.friend().x(spaceNX[3], 1)),
    delay(3, faces.fellow().x(spaceX[0], 1))
  );

  yield* all(
    texts.peopleHelp().text("People are willing to assist", 1.5),
    faces.friend().y(spaceNY[1.5], 1),
    faces.fellow().y(spaceNY[1.5], 1),
    polygon().y(spaceNY[1.5], 1)
  );

  yield* all(
    texts
      .specially()
      .text(
        "Specially, when they see\nyou've put in the effort\nto solve it yourself",
        4
      ),
    texts.peopleHelp().opacity(0, 1)
  );

  view.add(
    <>
      <ExtendedTxt
        ref={texts.asking}
        text={"?"}
        fontSize={spaceY["1"]}
        fontWeight={500}
        position={[spaceX[1.5], spaceNY[2.5]]}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.shame}
        fontSize={spaceY[1]}
        fontWeight={500}
        y={spaceY[2]}
        textAlign={"center"}
      />
    </>
  );

  yield* all(
    faces.you().scale(1, 1),
    faces.you().y(spaceNY[1.5], 1),
    faces.friend().scale(0, 1),
    faces.fellow().scale(0, 1),
    polygon().scale(0, 1),
    texts.specially().opacity(0, 1),
    texts.shame().text("There's no shame in\nasking for help", 2),
    delay(2, texts.asking().opacity(1, 1))
  );

  view.add(
    <>
      <ExtendedStrokeSVG
        ref={sSvgs.dumbbell}
        svg={Dumbbells}
        size={spaceY[2]}
        lineWidth={0.5}
      />
      <ExtendedCircle
        ref={circles.blender}
        size={spaceY[3]}
        color="yellow"
        scale={0}
        x={spaceNX[4]}
      >
        <Icon
          ref={icons.blender}
          icon={"simple-icons:blender"}
          size={spaceY[1]}
          color={colors.yellow[500]}
        />
        <ExtendedRect
          ref={rects.blenderF}
          width={spaceX["2.25"]}
          height={spaceY["0.67"]}
          y={spaceY[1.5]}
          color="yellow"
        >
          <ExtendedTxt
            text={"3D Graphics"}
            fill={colors.yellow[950]}
            fontWeight={500}
          />
        </ExtendedRect>
      </ExtendedCircle>
      <ExtendedCircle
        ref={circles.inkscape}
        size={spaceY[3]}
        color="green"
        scale={0}
        x={spaceX[0]}
      >
        <Icon
          ref={icons.inkscape}
          icon={"simple-icons:inkscape"}
          size={spaceY[1]}
          color={colors.green[500]}
        />
        <ExtendedRect
          ref={rects.inkscapeF}
          width={spaceX["2.75"]}
          height={spaceY["0.67"]}
          y={spaceY[1.5]}
          color="green"
        >
          <ExtendedTxt
            text={"Vector Graphics"}
            fill={colors.green[950]}
            fontWeight={500}
          />
        </ExtendedRect>
      </ExtendedCircle>
      <ExtendedCircle
        ref={circles.davinciresolve}
        size={spaceY[3]}
        color="blue"
        scale={0}
        x={spaceX[4]}
      >
        <Icon
          ref={icons.davinciresolve}
          icon={"simple-icons:davinciresolve"}
          size={spaceY[1]}
          color={colors.blue[500]}
        />
        <ExtendedRect
          ref={rects.davinciresolveF}
          width={spaceX["2.33"]}
          height={spaceY["0.67"]}
          y={spaceY[1.5]}
          color="blue"
        >
          <ExtendedTxt
            text={"Video Editing"}
            fill={colors.blue[950]}
            fontWeight={500}
          />
        </ExtendedRect>
      </ExtendedCircle>
    </>
  );

  rects.blenderF().fill(colors.yellow[500]);
  rects.inkscapeF().fill(colors.green[500]);
  rects.davinciresolveF().fill(colors.blue[500]);

  yield* all(
    texts.shame().opacity(0, 1),
    texts.asking().opacity(0, 1),
    sSvgs.dumbbell().write(2),
    sSvgs.dumbbell().size(spaceY[3], 2.5),
    faces.you().scale(0, 1)
  );

  yield* all(
    sSvgs.dumbbell().scale(0, 1),
    circles.blender().scale(1, 1),
    delay(0.2, circles.inkscape().scale(1, 1)),
    delay(0.4, circles.davinciresolve().scale(1, 1))
  );

  // faces.you().y(0);
  yield* waitFor(0.5);

  view.add(
    <>
      <ExtendedTxt
        ref={texts.loveProgramming}
        fontSize={spaceY["0.75"]}
        y={spaceY[1]}
        fontWeight={500}
      />
    </>
  );

  yield* all(
    circles.blender().scale(0, 1),
    circles.inkscape().scale(0, 1),
    circles.davinciresolve().scale(0, 1),
    faces.you().scale(1, 1),
    delay(0.5, texts.loveProgramming().text("I 💖 programming", 1))
  );

  yield* waitUntil("otherThings");

  yield* all(
    circles.blender().scale(1, 1),
    delay(0.4, circles.inkscape().scale(1, 1)),
    delay(0.8, circles.davinciresolve().scale(1, 1)),
    faces.you().scale(0, 1),
    texts.loveProgramming().opacity(0, 1)
  );

  view.add(
    <>
      <Icon
        ref={icons.weightDown}
        icon={"game-icons:weight-lifting-down"}
        size={spaceY[3]}
        color={colors.slate[0]}
        opacity={0}
        y={spaceY[1]}
      />
      <Icon
        ref={icons.weightUp}
        icon={"game-icons:weight-lifting-up"}
        size={spaceY[3]}
        color={colors.slate[0]}
        opacity={0}
        y={spaceY[0.5]}
      />
    </>
  );

  yield* waitUntil("difficult");

  yield* all(
    circles.blender().scale(0, 1),
    circles.inkscape().scale(0, 1),
    circles.davinciresolve().scale(0, 1),
    icons.weightDown().opacity(1, 1),
    icons.weightDown().y(0, 1)
  );

  yield* waitUntil("pushForward");

  yield* all(
    icons.weightDown().opacity(0, 1),
    icons.weightUp().opacity(1, 1),
    icons.weightUp().y(spaceNY["0.25"], 1)
  );

  view.add(
    <>
      <Ray
        ref={rays.intThing}
        stroke={colors.red[500]}
        lineWidth={8}
        fromX={spaceNX[6]}
        toX={spaceX[6]}
        end={0}
        lineCap={"round"}
        opacity={0}
        rotation={7.5}
      />
    </>
  );

  yield* all(
    icons.weightUp().opacity(0, 1),
    circles.blender().scale(1, 1),
    circles.inkscape().scale(1, 1),
    circles.davinciresolve().scale(1, 1),
    rays.intThing().opacity(1, 0.25),
    rays.intThing().end(1, 2),
    rays.intThing().rotation(15, 2)
  );

  yield* waitFor(0.25);

  circles
    .you()
    .position(
      () => splines.journey().getPointAtPercentage(circleYouProgress()).position
    );
  circles.you().opacity(0);
  circles.you().scale(1);
  circles.you().size(spaceY[1]);
  circleYouProgress(0.25);
  splines.journey().end(0.8)

  yield* any(
    circles.blender().scale(0, 1),
    circles.inkscape().scale(0, 1),
    circles.davinciresolve().scale(0, 1),
    rays.intThing().end(0, 0.5),
    rays.intThing().opacity(0, 0.5),
    splines.journey().opacity(1, 1),
    circles.you().opacity(1, 1),
    circleYouProgress(0.93, 11, easeInOutQuad),
    circles.you().size(spaceY[4], 11, easeInOutQuad),
    texts.you().opacity(1, 1),
    delay(10, texts.you().text("Programmer", 1)),
    delay(2, texts.you().fontSize(spaceY[0.5], 8)),
    delay(2, texts.you().fontWeight(500, 8)),
  );

  yield* waitUntil("buildingMuscle");

  view.add(
    <>
      <ExtendedTxt
        ref={texts.muscle}
        fontSize={spaceY[1]}
        fontWeight={500}
        y={spaceNY[2]} 
      />
      <ExtendedTxt
        ref={texts.psSkills}
        fontSize={spaceY[1]}
        fontWeight={500}
        y={spaceNY[2]}
      />
    </>
  );
  yield* all(
    texts.muscle().text("Building coding muscles💪🏻", 2),
    delay(2, texts.psSkills().text("⇡ Problem solving skills🤹🏻", 2)),
    delay(2, texts.muscle().opacity(0, 1)),
    delay(4, texts.psSkills().opacity(0, 1)),
  );

  yield* waitFor(3.5);
});
