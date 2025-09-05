import { Rect, Txt, Code, Img, View2D, Node } from '@motion-canvas/2d/lib/components';
import { createRef, Reference } from '@motion-canvas/core/lib/utils';
import { all } from '@motion-canvas/core/lib/flow';
import { easeInOutCubic } from '@motion-canvas/core/lib/tweening';
import colors from '../lib/colors';
import spaceX, { spaceY } from '../lib/space';
import { ExtendedRect } from './ExtendedRectangle';
import { CSSCode, HTMLCode } from './Code';

export interface ViewportConfig {
	borderColor: string;
	backgroundColor: string;
	titleColor: string;
	textColor: string;
	borderWidth: number;
	borderRadius: number;
	titleHeight: number;
	padding: number;
}

export const defaultViewportConfig: ViewportConfig = {
	borderColor: colors.zinc["500"],
	backgroundColor: colors.zinc["950"],
	titleColor: colors.zinc["500"],
	textColor: colors.zinc["100"],
	borderWidth: 1,
	borderRadius: 8,
	titleHeight: 40,
	padding: 16,
};

export type ViewportType = 'html' | 'css' | 'browser';

const VIEWPORT_PRIORITY: Record<ViewportType, number> = {
	html: 1,
	css: 2,
	browser: 3
};

export interface ViewportLayout {
	x: number;
	y: number;
	width: number;
	height: number;
}

export type DynamicLayoutConfig = Record<ViewportType, ViewportLayout>;

export interface CodeViewportComponent {
	component: Node;
	viewport: Reference<Rect>;
	code: Reference<Code>;
	title: Reference<Txt>;
	type: 'html' | 'css';
}

export interface BrowserViewportComponent {
	component: Node;
	viewport: Reference<Rect>;
	image: Reference<Img>;
	title: Reference<Txt>;
	changeImage: (src: string, duration?: number) => Generator<any, void, unknown>;
	type: 'browser';
}

export type AnyViewportComponent = CodeViewportComponent | BrowserViewportComponent;

export function createCodeViewport(
	title: string,
	language: 'html' | 'css',
	initialCode: string = '',
	config: ViewportConfig = defaultViewportConfig,
	fontSize: number = 14
): CodeViewportComponent {
	const viewportRef = createRef<Rect>();
	const titleRef = createRef<Txt>();
	const codeRef = createRef<Code>();

	const viewport = (
		<ExtendedRect
			ref={viewportRef}
			lineWidth={config.borderWidth}
			color={"slate"}
			radius={config.borderRadius}
			opacity={1}
			layout
			direction={"row-reverse"}
			padding={config.padding}
		>
			<ExtendedRect
				height={config.titleHeight}
				width={70}
				layout
				justifyContent={"center"}
				alignItems={"center"}
				color={"slate"}
				lineWidth={1}
				opacity={0.6}
			>
				<Txt
					ref={titleRef}
					text={title}
					fill={config.textColor}
					fontSize={12}
					fontFamily="'SF Pro Display', 'Segoe UI', system-ui, sans-serif"
				/>
			</ExtendedRect >
			{language === 'html' ? (
				<HTMLCode
					ref={codeRef}
					code={initialCode}
					grow={1}
					fontSize={fontSize * 1.5}
				/>
			) : (
				<CSSCode
					ref={codeRef}
					code={initialCode}
					grow={1}
					fontSize={fontSize * 1.5}
				/>
			)}
		</ExtendedRect>
	);

	return {
		component: viewport,
		viewport: viewportRef,
		code: codeRef,
		title: titleRef,
		type: language
	};
}

