import { Img, makeScene2D } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Cursor, Grid } from "../nodes";
import { all, createRef, waitFor, waitUntil } from "@motion-canvas/core";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import ui2Img from "../images/s1/ui2.png"
import house1Img from "../images/s1/house-html-structure 1.png"
import house2Img from "../images/s1/house-html-structure 2.png"
import house3Img from "../images/s1/house-html-structure 3.png"
import house4Img from "../images/s1/house-css-styled 1.png"
import house5Img from "../images/s1/house-css-styled 2.png"
import house6Img from "../images/s1/house-css-styled 3.png"
import uiImg from "../images/s1/ui.png"

export default makeScene2D(function*(view) {
  view.fontFamily('Geist');
  view.fill(colors.zinc[950]);
  // view.add(<Grid />);

  const buildingHouse = createRef<ExtendedTxt>();
  const buildingWebpage = createRef<ExtendedTxt>();
  const equals = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={buildingWebpage}
        text={"Building a webpage"}
        fontSize={spaceY[0.67]}
        y={spaceY[1]}
        opacity={0}
      />
      <ExtendedTxt
        ref={buildingHouse}
        text={"Building a house"}
        fontSize={spaceY[0.67]}
        y={spaceY[1]}
        x={spaceNX[3] + 8}
        opacity={0}
      />
      <ExtendedTxt
        ref={equals}
        text={"≈"}
        fontSize={spaceY[0.67]}
        opacity={0}
      />
    </>
  )

  yield* all(
    buildingWebpage().opacity(1, 0.75),
    buildingWebpage().y(0, 0.75),
  )

  yield* all(
    equals().opacity(1, 0.75),
    buildingWebpage().x(spaceX[3.33], 0.75),
  )

  yield* all(
    buildingHouse().opacity(1, 0.75),
    buildingHouse().y(0, 0.75),
  )

  yield* waitUntil("put-structure")
  const ui2 = createRef<Img>();
  const house1 = createRef<Img>();
  const house2 = createRef<Img>();
  const house3 = createRef<Img>();
  const webHtml = createRef<ExtendedTxt>();
  view.add(
    <>
      <Img
        ref={house1}
        src={house1Img}
        opacity={0}
        scale={0.2}
        position={[spaceNX[4.5], spaceY[1]]}
      />
      <Img
        ref={house2}
        src={house2Img}
        opacity={0}
        scale={0.2}
        position={[spaceNX[4.5], spaceY[0]]}
      />
      <Img
        ref={house3}
        src={house3Img}
        opacity={0}
        scale={0.2}
        position={[spaceNX[4.5], spaceY[0]]}
      />
      <Img
        ref={ui2}
        src={ui2Img}
        opacity={0}
        scale={0.18}
        position={[spaceX[4.5], spaceY[1.25]]}
        stroke={colors.slate[500]}
        lineWidth={32}
        radius={48}
      />
      <ExtendedTxt
        ref={webHtml}
        text={"Just HTML — structure only"}
        position={[spaceX[4.5], spaceY[3]]}
        opacity={0}
      />
    </>
  )
  yield* all(
    equals().opacity(0, 0.75),
    buildingHouse().y(spaceNY[4.5], 0.75),
    buildingHouse().x(spaceNX[4.5], 0.75),
    buildingWebpage().y(spaceNY[4.5], 0.75),
    buildingWebpage().x(spaceX[4.5], 0.75),
    buildingHouse().fontSize(spaceY[0.5], 0.75),
    buildingWebpage().fontSize(spaceY[0.5], 0.75),
  )

  yield* waitUntil("walls")
  yield* all(
    house1().opacity(1, 0.75),
    house1().y(spaceY[0], 0.75),
  )

  yield* waitUntil("windows")
  yield* all(
    house2().opacity(1, 0.75),
    house1().opacity(0, 0.75),
  )

  yield* waitUntil("doors")
  yield* all(
    house2().opacity(0, 0.75),
    house3().opacity(1, 0.75),
  )

  yield* waitUntil("your-html")
  yield* all(
    ui2().opacity(1, 0.75),
    ui2().y(spaceY[0.25], 0.75),
    webHtml().opacity(1, 0.75),
  )

  yield* waitUntil("walls-colors")
  const house4 = createRef<Img>();
  const house5 = createRef<Img>();
  const house6 = createRef<Img>();
  view.add(
    <>
      <Img
        ref={house4}
        src={house4Img}
        opacity={0}
        scale={0.2}
        position={[spaceNX[4.5], spaceY[0]]}
      />
      <Img
        ref={house5}
        src={house5Img}
        opacity={0}
        scale={0.2}
        position={[spaceNX[4.5], spaceY[0]]}
      />
      <Img
        ref={house6}
        src={house6Img}
        opacity={0}
        scale={0.2}
        position={[spaceNX[4.5], spaceY[0]]}
      />
    </>
  )
  yield* all(
    house3().opacity(0, 0.75),
    house4().opacity(1, 0.75),
  )

  yield* waitUntil("windows-colors")
  yield* all(
    house4().opacity(0, 0.75),
    house5().opacity(1, 0.75),
  )

  yield* waitUntil("all-colors")
  yield* all(
    house5().opacity(0, 0.75),
    house6().opacity(1, 0.75),
  )

  yield* waitUntil("css-comes")
  yield* all(
    webHtml().opacity(0, 0.75),
    webHtml().y(spaceY[4], 0.75),
    ui2().opacity(0, 0.75),
    ui2().y(spaceY[4], 0.75),
  )

  webHtml().text("HTML + CSS — styled and beautiful")
  const ui = createRef<Img>();
  view.add(
    <>
      <Img
        ref={ui}
        src={uiImg}
        opacity={0}
        scale={0.18}
        position={[spaceX[4.5], spaceY[1.25]]}
        stroke={colors.violet[500]}
        lineWidth={16}
        radius={48}
      />
    </>
  )
  yield* all(
    ui().opacity(1, 0.75),
    ui().y(spaceY[0.25], 0.75),
  )
  yield* all(
    webHtml().opacity(1, 0.75),
    webHtml().y(spaceY[3], 0.75),
  )

  yield* waitUntil("style-work")
  yield* all(
    ui().scale(0.36, 0.75),
    ui().x(spaceX[2.5], 0.75),
    webHtml().position([spaceX[2.5], spaceY[5]], 0.75),
  )
  yield* waitUntil("make-beautiful")
  yield* all(
    ui().scale(0.18, 0.75),
    ui().x(spaceX[4.5], 0.75),
    webHtml().position([spaceX[4.5], spaceY[3]], 0.75),
  )

  yield* waitUntil("s1-end");
}
)
