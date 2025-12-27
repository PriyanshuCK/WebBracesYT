import { makeScene2D } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Grid } from "../nodes";
import { all, createRef, Direction, slideTransition, waitUntil } from "@motion-canvas/core";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceNY, spaceY } from "../lib/space";

export default makeScene2D(function*(view) {
  view.fontFamily('Geist');
  view.fill(colors.zinc[950]);
  // view.add(<Grid />);

  yield* slideTransition(Direction.Right);

  const universalSelector = createRef<ExtendedTxt>();
  const selectsAll = createRef<ExtendedTxt>();
  const lowSpecificity = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={universalSelector}
        text={"The Universal Selector (*)"}
        fontSize={spaceY[0.67]}
        fontWeight={600}
        opacity={0}
      />
      <ExtendedTxt
        ref={selectsAll}
        fontSize={spaceY[0.5]}
      />
      <ExtendedTxt
        ref={lowSpecificity}
        fontSize={spaceY[0.5]}
        y={spaceY[1]}
        x={spaceX[1] + 10}
      />
    </>
  )

  yield* universalSelector().opacity(1, 0.75);

  yield* waitUntil("selects-all");
  yield* all(
    selectsAll().text("→ selects all elements on a page.", 1.25),
    universalSelector().y(spaceNY[1], 0.75),
  )

  yield* waitUntil("low-specificity");
  yield* all(
    lowSpecificity().text("→ has the lowest specificity of all selectors.", 1.5),
  )

  yield* waitUntil("s14-end");

})
