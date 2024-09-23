import { Img, Layout, makeScene2D, Path, SVG } from "@motion-canvas/2d";
import {
  all,
  chain,
  createRef,
  delay,
  fadeTransition,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { ExtendedFillSVG, Grid } from "../nodes";
import colors from "../lib/colors";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import { spaceY } from "../lib/space";
import { Title } from "../lib/svgs";

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  //   view.add(<><Grid /></>);

  yield* fadeTransition(1);
  const theGreatest = createRef<ExtendedTxt>();
  const infoEngine = createRef<ExtendedTxt>();
  const ever = createRef<ExtendedTxt>();

  view.add(
    <>
      <Layout
        layout
        direction={"column"}
        gap={spaceY["0.33"]}
        alignItems={"center"}
      >
        <ExtendedTxt
          ref={theGreatest}
          opacity={0}
          fontSize={spaceY[0.75]}
          fontWeight={600}
          text={"The Greatest"}
        />
        <ExtendedTxt
          ref={infoEngine}
          opacity={0}
          fontSize={spaceY[0.75]}
          fontWeight={600}
          text={"Information Engine"}
        />
        <ExtendedTxt
          ref={ever}
          opacity={0}
          fontSize={spaceY[0.75]}
          fontWeight={600}
          text={"Ever Built"}
        />
      </Layout>
    </>
  );
  yield* waitUntil("theGreatest");
  yield* all(
    theGreatest().opacity(1, 1),
    delay(0.5, infoEngine().opacity(1, 1)),
    delay(1, ever().opacity(1, 1))
  );
  yield* all(
    theGreatest().opacity(0, 1),
    infoEngine().opacity(0, 1),
    ever().opacity(0, 1)
    );
    
  const titleSVG = createRef<SVG>();
    view.add(<SVG ref={titleSVG} svg={Title} />);
    
  const paths = titleSVG().wrapper.children() as Path[];
  for (const path of paths) {
    path.stroke(path.fill()).lineWidth(2).end(0);
    path.fill(null);
  }

  yield* all(
    ...paths.map((path, index) => delay(0.05 * index, path.end(1, 1.5)))
  );
  yield* all(
    ...paths.flatMap((path) => [
      path.fill(path.stroke(), 1),
      path.lineWidth(0, 1),
    ])
  );
  yield* waitUntil("sceneEnd");
});
