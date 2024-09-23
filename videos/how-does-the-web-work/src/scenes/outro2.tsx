import { Img, makeScene2D, Path } from "@motion-canvas/2d";
import {
  all,
  createRef,
  delay,
  fadeTransition,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { ExtendedCircle, ExtendedFillSVG, Grid } from "../nodes";
import colors from "../lib/colors";
import { BuildingWebsite } from "../lib/svgs";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import { ExtendedTxt } from "../nodes/ExtendedTxt";

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  view.add(
    <>
      {/* <Grid /> */}
    </>
  );

  const braces = '<svg width="576" height="640" viewBox="0 0 576 640" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M185.952 640C147.48 629.133 118.463 611.201 98.9014 586.205C79.5568 561.427 69.8845 528.606 69.8845 487.743V422.863C69.8845 370.046 46.8448 343.637 0.765625 343.637V296.362C46.8448 296.362 69.8845 270.062 69.8845 217.463V149.648C70.3191 109.872 79.9915 77.8121 98.9014 53.4683C118.029 28.9072 147.045 11.0841 185.952 -0.000976562L198.341 37.4927C152.914 52.0555 130.2 89.9839 130.2 151.278V217.136C130.2 266.476 112.051 300.818 75.7531 320.163C112.051 339.725 130.2 374.393 130.2 424.167V491.33C130.853 551.102 153.566 588.161 198.341 602.507L185.952 640Z" fill="#F8FAFC"/><path d="M377.333 602.507C421.456 588.379 444.278 552.406 445.8 494.59V422.863C445.8 372.654 465.47 338.42 504.812 320.163C465.47 302.34 445.8 268.106 445.8 217.463V151.278C445.8 89.9839 423.086 52.0555 377.659 37.4927L390.048 -0.000976562C428.52 10.8668 457.428 28.5812 476.773 53.1423C496.117 77.486 505.898 109.763 506.116 149.974V218.441C506.116 270.388 529.155 296.362 575.235 296.362V343.637C529.155 343.637 506.116 370.046 506.116 422.863V488.721C506.116 529.584 496.226 562.296 476.447 586.857C456.885 611.418 428.085 629.133 390.048 640L377.333 602.507Z" fill="#F8FAFC"/></svg>';

  yield* fadeTransition(1);
  const website = createRef<ExtendedFillSVG>();
  const leftBrace = createRef<Path>();
  const rightBrace = createRef<Path>();
  const circle = createRef<ExtendedCircle>();
  const WebBraces = createRef<ExtendedTxt>()
  const start1 = 0.6;
  const start2 = 0.9;
  view.add(
    <>
      <ExtendedFillSVG
        ref={website}
        svg={BuildingWebsite}
        width={865}
        height={686}
      />
      <Path
        ref={leftBrace}
        lineWidth={4}
        stroke={"white"}
        data="M185.186 640.001C146.715 629.134 117.698 611.202 98.1358 586.206C78.7912 561.428 69.1188 528.607 69.1188 487.744V422.864C69.1188 370.047 46.0792 343.638 0 343.638V296.363C46.0792 296.363 69.1188 270.063 69.1188 217.463V149.649C69.5535 109.873 79.2259 77.813 98.1358 53.4693C117.263 28.9082 146.28 11.0851 185.186 0L197.576 37.4937C152.148 52.0565 129.435 89.9849 129.435 151.279V217.137C129.435 266.477 111.286 300.819 74.9874 320.164C111.286 339.726 129.435 374.394 129.435 424.168V491.331C130.087 551.103 152.8 588.162 197.576 602.508L185.186 640.001Z"
        start={start1}
        end={start1}
        position={[spaceNX[9], spaceNY[3.5]]}
      />
      <Path
        ref={rightBrace}
        lineWidth={4}
        stroke={"white"}
        data="M0.567383 602.508C44.6904 588.38 67.5127 552.407 69.0342 494.591V422.864C69.0342 372.655 88.7047 338.421 128.046 320.164C88.7047 302.341 69.0342 268.107 69.0342 217.463V151.279C69.0342 89.9849 46.3205 52.0565 0.893339 37.4937L13.2827 0C51.7545 10.8677 80.6626 28.5822 100.007 53.1432C119.352 77.487 129.133 109.764 129.35 149.975V218.442C129.35 270.389 152.39 296.363 198.469 296.363V343.638C152.39 343.638 129.35 370.047 129.35 422.864V488.722C129.35 529.585 119.46 562.297 99.6811 586.858C80.1192 611.419 51.3198 629.134 13.2827 640.001L0.567383 602.508Z"
        start={start2}
        end={start2}
        position={[spaceX[7], spaceNY[3.5]]}
      />
      <ExtendedCircle ref={circle} position={[-1, -48.5]} size={spaceY[2]} lineWidth={2} scale={0} />
      <ExtendedTxt ref={WebBraces} fontSize={spaceY["0.5"]} y={spaceY[1.25]}/>
    </>
  );

  yield* all(
    website().write(1.5),
    delay(0.5, leftBrace().start(0, 4)),
    delay(0.5, rightBrace().start(0, 4)),
    delay(0.5, leftBrace().end(1, 4)),
    delay(0.5, rightBrace().end(1, 4))
  );

  circle().stroke(colors.slate[0])

  yield* waitUntil("forAllOfThat");

  yield* all(
    website().scale(0, 2),
    website().y(-48.5, 2),
    leftBrace().scale(0.13, 2),
    rightBrace().scale(0.13, 2),
    leftBrace().position([-46, spaceNY[1]], 2),
    rightBrace().position([18, spaceNY[1]], 2),
    leftBrace().fill(colors.slate[0], 2),
    rightBrace().fill(colors.slate[0], 2),
    leftBrace().lineWidth(0, 2),
    rightBrace().lineWidth(0, 2),
    delay(1.5, circle().scale(1, 1)),
    delay(2.25, WebBraces().text("WebBraces", 2)),
    delay(4.75, WebBraces().opacity(0, 1)),
    delay(4.75, circle().y(0, 1)),
     delay(4.75, leftBrace().y(-41.5, 1)),
     delay(4.75, rightBrace().y(-41.5, 1)),
  );
  yield* waitUntil("sceneEnd");
});
