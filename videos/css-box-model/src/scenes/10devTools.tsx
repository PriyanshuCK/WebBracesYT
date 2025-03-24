import { makeScene2D } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Grid } from "../nodes";
import {
  Direction,
  slideTransition,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  // view.add(
  //   <>
  //     <Grid />
  //   </>
  // );
  yield* slideTransition(Direction.Right, 0.75);
  yield* waitUntil("scene10End");
});
