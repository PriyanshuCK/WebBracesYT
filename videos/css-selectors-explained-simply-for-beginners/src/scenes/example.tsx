import { Circle, Code, Img, makeScene2D, Rect, Txt } from '@motion-canvas/2d';
import { all, createRef, delay, easeInOutCubic, Reference, tween, waitFor } from '@motion-canvas/core';
import { ExtendedRect, Grid, CSSCode, HTMLCode, Window } from '../nodes';
import spaceX, { spaceNX, spaceNY, spaceY } from '../lib/space';
import { ExtendedTxt } from '../nodes/ExtendedTxt';
import exampleImage from 'C:\\Users\\priyanshu.sharma1\\Pictures\\rect1.png';

export default makeScene2D(function*(view) {
	view.fontFamily('Geist');
	view.fill('#000');
	// Screen dimensions
	const SCREEN_WIDTH = 1920;
	const SCREEN_HEIGHT = 1080;
	const PADDING = 20;
	const BORDER_WIDTH = 2;
	const TITLE_HEIGHT = 40;

	// Color scheme
	const colors = {
		html: '#E34F26',      // HTML orange
		css: '#1572B6',       // CSS blue  
		browser: '#4CAF50',   // Green for browser
		background: '#1e1e1e', // Dark background (VS Code style)
		text: '#FFFFFF',      // White text
		border: '#555555'     // Gray borders
	};

	// Viewport references
	const htmlViewport: Reference<Rect> = createRef<Rect>();
	const cssViewport: Reference<Rect> = createRef<Rect>();
	const browserViewport: Reference<Rect> = createRef<Rect>();

	const htmlTitle: Reference<Txt> = createRef<Txt>();
	const cssTitle: Reference<Txt> = createRef<Txt>();
	const browserTitle: Reference<Txt> = createRef<Txt>();

	const htmlCode: Reference<Code> = createRef<Code>();
	const cssCode: Reference<Code> = createRef<Code>();
	const browserImage: Reference<Img> = createRef<Img>();

	// Layout configurations
	const layouts = {
		// Initial layout: HTML and CSS on left, browser on right
		initial: {
			html: {
				x: -SCREEN_WIDTH / 4,
				y: -SCREEN_HEIGHT / 4,
				width: SCREEN_WIDTH / 2 - PADDING,
				height: SCREEN_HEIGHT / 2 - PADDING
			},
			css: {
				x: -SCREEN_WIDTH / 4,
				y: SCREEN_HEIGHT / 4,
				width: SCREEN_WIDTH / 2 - PADDING,
				height: SCREEN_HEIGHT / 2 - PADDING
			},
			browser: {
				x: SCREEN_WIDTH / 4,
				y: 0,
				width: SCREEN_WIDTH / 2 - PADDING,
				height: SCREEN_HEIGHT - PADDING * 2
			}
		},

		// Large HTML layout: HTML full height on left, CSS and browser split on right
		largeHtml: {
			html: {
				x: -SCREEN_WIDTH / 4,
				y: 0,
				width: SCREEN_WIDTH / 2 - PADDING,
				height: SCREEN_HEIGHT - PADDING * 2
			},
			css: {
				x: SCREEN_WIDTH / 4,
				y: -SCREEN_HEIGHT / 4,
				width: SCREEN_WIDTH / 2 - PADDING,
				height: SCREEN_HEIGHT / 2 - PADDING
			},
			browser: {
				x: SCREEN_WIDTH / 4,
				y: SCREEN_HEIGHT / 4,
				width: SCREEN_WIDTH / 2 - PADDING,
				height: SCREEN_HEIGHT / 2 - PADDING
			}
		},

		// Large CSS layout: CSS full height on left, HTML and browser split on right
		largeCss: {
			css: {
				x: -SCREEN_WIDTH / 4,
				y: 0,
				width: SCREEN_WIDTH / 2 - PADDING,
				height: SCREEN_HEIGHT - PADDING * 2
			},
			html: {
				x: SCREEN_WIDTH / 4,
				y: -SCREEN_HEIGHT / 4,
				width: SCREEN_WIDTH / 2 - PADDING,
				height: SCREEN_HEIGHT / 2 - PADDING
			},
			browser: {
				x: SCREEN_WIDTH / 4,
				y: SCREEN_HEIGHT / 4,
				width: SCREEN_WIDTH / 2 - PADDING,
				height: SCREEN_HEIGHT / 2 - PADDING
			}
		},

		// Large browser layout: Browser full height on right, HTML and CSS split on left
		largeBrowser: {
			browser: {
				x: SCREEN_WIDTH / 4,
				y: 0,
				width: SCREEN_WIDTH / 2 - PADDING,
				height: SCREEN_HEIGHT - PADDING * 2
			},
			html: {
				x: -SCREEN_WIDTH / 4,
				y: -SCREEN_HEIGHT / 4,
				width: SCREEN_WIDTH / 2 - PADDING,
				height: SCREEN_HEIGHT / 2 - PADDING
			},
			css: {
				x: -SCREEN_WIDTH / 4,
				y: SCREEN_HEIGHT / 4,
				width: SCREEN_WIDTH / 2 - PADDING,
				height: SCREEN_HEIGHT / 2 - PADDING
			}
		}
	};

	// Helper function to create code viewport (HTML/CSS)
	function createCodeViewport(
		color: string,
		title: string,
		initialCode: string,
		language: 'html' | 'css',
		viewportRef: Reference<Rect>,
		titleRef: Reference<Txt>,
		codeRef: Reference<Code>
	) {
		return (
			<Rect
				ref={viewportRef}
				fill={colors.background}
				stroke={color}
				lineWidth={BORDER_WIDTH}
				radius={8}
			>
				{/* Title bar */}
				<Rect
					width={() => viewportRef().width()}
					height={TITLE_HEIGHT}
					y={() => -viewportRef().height() / 2 + TITLE_HEIGHT / 2}
					fill={color}
					radius={[8, 8, 0, 0]}
				>
					<Txt
						ref={titleRef}
						text={title}
						fill={colors.text}
						fontSize={16}
						fontWeight={600}
						fontFamily="'JetBrains Mono', monospace"
					/>
				</Rect>

				{/* Code content */}
				<Code
					ref={codeRef}
					// language={language}
					code={initialCode}
					fontSize={12}
					fontFamily="'JetBrains Mono', monospace"
					y={() => TITLE_HEIGHT / 2}
					width={() => viewportRef().width() - PADDING * 2}
					height={() => viewportRef().height() - TITLE_HEIGHT - PADDING}
				/>
			</Rect>
		);
	}

	// Helper function to create browser viewport
	function createBrowserViewport(
		color: string,
		title: string,
		imageSrc: string,
		viewportRef: Reference<Rect>,
		titleRef: Reference<Txt>,
		imageRef: Reference<Img>
	) {
		return (
			<Rect
				ref={viewportRef}
				fill={colors.background}
				stroke={color}
				lineWidth={BORDER_WIDTH}
				radius={8}
			>
				{/* Title bar */}
				<Rect
					width={() => viewportRef().width()}
					height={TITLE_HEIGHT}
					y={() => -viewportRef().height() / 2 + TITLE_HEIGHT / 2}
					fill={color}
					radius={[8, 8, 0, 0]}
				>
					<Txt
						ref={titleRef}
						text={title}
						fill={colors.text}
						fontSize={16}
						fontWeight={600}
						fontFamily="'JetBrains Mono', monospace"
					/>
				</Rect>

				{/* Browser content (image) */}
				<Img
					ref={imageRef}
					src={imageSrc}
					y={() => TITLE_HEIGHT / 2}
					width={() => viewportRef().width() - PADDING * 2}
					height={() => viewportRef().height() - TITLE_HEIGHT - PADDING}
					radius={4}
					// Maintain aspect ratio while fitting container
					scale={() => {
						const containerWidth = viewportRef().width() - PADDING * 2;
						const containerHeight = viewportRef().height() - TITLE_HEIGHT - PADDING;
						const imageAspect = imageRef().naturalSize().width / imageRef().naturalSize().height;
						const containerAspect = containerWidth / containerHeight;

						if (imageAspect > containerAspect) {
							// Image is wider - fit to width
							return containerWidth / imageRef().naturalSize().width;
						} else {
							// Image is taller - fit to height
							return containerHeight / imageRef().naturalSize().height;
						}
					}}
				/>
			</Rect>
		);
	}

	// Initial content
	const initialHtmlCode = `<!DOCTYPE html>
<html>
<head>
  <title>Example</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>`;

	const initialCssCode = `body {
  font-family: Arial;
  margin: 0;
  padding: 20px;
}

h1 {
  color: #333;
}`;

	// Create the three viewports
	view.add(createCodeViewport(
		colors.html,
		'HTML',
		initialHtmlCode,
		'html',
		htmlViewport,
		htmlTitle,
		htmlCode
	));

	view.add(createCodeViewport(
		colors.css,
		'CSS',
		initialCssCode,
		'css',
		cssViewport,
		cssTitle,
		cssCode
	));

	// Note: Replace with your actual image paths
	view.add(createBrowserViewport(
		colors.browser,
		'Browser Preview',
		exampleImage, // Replace with your image
		browserViewport,
		browserTitle,
		browserImage
	));

	// Helper function to animate to a specific layout
	function* animateToLayout(layoutName: keyof typeof layouts, duration: number = 1) {
		const layout = layouts[layoutName];

		yield* all(
			// Animate HTML viewport
			htmlViewport().position([layout.html.x, layout.html.y], duration, easeInOutCubic),
			htmlViewport().size([layout.html.width, layout.html.height], duration, easeInOutCubic),

			// Animate CSS viewport
			cssViewport().position([layout.css.x, layout.css.y], duration, easeInOutCubic),
			cssViewport().size([layout.css.width, layout.css.height], duration, easeInOutCubic),

			// Animate Browser viewport
			browserViewport().position([layout.browser.x, layout.browser.y], duration, easeInOutCubic),
			browserViewport().size([layout.browser.width, layout.browser.height], duration, easeInOutCubic),
		);
	}

	// Helper function to update code content with animation
	function* updateCode(
		codeRef: Reference<Code>,
		newCode: string,
		duration: number = 0.5
	) {
		yield* tween(duration, value => {
			const progress = easeInOutCubic(value);
			if (progress > 0.5) {
				codeRef().code(newCode);
			}
		});
	}

	// Helper function to change browser image with fade animation
	function* changeBrowserImage(
		newImageSrc: string,
		duration: number = 0.5
	) {
		// Fade out
		yield* browserImage().opacity(0, duration / 2, easeInOutCubic);

		// Change image source
		browserImage().src(newImageSrc);

		// Fade in
		yield* browserImage().opacity(1, duration / 2, easeInOutCubic);
	}

	// Combined function to change layout and browser image simultaneously
	function* changeLayoutWithImage(
		layoutName: keyof typeof layouts,
		newImageSrc?: string,
		newHtmlCode?: string,
		newCssCode?: string,
		duration: number = 1
	) {
		const tasks = [animateToLayout(layoutName, duration)];

		// Add image transition if new image provided
		if (newImageSrc) {
			tasks.push(changeBrowserImage(newImageSrc, duration));
		}

		// Add code updates if provided
		if (newHtmlCode) {
			tasks.push(updateCode(htmlCode, newHtmlCode, duration * 0.5));
		}

		if (newCssCode) {
			tasks.push(updateCode(cssCode, newCssCode, duration * 0.5));
		}

		yield* all(...tasks);
	}

	// Initialize with the initial layout
	yield* animateToLayout('initial', 0);

	// Wait a moment
	yield* waitFor(1);

	// Example animation sequence demonstrating the system

	// 1. Add more HTML content and switch to large HTML layout with new browser image
	const complexHtmlCode = `<!DOCTYPE html>
<html>
<head>
  <title>Complex Example</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <section id="hero">
      <h1>Welcome to Our Site</h1>
      <p>This is a complex webpage example.</p>
      <button>Get Started</button>
    </section>
    
    <section id="features">
      <div class="feature">
        <h3>Feature 1</h3>
        <p>Description of feature 1</p>
      </div>
      <div class="feature">
        <h3>Feature 2</h3>
        <p>Description of feature 2</p>
      </div>
    </section>
  </main>
  
  <footer>
    <p>&copy; 2024 Example Site</p>
  </footer>
</body>
</html>`;

	yield* changeLayoutWithImage(
		'largeHtml',
		exampleImage, // New browser image
		complexHtmlCode
	);

	yield* waitFor(2);

	// 2. Switch to large CSS layout with updated CSS and corresponding browser image
	const complexCssCode = `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Arial", sans-serif;
  line-height: 1.6;
  color: #333;
}

header {
  background: #2c3e50;
  color: white;
  padding: 1rem;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 2rem;
}

nav a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

nav a:hover {
  color: #3498db;
}

#hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

#hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature {
  padding: 2rem;
  border: 1px solid #ddd;
  margin: 1rem;
  border-radius: 8px;
}

footer {
  background: #34495e;
  color: white;
  text-align: center;
  padding: 2rem;
}`;

	yield* changeLayoutWithImage(
		'largeCss',
		exampleImage, // Styled version
		undefined, // No HTML change
		complexCssCode
	);

	yield* waitFor(2);

	// 3. Switch to large browser layout showing final result
	yield* changeLayoutWithImage(
		'largeBrowser',
		exampleImage // Final rendered page
	);

	yield* waitFor(2);

	// 4. Return to initial layout with original simple content
	yield* changeLayoutWithImage(
		'initial',
		exampleImage, // Back to simple
		initialHtmlCode,
		initialCssCode
	);

	yield* waitFor(1);
});

// Additional utility functions for advanced usage

// Function to create a custom layout configuration
