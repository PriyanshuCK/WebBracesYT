import { Code, lines, makeScene2D } from '@motion-canvas/2d';
import { all, Reference, waitFor } from '@motion-canvas/core';
import { Grid, ViewportManager } from '../nodes';
import h_eq from '../images/h_eq.png';
import h_b2 from '../images/h_b2.png';
import c_eq from '../images/c_eq.png';
import c_b2 from '../images/c_b2.png';
import b_eq from '../images/b_eq.png';
import eq_h from '../images/eq_h.png';
import eq_v from '../images/eq_v.png';
import test1 from '../images/test1.png';
import test2 from '../images/test2.png';
import test3 from '../images/test3.png';
import colors from '../lib/colors';

export default makeScene2D(function*(view) {
	view.fontFamily('Geist');
	view.fill(colors.zinc[950]);
	view.add(<Grid />);

	const viewportManager = new ViewportManager()
		.addHtml('<h1>Hello World</h1>')
		.addCss('h1 { color: blue; }')
		.addBrowser(h_eq);

	// Log allowed aspect ratios for debugging
	console.log('Allowed aspect ratios:', viewportManager.getAllowedAspectRatios());

	viewportManager.addToView(view);

	const refs = viewportManager.getViewportRefs();
	const htmlCode: Reference<Code> = refs.html?.code;
	const cssCode: Reference<Code> = refs.css?.code;

	yield* viewportManager.animateToPresetLayout('H_EQ', {
		duration: 0,
		browserImage: h_eq
	});

	yield* waitFor(1);

	if (htmlCode) {
		yield* htmlCode().code.append(`
\
<p class="intro">Welcome to our demo!</p>
\
<button class="btn">Click me</button>`, 1.5);
	}

	yield* waitFor(1);

	// This will now validate the image aspect ratio before changing
	yield* all(
		viewportManager.animateToPresetLayout('H_B2', {
			duration: 1.2,
			browserImage: h_b2  // Will be validated automatically
		}),
		cssCode().code.append(`
\
.intro {
  font-size: 18px;
  margin: 20px 0;
  color: #666;
}
`, 2),
	);

	yield* waitFor(2);

	// Example of direct validation (useful for conditional logic)
	yield* all(
		viewportManager.animateToPresetLayout('C_EQ', {
			duration: 1.2,
			browserImage: c_eq  // We can also validate directly
			// No need to specify browserImage here since we already changed it above
		}));

	yield* all(
		refs.css.viewport().tweenColor("violet", 1),
		refs.css.viewport().lineWidth(2, 1),
		cssCode().code.append(`
.btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}`, 2)
	);

	if (cssCode) {
		yield* cssCode().code.append(`
.btn:hover {
  background: #0056b3;
  transform: translateY(-2px);
  transition: all 0.3s ease;
}`, 1.5);
	}

	yield* waitFor(2);

	yield* viewportManager.animateToPresetLayout('C_B2', {
		duration: 1.2,
		browserImage: c_b2  // Validation will occur automatically
	});

	yield* waitFor(2);

	yield* all(
		refs.css.viewport().tweenColor("slate", 1),
		refs.css.viewport().lineWidth(1, 1)
	);

	yield* all(
		viewportManager.animateToPresetLayout('EQ_H', {
			duration: 1.2,
			browserImage: eq_h  // Will be validated
		}),
		htmlCode().code.remove(lines(1, 2), 1)
	)
		;

	yield* waitFor(2);

	yield* all(
		viewportManager.animateToPresetLayout('EQ_V', {
			duration: 1.2,
			browserImage: eq_v  // Will be validated
		}),
		cssCode().code.remove(lines(6, 19), 1),
		htmlCode().code.append(`<p>Simple paragraph</p>`, 1)
	);

	yield* waitFor(2);

	viewportManager.removeViewport('browser');

	yield* viewportManager.animateToLayout({
		duration: 1.2
	});

	if (htmlCode) {
		yield* htmlCode().code.append(`
\
<div class="demo">Browser removed</div>`, 1);
	}

	yield* waitFor(2);

	viewportManager.removeViewport('html');

	yield* viewportManager.animateToLayout({
		duration: 1.2
	});

	yield* waitFor(1.5);

	viewportManager.showViewport('browser');

	yield* viewportManager.animateToLayout({
		duration: 1.2,
		browserImage: b_eq  // Will be validated
	});

	yield* waitFor(2);

	viewportManager.showViewport('html');

	yield* viewportManager.animateToLayout({
		duration: 1.2,
		browserImage: b_eq  // Will be validated
	});

	yield* waitFor(2);

	yield* viewportManager.animateToLayoutWithRatios(
		{ html: 4, css: 1, browser: 2 },
		{
			orientation: 'smart',
			duration: 1.5,
			browserImage: test1  // Will be validated
		}
	);

	yield* waitFor(1.5);

	yield* viewportManager.animateToLayoutWithRatios(
		{ html: 1, css: 3, browser: 2 },
		{
			orientation: 'horizontal',
			duration: 1.5,
			browserImage: test2  // Will be validated
		}
	);

	yield* waitFor(1.5);

	yield* viewportManager.animateToLayoutWithRatios(
		{ html: 2, css: 1, browser: 3 },
		{
			orientation: 'vertical',
			duration: 1.5,
			browserImage: test3  // Will be validated
		}
	);

	yield* waitFor(2);

	viewportManager
		.removeViewport('css')
		.removeViewport('browser');

	yield* viewportManager.animateToLayout({ duration: 1 });

	if (htmlCode) {
		yield* all(
			htmlCode().code.remove(lines(0, Infinity), 0.5),
			htmlCode().code.append(`<div class="card">
  <h2>Product Card</h2>
  <p>Description here</p>
  <span class="price">$99</span>
</div>`, 1.5)
		);
	}

	yield* waitFor(1);

	viewportManager.showViewport('browser');
	yield* viewportManager.animateToLayout({
		duration: 1.2,
		browserImage: b_eq  // Will be validated
	});

	yield* waitFor(1.5);

	viewportManager.showViewport('css');
	yield* viewportManager.animateToLayout({ duration: 1.2 });

	if (cssCode) {
		yield* all(
			cssCode().code.remove(lines(0, Infinity), 0.5),
			cssCode().code.append(`.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  max-width: 300px;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
`, 2)
		);
	}

	yield* waitFor(2);

	yield* viewportManager.animateToPresetLayout('B_EQ', {
		duration: 1.5,
		browserImage: b_eq  // Final validation
	});

	yield* waitFor(1);
});
