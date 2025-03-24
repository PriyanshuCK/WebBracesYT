import {
  Circle,
  Code,
  lines,
  makeScene2D,
  Ray,
  Rect,
  word,
} from "@motion-canvas/2d";
import colors from "../lib/colors";
import { CSSCode, ExtendedRect, Grid } from "../nodes";
import {
  all,
  Color,
  createRef,
  createSignal,
  delay,
  Direction,
  easeInOutCubic,
  slideTransition,
  tween,
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
  const paddingTxt = createRef<ExtendedTxt>();
  const contentTxt = createRef<ExtendedTxt>();
  const contentBG = createRef<Rect>();
  const paddingBG = createRef<Rect>();
  const paddingTSignal = createSignal(60);
  const paddingRSignal = createSignal(60);
  const paddingBSignal = createSignal(60);
  const paddingLSignal = createSignal(60);
  const code = createRef<Code>();
  const rayT = createRef<Ray>();
  const rayR = createRef<Ray>();
  const rayB = createRef<Ray>();
  const rayL = createRef<Ray>();
  view.add(
    <>
      <ExtendedTxt
        ref={paddingTxt}
        text={"Padding"}
        y={spaceNY["4.5"]}
        fontSize={spaceY["0.67"]}
        fontWeight={600}
      />
      <Rect
        ref={paddingBG}
        fill={colors.lime[300]}
        position={() => [
          spaceNX[4] + paddingRSignal() / 2 - paddingLSignal() / 2,
          spaceY[0.5] - paddingTSignal() / 2 + paddingBSignal() / 2,
        ]}
        layout
        padding={() => [
          paddingTSignal(),
          paddingRSignal(),
          paddingBSignal(),
          paddingLSignal(),
        ]}
      >
        <Rect ref={contentBG} fill={colors.blue[200]} layout>
          <ExtendedTxt
            ref={contentTxt}
            text={"Content"}
            fill={colors.slate[950]}
          />
        </Rect>
      </Rect>
      <CSSCode
        ref={code}
        x={spaceX[4]}
        y={spaceY[1]}
        fontSize={spaceY["0.5"]}
        code={() => `\
.box {
  padding: ${paddingTSignal().toFixed(0)}px;
}
`}
      />
      <Ray
        ref={rayT}
        fromY={paddingBG().top().y + paddingTSignal()}
        toY={() => paddingBG().top().y}
        x={spaceNX["4"]}
        lineDash={[4, 4]}
        startArrow
        endArrow
        lineWidth={2}
        arrowSize={6}
        startOffset={4}
        stroke={colors.slate[950]}
      >
        <ExtendedTxt
          text={() => `${paddingTSignal().toFixed(0)}px`}
          fill={colors.slate[950]}
          x={spaceX["0.5"]}
          y={() => paddingBG().top().y + paddingTSignal() / 2}
        />
      </Ray>
      <Ray
        ref={rayB}
        fromY={paddingBG().bottom().y - paddingBSignal()}
        toY={() => paddingBG().bottom().y}
        x={spaceNX["4"]}
        lineDash={[4, 4]}
        startArrow
        endArrow
        lineWidth={2}
        arrowSize={6}
        startOffset={4}
        stroke={colors.slate[950]}
      >
        <ExtendedTxt
          text={() => `${paddingBSignal().toFixed(0)}px`}
          fill={colors.slate[950]}
          x={spaceNX["0.5"]}
          y={() => paddingBG().bottom().y - paddingBSignal() / 2}
        />
      </Ray>
      <Ray
        ref={rayR}
        fromX={() => paddingBG().right().x - paddingRSignal()}
        toX={() => paddingBG().right().x}
        y={spaceY["0.5"]}
        lineDash={[4, 4]}
        startArrow
        endArrow
        lineWidth={2}
        arrowSize={6}
        startOffset={4}
        stroke={colors.slate[950]}
      >
        <ExtendedTxt
          text={() => `${paddingRSignal().toFixed(0)}px`}
          fill={colors.slate[950]}
          x={() => paddingBG().right().x - paddingRSignal() / 2}
          y={spaceY["0.5"]}
        />
      </Ray>
      <Ray
        ref={rayL}
        fromX={() => paddingBG().left().x + paddingLSignal()}
        toX={() => paddingBG().left().x}
        y={spaceY["0.5"]}
        lineDash={[4, 4]}
        startArrow
        endArrow
        lineWidth={2}
        arrowSize={6}
        startOffset={4}
        stroke={colors.slate[950]}
      >
        <ExtendedTxt
          text={() => `${paddingLSignal().toFixed(0)}px`}
          fill={colors.slate[950]}
          x={() => paddingBG().left().x + paddingLSignal() / 2}
          y={spaceNY["0.5"]}
        />
      </Ray>
    </>
  );
  yield* slideTransition(Direction.Right, 0.75);
  yield* all(
    paddingTSignal(240, 2).back(2).to(160, 2),
    paddingRSignal(240, 2).back(2).to(160, 2),
    paddingBSignal(240, 2).back(2).to(160, 2),
    paddingLSignal(240, 2).back(2).to(160, 2)
  );
  yield* waitUntil("specificSides");
  yield* all(
    paddingTSignal(60, 0.75),
    paddingRSignal(60, 0.75),
    paddingBSignal(60, 0.75),
    paddingLSignal(60, 0.75),
    code().code.remove(lines(1), 0.75)
  );
  yield* waitUntil("paddingLeft");
  yield* all(
    paddingLSignal(231, 0.75),
    code().code.insert(
      [1, 0],
      `\
  padding-left: 231px;
`,
      0.75
    )
  );
  yield* waitUntil("paddingRight");
  yield* all(
    paddingRSignal(94, 0.75),
    code().code.insert(
      [2, 0],
      `\
  padding-right: 94px;
`,
      0.75
    )
  );
  yield* waitUntil("paddingTop");
  yield* all(
    paddingTSignal(300, 0.5),
    code().code.insert(
      [3, 0],
      `\
  padding-top: 300px;
`,
      0.75
    )
  );
  yield* waitUntil("paddingBottom");
  yield* all(
    paddingBSignal(280, 0.5),
    code().code.insert(
      [4, 0],
      `\
  padding-bottom: 280px;
`,
      0.75
    )
  );
  yield* waitUntil("differentValues");
  yield* code().code.replace(
    lines(1, 4),
    `\
  padding: 300px 94px 280px 231px;
`,
    0.75
  );
  yield* waitUntil("clockwise");
  const rayPaddingDir = createRef<Ray>();
  const clockCircle = createRef<Circle>();
  view.add(
    <>
      <Ray
        ref={rayPaddingDir}
        fromX={spaceX[2.5]}
        toX={spaceX[8.5]}
        y={spaceY[1.25]}
        lineWidth={4}
        stroke={colors.slate[0]}
        lineCap={"round"}
        endArrow
        end={0}
        opacity={0}
      />
      <Circle
        ref={clockCircle}
        size={spaceY[5.25]}
        lineWidth={6}
        stroke={colors.slate[0]}
        position={[spaceNX[4], spaceY[0.5]]}
        endArrow
        endOffset={400}
        rotation={270}
        end={0}
        opacity={0}
      />
    </>
  );
  yield* all(
    rayPaddingDir().end(1, 2),
    clockCircle().end(1, 2),
    rayPaddingDir().opacity(1, 0.5),
    clockCircle().opacity(1, 0.5)
  );

  yield* waitUntil("onlyTwo");
  yield* all(
    rayPaddingDir().end(0, 0.75),
    clockCircle().end(0, 0.75),
    rayPaddingDir().opacity(0, 0.75),
    clockCircle().opacity(0, 0.75),
    paddingTSignal(60, 0.75),
    paddingRSignal(60, 0.75),
    paddingBSignal(60, 0.75),
    paddingLSignal(60, 0.75)
  );
  yield* all(
    code().code.replace(
      word(1, 11, 22),
      () => `${paddingTSignal().toFixed(0)}px ${paddingRSignal().toFixed(0)}px`,
      1
    )
  );
  const tbCodeRect = createRef<ExtendedRect>();
  const tRect = createRef<ExtendedRect>();
  const bRect = createRef<ExtendedRect>();
  view.add(
    <>
      <ExtendedRect
        ref={tbCodeRect}
        height={spaceY["0.5"] + 20}
        width={spaceX[1.5] + 20}
        position={[spaceX[4.67], spaceY["0.5"]]}
        highlighted
        scale={0}
        color="red"
      />
      <ExtendedRect
        ref={tRect}
        height={spaceY["0.5"] + 10}
        width={spaceX[1] + 10}
        position={() => [
          spaceNX["3.5"],
          paddingBG().top().y + paddingTSignal() / 2,
        ]}
        highlighted
        scale={0}
        color={tbCodeRect().colorSignal()}
      />
      <ExtendedRect
        ref={bRect}
        height={spaceY["0.5"] + 10}
        width={spaceX[1] + 10}
        position={() => [
          spaceNX["4.5"],
          paddingBG().bottom().y - paddingBSignal() / 2,
        ]}
        highlighted
        scale={0}
        color={tbCodeRect().colorSignal()}
      />
    </>
  );
  yield* all(
    paddingTSignal(200, 2),
    paddingBSignal(200, 2),
    tbCodeRect().scale(1, 0.5),
    delay(0.5, tRect().scale(1, 0.5)),
    delay(1, bRect().scale(1, 0.5))
  );
  yield* all(
    tbCodeRect().x(spaceX["6.25"] - 10, 0.75),
    tbCodeRect().tweenColor("blue", 0.75),
    tRect().tweenColor("blue", 0.75),
    bRect().tweenColor("blue", 0.75),
    delay(
      0.25,
      tRect().position(
        () => [paddingBG().right().x - paddingRSignal() / 2, spaceY["1"]],
        0.75
      )
    ),
    delay(
      0.25,
      bRect().position(
        () => [paddingBG().left().x + paddingRSignal() / 2, spaceY["0"]],
        0.75
      )
    ),
    paddingRSignal(300, 2),
    paddingLSignal(300, 2)
  );
  yield* all(
    tbCodeRect().scale(0, 0.5),
    tRect().scale(0, 0.5),
    bRect().scale(0, 0.5),
    code().code.replace(
      word(1, 11, 11),
      () =>
        `${paddingTSignal().toFixed(0)}px ${paddingRSignal().toFixed(
          0
        )}px ${paddingBSignal().toFixed(0)}px`,
      0.75
    ),
    code().x(spaceX["5"], 0.75)
  );
  tbCodeRect().x(spaceX[4.75] - 4);
  tbCodeRect().tweenColor("violet");
  tRect().tweenColor("violet");
  tRect().position(() => [
    spaceNX["3.5"],
    paddingBG().top().y + paddingTSignal() / 2,
  ]);
  yield* waitUntil("threeFirst");
  yield* all(
    tbCodeRect().scale(1, 0.5),
    tRect().scale(1, 0.5),
    paddingTSignal(280, 1.25)
  );
  yield* all(
    paddingLSignal(200, 1.75),
    paddingRSignal(200, 1.75),
    tbCodeRect().x(spaceX["6.25"] + 10, 0.75),
    tbCodeRect().tweenColor("yellow", 0.75),
    tRect().tweenColor("yellow", 0.75),
    bRect().tweenColor("yellow", 0.75),
    tRect().position(
      () => [paddingBG().right().x - paddingRSignal() / 2, spaceY["1"]],
      0.75
    ),
    bRect().scale(1, 0.75)
  );
  yield* waitUntil("threeThird");
  yield* all(
    paddingBSignal(320, 1.75),
    tRect().position(
      () => [spaceNX["4.5"], paddingBG().bottom().y - paddingBSignal() / 2],
      0.75
    ),
    tRect().tweenColor("emerald", 0.75),
    tbCodeRect().tweenColor("emerald", 0.75),
    bRect().scale(0, 0.75),
    tbCodeRect().x(spaceX["8"] - 4, 0.75)
  );
  yield* waitUntil("neverNeg");
  yield* all(
    tbCodeRect().scale(0, 0.75),
    tRect().scale(0, 0.75),
    delay(0.75, paddingTSignal(240, 1.25)),
    delay(0.75, paddingRSignal(240, 1.25)),
    delay(0.75, paddingBSignal(240, 1.25)),
    delay(0.75, paddingLSignal(240, 1.25)),
    code().code.replace(
      word(1, 11, 17),
      () => `${paddingTSignal().toFixed(0)}px`,
      0.75
    )
  );
  yield* all(
    contentBG().fill(new Color(colors.slate[0]).alpha(0), 0.75),
    rayT().start(0.5, 0.75),
    rayT().end(0.5, 0.75),
    rayT().opacity(0, 0.75),
    delay(0.2, rayB().start(0.5, 0.75)),
    delay(0.2, rayB().end(0.5, 0.75)),
    delay(0.2, rayB().opacity(0, 0.75)),
    delay(0.4, rayR().start(0.5, 0.75)),
    delay(0.4, rayR().end(0.5, 0.75)),
    delay(0.4, rayR().opacity(0, 0.75)),
    delay(0.6, rayL().start(0.5, 0.75)),
    delay(0.6, rayL().end(0.5, 0.75)),
    delay(0.6, rayL().opacity(0, 0.75)),
    contentTxt().fontSize(spaceY["0.5"], 0.75),
    contentTxt().fontWeight(500, 0.75),
    delay(
      0.6,
      code().code.insert(
        [2, 0],
        `\
  background-color: #7dd3fc;
`,
        0.75
      )
    ),
    delay(
      3.5,
      tween(1.75, (value) => {
        const interpolatedColor = Color.lerp(
          colors.lime[300],
          colors.fuchsia[300],
          easeInOutCubic(value)
        );
        paddingBG().fill(interpolatedColor);
      })
    )
  );
  yield* waitUntil("scroll");
  const scrollH = createRef<Rect>();
  const scrollV = createRef<Rect>();
  view.add(
    <>
      <Rect
        ref={scrollH}
        width={paddingBG().width}
        height={spaceY["0.25"]}
        position={[
          paddingBG().bottom().x,
          paddingBG().bottom().y - spaceY["0.25"] / 2,
        ]}
        fill={colors.slate[900]}
        opacity={0}
      />
      <Rect
        ref={scrollV}
        height={paddingBG().height}
        width={spaceX["0.25"]}
        position={[
          paddingBG().right().x - spaceX["0.25"] / 2,
          paddingBG().right().y,
        ]}
        fill={colors.slate[900]}
        opacity={0}
      />
    </>
  );
  yield* all(scrollH().opacity(0.3, 1), scrollV().opacity(0.3, 1));
  yield* waitUntil("scene3End");
});
