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
import { Cursor, ExtendedCircle, ExtendedRect, Face, Grid } from "../nodes";
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
  yield* waitUntil("twoBoxes");
  const horizontalLeftBox = createRef<ExtendedRect>();
  const horizontalRightBox = createRef<ExtendedRect>();
  const rayLeftBox = createRef<Ray>();
  const rayRightBox = createRef<Ray>();
  const ray70px = createRef<Ray>();
  const horizontalBoxesNode = createRef<Node>();
  const mrText1 = createRef<ExtendedTxt>();
  const mlText1 = createRef<ExtendedTxt>();
  const mrText2 = createRef<ExtendedTxt>();
  const mlText2 = createRef<ExtendedTxt>();
  const ray70pxText = createRef<ExtendedTxt>();

  view.add(
    <>
      <Node ref={horizontalBoxesNode}>
        <ExtendedRect
          ref={horizontalLeftBox}
          width={spaceX[4]}
          height={spaceY[3]}
          highlighted
          x={spaceNX[2.5] + spaceNX["0.75"] / 2}
          opacity={0}
        >
          <ExtendedTxt ref={mrText1} y={spaceY[2]} />
          <ExtendedTxt
            ref={mrText2}
            text={"20px"}
            x={spaceX[1.25]}
            fontSize={spaceY["0.5"]}
            fontWeight={500}
            opacity={0}
          />
        </ExtendedRect>
        <ExtendedRect
          ref={horizontalRightBox}
          width={spaceX[4]}
          height={spaceY[3]}
          highlighted
          x={spaceX[3.25] + spaceNX["0.75"] / 2}
          opacity={0}
        >
          <ExtendedTxt ref={mlText1} y={spaceY[2]} />
          <ExtendedTxt
            ref={mlText2}
            text={"50px"}
            x={spaceNX[1.25]}
            fontSize={spaceY["0.5"]}
            fontWeight={500}
            opacity={0}
          />
        </ExtendedRect>
        <Ray
          ref={rayLeftBox}
          fromY={horizontalLeftBox().bottom().y}
          toY={spaceY[3]}
          x={horizontalLeftBox().right().x}
          lineWidth={3}
          stroke={colors.slate[0]}
          lineDash={[4, 10]}
          lineCap={"round"}
          end={0}
          opacity={0}
        />
        <Ray
          ref={rayRightBox}
          fromY={horizontalRightBox().bottom().y}
          toY={spaceY[3]}
          x={horizontalRightBox().left().x}
          lineWidth={3}
          stroke={colors.slate[0]}
          lineDash={[4, 10]}
          lineCap={"round"}
          end={0}
          opacity={0}
        />
        <Ray
          ref={ray70px}
          fromX={horizontalLeftBox().right().x}
          toX={horizontalRightBox().left().x}
          y={spaceY[3]}
          lineWidth={3}
          stroke={colors.slate[0]}
          startArrow
          endArrow
          arrowSize={spaceX["0.25"] / 1.75}
          start={0.5}
          end={0.5}
          opacity={0}
        >
          <ExtendedTxt
            ref={ray70pxText}
            text={"70px"}
            y={spaceNY["0.5"]}
            fontSize={spaceY["0.5"]}
            fill={colors.green[500]}
            fontWeight={600}
          />
        </Ray>
      </Node>
    </>
  );
  yield* all(
    horizontalLeftBox().opacity(1, 0.75),
    horizontalRightBox().opacity(1, 0.75)
  );
  yield* waitUntil("mRight");
  yield* mrText1().text("margin-right: 20px", 1);
  yield* waitUntil("mLeft");
  yield* mlText1().text("margin-left: 50px", 1);
  yield* waitUntil("muchSpace");
  yield* all(mrText2().opacity(1, 0.75), mlText2().opacity(1, 0.75));
  yield* all(
    rayLeftBox().end(1, 0.75),
    rayLeftBox().opacity(1, 0.75),
    rayRightBox().end(1, 0.75),
    rayRightBox().opacity(1, 0.75)
  );
  yield* waitUntil("70px");
  yield* all(
    ray70px().start(0, 0.75),
    ray70px().end(1, 0.75),
    ray70px().opacity(1, 0.75)
  );

  yield* waitUntil("vertically");
  yield* all(
    ray70px().start(0.5, 0.75),
    ray70px().end(0.5, 0.75),
    ray70px().opacity(0, 0.75),
    rayLeftBox().end(0, 0.75),
    rayLeftBox().opacity(0, 0.75),
    rayRightBox().end(0, 0.75),
    rayRightBox().opacity(0, 0.75),
    mlText1().opacity(0, 0.75),
    mrText1().opacity(0, 0.75),
    mlText2().opacity(0, 0.75),
    mrText2().opacity(0, 0.75),
    horizontalRightBox().position([0, spaceNY["2.25"]], 2),
    horizontalLeftBox().position([0, spaceY["2.25"]], 2)
  );
  mlText1().x(spaceX["3.75"]);
  mlText1().y(0);
  mlText1().opacity(1);
  mlText1().text("");
  mrText1().x(spaceX["3.75"]);
  mrText1().y(0);
  mrText1().opacity(1);
  mrText1().text("");
  mlText2().x(0);
  mlText2().y(spaceY[1]);
  mrText2().x(0);
  mrText2().y(spaceNY[1]);
  yield* waitUntil("mBottom");
  yield* mlText1().text("margin-bottom: 20px", 0.75);
  yield* waitUntil("mTop");
  yield* mrText1().text("margin-top: 50px", 0.75);
  yield* waitUntil("spaceBw");
  yield* all(mrText2().opacity(1, 0.75), mlText2().opacity(1, 0.75));
  const rayTopBox = createRef<Ray>();
  const rayBottomBox = createRef<Ray>();
  const ray50px = createRef<Ray>();
  const ray50text = createRef<ExtendedTxt>();
  view.add(
    <>
      <Ray
        ref={rayTopBox}
        fromX={horizontalRightBox().right().x}
        toX={spaceX[3.5]}
        y={horizontalRightBox().bottom().y}
        lineWidth={3}
        stroke={colors.slate[0]}
        lineDash={[4, 10]}
        lineCap={"round"}
        end={0}
        opacity={0}
      />
      <Ray
        ref={rayBottomBox}
        fromX={horizontalLeftBox().right().x}
        toX={spaceX[3.5]}
        y={horizontalLeftBox().top().y}
        lineWidth={3}
        stroke={colors.slate[0]}
        lineDash={[4, 10]}
        lineCap={"round"}
        end={0}
        opacity={0}
      />
      <Ray
        ref={ray50px}
        fromY={horizontalRightBox().bottom().y}
        toY={horizontalLeftBox().top().y}
        x={spaceX[3.5]}
        lineWidth={3}
        stroke={colors.slate[0]}
        startArrow
        endArrow
        arrowSize={spaceX["0.25"] / 1.75}
        start={0.5}
        end={0.5}
        opacity={0}
      >
        <ExtendedTxt
          ref={ray50text}
          text={"50px"}
          x={spaceX["0.75"]}
          fontSize={spaceY["0.5"]}
          fill={colors.red[500]}
          fontWeight={600}
        />
      </Ray>
    </>
  );
  yield* all(
    rayBottomBox().end(1, 0.75),
    rayBottomBox().opacity(1, 0.75),
    rayTopBox().end(1, 0.75),
    rayTopBox().opacity(1, 0.75)
  );
  yield* all(
    ray50px().start(0, 0.75),
    ray50px().end(1, 0.75),
    ray50px().opacity(1, 0.75)
  );
  const marginCollapsing = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={marginCollapsing}
        fontSize={spaceY[1]}
        fontWeight={600}
      />
    </>
  );
  yield* waitUntil("marginCollapsing");
  yield* all(
    marginCollapsing().text("Margin Collapsing", 1.5),
    ray50px().start(0.5, 0.75),
    ray50px().end(0.5, 0.75),
    ray50px().opacity(0, 0.75),
    rayTopBox().end(0, 0.75),
    rayTopBox().opacity(0, 0.75),
    rayBottomBox().end(0, 0.75),
    rayBottomBox().opacity(0, 0.75),
    mlText1().opacity(0, 0.75),
    mrText1().opacity(0, 0.75),
    mlText2().opacity(0, 0.75),
    mrText2().opacity(0, 0.75),
    horizontalRightBox().scale(0, 0.75),
    horizontalLeftBox().scale(0, 0.75)
  );
  const content1Txt = createRef<ExtendedTxt>();
  const padding1BG = createRef<ExtendedRect>();
  const margin1BG = createRef<Rect>();
  const content2Txt = createRef<ExtendedTxt>();
  const padding2BG = createRef<ExtendedRect>();
  const margin2BG = createRef<Rect>();
  const content3Txt = createRef<ExtendedTxt>();
  const padding3BG = createRef<ExtendedRect>();
  const margin3BG = createRef<Rect>();
  const content4Txt = createRef<ExtendedTxt>();
  const padding4BG = createRef<ExtendedRect>();
  const margin4BG = createRef<Rect>();
  view.add(
    <>
      <Rect
        ref={margin1BG}
        padding={[spaceY[1.5], spaceY[3]]}
        scale={0}
        y={spaceNY[2.5]}
      >
        <ExtendedRect
          ref={padding1BG}
          padding={spaceY["0.25"]}
          width={spaceX[4]}
          height={spaceY[2]}
          scale={0}
          lineWidth={8}
          layout
          alignItems={"end"}
          justifyContent={"center"}
          color="pink"
        >
          <ExtendedTxt
            ref={content1Txt}
            text={"margin-bottom: 90px"}
            opacity={0}
          />
        </ExtendedRect>
      </Rect>
      <Rect
        ref={margin2BG}
        padding={[spaceY[2.5], spaceY[3]]}
        scale={0}
        y={spaceY[2.5]}
      >
        <ExtendedRect
          ref={padding2BG}
          padding={spaceY["0.25"]}
          width={spaceX[4]}
          height={spaceY[2]}
          scale={0}
          lineWidth={8}
          layout
          alignItems={"start"}
          justifyContent={"center"}
          color="teal"
        >
          <ExtendedTxt
            ref={content2Txt}
            text={"margin-top: 270px"}
            opacity={0}
          />
        </ExtendedRect>
      </Rect>
    </>
  );
  padding1BG().fill(colors[padding1BG().colorSignal()][200]);
  padding1BG().stroke(colors[padding1BG().colorSignal()][700]);
  content1Txt().fill(colors[padding1BG().colorSignal()][700]);
  margin1BG().fill(
    new Color(colors[padding1BG().colorSignal()][500]).alpha(0.3)
  );
  padding2BG().fill(colors[padding2BG().colorSignal()][200]);
  padding2BG().stroke(colors[padding2BG().colorSignal()][700]);
  content2Txt().fill(colors[padding2BG().colorSignal()][700]);
  margin2BG().fill(
    new Color(colors[padding2BG().colorSignal()][500]).alpha(0.3)
  );
  yield* all(
    marginCollapsing().y(spaceNY["4.5"], 0.75),
    marginCollapsing().fontSize(spaceY["0.5"], 0.75),
    delay(0.5, padding1BG().scale(1, 0.75)),
    delay(0.5, margin1BG().scale(1, 0.75)),
    delay(0.5, content1Txt().opacity(1, 0.75)),
    padding2BG().scale(1, 0.75),
    margin2BG().scale(1, 0.75),
    content2Txt().opacity(1, 0.75)
  );
  yield* waitUntil("touch");
  yield* all(margin1BG().y(spaceNY[2], 0.75), margin2BG().y(spaceY[2], 0.75));
  const distance12 = createSignal(360);
  const ray12 = createRef<Ray>();
  view.add(
    <>
      <Ray
        ref={ray12}
        fromY={() => -distance12() / 4}
        toY={() => distance12() / 4}
        x={spaceY[3]}
        lineWidth={3}
        stroke={colors.slate[0]}
        startArrow
        endArrow
        arrowSize={spaceX["0.25"] / 1.75}
        start={0.5}
        end={0.5}
        opacity={0}
      >
        <ExtendedTxt
          text={() => `${distance12().toFixed(0)}px`}
          x={spaceX[1]}
          fontSize={spaceY["0.5"]}
          fill={colors.slate[0]}
          fontWeight={600}
        />
      </Ray>
    </>
  );
  yield* all(
    ray12().opacity(1, 0.75),
    ray12().start(0, 0.75),
    ray12().end(1, 0.75)
  );
  yield* waitUntil("overlap");
  yield* all(
    margin1BG().y(spaceNY[1.75], 1.5),
    margin2BG().y(spaceY[1.75], 1.5),
    distance12(270, 1.5)
  );
  yield* waitUntil("called");
  const highlightRect = createRef<ExtendedRect>();
  const cursor = createRef<Cursor>();
  view.add(
    <>
      <ExtendedRect
        ref={highlightRect}
        y={spaceNY["5"]}
        x={spaceNX[2.5]}
        width={spaceX[5]}
        highlighted
        scale={0}
      />
      <Cursor
        ref={cursor}
        position={[spaceNX["0.5"], spaceNY[4]]}
        opacity={0}
      />
    </>
  );
  yield* all(
    cursor().opacity(1, 0.75),
    cursor().position([spaceNX[2.5], spaceNY[5]], 0.75)
  );
  yield* all(
    highlightRect().scale(1, 0.75),
    highlightRect().position([0, spaceNY["4.5"]], 0.75),
    cursor().position([spaceX[2.5], spaceNY["4"]], 0.75)
  );
  yield* all(
    cursor().position([spaceX[2], spaceNY["3"]], 0.75),
    cursor().opacity(0, 0.75)
  );
  view.add(
    <>
      <Rect
        ref={margin3BG}
        padding={[spaceY[1.5], spaceY[3]]}
        position={[spaceX[4], spaceNY[2.5]]}
        opacity={0}
      >
        <ExtendedRect
          ref={padding3BG}
          padding={spaceY["0.25"]}
          width={spaceX[4]}
          height={spaceY[2]}
          lineWidth={8}
          layout
          alignItems={"end"}
          justifyContent={"center"}
          color="pink"
        >
          <ExtendedTxt ref={content3Txt} text={"margin-bottom: 90px"} />
        </ExtendedRect>
      </Rect>
      <Rect
        ref={margin4BG}
        padding={[spaceY[2.5], spaceY[3]]}
        position={[spaceX[4], spaceY[2.5]]}
        opacity={0}
      >
        <ExtendedRect
          ref={padding4BG}
          padding={spaceY["0.25"]}
          width={spaceX[4]}
          height={spaceY[2]}
          lineWidth={8}
          layout
          alignItems={"start"}
          justifyContent={"center"}
          color="teal"
        >
          <ExtendedTxt ref={content4Txt} text={"margin-top: 270px"} />
        </ExtendedRect>
      </Rect>
    </>
  );
  padding3BG().fill(colors[padding3BG().colorSignal()][200]);
  padding3BG().stroke(colors[padding3BG().colorSignal()][700]);
  content3Txt().fill(colors[padding3BG().colorSignal()][700]);
  margin3BG().fill(
    new Color(colors[padding3BG().colorSignal()][500]).alpha(0.3)
  );
  padding4BG().fill(colors[padding4BG().colorSignal()][200]);
  padding4BG().stroke(colors[padding4BG().colorSignal()][700]);
  content4Txt().fill(colors[padding4BG().colorSignal()][700]);
  margin4BG().fill(
    new Color(colors[padding4BG().colorSignal()][500]).alpha(0.3)
  );
  yield* all(
    margin3BG().opacity(1, 0.75),
    margin3BG().y(spaceNY[2], 0.75),
    margin4BG().opacity(1, 0.75),
    margin4BG().y(spaceY[2], 0.75),
    margin1BG().padding(0, 0.75),
    margin2BG().padding(0, 0.75),
    margin1BG().x(spaceNX[5], 0.75),
    margin2BG().x(spaceNX[5], 0.75),
    content1Txt().text("margin-bottom: 0px", 0.75),
    content2Txt().text("margin-top: 0px", 0.75),
    margin1BG().y(spaceNY[1] - 4, 0.75),
    margin2BG().y(spaceY[1] + 4, 0.75),
    ray12().opacity(0, 0.75),
    ray12().start(0.5, 0.75),
    ray12().end(0.5, 0.75),
    highlightRect().end(0, 0.75),
    highlightRect().opacity(0, 0.75)
  );
  const distance34 = createSignal(360);
  const ray34 = createRef<Ray>();
  const ray34text = createRef<ExtendedTxt>();
  view.add(
    <>
      <Ray
        ref={ray34}
        fromY={() => -distance34() / 4}
        toY={() => distance34() / 4}
        x={spaceX[7]}
        lineWidth={3}
        stroke={colors.slate[0]}
        startArrow
        endArrow
        arrowSize={spaceX["0.25"] / 1.75}
        start={0.5}
        end={0.5}
        opacity={0}
      >
        <ExtendedTxt
          ref={ray34text}
          text={() => `${distance34().toFixed(0)}px`}
          x={spaceX[1]}
          fontSize={spaceY["0.5"]}
          fill={colors.slate[0]}
          fontWeight={600}
        />
      </Ray>
    </>
  );
  yield* all(
    ray34().opacity(1, 0.75),
    ray34().start(0, 0.75),
    ray34().end(1, 0.75)
  );
  yield* all(
    margin3BG().y(spaceNY[1.75], 1.5),
    margin4BG().y(spaceY[1.75], 1.5),
    distance34(270, 1.5)
  );
  yield* all(
    content3Txt()
      .text("margin-bottom: ", 0.75)
      .to("margin-bottom: -90px", 0.75),
    content4Txt().text("margin-top: ", 0.75).to("margin-top: -270px", 0.75)
  );
  const rayBottom = createRef<Ray>();
  const rayTop = createRef<Ray>();
  const ray270px1 = createRef<Ray>();
  const ray270px2 = createRef<Ray>();
  view.add(
    <>
      <Ray
        ref={rayBottom}
        stroke={colors.slate[0]}
        lineWidth={2}
        fromX={spaceNX[8]}
        toX={spaceX[5]}
        y={spaceY[2] + 8}
        lineDash={[4, 10]}
        lineCap={"round"}
        start={0.5}
        end={0.5}
        opacity={0}
      />
      <Ray
        ref={rayTop}
        stroke={colors.slate[0]}
        lineWidth={2}
        fromX={spaceNX[3]}
        toX={spaceX[2] - 4}
        lineDash={[4, 10]}
        lineCap={"round"}
        start={0.5}
        end={0.5}
        opacity={0}
      />
      <Ray
        ref={ray270px1}
        fromY={() => spaceY[0.5]}
        toY={() => spaceY[2]}
        x={spaceX[4]}
        lineWidth={3}
        stroke={colors.slate[0]}
        startArrow
        endArrow
        arrowSize={spaceX["0.25"] / 1.75}
        layout
        alignItems={"center"}
        start={0.5}
        end={0.5}
        opacity={0}
      >
        <ExtendedTxt
          text={"270px"}
          marginLeft={spaceX[0.25]}
          fill={colors.slate[0]}
        />
      </Ray>
      <Ray
        ref={ray270px2}
        fromY={() => spaceNY[1.5]}
        toY={() => spaceY[0]}
        x={spaceX[1.75]}
        lineWidth={3}
        stroke={colors.slate[0]}
        startArrow
        endArrow
        arrowSize={spaceX["0.25"] / 1.75}
        layout
        alignItems={"center"}
        start={0.5}
        end={0.5}
        opacity={0}
      >
        <ExtendedTxt
          text={"270px"}
          marginLeft={spaceNX[1.25]}
          fill={colors.slate[0]}
        />
      </Ray>
    </>
  );
  yield* all(
    margin3BG().padding(0, 0.75),
    margin4BG().padding(0, 0.75),
    ray34().opacity(0, 0.75),
    ray34().end(0.5, 0.75),
    ray34().start(0.5, 0.75),
    margin3BG().y(spaceNY[1] - 4, 0.75)
  );
  yield* waitUntil("theOne");
  yield* padding4BG().ripple(0.75);
  yield* waitUntil("furthest");
  yield* all(
    margin4BG().y(spaceNY[0.5], 0.75),
    ray270px1().opacity(1, 0.75),
    ray270px2().opacity(1, 0.75),
    ray270px1().end(1, 0.75),
    ray270px2().end(1, 0.75),
    ray270px1().start(0, 0.75),
    ray270px2().start(0, 0.75),
    rayBottom().opacity(1, 0.75),
    rayTop().opacity(1, 0.75),
    rayBottom().end(1, 0.75),
    rayTop().end(1, 0.75),
    rayBottom().start(0, 0.75),
    rayTop().start(0, 0.75)
  );
  yield* waitUntil("twoNeg");
  ray34().from([0, 0]);
  ray34().to([0, spaceY[1.5]]);
  ray34text().y(spaceY["0.75"]);
  yield* all(
    ray270px1().opacity(0, 0.75),
    ray270px2().opacity(0, 0.75),
    rayBottom().opacity(0, 0.75),
    rayTop().opacity(0, 0.75),
    ray270px1().end(0.5, 0.75),
    ray270px2().end(0.5, 0.75),
    rayBottom().end(0.5, 0.75),
    rayTop().end(0.5, 0.75),
    ray270px1().start(0.5, 0.75),
    ray270px2().start(0.5, 0.75),
    rayBottom().start(0.5, 0.75),
    rayTop().start(0.5, 0.75),
    margin4BG().y(spaceY[1] + 4, 0.75),
    content3Txt().text("margin-bottom: ", 0.5).to("margin-bottom: -90px", 0.5)
  );
  yield* all(
    ray34().opacity(1, 0.75),
    ray34().start(0, 0.75),
    ray34().end(1, 0.75),
    content4Txt().text("margin-top: ", 0.5).to("margin-top: 270px", 0.5),
    margin4BG().y(spaceY[2.5], 0.75),
    margin4BG().padding([spaceY["2.5"], spaceY[3]], 0.75)
  );
  yield* waitUntil("subtract");
  yield* all(
    margin4BG().y(spaceY[2], 0.75),
    ray34().from([0, 0], 0.75),
    ray34().to([0, spaceY[1]], 0.75),
    distance34(180, 0.75),
    ray34text().y(spaceY["0.5"], 0.75)
  );
  yield* waitUntil("thinkOfIt");
  yield* all(
    margin1BG().scale(0, 0.75),
    margin2BG().scale(0, 0.75),
    margin3BG().scale(0, 0.75),
    margin4BG().scale(0, 0.75),
    ray34().opacity(0, 0.75),
    ray34().start(0.5, 0.75),
    ray34().end(0.5, 0.75)
  );
  yield* waitUntil("imagine");
  const faceYou = createRef<Face>();
  const faceI = createRef<Face>();
  const bench = createRef<Line>();
  view.add(
    <>
      <Face
        ref={faceYou}
        size={spaceY[1.5]}
        highlighted
        scale={0}
        color="sky"
      />
      <Face
        ref={faceI}
        size={spaceY[1.5]}
        scale={0}
        highlighted
        color="emerald"
      />
      <Line
        ref={bench}
        points={[
          [spaceNX[5.5], spaceY[4]],
          [spaceNX[5.5], spaceY[1]],
          [spaceX[5.5], spaceY[1]],
          [spaceX[5.5], spaceY[4]],
        ]}
        stroke={colors.slate[0]}
        lineWidth={4}
        start={0.5}
        end={0.5}
        opacity={0}
      />
    </>
  );
  yield* all(
    faceYou().scale(1, 0.75),
    delay(0.5, faceI().scale(1, 0.75)),
    delay(0.5, faceYou().x(spaceX[1], 0.75)),
    delay(0.5, faceI().x(spaceNX[1], 0.75))
  );
  yield* all(bench().opacity(1, 1), bench().start(0, 1), bench().end(1, 1));
  yield* waitUntil("20px");
  const circleYou = createRef<Circle>();
  const circleI = createRef<Circle>();
  view.add(
    <>
      <Circle
        ref={circleYou}
        size={spaceY[4]}
        x={() => faceYou().position().x}
        fill={new Color(colors.sky[500]).alpha(0.3)}
        scale={0}
      />
      <Circle
        ref={circleI}
        size={spaceY[7]}
        x={() => faceI().position().x}
        fill={new Color(colors.emerald[500]).alpha(0.3)}
        scale={0}
      />
    </>
  );
  yield* all(
    circleYou().scale(1, 0.75),
    delay(0.5, faceI().x(spaceNX[1.5] - 8, 0.75))
  );
  yield* waitUntil("50px");
  yield* all(
    circleI().scale(1, 0.75),
    delay(0.5, faceYou().x(spaceX[3.5] + 7, 0.75))
  );
  yield* waitUntil("comfortable");
  yield* all(faceI().x(spaceNX[1], 1.25), faceYou().x(spaceX[3], 1.25));
  yield* waitUntil("note");
  const note1 = createRef<ExtendedTxt>();
  const note2 = createRef<ExtendedTxt>();
  const vertical = createRef<ExtendedTxt>();
  const flex = createRef<ExtendedTxt>();
  const grid = createRef<ExtendedTxt>();
  view.add(
    <>
      <Layout layout direction={"column"} gap={spaceY["0.25"]}>
        <ExtendedTxt ref={note1} fontSize={spaceY["0.5"]} />
        <ExtendedTxt ref={note2} fontSize={spaceY["0.5"]} />
      </Layout>
      <ExtendedTxt
        ref={vertical}
        text={"vertical direction"}
        fontSize={spaceY["0.5"]}
        lineWidth={2}
        stroke={colors.amber[500]}
        fill={colors.amber[500]}
        position={[322, -11]}
        opacity={0}
      />
      <ExtendedTxt
        ref={flex}
        text={"flex"}
        fontSize={spaceY["0.5"]}
        lineWidth={2}
        stroke={colors.blue[500]}
        fill={colors.blue[500]}
        position={[28, 38]}
        opacity={0}
      />
      <ExtendedTxt
        ref={grid}
        text={"grid"}
        fontSize={spaceY["0.5"]}
        lineWidth={2}
        stroke={colors.fuchsia[500]}
        fill={colors.fuchsia[500]}
        position={[172, 38]}
        opacity={0}
      />
    </>
  );
  yield* all(
    bench().opacity(0, 0.75),
    bench().start(0.5, 0.75),
    bench().end(0.5, 0.75),
    faceI().scale(0, 0.75),
    faceYou().scale(0, 0.75),
    circleI().scale(0, 0.75),
    circleYou().scale(0, 0.75)
  );
  yield* note1().text("-> Margins collapse only in the vertical direction.", 2);
  yield* vertical().opacity(1, 0.75);
  yield* waitUntil("note2");
  vertical().y(-38);
  yield* note2().text("-> No collapsing inside flex or grid containers.", 2);
  yield* waitUntil("flex");
  yield* flex().opacity(1, 0.75);
  yield* grid().opacity(1, 0.75);
  yield* all(
    vertical().opacity(0, 0.75),
    flex().opacity(0, 0.75),
    grid().opacity(0, 0.75),
    delay(0.5, note1().text("", 0.75)),
    delay(0.5, note2().text("", 0.75))
  );
  yield* waitUntil("scene7End");
});
