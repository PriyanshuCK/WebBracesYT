import { Code, Layout, makeScene2D, Node, Ray, Rect } from "@motion-canvas/2d";
import { CSSCode, ExtendedRect, Grid } from "../nodes";
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
import colors from "../lib/colors";
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
  yield* slideTransition(Direction.Right, 0.75);
  yield* waitUntil("mvsp");
  const mText = createRef<ExtendedTxt>();
  const pText = createRef<ExtendedTxt>();
  const title = createRef<ExtendedTxt>();
  const titleNode = createRef<Node>();
  view.add(
    <>
      <Node ref={titleNode} opacity={0}>
        <ExtendedTxt
          ref={title}
          text={"Margin vs Padding"}
          fontSize={spaceY[1]}
          fontWeight={600}
        />
        <ExtendedTxt
          ref={mText}
          text={"Margin"}
          fontSize={spaceY[1]}
          fontWeight={600}
          stroke={colors.amber[500]}
          fill={colors.amber[500]}
          lineWidth={1}
          x={-248}
        />
        <ExtendedTxt
          ref={pText}
          text={"Padding"}
          fontSize={spaceY[1]}
          fontWeight={600}
          stroke={colors.lime[500]}
          fill={colors.lime[500]}
          lineWidth={1}
          x={220}
        />
      </Node>
    </>
  );
  yield* all(titleNode().opacity(1, 0.75));
  const contentTxt = createRef<ExtendedTxt>();
  const paddingBG = createRef<ExtendedRect>();
  const marginBG = createRef<Rect>();
  const padding = createSignal(spaceY[2]);
  const marginH = createSignal(spaceX[2]);
  const marginV = createSignal(spaceY[2]);
  const rayT = createRef<Ray>();
  const rayR = createRef<Ray>();
  const rayB = createRef<Ray>();
  const rayL = createRef<Ray>();
  view.add(
    <>
      <Rect
        ref={marginBG}
        padding={() => [marginV(), marginH()]}
        zIndex={2}
        scale={0}
      >
        <ExtendedRect
          ref={paddingBG}
          padding={() => padding()}
          scale={0}
          lineWidth={8}
        >
          <ExtendedTxt
            ref={contentTxt}
            text={"Content"}
            fontSize={spaceY["0.5"]}
            fontWeight={500}
          />
        </ExtendedRect>
      </Rect>
    </>
  );
  paddingBG().fill(colors[paddingBG().colorSignal()][200]);
  paddingBG().stroke(colors[paddingBG().colorSignal()][700]);
  contentTxt().fill(colors[paddingBG().colorSignal()][700]);
  marginBG().fill(new Color(colors[paddingBG().colorSignal()][500]).alpha(0.1));

  yield* all(
    titleNode().scale(0.5, 0.75),
    titleNode().y(spaceNY["4.5"], 0.75),
    paddingBG().scale(1, 0.75),
    mText().opacity(0, 0.75),
    pText().opacity(0, 0.75),
    delay(0.5, marginBG().scale(1, 0.75))
  );
  view.add(
    <>
      <Ray
        ref={rayT}
        fromY={() => paddingBG().top().y + padding()}
        toY={() => paddingBG().top().y}
        lineDash={[4, 4]}
        endArrow
        lineWidth={4}
        arrowSize={10}
        layout
        startOffset={spaceY["0.25"]}
        opacity={0}
        start={0.5}
        end={0.5}
        zIndex={2}
      />
      <Ray
        ref={rayR}
        fromX={() => paddingBG().right().x - padding()}
        toX={() => paddingBG().right().x}
        lineDash={[4, 4]}
        endArrow
        lineWidth={4}
        arrowSize={10}
        layout
        startOffset={spaceY["1"] * 1.1}
        opacity={0}
        start={0.5}
        end={0.5}
        zIndex={2}
      />
      <Ray
        ref={rayB}
        fromY={() => paddingBG().bottom().y - padding()}
        toY={() => paddingBG().bottom().y}
        lineDash={[4, 4]}
        endArrow
        lineWidth={4}
        arrowSize={10}
        layout
        startOffset={spaceY["0.25"]}
        opacity={0}
        start={0.5}
        end={0.5}
        zIndex={2}
      />
      <Ray
        ref={rayL}
        fromX={() => paddingBG().left().x + padding()}
        toX={() => paddingBG().left().x}
        lineDash={[4, 4]}
        endArrow
        lineWidth={4}
        arrowSize={10}
        layout
        startOffset={spaceY["1"] * 1.1}
        opacity={0}
        start={0.5}
        end={0.5}
        zIndex={2}
      />
    </>
  );
  rayT().stroke(colors[paddingBG().colorSignal()][700]);
  rayB().stroke(colors[paddingBG().colorSignal()][700]);
  rayL().stroke(colors[paddingBG().colorSignal()][700]);
  rayR().stroke(colors[paddingBG().colorSignal()][700]);
  yield* all(
    rayT().opacity(1, 0.75),
    rayT().start(0, 0.75),
    rayT().end(1, 0.75),
    rayR().opacity(1, 0.75),
    rayR().start(0, 0.75),
    rayR().end(1, 0.75),
    rayB().opacity(1, 0.75),
    rayB().start(0, 0.75),
    rayB().end(1, 0.75),
    rayL().opacity(1, 0.75),
    rayL().start(0, 0.75),
    rayL().end(1, 0.75)
  );
  yield* all(padding(spaceY[3.5], 2).back(2));

  const mBox2 = createRef<ExtendedRect>();
  const mBox3 = createRef<ExtendedRect>();
  view.add(
    <>
      <ExtendedRect
        ref={mBox2}
        width={spaceX[2]}
        height={spaceY[3]}
        lineWidth={6}
        highlighted
        zIndex={1}
      />
      <ExtendedRect
        ref={mBox3}
        width={spaceX[2]}
        height={spaceY[3]}
        lineWidth={6}
        highlighted
        zIndex={1}
      />
    </>
  );

  yield* all(
    marginH(spaceX[7], 3).to(spaceX[5], 2),
    marginV(spaceY[4], 3).to(spaceY[3], 2),
    rayT().from(() => [0, paddingBG().top().y], 0.75),
    rayT().to(() => [0, marginBG().top().y], 0.75),
    rayT().startOffset(0, 0.75),
    rayT().stroke(colors[paddingBG().colorSignal()][300], 0.75),
    rayB().from(() => [0, paddingBG().bottom().y], 0.75),
    rayB().to(() => [0, marginBG().bottom().y], 0.75),
    rayB().startOffset(0, 0.75),
    rayB().stroke(colors[paddingBG().colorSignal()][300], 0.75),
    rayL().from(() => [paddingBG().left().x, 0], 0.75),
    rayL().to(() => [marginBG().left().x, 0], 0.75),
    rayL().startOffset(0, 0.75),
    rayL().stroke(colors[paddingBG().colorSignal()][300], 0.75),
    rayR().from(() => [paddingBG().right().x, 0], 0.75),
    rayR().to(() => [marginBG().right().x, 0], 0.75),
    rayR().startOffset(0, 0.75),
    rayR().stroke(colors[paddingBG().colorSignal()][300], 0.75),
    mBox2().x(
      () => -paddingBG().width() / 2 - 15 + spaceX[1] - marginH(),
      0.75
    ),
    mBox3().x(() => paddingBG().width() / 2 + 15 - spaceX[1] + marginH(), 0.75)
  );

  yield* waitUntil("scene6End");
});