export function createBrowserViewport(
	title: string,
	initialImageSrc: string = '',
	config: ViewportConfig = defaultViewportConfig
): BrowserViewportComponent {
	const viewportRef: Reference<Rect> = createRef<Rect>();
	const titleRef: Reference<Txt> = createRef<Txt>();
	const imageRef: Reference<Img> = createRef<Img>();

	const viewport = (
		<Rect
			ref={viewportRef}
			fill={config.backgroundColor}
			stroke={config.borderColor}
			lineWidth={config.borderWidth}
			radius={config.borderRadius}
			opacity={1}
		>
			<Rect
				width={() => viewportRef().width()}
				height={config.titleHeight}
				y={() => -viewportRef().height() / 2 + config.titleHeight / 2}
				fill={config.titleColor}
				radius={[config.borderRadius, config.borderRadius, 0, 0]}
			>
				<Txt
					ref={titleRef}
					text={title}
					fill={config.textColor}
					fontSize={16}
					fontWeight={600}
					fontFamily="'SF Pro Display', 'Segoe UI', system-ui, sans-serif"
				/>
			</Rect>

			<Img
				ref={imageRef}
				src={initialImageSrc}
				y={() => config.titleHeight / 2}
				width={() => viewportRef().width() - config.padding * 2}
				height={() => viewportRef().height() - config.titleHeight - config.padding * 2}
				radius={4}
				scale={() => {
					if (!imageRef().naturalSize) return 1;

					const containerWidth = viewportRef().width() - config.padding * 2;
					const containerHeight = viewportRef().height() - config.titleHeight - config.padding * 2;
					const imageAspect = imageRef().naturalSize().width / imageRef().naturalSize().height;
					const containerAspect = containerWidth / containerHeight;

					if (imageAspect > containerAspect) {
						return containerWidth / imageRef().naturalSize().width;
					} else {
						return containerHeight / imageRef().naturalSize().height;
					}
				}}
			/>
		</Rect>
	);

	const changeImage = function*(newImageSrc: string, duration: number = 0.6) {
		yield* imageRef().opacity(0, duration / 2, easeInOutCubic);
		imageRef().src(newImageSrc);
		yield* imageRef().opacity(1, duration / 2, easeInOutCubic);
	};

	return {
		component: viewport,
		viewport: viewportRef,
		image: imageRef,
		title: titleRef,
		changeImage,
		type: 'browser'
	};
}

abstract class LayoutStrategy {
	constructor(
		protected screenWidth: number,
		protected screenHeight: number,
		protected padding: number
	) { }

	abstract calculateLayout(activeViewports: ViewportType[]): DynamicLayoutConfig;

	protected get availableWidth() {
		return this.screenWidth - this.padding * 2;
	}

	protected get availableHeight() {
		return this.screenHeight - this.padding * 2;
	}

	protected get halfWidth() {
		return this.screenWidth / 2 - this.padding / 2;
	}

	protected get fullHeight() {
		return this.screenHeight;
	}
}

class SingleViewportStrategy extends LayoutStrategy {
	calculateLayout(activeViewports: ViewportType[]): DynamicLayoutConfig {
		const [viewport] = activeViewports;
		const layout = {} as DynamicLayoutConfig;

		layout[viewport] = {
			x: 0, // Centered
			y: 0,
			width: this.screenWidth / 2,
			height: this.fullHeight
		};

		return layout;
	}
}

class DualViewportStrategy extends LayoutStrategy {
	calculateLayout(activeViewports: ViewportType[]): DynamicLayoutConfig {
		const sortedViewports = this.sortViewportsByPriority(activeViewports);
		const [first, second] = sortedViewports;
		const layout = {} as DynamicLayoutConfig;

		layout[first] = {
			x: -this.halfWidth / 2 - this.padding / 2,
			y: 0,
			width: this.halfWidth,
			height: this.fullHeight
		};

		layout[second] = {
			x: this.halfWidth / 2 + this.padding / 2,
			y: 0,
			width: this.halfWidth,
			height: this.fullHeight
		};

		return layout;
	}

	private sortViewportsByPriority(viewports: ViewportType[]): ViewportType[] {
		return viewports.sort((a, b) => VIEWPORT_PRIORITY[a] - VIEWPORT_PRIORITY[b]);
	}
}

class TripleViewportStrategy extends LayoutStrategy {
	calculateLayout(activeViewports: ViewportType[], ratios?: Record<ViewportType, number>): DynamicLayoutConfig {
		const defaultRatios: Record<ViewportType, number> = { html: 1, css: 1, browser: 2 };
		const finalRatios = ratios || defaultRatios;

		const activeRatios = activeViewports.reduce((acc, type) => {
			acc[type] = finalRatios[type] || 1;
			return acc;
		}, {} as Record<ViewportType, number>);

		const total = Object.values(activeRatios).reduce((sum, ratio) => sum + ratio, 0);
		Object.keys(activeRatios).forEach(key => {
			activeRatios[key as ViewportType] = activeRatios[key as ViewportType] / total;
		});

		return this.createRatioBasedLayout(activeRatios);
	}

