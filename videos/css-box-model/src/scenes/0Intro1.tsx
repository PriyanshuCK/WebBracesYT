import {
  Circle,
  Layout,
  Line,
  makeScene2D,
  Node,
  Ray,
  Rect,
} from "@motion-canvas/2d";
import colors from "../lib/colors";
import { ExtendedCircle, Grid } from "../nodes";
import {
  all,
  createRef,
  delay,
  easeOutCubic,
  linear,
  makeRef,
  range,
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
  const inVideo = createRef<ExtendedTxt>();
  const chapters = [
    // "Everything is a box",
    // "Parts of a box",
    "Padding",
    "Border",
    "Margin",
    // "Margin vs Padding",
    "Margin Collapsing",
    "box-sizing",
    "display: block;",
    "display: inline;",
    "display: inline-block;",
    "Outer vs Inline display types",
  ];
  const texts: ExtendedTxt[] = [];
  const chaptersLayout = createRef<Layout>();
  const cssBoxModel = createRef<ExtendedTxt>();
  const ray = createRef<Ray>();
  view.add(
    <>
      <ExtendedTxt ref={inVideo} fontSize={spaceY["0.75"]} fontWeight={500} />
      <Layout
        ref={chaptersLayout}
        layout
        direction={"column"}
        gap={spaceY["0.67"]}
        y={spaceY[1] * 12.5}
        x={spaceX[0.5]}
      >
        {range(chapters.length).map((index) => (
          <>
            <Layout layout gap={spaceX["0.5"]} alignItems={"center"}>
              <Circle
                stroke={colors.slate[0]}
                lineWidth={2}
                padding={spaceY["0.25"] / 4}
                fill={colors.zinc[950]}
              >
                <Circle fill={colors.slate[0]} size={spaceY["0.25"]} />
              </Circle>
              <ExtendedTxt
                ref={makeRef(texts, index)}
                text={chapters[index]}
                fontSize={spaceY["0.5"]}
              />
            </Layout>
          </>
        ))}
      </Layout>
      <Rect
        fill={colors.zinc[950]}
        width={spaceX[12]}
        height={spaceY[3]}
        shadowBlur={spaceY[1]}
        shadowColor={colors.zinc[950]}
        shadowOffsetY={spaceY[0.75]}
        position={[spaceX[2], spaceNY[4.5]]}
        zIndex={1}
      />
      <Rect
        fill={colors.zinc[950]}
        width={spaceX[12]}
        height={spaceY[3]}
        shadowBlur={spaceY[1]}
        shadowColor={colors.zinc[950]}
        shadowOffsetY={spaceNY[1]}
        position={[spaceX[2], spaceY[6.5]]}
        zIndex={1}
      />
      <ExtendedTxt
        ref={cssBoxModel}
        fontSize={spaceY[1]}
        fontWeight={600}
        y={spaceNY["4.5"]}
        zIndex={2}
      />
      <Ray
        ref={ray}
        stroke={colors.slate[0]}
        lineWidth={4}
        x={-266.5}
        fromY={spaceY[7.5] - 20}
        toY={spaceY[1] * 17 + 10}
        zIndex={-1}
      />
    </>
  );
  yield* all(
    inVideo().text("In this video...", 0.8),
    delay(3.25, inVideo().opacity(0, 0.75)),
    delay(4.5, cssBoxModel().text("CSS Box Model", 1.5)),
    delay(1, chaptersLayout().y(spaceNY[4], 12, linear)),
    delay(1, ray().y(spaceNY[1] * 16, 12, linear))
  );
  yield* waitUntil("scene01End");
});
