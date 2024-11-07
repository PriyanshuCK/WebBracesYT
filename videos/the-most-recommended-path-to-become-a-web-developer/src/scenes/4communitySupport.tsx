import {
  Circle,
  Icon,
  Img,
  makeScene2D,
  Polygon,
  Ray,
  Video,
} from "@motion-canvas/2d";
import {
  all,
  any,
  createRef,
  createRefMap,
  delay,
  Direction,
  fadeTransition,
  linear,
  range,
  slideTransition,
  useDuration,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { Face, Grid } from "../nodes";
import colors, { colors500, colors700 } from "../lib/colors";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import community from "../videos/community.mp4"

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  //   view.add(
  //     <>
  //       <Grid />
  //     </>
  //   );

  const faces = createRefMap<Face>();
  const rays = createRefMap<Ray>();
  const texts = createRefMap<ExtendedTxt>();
  const videos = createRefMap<Video>();

  view.add(
    <>
      <Ray
        ref={rays.you}
        lineWidth={3}
        stroke={colors.slate[0]}
        fromX={spaceNX[8]}
        toX={spaceX[8]}
        lineCap={"round"}
        y={spaceY[3]}
        opacity={0}
        start={1 / 8}
        end={1 / 8}
      />
      <Face ref={faces.you} scale={0} position={[spaceNX[6], spaceY[2.5]]} highlighted/>
      <ExtendedTxt
        ref={texts.long}
        position={[spaceX[6], spaceY["3.75"]]}
        fontWeight={500}
      />
      <ExtendedTxt
        ref={texts.desertDespair}
        fontSize={spaceY["0.5"]}
        fontWeight={500}
        fill={colors.red[500]}
      />
      <ExtendedTxt
        ref={texts.path}
        fontWeight={500}
        text={"path to become a developer ->"}
        y={spaceY["4.5"]}
        opacity={0}
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

  yield* any(
    slideTransition(Direction.Right, 0.75),
    faces.you().scale(1, 0.75),
    texts.path().opacity(1, 1),    rays.problem1().end(1,23,linear)
  );

  yield* all(
    rays.you().opacity(1, 1),
    rays.you().start(0, 1),
    rays.you().end(1, 1),
    texts.long().text("lonely, distracted, and lost", 1.5)
  );

  yield* waitUntil("desert");

  yield* all(
    texts
      .desertDespair()
      .text("Desert of Despair", useDuration("desertDuration"))
  );

  yield* waitUntil("problems");
  const polygon = createRef<Polygon>();

  view.add(
    <>
      <Polygon
        ref={polygon}
        sides={2}
        size={spaceY[1]}
        scale={0}
        position={[spaceX[6], spaceY["2"]]}
      >
        {range(10).map((index) => {
          const colorIndex = Math.floor(Math.random() * colors500.length);
          return (
            <Icon
              icon={"solar:bug-linear"}
              size={spaceY["0.5"]}
              color={() =>
                colors500[Math.floor(Math.random() * colors500.length)]
              }
              position={() => polygon().vertex(index)}
              opacity={() => polygon().vertexCompletion(index)}
              rotation={index * 36}
            />
          );
        })}
      </Polygon>
    </>
  );
  yield* all(
    polygon().sides(10, 3),
    polygon().scale(1, 1),
    polygon().size(spaceY[3], 3),
    polygon().y(spaceY[1], 3),
    texts.desertDespair().y(spaceNY["2.5"], 1),
    delay(1, texts.long().text("", 1)),
    delay(2.1, texts.long().text("roadblocks", 1))
  );

  view.add(
    <>
      <Video ref={videos.community} src={community} opacity={0} play />
    </>
  );

  yield* all(
    videos.community().opacity(1, 1),
    polygon().sides(2,1),
    polygon().scale(0, 1),
    polygon().size(spaceY[1], 1),
    texts.desertDespair().text("", 1),
    texts.long().text("", 1),
    faces.you().scale(0, 1),
    texts.path().text("", 1),
  );

  yield* waitUntil("communityEnd");
});
