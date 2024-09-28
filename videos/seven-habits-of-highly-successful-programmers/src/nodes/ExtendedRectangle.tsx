import { Rect, RectProps } from "@motion-canvas/2d";
import colors, { colorPalettes } from "../lib/colors";
import { spaceY } from "../lib/space";
import {
  Color,
  createSignal,
  easeInOutCubic,
  SimpleSignal,
  tween,
} from "@motion-canvas/core";

export class ExtendedRect extends Rect {
  public colorSignal: SimpleSignal<keyof typeof colors>;
  private highlightedSignal: SimpleSignal<boolean>;

  constructor({
    children,
    color = colorPalettes[
    Math.floor(Math.random() * colorPalettes.length)
    ] as keyof typeof colors,
    highlighted = false,
    ...props
  }: RectProps & { color?: keyof typeof colors; highlighted?: boolean }) {
    super({
      lineWidth: 4,
      radius: 12,
      size: spaceY[1],
      lineCap: "round",
      children,
      ...props,
    });

    this.colorSignal = createSignal(color);
    this.highlightedSignal = createSignal(highlighted);
    

    const currentColor = colors[this.colorSignal()][500];
    this.stroke(currentColor);
    this.highlightedSignal() && this.fill(new Color(currentColor).alpha(0.1));
  }

  public *tweenColor(newColor: keyof typeof colors, duration = 1) {
    const oldStrokeColor = new Color(this.stroke().toString());
    const newStrokeColor = colors[newColor][500];

    yield* tween(duration, (value) => {
      const interpolatedColor = Color.lerp(
        oldStrokeColor,
        newStrokeColor,
        easeInOutCubic(value)
      );
      this.stroke(interpolatedColor);
      this.highlightedSignal() && this.fill(interpolatedColor.alpha(0.1));
    });

    this.colorSignal(newColor);
  }

  public *highlight(isHighlighted = !this.highlightedSignal(), duration = 1) {
    if (isHighlighted) {
      yield* this.fill(
        new Color(colors[this.colorSignal()][500]).alpha(0.1),
        duration
      );
      this.highlightedSignal(isHighlighted);
    } else {
      yield* this.fill(null, duration);
    }
  }
}