	private createRatioBasedLayout(ratios: Record<ViewportType, number>): DynamicLayoutConfig {
		const layout = {} as DynamicLayoutConfig;
		const halfWidth = this.halfWidth;
		const fullHeight = this.fullHeight;

		const sortedByRatio = Object.entries(ratios)
			.sort(([, a], [, b]) => b - a)
			.map(([type]) => type as ViewportType);

		const [primary, ...secondary] = sortedByRatio;

		layout[primary] = {
			x: -halfWidth / 2 - this.padding / 2,
			y: 0,
			width: halfWidth,
			height: fullHeight
		};

		const sortedSecondary = secondary.sort((a, b) => VIEWPORT_PRIORITY[a] - VIEWPORT_PRIORITY[b]);

		if (sortedSecondary.length === 1) {
			layout[sortedSecondary[0]] = {
				x: halfWidth / 2 + this.padding / 2,
				y: 0,
				width: halfWidth,
				height: fullHeight
			};
		} else if (sortedSecondary.length === 2) {
			const [second, third] = sortedSecondary;
			const secondRatio = ratios[second] / (ratios[second] + ratios[third]);
			const thirdRatio = ratios[third] / (ratios[second] + ratios[third]);

			layout[second] = {
				x: halfWidth / 2 + this.padding / 2,
				y: fullHeight / 2 - (fullHeight - this.padding) * secondRatio / 2,
				width: halfWidth,
				height: (fullHeight - this.padding) * secondRatio
			};

			layout[third] = {
				x: halfWidth / 2 + this.padding / 2,
				y: -fullHeight / 2 + (fullHeight - this.padding) * thirdRatio / 2,
				width: halfWidth,
				height: (fullHeight - this.padding) * thirdRatio
			};
		}

		return layout;
	}

}

class HorizontalLayoutStrategy extends LayoutStrategy {
	calculateLayout(activeViewports: ViewportType[], ratios?: Record<ViewportType, number>): DynamicLayoutConfig {
		const sortedViewports = this.sortViewportsByPriority(activeViewports);
		const layout = {} as DynamicLayoutConfig;

		const defaultRatios: Record<ViewportType, number> = { html: 1, css: 1, browser: 1 };
		const finalRatios = ratios || defaultRatios;

		const activeRatios = sortedViewports.reduce((acc, type) => {
			acc[type] = finalRatios[type] || 1;
			return acc;
		}, {} as Record<ViewportType, number>);

		const total = Object.values(activeRatios).reduce((sum, ratio) => sum + ratio, 0);
		Object.keys(activeRatios).forEach(key => {
			activeRatios[key as ViewportType] = activeRatios[key as ViewportType] / total;
		});

		const screenWidth = this.screenWidth - this.padding * 2;
		let currentX = -this.screenWidth / 2;

		sortedViewports.forEach((type, index) => {
			const width = screenWidth * activeRatios[type];
			const x = currentX + width / 2;

			layout[type] = {
				x,
				y: 0,
				width,
				height: this.fullHeight
			};

			currentX += width + (index < sortedViewports.length - 1 ? this.padding : 0);
		});

		return layout;
	}

	private sortViewportsByPriority(viewports: ViewportType[]): ViewportType[] {
		return viewports.sort((a, b) => VIEWPORT_PRIORITY[a] - VIEWPORT_PRIORITY[b]);
	}
}

class VerticalLayoutStrategy extends LayoutStrategy {
	calculateLayout(activeViewports: ViewportType[], ratios?: Record<ViewportType, number>): DynamicLayoutConfig {
		const sortedViewports = this.sortViewportsByPriority(activeViewports);
		const layout = {} as DynamicLayoutConfig;

		const defaultRatios: Record<ViewportType, number> = { html: 1, css: 1, browser: 1 };
		const finalRatios = ratios || defaultRatios;

		const activeRatios = sortedViewports.reduce((acc, type) => {
			acc[type] = finalRatios[type] || 1;
			return acc;
		}, {} as Record<ViewportType, number>);

		const total = Object.values(activeRatios).reduce((sum, ratio) => sum + ratio, 0);
		Object.keys(activeRatios).forEach(key => {
			activeRatios[key as ViewportType] = activeRatios[key as ViewportType] / total;
		});

		const screenHeight = this.screenHeight - this.padding * 2;
		let currentY = -this.screenHeight / 2;

		sortedViewports.forEach((type, index) => {
			const height = screenHeight * activeRatios[type];
			const y = currentY + height / 2;

			layout[type] = {
				x: 0,
				y,
				width: this.screenWidth,
				height
			};

			currentY += height + (index < sortedViewports.length - 1 ? this.padding : 0);
		});

		return layout;
	}

