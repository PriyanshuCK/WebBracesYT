import { Code, Img, Layout, makeScene2D, Path, Ray } from "@motion-canvas/2d";
import {
  all,
  createRef,
  delay,
  fadeTransition,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import {
  ExtendedFillSVG,
  ExtendedStrokeSVG,
  Grid,
  HTMLCode,
  Window,
} from "../nodes";
import colors from "../lib/colors";
import {
  Bricks,
  Concrete,
  HouseBlack,
  HouseFill,
  HouseStroke,
  HTML5,
  Image,
  Web,
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

  const htmlSVG = createRef<ExtendedFillSVG>();
  const htmlCode = createRef<Code>();

  view.add(
    <>
      <ExtendedFillSVG
        ref={htmlSVG}
        svg={HTML5}
        size={spaceY[2]}
        y={spaceNY[2.5]}
      />
      <HTMLCode
        ref={htmlCode}
        opacity={0}
        y={spaceY[2]}
        code={`\
<section>
    <p>
        This is a paragraph.
    </p>
    <h2>This is a Heading</h2>
    <img src="https://example.com/images/image.png" alt="An example image" />
    <a href="https://youtube.com/@channelName?sub_confirmation=1">Subscribe</a>
</section>
`}
      />
    </>
  );

  yield* all(htmlSVG().write(), delay(0.5, htmlCode().opacity(1, 1)));
  yield* waitUntil("imagine");
  yield* all(htmlCode().opacity(0, 1), htmlSVG().scale(0, 1));

  const houseFillSVG = createRef<ExtendedFillSVG>();
  const webSVG = createRef<ExtendedStrokeSVG>();
  const bricks = createRef<ExtendedFillSVG>();
  const concrete = createRef<ExtendedFillSVG>();
  const houseRawMaterials = createRef<Layout>();

  view.add(
    <>
      <ExtendedStrokeSVG ref={webSVG} svg={Web} size={spaceY[2]} />
      <Layout
        ref={houseRawMaterials}
        layout
        direction={"row"}
        gap={spaceX["0.5"]}
        alignItems={"end"}
      >
        <ExtendedFillSVG
          ref={bricks}
          svg={Bricks}
          size={spaceY[1.25]}
          lineWidth={0.5}
        />
        <ExtendedFillSVG ref={concrete} svg={Concrete} size={spaceY[2]} />
      </Layout>
      <ExtendedFillSVG
        ref={houseFillSVG}
        svg={HouseBlack}
        size={spaceY[3]}
        lineWidth={0.25}
      />
    </>
  );

  yield* all(webSVG().write(0.75), delay(0.75, webSVG().svg(HouseStroke, 0.75)));
  yield* webSVG().opacity(0, 1),
    yield* all(bricks().write(), delay(0.5, concrete().write(0.5)));
  yield* all(
    houseRawMaterials().y(spaceY[2], 0.75).back(0.75),
    houseRawMaterials().scale(0.75, 0.75),
    delay(0.75, houseRawMaterials().scale(0, 0.75)),
    delay(0.5, houseFillSVG().write())
  );
  htmlCode().x(spaceNX[4]);
  htmlCode().y(spaceY[0]);
  htmlCode().code(`\
<section>
</section>
`);

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
          opacity={0}
          fill={colors.slate[950]}
          fontWeight={500}
        />
        <ExtendedTxt
          ref={heading}
          text={"This is a Heading."}
          fontSize={spaceY["0.67"]}
          fontWeight={600}
          opacity={0}
          fill={colors.slate[900]}
        />
        <ExtendedFillSVG
          ref={exampleImage}
          svg={Image}
          size={spaceY[1]}
          lineWidth={0.25}
          opacity={0}
        />
        <ExtendedTxt
          ref={link}
          text={"Subscribe"}
          fill={colors.blue[500]}
          opacity={0}
        />
      </Window>
    </>
  );

  yield* waitFor(0.5);

  yield* all(
    houseFillSVG().opacity(0, 1),
    delay(1, htmlCode().opacity(1, 1)),
    exampleImage().write(),
    delay(1, window().opacity(1, 1))
  );
  yield* all(
    delay(1,paragraph().opacity(1, 1)),
    delay(1,htmlCode().code.insert(
      [1, 0],
      `\
    <p>This is a paragraph.</p>
`,
      1
    )),
    delay(2, heading().opacity(1, 1)),
    delay(
      2,
      htmlCode().code.insert(
        [1, 0],
        `\
    <h2>This is a Heading</h2>
`,
        1
      )
    ),
    delay(2.5, exampleImage().opacity(1, 1)),
    delay(
      2.5,
      htmlCode().code.insert(
        [2, 0],
        `\
    <img src="https://example.com/images/image.png"
    alt="An example image" />
`,
        1
      )
    ),
    delay(3.5, link().opacity(1, 1)),
    delay(
      3.5,
      htmlCode().code.insert(
        [3, 0],
        `\
    <a href="https://youtube.com/@channelName?
    sub_confirmation=1">Subscribe</a>
`,
        1
      )
    )
  );

  yield* waitUntil("sceneEnd");
});
