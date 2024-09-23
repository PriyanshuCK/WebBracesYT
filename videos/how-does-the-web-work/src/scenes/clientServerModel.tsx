import {
  Camera,
  Icon,
  Img,
  Layout,
  makeScene2D,
  Path,
  Ray,
  SVG,
  Txt,
} from "@motion-canvas/2d";
import {
  all,
  Color,
  createRef,
  createRefMap,
  delay,
  easeInCubic,
  fadeTransition,
  linear,
  PossibleColor,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import {
  ExtendedCircle,
  ExtendedFillSVG,
  ExtendedRect,
  ExtendedStrokeSVG,
  Grid,
} from "../nodes";
import colors, { colorPalettes } from "../lib/colors";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import { Library, Reader, Web } from "../lib/svgs";
import atomicHabitsImg from "../images/atomic-habits-dots.png";

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  view.add(<>
    {/* <Grid /> */}
  </>);

  yield* fadeTransition(0.75);

  const extendedRectRefs = createRefMap<ExtendedRect>();
  const extendedCircleRefs = createRefMap<ExtendedCircle>();
  const SVGStrokeRefs = createRefMap<ExtendedStrokeSVG>();
  const TxtRefs = createRefMap<Txt>();
  const LayoutRefs = createRefMap<Layout>();
  const atomicHabitsRef = createRef<Img>();
  const RayRefs = createRefMap<Ray>();
  const cameraRef = createRef<Camera>();

  view.add(
    <>
        <Layout ref={LayoutRefs.web}>
          <ExtendedRect
            ref={extendedRectRefs.webOuter}
            width={spaceY[4]}
            height={spaceY[4]}
            radius={spaceY[2]}
            color="emerald"
            scale={0}
          />
          <ExtendedStrokeSVG
            ref={SVGStrokeRefs.web}
            svg={Web}
            size={spaceY["1.25"]}
            y={spaceNY["0.67"]}
          />
          <ExtendedRect
            ref={extendedRectRefs.webSmaller}
            y={spaceY[2]}
            width={spaceX["1"]}
            height={spaceY["0.67"]}
            scale={0}
          />
          <Txt
            ref={TxtRefs.web}
            fontSize={spaceY[0.75]}
            fill={colors.slate[0]}
            fontWeight={700}
            text={"Web"}
            y={spaceY["0.75"]}
            opacity={0}
          />
          <Txt
            ref={TxtRefs.library}
            fontSize={spaceY[0.75]}
            fill={colors.slate[0]}
            fontWeight={700}
            text={"Library"}
            y={spaceY["0.75"]}
            opacity={0}
          />
        </Layout>
    </>
  );

  SVGStrokeRefs.web().stroke(extendedRectRefs.webOuter().stroke());
  extendedRectRefs.webSmaller().fill(extendedRectRefs.webOuter().stroke());
  extendedRectRefs.webSmaller().stroke(null);

  yield* all(
    SVGStrokeRefs.web().write(0.75),
    extendedRectRefs.webOuter().scale(1, 0.75),
    TxtRefs.web().opacity(1, 0.75)
  );
  yield* all(
    SVGStrokeRefs.web().svg(Library, 0.75),
    extendedRectRefs.webOuter().radius(12, 0.75),
    extendedRectRefs.webOuter().width(spaceX[5], 0.75),
    extendedRectRefs.webSmaller().scale(1, 0.75),
    TxtRefs.web().position(extendedRectRefs.webOuter().bottom(), 0.75),
    TxtRefs.web().fontSize(spaceY[0.33], 0.75),
    TxtRefs.web().fill(
      colors[extendedRectRefs.webOuter().colorSignal()][950],
      1
    ),
    TxtRefs.library().opacity(1, 1)
  );

  view.add(
    <>
      <Layout ref={LayoutRefs.device} opacity={0}>
        <ExtendedRect
          ref={extendedRectRefs.deviceOuter}
          width={spaceX[5]}
          height={spaceY[4]}
        />
        <ExtendedRect
          ref={extendedRectRefs.deviceSmaller}
          y={spaceY[2]}
          width={spaceX[1.33]}
          height={spaceY["0.67"]}
        />
        <ExtendedStrokeSVG
          ref={SVGStrokeRefs.device}
          svg={Reader}
          size={spaceY["1.25"]}
          y={spaceNY["0.67"]}
          lineWidth={1.5}
        />

        <Txt
          ref={TxtRefs.device}
          fontSize={spaceY[0.33]}
          fontWeight={700}
          text={"Device"}
          y={spaceY[2]}
        />
        <Txt
          ref={TxtRefs.reader}
          fontSize={spaceY[0.75]}
          fill={colors.slate[0]}
          fontWeight={700}
          text={"Reader"}
          y={spaceY["0.75"]}
        />
      </Layout>
    </>
  );

  extendedRectRefs
    .deviceSmaller()
    .fill(extendedRectRefs.deviceOuter().stroke());
  extendedRectRefs.deviceSmaller().stroke(null);
  TxtRefs.device().fill(
    colors[extendedRectRefs.deviceOuter().colorSignal()][950]
  );
  SVGStrokeRefs.device().stroke(extendedRectRefs.deviceOuter().stroke());

  yield* all(
    LayoutRefs.web().x(spaceX["4"], 1),
    LayoutRefs.device().opacity(1, 1),
    LayoutRefs.device().x(spaceNX["4"], 1),
    delay(0.75, SVGStrokeRefs.device().write(1))
  );

  yield* waitUntil("inThisLibrary");

  view.add(
    <>
      <Layout ref={LayoutRefs.img}>
      <ExtendedCircle
        ref={extendedCircleRefs.bubble1}
        scale={0}
        position={[spaceNX[5], spaceNY[1.5]]}
        size={spaceY["0.25"]}
      />
      <ExtendedCircle
        ref={extendedCircleRefs.bubble2}
        scale={0}
        position={[spaceNX[4], spaceNY[2]]}
        size={spaceY["0.75"]}
      />
      <ExtendedCircle
        ref={extendedCircleRefs.bubble3}
        scale={0}
        position={[spaceNX[2], spaceNY[3]]}
        size={spaceY["3"]}
      />
      <Img
        ref={atomicHabitsRef}
        src={atomicHabitsImg}
        scale={0}
        position={[spaceNX[2], spaceNY[3]]}
        />
        </Layout>
    </>
  );
  extendedCircleRefs.bubble1().stroke(extendedRectRefs.deviceOuter().stroke());
  extendedCircleRefs.bubble2().stroke(extendedRectRefs.deviceOuter().stroke());
  extendedCircleRefs.bubble3().stroke(extendedRectRefs.deviceOuter().stroke());

  yield* all(
    LayoutRefs.web().position([spaceX["5.5"], spaceY[1]], 1),
    LayoutRefs.device().position([spaceNX["5.5"], spaceY[1]], 1),
    extendedCircleRefs.bubble1().scale(1, 1),
    extendedCircleRefs.bubble2().scale(1, 1),
    extendedCircleRefs.bubble3().scale(1, 1),
    atomicHabitsRef().scale(0.25, 1)
  );

  yield* waitUntil("youAskThe");

  view.add(
    <>
      <Layout ref={LayoutRefs.centerTexts}>
      <Ray
        ref={RayRefs.request}
        lineWidth={4}
        endArrow
        from={[extendedRectRefs.webOuter().left().x, spaceNY[1.5]]}
        to={[extendedRectRefs.deviceOuter().right().x, spaceNY[1.5]]}
        stroke={extendedRectRefs.deviceOuter().stroke()}
        lineCap={"round"}
        lineDash={[10, 20]}
        arrowSize={18}
        end={0}
      />
      <Ray
        ref={RayRefs.response}
        lineWidth={4}
        endArrow
        to={[extendedRectRefs.webOuter().left().x, spaceY[1.5]]}
        from={[extendedRectRefs.deviceOuter().right().x, spaceY[1.5]]}
        stroke={extendedRectRefs.webOuter().stroke()}
        lineCap={"round"}
        lineDash={[10, 20]}
        arrowSize={18}
        end={0}
      />
      <Txt
        ref={TxtRefs.request}
        fontSize={spaceY[0.5]}
        fill={colors.slate[0]}
        fontWeight={600}
        text={""}
        y={RayRefs.request().from().y - spaceY["0.5"]}
      />
      <Txt
        ref={TxtRefs.response}
        fontSize={spaceY[0.5]}
        fill={colors.slate[0]}
        fontWeight={600}
        text={""}
        y={RayRefs.response().from().y + spaceY["0.5"]}
      />
      <Txt
        ref={TxtRefs.cigAH}
        fontSize={spaceY[0.33]}
        fill={extendedRectRefs.deviceOuter().stroke()}
        fontWeight={400}
        text={""}
        y={RayRefs.request().from().y + spaceY["0.5"]}
      />
      <Txt
        ref={TxtRefs.yoc}
        fontSize={spaceY[0.33]}
        fill={extendedRectRefs.webOuter().stroke()}
        fontWeight={400}
        text={""}
        y={RayRefs.response().from().y - spaceY["0.5"]}
        />
        </Layout>
    </>
  );

  yield* all(
    LayoutRefs.web().y(spaceY[0], 1),
    LayoutRefs.device().y(spaceY[0], 1),
    extendedCircleRefs.bubble1().scale(0, 1),
    extendedCircleRefs.bubble2().scale(0, 1),
    extendedCircleRefs.bubble3().scale(0, 1),
    atomicHabitsRef().scale(0, 1),
    delay(0.2, RayRefs.request().end(1, 1)),
    delay(0.3, TxtRefs.request().text("Request", 1)),
    delay(0.4, TxtRefs.cigAH().text("Can I get the 'Atomic Habits'?", 1)),
    delay(0.6, RayRefs.response().end(1, 1)),
    delay(0.7, TxtRefs.response().text("Response", 1)),
    delay(0.8, TxtRefs.yoc().text("Sure! here it is...", 1))
  );

  yield* waitUntil("csModel");

  view.add(
    <>
      <Txt
        ref={TxtRefs.csmodel}
        fontSize={spaceY[0.75]}
        fill={colors.slate[0]}
        fontWeight={700}
        text={""}
        y={spaceY[4]}
      />
    </>
  );

  yield* all(TxtRefs.csmodel().text("Client-Server Model", 1));

  // yield* waitUntil("client")
  yield* extendedRectRefs.deviceOuter().highlight();
  yield* TxtRefs.reader().text("Client", 1, easeInCubic);
  yield* all(
    extendedRectRefs.deviceOuter().highlight(),
    extendedRectRefs.webOuter().highlight(),
    TxtRefs.library().text("Server", 1, easeInCubic)
  );
  yield* waitUntil("server");
  yield* extendedRectRefs.webOuter().highlight();

  yield* all(
    LayoutRefs.device().opacity(0, 1),
    LayoutRefs.img().opacity(0, 1),
    LayoutRefs.centerTexts().opacity(0, 1),
    TxtRefs.csmodel().opacity(0, 1),
    TxtRefs.library().opacity(0, 1),
    TxtRefs.web().opacity(0, 1),
    extendedRectRefs.webOuter().stroke(null, 1),
    extendedRectRefs.webSmaller().opacity(0, 1),
  )

  yield* waitUntil("sceneEnd")

});
