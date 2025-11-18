import { Code, lines, makeScene2D, word } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Cursor, Grid, ViewportManager } from "../nodes";
import { all, createRef, DEFAULT, delay, Direction, Reference, slideTransition, waitUntil } from "@motion-canvas/core";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import eqh1 from "../images/s6/eqh1.png"
import eqh2 from "../images/s6/eqh2.png"

export default makeScene2D(function*(view) {
  view.fontFamily('Geist');
  view.fill(colors.zinc[950]);
  // view.opacity(0.7);
  view.add(<Grid />);

  yield* slideTransition(Direction.Right, 0.75);

  const classReuseTxt = createRef<ExtendedTxt>();
  const cursor = createRef<Cursor>();
  view.add(
    <>
      <ExtendedTxt
        ref={classReuseTxt}
        y={spaceY[1]}
        opacity={0}
        text={"Classes are reusable"}
        fontSize={spaceY[0.5]}
        fontWeight={500}
      />
      <Cursor
        ref={cursor}
        color="green"
        position={[spaceNX[5], spaceNY[1.5]]}
        opacity={0}
      />
    </>
  )
  yield* all(
    classReuseTxt().opacity(1, 0.75),
    classReuseTxt().y(0, 0.75),
  )

  yield* waitUntil("you-can-apply")
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

  viewportManager.updateLayoutDimensions(spaceX[18], spaceY[8]);
  yield* all(
    viewportManager.animateToLayout({ duration: 0.75 }),
    wrapper().size([spaceX[18], spaceY[8]], 0.75),
    wrapper().y(spaceY[1], 0.75),
    classReuseTxt().y(spaceNY[4.5], 0.75),
    htmlCode().code.append(`\
<h2 class="emphasis">
  Reusable classes on a heading
</h2>
<p class="note small emphasis">
  A small emphasized note.
</p>
<p class="note large">
  A large note without emphasis.
</p>
`, 0.75),
    cssCode().code.append(`\
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
`, 0.75),
  );

  yield* all(
    cursor().position([spaceNX[6], spaceNY[2.5]], 0.75),
    cursor().opacity(1, 0.75),
    htmlCode().selection(htmlCode().findAllRanges(/class="[^"]+"/g), 0.75),
    cssCode().selection(
      cssCode().findAllRanges(/\.[A-Za-z_][A-Za-z0-9_-]*/g),
      0.75
    ),
  );
  yield* cursor().position([spaceNX[4], spaceNY[1]], 0.75);
  yield* cursor().position([spaceNX[6.75], spaceNY[1]], 0.75);
  yield* cursor().position([spaceNX[6.75], spaceY[0.33]], 0.75);
  yield* waitUntil("IDs-are-different")
  htmlCode().selection(DEFAULT);
  cssCode().selection(DEFAULT);
  yield* all(
    htmlCode().code.replace(lines(0, 8), `\
<h1 id="page-title">
Main Title (unique ID)
</h1>
<p id="intro-text">
Intro section with its own unique ID.
</p>
<div id="hero-box">
Hero box — also has a unique ID.
</div>
<p class="highlight">
Reusable class — paragraph 1
</p>
<p class="highlight">
Reusable class — paragraph 2
</p>
`, 0.75),
    cssCode().code.replace(lines(0, 14), `\
#page-title {
  color: #ff4c4c;
  font-size: 1.8rem;
}
#intro-text {
  color: #0077cc;
}
#hero-box {
  background: #e3e3ff;
  padding: 12px;
  border-left: 5px solid #6b4aff;
}
.highlight {
  background: #fff4a8;
}
`, 0.75),
    cursor().position([0, spaceNY[4]], 0.75),
    classReuseTxt().text("IDs are", 0.5).to("IDs are meant to be unique", 0.75),
  )

  yield* waitUntil("so-only-one");
  yield* all(
    htmlCode().selection(htmlCode().findAllRanges(/id="[^"]*"/g), 0.75),
    cursor().position([spaceNX[6.5], spaceNY[2.5] + 8], 0.75),
    cssCode().selection(cssCode().findAllRanges(/#([A-Za-z_-][A-Za-z0-9_-]*)\b(?=\s*[,>+~\[:.{#\s]|$)/g), 0.75),
  )
  yield* cursor().y(spaceY[0.5], 1.25);

  yield* waitUntil("less-flexible");
  yield* all(
    cursor().position([0, spaceNY[4]], 0.75),
    classReuseTxt().text("IDs are less", 0.5).to("IDs are less flexible for styling", 1),
  )

  yield* waitUntil("imagine-style-button")
  viewportManager.showViewport("browser")
  htmlCode().selection(DEFAULT)
  cssCode().selection(DEFAULT)
  yield* all(
    viewportManager.animateToPresetLayout('EQ_H', { duration: 0.75, browserImage: eqh1 }),
    htmlCode().code.replace(lines(0, 14), `\
<button id="btn">
  Like 😊
</button>
`, 0.75),
    cssCode().code.replace(lines(0, 14), `\
#btn {
  padding: 1rem 2rem;
  font-size: 1.75rem;
  font-weight: 500;
  color: #fafafa;
  background: #0a0a0a;
  border: none;
  border-radius: 0.75rem;
}
`, 0.75),
    cursor().position([spaceX[4], spaceNY[1.75]], 0.75),
  )

  yield* waitUntil("using-an-id")
  yield* cursor().position([spaceNX[7], spaceNY[2.5]], 0.75);

  yield* waitUntil("another-button")
  yield* all(
    htmlCode().code.append(`\
<button>
  Comment ☺️
</button>
`, 0.75),
    cursor().y(spaceNY[0.5], 0.75),
    viewportManager.animateToPresetLayout('EQ_H', { duration: 0.75, browserImage: eqh2 }),
  )

  yield* cursor().position([spaceX[4], spaceNY[1.75]], 1.25);

  yield* waitUntil("cant-reuse-id")
  yield* all(
    cursor().position([spaceNX[6.5], spaceNY[1]], 1),
    htmlCode().code.replace(word(3, 7, 1), ` id="btn"> ❌`, 0.75),
  )

  yield* waitUntil("s6-end");
})
