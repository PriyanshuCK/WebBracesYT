import { LineProps, Line } from "@motion-canvas/2d";
import colors, { colorPalettes } from "../lib/colors";
import { spaceY } from "../lib/space";
import {
  Color,
  createSignal,
  easeInOutCubic,
  SimpleSignal,
  tween,
  Vector2,
} from "@motion-canvas/core";

export class Cursor extends Line {
  private colorSignal: SimpleSignal<keyof typeof colors>;

  constructor({
    color = colorPalettes[
      Math.floor(Math.random() * colorPalettes.length)
    ] as keyof typeof colors,
    ...props
  }: LineProps & { color?: keyof typeof colors;}) {
    super({
      lineWidth: 4,
      closed: true,
      lineJoin: "round",
      zIndex: 5,
      points: [0,
        [0, 45],
        Vector2.fromDegrees(67.5).scale((45 / 4) * 3),
        Vector2.fromDegrees(45).scale(45),],
      ...props,
    });

    this.colorSignal = createSignal(color);

    const currentColor = colors[this.colorSignal()][500];
    this.stroke(currentColor);
    this.fill(new Color(currentColor).alpha(0.1));
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
      this.fill(interpolatedColor.alpha(0.1));
    });

    this.colorSignal(newColor);
  }

}