	private sortViewportsByPriority(viewports: ViewportType[]): ViewportType[] {
		return viewports.sort((a, b) => VIEWPORT_PRIORITY[a] - VIEWPORT_PRIORITY[b]);
	}
}

export class LayoutManager {
	private strategies: Map<string, LayoutStrategy>;

	constructor(
		private screenWidth: number,
		private screenHeight: number,
		private padding: number
	) {
		this.strategies = new Map([
			['single', new SingleViewportStrategy(screenWidth, screenHeight, padding)],
			['dual', new DualViewportStrategy(screenWidth, screenHeight, padding)],
			['triple', new TripleViewportStrategy(screenWidth, screenHeight, padding)],
			['horizontal', new HorizontalLayoutStrategy(screenWidth, screenHeight, padding)],
			['vertical', new VerticalLayoutStrategy(screenWidth, screenHeight, padding)]
		]);
	}

	calculateLayout(activeViewports: ViewportType[]): DynamicLayoutConfig {
		const count = activeViewports.length;
		let strategyKey: string;

		switch (count) {
			case 1: strategyKey = 'single'; break;
			case 2: strategyKey = 'dual'; break;
			case 3: strategyKey = 'triple'; break;
			default: throw new Error(`Unsupported viewport count: ${count}`);
		}

		const strategy = this.strategies.get(strategyKey);
		if (!strategy) {
			throw new Error(`No layout strategy for key: ${strategyKey}`);
		}

		return strategy.calculateLayout(activeViewports);
	}

	getPresetLayouts(): Record<string, DynamicLayoutConfig> {
		const tripleStrategy = this.strategies.get('triple') as TripleViewportStrategy;
		const horizontalStrategy = this.strategies.get('horizontal') as HorizontalLayoutStrategy;
		const verticalStrategy = this.strategies.get('vertical') as VerticalLayoutStrategy;

		return {
			'H_EQ': tripleStrategy.calculateLayout(['html', 'css', 'browser'], { html: 2, css: 1, browser: 1 }),

			'H_B2': tripleStrategy.calculateLayout(['html', 'css', 'browser'], { html: 3, css: 1, browser: 2 }),

			'C_EQ': tripleStrategy.calculateLayout(['html', 'css', 'browser'], { html: 1, css: 2, browser: 1 }),

			'C_B2': tripleStrategy.calculateLayout(['html', 'css', 'browser'], { html: 1, css: 3, browser: 2 }),

			'B_EQ': tripleStrategy.calculateLayout(['html', 'css', 'browser'], { html: 1, css: 1, browser: 2 }),

			'EQ_H': horizontalStrategy.calculateLayout(['html', 'css', 'browser'], { html: 1, css: 1, browser: 1 }),

			'EQ_V': verticalStrategy.calculateLayout(['html', 'css', 'browser'], { html: 1, css: 1, browser: 1 }),
		};
	}

	calculateLayoutWithRatios(
		activeViewports: ViewportType[],
		ratios: Record<ViewportType, number>,
		orientation: 'smart' | 'horizontal' | 'vertical' = 'smart'
	): DynamicLayoutConfig {
		let strategyKey: string;

		if (orientation === 'horizontal') {
			strategyKey = 'horizontal';
		} else if (orientation === 'vertical') {
			strategyKey = 'vertical';
		} else {
			switch (activeViewports.length) {
				case 1: strategyKey = 'single'; break;
				case 2: strategyKey = 'dual'; break;
				case 3: strategyKey = 'triple'; break;
				default: throw new Error(`Unsupported viewport count: ${activeViewports.length}`);
			}
		}

		const strategy = this.strategies.get(strategyKey);
		if (!strategy) {
			throw new Error(`No layout strategy for key: ${strategyKey}`);
		}

		if (strategyKey === 'triple' || strategyKey === 'horizontal' || strategyKey === 'vertical') {
			return (strategy as any).calculateLayout(activeViewports, ratios);
		}

		return strategy.calculateLayout(activeViewports);
	}
}

