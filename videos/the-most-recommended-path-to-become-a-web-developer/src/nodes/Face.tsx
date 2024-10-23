import { Circle, CircleProps } from "@motion-canvas/2d";
import { ExtendedCircle } from "./ExtendedCircle";
import colors, { colorPalettes } from "../lib/colors";
import { Color, createSignal, SimpleSignal } from "@motion-canvas/core";
import { ExtendedRect } from "./ExtendedRectangle";
import { spaceY } from "../lib/space";

export class Face extends ExtendedCircle {
  constructor({
    children,
    ...props
  }: CircleProps & { color?: keyof typeof colors; highlighted?: boolean }) {
    super({
      layout: true,
      justifyContent: "center",
      clip: true,
      ...props,
    });
    this.add(
      <>
        <Circle
          fill={colors[this.colorSignal()][700]}
          stroke={colors[this.colorSignal()][500]}
          lineWidth={3}
          marginRight={(spaceY["0.5"] / 5) * this.height() * 0.01}
          marginTop={this.height() * (1 / 4)}
          height={this.height() * (8 / 45)}
          width={this.width() * (8 / 45)}
        />
        <Circle
          stroke={colors[this.colorSignal()][500]}
          lineWidth={3}
          marginLeft={(spaceY["0.5"] / 5) * this.height() * 0.01}
          marginTop={this.height() * (1 / 4)}
          height={this.height() * (8 / 45)}
          width={this.width() * (8 / 45)}
          fill={colors[this.colorSignal()][700]}
        />
      </>
    );
  }
}
