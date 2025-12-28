import { Line, Node, NodeProps, Txt, Layout } from "@motion-canvas/2d";
import colors from "../lib/colors";
import { range } from "@motion-canvas/core";

export class Grid extends Node {
  public constructor(props?: NodeProps) {
    super({
      ...props,
    });

    const width = 1920;
    const height = 1080;
    const columns = 20;
    const rows = 12;

    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const cellWidth = width / columns;
    const cellHeight = height / rows;

    const verticalLines = range(columns - 1).map((i) => {
      const x = (i + 1) * cellWidth - halfWidth;
      return (
        <Line
          points={[
            [x, -halfHeight + cellHeight],
            [x, halfHeight - cellHeight],
          ]}
          stroke={colors.slate[700]}
          opacity={0.8}
          radius={20}
          lineWidth={1}
        />
      );
    });

    const horizontalLines = range(rows - 1).map((i) => {
      const y = (i + 1) * cellHeight - halfHeight;
      return (
        <Line
          points={[
            [-halfWidth + cellWidth, y],
            [halfWidth - cellWidth, y],
          ]}
          stroke={colors.slate[700]}
          lineWidth={1}
          opacity={0.8}
          radius={20}
        />
      );
    });

    const xLabels = range(columns + 1).map((i) => {
      const x = i * cellWidth - halfWidth;
      let spaceValue = "";

      if (i === 10) {
        spaceValue = "0";
      } else if (i >= 1 && i <= 9) {
        spaceValue = `${i - 10}`;
      } else if (i >= 11 && i <= 19) {
        spaceValue = `${i - 10}`;
      }

      if (spaceValue === "") return null;

      return (
        <Layout
          key={`x-label-${i}`}
          position={[x, -halfHeight + cellHeight / 2]}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Txt
            text={spaceValue}
            fill={colors.slate[500]}
            fontSize={12}
            fontFamily={"'Cascadia Code', Consolas, 'Courier New', Monospace"}
            opacity={0.7}
          />
        </Layout>
      );
    }).filter(Boolean);

    const yLabels = range(rows + 1).map((i) => {
      const y = i * cellHeight - halfHeight;
      let spaceValue = "";

      if (i === 6) {
        spaceValue = "0";
      } else if (i >= 1 && i <= 5) {
        spaceValue = `${6 - i}`;
      } else if (i >= 7 && i <= 11) {
        spaceValue = `-${i - 6}`;
      }

      if (spaceValue === "") return null;

      return (
        <Layout
          key={`y-label-${i}`}
          position={[-halfWidth + cellWidth / 2, y]}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Txt
            text={spaceValue}
            fill={colors.slate[500]}
            fontSize={12}
            fontFamily={"'Cascadia Code', Consolas, 'Courier New', Monospace"}
            opacity={0.7}
          />
        </Layout>
      );
    }).filter(Boolean);





    this.add(
      <>
        {horizontalLines}
        {verticalLines}
        {xLabels}
        {yLabels}
      </>
    );
  }
}
