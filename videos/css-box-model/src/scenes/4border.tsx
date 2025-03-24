import { Code, Layout, lines, makeScene2D, Ray, Rect } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { CSSCode, Grid } from "../nodes";
import {
  all,
  createRef,
  Direction,
  sequence,
  slideTransition,
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
  const borderTxt = createRef<ExtendedTxt>();
  const contentTxt = createRef<ExtendedTxt>();
  const paddingBG = createRef<Rect>();
  const borderBG = createRef<Rect>();
  const code = createRef<Code>();

  view.add(
    <>
      <ExtendedTxt
        ref={borderTxt}
        text={"Border"}
        y={spaceNY["4.5"]}
        fontSize={spaceY["0.67"]}
        fontWeight={600}
      />
      <Rect
        ref={borderBG}
        fill={colors.emerald[300]}
        padding={6}
        position={[spaceNX[5], spaceY["1.5"]]}
        layout
        opacity={0}
      >
        <Rect
          ref={paddingBG}
          fill={colors.emerald[300]}
          stroke={colors.emerald[800]}
          lineDash={[0, 0]}
          lineWidth={0}
          padding={200}
        >
          <ExtendedTxt
            ref={contentTxt}
            text={"Content"}
            fill={colors.slate[950]}
            fontSize={spaceY["0.5"]}
            fontWeight={500}
          />
        </Rect>
      </Rect>
      <CSSCode
        ref={code}
        x={spaceX[4]}
        y={spaceY[1]}
        fontSize={spaceY["0.5"]}
        opacity={0}
        code={() => `\
.box {
}
`}
      />
    </>
  );
  yield* slideTransition(Direction.Bottom, 0.75);
  yield* waitUntil("box");
  yield* all(borderBG().opacity(1, 0.75), borderBG().y(spaceY["0.5"], 0.75));
  yield* code().opacity(1, 0.75);
  yield* waitUntil("borderWidth");
  yield* code().code.insert(
    [1, 0],
    `\
  border-width: 6px;
`,
    0.75
  );
  yield* code().code.insert(
    [2, 0],
    `\
  border-style: solid;
`,
    0.75
  );
  yield* all(
    code().code.insert(
      [3, 0],
      `\
  border-color: #065f46;
`,
      0.75
    ),
    paddingBG().lineWidth(12, 0.75)
  );
  yield* waitUntil("setOnce");
  yield* code().code.replace(
    lines(1, 3),
    `\
  border: 6px solid #065f46;
`,
    0.75
  );
  yield* waitUntil("specificSides");
  yield* all(paddingBG().lineWidth(0, 0.75));
  const lbRay = createRef<Ray>();
  const tbRay = createRef<Ray>();
  const bbRay = createRef<Ray>();
  view.add(
    <>
      <Ray
        ref={lbRay}
        fromY={borderBG().top().y}
        toY={borderBG().bottom().y}
        lineWidth={0}
        stroke={colors.rose[700]}
        x={borderBG().left().x + 8}
        lineCap={"round"}
        lineDash={[1, 30]}
        startOffset={12}
        endOffset={12}
      />
      <Ray
        ref={tbRay}
        fromX={borderBG().left().x}
        toX={borderBG().right().x}
        lineWidth={0}
        stroke={colors.sky[700]}
        startOffset={16}
        y={borderBG().top().y + 6}
      />
      <Ray
        ref={bbRay}
        fromX={borderBG().left().x}
        toX={borderBG().right().x}
        lineWidth={0}
        stroke={colors.fuchsia[700]}
        y={borderBG().bottom().y - 4}
        lineCap={"square"}
        startOffset={8}
        lineDash={[20, 30]}
      />
    </>
  );
  yield* all(
    code().code.replace(
      lines(1),
      `\
  border-left: 8px dotted #be123c;
`,
      0.75
    ),
    lbRay().lineWidth(16, 0.75)
  );
  yield* all(
    code().code.insert(
      [2, 0],
      `\
  border-right: none;
`,
      0.75
    )
  );
  yield* all(
    code().code.insert(
      [3, 0],
      `\
  border-top: 6px solid #0369a1;
`,
      0.75
    ),
    tbRay().lineWidth(12, 0.75)
  );
  yield* all(
    code().code.insert(
      [4, 0],
      `\
  border-bottom: 4px dashed #a21caf;
`,
      0.75
    ),
    bbRay().lineWidth(8, 0.75)
  );

  const widthTop = createRef<ExtendedTxt>();
  const widthRight = createRef<ExtendedTxt>();
  const widthBottom = createRef<ExtendedTxt>();
  const widthLeft = createRef<ExtendedTxt>();

  const styleTop = createRef<ExtendedTxt>();
  const styleRight = createRef<ExtendedTxt>();
  const styleBottom = createRef<ExtendedTxt>();
  const styleLeft = createRef<ExtendedTxt>();

  const colorTop = createRef<ExtendedTxt>();
  const colorRight = createRef<ExtendedTxt>();
  const colorBottom = createRef<ExtendedTxt>();
  const colorLeft = createRef<ExtendedTxt>();

  view.add(
    <Layout gap={spaceX[2]} direction="row" layout y={spaceY[0.5]}>
      <Layout gap={spaceY[1]} direction="column" layout>
        <ExtendedTxt
          ref={widthTop}
          text="border-top-width"
          opacity={0}
          fontSize={spaceY["0.5"]}
        />
        <ExtendedTxt
          ref={widthRight}
          text="border-right-width"
          opacity={0}
          fontSize={spaceY["0.5"]}
        />
        <ExtendedTxt
          ref={widthBottom}
          text="border-bottom-width"
          opacity={0}
          fontSize={spaceY["0.5"]}
        />
        <ExtendedTxt
          ref={widthLeft}
          text="border-left-width"
          opacity={0}
          fontSize={spaceY["0.5"]}
        />
      </Layout>
      <Layout gap={spaceY[1]} direction="column" layout>
        <ExtendedTxt
          ref={styleTop}
          text="border-top-style"
          opacity={0}
          fontSize={spaceY["0.5"]}
        />
        <ExtendedTxt
          ref={styleRight}
          text="border-right-style"
          opacity={0}
          fontSize={spaceY["0.5"]}
        />
        <ExtendedTxt
          ref={styleBottom}
          text="border-bottom-style"
          opacity={0}
          fontSize={spaceY["0.5"]}
        />
        <ExtendedTxt
          ref={styleLeft}
          text="border-left-style"
          opacity={0}
          fontSize={spaceY["0.5"]}
        />
      </Layout>
      <Layout gap={spaceY[1]} direction="column" layout>
        <ExtendedTxt
          ref={colorTop}
          text="border-top-color"
          opacity={0}
          fontSize={spaceY["0.5"]}
        />
        <ExtendedTxt
          ref={colorRight}
          text="border-right-color"
          opacity={0}
          fontSize={spaceY["0.5"]}
        />
        <ExtendedTxt
          ref={colorBottom}
          text="border-bottom-color"
          opacity={0}
          fontSize={spaceY["0.5"]}
        />
        <ExtendedTxt
          ref={colorLeft}
          text="border-left-color"
          opacity={0}
          fontSize={spaceY["0.5"]}
        />
      </Layout>
    </Layout>
  );

  yield* waitUntil("adjustWidth");

  yield* all(
    borderBG().opacity(0, 0.75),
    lbRay().opacity(0, 0.75),
    tbRay().opacity(0, 0.75),
    bbRay().opacity(0, 0.75),
    code().opacity(0, 0.75)
  );

  yield* sequence(
    0.15,
    widthTop().opacity(1, 0.5),
    widthRight().opacity(1, 0.5),
    widthBottom().opacity(1, 0.5),
    widthLeft().opacity(1, 0.5)
  );

  yield* sequence(
    0.15,
    styleTop().opacity(1, 0.5),
    styleRight().opacity(1, 0.5),
    styleBottom().opacity(1, 0.5),
    styleLeft().opacity(1, 0.5)
  );

  yield* sequence(
    0.15,
    colorTop().opacity(1, 0.5),
    colorRight().opacity(1, 0.5),
    colorBottom().opacity(1, 0.5),
    colorLeft().opacity(1, 0.5)
  );

  yield* waitUntil("scene4End");
});
