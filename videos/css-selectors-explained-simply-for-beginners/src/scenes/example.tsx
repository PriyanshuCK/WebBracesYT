import { Code, lines, makeScene2D } from '@motion-canvas/2d';
import { all, Reference, waitFor } from '@motion-canvas/core';
import { Grid, ViewportManager } from '../nodes';
import exampleImage from 'C:\\Users\\priyanshu.sharma1\\Pictures\\rect1.png';
import colors from '../lib/colors';

export default makeScene2D(function*(view) {
	view.fontFamily('Geist');
	view.fill(colors.zinc[950]);
	// view.add(<Grid />);

	const viewportManager = new ViewportManager()
		.addHtml('<h1>Hello World</h1>')
		.addCss('h1 { color: blue; }')
		.addBrowser(exampleImage);

	viewportManager.addToView(view);

	const refs = viewportManager.getViewportRefs();
	const htmlCode: Reference<Code> = refs.html?.code;
	const cssCode: Reference<Code> = refs.css?.code;

	yield* viewportManager.animateToPresetLayout('B_EQ', {
		duration: 0,
		browserImage: exampleImage
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

	yield* all(
		viewportManager.animateToPresetLayout('H_B2', {
			duration: 1.2,
			browserImage: exampleImage
		}),
		cssCode().code.append(`
\
.intro {
  font-size: 18px;
  margin: 20px 0;
  color: #666;
}

.btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}`, 2)
	);

	yield* waitFor(2);

	yield* viewportManager.animateToPresetLayout('C_EQ', {
		duration: 1.2,
		browserImage: exampleImage
	});

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
		browserImage: exampleImage
	});

	yield* waitFor(2);

	yield* viewportManager.animateToPresetLayout('EQ_H', {
		duration: 1.2,
		browserImage: exampleImage
	});

	yield* waitFor(2);

	yield* viewportManager.animateToPresetLayout('EQ_V', {
		duration: 1.2,
		browserImage: exampleImage
	});

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
		browserImage: exampleImage
	});

	yield* waitFor(2);

	viewportManager.showViewport('html');

	yield* viewportManager.animateToLayout({
		duration: 1.2,
		browserImage: exampleImage
	});

	yield* waitFor(2);

	yield* viewportManager.animateToLayoutWithRatios(
		{ html: 4, css: 2, browser: 1 },
		{
			orientation: 'smart',
			duration: 1.5,
			browserImage: exampleImage
		}
	);

	yield* waitFor(1.5);

	yield* viewportManager.animateToLayoutWithRatios(
		{ html: 1, css: 3, browser: 2 },
		{
			orientation: 'horizontal',
			duration: 1.5,
			browserImage: exampleImage
		}
	);

	yield* waitFor(1.5);

	yield* viewportManager.animateToLayoutWithRatios(
		{ html: 2, css: 1, browser: 3 },
		{
			orientation: 'vertical',
			duration: 1.5,
			browserImage: exampleImage
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
		browserImage: exampleImage
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

.card h2 {
  color: #333;
  margin-top: 0;
}

.price {
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
}`, 2)
		);
	}

	yield* waitFor(2);

	const presets = ['H_EQ', 'H_B2', 'C_EQ', 'C_B2', 'B_EQ', 'EQ_H', 'EQ_V'];

	for (const preset of presets) {
		yield* viewportManager.animateToPresetLayout(preset, {
			duration: 1,
			browserImage: exampleImage
		});
		yield* waitFor(1.2);
	}

	yield* viewportManager.animateToPresetLayout('B_EQ', {
		duration: 1.5,
		browserImage: exampleImage
	});

	yield* waitFor(1);
});
