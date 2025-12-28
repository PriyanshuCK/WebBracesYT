import { Circle, Code, Img, makeScene2D, word } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { CSSCode, Cursor, ExtendedRect, Grid } from "../nodes";
import { all, createRef, delay, waitFor, waitUntil } from "@motion-canvas/core";
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

  yield* waitUntil("instructions")
  const wallsBlue = createRef<ExtendedTxt>();
  const parasGreen = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={wallsBlue}
        opacity={0}
        text={"make all the walls blue"}
        position={[spaceNX[4.5], spaceY[3.5]]}
      />
      <ExtendedTxt
        ref={parasGreen}
        opacity={0}
        text={"make all the paragraphs green"}
        position={[spaceX[4.5], spaceY[3.5]]}
      />
    </>
  )
  yield* webHtml().opacity(0, 0.75);
  yield* waitFor(1)
  yield* wallsBlue().opacity(1, 0.75);
  yield* parasGreen().opacity(1, 0.75);

  yield* waitUntil("css-write")
  yield* all(
    ui().opacity(0, 0.75),
    ui().y(spaceY[1], 0.75),
    house6().opacity(0, 0.75),
    house6().y(spaceY[1], 0.75),
    buildingHouse().opacity(0, 0.75),
    buildingWebpage().opacity(0, 0.75),
    buildingHouse().y(spaceNY[3.5], 0.75),
    buildingWebpage().y(spaceNY[3.5], 0.75),
    wallsBlue().opacity(0, 0.75),
    parasGreen().position([0, spaceY[2]], 0.75),
  )

  const cssCode = createRef<Code>();
  const cssRule = createRef<ExtendedTxt>();
  view.add(
    <>
      <CSSCode
        ref={cssCode}
        fontSize={spaceY[0.5]}
      />
      <ExtendedTxt
        ref={cssRule}
        fontSize={spaceY[0.67]}
        fontWeight={500}
        y={spaceNY[4.5]}
      />
    </>
  )
  yield* cssCode().code.append(`\
p {
  color: green;
}
`, 0.75);
  yield* waitUntil("css-rule")
  yield* cssRule().text("CSS Rule", 0.75);

  yield* waitUntil("two-parts")
  const rect1 = createRef<ExtendedRect>();
  const rect2 = createRef<ExtendedRect>();
  const arc1 = createRef<Circle>();
  const arc2 = createRef<Circle>();
  const cursor = createRef<Cursor>();
  const selector = createRef<ExtendedTxt>();
  const declaration = createRef<ExtendedTxt>();
  const propValue = createRef<ExtendedTxt>();
  const whatTo = createRef<ExtendedTxt>();
  const howTo = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedRect
        ref={rect1}
        size={spaceX[0.75]}
        position={[spaceNX[2] + 6, spaceNY[1] - 12]}
        scale={0}
        lineDash={[10, 15]}
        lineCap={"round"}
        radius={100}
        color={"sky"}
      />
      <ExtendedRect
        ref={rect2}
        size={[spaceX[3.75], spaceY[0.75] - 8]}
        position={[spaceX[0.25], spaceNY[0.5] + 4]}
        scale={0}
        lineDash={[10, 15]}
        lineCap={"round"}
        color="emerald"
      />
      <Circle
        ref={arc1}
        size={spaceY[3]}
        stroke={'white'}
        lineWidth={3}
        startAngle={-140}
        endAngle={-140}
        endArrow
        position={[spaceNX[0.67], spaceNY[0.67]]}
        arrowSize={12}
        opacity={0}
      />
      <ExtendedTxt
        ref={selector}
        fontSize={spaceY[0.5]}
        position={[spaceX[0.67], spaceNY[2.25] + 10]}
        fill={colors.sky[500]}
      />
      <ExtendedTxt
        ref={whatTo}
        position={[spaceX[2.75], spaceNY[2] - 10]}
        text={"(what to style)"}
        opacity={0}
      />
      <Circle
        ref={arc2}
        size={spaceY[1.33]}
        stroke={'white'}
        lineWidth={3}
        startAngle={-50}
        endAngle={-50}
        endArrow
        position={[spaceX[1], spaceY[0.5]]}
        arrowSize={12}
        opacity={0}
      />
      <ExtendedTxt
        ref={declaration}
        fontSize={spaceY[0.5]}
        position={[spaceX[0], spaceY[1.5]]}
        fill={colors.emerald[500]}
      />
      <ExtendedTxt
        ref={propValue}
        position={[spaceNX[0.25] + 4, spaceY[0.25] + 10]}
        opacity={0}
        text={"property : value"}
      />
      <ExtendedTxt
        ref={howTo}
        position={[spaceX[2.33] + 8, spaceY[1.5] + 4]}
        text={"(how to style)"}
        opacity={0}
      />
      <Cursor
        ref={cursor}
        color="green"
        position={[spaceNX[3] + 8, spaceY[0] + 8]}
        opacity={0}
      />
    </>
  )

  yield* all(
    rect1().scale(1, 0.75),
    delay(0.4, rect2().scale(1, 0.75)),
    delay(0.6, parasGreen().y(spaceY[4.5], 0.75))
  )

  yield* waitUntil("selector")
  yield* all(
    arc1().endAngle(-85, 0.75),
    arc1().opacity(1, 0.75),
    selector().text("Selector", 0.75),
  )
  yield* whatTo().opacity(1, 0.75);

  yield* waitUntil("declaration")
  yield* all(
    propValue().opacity(1, 0.75),
    delay(0.3, declaration().text("Declaration", 0.75)),
    delay(0.2, arc2().endAngle(50, 0.75)),
    delay(0.2, arc2().opacity(1, 0.75)),
  )
  yield* howTo().opacity(1, 0.75);

  yield* waitUntil("select-ps")
  yield* all(
    cursor().opacity(1, 0.75),
    cursor().position([spaceNX[2] + 8, spaceNY[1] + 8], 0.75),
  )

  yield* waitUntil("text-green")
  yield* cursor().position([spaceNX[0.75], spaceNY[0.25] + 6], 0.75);
  yield* cursor().position([spaceX[1] + 8, spaceNY[0.25] + 6], 0.75);

  yield* waitUntil("p-selector")
  yield* cursor().position([spaceNX[2] + 8, spaceNY[1] + 8], 0.75);
  yield* cursor().position([spaceX[0.75], spaceNY[1.75]], 0.75);

  yield* waitUntil("part-inside")
  yield* cursor().position([spaceX[0], spaceY[0.67]], 0.75);

  yield* waitUntil("is-declaration")
  yield* cursor().position([spaceX[0], spaceY[1.75] + 8], 0.75);

  yield* waitUntil("you-can-style")
  yield* all(
    arc1().endAngle(-140, 0.75),
    arc1().opacity(0, 0.75),
    arc2().endAngle(-50, 0.75),
    arc2().opacity(0, 0.75),
    rect1().size(0, 0.75),
    rect2().size(0, 0.75),
    cursor().opacity(0, 0.75),
    cursor().position([spaceX[1], spaceY[2.75] + 8], 0.75),
    parasGreen().opacity(0, 0.75),
    whatTo().opacity(0, 0.75),
    howTo().opacity(0, 0.75),
    selector().opacity(0, 0.75),
    declaration().opacity(0, 0.75),
    propValue().opacity(0, 0.75),
    selector().y(spaceNY[1.25], 0.75),
    declaration().y(spaceY[2.5], 0.75),
    cssRule().opacity(0, 0.75),
    cssCode().code.replace(word(0, 0, 1), `#main-title`, 0.75),
    cssCode().code.replace(word(1, 1, 1), ` background-`, 0.75)
  )

  yield* waitUntil("multiple")
  yield* cssCode().code.replace(word(0, 0, 11), `.card`, 0.75);

  yield* waitUntil("specific-parts")
  yield* cssCode().code.replace(word(0, 0, 5), `.contact > input[type="text"]`, 0.75);

  yield* waitUntil("s1-end");
}
)
