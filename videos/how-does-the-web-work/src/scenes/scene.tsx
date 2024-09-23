import {
  Circle,
  CODE,
  Code,
  Curve,
  Icon,
  Img,
  Line,
  makeScene2D,
  Rect,
  Txt,
} from "@motion-canvas/2d";
import {
  all,
  chain,
  createRef,
  createSignal,
  easeInOutSine,
  fadeTransition,
  linear,
  loop,
  PossibleVector2,
  sequence,
  Vector2,
  waitFor,
} from "@motion-canvas/core";
import BG from "../images/Background.png";
import { Cursor, ExtendedCircle, ExtendedRect, Grid } from "../nodes";
import colors, { colorPalettes } from "../lib/colors";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import { CSSCode, HTMLCode, JSCode } from "../nodes/Code";
import { Window } from "../nodes/Window";

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.add(<><Grid /></>);

  const windowRef = createRef<Window>();

  view.add(
    <>
      <Window x={spaceNX[4]} />
      <Window x={spaceX[4]} />
    </>
  );

  yield* waitFor(0.75);
});
