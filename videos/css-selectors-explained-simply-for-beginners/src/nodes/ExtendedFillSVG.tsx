import { Path, SVG, SVGProps } from "@motion-canvas/2d";
import { all, createSignal, SimpleSignal } from "@motion-canvas/core";
import colors, { colorPalettes } from "../lib/colors";
import { spaceY } from "../lib/space";

export class ExtendedFillSVG extends SVG {
  public colorSignal: SimpleSignal<keyof typeof colors>;
  public white: SimpleSignal<boolean>;

  constructor({
    color = colorPalettes[
      Math.floor(Math.random() * colorPalettes.length)
    ] as keyof typeof colors,
    white,
    ...props
  }: SVGProps & { color?: keyof typeof colors; white?: boolean }) {
    super({
      lineWidth: 2,
      lineCap: "round",
      lineJoin: "round",
      size: spaceY[1],
      ...props,
    });

    this.white = createSignal(white);
    this.colorSignal = createSignal(color);
    this.white()
      ? this.fill(colors.slate[0])
      : this.fill(colors[this.colorSignal()][500]);
    const paths = this.wrapper.children() as Path[];
    for (const path of paths) {
      path.stroke(path.fill()).lineWidth(this.lineWidth()).end(0);
      path.fill(null);
    }
  }
  public *write(duration = 1) {
    const paths = this.wrapper.children() as Path[];
    yield* all(...paths.map((path) => path.end(1, duration)));
    yield* all(
      ...paths.flatMap((path) => [
        path.fill(path.stroke(), duration * 0.75),
        path.lineWidth(0, duration * 0.75),
      ])
    );
  }
}
