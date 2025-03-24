import { Line, Node, NodeProps } from "@motion-canvas/2d";
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

    this.add(
      <>
        {horizontalLines}
        {verticalLines}
      </>
    );
  }
}
