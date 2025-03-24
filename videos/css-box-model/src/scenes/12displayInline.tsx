import { Code, Img, lines, makeScene2D, Rect, word } from "@motion-canvas/2d";
import colors, { getColorAndShade, getRandomColor } from "../lib/colors";
import { CSSCode, Grid, Window } from "../nodes";
import {
  all,
  createRef,
  createRefMap,
  createSignal,
  Direction,
  slideTransition,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import inline1Src from "../images/inline1.png";
import inline2Src from "../images/inline2.png";
import inline3Src from "../images/inline3.png";
import inline4Src from "../images/inline4.png";

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  // view.add(
  //   <>
  //     <Grid />
  //   </>
  // );
  const displayTxt = createRef<ExtendedTxt>();
  const inlineTxt = createRef<ExtendedTxt>();
  const window = createRef<Window>();
  const code = createRef<Code>();
  const inlineImages = createRefMap<Img>();
  view.add(
    <>
      <ExtendedTxt
        ref={displayTxt}
        text={"display: inline;"}
        fontSize={spaceY["0.5"]}
        y={spaceNY["4.5"]}
        fontWeight={600}
      />

      <ExtendedTxt
        ref={inlineTxt}
        text={"inline"}
        fontSize={spaceY["0.5"]}
        fontWeight={600}
        lineWidth={1}
        y={spaceNY["4.5"]}
        x={82}
        fill={getRandomColor("500")}
      />
      <Window
        ref={window}
        height={spaceY[8]}
        width={spaceX[10]}
        opacity={0}
        position={[spaceNX[4], spaceY[2]]}
        fill={colors.slate[0]}
      />
      <Img
        ref={inlineImages.one}
        src={inline1Src}
        width={spaceX[9.5]}
        x={spaceNX[4]}
        y={spaceY[0.25]}
        opacity={0}
      />
      <Img
        ref={inlineImages.two}
        src={inline2Src}
        width={spaceX[9.5]}
        x={spaceNX[4]}
        y={spaceNY[1.25]}
        opacity={0}
      />
      <Img
        ref={inlineImages.three}
        src={inline3Src}
        width={spaceX[9.5]}
        x={spaceNX[4]}
        y={spaceNY[1.25]}
        opacity={0}
      />
      <Img
        ref={inlineImages.four}
        src={inline4Src}
        width={spaceX[9.5]}
        x={spaceNX[4]}
        y={spaceNY[1.25]}
        opacity={0}
      />
      <CSSCode
        ref={code}
        y={spaceY["2"]}
        x={spaceX[5.5]}
        code={`\
p {
  display: block; /* default */
}
`}
        opacity={0}
        fontSize={spaceY[1] * 0.4}
      />
    </>
  );
  inlineTxt().stroke(
    colors[
      (
        getColorAndShade(String(inlineTxt().fill())) as [
          keyof typeof colors,
          string
        ]
      )[0]
    ][500]
  );
  yield* all(
    slideTransition(Direction.Bottom, 0.75),
    window().opacity(1, 0.75),
    window().y(spaceY[1], 0.75),
    code().opacity(1, 0.75),
    code().y(spaceY[1], 0.75),
    inlineImages.one().opacity(1, 0.75),
    inlineImages.one().y(spaceNY["1.25"], 0.75)
  );
  yield* waitUntil("anchorSpan");
  yield* code().code.insert(
    [3, 0],
    `\
a, span {
  display: inline; /* default */
}
`,
    0.75
  );
  yield* waitUntil("widthHeight");
  const wSignal = createSignal(0);
  const hSignal = createSignal(0);
  yield* code().code.insert(
    [5, 0],
    () => `\
  width: ${wSignal().toFixed(0)}px;
  height: ${hSignal().toFixed(0)}px;
`,
    0.75
  );
  yield* all(wSignal(spaceX[5], 1.75), hSignal(spaceY[4], 1.75));

  yield* code().code.replace(
    lines(5, 6),
    `\
  padding: 2px;
`,
    0.75
  );
  yield* code().code.insert(
    [6, 0],
    `\
  margin: 2px;
`,
    0.75
  );
  yield* code().code.insert(
    [7, 0],
    `\
  border: 2px solid #10b981;
`,
    0.75
  );
  yield* all(
    inlineImages.one().opacity(0, 0.75),
    inlineImages.two().opacity(1, 0.75)
  );
  yield* waitUntil("leftAndRight");
  yield* code().code.replace(
    word(5, 14, 2),
    ` 16px;
`,
    0.75
  );
  yield* code().code.replace(
    word(6, 13, 2),
    ` 16px;
`,
    0.75
  );
  yield* all(
    code().code.remove(
      word(7, 10, 4),

      0.75
    ),
    code().code.insert(
      [8, 0],
      `\
  border-width: 2px 8px;
`,
      0.75
    )
  );
  yield* all(
    inlineImages.two().opacity(0, 0.75),
    inlineImages.three().opacity(1, 0.75)
  );
  yield* waitUntil("topAndBottom");
  yield* code().code.replace(word(5, 11, 6), `16px 2`, 0.75);
  yield* code().code.replace(word(6, 10, 6), `16px 2`, 0.75);
  yield* code().code.replace(word(8, 16, 5), `8px 2`, 0.75);
  yield* all(
    inlineImages.three().opacity(0, 0.75),
    inlineImages.four().opacity(1, 0.75)
  );
  yield* waitUntil("scene12End");
});
