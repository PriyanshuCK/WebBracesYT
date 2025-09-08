import { Circle, Code, Icon, lines, makeScene2D, word } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Cursor, ExtendedRect, Grid, ViewportManager } from "../nodes";
import { all, createRef, DEFAULT, delay, Direction, Reference, slideTransition, waitFor, waitUntil } from "@motion-canvas/core";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import beq1 from '../images/s2/beq1.png';
import beq2 from '../images/s2/beq2.png';
import beq3 from '../images/s2/beq3.png';
import beq4 from '../images/s2/beq4.png';
import beq5 from '../images/s2/beq5.png';
import beq6 from '../images/s2/beq6.png';
import beq8 from '../images/s2/beq8.png';
import { ExtendedTxt } from "../nodes/ExtendedTxt";

export default makeScene2D(function*(view) {
	view.fontFamily('Geist');
	view.fill(colors.zinc[950]);
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
			<Cursor ref={cursor} position={[spaceNX[7.75], spaceNY[1.33]]} opacity={0} />
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

	// beq7 - both green

	yield* waitFor(30);
}
)
