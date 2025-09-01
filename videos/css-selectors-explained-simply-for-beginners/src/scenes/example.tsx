import { Circle, Code, makeScene2D } from '@motion-canvas/2d';
import { all, createRef, delay, waitFor } from '@motion-canvas/core';
import colors from '../lib/colors';
import { ExtendedRect, Grid, CSSCode, HTMLCode } from '../nodes';
import spaceX, { spaceNX, spaceNY, spaceY } from '../lib/space';
import { ExtendedTxt } from '../nodes/ExtendedTxt';

export default makeScene2D(function*(view) {
	view.fill(colors.zinc[950]);
	view.fontFamily('Geist');
	const htmlView = createRef<ExtendedRect>();
	const cssView = createRef<ExtendedRect>();
	const browserView = createRef<ExtendedRect>();
	const cssCode = createRef<Code>();
	const htmlCode = createRef<Code>();
	view.add(
		<>
			<Grid />
			<ExtendedRect
				layout
				ref={htmlView}
				lineWidth={1}
				width={spaceX[8.5]}
				height={spaceY[4.5]}
				position={[spaceNX['4.75'], spaceY['2.75']]}
				opacity={0}
				padding={spaceX[0.25]}
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
			<ExtendedRect layout ref={cssView} lineWidth={1} width={spaceX[8.5]} height={spaceY[4.5]} position={[spaceX['4.75'], spaceY['2.75']]}
				opacity={0}
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
			<ExtendedRect layout ref={browserView} lineWidth={1} width={spaceX[18]} height={spaceY[4.5]} position={[spaceX['0'], spaceNY['2.75']]}
				opacity={0} fill={colors.slate[0]}
				padding={spaceX[0.25]}
			>
				<ExtendedTxt text="Browser" fill={colors.slate[800]} />
			</ExtendedRect>
		</>
	);

	yield* all(
		htmlView().opacity(1, 1),
		delay(0.2, cssView().opacity(1, 1)),
		delay(0.4, browserView().opacity(1, 1))
	)

	yield* waitFor(2);

	yield* all(
		htmlView().y(spaceNY['2.75'], 0.75),
		cssView().x(spaceNX['4.75'], 0.75),
		browserView().x(spaceX['4.75'], 0.75),
		browserView().y(0, 0.75),
		browserView().width(spaceX[8.5], 0.75),
		browserView().height(spaceY[10], 0.75),
	);

	yield* waitFor(30);
});
