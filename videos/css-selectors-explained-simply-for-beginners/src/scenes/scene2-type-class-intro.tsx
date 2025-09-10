import { Camera, Circle, Code, Icon, Layout, lines, makeScene2D, Rect, Txt, word } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { Cursor, ExtendedCircle, ExtendedRect, Grid, ViewportManager } from "../nodes";
import { all, createRef, DEFAULT, delay, Direction, Reference, slideTransition, waitFor, waitUntil } from "@motion-canvas/core";
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
	view.opacity(0.3);
	view.add(<Grid />);

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
	const camera = viewportManager.getViewportCamera();
	const browserViewport = refs.browser?.viewport;
	const htmlViewport = refs.html?.viewport;
	const cssViewport = refs.css?.viewport;

	viewportManager.updateLayoutDimensions(spaceX[18], spaceY[10]);
	yield* all(
		classSelectors().opacity(0, 1.5),
		classSelectors().y(spaceNY[5.5], 1.5),
		viewportManager.animateToLayout({ duration: 1.5 }),
		wrapper().size([spaceX[18], spaceY[10]], 1.5),
		wrapper().y(spaceY[0], 1.5),
		delay(1.25, browserViewport().opacity(0, 0.25)),
		cursor().position([spaceNX[3] - 8, spaceNY[3.75] + 8], 1.5),
		camera().centerOn([cssViewport().left().x + spaceX[2.33], cssViewport().left().y], 1.5),
		camera().zoom(1.5, 1.5),
	);

	yield* waitUntil("no-dot-html")

	yield* all(
		camera().centerOn([cssViewport().left().x + spaceX[2.33], cssViewport().left().y + spaceY[2]], 1.25),
		camera().zoom(1.25, 1.25),
		htmlCode().selection(
			htmlCode().findAllRanges('class="highlight"'), 0.6),
		cursor().position([spaceNX[0.5], spaceY[2] + 8], 1.25),
	);

	yield* waitUntil("dot-in-css");
	yield* all(
		camera().reset(1),
		htmlCode().selection(DEFAULT, 0.75),
		htmlCode().code.replace(lines(0, 6), `\
<p class="highlight">
		This is a paragraph with a class.
</p>
`, 1),
	);

	const tableContainer = createRef<Rect>();
	const headerRow = createRef<Rect>();
	const selectorHeader = createRef<Txt>();
	const selectsHeader = createRef<Txt>();

	const row1Container = createRef<Rect>();
	const row2Container = createRef<Rect>();
	const row3Container = createRef<Rect>();

	const selector1 = createRef<Txt>();
	const selector2 = createRef<Txt>();
	const selector3 = createRef<Txt>();

	const selects1 = createRef<Txt>();
	const selects2 = createRef<Txt>();
	const selects3 = createRef<Txt>();

	// Vertical divider references
	const divider1 = createRef<Rect>();
	const divider2 = createRef<Rect>();
	const divider3 = createRef<Rect>();

	// Table styling
	const totalTableWidth = spaceX[9] - 20;
	const selectorColumnWidth = spaceX[3]; // Narrower for content fitting
	const selectsColumnWidth = totalTableWidth - selectorColumnWidth; // Wider for descriptions
	const rowHeight = spaceY[0.75];
	const headerHeight = spaceY[1];
	const borderColor = colors.zinc[600];
	const headerBg = colors.zinc[800];
	const rowBg = colors.zinc[950];
	const textColor = colors.zinc[0];
	const highlightColor = '#ffd700';

	view.add(
		<Layout x={spaceX[4.5] + 10}>
			<Rect
				ref={tableContainer}
				width={totalTableWidth}
				height={headerHeight + rowHeight} // Initially just header + first row
				fill={rowBg}
				stroke={borderColor}
				lineWidth={2}
				radius={8}
				opacity={0}
			>
				<Rect
					ref={headerRow}
					width={totalTableWidth - 4}
					height={headerHeight}
					fill={headerBg}
					y={-rowHeight / 2}
					stroke={borderColor}
					lineWidth={1}
					opacity={0}
				>
					<Txt
						ref={selectorHeader}
						text="Selector"
						fill={textColor}
						fontSize={32}
						fontWeight={700}
						x={-selectsColumnWidth / 2}
						opacity={0}
					/>
					<Txt
						ref={selectsHeader}
						text="Selects"
						fill={textColor}
						fontSize={32}
						fontWeight={700}
						x={selectorColumnWidth / 2}
						opacity={0}
					/>
					{/* Header vertical divider */}
					<Rect
						width={2}
						height={headerHeight - 4}
						fill={borderColor}
						x={selectorColumnWidth - totalTableWidth / 2}
						opacity={0}
						ref={createRef<Rect>()}
					/>
				</Rect>

				{/* Row 1 Container */}
				<Rect
					ref={row1Container}
					width={totalTableWidth - 4}
					height={rowHeight}
					fill={rowBg}
					y={headerHeight / 2}
					stroke={borderColor}
					lineWidth={1}
					opacity={0}
				>
					<Txt
						ref={selector1}
						text=".highlight"
						fill={highlightColor}
						fontSize={26}
						x={-selectsColumnWidth / 2}
						opacity={0}
					/>
					<Txt
						ref={selects1}
						text="elements with the highlight class"
						fill={textColor}
						fontSize={22}
						x={selectorColumnWidth / 2}
						opacity={0}
					/>
					<Rect
						ref={divider1}
						width={2}
						height={rowHeight - 4}
						fill={borderColor}
						x={selectorColumnWidth - totalTableWidth / 2}
						opacity={0}
					/>
				</Rect>

				{/* Row 2 Container */}
				<Rect
					ref={row2Container}
					width={totalTableWidth - 4}
					height={rowHeight}
					fill={rowBg}
					y={headerHeight / 2 + rowHeight}
					stroke={borderColor}
					lineWidth={1}
					opacity={0}
					scaleY={0}
				>
					<Txt
						ref={selector2}
						text="p"
						fill={highlightColor}
						fontSize={26}
						x={-selectsColumnWidth / 2}
						opacity={0}
					/>
					<Txt
						ref={selects2}
						text="all <p> elements"
						fill={textColor}
						fontSize={22}
						x={selectorColumnWidth / 2}
						opacity={0}
					/>
					<Rect
						ref={divider2}
						width={2}
						height={rowHeight - 4}
						fill={borderColor}
						x={selectorColumnWidth - totalTableWidth / 2}
						opacity={0}
					/>
				</Rect>

				{/* Row 3 Container */}
				<Rect
					ref={row3Container}
					width={totalTableWidth - 4}
					height={rowHeight}
					fill={rowBg}
					y={headerHeight / 2 + rowHeight * 2}
					stroke={borderColor}
					lineWidth={1}
					opacity={0}
					scaleY={0}
				>
					<Txt
						ref={selector3}
						text="#highlight"
						fill={highlightColor}
						fontSize={26}
						x={-selectsColumnWidth / 2}
						opacity={0}
					/>
					<Txt
						ref={selects3}
						text="the element with the highlight id (discussing soon)"
						fill={textColor}
						fontSize={22}
						x={selectorColumnWidth / 2}
						opacity={0}
					/>
					<Rect
						ref={divider3}
						width={2}
						height={rowHeight - 4}
						fill={borderColor}
						x={selectorColumnWidth - totalTableWidth / 2}
						opacity={0}
					/>
				</Rect>
			</Rect>
		</Layout>
	);

	// Animation sequence
	yield* waitFor(0.5);

	// Initial appearance: table container with header and first empty row
	yield* tableContainer().opacity(1, 0.8);

	yield* waitFor(0.2);

	// Animate header
	yield* all(
		headerRow().opacity(1, 0.6),
		selectorHeader().opacity(1, 0.6),
		selectsHeader().opacity(1, 0.6),
		headerRow().children()[2].opacity(1, 0.6)
	);

	// Show first row background
	yield* row1Container().opacity(1, 0.4);
	yield* divider1().opacity(1, 0.4);

	yield* waitFor(0.3);

	// Animate first row content
	yield* all(
		selector1().opacity(1, 0.5),
		selects1().opacity(1, 0.5)
	);

	yield* waitFor(0.5);

	// Grow table for second row and animate its appearance
	yield* all(
		tableContainer().height(headerHeight + rowHeight * 2, 0.6),
		row2Container().scale.y(1, 0.6),
		row2Container().opacity(1, 0.4)
	);

	yield* divider2().opacity(1, 0.4);

	yield* waitFor(0.2);

	// Animate second row content
	yield* all(
		selector2().opacity(1, 0.5),
		selects2().opacity(1, 0.5)
	);

	yield* waitFor(0.5);

	// Grow table for third row and animate its appearance
	yield* all(
		tableContainer().height(headerHeight + rowHeight * 3, 0.6),
		row3Container().scale.y(1, 0.6),
		row3Container().opacity(1, 0.4)
	);

	yield* divider3().opacity(1, 0.4);

	yield* waitFor(0.2);

	// Animate third row content
	yield* all(
		selector3().opacity(1, 0.5),
		selects3().opacity(1, 0.5)
	);
	yield* waitUntil("s3-end");
}
)
