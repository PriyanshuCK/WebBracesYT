import { Code, Icon, Layout, lines, makeScene2D, Txt } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Cursor, ExtendedCircle, Grid, HTMLCode, JSCode, ViewportManager } from "../nodes";
import { all, createRef, delay, Direction, Reference, slideTransition, waitUntil } from "@motion-canvas/core";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import beq1 from "../images/s7/beq1.png"
import beq2 from "../images/s7/beq2.png"

export default makeScene2D(function*(view) {
  view.fontFamily("Geist");
  view.fill(colors.zinc[950]);
  // view.opacity(0.7);
  // view.add(<Grid />);

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

  yield* waitUntil("form-labels")
  iconName().position([0, spaceY[2]])
  iconName().text("Form Labels")
  yield* all(
    icon3Circle().opacity(1, 0.75),
    icon3Circle().y(spaceNY[1.5], 0.75),
    iconName().y(spaceY[1], 0.75),
    iconName().opacity(1, 0.75),
  )

  yield* waitUntil("labels-start")
  yield* all(
    icon3Circle().scale(0.5, 0.75),
    icon3Circle().position([spaceNX[8.5], spaceNY[5.5]], 0.75),
    iconName().position([spaceNX[6.5], spaceNY[4.5]], 0.75),
    iconName().fontWeight(400, 0.75),
  )

  const viewportManager = new ViewportManager()
    .addHtml()
    .addCss()
    .addBrowser();
  viewportManager.addToView(view);
  const wrapper = viewportManager.getWrapper();
  const refs = viewportManager.getViewportRefs();
  const htmlCode1: Reference<Code> = refs.html?.code;
  const cssCode: Reference<Code> = refs.css?.code;

  viewportManager.updateLayoutDimensions(spaceX[18], spaceY[8]);
  viewportManager.removeViewport("css");
  yield* all(
    viewportManager.animateToLayout({ duration: 0.75, browserImage: beq1 }),
    wrapper().size([spaceX[18], spaceY[8]], 0.75),
    wrapper().y(spaceY[1], 0.75),
    htmlCode1().code.append(`\
<form>
  <label for="name">Name:</label>
  <input id="name" type="text" />
</form>
`, 0.75),
  );
  const targetingTxt1 = createRef<Txt>();
  view.add(
    <>
      <Txt
        ref={targetingTxt1}
        position={[spaceX[0.25] - 4, spaceNY[1.33]]}
        fill={colors.zinc[700]}
        fontSize={spaceY[0.33]}
      />
    </>
  )
  targetingTxt1().text("")
  targetingTxt1().opacity(1)
  cursor().position([spaceX[1.5], spaceNY[1.25]]);
  yield* all(
    cursor().opacity(1, 0.5),
    cursor().position([spaceX[0.5], spaceNY[2.25]], 0.5),
  )
  yield* all(
    cursor().scale(0.8, 0.5).to(1, 0.5),
    targetingTxt1().text("Clicking the label focuses this input", 1.25),
    targetingTxt1().position([spaceX[2.75], spaceNY[1.33]], 1.25),
    delay(0.25, viewportManager.animateToLayout({ duration: 0.75, browserImage: beq2 })),
  )

  yield* waitUntil("but-for-general-styling")
  viewportManager.removeViewport("browser");
  viewportManager.showViewport("css");
  const classTitle = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={classTitle}
        fontSize={spaceY[0.5]}
        fontWeight={500}
        y={spaceNY[4.5]}
      />
    </>
  )
  yield* all(
    cursor().opacity(0, 0.75),
    cursor().position([spaceX[1.5], spaceNY[1.25]], 0.75),
    targetingTxt1().opacity(0, 0.75),
    viewportManager.animateToLayout({ duration: 0.75 }),
    iconName().opacity(0, 0.75),
    icon3Circle().scale(0, 0.75),
    icon3Circle().opacity(0, 0.75),
    icon3Circle().y(spaceNY[4.5], 0.75),
    iconName().y(spaceNY[3.5], 0.75),
    delay(0.5, htmlCode1().code.replace(lines(0, 3), `\
<h2 class="emphasis">
  Reusable classes on a heading
</h2>
<p class="note small emphasis">
  A small emphasized note.
</p>
<p class="note large">
  A large note without emphasis.
</p>
`, 0.75)),
    delay(0.5, cssCode().code.append(`\
.emphasis {
  color: #b73aff;
  font-weight: 600;
}
.note {
  background: #dff6e3;
  border-left: 4px solid #3ba776;
  padding: 8px;
}
.small {
  font-size: 0.85rem;
}
.large {
  font-size: 1.25rem;
}
`, 0.75)),
  )
  yield* waitUntil("classes-better-styling")
  yield* classTitle().text("Classes: The Better Styling Choice", 1.75);
  cursor().position([spaceNX[5], spaceNY[1.5]])
  yield* waitUntil("reusable-and-maintainable")
  yield* all(
    cursor().position([spaceNX[6], spaceNY[2.5]], 0.75),
    cursor().opacity(1, 0.75),
    htmlCode1().selection(htmlCode1().findAllRanges(/class="[^"]+"/g), 0.75),
    cssCode().selection(
      cssCode().findAllRanges(/\.[A-Za-z_][A-Za-z0-9_-]*/g),
      0.75
    ),
  );
  yield* cursor().position([spaceNX[4], spaceNY[1]], 0.75);
  yield* cursor().position([spaceNX[6.75], spaceNY[1]], 0.75);
  yield* cursor().position([spaceNX[6.75], spaceY[0.33]], 0.75);

  yield* waitUntil("s7-end");
})
