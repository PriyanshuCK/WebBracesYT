import { Layout, makeScene2D, Node } from "@motion-canvas/2d";
import colors, { getRandomColor } from "../lib/colors";
import { ExtendedRect, Grid } from "../nodes";
import {
  all,
  createRef,
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
  view.add(
    <>
      <Grid />
    </>
  );
  const displayTxt = createRef<ExtendedTxt>();
  const blockTxt = createRef<ExtendedTxt>();
  const inlineTxt = createRef<ExtendedTxt>();
  const inlineBlockTxt = createRef<ExtendedTxt>();
  const txtNode = createRef<Node>();
  view.add(
    <>
      <ExtendedTxt
        ref={displayTxt}
        fontSize={spaceY["0.75"]}
        fontWeight={600}
      />
      <Node ref={txtNode}>
        <ExtendedTxt
          ref={blockTxt}
          text={"block"}
          fontSize={spaceY["0.5"]}
          fontWeight={500}
          opacity={0}
          x={spaceNX[3]}
          fill={getRandomColor("500")}
        />
        <ExtendedTxt
          ref={inlineBlockTxt}
          text={"inline-block"}
          fontSize={spaceY["0.5"]}
          fontWeight={500}
          opacity={0}
          x={spaceX[3.75]}
          fill={getRandomColor("500")}
        />
        <ExtendedTxt
          ref={inlineTxt}
          text={"inline"}
          fontSize={spaceY["0.5"]}
          fontWeight={500}
          opacity={0}
          fill={getRandomColor("500")}
        />{" "}
      </Node>
    </>
  );
  yield* slideTransition(Direction.Right, 0.75);
  yield* waitUntil("block");
  yield* blockTxt().opacity(1, 0.75);
  yield* inlineTxt().opacity(1, 0.75);
  yield* inlineBlockTxt().opacity(1, 0.75);
  yield* waitUntil("areActually");
  yield* all(txtNode().y(spaceY[1], 0.75), txtNode().scale(0.75, 0.75));
  yield* all(
    txtNode().scale(0, 0.75),
    txtNode().y(0, 0.75),
    displayTxt().text("Outer Display Types", 1)
  );
  yield* waitUntil("innerDisplay");
  yield* displayTxt().text("", 0.75).to("Inner Display Types", 1);
  yield* waitUntil("outerDisplay");
  yield* all(
    displayTxt().text("", 0.75).to("Outer Display Types", 0.75),
    displayTxt().y(spaceNY["4.5"], 0.75),
    displayTxt().fontSize(spaceY[0.5], 0.75)
  );
  yield* waitUntil("howTheBox");
  const layout = createRef<Layout>();
  const box1 = createRef<ExtendedRect>();
  const box2 = createRef<ExtendedRect>();
  const box3 = createRef<ExtendedRect>();
  view.add(
    <>
      <Layout
        ref={layout}
        layout
        width={spaceX[10]}
        direction={"column"}
        gap={spaceY["0.5"]}
        opacity={0}
        y={spaceY["0.5"]}
      >
        <ExtendedRect
          ref={box1}
          width={"100%"}
          height={spaceY[1.5]}
          highlighted
        />
        <ExtendedRect
          ref={box2}
          width={"100%"}
          height={spaceY[1.5]}
          highlighted
          layout
          gap={spaceY[0.25]}
          padding={spaceY["0.25"]}
        >
          <ExtendedRect />
          <ExtendedRect />
          <ExtendedRect />
          <ExtendedRect />
          <ExtendedRect />
          <ExtendedRect />
          <ExtendedRect />
          <ExtendedRect />
        </ExtendedRect>
        <ExtendedRect
          ref={box3}
          width={"100%"}
          height={spaceY[1.5]}
          highlighted
        />
      </Layout>
    </>
  );
  yield* layout().opacity(1, 0.75);
  yield* all(
    box2().width("50%", 1.5).to("75%", 1.25),
    box2().height(spaceY[3], 1.5).to(spaceY[2], 1.25),
    layout().y(spaceY[1.25], 1.5).to(spaceY["0.75"], 1.25)
  );
  yield* waitUntil("innerDisplayTypes");
  yield* all(
    box1().opacity(0, 0.75),
    box3().opacity(0, 0.75),
    box2().width("100%", 0.75),
    layout().y(() => box2().height() / 2 - spaceY[2], 0.75),
    box2().height(spaceY[4], 0.75)
  );
  yield* waitFor(60);
});
