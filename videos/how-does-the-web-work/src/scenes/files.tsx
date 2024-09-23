import { Layout, makeScene2D, Path, SVG } from "@motion-canvas/2d";
import {
  all,
  createRef,
  createRefMap,
  delay,
  fadeTransition,
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
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import {
  Browser,
  CSS,
  Document,
  HTML5,
  Image,
  JS,
  Music,
  PDF,
  Server,
  Video,
  Web,
} from "../lib/svgs";

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  // view.add(<><Grid /></>);

  yield* fadeTransition(0.5);

  const serverRect = createRef<ExtendedRect>();
  const serverBG = createRef<ExtendedRect>();
  const serverTxt = createRef<ExtendedTxt>();
  const serverSVG = createRef<ExtendedStrokeSVG>();
  const serverLayout = createRef<Layout>();
  const clientRect = createRef<ExtendedRect>();
  const clientSVG = createRef<ExtendedStrokeSVG>();
  const clientBG = createRef<ExtendedRect>();
  const clientTxt = createRef<ExtendedTxt>();
  const clientLayout = createRef<Layout>();
  const messages = createRef<Layout>();
  const responseItems = createRef<Layout>();

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
      <Layout ref={messages} clip height={spaceY[4]} width={spaceX[3.5]}>
        <Layout
          ref={responseItems}
          layout
          direction={"row"}
          gap={spaceX[0.5]}
          position={[spaceX[4.5], spaceY[0]]}
        >
          <SVG svg={Image} size={spaceY[0.5]} fill={colors.slate[0]} />
          <SVG svg={Music} size={spaceY[0.5]} fill={colors.slate[0]} />
          <SVG svg={PDF} size={spaceY[0.5]} fill={colors.slate[0]} />
          <SVG svg={HTML5} size={spaceY[0.5]} />
          <SVG svg={CSS} size={spaceY[0.5]} />
          <SVG svg={JS} size={spaceY[0.5]} />
        </Layout>
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
    serverSVG().write(),
    clientLayout().opacity(1, 1),
    clientSVG().write(),
    delay(0.25, responseItems().x(spaceNX[4.5], 4))
  );

  const fillSVGs = createRefMap<ExtendedFillSVG>();
  const assetsTxt = createRef<ExtendedTxt>();
  const assetsLayout = createRef<Layout>();
  const codeTxt = createRef<ExtendedTxt>();
  const codeLayout = createRef<Layout>();

  view.add(
    <>
      <ExtendedTxt
        ref={assetsTxt}
        fontSize={spaceY["0.67"]}
        y={spaceNY[1]}
        fontWeight={500}
      />
      <Layout
        ref={assetsLayout}
        layout
        direction={"row"}
        y={spaceY["1"]}
        gap={spaceX[1]}
      >
        <ExtendedFillSVG
          ref={fillSVGs.image}
          svg={Image}
          size={spaceY[1]}
          fill={colors.slate[0]}
          lineWidth={0.5}
        />
        <ExtendedFillSVG
          ref={fillSVGs.video}
          svg={Video}
          size={spaceY[1]}
          fill={colors.slate[0]}
          lineWidth={0.5}
        />
        <ExtendedFillSVG
          ref={fillSVGs.music}
          svg={Music}
          size={spaceY[1]}
          fill={colors.slate[0]}
          lineWidth={0.5}
        />
        <ExtendedFillSVG
          ref={fillSVGs.doc}
          svg={Document}
          size={spaceY[1]}
          fill={colors.slate[0]}
          lineWidth={0.5}
        />
        <ExtendedFillSVG
          ref={fillSVGs.pdf}
          svg={PDF}
          size={spaceY[1]}
          fill={colors.slate[0]}
          lineWidth={0.5}
        />
      </Layout>
    </>
  );

  yield* all(
    serverLayout().scale(0, 0.75),
    clientLayout().scale(0, 0.75),
    messages().scale(0, 0.75),
    assetsTxt().text("Assets", 2),
    delay(0.75, fillSVGs.image().write(1)),
    delay(1.75, fillSVGs.video().write(1)),
    delay(2.5, fillSVGs.music().write(1)),
    delay(3.25, fillSVGs.doc().write(1)),
    delay(3.75, fillSVGs.pdf().write(1))
  );

  view.add(
    <>
      <ExtendedTxt
        ref={codeTxt}
        fontSize={spaceY["0.67"]}
        y={spaceNY[1]}
        fontWeight={500}
      />
      <Layout
        ref={codeLayout}
        layout
        direction={"row"}
        y={spaceY["1"]}
        gap={spaceX[1]}
      >
        <ExtendedFillSVG
          ref={fillSVGs.html}
          svg={HTML5}
          size={spaceY[1]}
          fill={colors.slate[0]}
        />
        <ExtendedFillSVG
          ref={fillSVGs.css}
          svg={CSS}
          size={spaceY[1]}
          fill={colors.slate[0]}
        />
        <ExtendedFillSVG
          ref={fillSVGs.js}
          svg={JS}
          size={spaceY[1]}
          fill={colors.slate[0]}
        />
      </Layout>
    </>
  );

  yield* all(
    assetsTxt().opacity(0, 1),
    assetsLayout().scale(0, 1),
    delay(0, codeTxt().text("Code Files", 2)),
    delay(3, fillSVGs.html().write(0.75)),
    delay(3.75, fillSVGs.css().write(0.75)),
    delay(4.5, fillSVGs.js().write(0.75))
  );

  yield* all(codeTxt().opacity(0, 1), codeLayout().scale(0, 1));

  fillSVGs.mapRefs((svg) => {
    const paths = svg.wrapper.children() as Path[];
    for (const path of paths) {
      path.stroke(path.fill()).lineWidth(svg.lineWidth()).end(0);
      path.fill(null);
    }
  });

  assetsLayout().y(spaceNY["1.5"]),
    assetsLayout().scale(1),
    codeLayout().scale(1);

  // yield* waitUntil("differentFiles");
  yield* all(
    fillSVGs.html().write(),
    fillSVGs.css().write(),
    fillSVGs.js().write(),
    fillSVGs.image().write(),
    fillSVGs.video().write(),
    fillSVGs.music().write(),
    fillSVGs.doc().write(),
    fillSVGs.pdf().write()
  );

  yield* waitUntil("oneFile");

  const website = createRef<ExtendedStrokeSVG>();

  view.add(
    <>
      <ExtendedStrokeSVG
        ref={website}
        svg={Web}
        size={spaceY[3]}
        y={spaceY[1]}
        lineWidth={1.25}
      />
    </>
  );

  yield* all(
    assetsLayout().y(spaceNY[3.5], 1),
    codeLayout().y(spaceNY[2], 1),
    delay(0.75,assetsLayout().y(spaceY[0], 1)),
    delay(0.75,codeLayout().y(spaceY[0], 1)),
    delay(0.75,assetsLayout().scale(0, 1)),
    delay(0.75,codeLayout().scale(0, 1)),
    delay(0.5, website().write(2)),
    delay(0.5, website().y(spaceY[0], 1.5)),
  );

  yield* waitUntil("sceneEnd");
});
