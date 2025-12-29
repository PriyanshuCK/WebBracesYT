import { Circle, Code, Img, Layout, Line, lines, makeScene2D, word } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Cursor, ExtendedRect, Face, Grid, ViewportManager } from "../nodes";
import { all, any, createRef, DEFAULT, delay, Direction, Reference, slideTransition, waitUntil } from "@motion-canvas/core";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import beq1 from "../images/s5/beq1.png"
import beq2 from "../images/s5/beq2.png"
import beq3 from "../images/s5/beq3.png"
import pass1 from "../images/passportBlack.png"
import pass2 from "../images/passportBlack1.png"

export default makeScene2D(function*(view) {
  view.fontFamily('Geist');
  view.fill(colors.zinc[950]);
  // view.opacity(0.7);
  // view.add(<Grid />);

  const table = createRef<Layout>();
  const leftColumn = createRef<Layout>();
  const rightColumn = createRef<Layout>();
  const selectorHeader = createRef<ExtendedTxt>();
  const selectsHeader = createRef<ExtendedTxt>();
  const selector1 = createRef<ExtendedTxt>();
  const selects1 = createRef<ExtendedTxt>();
  const selector2 = createRef<ExtendedTxt>();
  const selects2 = createRef<ExtendedTxt>();
  const selector3 = createRef<ExtendedTxt>();
  const selects3 = createRef<ExtendedTxt>();
  const cursor = createRef<Cursor>();
  view.add(
    <>
      <Layout
        ref={table}
        layout
        gap={spaceX[1]}
        position={[spaceX[1.25], spaceY[0]]}
      >
        <Layout
          ref={leftColumn}
          layout
          direction="column"
          height={spaceY[4]}
          justifyContent="space-around"
        >
          <ExtendedTxt
            ref={selectorHeader}
            text="Selector"
            fontSize={spaceY[0.5]}
            fontWeight={500}
          />
          <ExtendedTxt
            ref={selector2}
            text="p"
            fontSize={spaceY[0.33] + 4}
            fill={"#e0787b"}
          />
          <ExtendedTxt
            ref={selector1}
            text=".card"
            fontSize={spaceY[0.33] + 4}
            fill={"#f7cd7a"}
          />
          <ExtendedTxt
            ref={selector3}
            text="#title"
            fontSize={spaceY[0.33] + 4}
            fill={"#8aa9f9"}
            opacity={0}
          />
        </Layout>

        <Layout
          ref={rightColumn}
          layout
          direction="column"
          height={spaceY[4]}
          justifyContent="space-around"
        >
          <ExtendedTxt
            ref={selectsHeader}
            text="Selects"
            fontSize={spaceY[0.5]}
            fontWeight={500}
          />
          <ExtendedTxt
            ref={selects2}
            text="all <p> elements"
            fontSize={spaceY[0.33]}
          />
          <ExtendedTxt
            ref={selects1}
            text="elements with the highlight class"
            fontSize={spaceY[0.33]}
          />
          <ExtendedTxt
            ref={selects3}
            text="the element with the highlight id"
            fontSize={spaceY[0.33]}
            opacity={0}
          />
        </Layout>
      </Layout>
      <Cursor
        ref={cursor}
        color={"green"}
        opacity={0}
        y={spaceY[1.75]}
      />
    </>
  );

  yield* all(
    slideTransition(Direction.Right, 0.75),
    delay(0.5, cursor().opacity(1, 0.75)),
    delay(0.5, cursor().position([spaceNX[1.75], spaceY[0.75] + 8], 0.75)),
  )

  yield* waitUntil("id-selectors-let");
  yield* all(
    selector3().opacity(1, 0.75),
    selects3().opacity(1, 0.75),
    cursor().position([spaceNX[1.75], spaceY[1.75] + 8], 0.75),
  )

  yield* cursor().x(spaceX[5] - 8, 1.75);

  yield* waitUntil("one-crucial-difference");
  yield* all(
    cursor().position([spaceX[6], spaceY[2.75]], 0.75),
    cursor().opacity(0, 0.75),
  );

  yield* waitUntil("while-you-can-give")
  const viewportManager = new ViewportManager()
    .addHtml()
    .addCss()
    .addBrowser();

  viewportManager.addToView(view);
  const wrapper = viewportManager.getWrapper();
  const refs = viewportManager.getViewportRefs();
  const htmlCode: Reference<Code> = refs.html?.code;
  const cssCode: Reference<Code> = refs.css?.code;
  const htmlViewport = refs.html?.viewport;
  const cssViewport = refs.css?.viewport;
  viewportManager.removeViewport("browser")

  viewportManager.updateLayoutDimensions(spaceX[18], spaceY[3]);
  yield* all(
    viewportManager.animateToLayout({ duration: 0.75 }),
    wrapper().size([spaceX[18], spaceY[3]], 0.75),
    wrapper().y(spaceNY[3.5], 0.75),
    table().y(spaceY[1], 0.75),
  );

  cursor().position([spaceNX[5.33] - 8, spaceNY[2.5]]);
  yield* all(
    htmlCode().code.append(`\
<!-- Reusing classes: 👍 -->
<div class="card">Card 1</div>
<div class="card">Card 2</div>
`, 0.75),
    cssCode().code.append(`\
.card {
  padding: 1rem;
  background: #f0f0f0;
  border-radius: 8px;
}
`, 0.75),
    cursor().opacity(1, 0.75),
    cursor().position([spaceNX[6.33] - 8, spaceNY[3.5]], 0.75),
  );

  yield* waitUntil("an-id-must-be-unique")
  viewportManager.updateLayoutDimensions(spaceX[18], spaceY[4]);
  yield* all(
    table().y(spaceY[2], 0.75),
    htmlCode().code.append(`\

<!-- Reusing IDs: ❌ (invalid) -->
<p id="title">Heading</p>
<p id="title">Another Heading</p>
`, 0.75),
    cssCode().code.append(`\
#title {
  color: blue;
}
`, 0.75),
    wrapper().size([spaceX[18], spaceY[4]], 0.75),
    wrapper().y(spaceNY[3], 0.75),
    viewportManager.animateToLayout({ duration: 0.75 }),
    cursor().position([spaceNX[7.25] + 8, spaceNY[1.75] + 8], 0.75),
  )

  yield* cursor().position([spaceNX[4.5] + 8, spaceNY[2.5]], 0.75)

  yield* waitUntil("think-of-it");

  const passport1 = createRef<Img>();
  view.add(
    <>
      <Img
        ref={passport1}
        src={pass1}
        radius={16}
        scale={0.6}
        y={spaceY[1.75]}
        opacity={0}
      />
    </>
  );

  yield* all(
    passport1().opacity(1, 0.75),
    table().opacity(0, 0.75),
    cursor().opacity(0, 0.75),
    cursor().position([spaceNX[3.5] + 8, spaceNY[1.5]], 0.75),
  )

  yield* waitUntil("each-has-unique")
  const face1 = createRef<Face>();
  const face2 = createRef<Face>();
  const duplicateTxt = createRef<ExtendedTxt>();
  view.add(
    <>
      <Face
        ref={face1}
        y={spaceY[4.5]}
        opacity={0}
      />
      <Face
        ref={face2}
        y={spaceY[4.5]}
        opacity={0}
      />
      <ExtendedTxt
        ref={duplicateTxt}
        text={"Duplicate passport number - invalid ❌"}
        position={[spaceX[0], spaceY[3.5]]}
        opacity={0}
      />
    </>
  )

  cursor().position([spaceX[1], spaceY[3.5]]);
  yield* all(
    cursor().opacity(1, 0.75),
    cursor().position([spaceX[0.5], spaceY[3.25]], 0.75),
    face1().opacity(1, 0.75),
  )

  const passport2 = createRef<Img>();
  view.add(
    <>
      <Img
        ref={passport2}
        src={pass2}
        radius={16}
        scale={0.6}
        y={spaceY[1.25]}
        opacity={0}
      />
    </>
  );

  yield* waitUntil("no-two-are-same")
  yield* all(
    passport1().x(spaceNX[3], 0.75),
    passport1().y(spaceY[1.25], 0.75),
    face1().x(spaceNX[3], 0.75),
    passport2().opacity(1, 0.75),
    passport2().x(spaceX[3], 0.75),
    face2().opacity(1, 0.75),
    face2().x(spaceX[3], 0.75),
    cursor().position([spaceX[5], spaceY[3.75]], 0.75),
    duplicateTxt().x(spaceX[3], 0.75),
    duplicateTxt().opacity(1, 0.75),
  )

  yield* waitUntil("in-html-add");
  yield* all(
    passport1().opacity(0, 0.75),
    passport1().y(spaceY[2.5], 0.75),
    passport2().opacity(0, 0.75),
    passport2().y(spaceY[2.5], 0.75),
    face1().opacity(0, 0.75),
    face1().scale(0, 0.75),
    face2().opacity(0, 0.75),
    face2().scale(0, 0.75),
    duplicateTxt().opacity(0, 0.75),
    wrapper().y(0, 0.75),
    htmlCode().code.remove(lines(0), 0.75),
    htmlCode().code.remove(lines(4, 6), 0.75),
    cssCode().code.remove(lines(5, 7), 0.75),
    cursor().opacity(0, 0.75),
    cursor().position([spaceX[6], spaceY[4.75]], 0.75),
  )

  yield* waitUntil("add-id-attr")
  cursor().position([spaceNX[6.75], spaceY[1]]);
  yield* all(
    htmlCode().code.append(`\
<p id="title">Heading</p>
`, 0.75),
    delay(0.5, cursor().position([spaceNX[7.75], spaceY[0]], 0.75)),
    delay(0.5, cursor().opacity(1, 0.75)),
  )

  yield* waitUntil("and-in-css")
  yield* cursor().position([spaceX[2], spaceY[1]], 1);

  yield* waitUntil("use-hash")
  yield* all(
    cursor().position([spaceX[0.33] + 8, spaceY[1] - 8], 0.75),
    cssCode().code.append(`\
#`, 0.75),
  )

  yield* any(
    cursor().x(spaceX[2.25], 1),
    cursor().opacity(0, 1),
    cssCode().code.append(`title`, 0.5),
  )
  yield* all(
    cssCode().code.append(` {
  color: blue;
}
`, 0.5),
  )

  yield* waitUntil("just-like-class")
  selector3().opacity(0);
  selects3().opacity(0);
  cursor().position([spaceNX[1.5] + 4, spaceY[3.75]]);
  yield* all(
    table().opacity(1, 0.75),
    wrapper().y(spaceNY[3], 0.75),
    htmlCode().selection(word(0, 0, 0), 0.75),
    cssCode().selection(word(0, 0, 5), 0.75),
  )
  yield* all(
    cursor().opacity(1, 0.75),
    cursor().position([spaceNX[2.5] + 4, spaceY[2.75]], 0.75),
  )

  yield* waitUntil("ids-use-hash")
  yield* all(
    selector3().opacity(1, 0.75),
    selects3().opacity(1, 0.75),
    cursor().y(spaceY[3.75], 0.75),
    cssCode().selection(word(5, 0, 6), 0.75),
  )

  yield* waitUntil("IDs-have-more-power")
  const idsHaveMoreTxt = createRef<ExtendedTxt>();
  const stylingPowerTxt = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={idsHaveMoreTxt}
        text={"IDs have"}
        y={spaceNY[0.5]}
        opacity={0}
      />
      <ExtendedTxt
        ref={stylingPowerTxt}
        fontSize={spaceY[0.5]}
        fontWeight={500}
        y={spaceY[0.5]}
      />
    </>
  )
  yield* all(
    table().opacity(0, 0.75),
    cursor().opacity(0, 0.75),
    cursor().position([spaceNX[1.5] + 4, spaceY[4.75]], 0.75),
    htmlViewport().opacity(0, 0.75),
    cssViewport().opacity(0, 0.75),
    delay(0.5, idsHaveMoreTxt().opacity(1, 0.75)),
  )
  htmlCode().selection(DEFAULT);
  cssCode().selection(DEFAULT);

  yield* stylingPowerTxt().text("more styling power", 1);

  yield* waitUntil("high-specificity")
  const highSpecificity = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={highSpecificity}
        fontSize={spaceY[0.5]}
        fontWeight={500}
        y={spaceY[0.5]}
      />
    </>
  )
  yield* all(
    stylingPowerTxt().opacity(0, 0.75),
    stylingPowerTxt().y(spaceY[1.5], 0.75),
    delay(0.5, highSpecificity().text("High Specificity", 0.75)),
  )

  yield* waitUntil("this-means-style-same")
  htmlCode().code.remove(lines(0, 3))
  cssCode().code.remove(lines(0, 7))
  viewportManager.showViewport("browser")
  viewportManager.updateLayoutDimensions(spaceX[18], spaceY[10])
  cursor().position([spaceNX[7.5], spaceY[1.67]]);
  yield* all(
    idsHaveMoreTxt().opacity(0, 0.75),
    idsHaveMoreTxt().y(0, 0.75),
    highSpecificity().opacity(0, 0.75),
    htmlViewport().opacity(1, 0.75),
    cssViewport().opacity(1, 0.75),
    viewportManager.animateToLayout({ duration: 0.75, browserImage: beq1 }),
    wrapper().size([spaceX[18], spaceY[10]], 0.75),
    wrapper().y(0, 0.75),
    htmlCode().code.append(`\
<p class="green-text" id="violet-text">
  Time quietly rewards the ones who use it with
intention.
</p>
`, 0.75),
    cursor().opacity(1, 0.75),
    cursor().position([spaceNX[8.5], spaceY[0.67]], 0.75),
  )

  yield* cursor().x(spaceNX[2.5], 1)

  yield* waitUntil("both-a-class")
  yield* all(
    cssCode().code.append(`\
.green-text {
  color: green;
}
`, 0.75),
    viewportManager.animateToLayout({ duration: 0.75, browserImage: beq2 }),
    cursor().position([spaceNX[6.5], spaceNY[4]], 0.75),
  )

  yield* waitUntil("and-an-id")
  yield* all(
    cssCode().code.append(`\
#violet-text {
  color: violet;
}
`, 0.75),
    viewportManager.animateToLayout({ duration: 0.75, browserImage: beq3 }),
    cursor().position([spaceNX[6.5], spaceNY[2.5]], 0.75),
  )

  yield* waitUntil("ids-style-win")
  yield* cursor().position([spaceX[0.25], spaceNY[4] + 8], 1)
  yield* cursor().x(spaceX[6], 1)

  yield* waitUntil("like-friend")
  const friendEmoji = createRef<ExtendedTxt>();
  const teacherEmoji = createRef<ExtendedTxt>();
  view.add(
    <>
      <ExtendedTxt
        ref={friendEmoji}
        text={"🧑‍🤝‍🧑"}
        position={[spaceNX[5], spaceNY[4.25]]}
        fontSize={spaceY[0.5]}
        opacity={0}
      />
      <ExtendedTxt
        ref={teacherEmoji}
        text={"👩‍🏫"}
        position={[spaceNX[5], spaceNY[2.75]]}
        fontSize={spaceY[0.5]}
        opacity={0}
      />
    </>
  )
  yield* all(
    cursor().position([spaceNX[7.5], spaceNY[4.5]], 0.75),
    friendEmoji().opacity(1, 0.75),
  )

  yield* waitUntil("like-teacher")
  yield* all(
    cursor().position([spaceNX[7.5], spaceNY[3]], 0.75),
    teacherEmoji().opacity(1, 0.75),
  )

  yield* waitUntil("follow-teacher")
  yield* teacherEmoji().fontSize(spaceY[0.67], 0.75);

  yield* waitUntil("s5-end");
});
