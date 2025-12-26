import { Code, Img, lines, makeScene2D, word } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Cursor, Grid, ViewportManager } from "../nodes";
import { all, createRef, DEFAULT, Direction, Reference, slideTransition, waitUntil } from "@motion-canvas/core";
import eqh1 from "../images/s11/eqh1.png";
import eqh2 from "../images/s11/eqh2.png";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import applesImg from "../images/s11/apples.png";

export default makeScene2D(function*(view) {
  view.fontFamily('Geist');
  view.fill(colors.zinc[950]);
  // view.opacity(0.7);
  // view.add(<Grid />);

  const viewportManager = new ViewportManager()
    .addHtml(`\
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<p class="invalid-selector-123!">
  Invalid selector
</p>
`)
    .addCss(`\
h1,
h2,
invalid-selector-123!,
h3 {
  color: blue;
}
`)
    .addBrowser();

  viewportManager.addToView(view);
  const wrapper = viewportManager.getWrapper();
  const refs = viewportManager.getViewportRefs();
  const htmlCode: Reference<Code> = refs.html?.code;
  const cssCode: Reference<Code> = refs.css?.code;

  yield* all(
    viewportManager.animateToPresetLayout("EQ_H", { duration: 0.75, browserImage: eqh1 }),
    slideTransition(Direction.Right, 0.75),
  );

  yield* waitUntil("even-one-invalid");

  const cursor = createRef<Cursor>();
  view.add(
    <>
      <Cursor
        ref={cursor}
        color="green"
        opacity={0}
        position={[spaceX[1.75], spaceNY[2.5]]}
      />
    </>
  )

  yield* all(
    cursor().opacity(1, 0.7),
    cursor().position([spaceX[0.75], spaceNY[3.5]], 0.75),
    cssCode().selection(word(2, 0, 21), 0.75),
  )

  yield* waitUntil("entire-ignored");
  yield* all(
    cssCode().selection(DEFAULT, 0.75),
    cursor().position([spaceNX[1.75], spaceNY[2.25]], 0.75),
  )

  yield* waitUntil("none-of-headings");
  yield* all(
    cursor().position([spaceX[4.5], spaceNY[3.5]], 0.75).to([spaceX[4], spaceNY[1.75]], 0.75),
  )

  yield* waitUntil("even-though");
  yield* all(
    cursor().position([spaceNX[2.5], spaceNY[4.5] + 8], 0.67),
    cssCode().selection(word(0, 0, 2), 0.67),
  )
  yield* all(
    cursor().position([spaceNX[2.5], spaceNY[4]], 0.67),
    cssCode().selection(word(1, 0, 2), 0.67),
  )
  yield* all(
    cursor().position([spaceNX[2.5], spaceNY[3]], 0.67),
    cssCode().selection(word(3, 0, 2), 0.67),
  )

  yield* waitUntil("this-is-diff")
  yield* all(
    cursor().position([spaceNX[1.5], spaceNY[2]], 0.75),
    cursor().opacity(0, 0.75),
    cssCode().selection(DEFAULT, 0.75),
  )

  yield* waitUntil("individual");
  yield* all(
    cssCode().code.replace(lines(0, 5), `\
h1 {
  color: blue;
}
h2 {
  color: blue;
}
invalid-selector-123! {
  color: blue;
}
h3 {
  color: blue;
}
`, 0.75),
    viewportManager.animateToPresetLayout("EQ_H", { duration: 0.75, browserImage: eqh2 }),
  )

  yield* waitUntil("invalid-selector");
  yield* all(
    cssCode().selection(lines(6, 8), 0.75),
    cursor().opacity(1, 0.75),
    cursor().position([spaceX[0.75], spaceNY[1.67]], 0.75),
  )

  yield* waitUntil("browser-ignores");
  yield* all(
    cursor().position([spaceX[4], spaceNY[1.25] + 8], 0.75),
  )

  yield* waitUntil("keeps-rest");
  yield* cursor().position([spaceX[5.5], spaceNY[3.5]], 1.25);

  yield* waitUntil("with-selector-lists");
  yield* all(
    cssCode().selection(DEFAULT, 0.75),
    cssCode().code.replace(lines(0, 11), `\
h1,
h2,
invalid-selector-123!,
h3 {
  color: blue;
}
`, 0.75),
    viewportManager.animateToPresetLayout("EQ_H", { duration: 0.75, browserImage: eqh1 }),
    cursor().position([spaceNX[2], spaceNY[2]], 0.75),
  )

  yield* waitUntil("one-invalid-selector");
  yield* all(
    cursor().position([spaceX[0.75], spaceNY[3.5]], 0.75),
    cssCode().selection(word(2, 0, 21), 0.75),

  )

  yield* waitUntil("bad-apple");
  const apples = createRef<Img>();
  view.add(
    <Img
      ref={apples}
      src={applesImg}
      radius={32}
      stroke={colors.fuchsia[500]}
      lineWidth={16}
      y={spaceY[2]}
      scale={0.25}
      opacity={0}
    />
  )

  yield* all(
    apples().opacity(1, 0.75),
    cursor().opacity(0, 0.75),
    cursor().position([spaceX[0], spaceNY[2.5]], 0.75),
  )

  yield* waitUntil("s11-end");
})
