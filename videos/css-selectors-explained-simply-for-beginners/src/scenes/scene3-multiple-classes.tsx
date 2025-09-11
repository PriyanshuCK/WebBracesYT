import { Code, Layout, lines, makeScene2D, word } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Cursor, ExtendedRect, Grid, ViewportManager } from "../nodes";
import { all, createRef, DEFAULT, delay, Direction, Reference, slideTransition, waitFor, waitUntil } from "@motion-canvas/core";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import h2b1 from "../images/s3/h2b1.png";
import h2b2 from "../images/s3/h2b2.png";
import h2b3 from "../images/s3/h2b3.png";
import eqh1 from "../images/s3/eqh1.png";
import eqh2 from "../images/s3/eqh2.png";
import eqh3 from "../images/s3/eqh3.png";
import eqh4 from "../images/s3/eqh4.png";
import eqh5 from "../images/s3/eqh5.png";
import { ExtendedTxt } from "../nodes/ExtendedTxt";

export default makeScene2D(function*(view) {
	view.fontFamily('Geist');
	view.fill(colors.zinc[950]);
	// view.opacity(0.3);
	view.add(<Grid />);

	const viewportManager = new ViewportManager()
		.addHtml(`\
<p class="highlight">
	 This has the highlight class.
</p>`)
		.addCss()
		.addBrowser();

	viewportManager.addToView(view);

	const refs = viewportManager.getViewportRefs();
	const htmlCode: Reference<Code> = refs.html?.code;
	const cssCode: Reference<Code> = refs.css?.code;
	const cssViewport = refs.css?.viewport;

	viewportManager.removeViewport('browser');
	yield* viewportManager.animateToLayout({ duration: 0 });
	yield* slideTransition(Direction.Right, 0.75);

	const cursor = createRef<Cursor>();
	view.add(
		<>
			<Cursor ref={cursor} position={[spaceNX[4.5], spaceNY[3.5]]} opacity={0} color={"green"} />
		</>
	);

	yield* waitUntil("give-an-element");
	yield* all(
		cursor().opacity(1, 0.75),
		cursor().position([spaceNX[6.5], spaceNY[4.5]], 0.75),
	)

	yield* all(
		htmlCode().code.insert([0, 19], " important", 0.75),
		htmlCode().code.replace(word(1, 11, 19), "multiple classes", 0.75),
		cursor().x(spaceNX[4.5], 1.25),
	);

	yield* all(
		cssCode().code.append(`\
.highlight {
  background-color: yellow;
}

.important {
  font-weight: bold;
}`, 0.75),
		cursor().opacity(0, 0.5),
		cursor().position([spaceNX[3.5], spaceNY[3.5]], 0.5),
	);

	yield* waitUntil("our-dot-highlight");
	cursor().position([spaceX[5.5], spaceY[3.75]]);
	viewportManager.showViewport('browser');
	yield* all(
		viewportManager.animateToPresetLayout('H_B2', { browserImage: h2b1, duration: 0.75 }),
		cssCode().code.remove(lines(3), 0.75),
	);

	yield* waitUntil("still-match");
	yield* all(
		cursor().opacity(1, 0.75),
		cursor().position([spaceX[3.5], spaceY[2.75]], 0.75),
	);

	yield* waitUntil("other-classes");
	yield* all(
		cursor().position([spaceNX[4.5], spaceNY[4.5]], 1),
	);

	yield* waitUntil("apply-style");
	yield* cssCode().code.remove(lines(0, 5), 0.75);
	yield* all(
		viewportManager.animateToPresetLayout('H_B2', { browserImage: h2b2 }),
		cursor().x(spaceNX[7], 1).back(1),
	);

	yield* waitUntil("do-this");
	yield* all(
		delay(0.5, cssCode().code.append(`\
.highlight.important {
  border: 3px solid red;
}`, 0.75)),
		cursor().position([spaceX[3.5], spaceY[2.75]], 1.25),
		delay(0.5, viewportManager.animateToPresetLayout('H_B2', { browserImage: h2b3 })),
	);

	yield* all(
		cursor().position([spaceX[0.33] + 8, spaceY[2.25] + 8], 1).to([spaceX[3.75], spaceY[2.25] + 8], 1.5).to([spaceX[2] + 8, spaceY[2.25] + 8], 0.75),
		cssCode().selection(word(0, 0, 20), 0.75),
	);

	yield* waitUntil("this-rule")
	yield* all(
		cursor().position([spaceX[3.5], spaceY[2.75]], 0.75),
		cssCode().selection(lines(1), 0.75),
	);

	yield* waitUntil("only-apply")
	yield* all(
		cursor().position([spaceNX[7], spaceNY[4.5]], 1).to([spaceNX[4], spaceNY[4.5]], 1.5),
		cssCode().selection(DEFAULT, 0.75),
		delay(0.5, htmlCode().selection(
			htmlCode().findAllRanges('class="highlight important"'), 0.75)),
	);

	yield* all(
		delay(0.5, cursor().position([spaceX[3.5], spaceY[2.75]], 1.5)),
		htmlCode().selection(DEFAULT, 0.75),
	);

	yield* waitUntil("that-have-these")
	yield* cssCode().selection(word(0, 0, 20), 0.75);
	yield* waitFor(0.5)
	yield* cssCode().selection(DEFAULT, 0.75);

	yield* waitUntil("so-this-html");

	const highlightRect1 = createRef<ExtendedRect>();
	view.add(
		<>
			<ExtendedRect
				ref={highlightRect1}
				position={[spaceX[3], spaceNY[4.33]]}
				size={0}
				color="green"
				highlighted
			/>
		</>
	);

	yield* all(
		cursor().opacity(0, 0.75),
		viewportManager.animateToPresetLayout('test2', { browserImage: eqh1 }),
		cssCode().code.replace(
			cssCode().findFirstRange('red'), "#eb0", 0.75),
		htmlCode().code.replace(lines(1, 2), `\
  I have both classes!
</p>
<p class="highlight important warning">
  I have both classes plus more!
</p>
`, 0.75),
		cssCode().code.append(`
.highlight {
  background-color: #ff9;
}
.important {
  font-weight: bold;
}
.warning {
  color: red;
}
`, 0.75),
		htmlCode().selection(lines(0, 5), 0.75),
	);

	yield* all(
		highlightRect1().position([spaceX[6] + 8, spaceNY[3.75]], 0.75),
		highlightRect1().size([spaceX[6], spaceY[1.25]], 0.75),
	);

	yield* all(
		viewportManager.animateToPresetLayout('test2', { browserImage: eqh2 }),
		htmlCode().code.append(`\
<p class="highlight">
  I only have highlight class.
</p>
<p class="important">
  I only have important class.
</p>
`, 0.75),
		htmlCode().selection(lines(6, 11), 0.75),
		highlightRect1().y(spaceNY[2.5] + 4, 0.75),
	);

	yield* waitUntil("incredibly-useful");
	yield* all(
		htmlCode().selection(DEFAULT, 0.75),
		highlightRect1().size(0, 0.75),
		highlightRect1().opacity(0, 0.75),
		highlightRect1().position([spaceX[3], spaceNY[3.75]], 0.75),
	);

	yield* waitUntil("let's-take-buttons");

	yield* all(
		htmlCode().code.replace(lines(0, 11), `\
<button>
  Primary Button
</button>
<button>
  Large Secondary Button
</button>
<button>
  Large Primary Button
</button>
`, 0.75),
		viewportManager.animateToPresetLayout('EQ_H', { browserImage: eqh3 }),
		cssCode().code.remove(lines(0, 11), 0.75),
	);

	yield* waitUntil("base-button-style");
	yield* all(
		viewportManager.animateToPresetLayout('EQ_H', { browserImage: eqh4 }),
		cssCode().code.append(`\
button { 
    padding: 10px 20px; 
    border-radius: 5px; 
}
`, 0.75),
	);

	yield* waitUntil("variations-like");
	yield* cssCode().code.append(`\
button.primary { 
    background: blue; 
    color: white; 
}
`, 0.75);

	yield* cssCode().code.append(`\
button.secondary { 
    background: gray; 
    color: black; 
}
`, 0.75);

	yield* cssCode().code.append(`\
button.large { 
    font-size: 18px; 
    padding: 15px 30px; 
}
`, 0.75);

	yield* waitUntil("mix&match");
	yield* all(
		htmlCode().code.insert([0, 7], ` class="primary"`, 0.75),
		delay(0.6, htmlCode().code.insert([3, 7], ` class="secondary large"`, 1)),
		delay(1.2, htmlCode().code.insert([6, 7], ` class="primary large"`, 1)),
		delay(1.2, viewportManager.animateToPresetLayout('EQ_H', { browserImage: eqh5 })),
	);

	yield* waitUntil("primaryLarge");
	yield* all(
		htmlCode().selection(lines(6, 8), 0.75),
		cssCode().selection([lines(0, 7), lines(12, 15)], 0.75),
	);

	yield* waitUntil("secondaryLarge");
	yield* all(
		htmlCode().selection(lines(3, 5), 0.75),
		cssCode().selection([lines(0, 3), lines(8, 15)], 0.75),
	);

	yield* waitUntil("justPrimary");
	yield* all(
		htmlCode().selection(lines(0, 2), 0.75),
		cssCode().selection([lines(0, 7)], 0.75),
	);

	yield* waitFor(0.5);
	yield* all(
		htmlCode().selection(DEFAULT, 0.75),
		cssCode().selection(DEFAULT, 0.75),
	);

	yield* waitUntil("saves-us");
	const browserViewport = refs.browser?.viewport;

	view.add(
		<Layout layout direction="column" gap={spaceY[0.5]} x={spaceX[6]} >
			<ExtendedTxt
				text={"primary-small-button"}
			/>
			<ExtendedTxt
				text={"small-button"}
			/>
			<ExtendedTxt
				text={"primary-button"}
			/>
			<ExtendedTxt
				text={"secondary-large-button"}
			/>
			<ExtendedTxt
				text={"large-button"}
			/>
			<ExtendedTxt
				text={"secondary-small-button"}
			/>
			<ExtendedTxt
				text={"primary-large-button"}
			/>
		</Layout>
	);

	yield* all(
		browserViewport().opacity(0, 0.75),
	);



	yield* waitFor(90);
});
