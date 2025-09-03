const BASE_SPACE_UNIT = 96;

function generateSpacing(): Record<string, number> {
  const spacing: Record<string, number> = { "0": 0 };

  const fractions = [0.25, 0.33, 0.5, 0.67, 0.75];
  fractions.forEach((fraction) => {
    spacing[fraction.toString()] = Math.round(BASE_SPACE_UNIT * fraction);
  });

  for (let i = 1; i <= 20; i++) {
    spacing[i.toString()] = BASE_SPACE_UNIT * i;

    fractions.forEach((fraction) => {
      const key = (i + fraction).toString();
      spacing[key] = Math.round(BASE_SPACE_UNIT * (i + fraction));
    });
  }

  return spacing;
}

export const spaceX = generateSpacing();

export const spaceY = (() => {
  const baseSpacing = generateSpacing();
  const aspectRatio = 90 / 96;

  const adjustedSpacing: Record<string, number> = { "0": 0 };
  Object.keys(baseSpacing).forEach((key) => {
    if (key !== "0") {
      adjustedSpacing[key] = Math.round(baseSpacing[key] * aspectRatio);
    }
  });

  return adjustedSpacing;
})();

export const spaceNX = (() => {
  const negativeSpacing: Record<string, number> = {};
  Object.keys(spaceX).forEach((key) => {
    if (key !== "0") {
      negativeSpacing[key] = -spaceX[key];
    }
  });
  return negativeSpacing;
})();

export const spaceNY = (() => {
  const negativeSpacing: Record<string, number> = {};
  Object.keys(spaceY).forEach((key) => {
    if (key !== "0") {
      negativeSpacing[key] = -spaceY[key];
    }
  });
  return negativeSpacing;
})();

export function getSpacing(
  space: string,
  axis: "x" | "y" | "-x" | "-y",
  fallback: number = 0,
): number {
  const spacingMap = {
    x: spaceX,
    y: spaceY,
    "-x": spaceNX,
    "-y": spaceNY,
  };

  return spacingMap[axis][space] ?? fallback;
}

export default spaceX;
