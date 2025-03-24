import {
  Circle,
  Code,
  Layout,
  lines,
  makeScene2D,
  Rect,
  word,
} from "@motion-canvas/2d";
import colors, { getColorAndShade, getRandomColor } from "../lib/colors";
import { CSSCode, Grid, Window } from "../nodes";
import {
  all,
  Color,
  createRef,
  createSignal,
  delay,
  Direction,
  slideTransition,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import { ExtendedTxt } from "../nodes/ExtendedTxt";

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  // view.add(
  //   <>
  //     <Grid />
  //   </>
  // );

  const contentTxt = createRef<ExtendedTxt>();
  const contentBG = createRef<Rect>();
  const paddingBG = createRef<Rect>();

  view.add(
    <>
      <Rect
        ref={paddingBG}
        layout
        padding={100}
        fill={new Color(colors.cyan[700]).alpha(0.3)}
        stroke={colors.cyan[600]}
        lineWidth={24}
      >
        <Rect
          ref={contentBG}
          fill={colors.cyan[300]}
          padding={[0, spaceX[0.25] / 2]}
          layout
          alignItems={"center"}
          justifyContent={"center"}
        >
          <ExtendedTxt
            ref={contentTxt}
            fill={colors.cyan[700]}
            text={"Content"}
            fontSize={spaceY["0.5"]}
            fontWeight={600}
          />
        </Rect>
      </Rect>
    </>
  );
  yield* all(
    slideTransition(Direction.Right, 0.75),
    paddingBG().padding(200, 1.5).to(100, 1.5),
    contentBG().height(spaceY[3], 1.5).to(spaceY[2], 1.5),
    delay(1.5, contentBG().width(spaceX[4], 1.5))
  );
  const colA = createRef<Layout>();
  const colB = createRef<Layout>();
  const rowA = createRef<Layout>();
  const allBoxesLayout = createRef<Layout>();
  view.add(
    <>
      <Layout
        ref={allBoxesLayout}
        layout
        gap={spaceY["0.25"]}
        padding={spaceY["0.25"]}
        width={spaceX[10]}
        height={spaceY[5]}
        scale={0}
      >
        <Rect
          ref={colA}
          grow={1}
          fill={colors.amber[500]}
          radius={12}
          stroke={"#fff"}
          lineWidth={4}
        />
        <Layout gap={spaceY["0.25"]} direction="column" grow={3}>
          <Rect
            ref={rowA}
            grow={8}
            fill={colors.fuchsia[500]}
            radius={12}
            stroke={"#fff"}
            lineWidth={4}
          ></Rect>
          <Rect
            grow={2}
            fill={colors.emerald[500]}
            radius={12}
            stroke={"#fff"}
            lineWidth={4}
          />
        </Layout>
        <Rect
          ref={colB}
          grow={3}
          fill={colors.sky[500]}
          radius={12}
          stroke={"#fff"}
          lineWidth={4}
        />
      </Layout>
    </>
  );
  yield* all(
    allBoxesLayout().scale(1, 0.75),
    paddingBG().scale(0, 0.75),
    colB().grow(1, 0.75),
    colA().grow(2, 0.75)
  );
  yield* rowA().grow(1, 0.75);
  yield* all(colB().grow(3, 0.75), colA().grow(1, 0.75));
  yield* rowA().grow(8, 0.75);
  const displayTxt = createRef<ExtendedTxt>();
  const blockTxt = createRef<ExtendedTxt>();
  const inlineTxt = createRef<ExtendedTxt>();
  const inlineBlockTxt = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={displayTxt}
        text={"display"}
        fontSize={spaceY["0.75"]}
        y={spaceNY["0.5"]}
        fontWeight={600}
        opacity={0}
      />
      <ExtendedTxt
        ref={blockTxt}
        text={"block"}
        fontSize={spaceY["0.5"]}
        fontWeight={500}
        y={spaceY["0.5"]}
        opacity={0}
        x={spaceNX[3]}
        fill={getRandomColor("500")}
      />
      <ExtendedTxt
        ref={inlineBlockTxt}
        text={"inline-block"}
        fontSize={spaceY["0.5"]}
        fontWeight={500}
        y={spaceY["0.5"]}
        opacity={0}
        fill={getRandomColor("500")}
      />
      <ExtendedTxt
        ref={inlineTxt}
        text={"inline"}
        fontSize={spaceY["0.5"]}
        fontWeight={500}
        y={spaceY["0.5"]}
        opacity={0}
        x={spaceX[3]}
        fill={getRandomColor("500")}
      />
    </>
  );
  yield* all(
    allBoxesLayout().opacity(0, 0.75),
    delay(0.2, displayTxt().y(spaceNY["1.5"], 0.75)),
    delay(0.2, displayTxt().opacity(1, 0.75)),
    delay(0.4, blockTxt().opacity(1, 0.75)),
    delay(0.6, inlineBlockTxt().opacity(1, 0.75)),
    delay(0.8, inlineTxt().opacity(1, 0.75))
  );
  yield* waitUntil("elementsLike");
  blockTxt().stroke(blockTxt().fill());
  const code = createRef<Code>();
  view.add(
    <CSSCode
      ref={code}
      y={spaceY["2"]}
      code={`\
p {
}
`}
      opacity={0}
      fontSize={spaceY[1] * 0.4}
    />
  );
  yield* all(
    inlineBlockTxt().opacity(0, 0.75),
    inlineTxt().opacity(0, 0.75),
    inlineBlockTxt().y(spaceY["1.5"], 0.75),
    inlineTxt().y(spaceY["1.5"], 0.75),
    delay(0.25, displayTxt().text("display: block;", 0.75)),
    blockTxt().position([spaceX[1] + 29, spaceNY["1.5"]], 0.75),
    blockTxt().fontSize(spaceY["0.75"], 0.75),
    blockTxt().fontWeight(600, 0.75),
    blockTxt().lineWidth(1, 0.75),
    delay(0.5, code().opacity(1, 0.75))
  );
  yield* code().code.replace(word(0, 1, 1), `, div `, 0.75);
  yield* code().code.replace(word(0, 6, 1), `, h1 `, 0.75);
  yield* code().code.replace(word(0, 10, 1), `, section `, 0.75);
  yield* waitFor(0.5);
  yield* code().code.insert(
    [1, 0],
    `\
  display: block; /* default */
`,
    0.75
  );
  yield* waitUntil("blockElementsNewLine");
  const window = createRef<Window>();
  const rect1 = createRef<Rect>();
  const txt1 = createRef<ExtendedTxt>();
  const rect2 = createRef<Rect>();
  const txt2 = createRef<ExtendedTxt>();
  const rect3 = createRef<Rect>();
  const txt3 = createRef<ExtendedTxt>();
  view.add(
    <>
      <Window
        ref={window}
        height={spaceY[8]}
        width={spaceX[11]}
        opacity={0}
        position={[spaceNX[3.5], spaceY[2]]}
        fill={colors.slate[0]}
      >
        <Rect
          ref={rect1}
          fill={getRandomColor("300")}
          padding={12}
          lineWidth={2}
          marginBottom={spaceY["0.25"]}
        >
          <ExtendedTxt ref={txt1} text={"Block Element 1"} fontWeight={500} />
        </Rect>
        <Rect
          ref={rect2}
          fill={getRandomColor("300")}
          padding={12}
          lineWidth={2}
          marginBottom={spaceY["0.25"]}
        >
          <ExtendedTxt ref={txt2} text={"Block Element 2"} fontWeight={500} />
        </Rect>
        <Rect
          ref={rect3}
          fill={getRandomColor("300")}
          padding={12}
          lineWidth={2}
        >
          <ExtendedTxt ref={txt3} text={"Block Element 3"} fontWeight={500} />
        </Rect>
      </Window>
    </>
  );
  txt1().fill(
    colors[
      (
        getColorAndShade(String(rect1().fill())) as [
          keyof typeof colors,
          string
        ]
      )[0]
    ][700]
  );
  rect1().stroke(
    colors[
      (
        getColorAndShade(String(rect1().fill())) as [
          keyof typeof colors,
          string
        ]
      )[0]
    ][500]
  );
  txt2().fill(
    colors[
      (
        getColorAndShade(String(rect2().fill())) as [
          keyof typeof colors,
          string
        ]
      )[0]
    ][700]
  );
  rect2().stroke(
    colors[
      (
        getColorAndShade(String(rect2().fill())) as [
          keyof typeof colors,
          string
        ]
      )[0]
    ][500]
  );
  txt3().fill(
    colors[
      (
        getColorAndShade(String(rect3().fill())) as [
          keyof typeof colors,
          string
        ]
      )[0]
    ][700]
  );
  rect3().stroke(
    colors[
      (
        getColorAndShade(String(rect3().fill())) as [
          keyof typeof colors,
          string
        ]
      )[0]
    ][500]
  );
  yield* all(
    code().x(spaceX[6], 0.75),
    code().y(spaceY[1], 0.75),
    blockTxt().y(spaceNY["4.5"], 0.75),
    displayTxt().y(spaceNY["4.5"], 0.75),
    blockTxt().fontSize(spaceY["0.5"], 0.75),
    displayTxt().fontSize(spaceY["0.5"], 0.75),
    blockTxt().x(spaceX["1"] * 0.85 + 2, 0.75),
    window().opacity(1, 0.75),
    window().y(spaceY[1], 0.75),
    code().fontSize(spaceY["0.33"], 0.75),
    code().code.insert(
      [2, 0],
      `\
  padding: 12px;
  border: 2px solid;
  margin: 24px;
`,
      0.75
    )
  );
  yield* waitUntil("unlessSpecify");
  const rect2W = createSignal(spaceX[6]);
  const rect2H = createSignal(spaceY["1"]);
  yield* all(
    code().code.append(
      () => `\
.box2 {
  width: ${rect2W().toFixed(0)}px;
  height: ${rect2H().toFixed(0)}px;
} 
`,
      0.75
    ),
    rect2().width(() => rect2W(), 0.75),
    rect2().height(() => rect2H(), 0.75)
  );
  yield* waitUntil("respectSize");
  yield* rect2W(spaceX[8], 1);
  yield* rect2H(spaceY["2.5"], 1);
  yield* waitUntil("anyPadding");
  yield* all(
    code().code.insert(
      [9, 0],
      () => `\
  padding: ${rect2().padding().top}px;
`,
      0.75
    ),
    rect2().padding(84, 0.75)
  );
  yield* all(
    code().code.insert(
      [10, 0],
      () => `\
  margin: ${rect2().margin().top}px;
`,
      0.75
    ),
    rect2().margin(84, 0.75)
  );
  yield* all(
    code().code.insert(
      [11, 0],
      () => `\
  border: ${rect2().lineWidth()}px;
`,
      0.75
    ),
    rect2().lineWidth(16, 0.75),
    rect2().margin([84, 84, 100 + spaceY["0.25"], 84], 0.75)
  );
  yield* waitUntil("scene11End");
});
