import { makeScene2D } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Grid } from "../nodes";
import { Direction, slideTransition, waitUntil } from "@motion-canvas/core";

export default makeScene2D(function*(view) {
	view.fontFamily('Geist');
	view.fill(colors.zinc[950]);
	view.opacity(0.3);
	view.add(<Grid />);

	yield* slideTransition(Direction.Right, 0.75);

	yield* waitUntil("s4-end");
});
