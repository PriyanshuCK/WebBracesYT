import { Camera, Img, Layout, makeScene2D, Polygon } from "@motion-canvas/2d";
import {
  all,
  createRef,
  createRefMap,
  delay,
  fadeTransition,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { Grid } from "../nodes";
import colors from "../lib/colors";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import one from "../images/1ip.png";
import two from "../images/2dns.png";
import three from "../images/3packets.png";
import four from "../images/4protocols.png";
import five from "../images/5blocks.png";

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  view.add(<>{/* <Grid /> */}</>);

  
  const camera = createRef<Camera>();
  const hexs = createRefMap<Polygon>();
  const images = createRefMap<Img>();
  
  view.add(
    <>
      <Camera ref={camera}>
        <Polygon
          ref={hexs.one}
          clip
          sides={6}
          size={spaceY[4]}
          stroke={colors.slate[0]}
          lineWidth={4}
          position={[-168.25, spaceNY[1.5]-12.25]}
          >
          <Img
            ref={images.one}
            src={one}
            scale={0.175}
            position={[spaceNX[1.25], spaceNY["0.25"]]}
            />
        </Polygon>
        <Polygon
          ref={hexs.two}
          clip
          sides={6}
          size={spaceY[4]}
          stroke={colors.slate[0]}
          lineWidth={4}
          position={[168.25, spaceNY[1.5]-12.25]}
          >
          <Img
            ref={images.two}
            src={two}
            scale={0.175}
            position={[spaceNX[1.75], spaceNY[0.25]]}
            />
        </Polygon>
        <Polygon
          ref={hexs.three}
          clip
          sides={6}
          size={spaceY[4]}
          stroke={colors.slate[0]}
          lineWidth={4}
          position={[spaceNX[3.25]-24.5, spaceY[1.5]+12.25]}
          >
          <Img ref={images.five} src={five} scale={0.175} />
        </Polygon>
        <Polygon
          ref={hexs.four}
          clip
          sides={6}
          size={spaceY[4]}
          stroke={colors.slate[0]}
          lineWidth={4}
          position={[spaceX[0], spaceY[1.5]+12.25]}
          >
          <Img
            ref={images.four}
            src={four}
            scale={0.175}
            position={[spaceX[0], spaceY["0.33"]]}
            />
        </Polygon>
        <Polygon
          ref={hexs.five}
          clip
          sides={6}
          size={spaceY[4]}
          stroke={colors.slate[0]}
          lineWidth={4}
          position={[spaceX[3.25]+24.5, spaceY[1.5]+12.25]}
          >
          <Img ref={images.three} src={three} scale={0.175} />
          </Polygon>
      </Camera>
    </>
  );
  
  camera().zoom(3);
  camera().position(hexs.one().position());
  yield* fadeTransition(2);
  
  yield* all(
    hexs.one().stroke(colors.sky[500], 1),
    delay(1.25, camera().centerOn(hexs.two(), 1)),
    delay(1.25, hexs.two().stroke(colors.sky[500], 1)),
    delay(1.25, hexs.one().stroke(colors.slate[0], 1)),
    delay(2.5, camera().centerOn(hexs.five(), 1)),
    delay(2.25, hexs.five().stroke(colors.sky[500], 1)),
    delay(2.25, hexs.two().stroke(colors.slate[0], 1)),
    delay(3.75, camera().centerOn(hexs.four(), 1)),
    delay(3, hexs.four().stroke(colors.sky[500], 1)),
    delay(3, hexs.five().stroke(colors.slate[0], 1)),
    delay(4, hexs.three().stroke(colors.sky[500], 1)),
    delay(4, hexs.four().stroke(colors.slate[0], 1)),
    delay(5, hexs.three().stroke(colors.slate[0], 1)),
    delay(1.75, camera().zoom(1.75, 3.5)),
    delay(5.25, camera().reset(6)),
  );

  yield* waitUntil("sceneEnd");
});
