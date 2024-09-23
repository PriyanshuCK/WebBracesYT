import { Img, makeScene2D, Ray } from "@motion-canvas/2d";
import {
  all,
  createRef,
  createRefMap,
  delay,
  Direction,
  easeInOutQuad,
  easeOutCubic,
  fadeTransition,
  slideTransition,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import {
  ExtendedCircle,
  ExtendedFillSVG,
  ExtendedStrokeSVG,
  Grid,
} from "../nodes";
import colors from "../lib/colors";
import onYogaMat from "../images/IntroSVGsOnYogaMat.png";
import dhyanPose from "../images/IntroSVGsYogaPose1.png";
import lecture from "../images/IntroSVGsLecture.png";
import yogaPose from "../images/IntroSVGsYogaPose2.png";
import yogaGuru from "../images/IntroSVGsYogaGuru.png";
import magicWand from "../images/IntroSVGsMagicWand.png";
import network from "../images/IntroSVGsNetwork.png";
import humanKnowledge from "../images/IntroSVGsHumanKnowledge.png";
import buffet from "../images/IntroSVGsBuffet.png";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import { ExplodingHead, Web } from "../lib/svgs";

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  view.add(<>{/* <Grid /> */}</>);

  const images = createRefMap<Img>();
  const today = createRef<ExtendedTxt>();

  view.add(
    <>
      <Img ref={images.onYogaMat} src={onYogaMat} scale={0.2} opacity={0} />
      <ExtendedTxt
        ref={today}
        text={"Today"}
        fontWeight={600}
        fontSize={spaceY["0.75"]}
        position={[spaceX[8], spaceY[4.5]]}
      />
    </>
  );

  yield* slideTransition(Direction.Right, 1);
  yield* all(images.onYogaMat().opacity(1, 2), delay(2, today().opacity(0, 1)));

  const extendedCircleRefs = createRefMap<ExtendedCircle>();

  view.add(
    <>
      <ExtendedCircle
        ref={extendedCircleRefs.bubble1}
        scale={0}
        position={[spaceX[1], spaceNY[2.5]]}
        size={spaceY["0.25"]}
      />
      <ExtendedCircle
        ref={extendedCircleRefs.bubble2}
        scale={0}
        position={[spaceX[1.75], spaceNY[3]]}
        size={spaceY["0.5"]}
      />
      <ExtendedCircle
        ref={extendedCircleRefs.bubble3}
        scale={0}
        position={[spaceX[3], spaceNY[4]]}
        size={spaceY["2"]}
      />
      <Img
        ref={images.dhyanPose}
        src={dhyanPose}
        scale={0.07}
        opacity={0}
        position={extendedCircleRefs.bubble3().position()}
      />
    </>
  );
  extendedCircleRefs.bubble1().stroke(colors.slate[0]);
  extendedCircleRefs.bubble2().stroke(colors.slate[0]);
  extendedCircleRefs.bubble3().stroke(colors.slate[0]);

  yield* waitUntil("popsInto");

  yield* all(
    extendedCircleRefs.bubble1().scale(1, 1),
    extendedCircleRefs.bubble2().scale(1, 1),
    extendedCircleRefs.bubble3().scale(1, 1),
    delay(1, images.dhyanPose().opacity(1, 1))
  );
  yield* waitFor(1);
  yield* all(
    extendedCircleRefs.bubble1().scale(0, 1),
    extendedCircleRefs.bubble2().scale(0, 1),
    extendedCircleRefs.bubble3().scale(0, 1),
    images.dhyanPose().scale(0, 1)
  );
  yield* images.onYogaMat().opacity(0, 1);

  view.add(
    <>
      <Img
        ref={images.lecture}
        src={lecture}
        x={spaceNX[3]}
        scale={0.2}
        opacity={0}
      />
      <Img
        ref={images.yogaPose}
        src={yogaPose}
        x={spaceNX[3]}
        scale={0.2}
        opacity={0}
      />
      <Img
        ref={images.yogaGuru}
        src={yogaGuru}
        x={spaceNX[3]}
        scale={0.2}
        opacity={0}
      />
    </>
  );

  yield* waitUntil("lecture");
  yield* all(images.lecture().x(0, 1), images.lecture().opacity(1, 1));
  yield* waitUntil("yogaPose");
  yield* all(
    images.lecture().x(spaceX[3], 1),
    images.lecture().opacity(0, 1),
    images.yogaPose().x(0, 1),
    images.yogaPose().opacity(1, 1)
  );
  yield* waitUntil("yogaGuru");
  yield* all(
    images.yogaPose().x(spaceX[3], 1),
    images.yogaPose().opacity(0, 1),
    images.yogaGuru().x(0, 1),
    images.yogaGuru().opacity(1, 1)
  );

  yield* waitUntil("yogaGuruEnd");

  yield* all(images.yogaGuru().opacity(0, 1));
  const cross = createRef<Ray>();
  const web = createRef<ExtendedStrokeSVG>();

  view.add(
    <>
      <Img ref={images.magicWand} src={magicWand} scale={0} />
      <Ray
        ref={cross}
        from={spaceNX["0.75"]}
        to={spaceX["0.75"]}
        lineWidth={8}
        stroke={colors.red[500]}
        lineCap={"round"}
        end={0}
        opacity={0}
      />
      <ExtendedStrokeSVG ref={web} svg={Web} size={spaceY[2]} />
    </>
  );

  yield* all(
    images.magicWand().scale(1, 0.5),
    delay(0.75, cross().end(1, 0.5)),
    delay(0.75, cross().opacity(1, 0.5))
  );

  yield* all(
    web().write(1.75),
    images.magicWand().scale(0, 1),
    cross().end(0, 1),
    cross().opacity(0, 1)
  );

  view.add(
    <>
      <Img ref={images.network} src={network} scale={0} />
    </>
  );

  yield* all(
    web().scale(0.75, 1),
    web().y(spaceY[4], 1),
    images.network().scale(0.15, 1)
  );

  const buffetTxt = createRef<ExtendedTxt>();
  view.add(
    <>
      <Img
        ref={images.humanKnowledge}
        src={humanKnowledge}
        scale={0}
        x={spaceNX[4]}
        y={spaceNY[1]}
      />
      <Img
        ref={images.buffet}
        src={buffet}
        scale={0}
        x={spaceX[4]}
        y={spaceNY[1]}
      />
      <ExtendedTxt ref={buffetTxt} position={[spaceX[4], spaceY[0.5]]} />
    </>
  );

  yield* all(
    web().scale(0, 1),
    images.network().scale(0.05, 1),
    images.network().y(spaceY[4], 1),
    delay(0, images.humanKnowledge().scale(0.075, 1)),
    delay(1.5, images.buffet().scale(0.075, 1)),
    delay(1, buffetTxt().text("all-you-can-eat", 2)),
    delay(0, images.network().rotation(180, 6, easeInOutQuad))
  );

  const explodingHead = createRef<ExtendedFillSVG>();
  view.add(
    <>
      <ExtendedFillSVG ref={explodingHead} svg={ExplodingHead} scale={1.5} lineWidth={1}/>
    </>
  );

  yield* all(
    explodingHead().write(1),
    images.network().scale(0, 1),
    images.humanKnowledge().scale(0, 1),
    images.buffet().scale(0, 1),
    buffetTxt().opacity(0,1)
  );
  yield* waitUntil("sceneEnd");
});
