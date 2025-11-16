import { Circle, Code, Img, Layout, lines, makeScene2D, Rect, word } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Cursor, ExtendedRect, ViewportManager } from "../nodes";
import { all, createRef, DEFAULT, delay, Direction, Reference, slideTransition, waitUntil } from "@motion-canvas/core";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import eqh1 from "../images/s4/eqh1.png";
import css_spec from "../images/s4/css-spec-case-insensitivity.png";
import html_spec from "../images/s4/mdn-attr-spec-case-sensitivity.png";
import eqh2 from "../images/s4/eqh2.png";
import eqh3 from "../images/s4/eqh3.png";
import eqh4 from "../images/s4/eqh4.png";
import eqh5 from "../images/s4/eqh5.png";
import eqh6 from "../images/s4/eqh6.png";
import eqh7 from "../images/s4/eqh7.png";

export default makeScene2D(function*(view) {
  view.fontFamily('Geist');
  view.fill(colors.zinc[950]);
  // view.opacity(0.3);
  // view.add(<Grid />);

  yield* slideTransition(Direction.Right, 0.75);

  const doubtEmoji = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={doubtEmoji}
        text={"🤔"}
        fontSize={spaceY[1]}
        position={[0, spaceY[1]]}
        opacity={0}
        rotation={-15}
      />
    </>
  );

  yield* all(
    doubtEmoji().opacity(1, 0.75),
    doubtEmoji().y(0, 0.75),
    doubtEmoji().rotation(0, 0.75),
  );

  yield* waitUntil("are-case-sensitive");
  const areClassSelectorsCaseSensitive = createRef<ExtendedTxt>();
  const threeSelectorsLayout = createRef<Layout>();
  const selectorsHighlight = createRef<ExtendedRect>();
  const sameOrDifferentTxt = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={areClassSelectorsCaseSensitive}
        fontSize={spaceY[0.75]}
        opacity={0}
        y={spaceNY[3.5]}
      />
      <Layout
        ref={threeSelectorsLayout}
        layout
        direction={"column"}
        gap={spaceY[0.25]}
        opacity={0}
      >
        <ExtendedTxt text={".myclass"} fontSize={spaceY[0.5]} />
        <ExtendedTxt text={".MyClass"} fontSize={spaceY[0.5]} />
        <ExtendedTxt text={".MYCLASS"} fontSize={spaceY[0.5]} />
      </Layout>
      <ExtendedRect
        ref={selectorsHighlight}
        size={0}
        position={[spaceNX[1.5], spaceNY[1.5]]}
        highlighted
        opacity={0}
      />
      <ExtendedTxt
        ref={sameOrDifferentTxt}
        y={spaceY[3.5]}
        opacity={0}
        fontSize={spaceY[0.5]}
      />
    </>
  );

  yield* all(
    doubtEmoji().y(spaceY[1], 0.75),
    doubtEmoji().opacity(0, 0.75),
    doubtEmoji().rotation(15, 0.75),
    areClassSelectorsCaseSensitive().opacity(1, 0.75),
    areClassSelectorsCaseSensitive().text("Are class selectors", 1.5),
    threeSelectorsLayout().opacity(1, 0.75),
    selectorsHighlight().size([spaceY[3], spaceY[3]], 0.75),
    selectorsHighlight().position(0, 0.75),
    selectorsHighlight().opacity(1, 0.75),
  );

  yield* all(
    areClassSelectorsCaseSensitive().text("Are class selectors case-sensitive?", 1),
    sameOrDifferentTxt().text("same or different? 🤔", 1),
    sameOrDifferentTxt().opacity(1, 0.75),
    sameOrDifferentTxt().y(spaceY[2.5], 0.75),
  );

  yield* waitUntil("different");
  yield* sameOrDifferentTxt().text("Different!", 0.75);

  yield* waitUntil("whenWorkingWithHTML");
  const workingWithHTMLTxt = createRef<ExtendedTxt>();
  const classNamesSensitiveTxt = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={workingWithHTMLTxt}
        fontSize={spaceY[0.75]}
      />
      <ExtendedTxt
        ref={classNamesSensitiveTxt}
        fontSize={spaceY[0.75]}
      />
    </>
  )

  yield* all(
    areClassSelectorsCaseSensitive().opacity(0, 0.75),
    threeSelectorsLayout().opacity(0, 0.75),
    selectorsHighlight().end(0, 0.75),
    selectorsHighlight().opacity(0, 0.75),
    sameOrDifferentTxt().opacity(0, 0.75),
    workingWithHTMLTxt().text("When working with HTML,", 1),
  )

  yield* all(
    workingWithHTMLTxt().fontSize(spaceY[0.5], 0.75),
    workingWithHTMLTxt().y(spaceNY[1.5], 0.75),
    classNamesSensitiveTxt().text("class names are case-sensitive!", 1),
  )

  yield* waitUntil("the-browser");

  yield* all(
    workingWithHTMLTxt().opacity(0, 0.5),
    classNamesSensitiveTxt().opacity(0, 0.5),
  );

  const viewportManager = new ViewportManager()
    .addHtml(`\
<p class="myclass">
  Hello World
</p>
<p class="MyClass">
  Hello World
</p>
<p class="MYCLASS">
  Hello World
</p>
`)
    .addCss(`\
.myclass {
  font-size: 1rem;
}
.MyClass {
  font-size: 2rem;
}
.MYCLASS {
  font-size: 3rem;
}
`)
    .addBrowser(eqh1);

  viewportManager.addToView(view);
  const refs = viewportManager.getViewportRefs();
  const htmlCode: Reference<Code> = refs.html?.code;
  const cssCode: Reference<Code> = refs.css?.code;
  const browserViewport = refs.browser?.viewport;

  const cursor = createRef<Cursor>();
  view.add(
    <>
      <Cursor ref={cursor} position={[spaceX[6.5], spaceNY[0.5]]} opacity={0} color={"green"} />
    </>
  );

  yield* all(
    slideTransition(Direction.Right, 0.75),
    viewportManager.animateToPresetLayout('EQ_H'),
  );

  yield* all(
    cursor().opacity(1, 0.75),
    cursor().position([spaceX[5.5], spaceNY[2.25]], 0.75),
  );

  yield* waitUntil("exactly-as");
  yield* all(
    cursor().position([spaceNX[6], spaceNY[1.5]], 1),
    htmlCode().selection(htmlCode().findAllRanges(/class="[^"]+"/g), 0.75),
    cssCode().selection(lines(9), 0.75),
  );

  yield* waitUntil("these-three");
  yield* cursor().position([spaceNX[6.25], spaceNY[4.5]], 1);

  yield* waitUntil("completely-different");
  yield* all(
    cursor().position([spaceNX[2.25], spaceNY[4.5]], 1),
    cssCode().selection(
      cssCode().findAllRanges(/\.[A-Za-z_][A-Za-z0-9_-]*/g),
      0.75
    ),
  );
  yield* cursor().position([spaceNX[1.25], spaceNY[1.75]], 1);

  yield* waitUntil("why-confusion");

  const wrapper = viewportManager.getWrapper();
  const whyConfusion = createRef<ExtendedTxt>();
  view.add(
    <ExtendedTxt ref={whyConfusion} y={spaceNY[4.5]} fontSize={spaceY[0.5]} fontWeight={500} opacity={0} />
  );

  viewportManager.updateLayoutDimensions(spaceX[18], spaceY[8]);
  yield* all(
    wrapper().size([spaceX[18], spaceY[8]], 0.75),
    wrapper().y(spaceY[1], 0.75),
    whyConfusion().text("Here's why people get confused!", 1),
    viewportManager.animateToPresetLayout('B_EQ'),
    whyConfusion().opacity(1, 0.75),
    cursor().opacity(0, 0.75),
    htmlCode().fontSize(spaceY[0.25], 0.75),
    cssCode().fontSize(spaceY[0.25], 0.75),
    browserViewport().opacity(0, 0.75),
  );

  yield* waitUntil("cssDoesntCare");
  const cssSpecImg = createRef<Rect>();
  const cssArc = createRef<Circle>();
  const cssDoesntCare = createRef<ExtendedTxt>();
  const cssSourceTxt = createRef<Rect>();
  view.add(
    <>
      <Rect
        ref={cssSpecImg}
        layout
        position={[spaceX[4.5], spaceY[1]]}
        lineWidth={12}
        radius={12}
        stroke={colors.violet[500]}
        scale={0.5}
        opacity={0}
      >
        <Img
          src={css_spec}
          radius={12}
        />
      </Rect>
      <Circle
        ref={cssArc}
        stroke={colors.slate[0]}
        lineWidth={4}
        height={spaceY[4]}
        width={spaceX[6]}
        startAngle={-90}
        endAngle={-90}
        opacity={0}
        lineCap={"round"}
        endArrow
        arrowSize={16}
      />
      <ExtendedTxt
        ref={cssDoesntCare}
        position={[spaceX[5], spaceNY[2]]}
      />
      <Rect
        ref={cssSourceTxt}
        layout
        fill={colors.violet[500]}
        position={() => cssSpecImg().bottom()}
        padding={[6, 12]}
        radius={8}
        opacity={0}
      >
        <ExtendedTxt
          text="source: w3.org"
          fontSize={spaceY[0.25]}
        />
      </Rect>
    </>
  );

  yield* all(
    cssSpecImg().opacity(1, 0.75),
    cssSourceTxt().opacity(1, 0.75),
    htmlCode().selection(word(0, 0, 0), 0.75),
  );
  yield* all(
    cssArc().opacity(1, 0.75),
    cssArc().endAngle(-18, 0.75),
  );
  yield* cssDoesntCare().text("CSS treats selectors case-insensitively", 1.5);

  yield* waitUntil("actual-html");
  yield* all(
    cssArc().opacity(0, 0.75),
    cssArc().endAngle(-90, 0.75),
    cssDoesntCare().opacity(0, 0.75),
    cssSpecImg().opacity(0, 0.75),
    cssSourceTxt().opacity(0, 0.75),
    cssSpecImg().y(spaceY[2], 0.75),
    cssCode().selection(word(0, 0, 0), 0.75),
    htmlCode().selection(htmlCode().findAllRanges(/class="[^"]+"/g), 0.75),
  );

  const htmlSpecImg = createRef<Rect>();
  const htmlArc = createRef<Circle>();
  const htmlDoesntCare = createRef<ExtendedTxt>();
  const htmlSourceTxt = createRef<Rect>();
  view.add(
    <>
      <Rect
        ref={htmlSpecImg}
        layout
        position={[spaceX[4.5], spaceY[1]]}
        lineWidth={12}
        radius={12}
        stroke={colors.orange[500]}
        scale={0.49}
        opacity={0}
      >
        <Img
          src={html_spec}
          radius={12}
        />
      </Rect>
      <Circle
        ref={htmlArc}
        stroke={colors.slate[0]}
        lineWidth={4}
        height={spaceY[4]}
        width={spaceX[6]}
        startAngle={90}
        endAngle={90}
        y={spaceY[2]}
        opacity={0}
        lineCap={"round"}
        startArrow
        arrowSize={16}
      />
      <ExtendedTxt
        ref={htmlDoesntCare}
        position={[spaceX[4.5], spaceY[4]]}
      />
      <Rect
        ref={htmlSourceTxt}
        layout
        fill={colors.orange[500]}
        position={() => htmlSpecImg().bottom()}
        padding={[6, 12]}
        radius={8}
        opacity={0}
      >
        <ExtendedTxt
          text="source: MDN"
          fontSize={spaceY[0.25]}
        />
      </Rect>
    </>
  )

  yield* all(
    htmlSpecImg().opacity(1, 0.75),
    htmlSourceTxt().opacity(1, 0.75),
  );
  yield* all(
    htmlArc().opacity(1, 0.75),
    htmlArc().startAngle(20, 0.75),
  );
  yield* waitUntil("html-case-sensitive");
  yield* htmlDoesntCare().text("HTML classes = case-sensitive", 1.5);

  yield* waitUntil("most-developers");

  viewportManager.removeViewport("browser");
  yield* all(
    htmlArc().opacity(0, 0.75),
    htmlArc().startAngle(90, 0.75),
    htmlSpecImg().opacity(0, 0.75),
    htmlSourceTxt().opacity(0, 0.75),
    htmlDoesntCare().opacity(0, 0.75),
    viewportManager.animateToLayout(),
    htmlCode().fontSize(spaceY[0.33], 0.75),
    cssCode().fontSize(spaceY[0.33], 0.75),
    whyConfusion().text("", 0.75),
  );

  yield* all(
    htmlCode().selection(DEFAULT, 0.75),
    cssCode().selection(DEFAULT, 0.75),
    htmlCode().code.replace(lines(0, 8), `\
<div class="card-container">
  <p class="card-title">
    Hello World
  </p>
  <p class="card-description">
    This is a clean, predictable class name.
  </p>
</div>`, 0.75),
    cssCode().code.replace(lines(0, 8), `\
.card-container {
  padding: 1rem;
  background-color: #f2f2f2;
}
.card-title {
  font-size: 1.5rem;
  font-weight: bold;
}
.card-description {
  font-size: 1rem;
  color: #555;
}`, 0.75),
    whyConfusion().text("Easiest Way to Avoid Case Issues", 1),
  );

  yield* waitUntil("hyphen");
  yield* all(
    htmlCode().selection(htmlCode().findAllRanges(/class="[^"]+"/g), 0.75),
    cssCode().selection(
      cssCode().findAllRanges(/\.[A-Za-z_][A-Za-z0-9_-]*/g),
      0.75
    ),
    cursor().opacity(1, 0.75),
    cursor().position([spaceNX[4.75], spaceNY[1.75]], 1),
  );

  yield* waitUntil("this-way");
  yield* all(
    cursor().opacity(0, 0.75),
    cursor().position([spaceNX[3.75], spaceNY[0.75]], 0.75),
  )

  yield* waitUntil("now-invalid");
  viewportManager.removeViewport("css");
  viewportManager.updateLayoutDimensions(spaceX[18], spaceY[10]);
  htmlCode().selection(DEFAULT);
  cursor().position([spaceNX[1], spaceNY[3.5]]);
  yield* all(
    viewportManager.animateToLayout(),
    wrapper().size([spaceX[18], spaceY[10]], 1),
    wrapper().y(spaceY[0], 1),
    whyConfusion().opacity(0, 0.75),
    delay(0.5, cursor().opacity(1, 0.75)),
    delay(0.5, cursor().position([spaceNX[2], spaceNY[4.5]], 1)),
    htmlCode().code.replace(lines(0, 8), `\
<p class="123hello">
  Class name starting with a number
</p>
`, 1.25),
  );

  yield* waitUntil("or-special-characters");
  yield* all(
    cursor().position([spaceNX[2.33], spaceNY[3]], 0.75),
    htmlCode().code.append(`\
<p class="?oops">
  Class name containing a special character
</p>
`, 0.75),
  )

  yield* waitUntil("allowed-in-html");
  const allowedSpecialChars = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={allowedSpecialChars}
        y={spaceY[3]}
        fontSize={spaceY[0.5]}
        fontWeight={500}
      />
    </>
  )
  yield* all(
    allowedSpecialChars().text("Allowed in HTML ✅", 0.75),
    cursor().opacity(0, 0.75),
    cursor().position([spaceNX[1.33], spaceNY[2]], 0.75),
  )

  yield* waitUntil("but-in-css");
  viewportManager.showViewport("css");
  cssCode().code.remove(lines(0, 11));
  cssCode().selection(DEFAULT);
  yield* all(
    viewportManager.animateToLayout({ duration: 0.75 }),
    allowedSpecialChars().x(spaceNX[4.5], 0.75),
    allowedSpecialChars().fontSize(spaceY[0.33], 0.75),
    allowedSpecialChars().fontWeight(400, 0.75),
  );

  yield* waitUntil("start-with-number");
  yield* cssCode().code.append(`\
.123hello {
  color: red;
}
`, 0.75);

  cursor().position([spaceX[1.67], spaceNY[3.5]]);
  yield* all(
    cursor().opacity(1, 0.75),
    cursor().position([spaceX[0.67], spaceNY[4.5]], 0.75),
  )

  yield* cssCode().code.append(`\
?oops {
  color: blue;
}
`, 0.75);
  yield* cursor().position([spaceX[0.5] - 8, spaceNY[2.75] - 8], 0.75);

  const invalidInCss = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={invalidInCss}
        position={[spaceX[4.5], spaceY[3]]}
        fontSize={spaceY[0.5]}
        fontWeight={500}
      />
    </>
  )

  yield* waitUntil("invalid-selectors");
  yield* all(
    invalidInCss().text("Invalid selectors ❌", 0.75),
    cursor().opacity(0, 0.75),
    cursor().position([spaceX[1.5], spaceNY[1.75]], 0.75),
  );

  yield* waitUntil("browser-ignore");
  viewportManager.showViewport("browser");
  yield* all(
    allowedSpecialChars().x(spaceNX[6], 0.75),
    invalidInCss().x(0, 0.75),
    invalidInCss().fontSize(spaceY[0.33], 0.75),
    invalidInCss().fontWeight(400, 0.75),
    viewportManager.animateToPresetLayout('EQ_H', { duration: 0.75, browserImage: eqh2 }),
    htmlCode().code.remove(word(1, 2, 11), 0.75),
    htmlCode().code.remove(word(4, 2, 11), 0.75),
    htmlCode().code.remove(word(4, 38, 5), 0.75),
  );

  const noStyleApplied = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={noStyleApplied}
        position={[spaceX[6], spaceY[3]]}
        fontSize={spaceY[0.5]}
        fontWeight={500}
        fill={colors.slate[700]}
      />
    </>
  )
  yield* waitUntil("no-style-applied");
  yield* noStyleApplied().text("No styles applied!", 1.25);

  yield* waitUntil("use-numbers");
  yield* all(
    cursor().opacity(1, 0.75),
    cursor().position([spaceNX[6.75] - 8, spaceNY[4.5]], 1),
    cssCode().code.remove(lines(0, 5), 0.75),
    invalidInCss().opacity(0, 0.75),
    noStyleApplied().opacity(0, 0.75),
  )
  yield* waitUntil("or-special-characters-2");
  invalidInCss().text("");
  noStyleApplied().text("");
  yield* cursor().position([spaceNX[6.75] - 8, spaceNY[3]], 0.75);

  yield* waitUntil("escape-them");
  invalidInCss().text("Valid selector ✅");
  noStyleApplied().text("Styles will be applied ✅");
  yield* all(
    cssCode().code.append(`\
.\\?oops {
  color: blue;
}
`, 0.75),
    cursor().position([spaceNX[2.5] + 6, spaceNY[4.5] + 8], 1),
    invalidInCss().opacity(1, 0.75),
    invalidInCss().fontSize(spaceY[0.5], 0.75),
  )

  yield* waitUntil("the-backslash");
  yield* all(
    cssCode().selection(word(0, 0, 7), 0.75),
    htmlCode().selection(word(3, 3, 13), 0.75),
  );

  yield* waitUntil("treat-it-normal");
  yield* all(
    viewportManager.animateToPresetLayout('EQ_H', { browserImage: eqh3, duration: 0.75 }),
    noStyleApplied().opacity(1, 0.75),
  );

  yield* waitUntil("for-example");
  yield* all(
    htmlCode().selection(DEFAULT, 0.75),
    cssCode().selection(DEFAULT, 0.75),
    cursor().opacity(0, 0.75),
    cursor().position([spaceNX[1.5], spaceNY[3.5]], 0.75),
  )

  yield* waitUntil("class-like-this");
  yield* all(
    cursor().opacity(1, 0.75),
    cursor().position([spaceNX[6], spaceNY[1.5] + 8], 1),
    htmlCode().code.append(`\
<p class="hello!world">
  containing an exclamation\nmark
</p>
`, 0.75),
    viewportManager.animateToPresetLayout('EQ_H', { browserImage: eqh4, duration: 0.75 }),
    htmlCode().selection(word(6, 3, 19), 0.75),
  )

  yield* waitUntil("escaped-like-this");
  yield* all(
    cssCode().code.append(`\
.hello\\!world {
  color: green;
}
`, 0.75),
    cursor().position([spaceNX[1.5], spaceNY[3] + 8], 1),
    viewportManager.animateToPresetLayout('EQ_H', { browserImage: eqh5, duration: 0.75 }),
    cssCode().selection(word(3, 0, 13), 0.75),
    invalidInCss().text("Valid selector", 0.5).to("Valid selectors ✅", 0.5),
  )

  yield* waitUntil("and-for-this");
  yield* all(
    htmlCode().selection(word(0, 3, 16), 0.75),
    cursor().position([spaceNX[7] + 8, spaceNY[4.5] + 8], 0.75),
    cssCode().selection(word(0, 0, 0), 0.75),
  )

  yield* all(
    cssCode().code.append(`\
.\\31 23hello {
  color: orange;
}`, 0.75),
    cssCode().selection(word(6, 0, 12), 0.75),
    cursor().position([spaceNX[2.25], spaceNY[1.5] + 8], 0.75),
    viewportManager.animateToPresetLayout('EQ_H', { browserImage: eqh6, duration: 0.75 }),
  );

  viewportManager.updateLayoutDimensions(spaceX[18], spaceY[5.5]);
  yield* all(
    wrapper().size([spaceX[18], spaceY[5.5]], 0.75),
    wrapper().y(spaceNY[2.25], 0.75),
    viewportManager.animateToPresetLayout('EQ_H', { duration: 0.75, browserImage: eqh7 }),
    allowedSpecialChars().opacity(0, 0.75),
    invalidInCss().opacity(0, 0.75),
    noStyleApplied().opacity(0, 0.75),
  );

  const line1 = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={line1}
        text="Numeric first character ⇒ Escape it using its Unicode code point."
        y={spaceY[1.5]}
        opacity={0}
        fontSize={spaceY[0.5]}
      />
    </>
  )

  yield* all(
    line1().opacity(1, 0.75),
    cursor().position([spaceNX[6], spaceY[1.75] + 8], 0.75),
  );
  yield* cursor().x(spaceX[6], 1);

  const line2 = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={line2}
        text="Unicode for '1': U+0031 ⇒ Escape as \31"
        y={spaceY[2.5]}
        opacity={0}
        fontSize={spaceY[0.5]}
      />
    </>
  )

  yield* waitUntil("escapes-the-number")
  yield* all(
    line2().opacity(1, 0.75),
    line1().fill(colors.slate[400], 0.75),
    line1().fontSize(spaceY[0.33], 0.75),
    cursor().position([spaceX[0.75], spaceY[2.75] + 8], 0.75),
  );

  yield* waitUntil("space-tells");
  yield* all(
    line2().fill(colors.slate[400], 0.75),
    line2().fontSize(spaceY[0.33], 0.75),
    cursor().position([spaceNX[2] + 8, spaceNY[1.5] + 8], 0.75),
  )

  const line3 = createRef<ExtendedTxt>();
  const readMoreTxt = createRef<ExtendedTxt>();
  const linkInDescription = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={line3}
        text="For escaping numbers: use '\3 + digit + space'"
        y={spaceY[3.5]}
        opacity={0}
        fontSize={spaceY[0.5]}
      />
      <ExtendedTxt
        ref={readMoreTxt}
        text="Read more about CSS escaping"
        opacity={0}
        y={spaceY[4.5]}
      />
      <ExtendedTxt
        ref={linkInDescription}
        text="(link in video description)"
        fontSize={spaceY[0.25]}
        opacity={0}
        y={spaceY[5]}
      />
    </>
  )

  yield* waitUntil("its-odd");
  yield* all(
    line3().opacity(1, 0.75),
    cursor().position([spaceX[1.5], spaceY[3.75] + 8], 1),
  );
  yield* waitUntil("it-works");
  yield* all(
    cursor().x(spaceX[4.5], 1),
    delay(0.5, readMoreTxt().opacity(1, 0.5)),
    delay(0.5, linkInDescription().opacity(1, 0.5)),
  )

  yield* waitUntil("honestly-easier");

  const cleanNaming = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={cleanNaming}
        text="Clean, Reliable Naming ✨"
        fontSize={spaceY[0.5]}
        fontWeight={500}
        opacity={0}
        y={spaceNY[4.5]}
      />
    </>
  )

  viewportManager.updateLayoutDimensions(spaceX[18], spaceY[7]);
  viewportManager.removeViewport("browser");
  yield* all(
    wrapper().size([spaceX[18], spaceY[7]], 0.75),
    wrapper().y(spaceY[0], 0.75),
    viewportManager.animateToLayout({ duration: 0.75 }),
    line1().opacity(0, 0.75),
    line2().opacity(0, 0.75),
    line3().opacity(0, 0.75),
    cursor().opacity(0, 0.75),
    cursor().position([spaceX[3.5], spaceY[4.75]], 0.75),
    htmlCode().code.remove(lines(0, 9), 0.75),
    cssCode().code.remove(lines(0, 8), 0.75),
    htmlCode().selection(DEFAULT, 0.75),
    cssCode().selection(DEFAULT, 0.75),
  )
  yield* cleanNaming().opacity(1, 0.75);

  yield* waitUntil("stick-to-letters");
  yield* all(
    htmlCode().code.append(`\
<p class="simple">
  Letters are the easiest.
</p>
`, 0.75),
    cssCode().code.append(`\
.simple {
  opacity: 0.8;
}
`, 0.75),
  )

  yield* waitUntil("stick-to-numbers");
  yield* all(
    htmlCode().code.append(`\
<p class="example1">
  Numbers are okay if not at start.
</p>
`, 0.75),
    cssCode().code.append(`\
.example1 {
  color: blue;
}
`, 0.75),
  )

  yield* waitUntil("stick-to-hyphens");
  yield* all(
    htmlCode().code.append(`\
<p class="example-class">
  Hyphens are great!.
</p>
`, 0.75),
    cssCode().code.append(`\
.example-class {
  border: 2px dashed #444;
}
`, 0.75),
  )

  yield* waitUntil("stick-to-underscores");
  yield* all(
    htmlCode().code.append(`\
<p class="example_class">
  Underscores work too.
</p>
`, 0.75),
    cssCode().code.append(`\
.example_class {
  text-transform: uppercase;
}
`, 0.75),
  )

  yield* waitUntil("s4-end");
});
