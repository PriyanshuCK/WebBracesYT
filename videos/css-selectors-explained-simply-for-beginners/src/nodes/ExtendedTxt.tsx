import { Txt, TxtProps } from "@motion-canvas/2d";
import { Color, createSignal, SimpleSignal } from "@motion-canvas/core";
import colors, { colorPalettes } from "../lib/colors";
import { spaceY } from "../lib/space";

export class ExtendedTxt extends Txt {
  private colorSignal: SimpleSignal<keyof typeof colors>;
  private coloredSignal: SimpleSignal<boolean>;

  constructor({
    color = colorPalettes[
      Math.floor(Math.random() * colorPalettes.length)
    ] as keyof typeof colors,
    colored = false,
    ...props
  }: TxtProps & { color?: keyof typeof colors; colored?: boolean }) {
    super({
      fill: colored ? colors[color][500] : colors.slate[0],
      fontSize: spaceY["0.33"],
      fontWeight: 400,
      text: "",
      ...props,
    });

    this.colorSignal = createSignal(color);
    this.coloredSignal = createSignal(colored);

    const currentColor = colors[this.colorSignal()][500];
    this.coloredSignal() && this.fill(new Color(currentColor));
  }
}
