import { Img, makeScene2D, Node, Ray, Rect, Video } from "@motion-canvas/2d";
import {
  all,
  any,
  createRef,
  createRefMap,
  delay,
  fadeTransition,
  linear,
  useDuration,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { Cursor, ExtendedRect, Face, Grid, Window } from "../nodes";
import colors from "../lib/colors";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import tut1 from "../images/tut1.png";
import tut2 from "../images/tut2.png";
import tut3 from "../images/tut3.png";
import tut4 from "../images/tut4.png";
import tut5 from "../images/tut5.png";
import projects from "../videos/project.mp4";

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  // view.add(
  //   <>
  //     <Grid />
  //   </>
  // );

  const nodes = createRefMap<Node>();
  const images = createRefMap<Img>();
  const texts = createRefMap<ExtendedTxt>();
  const videos = createRefMap<Video>();
  const rays = createRefMap<Ray>();

  view.add(
    <>
      <Node ref={nodes.tutorials}>
        <Img
          ref={images.tut1}
          src={tut1}
          position={[spaceNX[2], spaceNY[1.5]]}
          rotation={-15}
        />
        <Img
          ref={images.tut3}
          src={tut3}
          position={[spaceX[2], spaceNY[1.5]]}
          rotation={15}
        />
        <Img ref={images.tut2} src={tut2} position={[spaceX[0], spaceY[0]]} />
        <Img
          ref={images.tut4}
          src={tut4}
          position={[spaceNX[2], spaceY[1.5]]}
          rotation={-10}
        />
        <Img
          ref={images.tut5}
          src={tut5}
          position={[spaceX[2], spaceY[1.5]]}
          rotation={10}
        />
        <ExtendedTxt
          ref={texts.checkChannels}
          text={
            "*Be sure to check out these amazing channels.\nThey post high-quality content that you'll find really valuable!"
          }
          y={spaceY[4.5]}
          textAlign={"center"}
          fill={colors.slate[300]}
        />
      </Node>
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

  yield* any(
    fadeTransition(1),
    rays.problem1().end(1,33,linear)
  );

  const window = createRef<Window>();
  const cursor = createRef<Cursor>();
  const button = createRef<ExtendedRect>();
  const buttonTxt = createRef<ExtendedTxt>();
  const name = createRef<ExtendedRect>();
  const email = createRef<ExtendedRect>();
  const nameTxt = createRef<ExtendedTxt>();
  const emailTxt = createRef<ExtendedTxt>();
  const submit = createRef<ExtendedRect>();
  const submitTxt = createRef<ExtendedTxt>();
  const formTxt = createRef<ExtendedTxt>();

  view.add(
    <>
      <Cursor
        ref={cursor}
        opacity={0}
        position={[spaceX[2], spaceNY[1]]}
        scale={0.8}
      />
      <ExtendedTxt
        ref={texts.howToForm}
        text={"How to create a sign up form?"}
        fontSize={spaceY["0.5"]}
        fontWeight={500}
        y={spaceNY[4.25]}
        opacity={0}
      />
      <Window
        ref={window}
        width={spaceX[8]}
        height={spaceY[8]}
        y={spaceY[1]}
        opacity={0}
      >
        <ExtendedRect
          ref={button}
          width={spaceX[1.25]}
          height={spaceY["0.67"]}
          padding={spaceY["0.25"]}
          justifyContent={"center"}
          lineWidth={3}
          color="violet"
        >
          <ExtendedTxt
            ref={buttonTxt}
            text={"Button"}
            alignSelf={"center"}
            fontSize={spaceY["0.25"]}
            fontWeight={600}
          />
        </ExtendedRect>
        <ExtendedTxt
          text={"Name"}
          fontSize={spaceY["0.25"]}
          marginTop={spaceY["0.5"]}
          marginBottom={spaceY["0.25"]}
        />
        <ExtendedRect
          ref={name}
          height={spaceY["0.67"]}
          width={"60%"}
          color="slate"
          lineWidth={2}
          paddingLeft={spaceY["0.25"]}
          alignItems={"center"}
        >
          <ExtendedTxt
            ref={nameTxt}
            fontSize={spaceY["0.25"]}
            fontWeight={600}
            fill={colors.slate[300]}
          />
        </ExtendedRect>
        <ExtendedTxt
          text={"Email"}
          fontSize={spaceY["0.25"]}
          marginTop={spaceY["0.5"]}
          marginBottom={spaceY["0.25"]}
        />
        <ExtendedRect
          ref={email}
          height={spaceY["0.67"]}
          width={"60%"}
          color="slate"
          lineWidth={2}
          paddingLeft={spaceY["0.25"]}
          alignItems={"center"}
        >
          <ExtendedTxt
            ref={emailTxt}
            fontSize={spaceY["0.25"]}
            fontWeight={600}
            fill={colors.slate[300]}
          />
        </ExtendedRect>
        <ExtendedRect
          ref={submit}
          width={spaceX[1.25]}
          height={spaceY["0.67"]}
          padding={spaceY["0.25"]}
          justifyContent={"center"}
          lineWidth={3}
          marginTop={spaceY["0.5"]}
        >
          <ExtendedTxt
            ref={submitTxt}
            text={"Submit"}
            alignSelf={"center"}
            fontSize={spaceY["0.25"]}
            fontWeight={600}
          />
        </ExtendedRect>
        <ExtendedTxt
          ref={formTxt}
          fontSize={spaceY["0.25"]}
          marginTop={spaceY["0.5"]}
          text={
            "Form submitted with name: Ratan Naval Tata and email: \nratan.tata@examplemail.org"
          }
          opacity={0}
        />
      </Window>
    </>
  );

  window().inner.padding(spaceY["0.25"]);

  yield* all(
    nodes.tutorials().opacity(0, 1),
    delay(0.5, texts.howToForm().opacity(1, 1)),
    delay(1, window().opacity(1, 1))
  );

  yield* all(
    cursor().opacity(1, 1),
    cursor().position([spaceNX[3], spaceNY[2]], 1),
    delay(1, cursor().scale(0.6, 0.5)),
    delay(1, buttonTxt().fill(colors.violet[500], 1)),
    delay(1.5, cursor().scale(0.8, 0.5)),
    delay(1.5, cursor().position([spaceNX[1], spaceY[3]], 1))
  );

  yield* all(
    nameTxt().text("Ratan Naval Tata", 1.25),
    emailTxt().text("ratan.tata@examplemail.org", 1.25),
    cursor().position([spaceNX[3], spaceY["2.67"]], 0.75),
    delay(0.75, cursor().scale(0.6, 0.5)),
    delay(0.75, submit().highlight(true, 0.5)),
    delay(1.25, cursor().scale(0.8, 0.5)),
    delay(1, formTxt().opacity(1, 1)),
    delay(1.75, cursor().position([spaceNX[1.5], spaceY[4]], 0.75)),
    delay(1.75, cursor().opacity(0, 0.75))
  );

  view.add(
    <>
      <ExtendedTxt
        ref={texts.youLearnedBasics}
        text={"You've learned the basics,"}
        fontSize={spaceY[0.75]}
        fontWeight={500}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.learnedBasics}
        text={"learned the basics"}
        fontSize={spaceY[0.75]}
        fontWeight={500}
        opacity={0}
        fill={colors.yellow[500]}
        stroke={colors.yellow[500]}
        lineWidth={1}
        x={104}
      />
      <ExtendedTxt
        ref={texts.butHow}
        text={"but how do you\nput them into practice?"}
        fontSize={spaceY[0.75]}
        fontWeight={500}
        opacity={0}
        textAlign={"center"}
      />
      <ExtendedTxt
        ref={texts.putInto}
        text={"put them into practice?"}
        fontSize={spaceY[0.75]}
        fontWeight={500}
        opacity={0}
        fill={colors.teal[500]}
        stroke={colors.teal[500]}
        lineWidth={1}
        y={41}
      />
    </>
  );

  yield* waitUntil("learnedBasics");

  yield* all(
    window().opacity(0, 0.75),
    texts.howToForm().opacity(0, 0.75),
    texts.youLearnedBasics().opacity(1, 1),
    texts.learnedBasics().opacity(1, 1)
  );

  yield* waitUntil("putIntoPractice");
  yield* all(
    texts.youLearnedBasics().opacity(0, 0.75),
    texts.learnedBasics().opacity(0, 0.75),
    texts.butHow().opacity(1, 1),
    texts.putInto().opacity(1, 1)
  );

  yield* waitUntil("projectVideo");

  view.add(
    <>
      <Video ref={videos.projects} src={projects} opacity={0} play />
    </>
  );

  yield* all(
    videos.projects().opacity(1, 1),
    texts.putInto().opacity(0, 1),
    texts.butHow().opacity(0, 1)
  );

  yield* waitUntil("projectEnd");

  yield* waitFor(0.5);
});
