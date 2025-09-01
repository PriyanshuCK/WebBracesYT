import { Circle, makeScene2D } from '@motion-canvas/2d';
import { createRef } from '@motion-canvas/core';
import colors from '../lib/colors';

export default makeScene2D(function*(view) {
	const circle = createRef<Circle>();

	view.add(<Circle ref={circle} size={320} fill={colors.green[500]} />);

	yield* circle().scale(2, 2).to(1, 2);
});
