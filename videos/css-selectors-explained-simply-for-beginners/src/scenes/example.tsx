import { Circle, Code, makeScene2D } from '@motion-canvas/2d';
import { all, createRef, delay, waitFor } from '@motion-canvas/core';
import colors from '../lib/colors';
import { ExtendedRect, Grid, CSSCode, HTMLCode, Window } from '../nodes';
import spaceX, { spaceNX, spaceNY, spaceY } from '../lib/space';
import { ExtendedTxt } from '../nodes/ExtendedTxt';

export default makeScene2D(function*(view) {
	view.fill(colors.zinc[950]);
	view.fontFamily('Geist');
	const htmlView = createRef<ExtendedRect>();
	const cssView = createRef<ExtendedRect>();
	const browserView = createRef<Window>();
	const cssCode = createRef<Code>();
	const htmlCode = createRef<Code>();
	// <Grid />
	view.add(
		<>
			<ExtendedRect
				layout
				ref={htmlView}
				lineWidth={1}
				width={spaceX[8.75]}
				height={spaceY[4.75]}
				position={[spaceNX[1] * 4.625, spaceY[1] * 2.625]}
				opacity={0}
				padding={spaceX[0.25]}
				color={"slate"}
			>
				<HTMLCode
					ref={htmlCode}
					x={spaceX[4]}
					y={spaceY[1]}
					code={() => `\
<h1>seoifj seoif udunf</h1>
<p>woeif soiiodh oisiuehf </p>
<p>fueh soddfcnh iufh</p>
<p>wfe oierhf oisiuehf </p>
<p>wfe oierhf oisiuehf </p>
<p>wfe oierhf oisiuehf </p>
`}
				/>
			</ExtendedRect>
			<ExtendedRect layout ref={cssView} lineWidth={1} width={spaceX[8.75]} height={spaceY[4.75]} position={[spaceX[1] * 4.625, spaceY[1] * 2.625]}
				opacity={0}
				color={"slate"}
				padding={spaceX[0.25]}
			>
				<CSSCode
					ref={cssCode}
					x={spaceX[4]}
					y={spaceY[1]}
					code={() => `\
p {
  color: blue;
}

h1 {
  font-size: 48px;
  color: red;
	font-weight: bold;
}
`}
				/>
			</ExtendedRect>
			<Window ref={browserView} lineWidth={1} width={spaceX[18]} height={spaceY[4.75]} position={[spaceX['0'], spaceNY[1] * 2.625]}
				opacity={0} fill={colors.slate[0]}
			>
				<ExtendedTxt text="Browser" fill={colors.slate[800]} />
			</Window>
		</>
	);

	yield* all(
		htmlView().opacity(1, 1),
		delay(0.2, cssView().opacity(1, 1)),
		delay(0.4, browserView().opacity(1, 1))
	)

	yield* waitFor(2);

	yield* all(
		htmlView().y(spaceNY[1] * 2.625, 0.75),
		cssView().x(spaceNX[1] * 4.625, 0.75),
		browserView().x(spaceX[1] * 4.625, 0.75),
		browserView().y(0, 0.75),
		browserView().width(spaceX[8.75], 0.75),
		browserView().height(spaceY[10], 0.75),
	);

	yield* waitFor(30);
});
