import { Img, Layout, makeScene2D, Rect } from "@motion-canvas/2d";
import {
  all,
  createRef,
  createRefMap,
  delay,
  easeInCubic,
  fadeTransition,
  makeRef,
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
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import oldManStanding from "../images/IntroSVGsOldManStanding.png";
import dhyanPose from "../images/IntroSVGsYogaPose1.png";
import oldManCycle from "../images/IntroSVGsOldManCycle.png";
import oldManLibrarian from "../images/IntroSVGsOldManLibrarian.png";
import oldManStudying from "../images/IntroSVGsOldManStudying.png";

let years = [];
for (let i = 1947; i >= 1922; i--) {
  years.push(i.toString());
}

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  view.add(<>{/* <Grid /> */}</>);

  const yearsLayout = createRef<Layout>();
  const images = createRefMap<Img>();
  const maskTop = createRef<Rect>();
  const maskBottom = createRef<Rect>();

  view.add(
    <>
      <Rect
        ref={maskTop}
        fill={colors.zinc[950]}
        width={spaceX[4]}
        height={spaceY[5]}
        shadowBlur={spaceY[0.5]}
        shadowColor={colors.zinc[950]}
        shadowOffsetY={spaceY[0.75]}
        position={[spaceX[0], spaceNY[4]]}
        zIndex={1}
      />
      <Rect
        ref={maskBottom}
        fill={colors.zinc[950]}
        width={spaceX[4]}
        height={spaceY[5]}
        shadowBlur={spaceY[0.5]}
        shadowColor={colors.zinc[950]}
        shadowOffsetY={spaceNY[0.75]}
        position={[spaceX[0], spaceY[4]]}
        zIndex={1}
      />
      <Layout
        ref={yearsLayout}
        y={spaceY[12] + spaceY[9.25]}
        layout
        direction={"column"}
        gap={spaceY["0.5"]}
        opacity={0}
      />
      <Img
        ref={images.oldManStanding}
        src={oldManStanding}
        scale={0.2}
        position={[spaceNX[3], spaceY[0]]}
        opacity={0}
      />
    </>
  );

  const yearsEntries: Layout[] = [];
  Object.entries(years).forEach(([indexOfYear, year], index) => {
    const entry = makeRef(yearsEntries, index);
    yearsLayout().add(
      <ExtendedTxt
        text={year}
        textAlign={"center"}
        fontWeight={700}
        fontSize={spaceY[1]}
        letterSpacing={12}
      />
    );
  });

  yield* waitUntil("imagineIt's");
  yield* all(
    yearsLayout().opacity(1, 0.25),
    yearsLayout().y(spaceNY[12] - spaceY[7.5], 2)
  );
  yield* all(
    yearsLayout().opacity(0, 1),
    delay(0.5, maskTop().scale(0, 1)),
    delay(0.5, maskBottom().scale(0, 1)),
    delay(0.5, images.oldManStanding().opacity(1, 1))
  );

  const extendedCircleRefs = createRefMap<ExtendedCircle>();

  view.add(
    <>
      <ExtendedCircle
        ref={extendedCircleRefs.bubble1}
        scale={0}
        position={[spaceNX[2], spaceNY[2.5]]}
        size={spaceY["0.25"]}
      />
      <ExtendedCircle
        ref={extendedCircleRefs.bubble2}
        scale={0}
        position={[spaceNX[1.25], spaceNY[3]]}
        size={spaceY["0.5"]}
      />
      <ExtendedCircle
        ref={extendedCircleRefs.bubble3}
        scale={0}
        position={[spaceX[0], spaceNY[4]]}
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

  yield* waitUntil("question")

  yield* all(
    extendedCircleRefs.bubble1().scale(1, 1),
    extendedCircleRefs.bubble2().scale(1, 1),
    extendedCircleRefs.bubble3().scale(1, 1),
    delay(1, images.dhyanPose().opacity(1, 1))
  );
  yield* waitUntil("hePutsOn");
  yield* all(
    extendedCircleRefs.bubble1().scale(0, 1),
    extendedCircleRefs.bubble2().scale(0, 1),
    extendedCircleRefs.bubble3().scale(0, 1),
    images.dhyanPose().scale(0, 1)
  );

  view.add(
    <>
      <Img
        ref={images.oldManCycle}
        src={oldManCycle}
        scale={0.2}
        position={[spaceNX[2.75], spaceY[0]]}
        opacity={0}
      />
      <Img
        ref={images.oldManLibrarian}
        src={oldManLibrarian}
        scale={0.2}
        opacity={0}
      />
    </>
  );

  yield* all(
    images.oldManStanding().opacity(0,1.5),
    images.oldManCycle().opacity(1,1.5)
  );
  yield* all(
    images.oldManCycle().x(spaceX[4], 2.5, easeInCubic),
    delay(1.5, images.oldManCycle().opacity(0, 1))
  );
  yield* all(images.oldManLibrarian().opacity(1, 1));

  yield* waitUntil("hoursPass");

  view.add(
    <>
      <Img
        ref={images.oldManStudying}
        src={oldManStudying}
        scale={0.2}
        opacity={0}
      />
    </>
  );
  yield* all(
    images.oldManLibrarian().opacity(0, 2),
    images.oldManStudying().opacity(1, 2)
  );

  yield* waitUntil("sceneEnd");
});
