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

	// Color scheme
	const colors = {
		html: '#E34F26',      // HTML orange
		css: '#1572B6',       // CSS blue  
		browser: '#4CAF50',   // Green for browser
		background: '#2D2D2D', // Dark background
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

	const htmlContent: Reference<Txt> = createRef<Txt>();
	const cssContent: Reference<Txt> = createRef<Txt>();
	const browserContent: Reference<Txt> = createRef<Txt>();

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

	// Helper function to create viewport
	function createViewport(
		color: string,
		title: string,
		content: string = '',
		ref: Reference<Rect>,
		titleRef: Reference<Txt>,
		contentRef: Reference<Txt>
	) {
		return (
			<Rect
				ref={ref}
				fill={colors.background}
				stroke={color}
				lineWidth={BORDER_WIDTH}
				radius={8}
			>
				{/* Title bar */}
				<Rect
					width={() => ref().width()}
					height={40}
					y={() => -ref().height() / 2 + 20}
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

				{/* Content area */}
				<Txt
					ref={contentRef}
					text={content}
					fill={colors.text}
					fontSize={14}
					fontFamily="'JetBrains Mono', monospace"
					y={20}
					textAlign="left"
					textWrap={true}
					width={() => ref().width() - 40}
					height={() => ref().height() - 80}
				/>
			</Rect>
		);
	}

	// Create the three viewports
	view.add(createViewport(
		colors.html,
		'HTML',
		'<!DOCTYPE html>\n<html>\n<head>\n  <title>Example</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>',
		htmlViewport,
		htmlTitle,
		htmlContent
	));

	view.add(createViewport(
		colors.css,
		'CSS',
		'body {\n  font-family: Arial;\n  margin: 0;\n  padding: 20px;\n}\n\nh1 {\n  color: #333;\n}',
		cssViewport,
		cssTitle,
		cssContent
	));

	view.add(createViewport(
		colors.browser,
		'Browser Preview',
		'[Screenshot of rendered webpage would appear here]',
		browserViewport,
		browserTitle,
		browserContent
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

	// Helper function to update content with animation
	function* updateContent(
		contentRef: Reference<Txt>,
		newContent: string,
		duration: number = 0.5
	) {
		yield* tween(duration, value => {
			const progress = easeInOutCubic(value);
			if (progress > 0.5) {
				contentRef().text(newContent);
			}
		});
	}

	// Initialize with the initial layout
	yield* animateToLayout('initial', 0);

	// Wait a moment
	yield* waitFor(1);

	// Example animation sequence - you can modify this as needed

	// 1. Add more HTML content and switch to large HTML layout
	yield* all(
		updateContent(
			htmlContent,
			'<!DOCTYPE html>\n<html>\n<head>\n  <title>Complex Example</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <header>\n    <nav>\n      <ul>\n        <li><a href="#home">Home</a></li>\n        <li><a href="#about">About</a></li>\n        <li><a href="#contact">Contact</a></li>\n      </ul>\n    </nav>\n  </header>\n  \n  <main>\n    <section id="hero">\n      <h1>Welcome to Our Site</h1>\n      <p>This is a complex webpage example.</p>\n      <button>Get Started</button>\n    </section>\n    \n    <section id="features">\n      <div class="feature">\n        <h3>Feature 1</h3>\n        <p>Description of feature 1</p>\n      </div>\n      <div class="feature">\n        <h3>Feature 2</h3>\n        <p>Description of feature 2</p>\n      </div>\n    </section>\n  </main>\n  \n  <footer>\n    <p>&copy; 2024 Example Site</p>\n  </footer>\n</body>\n</html>',
			0.5
		),
		animateToLayout('largeHtml', 1)
	);

	yield* waitFor(2);

	// 2. Switch to large CSS layout
	yield* all(
		updateContent(
			cssContent,
			'* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: "Arial", sans-serif;\n  line-height: 1.6;\n  color: #333;\n}\n\nheader {\n  background: #2c3e50;\n  color: white;\n  padding: 1rem;\n}\n\nnav ul {\n  list-style: none;\n  display: flex;\n  gap: 2rem;\n}\n\nnav a {\n  color: white;\n  text-decoration: none;\n  transition: color 0.3s;\n}\n\nnav a:hover {\n  color: #3498db;\n}\n\n#hero {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  padding: 4rem 2rem;\n  text-align: center;\n}\n\n#hero h1 {\n  font-size: 3rem;\n  margin-bottom: 1rem;\n}\n\n.feature {\n  padding: 2rem;\n  border: 1px solid #ddd;\n  margin: 1rem;\n  border-radius: 8px;\n}\n\nfooter {\n  background: #34495e;\n  color: white;\n  text-align: center;\n  padding: 2rem;\n}',
			0.5
		),
		animateToLayout('largeCss', 1)
	);

	yield* waitFor(2);

	// 3. Switch to large browser layout
	yield* all(
		updateContent(
			browserContent,
			'[Rendered webpage screenshot]\n\n🌐 Browser Preview:\n\n┌─ Navigation Bar ─────────────┐\n│ Home  About  Contact        │\n└─────────────────────────────┘\n\n┌─ Hero Section ──────────────┐\n│                             │\n│     Welcome to Our Site     │\n│                             │\n│  This is a complex webpage  │\n│         example.            │\n│                             │\n│      [Get Started]          │\n│                             │\n└─────────────────────────────┘\n\n┌─ Features ──────────────────┐\n│  ┌─ Feature 1 ─┐ ┌─ Feature 2 ─┐ │\n│  │Description  │ │Description  │ │\n│  │of feature 1 │ │of feature 2 │ │\n│  └─────────────┘ └─────────────┘ │\n└─────────────────────────────────┘\n\n┌─ Footer ────────────────────┐\n│    © 2024 Example Site      │\n└─────────────────────────────┘',
			0.5
		),
		animateToLayout('largeBrowser', 1)
	);

	yield* waitFor(2);

	// 4. Return to initial layout
	yield* animateToLayout('initial', 1);

	yield* waitFor(1);
});

// Additional utility functions you can use in your scenes:

// Function to create a custom layout configuration
export function createCustomLayout(
	htmlRatio: number,    // 0-1, portion of screen for HTML
	cssRatio: number,     // 0-1, portion of screen for CSS  
	browserRatio: number, // 0-1, portion of screen for browser
	orientation: 'horizontal' | 'vertical' | 'mixed' = 'mixed'
) {
	const SCREEN_WIDTH = 1920;
	const SCREEN_HEIGHT = 1080;
	const PADDING = 20;

	// Normalize ratios
	const total = htmlRatio + cssRatio + browserRatio;
	const normalizedHtml = htmlRatio / total;
	const normalizedCss = cssRatio / total;
	const normalizedBrowser = browserRatio / total;

	if (orientation === 'horizontal') {
		// All viewports side by side
		const htmlWidth = SCREEN_WIDTH * normalizedHtml - PADDING;
		const cssWidth = SCREEN_WIDTH * normalizedCss - PADDING;
		const browserWidth = SCREEN_WIDTH * normalizedBrowser - PADDING;

		return {
			html: {
				x: -SCREEN_WIDTH / 2 + htmlWidth / 2 + PADDING / 2,
				y: 0,
				width: htmlWidth,
				height: SCREEN_HEIGHT - PADDING * 2
			},
			css: {
				x: -SCREEN_WIDTH / 2 + htmlWidth + cssWidth / 2 + PADDING * 1.5,
				y: 0,
				width: cssWidth,
				height: SCREEN_HEIGHT - PADDING * 2
			},
			browser: {
				x: SCREEN_WIDTH / 2 - browserWidth / 2 - PADDING / 2,
				y: 0,
				width: browserWidth,
				height: SCREEN_HEIGHT - PADDING * 2
			}
		};
	} else if (orientation === 'vertical') {
		// All viewports stacked vertically
		const htmlHeight = SCREEN_HEIGHT * normalizedHtml - PADDING;
		const cssHeight = SCREEN_HEIGHT * normalizedCss - PADDING;
		const browserHeight = SCREEN_HEIGHT * normalizedBrowser - PADDING;

		return {
			html: {
				x: 0,
				y: -SCREEN_HEIGHT / 2 + htmlHeight / 2 + PADDING / 2,
				width: SCREEN_WIDTH - PADDING * 2,
				height: htmlHeight
			},
			css: {
				x: 0,
				y: -SCREEN_HEIGHT / 2 + htmlHeight + cssHeight / 2 + PADDING * 1.5,
				width: SCREEN_WIDTH - PADDING * 2,
				height: cssHeight
			},
			browser: {
				x: 0,
				y: SCREEN_HEIGHT / 2 - browserHeight / 2 - PADDING / 2,
				width: SCREEN_WIDTH - PADDING * 2,
				height: browserHeight
			}
		};
	} else {
		// Mixed layout - largest viewport gets priority
		if (normalizedHtml >= normalizedCss && normalizedHtml >= normalizedBrowser) {
			// HTML is largest - give it full height on left
			return {
				html: {
					x: -SCREEN_WIDTH / 4,
					y: 0,
					width: SCREEN_WIDTH / 2 - PADDING,
					height: SCREEN_HEIGHT - PADDING * 2
				},
				css: {
					x: SCREEN_WIDTH / 4,
					y: -SCREEN_HEIGHT * (normalizedCss / (normalizedCss + normalizedBrowser)) / 2,
					width: SCREEN_WIDTH / 2 - PADDING,
					height: SCREEN_HEIGHT * (normalizedCss / (normalizedCss + normalizedBrowser)) - PADDING
				},
				browser: {
					x: SCREEN_WIDTH / 4,
					y: SCREEN_HEIGHT * (normalizedBrowser / (normalizedCss + normalizedBrowser)) / 2,
					width: SCREEN_WIDTH / 2 - PADDING,
					height: SCREEN_HEIGHT * (normalizedBrowser / (normalizedCss + normalizedBrowser)) - PADDING
				}
			};
		} else if (normalizedCss >= normalizedBrowser) {
			// CSS is largest
			return {
				css: {
					x: -SCREEN_WIDTH / 4,
					y: 0,
					width: SCREEN_WIDTH / 2 - PADDING,
					height: SCREEN_HEIGHT - PADDING * 2
				},
				html: {
					x: SCREEN_WIDTH / 4,
					y: -SCREEN_HEIGHT * (normalizedHtml / (normalizedHtml + normalizedBrowser)) / 2,
					width: SCREEN_WIDTH / 2 - PADDING,
					height: SCREEN_HEIGHT * (normalizedHtml / (normalizedHtml + normalizedBrowser)) - PADDING
				},
				browser: {
					x: SCREEN_WIDTH / 4,
					y: SCREEN_HEIGHT * (normalizedBrowser / (normalizedHtml + normalizedBrowser)) / 2,
					width: SCREEN_WIDTH / 2 - PADDING,
					height: SCREEN_HEIGHT * (normalizedBrowser / (normalizedHtml + normalizedBrowser)) - PADDING
				}
			};
		} else {
			// Browser is largest
			return {
				browser: {
					x: SCREEN_WIDTH / 4,
					y: 0,
					width: SCREEN_WIDTH / 2 - PADDING,
					height: SCREEN_HEIGHT - PADDING * 2
				},
				html: {
					x: -SCREEN_WIDTH / 4,
					y: -SCREEN_HEIGHT * (normalizedHtml / (normalizedHtml + normalizedCss)) / 2,
					width: SCREEN_WIDTH / 2 - PADDING,
					height: SCREEN_HEIGHT * (normalizedHtml / (normalizedHtml + normalizedCss)) - PADDING
				},
				css: {
					x: -SCREEN_WIDTH / 4,
					y: SCREEN_HEIGHT * (normalizedCss / (normalizedHtml + normalizedCss)) / 2,
					width: SCREEN_WIDTH / 2 - PADDING,
					height: SCREEN_HEIGHT * (normalizedCss / (normalizedHtml + normalizedCss)) - PADDING
				}
			};
		}
	}
}

// Function to animate to a custom layout
export function* animateToCustomLayout(
	htmlViewport: Reference<Rect>,
	cssViewport: Reference<Rect>,
	browserViewport: Reference<Rect>,
	layout: ReturnType<typeof createCustomLayout>,
	duration: number = 1
) {
	yield* all(
		htmlViewport().position([layout.html.x, layout.html.y], duration, easeInOutCubic),
		htmlViewport().size([layout.html.width, layout.html.height], duration, easeInOutCubic),

		cssViewport().position([layout.css.x, layout.css.y], duration, easeInOutCubic),
		cssViewport().size([layout.css.width, layout.css.height], duration, easeInOutCubic),

		browserViewport().position([layout.browser.x, layout.browser.y], duration, easeInOutCubic),
		browserViewport().size([layout.browser.width, layout.browser.height], duration, easeInOutCubic),
	);
}
