import { Img, Layout, Line, makeScene2D, Spline } from "@motion-canvas/2d";
import {
  all,
  createRef,
  createRefMap,
  createSignal,
  delay,
  Direction,
  fadeTransition,
  slideTransition,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { ExtendedFillSVG, ExtendedRect, Grid } from "../nodes";
import colors from "../lib/colors";
import lecture from "../images/IntroSVGsLecture.png";
import cats from "../images/IntroSVGsCats.png";
import chai from "../images/IntroSVGsChai.png";
import papers from "../images/IntroSVGsPapers.png";
import world from "../images/IntroSVGsConnectedWorld.png";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import { ConnectedWorld } from "../lib/svgs";

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  view.add(<>{/* <Grid /> */}</>);

  const images = createRefMap<Img>();

  view.add(
    <>
      <Img ref={images.lecture} src={lecture} scale={0.15} />
    </>
  );
  yield* fadeTransition(1);
  const imgLayout = createRef<Layout>();
  const progress = createSignal(0);
  const line = createRef<Line>();
  view.add(
    <>
      <Line
        ref={line}
        radius={spaceX[5]}
        points={[
          [0, spaceNY[2]],
          [spaceX[5], spaceNY[4]],
          [spaceX[8], spaceY[1]],
          [spaceX[4], spaceY[5]],
          [0, spaceY[3]],
        ]}
      />
      <Layout
        ref={imgLayout}
        layout
        scale={0.06}
        gap={spaceX["1"] * 15}
        position={() => line().getPointAtPercentage(progress()).position}
      >
        {" "}
        <Img ref={images.cats} src={cats} opacity={0} />
        <Img ref={images.papers} src={papers} opacity={0} />
        <Img ref={images.chai} src={chai} opacity={0} />
      </Layout>
    </>
  );
  yield* waitUntil("catVideo");
  yield* all(
    images.lecture().y(spaceY[3], 1),
    delay(0, images.cats().opacity(1, 1)),
    delay(1, images.papers().opacity(1, 1)),
    delay(2, images.chai().opacity(1, 1))
  );
  yield* all(
    imgLayout().scale(0.025, 1),
    progress(1, 5),
    delay(4, imgLayout().scale(0, 1)),
    delay(5, images.lecture().opacity(0, 1))
  );
  const connectedWorld = createRef<ExtendedFillSVG>();
  view.add(
    <>
      <Img ref={images.world} src={world} scale={0.3} opacity={0} zIndex={1} />
      <ExtendedFillSVG
        ref={connectedWorld}
        svg={ConnectedWorld}
        width={images.world().width() * 0.3}
        height={images.world().height() * 0.3}
      />
    </>
  );
  yield* all(
    connectedWorld().write(2),
    delay(2.5, images.world().opacity(1, 1))
  );

  yield* waitUntil("sceneEnd");
});
