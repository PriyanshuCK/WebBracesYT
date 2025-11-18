import { Circle, Code, Icon, Layout, makeScene2D } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Cursor, ExtendedCircle, Grid, HTMLCode, JSCode } from "../nodes";
import { all, createRef, delay, Direction, slideTransition, waitFor, waitUntil } from "@motion-canvas/core";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";

export default makeScene2D(function*(view) {
  view.fontFamily("Geist");
  view.fill(colors.zinc[950]);
  view.opacity(0.7);
  view.add(<Grid />);

  yield* slideTransition(Direction.Right, 0.75);

  const whyIDsExist = createRef<ExtendedTxt>();
  const icon1Circle = createRef<ExtendedCircle>();
  const icon2Circle = createRef<ExtendedCircle>();
  const icon3Circle = createRef<ExtendedCircle>();
  const icon1 = createRef<Icon>();
  const icon2 = createRef<Icon>();
  const icon3 = createRef<Icon>();
  const iconsLayout = createRef<Layout>();
  view.add(
    <>
      <ExtendedTxt
        ref={whyIDsExist}
        text={"Why Do IDs Exist?"}
        fontSize={spaceY[0.67]}
        fontWeight={500}
        opacity={0}
      />
      <Layout
        layout
        gap={spaceX[1]}
        ref={iconsLayout}
      >
        <ExtendedCircle
          ref={icon1Circle}
          opacity={0}
          size={spaceY[2]}
          color="yellow"
        >
          <Icon
            ref={icon1}
            icon={"teenyicons:javascript-outline"}
            height={spaceY[1]}
            color={colors.yellow[500]}
            scale={1}
            layout={false}
          />
        </ExtendedCircle>
        <ExtendedCircle
          ref={icon2Circle}
          opacity={0}
          size={spaceY[2]}
          color="cyan"
        >
          <Icon
            ref={icon2}
            icon={"heroicons:link"}
            height={spaceY[1]}
            color={colors.cyan[500]}
            scale={1}
            layout={false}
          />
        </ExtendedCircle>
        <ExtendedCircle
          ref={icon3Circle}
          opacity={0}
          size={spaceY[2]}
          color="lime"
        >
          <Icon
            ref={icon3}
            icon={"heroicons:tag"}
            height={spaceY[1]}
            color={colors.lime[500]}
            scale={1}
            layout={false}
          />
        </ExtendedCircle>
      </Layout>
    </>
  )

  yield* all(
    whyIDsExist().opacity(1, 0.75),
    whyIDsExist().y(spaceNY[1.5], 0.75),
    iconsLayout().opacity(1, 0.75),
    iconsLayout().y(spaceY[1], 0.75),
    delay(0.2, icon1Circle().opacity(1, 0.75)),
    delay(0.4, icon2Circle().opacity(1, 0.75)),
    delay(0.6, icon3Circle().opacity(1, 0.75)),
  )

  const subTxt = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={subTxt}
        y={spaceY[1]}
        fontSize={spaceY[0.5]}
      />
    </>
  )

  yield* waitUntil("dont-worry");
  yield* all(
    subTxt().text("It’s okay", 0.75).wait(0.5).to("It’s okay if this feels new🌱", 0.75),
    whyIDsExist().opacity(0, 0.75),
    whyIDsExist().y(spaceNY[2.5], 0.75),
    iconsLayout().y(spaceNY[1], 0.75),
  )

  yield* waitUntil("not-expected");
  yield* subTxt().opacity(0, 0.75);
  subTxt().text("")
  subTxt().opacity(1);
  yield* subTxt().text("Have fun exploring 🤸‍♂️", 1);

  yield* waitUntil("showing-them");
  yield* all(
    subTxt().opacity(0, 0.75),
    subTxt().y(spaceY[2], 0.75),
    iconsLayout().y(0, 0.75),
  )

  yield* waitUntil("bigger-picture");
  subTxt().text("")
  subTxt().y(spaceNY[1])
  subTxt().opacity(1);
  yield* all(
    iconsLayout().y(spaceY[1], 0.75),
    subTxt().text("A glimpse of", 0.75),
  )
  yield* subTxt().text("A glimpse of how IDs are useful ✨", 1.25);

  yield* waitUntil("three-main-purposes");
  yield* all(
    icon1Circle().scale(1.1, 0.5).to(1, 0.5),
    delay(0.2, icon2Circle().scale(1.1, 0.5).to(1, 0.5)),
    delay(0.4, icon3Circle().scale(1.1, 0.5).to(1, 0.5)),
  )

  yield* waitUntil("first")
  const iconName = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={iconName}
        text={"Javascript"}
        fontSize={spaceY[0.5]}
        fontWeight={500}
        y={spaceY[2.5]}
        opacity={0}
      />

    </>
  )
  yield* all(
    icon2Circle().opacity(0, 0.75),
    icon3Circle().opacity(0, 0.75),
    subTxt().opacity(0, 0.75),
    iconsLayout().layout(false, 0.75),
    icon1Circle().position([0, spaceY[0]], 0.75),
  )
  yield* all(
    icon1Circle().y(spaceNY[1.5], 0.75),
    iconName().y(spaceY[1], 0.75),
    iconName().opacity(1, 0.75),
  )

  yield* waitUntil("js-start")
  const jsCode = createRef<Code>();
  view.add(
    <>
      <JSCode
        ref={jsCode}
      />
    </>
  )

  yield* all(
    jsCode().code.append(`\
const box = document.getElementById("box");
const toggle = document.getElementById("toggle");

toggle.onclick = () => {
  box.classList.toggle("highlight");
};
`, 0.75),
    icon1Circle().scale(0.5, 0.75),
    icon1Circle().position([spaceNX[8.5], spaceNY[5.5]], 0.75),
    iconName().position([spaceNX[6.67], spaceNY[4.5]], 0.75),
    iconName().fontWeight(400, 0.75),
  )

  yield* waitUntil("ids-perfect");
  const cursor = createRef<Cursor>();
  view.add(
    <>
      <Cursor
        ref={cursor}
        color="green"
        position={[spaceX[2], spaceY[0.75]]}
        opacity={0}
      />
    </>
  )

  yield* all(
    cursor().opacity(1, 0.75),
    cursor().position([spaceX[3], spaceNY[0.75]], 0.75),
    jsCode().selection(jsCode().findAllRanges(/.getElementById\("([^"]+)"\)/g), 0.75),
  )

  yield* waitUntil("guarantee");
  const arrow = createRef<ExtendedCircle>();
  const targetingTxt = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedCircle
        ref={arrow}
        startAngle={180}
        endAngle={180}
        color="slate"
        endArrow
        arrowSize={12}
        size={spaceY[2]}
        position={[spaceX[1.5], spaceNY[1.75]]}
        opacity={0}
      />
      <ExtendedTxt
        ref={targetingTxt}
        position={[spaceX[1.75] + 6, spaceNY[2.75]]}
        fontWeight={500}
      />
    </>
  )

  yield* all(
    arrow().endAngle(275, 0.75),
    arrow().opacity(1, 0.75),
    delay(0.5, targetingTxt().text("targeting exactly one element", 1.5)),
    delay(0.5, targetingTxt().x(spaceX[4], 1.5)),
    delay(1.25, cursor().position([spaceX[4.33], spaceNY[2.5]], 0.75)),
  )

  yield* waitUntil("second")
  yield* all(
    arrow().endAngle(180, 0.75),
    arrow().opacity(0, 0.75),
    targetingTxt().opacity(0, 0.75),
    cursor().opacity(0, 0.75),
    cursor().position([spaceX[3.33], spaceNY[1.5]], 0.75),
    jsCode().opacity(0, 0.75),
    iconName().opacity(0, 0.75),
    icon1Circle().scale(0, 0.75),
    icon1Circle().opacity(0, 0.75),
    icon1Circle().y(spaceNY[4.5], 0.75),
    iconName().y(spaceNY[3.5], 0.75),
  )

  yield* waitUntil("anchor-links")
  iconName().position([0, spaceY[2]])
  iconName().text("Anchor links")
  yield* all(
    icon2Circle().opacity(1, 0.75),
    icon2Circle().y(spaceNY[1.5], 0.75),
    iconName().y(spaceY[1], 0.75),
    iconName().opacity(1, 0.75),
  )

  yield* waitUntil("anchor-start")
  const htmlCode = createRef<Code>();
  view.add(
    <>
      <HTMLCode
        ref={htmlCode}
        code={`\
<a href="#contact-us">
  Contact Us
</a>
<div id="contact-us">
  <h3>Contact Us</h3>
  <p>
    ...
  </p>
</div>
`}
        opacity={0}
      />
    </>
  )
  yield* all(
    icon2Circle().scale(0.5, 0.75),
    icon2Circle().position([spaceNX[8.5], spaceNY[5.5]], 0.75),
    iconName().position([spaceNX[6.5], spaceNY[4.5]], 0.75),
    iconName().fontWeight(400, 0.75),
    htmlCode().opacity(1, 0.75),
  )

  yield* waitUntil("directly")
  arrow().startAngle(270)
  arrow().endAngle(270)
  arrow().size(spaceY[1.33])
  arrow().position([spaceX[2] + 8, spaceNY[1.5]])
  yield* all(
    arrow().endAngle(450, 0.75),
    arrow().opacity(1, 0.75),
  )

  targetingTxt().position([spaceX[3], spaceNY[1.5]])
  targetingTxt().text("")
  targetingTxt().opacity(1)
  yield* all(
    targetingTxt().text("click → takes you to this section", 1.25),
    targetingTxt().position([spaceX[5.33], spaceNY[1.5]], 1.25),
  )

  yield* waitUntil("third")
  yield* all(
    arrow().endAngle(270, 0.75),
    arrow().opacity(0, 0.75),
    targetingTxt().opacity(0, 0.75),
    htmlCode().opacity(0, 0.75),
    iconName().opacity(0, 0.75),
    icon2Circle().scale(0, 0.75),
    icon2Circle().opacity(0, 0.75),
    icon2Circle().y(spaceNY[4.5], 0.75),
    iconName().y(spaceNY[3.5], 0.75),
  )

  yield* waitUntil("s7-end");
})
