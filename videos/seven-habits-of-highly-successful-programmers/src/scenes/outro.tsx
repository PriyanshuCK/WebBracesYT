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
  createSignal,
  delay,
  Direction,
  fadeTransition,
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
import { BuildingWebsite, HTML5, Web } from "../lib/svgs";
import bigPic from "../images/bigPic.png";
import vid1 from "../images/vid1.png";

export default makeScene2D(function* (view) {
  view.fontFamily("Geist");
  yield* fadeTransition(0.1);

  //   view.add(
  //     <>
  //       <Grid />
  //     </>
  //   );

  const texts = createRefMap<ExtendedTxt>();
  const rays = createRefMap<Ray>();
  const circles = createRefMap<ExtendedCircle>();
  const waterDropRays: Ray[] = [];
  const nodes = createRefMap<Node>();
  const splines = createRefMap<Spline>();
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
      <ExtendedTxt
        ref={texts.buildSFoundation}
        text={"Build solid foundation🧱"}
        fontSize={spaceY[1]}
        fontWeight={500}
        opacity={0}
      />
      <ExtendedRect
        ref={rects.buildFound}
        width={0}
        height={0}
        position={[spaceNX[6], spaceNY[1]]}
        highlighted
      />
    </>
  );

  yield* all(
    texts.buildSFoundation().opacity(1, 1),
    rects.buildFound().width(spaceX[12], 1),
    rects.buildFound().height(spaceY[2], 1),
    rects.buildFound().position([0, 0], 1)
  );

  yield* waitUntil("takingTime");

  const circleYouProgress = createSignal(0);

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
        end={0.816}
      />
      <ExtendedCircle
        ref={circles.you}
        position={() =>
          splines.journey().getPointAtPercentage(circleYouProgress()).position
        }
        color="orange"
        opacity={0}
        highlighted
      />
      <ExtendedTxt
        ref={texts.you}
        text={"You"}
        position={() => circles.you().position()}
        opacity={0}
        textAlign={"center"}
      />
      <ExtendedTxt
        ref={texts.takesTime}
        text={"it takes time⏳,\nbut it's worth it✅"}
        fontSize={spaceY[0.75]}
        fontWeight={500}
        y={spaceNY[3]}
        textAlign={"center"}
        opacity={0}
      />
    </>
  );

  yield* all(
    delay(0.5, texts.buildSFoundation().opacity(0, 1)),
    delay(0.5, rects.buildFound().opacity(0, 1)),
    delay(0.5, splines.journey().opacity(1, 1)),
    delay(0.5, circles.you().opacity(1, 1)),
    delay(0.5, texts.you().opacity(1, 1)),
    circleYouProgress(0.95, 13),
    circles.you().size(spaceY[4], 13),
    texts.you().fontSize(spaceY[0.5], 13),
    texts.you().fontWeight(500, 13),
    delay(6.75, texts.you().text("Programmer", 1)),
    delay(11, texts.takesTime().opacity(1, 1))
  );

  view.add(
    <>
      <ExtendedFillSVG
        ref={fSvgs.website}
        svg={BuildingWebsite}
        width={865}
        height={686}
        opacity={0}
        y={spaceY[1]}
      />
    </>
  );

  yield* all(
    splines.journey().opacity(0, 1),
    circles.you().scale(0, 1),
    texts.you().scale(0, 1),
    texts.takesTime().opacity(0, 1),
    fSvgs.website().write(0.01),
    fSvgs.website().opacity(1, 1),
    fSvgs.website().y(0, 1)
  );

  yield* waitUntil("html");

  view.add(
    <>
      <ExtendedFillSVG ref={fSvgs.html} svg={HTML5} size={spaceY[2]} />
      <ExtendedStrokeSVG
        ref={sSvgs.web}
        svg={Web}
        size={spaceY[3]}
        opacity={0}
      />
    </>
  );

  yield* all(
    fSvgs.website().opacity(0, 1),
    fSvgs.html().write(2),
    delay(3.5, sSvgs.web().write(2)),
    delay(3.5, fSvgs.html().scale(0, 1)),
    delay(3.5, sSvgs.web().opacity(1, 1))
  );

  yield* waitUntil("bigPic");
  view.add(
    <>
      <Img
        ref={images.bigPic}
        src={bigPic}
        opacity={0}
        y={spaceY[1]}
        height={spaceY[10]}
      />
    </>
  );

  yield* all(
    sSvgs.web().scale(0, 1),
    images.bigPic().opacity(1, 1),
    images.bigPic().y(0, 1)
  );

  yield* waitUntil("vid");
  const leftBrace = createRef<Path>();
  const rightBrace = createRef<Path>();
  const circle = createRef<ExtendedCircle>();
  const WebBraces = createRef<ExtendedTxt>();
  const start1 = 0.6;
  const start2 = 0.9;
  view.add(
    <>
      <Img
        ref={images.vid}
        src={vid1}
        opacity={0}
        y={spaceY[1]}
        height={spaceY[4]}
        radius={24}
      />
      <Path
        ref={leftBrace}
        lineWidth={4}
        stroke={"white"}
        data="M185.186 640.001C146.715 629.134 117.698 611.202 98.1358 586.206C78.7912 561.428 69.1188 528.607 69.1188 487.744V422.864C69.1188 370.047 46.0792 343.638 0 343.638V296.363C46.0792 296.363 69.1188 270.063 69.1188 217.463V149.649C69.5535 109.873 79.2259 77.813 98.1358 53.4693C117.263 28.9082 146.28 11.0851 185.186 0L197.576 37.4937C152.148 52.0565 129.435 89.9849 129.435 151.279V217.137C129.435 266.477 111.286 300.819 74.9874 320.164C111.286 339.726 129.435 374.394 129.435 424.168V491.331C130.087 551.103 152.8 588.162 197.576 602.508L185.186 640.001Z"
        start={start1}
        end={start1}
        position={[spaceNX[9], spaceNY[3.5]]}
      />
      <Path
        ref={rightBrace}
        lineWidth={4}
        stroke={"white"}
        data="M0.567383 602.508C44.6904 588.38 67.5127 552.407 69.0342 494.591V422.864C69.0342 372.655 88.7047 338.421 128.046 320.164C88.7047 302.341 69.0342 268.107 69.0342 217.463V151.279C69.0342 89.9849 46.3205 52.0565 0.893339 37.4937L13.2827 0C51.7545 10.8677 80.6626 28.5822 100.007 53.1432C119.352 77.487 129.133 109.764 129.35 149.975V218.442C129.35 270.389 152.39 296.363 198.469 296.363V343.638C152.39 343.638 129.35 370.047 129.35 422.864V488.722C129.35 529.585 119.46 562.297 99.6811 586.858C80.1192 611.419 51.3198 629.134 13.2827 640.001L0.567383 602.508Z"
        start={start2}
        end={start2}
        position={[spaceX[7], spaceNY[3.5]]}
      />
      <ExtendedCircle
        ref={circle}
        position={[-1, -48.5]}
        size={spaceY[2]}
        lineWidth={2}
        scale={0}
      />
      <ExtendedTxt ref={WebBraces} fontSize={spaceY["0.5"]} y={spaceY[1.25]} />
    </>
  );

  yield* all(
    images.bigPic().scale(0, 1),
    images.vid().opacity(1, 1),
    images.vid().y(0, 1),
    delay(0.5, leftBrace().start(0, 4)),
    delay(0.5, rightBrace().start(0, 4)),
    delay(0.5, leftBrace().end(1, 4)),
    delay(0.5, rightBrace().end(1, 4))
  );

  circle().stroke(colors.slate[0]);

  yield* waitUntil("theEnd");

  yield* all(
    images.vid().scale(0, 1),
    leftBrace().scale(0.13, 2),
    rightBrace().scale(0.13, 2),
    leftBrace().position([-46, spaceNY[1]], 2),
    rightBrace().position([18, spaceNY[1]], 2),
    leftBrace().fill(colors.slate[0], 2),
    rightBrace().fill(colors.slate[0], 2),
    leftBrace().lineWidth(0, 2),
    rightBrace().lineWidth(0, 2),
    delay(1.5, circle().scale(1, 1)),
    delay(2.25, WebBraces().text("WebBraces", 2))
  );

  yield* waitUntil("sceneEnd");
  yield* all(
    WebBraces().opacity(0, 1),
    circle().y(0, 1),
    leftBrace().y(-41.5, 1),
    rightBrace().y(-41.5, 1)
    );
    
    yield* waitFor(1.67);
});
