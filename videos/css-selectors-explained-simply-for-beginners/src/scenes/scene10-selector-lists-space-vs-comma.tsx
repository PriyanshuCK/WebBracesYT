import { Code, makeScene2D, word } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Cursor, Grid, ViewportManager } from "../nodes";
import { all, createRef, Direction, Reference, slideTransition, waitUntil } from "@motion-canvas/core";
import spaceX, { spaceNX, spaceNY } from "../lib/space";
import eqh1 from "../images/s10/eqh1.png"

export default makeScene2D(function*(view) {
  view.fontFamily('Geist');
  view.fill(colors.zinc[950]);
  view.opacity(0.7);
  view.add(<Grid />);

  const viewportManager = new ViewportManager()
    .addHtml()
    .addCss()
    .addBrowser();

  viewportManager.addToView(view);
  const wrapper = viewportManager.getWrapper();
  const refs = viewportManager.getViewportRefs();
  const htmlCode: Reference<Code> = refs.html?.code;
  const cssCode: Reference<Code> = refs.css?.code;
  viewportManager.removeViewport("html");
  viewportManager.removeViewport("browser")

  yield* all(
    viewportManager.animateToLayout({ duration: 0.75 }),
    slideTransition(Direction.Right, 0.75),
  );

  yield* waitUntil("look-this-rule");
  yield* all(
    cssCode().code.append(`\
h1, .sidebar p {
  color: blue;
}
`, 0.75),
  )

  yield* waitUntil("all-h1-headings");
  const cursor = createRef<Cursor>();
  view.add(
    <>
      <Cursor ref={cursor} position={[spaceNX[3.25], spaceNY[3.5]]} opacity={0} color={"green"} />
    </>
  );
  yield* all(
    cursor().opacity(1, 0.75),
    cursor().position([spaceNX[4.25] + 8, spaceNY[4.5]], 0.75),
  )

  yield* waitUntil("sidebar-class")
  yield* all(
    cursor().x(spaceNX[2.75], 0.75),
  )

  yield* waitUntil("all-ps")
  yield* all(
    cursor().x(spaceNX[2] + 8, 0.75),
  )
  yield* cursor().position([spaceNX[2.33], spaceNY[4]], 0.75);

  yield* waitUntil("but-actually");
  viewportManager.showViewport("html");
  viewportManager.showViewport("browser");
  yield* all(
    viewportManager.animateToPresetLayout("EQ_H", { duration: 0.75, browserImage: eqh1 }),
    cursor().opacity(0, 0.75),
    cursor().position([spaceX[1.33], spaceNY[3]], 0.75),
    htmlCode().code.append(`\
<h1>Heading</h1>

<p>Outside paragraph</p>

<div class="sidebar">
  <p>Sidebar paragraph</p>
</div>
`, 0.75),
  )

  yield* waitUntil("thats-not-happening")
  cursor().position([spaceX[6.25], spaceNY[1.75]]);
  yield* all(
    cursor().opacity(1, 0.75),
    cursor().position([spaceX[5.25], spaceNY[2.75]], 0.75),
  )

  yield* waitUntil("space-between")
  yield* all(
    cursor().position([spaceNX[0.67] + 8, spaceNY[4.5] + 8], 0.75),
    cssCode().selection(word(0, 4, 10), 0.75),
  )

  yield* waitUntil("s10-end");
});
