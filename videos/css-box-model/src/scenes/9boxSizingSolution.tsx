import {
  Code,
  Img,
  Layout,
  lines,
  makeScene2D,
  Ray,
  Rect,
  word,
} from "@motion-canvas/2d";
import colors from "../lib/colors";
import { CSSCode, ExtendedRect, Grid, Window } from "../nodes";
import {
  all,
  Color,
  createRef,
  createSignal,
  DEFAULT,
  delay,
  Direction,
  slideTransition,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import tweetSS from "../images/tweetFeb1st.png";

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  // view.add(
  //   <>
  //     <Grid />
  //   </>
  // );
  const boxSizingTitle = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={boxSizingTitle}
        fontSize={spaceY[1]}
        fontWeight={600}
        text={"box-sizing"}
      />
    </>
  );
  yield* slideTransition(Direction.Right, 0.75);
  yield* waitUntil("contentBox");
  yield* boxSizingTitle().text("box-sizing: content-box", 1);

  yield* waitUntil("ifWeSet");
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
  const code = createRef<Code>();

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
      <CSSCode
        ref={code}
        x={spaceX[5]}
        y={spaceNY["1"]}
        code={`\
.box {
}
`}
        opacity={0}
      />
      <Layout
        ref={legends}
        layout
        direction={"row"}
        gap={spaceY[3.25]}
        y={spaceY[4.5]}
        opacity={0}
      >
        <Rect
          ref={contentLegend}
          width={spaceX[0.5]}
          height={spaceY[0.5]}
          fill={colors.cyan[300]}
          radius={12}
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
    boxSizingTitle().fontSize(spaceY["0.5"], 0.75),
    boxSizingTitle().y(spaceNY["4.5"], 0.75),
    paddingBG().opacity(1, 0.75),
    paddingBG().y(spaceNY[1], 0.75),
    code().opacity(1, 0.75),
    legends().opacity(1, 0.75)
  );
  yield* waitUntil("100px");
  yield* all(
    code().code.insert(
      [1, 0],
      () => `\
  width: 100px;
`,
      0.75
    )
  );
  yield* waitUntil("contentBoxWide");
  contentRayTxt().text(
    () => `${(Number(contentBG().padding().x) / 2).toFixed(0)}px`
  );
  yield* all(
    contentBG().padding([0, 100], 2),
    contentRay().opacity(1, 0.75),
    contentRay().start(0, 0.75),
    contentRay().end(1, 0.75)
  );
  yield* waitUntil("padding");
  yield* all(
    leftPaddingRay().opacity(1, 0.75),
    leftPaddingRay().start(0, 0.75),
    leftPaddingRay().end(1, 0.75),
    rightPaddingRay().opacity(1, 0.75),
    rightPaddingRay().start(0, 0.75),
    rightPaddingRay().end(1, 0.75)
  );
  yield* all(
    leftBorderRay().opacity(1, 0.75),
    leftBorderRay().start(0, 0.75),
    leftBorderRay().end(1, 0.75),
    rightBorderRay().opacity(1, 0.75),
    rightBorderRay().start(0, 0.75),
    rightBorderRay().end(1, 0.75)
  );
  yield* waitUntil("setBoxSizing");
  yield* all(
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
    rightPaddingRay().end(0.5, 0.75)
  );
  yield* all(
    boxSizingTitle()
      .text("box-sizing: ", 0.5)
      .to("box-sizing: border-box;", 0.75),
    code().code.replace(
      lines(1),
      `\
    box-sizing: border-box;
`,
      1.75
    )
  );
  contentRayTxt().text("");
  contentRay().from(() => [paddingBG().left().x - 12, 0]);
  contentRay().to(() => [paddingBG().right().x + 12, 0]);
  yield* all(
    contentRay().opacity(1, 0.5),
    contentRay().start(0, 3),
    contentRay().end(1, 3),
    code().code.insert(
      [2, 0],
      `\
    width: 192px;
`,
      0.75
    ),
    contentRayTxt().text("192px", 0.75)
  );
  yield* waitUntil("setWidth100");
  yield* code().code.replace(word(2, 11, 6), `100px;`, 0.75);
  const widthSignal = createSignal(192);
  contentRayTxt().text(() => `${widthSignal().toFixed(0)}px`);
  yield* all(contentBG().padding([0, 15], 3), widthSignal(100, 3));

  yield* waitUntil("thisMakesLayout");
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
  const ray1 = createRef<Ray>();
  const ray2 = createRef<Ray>();
  const ray3 = createRef<Ray>();
  const ray4 = createRef<Ray>();
  const setGetTxt = createRef<ExtendedTxt>();
  view.add(
    <>
      <Window
        ref={window}
        width={spaceX[10]}
        height={spaceY[6]}
        fill={colors.slate[0]}
        x={spaceNX[4]}
        opacity={0}
      >
        <Rect
          ref={container}
          width={"80%"}
          stroke={colors.violet[500]}
          lineWidth={4}
          radius={12}
          padding={[spaceX["0.25"], 6]}
          gap={8}
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
      <Ray
        ref={ray1}
        fromX={() => window().left().x + spaceX["0.25"] + 4}
        toX={() => window().left().x + spaceX["0.25"] + 8 + box1().width()}
        y={spaceY["0.5"]}
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
        y={spaceY["0.5"]}
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
        y={spaceY["0.5"]}
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
        y={spaceY["0.5"]}
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
        ref={setGetTxt}
        fontSize={spaceY[0.5]}
        fontWeight={600}
        y={spaceY["4.5"]}
      />
    </>
  );
  text1().fill(colors[box1().colorSignal()][500]);
  text2().fill(colors[box2().colorSignal()][500]);
  text3().fill(colors[box3().colorSignal()][500]);
  text4().fill(colors[box4().colorSignal()][500]);
  yield* all(
    window().opacity(1, 0.75),
    paddingBG().opacity(0, 0.75),
    contentRay().opacity(0, 0.75),
    contentRay().start(0.5, 0.75),
    contentRay().end(0.5, 0.75),
    legends().opacity(0, 0.75),
    code().y(0, 0.75),
    code().code.replace(word(2, 11, 6), `25%;`, 0.75)
  );
  yield* waitUntil("setGet");
  yield* all(
    ray1().opacity(1, 0.75),
    ray1().start(0, 0.75),
    ray1().end(1, 0.75),
    delay(0.4, ray2().opacity(1, 0.75)),
    delay(0.4, ray2().start(0, 0.75)),
    delay(0.4, ray2().end(1, 0.75)),
    delay(0.8, ray3().opacity(1, 0.75)),
    delay(0.8, ray3().start(0, 0.75)),
    delay(0.8, ray3().end(1, 0.75)),
    delay(1.2, ray4().opacity(1, 0.75)),
    delay(1.2, ray4().start(0, 0.75)),
    delay(1.2, ray4().end(1, 0.75)),
    setGetTxt().text("What you set is what you get!✨", 1.75)
  );
  yield* waitUntil("reset");
  yield* code().selection(lines(1), 0.75);
  yield* waitUntil("feb1st");
  const tweetImg = createRef<Img>();
  view.add(
    <>
      <Img
        ref={tweetImg}
        src={tweetSS}
        radius={32}
        stroke={colors.lime[500]}
        lineWidth={4}
        opacity={0}
        y={spaceY[1]}
        height={spaceY[5]}
      />
    </>
  );
  yield* all(
    boxSizingTitle().opacity(0, 0.75),
    delay(1, tweetImg().opacity(1, 0.75)),
    delay(1, tweetImg().y(0, 0.75)),
    window().opacity(0, 0.75),
    code().opacity(0, 0.75),
    setGetTxt().opacity(0, 0.75),
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
  yield* waitUntil("codeBB");
  code().position([0, spaceY[1]]);
  code().code(
    `\
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
`
  );
  code().selection(DEFAULT);
  code().fontSize(spaceY["0.5"]);
  yield* all(
    code().opacity(1, 0.75),
    code().y(0, 0.75),
    tweetImg().opacity(0, 0.75)
  );
  yield* waitUntil("scene9End");
});
