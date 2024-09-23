import { Code, Img, Layout, makeScene2D, word } from "@motion-canvas/2d";
import {
  all,
  createRef,
  delay,
  fadeTransition,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { CSSCode, ExtendedFillSVG, Grid, Window } from "../nodes";
import colors from "../lib/colors";
import {
  Bouquet,
  ColorPalette,
  CSS,
  HouseBlack,
  HouseFill,
  Image,
  PaintBucket,
} from "../lib/svgs";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
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

  const cssSVG = createRef<ExtendedFillSVG>();
  const cssCode = createRef<Code>();
  const houseFillSVG = createRef<ExtendedFillSVG>();
  const bouquet = createRef<ExtendedFillSVG>();
  const colorpalette = createRef<ExtendedFillSVG>();
  const paintbucket = createRef<ExtendedFillSVG>();
  const cssItemsLayout = createRef<Layout>();

  view.add(
    <>
      <ExtendedFillSVG
        ref={cssSVG}
        svg={CSS}
        size={spaceY[2]}
        y={spaceNY[2.5]}
      />
      <CSSCode
        ref={cssCode}
        opacity={0}
        y={spaceY[2]}
        code={`\
body {
    background-color: black;
}
img {
    width: 300px;
    height: auto;
}
h2 {
    font-family: 'Arial', sans-serif;
}
`}
      />
      <ExtendedFillSVG
        ref={houseFillSVG}
        svg={HouseBlack}
        size={spaceY[3]}
        lineWidth={0.25}
        opacity={0}
        y={spaceY[2]}
        x={spaceX[4]}
      />
      <Layout ref={cssItemsLayout} layout direction={"row"} gap={spaceX[1]}>
        <ExtendedFillSVG
          ref={colorpalette}
          svg={ColorPalette}
          size={spaceY[2]}
          lineWidth={0.25}
        />
        <ExtendedFillSVG
          ref={paintbucket}
          svg={PaintBucket}
          size={spaceY[2]}
          lineWidth={0.25}
        />
        <ExtendedFillSVG
          ref={bouquet}
          svg={Bouquet}
          size={spaceY[2]}
          lineWidth={0.25}
        />
      </Layout>
    </>
  );
  yield* all(cssSVG().write(), delay(0.5, cssCode().opacity(1, 1)));

  yield* waitUntil("cssIsLike");
  yield* all(
    houseFillSVG().write(0.5),
    cssCode().opacity(0, 0.5),
    cssSVG().scale(0, 0.5)
  );

  yield* all(
    bouquet().write(1.5),
    colorpalette().write(1.5),
    paintbucket().write(1.5)
  );

  const window = createRef<Window>();
  const exampleImage = createRef<ExtendedFillSVG>();
  const paragraph = createRef<ExtendedTxt>();
  const heading = createRef<ExtendedTxt>();
  const link = createRef<ExtendedTxt>();

  view.add(
    <>
      <Window
        ref={window}
        x={spaceX[5]}
        width={spaceX[8]}
        fontFamily={"Times New Roman"}
        opacity={0}
        fill={colors.slate[0]}
      >
        <ExtendedTxt
          ref={paragraph}
          text={"This is a paragraph."}
          fill={colors.slate[950]}
          fontWeight={500}
        />
        <ExtendedTxt
          ref={heading}
          text={"This is a Heading."}
          fontSize={spaceY["0.67"]}
          fontWeight={600}
          fill={colors.slate[900]}
        />
        <ExtendedFillSVG
          ref={exampleImage}
          svg={Image}
          size={spaceY[1]}
          lineWidth={0.25}
        />
        <ExtendedTxt ref={link} text={"Subscribe"} fill={colors.blue[500]} />
      </Window>
    </>
  );

  yield* waitUntil("onceTheStructure")

  yield* all(
    cssItemsLayout().scale(0.5, 1),
    cssItemsLayout().x(spaceNX[4.5], 1),
    houseFillSVG().opacity(1, 1),
    houseFillSVG().y(0, 1),
    delay(1.5, houseFillSVG().svg(HouseFill, 2)),
    delay(1.5, cssItemsLayout().x(spaceX[0], 1)),
    delay(1.5, houseFillSVG().x(spaceX[0], 1)),
    delay(1.5, cssItemsLayout().scale(0, 1)),
    delay(4.5, houseFillSVG().opacity(0, 1)),
    exampleImage().write()
  );

  cssCode().code(`\
body {
    background-color: white;
}
`);
  cssCode().position([spaceNX[5], spaceY[0]]);

  yield* all(cssCode().opacity(1, 1), window().opacity(1, 1));

  yield* all(
    window().fill("black", 1),
    paragraph().fill(colors.slate[0], 1),
    heading().fill(colors.slate[0], 1),
    cssCode().code.replace(word(1, 22, 5), 'black', 1),
    cssCode().code.append(
      `\
p, h2 {
  color: #f8fafc;
}
`,
      1
    ),
    delay(
      2,
      cssCode().code.append(
        `\
img {
    width: 300px;
    height: auto;
}
`,
        1
      )
    ),
    delay(2, exampleImage().size(spaceY[2] ,1)),
    delay(
      3,
      cssCode().code.append(
        `\
h2 {
  font-family: 'Arial', sans-serif;
}
          `,
        1
      )
    ),
    delay(3, heading().fontFamily("'Arial', sans-serif" ,1)),
  );

  yield* waitUntil("sceneEnd");
});
