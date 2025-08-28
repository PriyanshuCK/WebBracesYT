import { makeScene2D, Video } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Grid } from "../nodes";
import {
  createRef,
  Direction,
  slideTransition,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import rec from "../images/rec1.mp4";
import { spaceY } from "../lib/space";

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  // view.add(
  //   <>
  //     <Grid />
  //   </>
  // );
  yield* slideTransition(Direction.Right, 0.75);
  const vRef = createRef<Video>();
  view.add(
    <>
      <Video
        ref={vRef}
        src={rec}
        radius={10}
        height={spaceY[12]}
        opacity={0}
        play
      />
    </>
  );
  yield* vRef().opacity(1, 0.75);
  yield* waitUntil("scene10End");
});