interface ViewportManagerOptions {
	htmlConfig?: ViewportConfig;
	cssConfig?: ViewportConfig;
	browserConfig?: ViewportConfig;
	screenWidth?: number;
	screenHeight?: number;
	padding?: number;
}

export class ViewportManager {
	private layoutManager: LayoutManager;
	private viewports: Map<ViewportType, AnyViewportComponent> = new Map();
	private activeViewports: Set<ViewportType> = new Set();

	private htmlConfig: ViewportConfig;
	private cssConfig: ViewportConfig;
	private browserConfig: ViewportConfig;

	constructor({
		htmlConfig = defaultViewportConfig,
		cssConfig = defaultViewportConfig,
		browserConfig = defaultViewportConfig,
		screenWidth = spaceX[18],
		screenHeight = spaceY[10],
		padding = 20
	}: ViewportManagerOptions = {}) {
		this.htmlConfig = htmlConfig;
		this.cssConfig = cssConfig;
		this.browserConfig = browserConfig;

		this.layoutManager = new LayoutManager(screenWidth, screenHeight, padding);
	}

	addHtml(initialCode: string = '', fontSize: number = 14): this {
		if (!this.viewports.has('html')) {
			const viewport = createCodeViewport('HTML', 'html', initialCode, this.htmlConfig, fontSize);
			this.viewports.set('html', viewport);
			this.activeViewports.add('html');
		}
		return this;
	}

	addCss(initialCode: string = '', fontSize: number = 14): this {
		if (!this.viewports.has('css')) {
			const viewport = createCodeViewport('CSS', 'css', initialCode, this.cssConfig, fontSize);
			this.viewports.set('css', viewport);
			this.activeViewports.add('css');
		}
		return this;
	}

	addBrowser(initialImage: string = ''): this {
		if (!this.viewports.has('browser')) {
			const viewport = createBrowserViewport('Browser Preview', initialImage, this.browserConfig);
			this.viewports.set('browser', viewport);
			this.activeViewports.add('browser');
		}
		return this;
	}

	removeViewport(type: ViewportType): this {
		this.activeViewports.delete(type);
		return this;
	}

	showViewport(type: ViewportType): this {
		if (this.viewports.has(type)) {
			this.activeViewports.add(type);
		}
		return this;
	}

	getComponents(): Node[] {
		return Array.from(this.viewports.values()).map(v => v.component);
	}

	getActiveComponents(): Node[] {
		return Array.from(this.activeViewports)
			.map(type => this.viewports.get(type))
			.filter(Boolean)
			.map(v => v!.component);
	}

	addToView(view: View2D): void {
		this.getComponents().forEach(component => view.add(component));
	}

	getViewportRefs() {
		const refs: any = {};

		this.viewports.forEach((viewport, type) => {
			if (type === 'browser') {
				const browserViewport = viewport as BrowserViewportComponent;
				refs[type] = {
					viewport: browserViewport.viewport,
					title: browserViewport.title,
					image: browserViewport.image,
					changeImage: browserViewport.changeImage
				};
			} else {
				const codeViewport = viewport as CodeViewportComponent;
				refs[type] = {
					viewport: codeViewport.viewport,
					title: codeViewport.title,
					code: codeViewport.code
				};
			}
		});

		return refs;
	}

	getActiveViewportTypes(): ViewportType[] {
		return this.getSortedActiveViewports();
	}

	private getSortedActiveViewports(): ViewportType[] {
		return Array.from(this.activeViewports).sort((a, b) => VIEWPORT_PRIORITY[a] - VIEWPORT_PRIORITY[b]);
	}

