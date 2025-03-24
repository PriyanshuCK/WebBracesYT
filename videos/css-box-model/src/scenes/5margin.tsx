import { Code, Layout, lines, makeScene2D, Ray, Rect } from "@motion-canvas/2d";
import { CSSCode, ExtendedRect, Grid, Window } from "../nodes";
import colors from "../lib/colors";
import {
  all,
  createRef,
  createSignal,
  delay,
  Direction,
  loop,
  loopFor,
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
  const marginTxt = createRef<ExtendedTxt>();
  const window = createRef<Window>();

  view.add(
    <>
      <ExtendedTxt
        ref={marginTxt}
        text={"Margin"}
        y={spaceNY["4.5"]}
        fontSize={spaceY["0.67"]}
        fontWeight={600}
      />
      <Window
        ref={window}
        width={spaceX[13]}
        height={spaceY[8]}
        fill={colors.slate[0]}
        y={spaceY[1]}
      />
    </>
  );
  yield* slideTransition(Direction.Bottom, 0.75);
  yield* waitUntil("marginsCreate");
  const mBox1 = createRef<ExtendedRect>();
  const mBox2 = createRef<ExtendedRect>();
  const mBox3 = createRef<ExtendedRect>();
  const marginBoxes = createRef<Layout>();
  const mLeft = createSignal(spaceX[0.5]);
  const mRight = createSignal(spaceX[0.5]);
  const mRay1 = createRef<Ray>();
  const mRay2 = createRef<Ray>();
  view.add(
    <>
      <Layout ref={marginBoxes} opacity={0} y={spaceY[1]}>
        <ExtendedRect
          ref={mBox1}
          width={spaceX[2]}
          height={spaceY[3]}
          lineWidth={6}
          color={"fuchsia"}
          x={spaceNX["5.25"]}
          highlighted
        />
        <ExtendedRect
          ref={mBox2}
          width={spaceX[3]}
          height={spaceY[4]}
          lineWidth={6}
          color="orange"
          x={() => mBox1().x() + spaceX["2.5"] + mLeft()}
          y={spaceNY["0.5"]}
        />
        <ExtendedRect
          ref={mBox3}
          width={spaceX[2]}
          height={spaceY[3]}
          lineWidth={6}
          color="emerald"
          x={() => mBox2().x() + spaceX["2.5"] + mRight()}
          highlighted
        />
      </Layout>
      <Ray
        ref={mRay1}
        fromX={() => mBox1().right().x}
        toX={() => mBox2().left().x}
        y={spaceY["3.25"]}
        lineDash={[4, 4]}
        stroke={colors.slate[950]}
        startArrow
        lineWidth={4}
        arrowSize={10}
        layout
        justifyContent={"center"}
        opacity={0}
      >
        <ExtendedTxt
          textAlign={"center"}
          marginTop={spaceY[0.25]}
          text={() => `${mLeft().toFixed(0)}px\nmargin-left`}
          fill={colors.slate[950]}
        />
      </Ray>
      <Ray
        ref={mRay2}
        fromX={() => mBox2().right().x}
        toX={() => mBox3().left().x}
        y={spaceY["3.25"]}
        lineDash={[4, 4]}
        stroke={colors.slate[950]}
        endArrow
        lineWidth={4}
        arrowSize={10}
        layout
        justifyContent={"center"}
        opacity={0}
      >
        <ExtendedTxt
          textAlign={"center"}
          marginTop={spaceY["0.25"]}
          text={() => `${mRight().toFixed(0)}px\nmargin-right`}
          fill={colors.slate[950]}
        />
      </Ray>
    </>
  );
  mBox2().fill(colors[mBox2().colorSignal()][200]);
  yield* all(
    delay(0.5, mLeft(spaceX[1], 2).to(spaceX[2.5], 2)),
    delay(0.5, mRight(spaceX[2], 2).to(spaceX[1], 2)),
    delay(1.5, mBox2().ripple(0.75)),
    marginBoxes().opacity(1, 0.75),
    mRay1().opacity(1, 0.75),
    mRay2().opacity(1, 0.75)
  );

  // yield* waitUntil("marginCode");
  const mBox = createRef<ExtendedRect>();
  const code = createRef<Code>();
  const mt = createSignal(spaceX[1]);
  const mr = createSignal(spaceX[1]);
  const mb = createSignal(spaceX[1]);
  const ml = createSignal(spaceX[1]);
  const rayT = createRef<Ray>();
  const rayR = createRef<Ray>();
  const rayB = createRef<Ray>();
  const rayL = createRef<Ray>();
  const mRect = createRef<Rect>();

  view.add(
    <>
      <Rect
        ref={mRect}
        width={() => spaceX[3] + ml() + mr()}
        height={() => spaceY[4] + mt() + mb()}
        position={() => [
          spaceNX[4] + (mr() - ml()) / 2,
          spaceY[0.5] + (mb() - mt()) / 2,
        ]}
        fill={colors.amber[200]}
        stroke={colors.amber[700]}
        lineWidth={4}
        lineDash={[4, 10]}
        lineCap={"round"}
        scale={0}
      />
      <ExtendedRect
        ref={mBox}
        width={spaceX[3]}
        height={spaceY[4]}
        lineWidth={6}
        color="amber"
        x={spaceNX[4]}
        y={spaceY["0.5"]}
        opacity={0}
        highlighted
      />
      <CSSCode
        ref={code}
        x={spaceX[4]}
        y={spaceY[0.5]}
        fontSize={spaceY["0.5"]}
        opacity={0}
        code={() => `\
.box {
}
`}
      />
      <Ray
        ref={rayT}
        fromY={() => mBox().top().y}
        toY={() => mRect().top().y}
        x={spaceNX["4"]}
        lineDash={[4, 4]}
        startArrow
        endArrow
        lineWidth={2}
        arrowSize={6}
        startOffset={4}
        stroke={colors.slate[950]}
        start={0.5}
        end={0.5}
        opacity={0}
      >
        <ExtendedTxt
          text={() => `${mt().toFixed(0)}px`}
          fill={colors.slate[950]}
          x={spaceX["0.5"]}
          y={() => mBox().top().y - mt() / 2}
        />
      </Ray>
      <Ray
        ref={rayB}
        fromY={() => mBox().bottom().y}
        toY={() => mRect().bottom().y}
        x={spaceNX["4"]}
        lineDash={[4, 4]}
        startArrow
        endArrow
        lineWidth={2}
        arrowSize={6}
        startOffset={4}
        stroke={colors.slate[950]}
        start={0.5}
        end={0.5}
        opacity={0}
      >
        <ExtendedTxt
          text={() => `${mb().toFixed(0)}px`}
          fill={colors.slate[950]}
          x={spaceNX["0.5"]}
          y={() => mBox().bottom().y + mb() / 2}
        />
      </Ray>
      <Ray
        ref={rayR}
        fromX={() => mBox().right().x}
        toX={() => mRect().right().x}
        y={spaceY["0.5"]}
        lineDash={[4, 4]}
        startArrow
        endArrow
        lineWidth={2}
        arrowSize={6}
        startOffset={4}
        stroke={colors.slate[950]}
        start={0.5}
        end={0.5}
        opacity={0}
      >
        <ExtendedTxt
          text={() => `${mr().toFixed(0)}px`}
          fill={colors.slate[950]}
          x={() => mBox().right().x + mr() / 2}
          y={spaceY["0.5"]}
        />
      </Ray>
      <Ray
        ref={rayL}
        fromX={() => mBox().left().x}
        toX={() => mRect().left().x}
        y={spaceY["0.5"]}
        lineDash={[4, 4]}
        startArrow
        endArrow
        lineWidth={2}
        arrowSize={6}
        startOffset={4}
        stroke={colors.slate[950]}
        start={0.5}
        end={0.5}
        opacity={0}
      >
        <ExtendedTxt
          text={() => `${ml().toFixed(0)}px`}
          fill={colors.slate[950]}
          x={() => mBox().left().x - ml() / 2}
          y={spaceNY["0.5"]}
        />
      </Ray>
    </>
  );
  // mBox().fill(colors[mBox().colorSignal()][200]);
  yield* all(
    window().opacity(0, 0.75),
    marginBoxes().scale(0, 0.75),
    mRay1().start(0.5, 0.75),
    mRay1().end(0.5, 0.75),
    mRay1().opacity(0, 0.75),
    mRay2().start(0.5, 0.75),
    mRay2().end(0.5, 0.75),
    mRay2().opacity(0, 0.75),
    mBox().opacity(1, 0.75),
    code().opacity(1, 0.75),
    delay(0.5, mRect().scale(1, 0.75))
  );
  yield* all(
    rayT().start(0, 0.75),
    rayT().end(1, 0.75),
    rayT().opacity(1, 0.75),
    rayR().start(0, 0.75),
    rayR().end(1, 0.75),
    rayR().opacity(1, 0.75),
    rayB().start(0, 0.75),
    rayB().end(1, 0.75),
    rayB().opacity(1, 0.75),
    rayL().start(0, 0.75),
    rayL().end(1, 0.75),
    rayL().opacity(1, 0.75),
    code().code.insert(
      [1, 0],
      () => `\
  margin: ${mt().toFixed(0)}px;
`,
      0.75
    ),
    delay(1, mt(spaceX[1.5], 1.5)),
    delay(1, mr(spaceX[1.5], 1.5)),
    delay(1, mb(spaceX[1.5], 1.5)),
    delay(1, ml(spaceX[1.5], 1.5))
  );
  yield* all(
    delay(0.51, ml(spaceX[1] * 2.8, 0.5)),
    code().code.replace(
      lines(1),
      () => `  margin-left: ${ml().toFixed(0)}px;
`,
      0.5
    )
  );
  yield* waitUntil("mRight");
  yield* all(
    delay(0.51, mr(spaceX[1], 0.75)),
    code().code.insert(
      [2, 0],
      () => `  margin-right: ${mr().toFixed(0)}px;
`,
      0.5
    )
  );
  yield* waitUntil("mTop");
  yield* all(
    delay(0.51, mt(spaceX[1] * 0.8, 0.75)),
    code().code.insert(
      [3, 0],
      () => `  margin-top: ${mt().toFixed(0)}px;
`,
      0.5
    )
  );
  yield* waitUntil("mBottom");
  yield* all(
    delay(0.51, mb(spaceX[1] * 1.2, 0.75)),
    code().code.insert(
      [4, 0],
      () => `  margin-bottom: ${mb().toFixed(0)}px;
`,
      0.5
    )
  );
  yield* waitUntil("shorthand");
  yield* all(
    code().code.replace(
      lines(1, 4),
      () =>
        `  margin: ${mt().toFixed(0)}px ${mr().toFixed(0)}px ${mb().toFixed(
          0
        )}px
`,
      0.5
    )
  );
  yield* all(
    mt(spaceX[1], 0.75),
    mr(spaceX[1.5], 0.75),
    ml(spaceX[1.5], 0.75),
    mb(spaceX[1] * 0.8, 0.75)
  );
  yield* waitUntil("scene5End");
});
