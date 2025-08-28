import { Code, Layout, lines, makeScene2D, Ray, Rect } from "@motion-canvas/2d";
import {
  all,
  Color,
  createRef,
  delay,
  Direction,
  slideTransition,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import colors from "../lib/colors";
import { CSSCode, ExtendedRect, Grid, Window } from "../nodes";
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
  const window = createRef<Window>();
  const container = createRef<Rect>();
  const box1 = createRef<ExtendedRect>();
  const box2 = createRef<ExtendedRect>();
  const box3 = createRef<ExtendedRect>();
  const box4 = createRef<ExtendedRect>();
  const text1 = createRef<ExtendedTxt>();
  const text2 = createRef<ExtendedTxt>();
  const text3 = createRef<ExtendedTxt>();
  const text4 = createRef<ExtendedTxt>();
  const code = createRef<Code>();
  view.add(
    <>
      <Window
        ref={window}
        width={spaceX[10]}
        height={spaceY[8]}
        fill={colors.slate[0]}
        x={spaceNX[4]}
      >
        <Rect
          ref={container}
          width={"80%"}
          stroke={colors.violet[500]}
          lineWidth={4}
          radius={12}
          padding={[spaceX["0.25"], 6]}
          gap={8}
          opacity={0}
        >
          <ExtendedRect
            ref={box1}
            width={"25%"}
            height={spaceY[2]}
            padding={20}
            highlighted
            layout
            alignItems={"center"}
            justifyContent={"center"}
            lineWidth={8}
            color={"green"}
            opacity={0}
          >
            <ExtendedTxt
              ref={text1}
              fontSize={spaceY[0.5]}
              fontWeight={600}
              text={"1"}
            />
          </ExtendedRect>
          <ExtendedRect
            ref={box2}
            width={"25%"}
            height={spaceY[2]}
            padding={20}
            highlighted
            layout
            alignItems={"center"}
            justifyContent={"center"}
            lineWidth={8}
            color={"green"}
            opacity={0}
          >
            <ExtendedTxt
              ref={text2}
              fontSize={spaceY[0.5]}
              fontWeight={600}
              text={"2"}
            />
          </ExtendedRect>
          <ExtendedRect
            ref={box3}
            width={"25%"}
            height={spaceY[2]}
            padding={20}
            highlighted
            layout
            alignItems={"center"}
            justifyContent={"center"}
            lineWidth={8}
            color={"green"}
            opacity={0}
          >
            <ExtendedTxt
              ref={text3}
              fontSize={spaceY[0.5]}
              fontWeight={600}
              text={"3"}
            />
          </ExtendedRect>
          <ExtendedRect
            ref={box4}
            width={"25%"}
            height={spaceY[2]}
            padding={20}
            highlighted
            layout
            alignItems={"center"}
            justifyContent={"center"}
            lineWidth={8}
            color={"green"}
            opacity={0}
          >
            <ExtendedTxt
              ref={text4}
              fontSize={spaceY[0.5]}
              fontWeight={600}
              text={"4"}
            />
          </ExtendedRect>
        </Rect>
      </Window>
      <CSSCode
        ref={code}
        x={spaceX[5]}
        code={`
.container {
}
`}
        opacity={0}
      />
    </>
  );
  text1().fill(colors[box1().colorSignal()][500]);
  text2().fill(colors[box2().colorSignal()][500]);
  text3().fill(colors[box3().colorSignal()][500]);
  text4().fill(colors[box4().colorSignal()][500]);
  yield* slideTransition(Direction.Right, 0.75);
  yield* container().opacity(1, 0.75);
  yield* all(
    box1().opacity(1, 0.75),
    delay(0.2, box2().opacity(1, 0.75)),
    delay(0.4, box3().opacity(1, 0.75)),
    delay(0.6, box4().opacity(1, 0.75)),
    delay(0.8, code().opacity(1, 0.75))
  );
  yield* waitUntil("100%OfContainerWidth");
  yield* all(
    container().width("100%", 0.75),
    code().code.insert(
      [2, 0],
      `\
  width: 100%;
`,
      0.75
    )
  );
  yield* waitUntil("eachBox");
  yield* all(
    code().code.insert(
      [4, 0],
      `\
.box {
}
`,
      0.75
    )
  );
  yield* waitUntil("padding");
  yield* all(
    code().code.insert(
      [5, 0],
      `\
  padding: 10px;
`,
      0.75
    )
  );
  yield* waitUntil("border");
  yield* all(
    code().code.insert(
      [6, 0],
      `\
  border: 4px solid green;
`,
      0.75
    )
  );
  yield* waitUntil("width");
  yield* all(
    code().code.insert(
      [7, 0],
      `\
  width: 25%;
`,
      0.75
    )
  );

  yield* waitUntil("4times25");
  const ray1 = createRef<Ray>();
  const ray2 = createRef<Ray>();
  const ray3 = createRef<Ray>();
  const ray4 = createRef<Ray>();
  const wrapCorr = createRef<ExtendedTxt>();
  view.add(
    <>
      <Ray
        ref={ray1}
        fromX={() => window().left().x + spaceX["0.25"] + 4}
        toX={() => window().left().x + spaceX["0.25"] + 8 + box1().width()}
        y={spaceNY[0.5]}
        stroke={colors[box1().colorSignal()][500]}
        startArrow
        endArrow
        arrowSize={8}
        lineWidth={4}
        lineDash={[4, 10]}
        lineCap={"round"}
        layout
        justifyContent={"center"}
        opacity={0}
        start={0.5}
        end={0.5}
      >
        <ExtendedTxt
          text={"25%"}
          fill={colors[box1().colorSignal()][500]}
          marginTop={spaceY["0.25"] / 2}
        />
      </Ray>
      <Ray
        ref={ray2}
        fromX={() => ray1().to().x}
        toX={() =>
          window().left().x + spaceX["0.25"] + +(8 + box1().width()) * 2
        }
        y={spaceNY["0.5"]}
        stroke={colors[box2().colorSignal()][500]}
        startArrow
        endArrow
        arrowSize={8}
        lineWidth={4}
        lineDash={[4, 10]}
        lineCap={"round"}
        layout
        justifyContent={"center"}
        opacity={0}
        start={0.5}
        end={0.5}
      >
        <ExtendedTxt
          text={"25%"}
          fill={colors[box2().colorSignal()][500]}
          marginTop={spaceY["0.25"] / 2}
        />
      </Ray>
      <Ray
        ref={ray3}
        fromX={() => ray2().to().x}
        toX={() =>
          window().left().x + spaceX["0.25"] + +(8 + box1().width()) * 3
        }
        y={spaceNY["0.5"]}
        stroke={colors[box3().colorSignal()][500]}
        startArrow
        endArrow
        arrowSize={8}
        lineWidth={4}
        lineDash={[4, 10]}
        lineCap={"round"}
        layout
        justifyContent={"center"}
        opacity={0}
        start={0.5}
        end={0.5}
      >
        <ExtendedTxt
          text={"25%"}
          fill={colors[box3().colorSignal()][500]}
          marginTop={spaceY["0.25"] / 2}
        />
      </Ray>
      <Ray
        ref={ray4}
        fromX={() => ray3().to().x}
        toX={() =>
          window().left().x + spaceX["0.25"] + +(8 + box1().width()) * 4
        }
        y={spaceNY["0.5"]}
        stroke={colors[box4().colorSignal()][500]}
        startArrow
        endArrow
        arrowSize={8}
        lineWidth={4}
        lineDash={[4, 10]}
        lineCap={"round"}
        layout
        justifyContent={"center"}
        opacity={0}
        start={0.5}
        end={0.5}
      >
        <ExtendedTxt
          text={"25%"}
          fill={colors[box4().colorSignal()][500]}
          marginTop={spaceY["0.25"] / 2}
        />
      </Ray>
      <ExtendedTxt
        ref={wrapCorr}
        text={"*wrap"}
        opacity={0}
        fill={colors.slate[950]}
        y={spaceY[3]}
      />
    </>
  );
  yield* all(
    ray1().opacity(1, 0.75),
    ray1().start(0, 0.75),
    ray1().end(1, 0.75),
    delay(0.2, ray2().opacity(1, 0.75)),
    delay(0.2, ray2().start(0, 0.75)),
    delay(0.2, ray2().end(1, 0.75)),
    delay(0.4, ray3().opacity(1, 0.75)),
    delay(0.4, ray3().start(0, 0.75)),
    delay(0.4, ray3().end(1, 0.75)),
    delay(0.6, ray4().opacity(1, 0.75)),
    delay(0.6, ray4().start(0, 0.75)),
    delay(0.6, ray4().end(1, 0.75))
  );
  yield* waitUntil("butTheyDont");
  yield* all(
    ray1().opacity(0, 0.75),
    ray1().start(0.5, 0.75),
    ray1().end(0.5, 0.75),
    ray2().opacity(0, 0.75),
    ray2().start(0.5, 0.75),
    ray2().end(0.5, 0.75),
    ray3().opacity(0, 0.75),
    ray3().start(0.5, 0.75),
    ray3().end(0.5, 0.75),
    ray4().opacity(0, 0.75),
    ray4().start(0.5, 0.75),
    ray4().end(0.5, 0.75)
  );
  yield* waitUntil("breakOurLayout");
  yield* all(
    container().wrap("wrap", 0.75),
    container().height(spaceY[4.5] + 16, 0.75),
    wrapCorr().opacity(1, 0.75)
  );
  yield* waitUntil("whyThisHappens");
  const whyThisHappens = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={whyThisHappens}
        fontSize={spaceY[0.75]}
        fontWeight={600}
        y={spaceY["4.5"]}
      />
    </>
  );

  yield* all(
    wrapCorr().opacity(0, 0.75),
    window().y(spaceNY[1], 0.75),
    whyThisHappens().text("Why does this happen?🤔", 1.25),
    code().y(spaceNY[1], 0.75)
  );

  yield* waitUntil("contentBox");
  yield* all(
    whyThisHappens().text("", 1).to("box-sizing: content-box", 1.25),
    whyThisHappens().opacity(0, 0.5).wait(0.5).back(0.5)
  );

  yield* waitUntil("thisMeans");
  const contentTxt = createRef<ExtendedTxt>();
  const contentBG = createRef<Rect>();
  const paddingBG = createRef<Rect>();
  const contentLegend = createRef<Rect>();
  const paddingLegend = createRef<Rect>();
  const borderLegend = createRef<Rect>();
  const contentRay = createRef<Ray>();
  const leftPaddingRay = createRef<Ray>();
  const leftBorderRay = createRef<Ray>();
  const rightPaddingRay = createRef<Ray>();
  const rightBorderRay = createRef<Ray>();
  const contentRayTxt = createRef<ExtendedTxt>();
  const legends = createRef<Layout>();
  view.add(
    <>
      <Rect
        ref={paddingBG}
        layout
        padding={100}
        fill={new Color(colors.cyan[700]).alpha(0.3)}
        stroke={colors.cyan[600]}
        lineWidth={24}
        opacity={0}
        x={spaceNX[3]}
      >
        <Rect
          ref={contentBG}
          fill={colors.cyan[300]}
          padding={[0, spaceX[0.25]]}
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
      <Layout
        ref={legends}
        layout
        direction={"row"}
        gap={spaceY[3.25]}
        y={spaceY[4.5]}
      >
        <Rect
          ref={contentLegend}
          width={spaceX[0.5]}
          height={spaceY[0.5]}
          fill={colors.cyan[300]}
          radius={12}
          opacity={0}
        >
          <ExtendedTxt
            text={"content-box"}
            marginLeft={spaceX["0.75"]}
            textAlign={"left"}
          />
        </Rect>
        <Rect
          ref={paddingLegend}
          width={spaceX[0.5]}
          height={spaceY[0.5]}
          fill={new Color(colors.cyan[700]).alpha(0.3)}
          radius={12}
          opacity={0}
        >
          <ExtendedTxt
            text={"padding"}
            marginLeft={spaceX["0.75"]}
            textAlign={"left"}
          />
        </Rect>
        <Rect
          ref={borderLegend}
          width={spaceX[0.5]}
          height={spaceY[0.5]}
          fill={colors.cyan[600]}
          radius={12}
          opacity={0}
        >
          <ExtendedTxt
            text={"border"}
            marginLeft={spaceX["0.75"]}
            textAlign={"left"}
          />
        </Rect>
      </Layout>
      <Ray
        ref={contentRay}
        fromX={() => contentBG().left().x + paddingBG().position().x}
        toX={() => contentBG().right().x + paddingBG().position().x}
        y={spaceY["1.5"]}
        stroke={colors.slate[0]}
        startArrow
        endArrow
        arrowSize={8}
        lineWidth={4}
        lineDash={[4, 10]}
        lineCap={"round"}
        layout
        justifyContent={"center"}
        opacity={0}
        start={0.5}
        end={0.5}
      >
        <ExtendedTxt
          ref={contentRayTxt}
          text={() => `${contentBG().padding().x.toFixed(0)}px`}
          fill={colors.slate[0]}
          marginTop={spaceY["0.25"] / 2}
        />
      </Ray>
      <Ray
        ref={leftPaddingRay}
        fromX={() => contentRay().from().x}
        toX={() => paddingBG().left().x + 12}
        y={spaceY["1.5"]}
        stroke={colors.slate[0]}
        startArrow
        endArrow
        arrowSize={8}
        lineWidth={4}
        lineDash={[4, 10]}
        lineCap={"round"}
        layout
        justifyContent={"center"}
        opacity={0}
        start={0.5}
        end={0.5}
      >
        <ExtendedTxt
          text={"10px"}
          fill={colors.slate[0]}
          marginTop={spaceY["0.25"] / 2}
        />
      </Ray>
      <Ray
        ref={leftBorderRay}
        fromX={() => leftPaddingRay().to().x}
        toX={() => leftPaddingRay().to().x - 24}
        y={spaceY["1.5"]}
        stroke={colors.slate[0]}
        startArrow
        endArrow
        arrowSize={8}
        lineWidth={4}
        lineDash={[4, 10]}
        lineCap={"round"}
        layout
        justifyContent={"center"}
        opacity={0}
        start={0.5}
        end={0.5}
      >
        <ExtendedTxt
          text={"4px"}
          fill={colors.slate[0]}
          marginTop={spaceNY["1.25"] / 2}
        />
      </Ray>
      <Ray
        ref={rightPaddingRay}
        fromX={() => contentRay().to().x}
        toX={() => paddingBG().right().x - 16}
        y={spaceY["1.5"]}
        stroke={colors.slate[0]}
        startArrow
        endArrow
        arrowSize={8}
        lineWidth={4}
        lineDash={[4, 10]}
        lineCap={"round"}
        layout
        justifyContent={"center"}
        opacity={0}
        start={0.5}
        end={0.5}
      >
        <ExtendedTxt
          text={"10px"}
          fill={colors.slate[0]}
          marginTop={spaceY["0.25"] / 2}
        />
      </Ray>
      <Ray
        ref={rightBorderRay}
        fromX={() => rightPaddingRay().to().x}
        toX={() => rightPaddingRay().to().x + 24}
        y={spaceY["1.5"]}
        stroke={colors.slate[0]}
        startArrow
        endArrow
        arrowSize={8}
        lineWidth={4}
        lineDash={[4, 10]}
        lineCap={"round"}
        layout
        justifyContent={"center"}
        opacity={0}
        start={0.5}
        end={0.5}
      >
        <ExtendedTxt
          text={"4px"}
          fill={colors.slate[0]}
          marginTop={spaceNY["1.25"] / 2}
        />
      </Ray>
    </>
  );

  yield* all(
    window().opacity(0, 0.5),
    whyThisHappens().y(spaceNY["4.5"], 0.75),
    code().y(spaceNY["0.5"], 0.5),
    code().code.replace(
      lines(0, 8),
      `\
.box {
}
`,
      0.5
    ),
    paddingBG().opacity(1, 0.75),
    paddingBG().y(spaceNY[1], 0.75),
    contentLegend().opacity(1, 0.5),
    delay(0.2, paddingLegend().opacity(1, 0.5)),
    delay(0.2, borderLegend().opacity(1, 0.5))
  );
  yield* all(
    code().code.insert(
      [1, 0],
      () => `\
  width: ${contentBG().padding().x.toFixed(0)}px;
`,
      0.5
    ),
    contentRay().opacity(1, 0.75),
    contentRay().start(0, 0.75),
    contentRay().end(1, 0.75)
  );
  yield* all(
    contentBG().padding([0, spaceX[2]], 2).back(2).to([0, spaceX[1]], 2)
  );
  yield* waitUntil("soInEx");
  yield* all(
    contentRay().opacity(0, 0.75),
    contentRay().start(0.5, 0.75),
    contentRay().end(0.5, 0.75),
    code().opacity(0, 0.75),
    code().y(spaceY["1.5"], 0.75),
    paddingBG().x(0, 0.75)
  );
  yield* waitUntil("leftPadding");
  yield* all(
    leftPaddingRay().opacity(1, 0.75),
    leftPaddingRay().start(0, 0.75),
    leftPaddingRay().end(1, 0.75)
  );
  yield* all(
    leftBorderRay().opacity(1, 0.75),
    leftBorderRay().start(0, 0.75),
    leftBorderRay().end(1, 0.75)
  );
  contentRayTxt().text("25%");
  yield* all(
    contentRay().opacity(1, 1.5),
    contentRay().start(0, 1.5),
    contentRay().end(1, 1.5)
  );
  yield* waitUntil("rightBorder");
  yield* all(
    rightBorderRay().opacity(1, 0.75),
    rightBorderRay().start(0, 0.75),
    rightBorderRay().end(1, 0.75)
  );
  yield* all(
    rightPaddingRay().opacity(1, 0.75),
    rightPaddingRay().start(0, 0.75),
    rightPaddingRay().end(1, 0.75)
  );
  yield* waitUntil("moreThan25");
  const totalWidth = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt ref={totalWidth} y={spaceY[4]} fontSize={spaceY["0.5"]} />
    </>
  );
  yield* all(
    legends().opacity(0, 0.75),
    legends().y(spaceY["5.5"], 0.75),
    totalWidth().text("25% + 28px", 1.25)
  );
  yield* waitUntil("our4Boxes");
  window().position(0);
  window().height(spaceY[6]);
  container().wrap("nowrap");
  container().height(spaceY["4.5"] / 2 + 8);
  yield* all(
    window().opacity(1, 0.75),
    paddingBG().scale(0, 0.5),
    contentRay().opacity(0, 0.75),
    contentRay().start(0.5, 0.75),
    contentRay().end(0.5, 0.75),
    leftBorderRay().opacity(0, 0.75),
    leftBorderRay().start(0.5, 0.75),
    leftBorderRay().end(0.5, 0.75),
    leftPaddingRay().opacity(0, 0.75),
    leftPaddingRay().start(0.5, 0.75),
    leftPaddingRay().end(0.5, 0.75),
    rightBorderRay().opacity(0, 0.75),
    rightBorderRay().start(0.5, 0.75),
    rightBorderRay().end(0.5, 0.75),
    rightPaddingRay().opacity(0, 0.75),
    rightPaddingRay().start(0.5, 0.75),
    rightPaddingRay().end(0.5, 0.75),
    totalWidth().text("", 0.75),
    totalWidth().opacity(0, 0.5)
  );
  totalWidth().opacity(1);
  yield* all(
    container().wrap("wrap", 0.75),
    container().height(spaceY[4.5] + 16, 0.75)
  );
  yield* totalWidth().text("100% + 112px", 1.25);
  yield* waitUntil("scene8End");
});
