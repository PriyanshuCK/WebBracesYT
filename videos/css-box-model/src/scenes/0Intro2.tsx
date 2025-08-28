import { makeScene2D, Video } from "@motion-canvas/2d";
import colors, { getRandomColor } from "../lib/colors";
import { Grid } from "../nodes";
import {
  all,
  createRef,
  createRefMap,
  Direction,
  slideTransition,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import paddingVideo from "../images/1padding.mp4";
import marginVideo from "../images/2margin.mp4";
import displayVideo from "../images/3display.mp4";
import boxsizingVideo from "../images/4boxsizing.mp4";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  //   view.add(
  //     <>
  //       <Grid />
  //     </>
  //   );
  const videos = createRefMap<Video>();
  view.add(
    <>
      <Video
        ref={videos.b}
        src={boxsizingVideo}
        radius={10}
        height={spaceY[4.5]}
        opacity={0}
        play
        stroke={colors.orange[500]}
        lineWidth={3}
      />
      <Video
        ref={videos.d}
        src={displayVideo}
        radius={10}
        height={spaceY[4.5]}
        opacity={0}
        play
        stroke={colors.fuchsia[500]}
        lineWidth={3}
      />
      <Video
        ref={videos.m}
        src={marginVideo}
        radius={10}
        height={spaceY[4.5]}
        opacity={0}
        play
        stroke={colors.sky[500]}
        lineWidth={3}
      />
      <Video
        ref={videos.p}
        src={paddingVideo}
        radius={10}
        height={spaceY[4.5]}
        play
        stroke={colors.green[500]}
        lineWidth={3}
      />
    </>
  );
  yield* slideTransition(Direction.Bottom, 0.75);
  yield* waitUntil("margin");
  yield* all(
    videos.m().opacity(1, 0.75),
    videos.p().x(spaceNX[4.25], 0.75),
    videos.m().x(spaceX[4.25], 0.75)
  );
  yield* waitUntil("display");
  yield* all(
    videos.d().opacity(1, 0.75),
    videos.p().y(spaceNY[2.75], 0.75),
    videos.m().y(spaceNY[2.75], 0.75),
    videos.d().y(spaceY[2.75], 0.75)
  );
  yield* waitUntil("boxSizing");
  yield* all(
    videos.b().opacity(1, 0.75),
    videos.d().x(spaceNX[4.25], 0.75),
    videos.b().x(spaceX[4.25], 0.75),
    videos.b().y(spaceY[2.75], 0.75)
  );
  yield* waitUntil("scene02End");
});
