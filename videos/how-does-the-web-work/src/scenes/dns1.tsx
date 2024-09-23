import { Img, Layout, makeScene2D, Txt } from "@motion-canvas/2d";
import { all, createRefMap, easeInCubic, fadeTransition, waitFor, waitUntil } from "@motion-canvas/core";
import { Grid } from "../nodes";
import colors from "../lib/colors";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceY } from "../lib/space";

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  view.add(
    <>
      {/* <Grid /> */}
    </>
  );

  yield* fadeTransition(1);

  const Txts = createRefMap<ExtendedTxt>();
  const Layouts = createRefMap<Layout>();

  view.add(
    <>
      <Layout ref={Layouts.row} layout direction={"row"} gap={spaceX[1.5]}>
        <Layout ref={Layouts.column1} layout opacity={0} direction={"column"} gap={spaceY[0.5]}>
          <ExtendedTxt ref={Txts.website} text={"Website"} fontSize={spaceY["0.33"]} fill={colors.slate[400]} fontWeight={600} />
          <ExtendedTxt ref={Txts.ah} text={"Atomic Habits"}   />
          <ExtendedTxt ref={Txts.am} text={"Amazon"}   />
          <ExtendedTxt ref={Txts.mb} text={"My Blog"}   />
        </Layout>
        <Layout ref={Layouts.column2} layout direction={"column"} gap={spaceY[0.5]}>
          <ExtendedTxt ref={Txts.ip} text={""} fontSize={spaceY["0.33"]} fill={colors.slate[400]} fontWeight={600} />
          <ExtendedTxt ref={Txts.ahip} text={""} />
          <ExtendedTxt ref={Txts.amip} text={""} />
          <ExtendedTxt ref={Txts.mbip} text={""} />
        </Layout>
        <Layout ref={Layouts.column3} layout direction={"column"} gap={spaceY[0.5]}>
          <ExtendedTxt ref={Txts.dn} text={""} fontSize={spaceY["0.33"]} fill={colors.slate[400]} fontWeight={600} />
          <ExtendedTxt ref={Txts.ahdn} text={""} colored color={"orange"} fontWeight={500} />
          <ExtendedTxt ref={Txts.amdn} text={""} colored color={"blue"} fontWeight={500} />
          <ExtendedTxt ref={Txts.mbdn} text={""} colored color={"green"} fontWeight={500} />
        </Layout>
      </Layout>
    </>
  );

  yield* all(
    Layouts.column1().opacity(1, 1),
    Txts.ip().text("IP Address", 1, easeInCubic),
    Txts.ahip().text("172.67.216.166", 1, easeInCubic),
    Txts.amip().text("52.94.236.248", 1, easeInCubic),
    Txts.mbip().text("76.76.21.93", 1, easeInCubic),
  )

  yield* waitUntil("domainName")

  yield* all(
    Txts.dn().text("Domain Name", 1, easeInCubic),
    Txts.ahdn().text("atomichabits.com", 1, easeInCubic),
    Txts.amdn().text("amazon.com", 1, easeInCubic),
    Txts.mbdn().text("priyanshusharma.dev", 1, easeInCubic),
  )

  yield* waitUntil("sceneEnd");
});
