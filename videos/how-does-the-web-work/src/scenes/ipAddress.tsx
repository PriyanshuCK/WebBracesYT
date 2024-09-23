import { Camera, Img, Layout, makeScene2D, SVG, Txt } from "@motion-canvas/2d";
import {
  all,
  createRef,
  createRefMap,
  delay,
  easeInCubic,
  fadeTransition,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { ExtendedRect, ExtendedStrokeSVG, Grid } from "../nodes";
import colors from "../lib/colors";
import { Computer, Library } from "../lib/svgs";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  view.add(<>
    {/* <Grid /> */}
  </>);

  const librarySVGRef = createRef<SVG>();
  const TxtRefs = createRefMap<Txt>();
  const ExtendedRectRefs = createRefMap<ExtendedRect>();
  const LayoutRefs = createRefMap<Layout>();
  const computerSVGRef = createRef<ExtendedStrokeSVG>();

  view.add(
    <>
      <Layout ref={LayoutRefs.library}>
        <SVG
          ref={librarySVGRef}
          svg={Library}
          size={spaceY[1.25]}
          position={[spaceX[5.5], spaceNY[0.67]]}
          stroke={colors.emerald[500]}
          lineWidth={1}
        />
        <Txt
          ref={TxtRefs.library}
          fontSize={spaceY[0.5]}
          fill={colors.slate[0]}
          fontWeight={600}
          text={""}
          y={spaceY["0.75"]}
        />
        <Txt
          ref={TxtRefs.libAddress}
          fontSize={spaceY[0.33]}
          fill={colors.slate[0]}
          fontWeight={500}
          text={"Central Library, JLN Marg,\nJaipur, Rajasthan, 302017"}
          y={spaceY[2.25]}
          opacity={0}
        />
        <ExtendedRect
          ref={ExtendedRectRefs.library}
          position={[spaceX[0], spaceY["2.25"]]}
          width={spaceX[4.25]}
          height={spaceY[1.5]}
          highlighted
          end={0}
          opacity={0}
          color="emerald"
        />
      </Layout>
      <Layout ref={LayoutRefs.computer} opacity={0}>
        <ExtendedStrokeSVG
          ref={computerSVGRef}
          svg={Computer}
          size={spaceY["2"]}
          lineWidth={1.25}
          position={[spaceX[0], spaceNY[0.67]]}
        />
        <Txt
          ref={TxtRefs.computer}
          fontSize={spaceY[0.5]}
          fill={colors.slate[0]}
          fontWeight={600}
          text={"Computer"}
          y={spaceY["0.75"]}
        />
        <Txt
          ref={TxtRefs.ipAddress}
          fontSize={spaceY[0.5]}
          fill={colors.slate[0]}
          fontWeight={600}
          text={""}
          y={spaceY["3"]}
        />
        <Txt
          ref={TxtRefs.compAddress}
          fontSize={spaceY[0.33]}
          fill={colors.slate[0]}
          fontWeight={600}
          text={""}
          y={spaceY[2.25]}
        />
        <ExtendedRect
          ref={ExtendedRectRefs.computer}
          position={[spaceX[0], spaceY["2.25"]]}
          width={spaceX[3]}
          height={spaceY[1.25]}
          highlighted
          end={0}
          opacity={0}
          color="rose"
        />
      </Layout>
    </>
  );
  computerSVGRef().stroke(colors.rose[500]);
  yield* all(
    librarySVGRef().size(spaceY[2], 1),
    librarySVGRef().position([spaceX[0], spaceNY[0.75]], 1),
    TxtRefs.library().text("Library", 1, easeInCubic)
  );
  yield* all(
    TxtRefs.libAddress().opacity(1, 1),
    delay(0.25, ExtendedRectRefs.library().opacity(1, 1)),
    delay(0.25, ExtendedRectRefs.library().end(1, 1))
  );

  yield* all(
    LayoutRefs.library().x(spaceNX[3.5], 1),
    ExtendedRectRefs.library().opacity(0, 1),
    LayoutRefs.computer().opacity(1, 1),
    LayoutRefs.computer().x(spaceX[3.5], 1),
    delay(0.75, computerSVGRef().write())
  );
  yield* waitUntil("digits");
  yield* all(
    TxtRefs.compAddress().text("8.9.8.112", 1, easeInCubic),
    delay(0.25, ExtendedRectRefs.computer().opacity(1, 1)),
    delay(0.25, ExtendedRectRefs.computer().end(1, 1))
  );
  yield* waitUntil("IPAddress");
  yield* all(
    TxtRefs.ipAddress().text("IP Address", 1, easeInCubic),
    ExtendedRectRefs.computer().height(spaceY[2], 1),
    ExtendedRectRefs.computer().y(spaceY[2.67], 1)
  );
  yield* waitUntil("typeInAddress");
});
