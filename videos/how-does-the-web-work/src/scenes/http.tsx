import { Img, Layout, makeScene2D, Ray, SVG } from "@motion-canvas/2d";
import {
  all,
  any,
  createRef,
  delay,
  fadeTransition,
  loopFor,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import {
  ExtendedFillSVG,
  ExtendedRect,
  ExtendedStrokeSVG,
  Grid,
} from "../nodes";
import colors from "../lib/colors";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import {
  Browser,
  CSS,
  HTML5,
  Image,
  JS,
  Mail,
  Music,
  Server,
} from "../lib/svgs";
import { ExtendedTxt } from "../nodes/ExtendedTxt";

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  view.add(
    <>
      {/* <Grid /> */}
    </>
  );

  yield* fadeTransition(1);

  const serverRect = createRef<ExtendedRect>();
  const serverBG = createRef<ExtendedRect>();
  const serverTxt = createRef<ExtendedTxt>();
  const serverIP = createRef<ExtendedTxt>();
  const serverSVG = createRef<ExtendedStrokeSVG>();
  const serverLayout = createRef<Layout>();
  const clientRect = createRef<ExtendedRect>();
  const clientSVG = createRef<ExtendedStrokeSVG>();
  const clientBG = createRef<ExtendedRect>();
  const clientTxt = createRef<ExtendedTxt>();
  const clientLayout = createRef<Layout>();

  view.add(
    <>
      <Layout ref={serverLayout} opacity={0}>
        <ExtendedRect
          ref={serverRect}
          width={spaceX[3]}
          height={spaceY[4]}
          layout
          direction={"column"}
          justifyContent={"center"}
          position={[spaceX[3.5], 0]}
        >
          <ExtendedStrokeSVG
            ref={serverSVG}
            svg={Server}
            size={spaceY[1]}
            alignSelf={"center"}
            lineWidth={1}
          />
        </ExtendedRect>
        <ExtendedRect
          ref={serverBG}
          width={spaceX["1.25"]}
          height={spaceY["0.67"]}
          position={serverRect().bottom}
        >
          <ExtendedTxt ref={serverTxt} text={"Server"} fontWeight={600} />
        </ExtendedRect>
        <ExtendedTxt ref={serverIP} position={[spaceX["3.5"], spaceY[3]]} />
      </Layout>
      <Layout ref={clientLayout} opacity={0}>
        <ExtendedRect
          ref={clientRect}
          width={spaceX[3]}
          height={spaceY[4]}
          layout
          direction={"column"}
          justifyContent={"center"}
          position={[spaceNX[3.5], 0]}
        >
          <ExtendedStrokeSVG
            ref={clientSVG}
            svg={Browser}
            size={spaceY[1]}
            alignSelf={"center"}
            lineWidth={0.5}
          />
        </ExtendedRect>
        <ExtendedRect
          ref={clientBG}
          width={spaceX["1.5"]}
          height={spaceY["0.67"]}
          position={clientRect().bottom}
        >
          <ExtendedTxt ref={clientTxt} text={"Browser"} fontWeight={600} />
        </ExtendedRect>
      </Layout>
    </>
  );

  serverSVG().stroke(serverRect().stroke());
  serverBG().fill(serverRect().stroke());
  serverBG().stroke(null);
  serverTxt().fill(colors[serverRect().colorSignal()][950]);
  clientSVG().stroke(clientRect().stroke());
  clientBG().fill(clientRect().stroke());
  clientBG().stroke(null);
  clientTxt().fill(colors[clientRect().colorSignal()][950]);

  yield* all(
    serverLayout().opacity(1, 1),
    delay(0.5, serverIP().text("8.9.8.112", 1)),
    delay(0.5, serverSVG().write()),
    delay(1, clientLayout().opacity(1, 1)),
    delay(1.25, clientSVG().write())
  );

  const requestRay = createRef<Ray>();
  const request = createRef<ExtendedTxt>();

  view.add(
    <>
      <Ray
        ref={requestRay}
        lineWidth={4}
        endArrow
        from={[clientRect().right().x, spaceY[0]]}
        to={[serverRect().left().x, spaceY[0]]}
        stroke={clientRect().stroke()}
        lineCap={"round"}
        lineDash={[10, 20]}
        arrowSize={18}
        startOffset={spaceX["0.25"]}
        endOffset={spaceX["0.25"]}
        end={0}
      />
      <ExtendedTxt ref={request} y={spaceNY["0.33"]} />
    </>
  );

  yield* all(requestRay().end(1, 1), request().text("Request", 1));

  yield* waitUntil("communicate");
  yield* all(
    requestRay().end(0, 1),
    requestRay().opacity(0, 1),
    request().text("", 1),
    serverIP().text("", 1)
  );

  const httpText = createRef<ExtendedTxt>();
  const messages = createRef<Layout>();
  const request2 = createRef<ExtendedTxt>();
  const requestItems = createRef<Layout>();
  const responseItems = createRef<Layout>();

  view.add(
    <>
      <ExtendedTxt
        ref={httpText}
        fontSize={spaceY["0.5"]}
        fontWeight={600}
        textAlign={"center"}
        y={spaceNY[4]}
      />
      <Layout ref={messages} clip height={spaceY[4]} width={spaceX[3.5]}>
        <Layout
          ref={requestItems}
          layout
          direction={"row"}
          gap={spaceY["0.25"]}
          y={spaceNY[1]}
          x={spaceNX[2.75]}
          alignItems={"center"}
        >
          <SVG svg={Mail} size={spaceY[0.5]} fill={colors.slate[0]} />
          <ExtendedTxt ref={request2} text={"Request"} />
        </Layout>

        <Layout
          ref={responseItems}
          layout
          direction={"row"}
          gap={spaceX[1]}
          position={[spaceX[5.25], spaceY[1]]}
        >
          <SVG svg={HTML5} size={spaceY[0.5]} />
          <SVG svg={CSS} size={spaceY[0.5]} />
          <SVG svg={JS} size={spaceY[0.5]} />
          <SVG svg={Image} size={spaceY[0.5]} fill={colors.slate[0]} />
          <SVG svg={Music} size={spaceY[0.5]} fill={colors.slate[0]} />
        </Layout>
      </Layout>
    </>
  );

  yield* any(
    requestItems().x(spaceX[2.75], 3),
    delay(1, responseItems().x(spaceNX[5.25], 3))
  );

  yield* waitUntil("http");
  yield* httpText().text("HyperText Transfer Protocol\n(HTTP)", 2.5);

  const communicationRay1 = createRef<Ray>();
  const communicationRay2 = createRef<Ray>();
  view.add(
    <>
      <Ray
        ref={communicationRay1}
        lineWidth={4}
        from={[clientRect().right().x, spaceNY[0.75]]}
        to={[serverRect().left().x, spaceNY[0.75]]}
        stroke={clientRect().stroke()}
        lineCap={"round"}
        lineDash={[10, 20]}
        endArrow
        arrowSize={18}
        startOffset={spaceX["0.25"]}
        endOffset={spaceX["0.25"]}
        end={0}
        opacity={0}
      />
      <Ray
        ref={communicationRay2}
        lineWidth={4}
        from={[serverRect().left().x, spaceY[0.75]]}
        to={[clientRect().right().x, spaceY[0.75]]}
        stroke={serverRect().stroke()}
        lineCap={"round"}
        lineDash={[10, 20]}
        endArrow
        arrowSize={18}
        startOffset={spaceX["0.25"]}
        endOffset={spaceX["0.25"]}
        end={0}
        opacity={0}
      />
    </>
  );

  yield* waitUntil("definesLanguage");
  yield* all(
    communicationRay1().end(1, 1),
    communicationRay2().end(1, 1),
    communicationRay1().opacity(1, 1),
    communicationRay2().opacity(1, 1),
    communicationRay1().lineDashOffset(-spaceX[3], 6),
    communicationRay2().lineDashOffset(-spaceX[3], 6)
  );
  yield* all(
    httpText().y(spaceNY["4"], 1),
    communicationRay1().end(0, 1),
    communicationRay1().opacity(0, 1),
    communicationRay2().end(0, 1),
    communicationRay2().opacity(0, 1),
    serverRect().highlight()
  );

  yield* loopFor(3, () => serverRect().ripple(1));

  const ifPageRay = createRef<Ray>();
  const responseItems2 = createRef<Layout>();
  const ifPageTxt = createRef<ExtendedTxt>();

  view.add(
    <>
      <Layout clip height={spaceY[4]} width={spaceX[3.5]}>
        <Ray
          ref={ifPageRay}
          lineWidth={4}
          endArrow
          from={[serverRect().left().x, spaceNY[1]]}
          to={[clientRect().right().x, spaceNY[1]]}
          stroke={colors.slate[0]}
          lineCap={"round"}
          lineDash={[10, 20]}
          arrowSize={18}
          startOffset={spaceX["0.25"]}
          endOffset={spaceX["0.25"]}
          end={0}
          opacity={0}
        />
        <ExtendedTxt
          ref={ifPageTxt}
          y={spaceNY[1]}
          textAlign={"center"}
          text={'If page exists,\n\n"200 OK"'}
          opacity={0}
        />
        <Layout
          ref={responseItems2}
          layout
          direction={"row"}
          gap={spaceX[1]}
          position={[spaceX[5.25], spaceY[1]]}
        >
          <SVG svg={HTML5} size={spaceY[0.5]} />
          <SVG svg={CSS} size={spaceY[0.5]} />
          <SVG svg={JS} size={spaceY[0.5]} />
          <SVG svg={Image} size={spaceY[0.5]} fill={colors.slate[0]} />
          <SVG svg={Music} size={spaceY[0.5]} fill={colors.slate[0]} />
        </Layout>
      </Layout>
    </>
  );

  yield* all(
    ifPageRay().end(1, 1),
    ifPageRay().opacity(1, 1),
    ifPageTxt().opacity(1, 1),
    delay(3, responseItems2().x(spaceNX["5.25"], 5))
  );

  yield* waitUntil("butIf");
  yield* all(
    ifPageRay().end(0, 1),
    ifPageRay().opacity(0, 1),
    ifPageTxt().opacity(0, 1)
  );

  ifPageTxt().text('If page doesn\'t exist,\n\n"404 Not Found"');
  ifPageTxt().y(0);
  ifPageRay().from([serverRect().left().x, spaceY[0]]);
  ifPageRay().to([clientRect().right().x, spaceY[0]]);

  yield* waitUntil("404");
  yield* all(
    ifPageRay().end(1, 1),
    ifPageRay().opacity(1, 1),
    ifPageTxt().opacity(1, 1)
  );

  yield* waitUntil("sceneEnd");
});
