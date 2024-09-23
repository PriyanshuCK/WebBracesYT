import {
  Img,
  Layout,
  LayoutProps,
  makeScene2D,
  Path,
  QuadBezier,
  Ray,
  Rect,
} from "@motion-canvas/2d";
import {
  all,
  createRef,
  createRefMap,
  createSignal,
  delay,
  fadeTransition,
  linear,
  PossibleVector2,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { ExtendedRect, ExtendedStrokeSVG, Grid } from "../nodes";
import colors from "../lib/colors";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import { Computer, Server } from "../lib/svgs";

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  view.add(<>{/* <Grid /> */}</>);

  yield* fadeTransition(1);

  class WebNode extends Layout {
    constructor({
      position,
      nodeTitle,
      svgSrc,
      sizeX,
      ...props
    }: LayoutProps & {
      position: PossibleVector2;
      nodeTitle: string;
      svgSrc: string;
      sizeX: number;
    }) {
      super({
        layout: true,
        direction: "column",
        gap: spaceY["0.25"],
        alignItems: "center",
        position: position,
        zIndex: 3,
        ...props,
      });

      const rectRef = createRef<ExtendedRect>();
      const svgRef = createRef<ExtendedStrokeSVG>();
      const clientSize = spaceY["1.5"];
      this.add(
        <>
          <ExtendedRect
            ref={rectRef}
            size={clientSize * sizeX}
            radius={(clientSize * sizeX) / 2}
          >
            <ExtendedStrokeSVG
              ref={svgRef}
              svg={svgSrc}
              lineWidth={1}
              size={(clientSize * sizeX) / 2}
              layout={false}
            />
          </ExtendedRect>
          <ExtendedTxt text={nodeTitle} fontSize={sizeX * spaceY["0.33"]} />
        </>
      );
      svgRef().stroke(rectRef().stroke());
      rectRef().fill(colors.zinc[950]);
      const paths = svgRef().wrapper.children() as Path[];
      for (const path of paths) {
        path.end(1);
      }
    }
  }

  const tcpText = createRef<ExtendedTxt>();
  const ipText = createRef<ExtendedTxt>();
  const webNodes = createRefMap<WebNode>();
  const packets = createRefMap<Rect>();
  const texts = createRefMap<ExtendedTxt>();
  const beziers = createRefMap<QuadBezier>();
  const progress1 = createSignal(0);
  const progress2 = createSignal(0);
  const progress3 = createSignal(0);
  const progress4 = createSignal(0);

  view.add(
    <>
      <ExtendedTxt
        ref={tcpText}
        fontSize={spaceY["0.5"]}
        y={spaceNY["0.5"]}
        text={"1. Transmission Control Protocol (TCP)"}
        textAlign={"center"}
        opacity={0}
      />
      <ExtendedTxt
        ref={ipText}
        fontSize={spaceY["0.5"]}
        y={spaceY["0.5"]}
        text={"2. Internet Protocol (IP)"}
        textAlign={"center"}
        opacity={0}
      />
      <WebNode
        ref={webNodes.client}
        position={[spaceNX[6], spaceNY[4]]}
        nodeTitle="Client"
        svgSrc={Computer}
        sizeX={1}
      />
      <WebNode
        ref={webNodes.server}
        position={[spaceX[8], spaceNY[4]]}
        nodeTitle="Server"
        svgSrc={Server}
        sizeX={1}
      />
      {/* <Ray
        lineWidth={2}
        stroke={colors.slate[0]}
        lineCap={"round"}
        lineDash={[5, 10]}
        from={[spaceNX[8], spaceY[1.25]]}
        to={[spaceX[9], spaceY[1.25]]}
      />
      <Ray
        lineWidth={2}
        stroke={colors.slate[0]}
        lineCap={"round"}
        lineDash={[5, 10]}
        from={[spaceNX[8], spaceNY[2.5]]}
        to={[spaceX[9], spaceNY[2.5]]}
      /> */}
      <Rect
        ref={packets.t1}
        size={spaceX["0.5"]}
        fill={colors.slate[0]}
        position={() => beziers.t1().getPointAtPercentage(progress1()).position}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <ExtendedTxt
          ref={texts.t1}
          text={"1/4"}
          fill={colors.slate[900]}
          fontSize={spaceY["0.25"]}
          layout
        />
      </Rect>
      <Rect
        ref={packets.t2}
        size={spaceX["0.5"]}
        fill={colors.slate[0]}
        position={() => beziers.t2().getPointAtPercentage(progress2()).position}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <ExtendedTxt
          ref={texts.t2}
          text={"2/4"}
          fill={colors.slate[900]}
          fontSize={spaceY["0.25"]}
          layout
        />
      </Rect>
      <Rect
        ref={packets.t3}
        size={spaceX["0.5"]}
        fill={colors.slate[0]}
        position={() => beziers.t3().getPointAtPercentage(progress3()).position}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <ExtendedTxt
          ref={texts.t3}
          text={"3/4"}
          fill={colors.slate[900]}
          fontSize={spaceY["0.25"]}
          layout
        />
      </Rect>
      <Rect
        ref={packets.t4}
        size={spaceX["0.5"]}
        fill={colors.slate[0]}
        position={() => beziers.t4().getPointAtPercentage(progress4()).position}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <ExtendedTxt
          ref={texts.t4}
          text={"4/4"}
          fill={colors.slate[900]}
          fontSize={spaceY["0.25"]}
          layout
        />
      </Rect>
      <QuadBezier
        ref={beziers.t1}
        p0={[spaceNX[6.25], spaceNY[1.75]]}
        p1={[spaceNX[1], spaceY[1]]}
        p2={[spaceX[7.75], spaceNY[1.25]]}
      />
      <QuadBezier
        ref={beziers.t2}
        p0={[spaceNX[5.75], spaceNY["1.75"]]}
        p1={[spaceNX[1], spaceY[1]]}
        p2={[spaceX[8.25], spaceNY[1.25]]}
      />
      <QuadBezier
        ref={beziers.t3}
        p0={[spaceNX[6.25], spaceNY["1.25"]]}
        p1={[spaceNX[1], spaceY[1]]}
        p2={[spaceX[7.75], spaceNY[1.75]]}
      />
      <QuadBezier
        ref={beziers.t4}
        p0={[spaceNX[5.75], spaceNY["1.25"]]}
        p1={[spaceNX[1], spaceY[1]]}
        p2={[spaceX[8.25], spaceNY[1.75]]}
      />
      <ExtendedTxt
        ref={texts.lost}
        text={'Packet "3/4" lost due\nto a technical failure'}
        textAlign={"center"}
        y={spaceY["0.67"]}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.ensure}
        text={"TCP ensures that the lost packet is resent \nand all the packets arive in the correct order."}
        textAlign={"center"}
        y={spaceY["0.67"]}
        opacity={0}
      />
    </>
  );

  webNodes.client().scale(0);
  webNodes.server().scale(0);
  packets.t1().scale(0);
  packets.t2().scale(0);
  packets.t3().scale(0);
  packets.t4().scale(0);
  yield* all(tcpText().opacity(1, 1), delay(1, ipText().opacity(1, 1)));

  yield* waitUntil("efficiently");

  yield* all(
    tcpText().rotation(-90, 1),
    tcpText().fontSize(spaceY["0.33"], 1),
    tcpText().text("Transmission Control\nProtocol", 1),
    tcpText().position([spaceNX[9], spaceNY[0.67]], 1),
    ipText().rotation(-90, 1),
    ipText().fontSize(spaceY["0.33"], 1),
    ipText().opacity(0.5, 1),
    ipText().text("Internet\nProtocol", 1),
    ipText().position([spaceNX[9], spaceY[3.25]], 1),
    webNodes.client().scale(1, 1),
    webNodes.server().scale(1, 1),
    packets.t1().scale(1, 1),
    packets.t2().scale(1, 1),
    packets.t3().scale(1, 1),
    packets.t4().scale(1, 1)
  );

  yield* all(
    progress1(1, 1.5),
    delay(0.25, progress2(1, 1.5)),
    delay(0.5, progress3(0.6, 1.5)),
    delay(0.75, progress4(1, 1.5)),
    delay(1, packets.t3().opacity(0, 1)),
    delay(0.75, texts.lost().opacity(1, 1)),
    delay(2, texts.lost().opacity(0, 1)),
    delay(3, texts.ensure().opacity(1, 1))
  );

  progress3(0);

  yield* all(packets.t3().opacity(1, 0.5), delay(0.1, progress3(1, 1)));

  view.add(
    <>
      <Rect
        ref={packets.ip}
        fill={colors.slate[0]}
        layout
        direction={"column"}
        padding={spaceY["0.25"]}
        y={spaceY[3]}
        opacity={0}
      >
        <ExtendedTxt ref={texts.ips} fill={colors.slate[900]} />
        <ExtendedTxt ref={texts.ipd} fill={colors.slate[900]} />
      </Rect>
      <ExtendedTxt ref={texts.ip} y={spaceY[4]} />
    </>
  );
  yield* waitFor(1);
  yield* all(
    beziers.t1().p2([spaceX[7.75], spaceNY[1.75]], 0.5),
    beziers.t2().p2([spaceX[8.25], spaceNY[1.75]], 0.5),
    beziers.t3().p2([spaceX[7.75], spaceNY[1.25]], 0.5),
    beziers.t4().p2([spaceX[8.25], spaceNY[1.25]], 0.5)
  );

  yield* all(
    delay(1,packets.t1().scale(0, 1)),
    delay(1,packets.t2().scale(0, 1)),
    delay(1,packets.t3().scale(0, 1)),
    delay(1, packets.t4().scale(0, 1)),
    tcpText().opacity(0.5, 1),
    ipText().opacity(1, 1),
    texts.ensure().opacity(0, 1),
    packets.ip().opacity(1, 1),
    texts.ip().text("Data Packet", 1),
    delay(0.5, texts.ips().text("Source IP: 192.0.2.231", 2)),
    delay(1, texts.ipd().text("Destination IP: 198.35.26.96", 2))
  );

  yield* waitUntil("sceneEnd");
});
