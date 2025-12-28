import { Code, makeScene2D } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Cursor, Grid, ViewportManager } from "../nodes";
import { all, createRef, Direction, Reference, fadeTransition, waitUntil } from "@motion-canvas/core";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import eqh1 from "../images/s14/eqh1.png";

export default makeScene2D(function*(view) {
  view.fontFamily('Geist');
  view.fill(colors.zinc[950]);
  // view.add(<Grid />);
  const specificityOrder = createRef<ExtendedTxt>();
  const order = createRef<ExtendedTxt>();
  const cursor = createRef<Cursor>();
  view.add(
    <>
      <ExtendedTxt
        ref={specificityOrder}
        fontSize={spaceY[0.67]}
        fontWeight={500}
        y={spaceNY[4.5]}
      />
      <ExtendedTxt
        ref={order}
        fontSize={spaceY[0.5]}
        text={"ID > Class > Element > Universal selector"}
        y={spaceNY[3.5]}
        opacity={0}
      />
      <Cursor
        ref={cursor}
        color="green"
        opacity={0}
        position={[spaceX[0.33], spaceY[0] + 8]}
      />
    </>
  )

  const viewportManager = new ViewportManager()
    .addHtml(`\
<p>
  Universal selector paragraph
</p>
<p class="text">
  Class selector paragraph
</p>
<p id="title" class="text">
  ID selector paragraph
</p>
`)
    .addCss(`\
* {
  color: orange;
}
.text {
  color: blue;
}
#title {
  color: green;
}
`)
    .addBrowser();

  viewportManager.addToView(view);
  const wrapper = viewportManager.getWrapper();
  const refs = viewportManager.getViewportRefs();
  const htmlCode: Reference<Code> = refs.html?.code;
  const cssCode: Reference<Code> = refs.css?.code;
  viewportManager.updateLayoutDimensions(spaceX[18], spaceY[7]);

  yield* all(
    wrapper().size([spaceX[18], spaceY[7]], 0.75),
    wrapper().y(spaceY[1.5], 0.75),
    viewportManager.animateToPresetLayout("EQ_H", { duration: 0.75, browserImage: eqh1 }),
    fadeTransition(0.75),
  );

  yield* waitUntil("remember");
  yield* specificityOrder().text("Specificity order:", 0.75);
  yield* order().opacity(1, 0.75);

  yield* waitUntil("if-a-rule");
  yield* all(
    cursor().opacity(1, 0.75),
    cursor().position([spaceNX[0.67], spaceNY[1] + 8], 0.75),
  )

  yield* waitUntil("class");
  yield* cursor().position([spaceNX[0.75], spaceY[0.5]], 0.75);

  yield* waitUntil("id");
  yield* cursor().position([spaceNX[0.67], spaceY[1.75] + 8], 0.75);

  yield* waitUntil("others-win");
  yield* cursor().position([spaceX[6.5], spaceY[1.5]], 0.75);

  yield* waitUntil("we-want");
  yield* all(
    cursor().opacity(0, 0.75),
    cursor().position([spaceX[5.5], spaceY[2.5]], 0.75)
  )

  yield* waitUntil("s14b-end")
})
