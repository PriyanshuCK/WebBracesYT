import {
  Camera,
  Circle,
  Img,
  is,
  Layout,
  LayoutProps,
  Line,
  makeScene2D,
  Node,
  Path,
  Ray,
  RayProps,
  Rect,
} from "@motion-canvas/2d";
import {
  all,
  any,
  Color,
  createRef,
  createRefMap,
  createSignal,
  delay,
  Direction,
  easeInCubic,
  easeInOutCirc,
  easeOutCubic,
  easeOutQuad,
  fadeTransition,
  linear,
  PossibleVector2,
  slideTransition,
  Vector2,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import {
  ExtendedCircle,
  ExtendedRect,
  ExtendedStrokeSVG,
  Grid,
} from "../nodes";
import colors from "../lib/colors";
import { Browser, Computer, Router, Server } from "../lib/svgs";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import { ExtendedTxt } from "../nodes/ExtendedTxt";

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  // view.add(<> <Grid /></>);
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

  class ConnectionRay extends Ray {
    constructor({ ...props }: RayProps) {
      super({
        lineWidth: 2,
        stroke: colors.slate[0],
        lineCap: "round",
        lineDash: [5, 10],
        ...props,
      });
    }
  }

  const webNodes = createRefMap<WebNode>();
  const paths = createRefMap<Line>();
  const progress1 = createSignal(0);
  const progress2 = createSignal(0);
  const progress1r = createSignal(1);
  const progress2r = createSignal(1);
  const camera = createRef<Camera>();
  const node = createRef<Layout>();
  const singleChunk = createRef<Rect>();
  const rippleCircle = createRef<Circle>();

  view.add(
    <>
      <Camera ref={camera}>
        <Layout ref={node}>
          <WebNode
            ref={webNodes.client1}
            position={[spaceNX[8], spaceY[4]]}
            nodeTitle={"Client 1"}
            svgSrc={Computer}
            sizeX={1}
          />
          <WebNode
            ref={webNodes.client2}
            position={[spaceNX[5], spaceY[4]]}
            nodeTitle={"Client 2"}
            svgSrc={Computer}
            sizeX={1}
          />
          <WebNode
            ref={webNodes.client3}
            position={[spaceNX[8], spaceY[1]]}
            nodeTitle={"Client 3"}
            svgSrc={Computer}
            sizeX={1}
          />
          <WebNode
            ref={webNodes.server}
            position={[spaceX[8], spaceNY[4]]}
            nodeTitle={"Server 1"}
            svgSrc={Server}
            sizeX={1}
          />
          <WebNode
            ref={webNodes.router1}
            position={[spaceX[4], spaceNY[2]]}
            nodeTitle={"Router"}
            svgSrc={Router}
            sizeX={0.75}
          />
          <WebNode
            ref={webNodes.router2}
            position={[spaceX[3], spaceY[1]]}
            nodeTitle={"Router"}
            svgSrc={Router}
            sizeX={0.75}
          />
          <WebNode
            ref={webNodes.router3}
            position={[spaceX[0], spaceY[0]]}
            nodeTitle={"Router"}
            svgSrc={Router}
            sizeX={0.75}
          />
          <WebNode
            ref={webNodes.router4}
            position={[spaceX[0], spaceY[3]]}
            nodeTitle={"Router"}
            svgSrc={Router}
            sizeX={0.75}
          />
          <WebNode
            ref={webNodes.router5}
            position={[spaceNX[1], spaceNY[3]]}
            nodeTitle={"Router"}
            svgSrc={Router}
            sizeX={0.75}
          />
          <WebNode
            ref={webNodes.router6}
            position={[spaceNX[4], spaceNY[1]]}
            nodeTitle={"Router"}
            svgSrc={Router}
            sizeX={0.75}
          />
          <ConnectionRay
            from={webNodes.server().left()}
            to={webNodes.router1().top()}
          />
          <ConnectionRay
            from={webNodes.server().left()}
            to={webNodes.router2().right()}
          />
          <ConnectionRay
            from={webNodes.router1().left()}
            to={webNodes.router3().right()}
          />
          <ConnectionRay
            from={webNodes.router1().left()}
            to={webNodes.router5().right()}
          />
          <ConnectionRay
            from={webNodes.router1().left()}
            to={webNodes.router6().right()}
          />
          <ConnectionRay
            from={webNodes.router2().left()}
            to={webNodes.router4().right()}
          />
          <ConnectionRay
            from={webNodes.router4().left()}
            to={webNodes.router6().right()}
          />
          <ConnectionRay
            from={webNodes.router5().left()}
            to={webNodes.router6().right()}
          />
          <ConnectionRay
            from={webNodes.router4().left()}
            to={webNodes.client2().right()}
          />
          <ConnectionRay
            from={webNodes.router6().left()}
            to={webNodes.client3().top()}
          />
          <ConnectionRay
            from={webNodes.router3().left()}
            to={webNodes.client1().top()}
          />
          <ConnectionRay
            from={webNodes.router3().left()}
            to={webNodes.client2().right()}
          />
          <ConnectionRay
            from={webNodes.server().left()}
            to={[spaceX[5.5], spaceNY[5]]}
          />
          <ConnectionRay
            from={webNodes.router1().top()}
            to={[spaceX[4], spaceNY[4.5]]}
          />
          <ConnectionRay
            from={webNodes.router2().right()}
            to={[spaceX[5], spaceY[2]]}
          />
          <ConnectionRay
            from={webNodes.router4().right()}
            to={[spaceX[1.5], spaceY[4]]}
          />
          <ConnectionRay
            from={webNodes.router5().top()}
            to={[spaceNX[1], spaceNY[5]]}
          />
          <ConnectionRay
            from={webNodes.router6().top()}
            to={[spaceNX[4.5], spaceNY[3]]}
          />

          <Line
            ref={paths.s156c3}
            lineWidth={0}
            radius={spaceX[2]}
            points={[
              webNodes.server().middle(),
              webNodes.server().left(),
              webNodes.router1().top(),
              webNodes.router1().middle(),
              webNodes.router1().left(),
              webNodes.router5().right(),
              [
                webNodes.router5().middle().x,
                webNodes.router5().middle().y - spaceY["0.25"],
              ],
              webNodes.router5().left(),
              webNodes.router6().right(),
              [
                webNodes.router6().middle().x,
                webNodes.router6().middle().y - spaceY["0.25"],
              ],
              webNodes.router6().left(),
              webNodes.client3().top(),
              webNodes.client3().middle(),
            ]}
          />
          <Line
            ref={paths.s16c3}
            lineWidth={0}
            radius={spaceX[2]}
            points={[
              webNodes.server().middle(),
              webNodes.server().left(),
              webNodes.router1().top(),
              webNodes.router1().middle(),
              webNodes.router1().left(),
              webNodes.router6().right(),
              [
                webNodes.router6().middle().x,
                webNodes.router6().middle().y - spaceY["0.25"],
              ],
              webNodes.router6().left(),
              webNodes.client3().top(),
              webNodes.client3().middle(),
            ]}
          />
          <Line
            ref={paths.s13c1}
            lineWidth={0}
            radius={spaceX[2]}
            points={[
              webNodes.server().middle(),
              webNodes.server().left(),
              webNodes.router1().top(),
              webNodes.router1().middle(),
              webNodes.router1().left(),
              webNodes.router3().right(),
              [
                webNodes.router3().middle().x,
                webNodes.router3().middle().y - spaceY["0.25"],
              ],
              webNodes.router3().left(),
              webNodes.client1().top(),
              webNodes.client1().middle(),
            ]}
          />
          <Line
            ref={paths.s24c2}
            lineWidth={0}
            radius={spaceX[2]}
            points={[
              webNodes.server().middle(),
              webNodes.server().left(),
              webNodes.router2().right(),
              webNodes.router2().middle(),
              webNodes.router2().left(),
              webNodes.router4().right(),
              [
                webNodes.router4().middle().x,
                webNodes.router4().middle().y - spaceY["0.25"],
              ],
              webNodes.router4().left(),
              webNodes.client2().right(),
              webNodes.client2().middle(),
            ]}
          />
          <Line
            ref={paths.r3Initial}
            lineWidth={0}
            radius={spaceX[2]}
            points={[
              [spaceX[2], spaceNY[8]],
              webNodes.router2().middle(),
              webNodes.router3().middle(),
            ]}
          />
          <Line
            ref={paths.s12}
            lineWidth={0}
            radius={spaceX[2]}
            points={[
              webNodes.server().middle(),
              webNodes.server().left(),
              webNodes.router2().right(),
              [
                webNodes.router2().middle().x,
                webNodes.router2().middle().y - spaceY["0.25"],
              ],
            ]}
          />
          <Line
            ref={paths.s13c2}
            lineWidth={0}
            radius={spaceX[2]}
            points={[
              webNodes.server().middle(),
              webNodes.server().left(),
              webNodes.router1().top(),
              webNodes.router1().middle(),
              webNodes.router1().left(),
              webNodes.router3().right(),
              [
                webNodes.router3().middle().x,
                webNodes.router3().middle().y - spaceY["0.25"],
              ],
              webNodes.router3().left(),
              webNodes.client2().right(),
              webNodes.client2().middle(),
            ]}
          />
          <Rect
            zIndex={1}
            size={spaceY[0.33]}
            fill={"white"}
            position={() =>
              paths.s156c3().getPointAtPercentage(progress1r()).position
            }
            rotation={() =>
              paths.s156c3().getPointAtPercentage(progress1r()).normal.flipped
                .perpendicular.degrees
            }
          />
          <Rect
            zIndex={1}
            size={spaceY[0.33]}
            fill={"white"}
            position={() =>
              paths.s16c3().getPointAtPercentage(progress2r()).position
            }
            rotation={() =>
              paths.s16c3().getPointAtPercentage(progress2r()).normal.flipped
                .perpendicular.degrees
            }
          />
          <Rect
            zIndex={1}
            size={spaceY[0.33]}
            fill={"white"}
            position={() =>
              paths.s13c1().getPointAtPercentage(progress1r()).position
            }
            rotation={() =>
              paths.s13c1().getPointAtPercentage(progress1r()).normal.flipped
                .perpendicular.degrees
            }
          />
          <Rect
            zIndex={1}
            size={spaceY[0.33]}
            fill={"white"}
            position={() =>
              paths.s24c2().getPointAtPercentage(progress2r()).position
            }
            rotation={() =>
              paths.s24c2().getPointAtPercentage(progress2r()).normal.flipped
                .perpendicular.degrees
            }
          />
          <Rect
            ref={singleChunk}
            zIndex={1}
            size={spaceY[0.75]}
            fill={"white"}
            position={() =>
              paths.s12().getPointAtPercentage(progress1()).position
            }
            rotation={() =>
              paths.s12().getPointAtPercentage(progress1()).normal.flipped
                .perpendicular.degrees
            }
          />
          <Rect
            zIndex={1}
            size={spaceY[0.33]}
            fill={"white"}
            position={() =>
              paths.s13c2().getPointAtPercentage(progress2()).position
            }
            rotation={() =>
              paths.s13c2().getPointAtPercentage(progress2()).normal.flipped
                .perpendicular.degrees
            }
          />
          <Circle
            ref={rippleCircle}
            size={spaceY[1]}
            stroke={colors.slate[0]}
            lineWidth={4}
            position={[
              webNodes.router2().middle().x,
              webNodes.router2().middle().y - spaceY["0.25"],
            ]}
            scale={0}
            zIndex={3}
          />
        </Layout>
      </Camera>
    </>
  );

  camera().position([spaceX[2], spaceNY[8]]);
  camera().zoom(2);
  yield* any(
    camera().followCurve(paths.r3Initial(), 4, easeOutQuad),
    progress1r(0, 5, linear),
    delay(1, progress2r(0, 5, linear))
  );
  yield* all(
    camera().zoom(1.4, 3),
    camera().centerOn(webNodes.router1().middle(), 3),
    delay(6, webNodes.router2().opacity(0.25, 1)),
    delay(5.75, singleChunk().opacity(0, 0.5)),
    delay(5.75, rippleCircle().scale(1.5, 2)),
    delay(5.75, rippleCircle().opacity(0, 2)),
    delay(3, progress1(1, 3, linear))
  );
  singleChunk().size(spaceY["0.33"]);
  singleChunk().opacity(1);
  progress1(0);
  rippleCircle().opacity(1);
  rippleCircle().scale(0);
  yield* waitUntil("dataIsSent");
  yield* any(
    delay(4, camera().reset(5)),
    webNodes.router2().opacity(1, 1),
    progress1r(1, 4, linear),
    delay(1, progress2r(1, 4, linear)),
    delay(1.5, progress1(1, 3, linear))
  );

  yield* all(
    delay(3.5, webNodes.router2().opacity(0.25, 1)),
    delay(3.5, singleChunk().opacity(0, 0.5)),
    delay(3.5, singleChunk().opacity(0, 0.5)),
    delay(3, rippleCircle().scale(1.5, 2)),
    delay(3, rippleCircle().opacity(0, 2))
  );

  rippleCircle().opacity(1);
  rippleCircle().scale(0);
  rippleCircle().position(webNodes.server().left());
  progress1r(0);
  progress2r(0)

  yield* any(
    delay(0.5, progress2(1, 4, linear)),
    rippleCircle().scale(1.5, 2),
    rippleCircle().stroke(new Color("#000").alpha(0), 2),
  );
  yield* all(
    progress2r(1, 6, linear),
    delay(1, progress1r(1, 6, linear)),
    webNodes.router2().opacity(1, 1),
  )

  yield* waitUntil("sceneEnd");
});