	animateToLayout = function*(
		this: ViewportManager,
		options: {
			duration?: number;
			browserImage?: string;
			hideInactive?: boolean;
		} = {}
	) {
		const { duration = 1, browserImage, hideInactive = true } = options;

		const activeTypes = this.getSortedActiveViewports();
		if (activeTypes.length === 0) {
			console.warn('No active viewports to animate');
			return;
		}

		const layout = this.layoutManager.calculateLayout(activeTypes);

		const animations = [];

		for (const type of activeTypes) {
			const viewport = this.viewports.get(type);
			if (viewport) {
				const targetLayout = layout[type];
				animations.push(
					all(
						viewport.viewport().position([targetLayout.x, targetLayout.y], duration, easeInOutCubic),
						viewport.viewport().size([targetLayout.width, targetLayout.height], duration, easeInOutCubic),
						viewport.viewport().opacity(1, duration / 2, easeInOutCubic)
					)
				);
			}
		}

		if (hideInactive) {
			this.viewports.forEach((viewport, type) => {
				if (!this.activeViewports.has(type)) {
					animations.push(viewport.viewport().opacity(0, duration / 2, easeInOutCubic));
				}
			});
		}

		if (browserImage && this.activeViewports.has('browser')) {
			const browserViewport = this.viewports.get('browser') as BrowserViewportComponent;
			animations.push(browserViewport.changeImage(browserImage, duration * 0.8));
		}

		yield* all(...animations);
	};

	animateToPresetLayout = function*(
		this: ViewportManager,
		presetName: string,
		options: {
			duration?: number;
			browserImage?: string;
		} = {}
	) {
		const { duration = 1, browserImage } = options;

		const presetLayouts = this.layoutManager.getPresetLayouts();
		const layout = presetLayouts[presetName];

		if (!layout) {
			throw new Error(`Preset layout "${presetName}" not found.`);
		}

		this.activeViewports.add('html');
		this.activeViewports.add('css');
		this.activeViewports.add('browser');

		const animations = [];

		(['html', 'css', 'browser'] as ViewportType[]).forEach(type => {
			const viewport = this.viewports.get(type);
			if (viewport) {
				const targetLayout = layout[type];
				animations.push(
					all(
						viewport.viewport().position([targetLayout.x, targetLayout.y], duration, easeInOutCubic),
						viewport.viewport().size([targetLayout.width, targetLayout.height], duration, easeInOutCubic),
						viewport.viewport().opacity(1, duration / 2, easeInOutCubic)
					)
				);
			}
		});

		if (browserImage) {
			const browserViewport = this.viewports.get('browser') as BrowserViewportComponent;
			if (browserViewport) {
				animations.push(browserViewport.changeImage(browserImage, duration * 0.8));
			}
		}

		yield* all(...animations);
	};

	animateToLayoutWithRatios = function*(
		this: ViewportManager,
		ratios: Record<ViewportType, number>,
		options: {
			orientation?: 'smart' | 'horizontal' | 'vertical';
			duration?: number;
			browserImage?: string;
			hideInactive?: boolean;
		} = {}
	) {
		const {
			orientation = 'smart',
			duration = 1,
			browserImage,
			hideInactive = true
		} = options;

		const activeTypes = this.getSortedActiveViewports();
		if (activeTypes.length === 0) {
			console.warn('No active viewports to animate');
			return;
		}

		const layout = this.layoutManager.calculateLayoutWithRatios(activeTypes, ratios, orientation);

		const animations = [];

		for (const type of activeTypes) {
			const viewport = this.viewports.get(type);
			if (viewport) {
				const targetLayout = layout[type];
				animations.push(
					all(
						viewport.viewport().position([targetLayout.x, targetLayout.y], duration, easeInOutCubic),
						viewport.viewport().size([targetLayout.width, targetLayout.height], duration, easeInOutCubic),
						viewport.viewport().opacity(1, duration / 2, easeInOutCubic)
					)
				);
			}
		}

		if (hideInactive) {
			this.viewports.forEach((viewport, type) => {
				if (!this.activeViewports.has(type)) {
					animations.push(viewport.viewport().opacity(0, duration / 2, easeInOutCubic));
				}
			});
		}

		if (browserImage && this.activeViewports.has('browser')) {
			const browserViewport = this.viewports.get('browser') as BrowserViewportComponent;
			animations.push(browserViewport.changeImage(browserImage, duration * 0.8));
		}

		yield* all(...animations);
	};
}
