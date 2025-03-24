import {
  Img,
  Layout,
  Line,
  makeScene2D,
  Node,
  Path,
  Ray,
  Rect,
  SVG,
} from "@motion-canvas/2d";
import colors from "../lib/colors";
import { ExtendedRect, Grid, Window } from "../nodes";
import {
  all,
  Color,
  createRef,
  createSignal,
  delay,
  Direction,
  slideTransition,
  Vector2,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { PartsOfBoxTitle } from "../lib/svgs";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import BoxModelBoxes from "../images/box_model_boxes.png";
import Frame1 from "../images/frame1.png";
import Frames from "../images/frames1-3.png";
import { ExtendedTxt } from "../nodes/ExtendedTxt";

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  // view.add(
  //   <>
  //     <Grid />
  //   </>
  // );

  const partsOfBoxTitleSVG = createRef<SVG>();
  view.add(<SVG ref={partsOfBoxTitleSVG} svg={PartsOfBoxTitle} />);

  const paths = partsOfBoxTitleSVG().wrapper.children() as Path[];
  for (const path of paths) {
    path.stroke(path.fill()).lineWidth(2).end(0);
    path.fill(null);
  }
  yield* slideTransition(Direction.Right, 0.75);

  yield* all(
    ...paths.map((path, index) => delay(0.075 * index, path.end(1, 1.75)))
  );

  const boxModelBoxesImg = createRef<Img>();
  const frame1Img = createRef<Img>();

  view.add(
    <>
      <Img
        ref={boxModelBoxesImg}
        src={BoxModelBoxes}
        opacity={0}
        y={spaceY[2]}
        scale={0.4}
        x={spaceNX[4]}
      />
      <Img
        ref={frame1Img}
        src={Frame1}
        x={spaceX[4]}
        width={spaceX[4]}
        y={spaceY[2]}
        opacity={0}
      />
    </>
  );
  yield* all(
    ...paths.flatMap((path) => [
      path.fill(path.stroke(), 0.75),
      path.lineWidth(0, 0.75),
    ]),
    partsOfBoxTitleSVG().y(spaceNY["4.5"], 0.75),
    partsOfBoxTitleSVG().scale(0.75, 0.75),
    boxModelBoxesImg().opacity(1, 0.75),
    boxModelBoxesImg().y(spaceY[1], 0.75)
  );
  yield* all(frame1Img().opacity(1, 0.75), frame1Img().y(spaceY[1], 0.75));

  yield* waitUntil("1content");
  const contentTxt = createRef<ExtendedTxt>();
  const window = createRef<Window>();
  const textContentHighlight = createRef<Rect>();
  const frameContentHighlight = createRef<Rect>();
  const textPaddingHighlight = createRef<Rect>();
  const framePaddingHighlight = createRef<Rect>();
  const textBorderHighlight = createRef<Rect>();
  const frameBorderHighlight = createRef<Rect>();

  view.add(
    <>
      <ExtendedTxt
        ref={contentTxt}
        text={"1. Content"}
        fontSize={spaceY["0.75"]}
        fontWeight={500}
        position={[spaceNX[7.5] + 10, spaceNY[4.5]]}
        opacity={0}
      />
      <Window
        ref={window}
        width={spaceX[10]}
        height={spaceY["8"]}
        scale={0}
        fill={colors.slate[0]}
        position={[spaceNX[4], spaceY[5]]}
      >
        <Rect
          ref={textBorderHighlight}
          stroke={"#e3c382"}
          lineWidth={10}
          end={0}
        >
          <Rect ref={textPaddingHighlight}>
            <Rect fill={colors.slate[0]}>
              <Rect layout ref={textContentHighlight}>
                <ExtendedTxt
                  text={
                    "Nestled amidst the Aravalli hills, Alwar is a treasure trove of history, nature, and adventure. From grand palaces and mighty forts to serene lakes and wildlife sanctuaries, this city offers a perfect blend of heritage and natural beauty. Whether you're a history enthusiast, a nature lover, or just seeking a peaceful getaway, Alwar has something special for everyone. Explore these must-visit spots and experience the charm of this lesser-known jewel of Rajasthan!"
                  }
                  textWrap
                  fill={colors.slate[950]}
                />
              </Rect>
            </Rect>
          </Rect>
        </Rect>
      </Window>
      <Rect
        ref={frameContentHighlight}
        fill={"#87b2bd"}
        position={frame1Img().position}
        width={300}
        height={430}
        opacity={0}
      />
      <Rect
        ref={framePaddingHighlight}
        stroke={"#b7c480"}
        lineWidth={20}
        position={frame1Img().position}
        width={310}
        height={440}
        end={0}
      />
      <Rect
        ref={frameBorderHighlight}
        stroke={"#e3c382"}
        lineWidth={26}
        position={frame1Img().position}
        width={355}
        height={480}
        end={0}
      />
    </>
  );
  // content 87b2bd
  // padding b7c480
  // border e3c382
  // margin ae8254
  yield* all(
    partsOfBoxTitleSVG().opacity(0, 0.75),
    frame1Img().bottom([spaceX[5], spaceY[5]], 0.75),
    contentTxt().opacity(1, 0.75),
    window().scale(1, 0.75),
    window().y(spaceY[1], 0.75),
    boxModelBoxesImg().top([spaceX[5], spaceNY[5]], 0.75),
    boxModelBoxesImg().scale(0.3, 0.75)
  );
  yield* waitUntil("actualContent");
  yield* all(textContentHighlight().fill("#87b2bd", 0.75));
  yield* waitUntil("photo");
  yield* frameContentHighlight().opacity(1, 0.75).back(0.75);

  yield* waitUntil("padding");

  const paddingTxt = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={paddingTxt}
        text={"2. Padding"}
        fontSize={spaceY["0.75"]}
        fontWeight={500}
        position={[spaceNX[7.5] + 10, spaceNY[4.5]]}
        opacity={0}
      />
    </>
  );

  yield* all(
    contentTxt().opacity(0, 0.75),
    paddingTxt().opacity(1, 0.75),
    textContentHighlight().fill(new Color("#87b2bd").alpha(0.3), 0.75)
  );
  yield* all(
    textPaddingHighlight().fill("#b7c480", 0.75),
    textPaddingHighlight().padding(30, 0.75),
    delay(0.25, framePaddingHighlight().end(1, 1.5))
  );
  yield* waitUntil("border");

  const borderTxt = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={borderTxt}
        text={"3. Border"}
        fontSize={spaceY["0.75"]}
        fontWeight={500}
        position={[spaceNX[7.5] + 10, spaceNY[4.5]]}
        opacity={0}
      />
    </>
  );

  yield* all(
    borderTxt().opacity(1, 0.75),
    paddingTxt().opacity(0, 0.75),
    textPaddingHighlight().fill(new Color("#b7c480").alpha(0.5), 0.75),
    framePaddingHighlight().opacity(0, 0.75)
  );

  yield* all(
    textBorderHighlight().end(1, 1.5),
    frameBorderHighlight().end(1, 1.5)
  );
  yield* waitUntil("margin");
  const frames = createRef<Img>();
  const marginTxt = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={marginTxt}
        text={"4. Margin"}
        fontSize={spaceY["0.75"]}
        fontWeight={500}
        position={[spaceNX[7.5] + 10, spaceNY[4.5]]}
        opacity={0}
      />
      <Img ref={frames} src={Frames} scale={0.25} x={spaceX[5]} opacity={0} />
    </>
  );
  frames().y(window().bottom().y - frames().height() / 8);
  yield* all(
    borderTxt().opacity(0, 0.75),
    marginTxt().opacity(1, 0.75),
    frame1Img().opacity(0, 0.75),
    frameBorderHighlight().opacity(0, 0.75),
    textBorderHighlight().opacity(0, 0.75)
  );
  textBorderHighlight().remove();
  const mBox1 = createRef<ExtendedRect>();
  const mBox2 = createRef<ExtendedRect>();
  const mBox3 = createRef<ExtendedRect>();
  const marginBoxes = createRef<Layout>();
  const gap = createSignal(0.25);
  const mRay1 = createRef<Ray>();
  const mRay2 = createRef<Ray>();
  const mRay3 = createRef<Ray>();
  const mRay4 = createRef<Ray>();
  view.add(
    <>
      <Layout
        ref={marginBoxes}
        layout
        gap={() => spaceX[1] * gap()}
        position={window().position()}
        alignItems={"baseline"}
        opacity={0}
      >
        <ExtendedRect
          ref={mBox1}
          width={spaceX[2]}
          height={spaceY[3]}
          lineWidth={6}
          color={"fuchsia"}
        />
        <ExtendedRect
          ref={mBox2}
          width={spaceX[3]}
          height={spaceY[4]}
          lineWidth={6}
          color="orange"
        />
        <ExtendedRect
          ref={mBox3}
          width={spaceX[2]}
          height={spaceY[3]}
          lineWidth={6}
          color="emerald"
        />
      </Layout>
      <Ray
        ref={mRay1}
        fromX={spaceNX["2.5"]}
        toX={() => spaceNX[2.5] + spaceX["1"] * gap()}
        y={spaceY["3.25"]}
        lineDash={[4, 4]}
        startArrow
        endArrow
        lineWidth={4}
        arrowSize={10}
        stroke={colors.slate[950]}
        layout
        justifyContent={"center"}
        opacity={0}
      >
        <ExtendedTxt
          text={() => `${(40 * gap()).toFixed(0)}`}
          fill={colors.slate[950]}
        />
      </Ray>
      <Ray
        ref={mRay2}
        fromX={spaceNX["5.5"]}
        toX={() => spaceNX[5.5] - spaceX["1"] * gap()}
        y={spaceY["3.25"]}
        lineDash={[4, 4]}
        startArrow
        endArrow
        lineWidth={4}
        arrowSize={10}
        stroke={colors.slate[950]}
        layout
        justifyContent={"center"}
        opacity={0}
      >
        <ExtendedTxt
          text={() => `${(40 * gap()).toFixed(0)}`}
          fill={colors.slate[950]}
        />
      </Ray>
      <Ray
        ref={mRay3}
        fromX={spaceX["5.75"]}
        toX={spaceX[6] + 10}
        y={spaceY["2.25"]}
        startArrow
        endArrow
        lineWidth={4}
        arrowSize={10}
        stroke={colors.slate[950]}
        layout
        justifyContent={"center"}
        opacity={0}
      />
      <Ray
        ref={mRay4}
        fromX={spaceX[4] - 6}
        toX={spaceX[4.25] + 4}
        y={spaceY["2.25"]}
        startArrow
        endArrow
        lineWidth={4}
        arrowSize={10}
        stroke={colors.slate[950]}
        layout
        justifyContent={"center"}
        opacity={0}
      />
    </>
  );
  mBox1().fill(colors[mBox1().colorSignal()][200]);
  mBox2().fill(colors[mBox2().colorSignal()][200]);
  mBox3().fill(colors[mBox3().colorSignal()][200]);
  yield* all(
    delay(1, gap(1.25, 2).to(0.5, 1.5)),
    marginBoxes().opacity(1, 0.75),
    mRay1().opacity(1, 0.75),
    mRay2().opacity(1, 0.75)
  );
  yield* all(
    frames().opacity(1, 0.75),
    delay(0.75, mRay3().opacity(1, 0.75)),
    delay(0.75, mRay4().opacity(1, 0.75))
  );
  yield* waitUntil("scene2End");
});
