import {
  Icon,
  Img,
  Layout,
  Line,
  makeScene2D,
  Node,
  Polygon,
  Ray,
  Spline,
  SVG,
} from "@motion-canvas/2d";
import {
  all,
  any,
  createRef,
  createRefMap,
  createSignal,
  delay,
  Direction,
  fadeTransition,
  linear,
  range,
  slideTransition,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { Face, Grid } from "../nodes";
import colors, { colors500 } from "../lib/colors";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import { OdinProject } from "../lib/svgs";

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  // view.add(
  //   <>
  //     <Grid />
  //   </>
  // );

  const splines = createRefMap<Spline>();
  const faces = createRefMap<Face>();
  const icons = createRefMap<Icon>();
  const rays = createRefMap<Ray>();
  const svgs = createRefMap<SVG>();
  const texts = createRefMap<ExtendedTxt>();
  const lines = createRefMap<Line>();
  const nodes = createRefMap<Node>();

  view.add(
    <>
      <Spline
        ref={splines.journey}
        lineWidth={2}
        stroke={colors.slate[0]}
        points={[
          [spaceNX[6.5], spaceY[3]],
          [spaceNX[4.75], spaceY[2.75]],
          [spaceNX[3.75], spaceY[2]],
          [spaceNX[2.75], spaceY[2.25]],
          [spaceNX[2], spaceY[1.25]],
          [spaceNX[1], spaceY[1.75]],
          [spaceX[1], spaceY[0.5]],
          [spaceX[2.5], spaceY[1]],
          [spaceX[4], spaceNY[1]],
          [spaceX[5.25], spaceNY[0.75]],
          [spaceX[6.5], spaceNY[2]],
        ]}
      />
      <Face ref={faces.you} highlighted scale={0} />
      <Icon
        ref={icons.css}
        icon={"vscode-icons:file-type-css"}
        height={spaceY[1]}
        scale={0}
        position={[spaceNX[3.67], spaceY[4.5]]}
      />
      <Icon
        ref={icons.js}
        icon={"vscode-icons:file-type-js-official"}
        height={spaceY[1]}
        scale={0}
        position={[spaceNX[2], spaceY[4.5]]}
      />
      <Icon
        ref={icons.react}
        icon={"vscode-icons:file-type-reactjs"}
        height={spaceY[1]}
        scale={0}
        position={[spaceX[1], spaceY[4.5]]}
      />
      <Icon
        ref={icons.node}
        icon={"devicon:nodejs-wordmark"}
        height={spaceY[1]}
        scale={0}
        position={[spaceX[4], spaceY[4.5]]}
      />
      <Icon
        ref={icons.mongodb}
        icon={"devicon:mongodb-wordmark"}
        height={spaceY[1]}
        scale={0}
        position={[spaceX[4], spaceY[3.5]]}
      />
      <Ray
        ref={rays.problem1}
        lineWidth={4}
        stroke={colors.slate[0]}
        fromX={spaceNX[9]}
        toX={spaceX[9]}
        y={spaceY[5.75]}
        lineCap={"round"}
        end={0}
        zIndex={2}
      />
    </>
  );

  const faceYouProgress = createSignal(0);
  faces
    .you()
    .position(
      () => splines.journey().getPointAtPercentage(faceYouProgress()).position
    );
  faceYouProgress(0.1);

  yield* any(
    slideTransition(Direction.Right, 1),
    rays.problem1().end(1, 36, linear),
    faces.you().scale(1, 1),
    icons.css().scale(1, 1),
    delay(1.5, icons.js().scale(1, 1)),
    delay(2.5, icons.react().scale(1, 1)),
    delay(3, icons.node().scale(1, 1)),
    delay(3, icons.mongodb().scale(1, 1)),
    faceYouProgress(0.3, 6)
  );

  yield* waitUntil("inDesert");

  const thingsToKnow = [
    "Frameworks",
    "Libraries",
    "Authentication",
    "Databases",
    "Serialization",
    "Authorization",
    "Asynchronous",
    "Algorithms",
  ];

  const polygon = createRef<Polygon>();

  view.add(
    <>
      <Icon
        ref={icons.face}
        icon={"fluent-emoji:anxious-face-with-sweat"}
        scale={0}
        size={spaceY[1]}
      />
      <Polygon
        ref={polygon}
        sides={2}
        size={spaceY[2]}
        opacity={0}
        x={spaceNX[0.5]}
      >
        {range(8).map((index) => {
          return (
            <ExtendedTxt
              size={spaceY["0.5"]}
              text={() => thingsToKnow[index]}
              position={() => polygon().vertex(index)}
              opacity={() => polygon().vertexCompletion(index)}
              textAlign={() => "center"}
            />
          );
        })}
      </Polygon>
    </>
  );

  yield* all(
    faces.you().scale(0, 1),
    splines.journey().end(0, 1),
    splines.journey().opacity(0, 1),
    icons.css().opacity(0, 1),
    icons.js().opacity(0, 1),
    icons.react().opacity(0, 1),
    icons.node().opacity(0, 1),
    icons.mongodb().opacity(0, 1),
    icons.face().scale(1, 1),
    delay(1.5, polygon().opacity(1, 1)),
    delay(1.5, polygon().sides(8, 2)),
    delay(1.5, polygon().size(spaceY[8], 2))
  );

  yield* waitUntil("topTeaches");

  view.add(
    <>
      <SVG
        ref={svgs.odinProject}
        svg={OdinProject}
        height={spaceY[2]}
        opacity={0}
        y={spaceNY[3]}
      />
      <ExtendedTxt
        ref={texts.teaches}
        text={"-> 💡teaches you how to learn"}
        fontSize={spaceY[0.5]}
        y={spaceNY[1]}
        x={spaceNX[1] + 40}
        fontWeight={500}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.encourages}
        text={"-> encourages:"}
        fontSize={spaceY[0.5]}
        y={spaceY[0]}
        x={spaceNX[2] - 30}
        fontWeight={500}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.problemSolving}
        text={"🧠independent problem-solving"}
        fontSize={spaceY[0.5]}
        y={spaceY[1]}
        x={spaceX[1]}
        fontWeight={500}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.exploration}
        text={"🧭exploration"}
        fontSize={spaceY[0.5]}
        y={spaceY[2]}
        x={spaceNX[1]}
        fontWeight={500}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.fromStart}
        text={"from the start."}
        fontSize={spaceY[0.5]}
        y={spaceY[3]}
        x={spaceNX[2] + 20}
        fontWeight={500}
        opacity={0}
      />
    </>
  );

  yield* all(
    svgs.odinProject().opacity(1, 1),
    polygon().scale(0, 1),
    polygon().sides(2, 1),
    polygon().size(spaceY[2], 1),
    icons.face().scale(0, 1),
    delay(1.25, texts.teaches().opacity(1, 1)),
    delay(3, texts.encourages().opacity(1, 1)),
    delay(3.75, texts.problemSolving().opacity(1, 1)),
    delay(5.25, texts.exploration().opacity(1, 1)),
    delay(6, texts.fromStart().opacity(1, 1))
  );

  yield* waitFor(0.5);

  view.add(
    <>
      <Node ref={nodes.journey} opacity={0}>
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
          end={0.175}
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
          end={0.336}
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
          end={0.605}
        />
        <ExtendedTxt
          ref={texts.survive}
          text={"How to survive this journey"}
          fontSize={spaceY["0.5"]}
          fontWeight={500}
          y={spaceNY["4.75"]}
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
          position={[spaceNX[6.75], spaceNY[3.5]]}
          fontWeight={500}
          textAlign={"center"}
        />
        <ExtendedTxt
          ref={texts.cliff}
          text={"cliff of\nconfusion"}
          fill={colors.yellow[500]}
          position={[spaceNX[5.5], spaceNY[2.25]]}
          fontWeight={500}
          textAlign={"center"}
        />
        <ExtendedTxt
          ref={texts.desert}
          text={"desert of despair"}
          fill={colors.red[500]}
          position={[spaceNX[1.75], spaceY[0.5]]}
          fontWeight={500}
        />
        <ExtendedTxt
          ref={texts.upswing}
          text={"upswing of awesome"}
          fill={colors.emerald[500]}
          position={[spaceX[3], spaceY[0]]}
          fontWeight={500}
        />
        <ExtendedTxt
          ref={texts.job}
          text={"Job Ready"}
          fill={colors.slate[0]}
          position={[spaceX[8], spaceNY[2.5]]}
          fontWeight={500}
        />
      </Node>
    </>
  );

  yield* all(
    texts.teaches().opacity(0, 1),
    texts.encourages().opacity(0, 1),
    texts.problemSolving().opacity(0, 1),
    texts.exploration().opacity(0, 1),
    texts.fromStart().opacity(0, 1),
    svgs.odinProject().opacity(0, 1),
    nodes.journey().opacity(1, 1)
  );

  view.add(
    <>
      <ExtendedTxt
        ref={texts.build}
        text={"🛠️Build ->"}
        fontWeight={500}
        position={[20 + spaceNX[6.5], spaceNY[1]]}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.collaborate}
        text={"🤝Collaborate ->"}
        fontWeight={500}
        position={[20 + spaceNX[4.5], spaceY[0]]}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.setGoals}
        text={"🎯Set Goals ->"}
        fontWeight={500}
        position={[20 + spaceNX[3.5], spaceY[2]]}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.focus}
        text={"🧠Focus ->"}
        fontWeight={500}
        position={[20 + spaceNX[1], spaceY[2.75]]}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.getFeedback}
        text={"📝Get Feedback ->"}
        fontWeight={500}
        position={[spaceX[2.5] - 20, spaceY[1]]}
        opacity={0}
      />
    </>
  );

  yield* all(
    delay(0, texts.build().opacity(1, 1)),
    delay(1, texts.collaborate().opacity(1, 1)),
    delay(2, texts.setGoals().opacity(1, 1)),
    delay(3, texts.focus().opacity(1, 1)),
    delay(4, texts.getFeedback().opacity(1, 1))
  );
  
  yield* waitUntil("remember");
  
  view.add(
    <>
      <ExtendedTxt ref={texts.success} fontSize={spaceY["0.5"]} fontWeight={500} y={spaceNY["0.5"]}/>
      <ExtendedTxt ref={texts.approach} fontSize={spaceY["0.5"]} fontWeight={500} y={spaceY["0.5"]}/>
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
    texts.survive().opacity(0, 1),
    texts.build().opacity(0, 1),
    texts.collaborate().opacity(0, 1),
    texts.setGoals().opacity(0, 1),
    texts.focus().opacity(0, 1),
    texts.getFeedback().opacity(0, 1),
    texts.success().text("Success isn't just about what you learn 📚,", 3),
    delay(3, texts.approach().text("but how you approach learning 🧠🌟.", 2)),
  );


  yield* all(
    texts.success().opacity(0, 1),
    texts.approach().opacity(0, 1),
  )

  yield* waitUntil("howToLearnEnd");
});
