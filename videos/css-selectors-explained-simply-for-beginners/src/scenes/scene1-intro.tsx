import { makeScene2D } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Grid } from "../nodes";
import { waitFor, waitUntil } from "@motion-canvas/core";

export default makeScene2D(function*(view) {
	view.fontFamily('Geist');
	view.fill(colors.zinc[950]);
	// view.add(<Grid />);

	yield* waitUntil("s1-end");
}
)
