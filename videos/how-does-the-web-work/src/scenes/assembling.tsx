import {
  Code,
  Img,
  Layout,
  lines,
  makeScene2D,
  Ray,
  Rect,
  SVG,
} from "@motion-canvas/2d";
import {
  all,
  Color,
  createRef,
  delay,
  fadeTransition,
  loopFor,
  PossibleColor,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import {
  ExtendedFillSVG,
  ExtendedRect,
  ExtendedStrokeSVG,
  Grid,
  HTMLCode,
  Window,
} from "../nodes";
import colors from "../lib/colors";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import { Search, Server, WebsiteSkeleton } from "../lib/svgs";

const htmlCodeString = `\
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My First Webpage</title>
        <link rel="stylesheet" href="styles.css">
    </head>

    <body>
        <section>
            <p>This is a paragraph.</p>
            <h2>This is a Heading</h2>
            <img src="https://example.com/images/image.png" alt="An example image" />
            <video width="320" height="240" controls>
                <source src="movie.mp4" type="video/mp4">
            </video>
            <audio controls>
                <source src="audio.mp3" type="audio/mpeg">
            </audio>
            <a href="https://youtube.com/@channelName?sub_confirmation=1">Subscribe</a>
        </section>
        <script src="scripts.js"></script>
    </body>

</html>`;

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  view.add(<>{/* <Grid /> */}</>);

  yield* fadeTransition(1);
  const window = createRef<Window>();
  const htmlCode = createRef<Code>();
  const maskTop = createRef<Rect>();
  const maskBottom = createRef<Rect>();

  view.add(
    <>
      <Rect
        ref={maskTop}
        fill={colors.zinc[950]}
        width={spaceX[20]}
        height={spaceY[1]}
        shadowBlur={spaceY[0.5]}
        shadowColor={colors.zinc[950]}
        shadowOffsetY={spaceY[0.75]}
        position={[spaceX[0], spaceNY[5.5]]}
        zIndex={1}
      />
      <Rect
        ref={maskBottom}
        fill={colors.zinc[950]}
        width={spaceX[20]}
        height={spaceY[1]}
        shadowBlur={spaceY[0.5]}
        shadowColor={colors.zinc[950]}
        shadowOffsetY={spaceNY[0.75]}
        position={[spaceX[0], spaceY[5.5]]}
        zIndex={1}
      />
      <HTMLCode
        ref={htmlCode}
        opacity={0}
        x={spaceX[0]}
        y={spaceY[2]}
        code={htmlCodeString}
      />
    </>
  );
  yield* htmlCode().opacity(1, 1);
  yield* waitUntil("links");
  yield* all(
    delay(0.25, htmlCode().y(spaceNY[0.75], 1)),
    delay(1.67, htmlCode().selection(lines(14), 0.5)),
    delay(2.33, htmlCode().selection(lines(15, 17), 0.5)),
    delay(3, htmlCode().selection(lines(18, 20), 0.5)),
    delay(3.67, htmlCode().selection(lines(7), 0.5)),
    delay(4.33, htmlCode().selection(lines(23), 0.5))
  );
  yield* waitUntil("whenItFinds");

  const serverRect = createRef<ExtendedRect>();
  const serverBG = createRef<ExtendedRect>();
  const serverTxt = createRef<ExtendedTxt>();
  const serverSVG = createRef<ExtendedStrokeSVG>();
  const serverLayout = createRef<Layout>();
  const requestRay = createRef<Ray>();
  const request = createRef<ExtendedTxt>();
  const webSkeleton = createRef<SVG>();

  view.add(
    <>
      <Window ref={window} x={spaceNX[4]} width={spaceX[8]} opacity={0}>
        <SVG
          ref={webSkeleton}
          svg={WebsiteSkeleton}
          width={"100%"}
          height={spaceY[8.5]}
          opacity={0}
          scale={0.95}
        />
      </Window>
      <Layout ref={serverLayout} opacity={0}>
        <ExtendedRect
          ref={serverRect}
          width={spaceX[3]}
          height={spaceY[4]}
          layout
          direction={"column"}
          justifyContent={"center"}
          position={[spaceX[6.5], 0]}
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
      </Layout>
      <Ray
        ref={requestRay}
        lineWidth={4}
        endArrow
        from={[window().right().x, spaceY[0]]}
        to={[serverRect().left().x, spaceY[0]]}
        stroke={window().stroke()}
        lineCap={"round"}
        lineDash={[10, 20]}
        arrowSize={18}
        startOffset={spaceX["0.25"]}
        endOffset={spaceX["0.25"]}
        end={0}
        opacity={0}
      />
      <ExtendedTxt ref={request} y={spaceNY["0.33"]} x={spaceX["2.5"]} />
    </>
  );

  serverSVG().stroke(serverRect().stroke());
  serverBG().fill(serverRect().stroke());
  serverBG().stroke(null);
  serverTxt().fill(colors[serverRect().colorSignal()][950]);

  yield* all(
    htmlCode().opacity(0, 1),
    maskTop().opacity(0, 1),
    maskBottom().opacity(0, 1),
    window().opacity(1, 1),
    serverLayout().opacity(1, 1),
    serverSVG().write(0.1),
    delay(1, requestRay().end(1, 2)),
    delay(1, requestRay().opacity(1, 1)),
    delay(1, request().text("Request", 2))
  );

  yield* waitUntil("theEntire");

  yield* all(
    request().opacity(0, 1),
    requestRay().end(0, 1),
    requestRay().opacity(0, 1)
  );

  const communicationRay1 = createRef<Ray>();
  const communicationRay2 = createRef<Ray>();
  view.add(
    <>
<Ray
  ref={communicationRay1}
  lineWidth={4}
  from={[window().right().x, spaceNY[0.75]]}
  to={[serverRect().left().x, spaceNY[0.75]]}
  stroke={window().stroke()}
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
        to={[window().right().x, spaceY[0.75]]}
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

  yield* all(
    communicationRay1().end(1, 1),
    delay(1, communicationRay2().end(1, 1)),
    communicationRay1().opacity(1, 1),
    delay(1, communicationRay2().opacity(1, 1)),
    delay(2, communicationRay1().lineDashOffset(-spaceX[1], 3)),
    delay(2, communicationRay2().lineDashOffset(-spaceX[1], 3))
  );

  yield* all(
    communicationRay1().end(0, 1),
    communicationRay1().opacity(0, 1),
    communicationRay2().end(0, 1),
    communicationRay2().opacity(0, 1),
    serverLayout().scale(0, 1),
    window().x(0, 1)
  );
  window().fill(new Color(window().stroke() as PossibleColor).alpha(0.1));
  yield* all(loopFor(3, () => window().ripple(1)));

  yield* all(
    window().fill(null, 0.5),
    delay(0.5, webSkeleton().opacity(1, 1)),
    delay(0.5, webSkeleton().scale(1, 1))
  );

  yield* waitUntil("sceneEnd")

  yield* all(
    window().opacity(0,1),
  )
});
