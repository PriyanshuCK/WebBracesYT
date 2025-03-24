import {
  Code,
  Img,
  Layout,
  Line,
  lines,
  makeScene2D,
  Node,
  Ray,
  Rect,
  SVG,
  word,
} from "@motion-canvas/2d";
import {
  all,
  createRef,
  createRefMap,
  delay,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import colors from "../lib/colors";
import { CSSCode, ExtendedFillSVG, ExtendedRect, Grid, Window } from "../nodes";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import alwarImage1 from "../images/alwar city palace.png";
import alwarImage2 from "../images/bhangarh.jpg";
import alwarImage3 from "../images/jaisamand.jpg";
import alwarImage4 from "../images/siliserh.jpg";
import alwarImage5 from "../images/sariska-tiger-reserve.jpg";
import alwarImage6 from "../images/bala qila.jpg";
import alwarImage7 from "../images/garbhaji.png";
import alwarImage8 from "../images/moosimaharani.jpg";
import { Book } from "../lib/svgs";

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  // view.add(
  //   <>
  //     <Grid />
  //   </>
  // );
  yield* waitUntil("intro");
  const everythingIsABox = createRef<ExtendedTxt>();
  const boxHighlighted = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={everythingIsABox}
        text={"Everything is a Box"}
        fontSize={spaceY[1]}
        fontWeight={600}
        y={spaceY[1]}
        opacity={0}
      />
      <ExtendedTxt
        ref={boxHighlighted}
        text={"Box"}
        fontSize={spaceY[1]}
        fontWeight={600}
        fill={colors.orange[500]}
        stroke={colors.orange[500]}
        lineWidth={1}
        opacity={0}
        x={327}
      />
    </>
  );
  yield* all(everythingIsABox().opacity(1, 1), everythingIsABox().y(0, 1));
  yield* boxHighlighted().opacity(1, 1);
  yield* waitUntil("webpage");
  const window = createRef<Window>();
  const heading = createRef<ExtendedTxt>();
  const para = createRef<ExtendedTxt>();
  const buttonRect = createRef<ExtendedRect>();
  const buttonText = createRef<ExtendedTxt>();
  const alwarImages = createRefMap<Img>();
  const outlines = createRefMap<Rect>();
  const alwarImagesLayout = createRef<Layout>();
  view.add(
    <>
      <Window
        ref={window}
        width={spaceX[16] * 0.9}
        height={spaceY[9] * 0.9}
        opacity={0}
        fill={colors.slate[0]}
        y={spaceY[1]}
      >
        <Layout layout direction="column" gap={spaceY[0.25] / 2}>
          <Rect
            ref={outlines.heading}
            layout
            stroke={colors.red[500]}
            lineWidth={0}
          >
            <ExtendedTxt
              ref={heading}
              text={"🌿 A Week in Alwar"}
              fontSize={spaceY[0.5]}
              fontWeight={600}
              fill={colors.slate[900]}
              textWrap
              // marginBottom={spaceY[0.25] / 2}
            />
          </Rect>
          <Rect
            ref={outlines.para}
            layout
            stroke={colors.red[500]}
            lineWidth={0}
          >
            <ExtendedTxt
              ref={para}
              fontSize={spaceY[0.25]}
              text={
                "Nestled amidst the Aravalli hills, Alwar is a treasure trove of history, nature, and adventure. From grand palaces and mighty forts to serene lakes and wildlife sanctuaries, this city offers a perfect blend of heritage and natural beauty. Whether you're a history enthusiast, a nature lover, or just seeking a peaceful getaway, Alwar has something special for everyone. Explore these must-visit spots and experience the charm of this lesser-known jewel of Rajasthan!"
              }
              textWrap
              fill={colors.slate[950]}
            />
          </Rect>
          <Layout
            ref={alwarImagesLayout}
            layout
            direction="row"
            gap={spaceX[0.25] / 2}
            wrap={"wrap"}
          >
            <Rect
              ref={outlines.i1}
              layout
              stroke={colors.red[500]}
              lineWidth={0}
              padding={2}
            >
              <Img
                ref={alwarImages.one}
                src={alwarImage1}
                height={spaceY[1.5]}
                width={(spaceY[1.5] / 495) * 960}
                radius={16}
              />
            </Rect>
            <Rect
              ref={outlines.i2}
              layout
              stroke={colors.red[500]}
              lineWidth={0}
              padding={2}
            >
              <Img
                ref={alwarImages.two}
                src={alwarImage2}
                height={spaceY[1.5]}
                width={(spaceY[1.5] / 495) * 960}
                radius={16}
              />
            </Rect>
            <Rect
              ref={outlines.i3}
              layout
              stroke={colors.red[500]}
              lineWidth={0}
              padding={2}
            >
              <Img
                ref={alwarImages.three}
                src={alwarImage3}
                height={spaceY[1.5]}
                width={(spaceY[1.5] / 495) * 960}
                radius={16}
              />
            </Rect>
            <Rect
              ref={outlines.i4}
              layout
              stroke={colors.red[500]}
              lineWidth={0}
              padding={2}
            >
              <Img
                ref={alwarImages.four}
                src={alwarImage4}
                height={spaceY[1.5]}
                width={(spaceY[1.5] / 495) * 960}
                radius={16}
              />
            </Rect>
            <Rect
              ref={outlines.i5}
              layout
              stroke={colors.red[500]}
              lineWidth={0}
              padding={2}
            >
              <Img
                ref={alwarImages.five}
                src={alwarImage5}
                height={spaceY[1.5]}
                width={(spaceY[1.5] / 495) * 960}
                radius={16}
              />
            </Rect>
            <Rect
              ref={outlines.i6}
              layout
              stroke={colors.red[500]}
              lineWidth={0}
              padding={2}
            >
              <Img
                ref={alwarImages.six}
                src={alwarImage6}
                height={spaceY[1.5]}
                width={(spaceY[1.5] / 495) * 960}
                radius={16}
              />
            </Rect>
            <Rect
              ref={outlines.i7}
              layout
              stroke={colors.red[500]}
              lineWidth={0}
              padding={2}
            >
              <Img
                ref={alwarImages.seven}
                src={alwarImage7}
                height={spaceY[1.5]}
                width={(spaceY[1.5] / 495) * 960}
                radius={16}
              />
            </Rect>
            <Rect
              ref={outlines.i8}
              layout
              stroke={colors.red[500]}
              lineWidth={0}
              padding={2}
            >
              <Img
                ref={alwarImages.eight}
                src={alwarImage8}
                height={spaceY[1.5]}
                width={(spaceY[1.5] / 495) * 960}
                radius={16}
              />
            </Rect>
          </Layout>
          <Rect
            ref={outlines.button}
            layout
            stroke={colors.red[500]}
            lineWidth={0}
            width={spaceX[1.75]}
            padding={2}
          >
            <ExtendedRect
              ref={buttonRect}
              width={spaceX[1.75]}
              height={spaceY[0.75]}
              fill={colors.slate[900]}
              lineWidth={0}
              y={spaceY[1]}
              layout
              justifyContent={"center"}
              alignItems={"center"}
              radius={spaceX[1]}
            >
              <ExtendedTxt
                ref={buttonText}
                text={"Subscribe"}
                fontSize={spaceY["0.25"]}
                fill={colors.slate[0]}
                fontWeight={600}
              />
            </ExtendedRect>
          </Rect>
        </Layout>
      </Window>
    </>
  );
  yield* all(
    delay(0.5, window().opacity(1, 1)),
    everythingIsABox().y(spaceNY[4.5], 1),
    delay(1, boxHighlighted().opacity(0, 0.5)),
    boxHighlighted().y(spaceNY[4.5], 1)
  );
  yield* waitUntil("outlineText");
  yield* all(
    outlines.heading().lineWidth(3, 0.75),
    outlines.para().lineWidth(3, 0.75)
  );
  yield* all(
    outlines.i1().lineWidth(3, 0.75),
    outlines.i2().lineWidth(3, 0.75),
    outlines.i3().lineWidth(3, 0.75),
    outlines.i4().lineWidth(3, 0.75),
    outlines.i5().lineWidth(3, 0.75),
    outlines.i6().lineWidth(3, 0.75),
    outlines.i7().lineWidth(3, 0.75),
    outlines.i8().lineWidth(3, 0.75)
  );
  yield* waitUntil("button");
  yield* outlines.button().lineWidth(3, 0.75);
  yield* waitUntil("control");
  yield* all(
    alwarImagesLayout().opacity(0, 0.5),
    outlines.button().opacity(0, 0.5)
  );
  alwarImagesLayout().remove();
  buttonRect().remove();
  const cssAlwarIntro = createRef<Code>();
  view.add(
    <CSSCode
      ref={cssAlwarIntro}
      x={spaceX[4]}
      y={spaceY[1]}
      code={`\
.alwar-introduction {
  outline: 3px solid red;
  padding: 20px;
}
`}
      opacity={0}
    />
  );
  yield* all(
    window().x(spaceNX[4.5], 1),
    window().width(spaceX[9], 1),
    outlines.heading().lineWidth(0, 1),
    outlines.para().padding(spaceX["0.25"], 1),
    cssAlwarIntro().opacity(1, 1)
  );
  yield* all(
    cssAlwarIntro().code.insert(
      [3, 0],
      `\
  margin-top: 40px;
`,
      1
    ),
    cssAlwarIntro().code.replace(word(2, 11, 4), "20px 20px 80px 20px", 1),
    outlines.para().margin([spaceY[0.5], 0, 0, 0], 1),
    outlines
      .para()
      .padding([spaceX["0.25"], spaceX["0.25"], spaceX[1], spaceX["0.25"]], 1)
  );
  yield* all(
    cssAlwarIntro().code.insert(
      [4, 0],
      `\
  background-image: url("light-lime-bg.png");
`,
      1
    ),
    cssAlwarIntro().x(spaceX[5], 1),
    outlines.para().fill(colors.lime[200], 1),
    cssAlwarIntro().code.remove(lines(1), 1),
    outlines.para().lineWidth(0, 1)
  );
  yield* all(
    cssAlwarIntro().code.insert(
      [4, 0],
      `\
  border: 3px solid black;
`,
      1
    ),
    outlines.para().lineWidth(3, 1),
    outlines.para().stroke(colors.slate[950], 1)
  );

  yield* waitUntil("cssBoxModel");
  const cssBoxModel = createRef<ExtendedTxt>();
  const cssBoxModelSVG = createRef<SVG>();

  view.add(
    <>
      <ExtendedTxt
        ref={cssBoxModel}
        text={"CSS Box Model"}
        fontSize={spaceY[1]}
        fontWeight={600}
        opacity={0}
        y={spaceNY[4.5]}
      />
      <SVG
        ref={cssBoxModelSVG}
        svg={Book}
        size={spaceY[3]}
        opacity={0}
        position={[spaceX[7], spaceY[0.5]]}
      />
    </>
  );

  yield* all(
    cssAlwarIntro().opacity(0, 1),
    everythingIsABox().opacity(0, 1),
    cssBoxModel().opacity(1, 1)
  );
  yield* waitFor(1);
  const line = createRef<Line>();
  view.add(
    <>
      <Line
        ref={line}
        lineWidth={4}
        stroke={colors.slate[0]}
        points={[
          [spaceX[5], spaceY[1.5]],
          [spaceX[3], spaceY[2.5]],
          [spaceX[0.5], spaceY[0.5]],
        ]}
        radius={1000}
        endArrow
        lineDash={[4, 10]}
        lineCap={"round"}
        end={0}
        opacity={0}
      />
    </>
  );
  yield* all(
    cssBoxModelSVG().opacity(1, 1),
    delay(0.5, line().end(1, 1)),
    delay(0.5, line().opacity(1, 1))
  );
  yield* all(
    outlines.para().margin([spaceY["0.33"], 0, 0, spaceX["0.25"]], 1),
    outlines.para().padding(spaceX["0.25"], 1),
    delay(1, outlines.para().width(spaceX[6], 1)),
    delay(1, outlines.para().lineWidth(6, 1))
  );

  const horizontalLeftBox = createRef<ExtendedRect>();
  const horizontalRightBox = createRef<ExtendedRect>();
  const rayLeftBox = createRef<Ray>();
  const rayRightBox = createRef<Ray>();
  const ray70px = createRef<Ray>();
  const horizontalBoxesNode = createRef<Node>();
  const horizontalLayoutTick = createRef<ExtendedTxt>();

  view.add(
    <>
      <Node ref={horizontalBoxesNode}>
        <ExtendedRect
          ref={horizontalLeftBox}
          width={spaceX[4]}
          height={spaceY[3]}
          highlighted
          x={spaceNX[2.5] + spaceNX["0.75"] / 2}
          y={spaceNY[1]}
          opacity={0}
        >
          <ExtendedTxt text={"margin-right: 20px"} y={spaceY[2]} />
          <ExtendedTxt
            text={"20px"}
            x={spaceX[1.25]}
            fontSize={spaceY["0.5"]}
            fontWeight={500}
          />
        </ExtendedRect>
        <ExtendedRect
          ref={horizontalRightBox}
          width={spaceX[4]}
          height={spaceY[3]}
          highlighted
          x={spaceX[3.25] + spaceNX["0.75"] / 2}
          y={spaceNY[1]}
          opacity={0}
        >
          <ExtendedTxt text={"margin-left: 50px"} y={spaceY[2]} />
          <ExtendedTxt
            text={"50px"}
            x={spaceNX[1.25]}
            fontSize={spaceY["0.5"]}
            fontWeight={500}
          />
        </ExtendedRect>
        <Ray
          ref={rayLeftBox}
          fromY={horizontalLeftBox().bottom().y}
          toY={spaceY[2]}
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
          toY={spaceY[2]}
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
          y={spaceY[2]}
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
            text={"70px"}
            y={spaceNY["0.5"]}
            fontSize={spaceY["0.5"]}
            fill={colors.green[500]}
            fontWeight={600}
          />
        </Ray>
        <ExtendedTxt
          ref={horizontalLayoutTick}
          text={"✅"}
          y={spaceY[3.5]}
          fontSize={spaceY["0.75"]}
          opacity={0}
        />
      </Node>
    </>
  );

  yield* all(
    cssBoxModel().opacity(0, 0.75),
    line().opacity(0, 0.75),
    line().end(0, 0.75),
    window().opacity(0, 0.75),
    cssBoxModelSVG().scale(0, 0.75),
    horizontalLeftBox().opacity(1, 0.75),
    horizontalRightBox().opacity(1, 0.75)
  );
  yield* all(
    rayLeftBox().end(1, 0.75),
    rayLeftBox().opacity(1, 0.75),
    rayRightBox().end(1, 0.75),
    rayRightBox().opacity(1, 0.75)
  );
  yield* all(
    ray70px().start(0, 0.75),
    ray70px().end(1, 0.75),
    ray70px().opacity(1, 0.75),
    delay(0.5, horizontalLayoutTick().opacity(1, 0.75))
  );

  yield* waitUntil("weird");

  const verticalTopBox = createRef<ExtendedRect>();
  const verticalBottomBox = createRef<ExtendedRect>();
  const rayTopBox = createRef<Ray>();
  const rayBottomBox = createRef<Ray>();
  const ray50px = createRef<Ray>();
  const verticalBoxesNode = createRef<Node>();
  const dividerRay = createRef<Ray>();
  const verticalLayoutThinking = createRef<ExtendedTxt>();
  const ray50text = createRef<ExtendedTxt>();

  view.add(
    <>
      <Ray
        ref={dividerRay}
        fromY={spaceNY[4]}
        toY={spaceY[4]}
        lineWidth={4}
        stroke={colors.slate[0]}
        lineCap={"round"}
        start={0.5}
        end={0.5}
        opacity={0}
      />
      <Node ref={verticalBoxesNode}>
        <ExtendedRect
          ref={verticalTopBox}
          width={spaceX[4]}
          height={spaceY[3]}
          highlighted
          x={spaceX[3.33]}
          y={spaceNY[2]}
          opacity={0}
        >
          <ExtendedTxt text={"margin-bottom: 20px"} x={spaceX[3.75]} />
          <ExtendedTxt
            text={"20px"}
            y={spaceY[1]}
            fontSize={spaceY["0.5"]}
            fontWeight={500}
          />
        </ExtendedRect>
        <ExtendedRect
          ref={verticalBottomBox}
          width={spaceX[4]}
          height={spaceY[3]}
          highlighted
          x={spaceX[3.33]}
          y={spaceY[2]}
          opacity={0}
        >
          <ExtendedTxt text={"margin-top: 50px"} x={spaceX[3.75]} />
          <ExtendedTxt
            text={"50px"}
            y={spaceNY[1]}
            fontSize={spaceY["0.5"]}
            fontWeight={500}
          />
        </ExtendedRect>
        <Ray
          ref={rayTopBox}
          fromX={verticalTopBox().right().x}
          toX={spaceX[6.5]}
          y={verticalTopBox().bottom().y}
          lineWidth={3}
          stroke={colors.slate[0]}
          lineDash={[4, 10]}
          lineCap={"round"}
          end={0}
          opacity={0}
        />
        <Ray
          ref={rayBottomBox}
          fromX={verticalBottomBox().right().x}
          toX={spaceX[6.5]}
          y={verticalBottomBox().top().y}
          lineWidth={3}
          stroke={colors.slate[0]}
          lineDash={[4, 10]}
          lineCap={"round"}
          end={0}
          opacity={0}
        />
        <Ray
          ref={ray50px}
          fromY={verticalTopBox().bottom().y}
          toY={verticalBottomBox().top().y}
          x={spaceX[6.5]}
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
        <ExtendedTxt
          ref={verticalLayoutThinking}
          text={"🤔"}
          x={spaceX[5]}
          y={spaceY[4.5]}
          fontSize={spaceY["0.75"]}
          opacity={0}
        />
      </Node>
    </>
  );

  yield* all(
    horizontalBoxesNode().x(spaceNX[5], 0.75),
    horizontalBoxesNode().scale(0.75, 0.75),
    verticalTopBox().opacity(1, 0.75),
    verticalBottomBox().opacity(1, 0.75),
    dividerRay().start(0, 1),
    dividerRay().end(1, 1),
    dividerRay().opacity(1, 1)
  );
  yield* all(
    rayTopBox().end(1, 0.75),
    rayTopBox().opacity(1, 0.75),
    rayBottomBox().end(1, 0.75),
    rayBottomBox().opacity(1, 0.75)
  );
  yield* all(
    ray50px().start(0, 0.75),
    ray50px().end(1, 0.75),
    ray50px().opacity(1, 0.75),
    delay(0.5, verticalLayoutThinking().opacity(1, 0.75))
  );

  yield* waitUntil("css");
  yield* ray50text().fill(colors.green[500], 0.75);
  yield* waitFor(1);
  const verticalLayoutTick = createRef<ExtendedTxt>();

  view.add(
    <>
      <ExtendedTxt
        ref={verticalLayoutTick}
        text={"✅"}
        x={spaceX[4.5]}
        y={spaceY[4.5]}
        fontSize={spaceY["0.75"]}
        scale={0}
      />
    </>
  );

  yield* all(
    verticalLayoutThinking().x(spaceX[5.5], 0.75),
    verticalLayoutThinking().scale(0, 0.75),
    verticalLayoutTick().x(spaceX[5], 0.75),
    verticalLayoutTick().scale(1, 0.75)
  );

  yield* waitUntil("scene1End");
});
