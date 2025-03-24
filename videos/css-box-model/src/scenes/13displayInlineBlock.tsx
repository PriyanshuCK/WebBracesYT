import { Code, Layout, lines, makeScene2D, Rect } from "@motion-canvas/2d";
import colors, { getColorAndShade, getRandomColor } from "../lib/colors";
import { CSSCode, Grid, Window } from "../nodes";
import {
  all,
  createRef,
  createSignal,
  Direction,
  slideTransition,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  // view.add(
  //   <>
  //     <Grid />
  //   </>
  // );

  const displayTxt = createRef<ExtendedTxt>();
  const inlineBlockTxt = createRef<ExtendedTxt>();
  const window = createRef<Window>();
  const code = createRef<Code>();
  const rect1 = createRef<Rect>();
  const txt1 = createRef<ExtendedTxt>();
  const rect2 = createRef<Rect>();
  const txt2 = createRef<ExtendedTxt>();
  const rect3 = createRef<Rect>();
  const txt3 = createRef<ExtendedTxt>();
  const rect4 = createRef<Rect>();
  const txt4 = createRef<ExtendedTxt>();
  const rect5 = createRef<Rect>();
  const txt5 = createRef<ExtendedTxt>();
  const rect6 = createRef<Rect>();
  const txt6 = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={displayTxt}
        text={"display: inline-block;"}
        fontSize={spaceY["0.5"]}
        y={spaceNY["4.5"]}
        fontWeight={600}
      />

      <ExtendedTxt
        ref={inlineBlockTxt}
        text={"inline-block"}
        fontSize={spaceY["0.5"]}
        fontWeight={600}
        lineWidth={1}
        y={spaceNY["4.5"]}
        x={83}
        fill={getRandomColor("500")}
      />
      <Window
        ref={window}
        height={spaceY[8]}
        width={spaceX[12]}
        opacity={0}
        position={[spaceNX[3], spaceY[2]]}
        fill={colors.slate[0]}
      >
        <Layout layout gap={spaceX["0.25"]} wrap={"wrap"}>
          <Rect
            ref={rect1}
            fill={getRandomColor("300")}
            padding={12}
            lineWidth={2}
          >
            <ExtendedTxt
              ref={txt1}
              text={"Inline Block Element 1"}
              fontWeight={500}
            />
          </Rect>
          <Rect
            ref={rect2}
            fill={getRandomColor("300")}
            padding={12}
            lineWidth={2}
          >
            <ExtendedTxt
              ref={txt2}
              text={"Inline Block Element 2"}
              fontWeight={500}
            />
          </Rect>
          <Rect
            ref={rect3}
            fill={getRandomColor("300")}
            padding={12}
            lineWidth={2}
          >
            <ExtendedTxt
              ref={txt3}
              text={"Inline Block Element 3"}
              fontWeight={500}
            />
          </Rect>
          <Rect
            ref={rect4}
            fill={getRandomColor("300")}
            padding={12}
            lineWidth={2}
          >
            <ExtendedTxt
              ref={txt4}
              text={"Inline Block Element 4"}
              fontWeight={500}
            />
          </Rect>
          <Rect
            ref={rect5}
            fill={getRandomColor("300")}
            padding={12}
            lineWidth={2}
          >
            <ExtendedTxt
              ref={txt5}
              text={"Inline Block Element 5"}
              fontWeight={500}
            />
          </Rect>
          <Rect
            ref={rect6}
            fill={getRandomColor("300")}
            padding={12}
            lineWidth={2}
          >
            <ExtendedTxt
              ref={txt6}
              text={"Inline Block Element 6"}
              fontWeight={500}
            />
          </Rect>
        </Layout>
      </Window>
      <CSSCode
        ref={code}
        y={spaceY["2"]}
        x={spaceX[6.5]}
        code={`\
a, span {
  display: inline-block;
}
`}
        opacity={0}
        fontSize={spaceY[0.33]}
      />
    </>
  );
  inlineBlockTxt().stroke(
    colors[
      (
        getColorAndShade(String(inlineBlockTxt().fill())) as [
          keyof typeof colors,
          string
        ]
      )[0]
    ][500]
  );
  for (let i = 1; i <= 6; i++) {
    const rect = eval(`rect${i}()`);
    const txt = eval(`txt${i}()`);

    const colorKey = (
      getColorAndShade(String(rect.fill())) as [keyof typeof colors, string]
    )[0];

    txt.fill(colors[colorKey][700]);
    rect.stroke(colors[colorKey][500]);
  }

  yield* all(
    slideTransition(Direction.Bottom, 0.75),
    window().opacity(1, 0.75),
    window().y(spaceY[1], 0.75),
    code().opacity(1, 0.75),
    code().y(spaceY[1], 0.75)
  );
  yield* waitUntil("respectWidth");
  yield* all(
    code().code.append(
      () => `\
.box4, .box5 {
  width: 528px;
}
`,
      0.75
    ),
    rect4().width(spaceX["5.5"], 0.75),
    rect5().width(spaceX["5.5"], 0.75)
  );
  yield* waitUntil("andHeight");
  yield* all(
    code().code.insert(
      [5, 0],
      `\
  height: 180px;
`,
      0.75
    ),
    rect4().height(spaceY[2], 0.75),
    rect5().height(spaceY[2], 0.75)
  );
  yield* waitUntil("thisMeans");
  yield* all(
    rect4().width(rect3().width(), 0.75),
    rect5().width(rect3().width(), 0.75),
    rect4().height(rect3().height(), 0.75),
    rect5().height(rect3().height(), 0.75)
  );
  yield* all(
    code().code.replace(
      lines(4, 5),
      `\
  padding: 48px;
`,
      0.75
    ),
    rect1().padding(48, 0.75),
    rect2().padding(48, 0.75)
  );
  yield* all(
    code().code.insert(
      [5, 0],
      `\
  margin: 48px;
`,
      0.75
    ),
    rect1().margin(48, 0.75),
    rect2().margin(48, 0.75)
  );
  yield* all(
    code().code.insert(
      [6, 0],
      `\
  border: 16px solid;
`,
      0.75
    ),
    rect1().lineWidth(16, 0.75),
    rect2().lineWidth(16, 0.75),
    rect1().margin([64, 48, 64, 48], 0.75),
    rect2().margin([64, 48, 64, 48], 0.75)
  );
  yield* waitUntil("scene13End");
});
