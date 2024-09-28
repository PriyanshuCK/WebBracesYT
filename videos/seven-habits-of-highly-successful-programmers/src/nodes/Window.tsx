import { Layout, Ray, Rect, RectProps } from "@motion-canvas/2d";
import {
  Color,
  createSignal,
  easeInOutCubic,
  makeRef,
  SimpleSignal,
  tween,
} from "@motion-canvas/core";
import colors, { colorPalettes } from "../lib/colors";
import spaceX, { spaceY } from "../lib/space";

export class Window extends Rect {
  public colorSignal: SimpleSignal<keyof typeof colors>;
  private highlightedSignal: SimpleSignal<boolean>;
  public readonly inner: Layout;

  constructor({
    children,
    color = colorPalettes[
      Math.floor(Math.random() * colorPalettes.length)
    ] as keyof typeof colors,
    highlighted = false,
    ...props
  }: RectProps & { color?: keyof typeof colors;highlighted?: boolean }) {
    super({
      layout: true,
      clip: true,
      direction: "column",
      lineWidth: 4,
      radius: 12,
      width: spaceX[6],
      height: spaceY[10],
      strokeFirst: true,
      ...props,
    });

    this.colorSignal = createSignal(color);
    this.highlightedSignal = createSignal(highlighted);

    const currentColor = colors[this.colorSignal()][500];
    this.stroke(currentColor);
    this.highlightedSignal() && this.fill(new Color(currentColor).alpha(0.1));

    this.add(
      <>
        <Rect
          height={spaceY["0.33"]}
          width={"100%"}
          padding={[0, 6]}
          justifyContent={"end"}
          fill={colors[this.colorSignal()][500]}
        >
          <Layout height={"100%"} width={spaceX["0.33"]}>
            <Ray
              layout={false}
              fromX={-8}
              toX={8}
              lineWidth={2}
              stroke={colors[this.colorSignal()][950]}
              lineCap={'round'}
            />
          </Layout>
          <Layout height={"100%"} width={spaceX["0.33"]}>
            <Rect
              layout={false}
              size={12}
                        lineWidth={2}
                        radius={2}
              stroke={colors[this.colorSignal()][950]}
              lineCap={'round'}
            />
          </Layout>
          <Layout height={"100%"} width={spaceX["0.33"]}>
            <Ray
              layout={false}
              from={-7}
              to={7}
              lineWidth={2}
              stroke={colors[this.colorSignal()][950]}
              lineCap={'round'}
            />
            <Ray
              layout={false}
              from={-7}
              to={7}
              lineWidth={2}
              stroke={colors[this.colorSignal()][950]}
              lineCap={'round'}
              rotation={90}
            />
          </Layout>
        </Rect>
        <Layout direction={"column"} size={"100%"} ref={makeRef(this, "inner")}>
          {children}
        </Layout>
      </>
    );
  }
}
