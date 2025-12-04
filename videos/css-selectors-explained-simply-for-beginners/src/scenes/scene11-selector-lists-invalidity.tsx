import { Code, makeScene2D } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Grid, ViewportManager } from "../nodes";
import { all, Direction, Reference, slideTransition, waitUntil } from "@motion-canvas/core";

export default makeScene2D(function*(view) {
  view.fontFamily('Geist');
  view.fill(colors.zinc[950]);
  // view.opacity(0.7);
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

  yield* waitUntil("s11-end");
})
