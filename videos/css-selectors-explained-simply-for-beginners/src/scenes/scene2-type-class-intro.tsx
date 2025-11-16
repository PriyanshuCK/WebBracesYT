import { Circle, Code, Icon, Layout, lines, makeScene2D, word } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Cursor, ExtendedRect, ViewportManager } from "../nodes";
import { all, createRef, DEFAULT, delay, Direction, Reference, slideTransition, waitUntil } from "@motion-canvas/core";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import beq1 from '../images/s2/beq1.png';
import beq2 from '../images/s2/beq2.png';
import beq3 from '../images/s2/beq3.png';
import beq4 from '../images/s2/beq4.png';
import beq5 from '../images/s2/beq5.png';
import beq6 from '../images/s2/beq6.png';
import beq8 from '../images/s2/beq8.png';
import beq9 from '../images/s2/beq9.png';
import beq10 from '../images/s2/beq10.png';
import beq11 from '../images/s2/beq11.png';
import { ExtendedTxt } from "../nodes/ExtendedTxt";

export default makeScene2D(function*(view) {
  view.fontFamily('Geist');
  view.fill(colors.zinc[950]);
  // view.opacity(0.3);
  // view.add(<Grid />);

  const viewportManager = new ViewportManager()
    .addHtml()
    .addCss()
    .addBrowser(beq1);

  viewportManager.addToView(view);

  const wrapper = viewportManager.getWrapper();
  const refs = viewportManager.getViewportRefs();
  const htmlCode: Reference<Code> = refs.html?.code;
  const cssCode: Reference<Code> = refs.css?.code;

  yield* viewportManager.animateToLayout({ duration: 0 });

  yield* slideTransition(Direction.Right, 1);

  yield* all(
    htmlCode().code.append(`\
<p>Start coding what you learn.</p>
<p>Errors teach — don’t fear them.</p>
<p>Have faith that every bug has a solution.</p>
<p>Practice daily, grow stronger.</p>
`, 1),
    delay(0.5, viewportManager.animateToLayout({ duration: 1, browserImage: beq2 }))
  );

  yield* all(
    cssCode().code.append(`\
p {
		color: green;
}
`, 1),
    delay(0.5, viewportManager.animateToLayout({ duration: 1, browserImage: beq3 }))
  );

  yield* waitUntil("type-selector");

  const typeSelectors = createRef<ExtendedTxt>();
  view.add(
    <ExtendedTxt ref={typeSelectors} y={spaceNY[4.5]} fontSize={spaceY[0.67]} fontWeight={500} opacity={0} />
  );

  viewportManager.updateLayoutDimensions(spaceX[18], spaceY[8]);
  yield* all(
    wrapper().size([spaceX[18], spaceY[8]], 1),
    wrapper().y(spaceY[1], 1),
    typeSelectors().text('Type Selector', 1),
    viewportManager.animateToLayout({ browserImage: beq4, duration: 1 }),
    typeSelectors().opacity(1, 1)
  );

  yield* waitUntil("all-elements-of-type");

  const cursor = createRef<Cursor>();
  view.add(
    <>
      <Cursor ref={cursor} position={[spaceNX[7.75], spaceNY[1.33]]} opacity={0} color={"green"} />
    </>
  );

  yield* all(
    cssCode().selection(word(0, 0, 1), 0.6),
    htmlCode().selection(
      word(0, 0, 0)
      , 0.6),
    cursor().position([spaceNX[8.75], spaceNY[2.33]], 1),
    cursor().opacity(1, 1),
  );

  yield* waitUntil("all-paragraphs");

  yield* all(
    htmlCode().selection(
      htmlCode().findAllRanges(/<\/?p>/g), 0.6),
    cursor().position([spaceNX[8.5], spaceY[3.25]], 1),
  );

  yield* waitUntil("but-sometimes");

  viewportManager.updateLayoutDimensions(spaceX[18], spaceY[10]);

  yield* all(
    wrapper().size([spaceX[18], spaceY[10]], 1),
    viewportManager.animateToLayout({ browserImage: beq3, duration: 1 }),
    typeSelectors().opacity(0, 1),
    typeSelectors().y(spaceNY[5.5], 1),
    wrapper().y(spaceY[0], 1),
    cursor().position([spaceNX[7.5], spaceY[3.75]], 1),
    cursor().opacity(0, 1),
  );

  yield* waitUntil("don't-style");
  yield* all(
    htmlCode().selection(DEFAULT, 0.6),
    cssCode().selection(DEFAULT, 0.6),
    cssCode().code.remove(lines(0, 2), 0.6),
    viewportManager.animateToLayout({ browserImage: beq2 })
  )

  yield* waitUntil("maybe-10");

  viewportManager.removeViewport('css');
  yield* all(
    htmlCode().code.append(`\
<p>Read code to learn patterns.</p>
<p>Break problems into steps.</p>
<p>Ask for help when stuck.</p>
<p>Google smarter, not harder.</p>
<p>Write clean, simple code.</p>
<p>Stay curious, keep exploring.</p>
`, 1),
    viewportManager.animateToLayout({ browserImage: beq5 })
  );

  yield* waitUntil("only-two");

  const arrow1 = createRef<ExtendedTxt>();
  const arrow2 = createRef<ExtendedTxt>();

  view.add(
    <>
      <ExtendedTxt
        ref={arrow1}
        position={[spaceX[5], spaceNY[2.25]]}
        text={"⇠"}
        fontSize={spaceY[0.75]}
        fontWeight={600}
        colored
        color={"green"}
        opacity={0}
      />
      <ExtendedTxt
        ref={arrow2}
        position={[spaceX[5], spaceY[1.5]]}
        text={"⇠"}
        fontSize={spaceY[0.75]}
        fontWeight={600}
        colored
        color={"green"}
        opacity={0}
      />
    </>
  );

  yield* all(
    arrow1().opacity(1, 0.75),
    arrow2().opacity(1, 0.75),
    arrow1().x(spaceX[4], 0.75),
    arrow2().x(spaceX[4], 0.75),
  )

  yield* waitUntil("class-selectors");

  const classSelectors = createRef<ExtendedTxt>();
  view.add(
    <ExtendedTxt ref={classSelectors} y={spaceNY[4.5]} fontSize={spaceY[0.67]} fontWeight={500} opacity={0} />
  );

  viewportManager.updateLayoutDimensions(spaceX[18], spaceY[8]);
  yield* all(
    wrapper().size([spaceX[18], spaceY[8]], 1),
    wrapper().y(spaceY[1], 1),
    classSelectors().text('Class Selectors', 1),
    viewportManager.animateToLayout({ browserImage: beq6, duration: 1 }),
    classSelectors().opacity(1, 1),
    arrow1().opacity(0, 0.5),
    arrow2().opacity(0, 0.5),
  );

  yield* waitUntil("specific-elements");
  const tag1 = createRef<Icon>();
  const tag2 = createRef<Icon>();
  const highlightRect1 = createRef<ExtendedRect>();
  const highlightRect2 = createRef<ExtendedRect>();
  view.add(
    <>
      <ExtendedRect
        ref={highlightRect1}
        position={[spaceNX[9] + 8, spaceNY[1.5]]}
        size={0}
        highlighted
        color={"blue"}
        lineWidth={3}
        opacity={0}
      />
      <ExtendedRect
        ref={highlightRect2}
        position={[spaceNX[9] + 8, spaceY[1.33]]}
        size={0}
        highlighted
        color={"yellow"}
        lineWidth={3}
        opacity={0}
      />
      <Icon
        ref={tag1}
        icon={"heroicons:tag-20-solid"}
        color={colors.blue[500]}
        size={spaceY["0.5"]}
        x={() => highlightRect1().right().x}
        y={() => highlightRect1().bottom().y}
        opacity={0}
      />
      <Icon
        ref={tag2}
        icon={"heroicons:tag-20-solid"}
        color={colors.yellow[500]}
        size={spaceY["0.5"]}
        x={() => highlightRect2().right().x}
        y={() => highlightRect2().bottom().y}
        opacity={0}
      />
    </>
  );

  yield* all(
    highlightRect1().position([spaceNX[5.5] - 16, spaceNY[1.25] + 4], 1),
    highlightRect1().size([spaceX[6.5], spaceY[0.5]], 1),
    highlightRect2().position([spaceNX[5.75], spaceY[1.5] + 8], 1),
    highlightRect2().size([spaceX[6.33], spaceY[0.5]], 1),
    highlightRect1().opacity(1, 1),
    highlightRect2().opacity(1, 1),
  );

  yield* all(
    tag1().opacity(1, 1),
    tag2().opacity(1, 1),
  );

  yield* waitUntil("style-them");
  const arrow3 = createRef<Circle>();
  const arrow4 = createRef<Circle>();
  const makeBlue = createRef<ExtendedTxt>();
  const makeYellow = createRef<ExtendedTxt>();

  view.add(
    <>
      <Circle
        ref={arrow3}
        x={spaceNX[2.25] + 16}
        y={spaceNY[0.25] - 4}
        size={spaceY[1.75]}
        stroke={colors.slate[0]}
        startAngle={270}
        endAngle={360}
        endArrow
        arrowSize={10}
        lineWidth={3}
        end={0}
      />
      <Circle
        ref={arrow4}
        x={spaceNX[2.25]}
        y={spaceY[2.5]}
        size={spaceY[1.75]}
        stroke={colors.slate[0]}
        startAngle={270}
        endAngle={360}
        endArrow
        arrowSize={10}
        lineWidth={3}
        end={0}
      />
      <ExtendedTxt
        ref={makeBlue}
        x={arrow3().right().x}
        y={arrow3().right().y + spaceY[0.25]}
        text={"make blue"}
        opacity={0}
      />
      <ExtendedTxt
        ref={makeYellow}
        x={arrow4().right().x}
        y={arrow4().right().y + spaceY[0.25]}
        text={"make yellow"}
        opacity={0}
      />
    </>
  );

  yield* all(
    arrow3().end(1, 0.75),
    arrow4().end(1, 0.75),
    delay(0.5, makeBlue().opacity(1, 0.75)),
    delay(0.5, makeYellow().opacity(1, 0.75)),
    delay(0.75, viewportManager.animateToLayout({ browserImage: beq8, duration: 0.5 })),
  )

  const highlightRect3 = createRef<ExtendedRect>();
  const tag3 = createRef<Icon>();
  const arrow5 = createRef<Circle>();
  view.add(
    <>
      <ExtendedRect
        ref={highlightRect3}
        position={[spaceNX[9] + 8, spaceY[0] - 8]}
        size={0}
        highlighted
        color={"yellow"}
        lineWidth={3}
        opacity={0}
      />
      <Icon
        ref={tag3}
        icon={"heroicons:tag-20-solid"}
        color={colors.yellow[500]}
        size={spaceY["0.5"]}
        x={() => highlightRect3().right().x}
        y={() => highlightRect3().bottom().y}
        opacity={0}
      />
      <Circle
        ref={arrow5}
        x={spaceNX[3.25]}
        y={spaceY[2.5]}
        size={spaceY[4.5]}
        stroke={colors.slate[0]}
        startAngle={270}
        endAngle={360}
        endArrow
        arrowSize={10}
        lineWidth={3}
        end={0}
      />
    </>
  );

  yield* all(
    highlightRect3().position([spaceNX[6] - 16, spaceY[0.25] - 8], 0.75),
    highlightRect3().size([spaceX[5.5], spaceY[0.5]], 0.75),
    highlightRect3().opacity(1, 0.75),
    delay(0.5, tag3().opacity(1, 0.75)),
    delay(0.5, arrow5().end(1, 0.75)),
    delay(1.25, viewportManager.animateToLayout({ browserImage: beq9, duration: 0.5 })),
  );

  yield* waitUntil("first-in-html");

  yield* all(
    highlightRect1().opacity(0, 0.75),
    highlightRect1().position([spaceNX[9] + 8, spaceNY[1.5]], 0.75),
    highlightRect1().size(0, 0.75),
    highlightRect2().opacity(0, 0.75),
    highlightRect2().position([spaceNX[9] + 8, spaceY[1.33]], 0.75),
    highlightRect2().size(0, 0.75),
    highlightRect3().opacity(0, 0.75),
    highlightRect3().position([spaceNX[9] + 8, spaceY[0] - 8], 0.75),
    highlightRect3().size(0, 0.75),
    makeBlue().opacity(0, 0.5),
    makeYellow().opacity(0, 0.5),
    arrow3().end(0, 0.5),
    arrow4().end(0, 0.5),
    arrow5().end(0, 0.5),
    tag1().opacity(0, 0.5),
    tag2().opacity(0, 0.5),
    tag3().opacity(0, 0.5),
    viewportManager.animateToLayout({ browserImage: beq6, duration: 0.5 })
  );

  yield* all(
    htmlCode().code.replace(lines(0, 9), `\
<h2>Useful VS Code Shortcuts (try them👍)</h2>
<p>Alt+↑↓ moves line</p>
<p>Ctrl+D selects next occurrence</p>
<p>Ctrl+/ toggles comment</p>
<p>Shift+Alt+↑↓ duplicates line</p>
<p>Ctrl+Alt+↑↓ enables multi cursor</p>
<p>Ctrl+Enter inserts line below</p>
`, 0.75),
    viewportManager.animateToLayout({ browserImage: beq10, duration: 1 })
  );


  yield* waitUntil("class-attribute");
  yield* all(
    htmlCode().code.insert([1, 2], ` class=""`, 0.75),
    htmlCode().code.insert([3, 2], ` class=""`, 0.75),
  );

  yield* waitUntil("to-the-elements");
  arrow1().position([spaceX[4], spaceNY[1.5] - 6]);
  arrow2().position([spaceX[4.75], spaceNY[0.33]]);
  yield* all(
    arrow1().opacity(1, 0.75),
    arrow2().opacity(1, 0.75),
    arrow1().x(spaceX[3], 0.75),
    arrow2().x(spaceX[3.75], 0.75),
  );

  yield* waitUntil("example-here");
  cursor().position([spaceNX[5], spaceNY[1]]);
  yield* all(
    cursor().opacity(1, 0.75),
    cursor().position([spaceNX[7], spaceNY[2]], 1.25),
    delay(0.5, arrow1().opacity(0, 0.5)),
    delay(0.5, arrow2().opacity(0, 0.5)),
  );
  yield* waitUntil("class-highlight");

  yield* all(
    htmlCode().code.insert([1, 10], `highlight`, 0.75),
    htmlCode().code.insert([3, 10], `highlight`, 0.75)
  );

  yield* waitUntil("now-in-css");
  viewportManager.showViewport('css');
  yield* all(
    viewportManager.animateToLayout({ browserImage: beq10, duration: 1 }
    ),
    cursor().opacity(0, 0.75)
  );

  yield* waitUntil("dot-followed-by-class-name");
  yield* all(
    delay(0.25, cssCode().code.append(`.`, 0.75)),
    cursor().opacity(1, 0.75),
    cursor().position([spaceNX[8.75] + 8, spaceNY[2.5] + 8], 0.75),
  );
  yield* all(
    cssCode().code.append(`\
highlight`, 0.75),
    cursor().x(spaceNX[7], 0.75),
  );

  yield* all(
    cssCode().code.append(` {
  color: green;
}
`, 0.75),
    cursor().position([spaceNX[7.5], spaceNY[1.75]], 0.75),
  );
  yield* viewportManager.animateToLayout({ browserImage: beq11, duration: 0.75 });

  yield* all(
    cursor().position([spaceX[2.33], spaceNY[1.5]], 2),
    delay(0.25, cursor().opacity(0, 0.75)),
    delay(1.05, cursor().opacity(1, 0.75)),
  );
  yield* cursor().position([spaceX[3], spaceNY[0.33]], 1);

  yield* waitUntil("leaving-other");
  yield* cursor().position([spaceX[3.75], spaceNY[0.75]], 1);
  yield* cursor().position([spaceX[3.75], spaceY[1.25]], 1);

  yield* waitUntil("we-used-dot")

  viewportManager.updateLayoutDimensions(spaceX[18], spaceY[4]);
  viewportManager.removeViewport("browser");
  yield* all(
    classSelectors().opacity(0, 1.5),
    classSelectors().y(spaceNY[5.5], 1.5),
    viewportManager.animateToLayout({ duration: 1.5 }),
    wrapper().size([spaceX[18], spaceY[4]], 1.5),
    wrapper().y(spaceY[0], 1.5),
    cursor().position([spaceX[0.33] + 8, spaceNY[1.5] + 8], 1.5),
    cssCode().selection(cssCode().findFirstRange(".highlight"), 1.5),
  );

  yield* waitUntil("no-dot-html")

  yield* all(
    htmlCode().selection(
      htmlCode().findAllRanges('class="highlight"'), 0.6),
    cursor().position([spaceNX[7] - 8, spaceNY[1] + 8], 1.25),
  );

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
  view.add(
    <Layout
      ref={table}
      layout
      gap={spaceX[1]}
      position={[spaceX[2.5], spaceY[2]]}
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
          opacity={0}
        />
        <ExtendedTxt
          ref={selector1}
          text=".highlight"
          fontSize={spaceY[0.33] + 4}
          fill={"#f7cd7a"}
          opacity={0}
        />
        <ExtendedTxt
          ref={selector2}
          text="p"
          fontSize={spaceY[0.33] + 4}
          fill={"#e0787b"}
          opacity={0}
        />
        <ExtendedTxt
          ref={selector3}
          text="#highlight"
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
          opacity={0}
        />
        <ExtendedTxt
          ref={selects1}
          text="elements with the highlight class"
          fontSize={spaceY[0.33]}
          opacity={0}
        />
        <ExtendedTxt
          ref={selects2}
          text="all <p> elements"
          fontSize={spaceY[0.33]}
          opacity={0}
        />
        <ExtendedTxt
          ref={selects3}
          text="the element with the highlight id (discussing soon)"
          fontSize={spaceY[0.33]}
          opacity={0}
        />
      </Layout>
    </Layout>
  );

  yield* waitUntil("dot-in-css");
  viewportManager.updateLayoutDimensions(spaceX[18], spaceY[2]);
  yield* all(
    htmlCode().selection(DEFAULT, 0.75),
    htmlCode().code.replace(lines(0, 6), `\
<p class="highlight">
		This is a paragraph with a class.
</p>
`, 1),
    wrapper().size([spaceX[18], spaceY[2]], 0.75),
    wrapper().y(spaceNY[2], 0.75),
    viewportManager.animateToLayout({ duration: 0.75 }),
    selector1().opacity(1, 0.75),
    selects1().opacity(1, 0.75),
    cursor().position([spaceNX[2.5] + 8, spaceY[1.75] + 8], 0.75),
  );

  yield* waitUntil("indicates-class");
  yield* cursor().x(spaceX[4.5], 1.5);

  yield* waitUntil("other-selectors");
  yield* all(
    selectorHeader().opacity(1, 0.75),
    selectsHeader().opacity(1, 0.75),
  )

  yield* waitUntil("indicates-type-selector");
  yield* all(
    selector2().opacity(1, 0.75),
    selects2().opacity(1, 0.75),
    cursor().position([spaceNX[2.5] + 8, spaceY[2.75] + 8], 1),
  )

  yield* waitUntil("indicates-id-selector");
  yield* all(
    selector3().opacity(1, 0.75),
    selects3().opacity(1, 0.75),
    cursor().position([spaceNX[2.5] + 8, spaceY[3.75] + 8], 0.75),
  )

  yield* waitUntil("this-pattern");
  yield* all(
    cursor().opacity(0, 0.75),
    cursor().position([spaceNX[1.5] + 8, spaceY[4.75] + 8], 0.75),
  )

  yield* waitUntil("s3-end");
}
)
