import {
  Circle,
  Icon,
  Img,
  makeScene2D,
  Node,
  Path,
  Polygon,
  Ray,
  Rect,
  Spline,
  Video,
} from "@motion-canvas/2d";
import {
  all,
  any,
  createRef,
  createRefMap,
  createSignal,
  delay,
  easeInOutBounce,
  easeOutBounce,
  linear,
  makeRef,
  range,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import colors from "../lib/colors";
import { ExtendedCircle, ExtendedRect, Grid } from "../nodes";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import manTyping from "../videos/man-typing.mp4";
import tut1 from "../images/tut1.png";
import tut2 from "../images/tut2.png";
import tut3 from "../images/tut3.png";
import tut4 from "../images/tut4.png";
import tut5 from "../images/tut5.png";
import code1 from "../images/otherCode1.png";
import code2 from "../images/otherCode2.png";
import code3 from "../images/otherCode3.png";

export default makeScene2D(function* (view) {
  view.fontFamily("Geist");
  // view.add(
  //   <>
  //     <Grid />
  //   </>
  // );

  const colors500 = [
    "#ef4444", // red-500
    "#f97316", // orange-500
    "#f59e0b", // amber-500
    "#eab308", // yellow-500
    "#84cc16", // lime-500
    "#22c55e", // green-500
    "#10b981", // emerald-500
    "#14b8a6", // teal-500
    "#06b6d4", // cyan-500
    "#0ea5e9", // sky-500
    "#3b82f6", // blue-500
    "#6366f1", // indigo-500
    "#8b5cf6", // violet-500
    "#a855f7", // purple-500
    "#d946ef", // fuchsia-500
    "#ec4899", // pink-500
    "#f43f5e", // rose-500
  ];
  const colors700 = [
    "#b91c1c", // red
    "#c2410c", // orange
    "#b45309", // amber
    "#a16207", // yellow
    "#4d7c0f", // lime
    "#15803d", // green
    "#047857", // emerald
    "#0f766e", // teal
    "#0e7490", // cyan
    "#0369a1", // sky
    "#1d4ed8", // blue
    "#4338ca", // indigo
    "#6d28d9", // violet
    "#7e22ce", // purple
    "#a21caf", // fuchsia
    "#be185d", // pink
    "#be123c", // rose
  ];

  const num1 = createRef<Path>();
  const head1 = createRef<ExtendedTxt>();
  const rects = createRefMap<ExtendedRect>();
  const texts = createRefMap<ExtendedTxt>();
  const rays = createRefMap<Ray>();
  const circles = createRefMap<ExtendedCircle>();
  const waterDropRays: Ray[] = [];
  const nodes = createRefMap<Node>();
  const splines = createRefMap<Spline>();
  const videos = createRefMap<Video>();
  const images = createRefMap<Img>();
  const paths = createRefMap<Path>();
  const icons = createRefMap<Icon>();

  view.add(
    <>
      <Path
        ref={num1}
        lineWidth={0.5}
        stroke={colors.orange[500]}
        data={
          "M0.90625 3.625C1.63542 3.39583 2.22917 3.20833 2.6875 3.0625C3.14583 2.89583 3.52083 2.76042 3.8125 2.65625C4.14583 2.53125 4.39583 2.41667 4.5625 2.3125L5.3125 1.9375C5.60417 1.79167 5.97917 1.60417 6.4375 1.375C6.89583 1.125 7.48958 0.8125 8.21875 0.4375C8.05208 1.22917 7.92708 1.97917 7.84375 2.6875C7.78125 3.375 7.72917 3.98958 7.6875 4.53125C7.625 5.15625 7.59375 5.72917 7.59375 6.25C7.57292 6.6875 7.54167 7.27083 7.5 8C7.47917 8.72917 7.44792 9.52083 7.40625 10.375C7.36458 11.2292 7.32292 12.1042 7.28125 13C7.23958 13.8958 7.20833 14.7396 7.1875 15.5312C7.1875 16.3021 7.19792 16.9688 7.21875 17.5312C7.26042 18.0938 7.33333 18.4792 7.4375 18.6875C7.54167 18.9375 7.67708 19.1771 7.84375 19.4062C7.98958 19.6146 8.15625 19.8542 8.34375 20.125C8.55208 20.375 8.80208 20.625 9.09375 20.875C8.61458 20.9792 8.16667 21.0729 7.75 21.1562C7.33333 21.2188 6.96875 21.2708 6.65625 21.3125C6.28125 21.375 5.94792 21.4271 5.65625 21.4688C5.34375 21.4896 4.91667 21.5417 4.375 21.625C3.91667 21.6875 3.33333 21.7708 2.625 21.875C1.91667 21.9583 1.04167 22.0521 0 22.1562C0.541667 21.8229 0.96875 21.5 1.28125 21.1875C1.61458 20.875 1.86458 20.6042 2.03125 20.375C2.21875 20.1042 2.33333 19.8438 2.375 19.5938C2.39583 19.4271 2.42708 18.9792 2.46875 18.25C2.53125 17.5 2.58333 16.625 2.625 15.625C2.6875 14.6042 2.73958 13.5208 2.78125 12.375C2.84375 11.2083 2.88542 10.125 2.90625 9.125C2.92708 8.125 2.9375 7.27083 2.9375 6.5625C2.9375 5.85417 2.90625 5.42708 2.84375 5.28125C2.76042 5.13542 2.63542 4.96875 2.46875 4.78125C2.32292 4.61458 2.125 4.4375 1.875 4.25C1.64583 4.0625 1.32292 3.85417 0.90625 3.625Z"
        }
        scale={10}
        end={0}
        position={[spaceNX["0.5"], spaceNY[1.25]]}
      />
      <ExtendedTxt
        ref={head1}
        text={"Start Developing"}
        opacity={0}
        y={spaceY[2]}
        fontWeight={500}
        fontSize={spaceY[2]}
      />
    </>
  );

  yield* num1().end(1, 1);
  yield* all(head1().opacity(1, 1), head1().y(0, 1));

  yield* waitUntil("imagineStanding");

  view.add(
    <>
      <ExtendedCircle
        ref={circles.you}
        position={[spaceNX[6], spaceNY[0.5]]}
        color="orange"
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.you}
        text={"You"}
        position={() => circles.you().position()}
        opacity={0}
        textAlign={"center"}
      />
      <Node ref={nodes.pool} opacity={0}>
        <Ray
          ref={rays.poolL}
          stroke={colors.slate[500]}
          lineWidth={5}
          fromX={spaceNX[9]}
          toX={spaceNX[5.5]}
          lineCap={"round"}
        />
        <Ray
          ref={rays.poolR}
          stroke={colors.slate[500]}
          lineWidth={5}
          fromX={spaceX[5.5]}
          toX={spaceX[9]}
          lineCap={"round"}
        />
        {range(20).map((i) => (
          <Ray
            ref={makeRef(waterDropRays, i)}
            stroke={colors.blue[500]}
            lineWidth={3}
            fromX={spaceNX[9]}
            toX={spaceX[9]}
            lineCap={"round"}
            lineDash={[4, 15]}
            y={spaceY["0.25"] * (i + 1)}
          />
        ))}
      </Node>
    </>
  );

  yield* all(
    num1().opacity(0, 0.5),
    head1().opacity(0, 0.5),
    nodes.pool().opacity(1, 1),
    circles.you().opacity(1, 1),
    texts.you().opacity(1, 1),
    ...waterDropRays.map((ray, i) =>
      ray.lineDashOffset(spaceNX[1.5] * ((i % 2) + 1), 6.5, linear)
    )
  );

  view.add(
    <>
      <Spline
        ref={splines.journey}
        lineWidth={4}
        stroke={colors.slate[0]}
        points={[
          [spaceNX[6.5], spaceY[5]],
          [spaceNX[4.75], spaceY[4.75]],
          [spaceNX[3.75], spaceY[4]],
          [spaceNX[2.75], spaceY[4.25]],
          [spaceNX[2], spaceY[3.25]],
          [spaceNX[1], spaceY[3.75]],
          [spaceX[1], spaceY[2.5]],
          [spaceX[2.5], spaceY[3]],
          [spaceX[4], spaceY[1]],
          [spaceX[5.25], spaceY[1.25]],
          [spaceX[6.5], spaceY[0]],
        ]}
        opacity={0}
        end={0.1}
      />
      <ExtendedTxt
        ref={texts.yourProJourney}
        text={"Your Programming Journey"}
        fontSize={spaceY[0.5]}
        position={[spaceX[5.5], spaceY[4.75]]}
        opacity={0}
      />
    </>
  );

  yield* all(
    nodes.pool().opacity(0, 0.5),
    splines.journey().opacity(1, 0.5),
    splines.journey().end(1, 3),
    circles.you().y(spaceY[4.5], 2, easeOutBounce),
    delay(1, texts.yourProJourney().opacity(1, 1))
  );

  view.add(
    <>
      <ExtendedTxt
        ref={texts.firstHabit}
        text={"1st habit is simple..."}
        fontWeight={500}
        fontSize={spaceY[1]}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.simple}
        text={"simple"}
        fontWeight={500}
        fontSize={spaceY[1]}
        opacity={0}
        fill={colors.green[500]}
        x={206}
      />
    </>
  );

  yield* waitUntil("theFirstHabit");

  yield* all(
    splines.journey().opacity(0, 0.5),
    circles.you().opacity(0, 0.5),
    texts.you().opacity(0, 0.5),
    texts.yourProJourney().opacity(0, 0.5),
    texts.firstHabit().opacity(1, 1),
    texts.simple().opacity(1, 1)
  );

  yield* waitUntil("startDeveloping");

  yield* all(
    texts.firstHabit().opacity(0, 0.5),
    texts.simple().opacity(0, 0.5)
  );

  view.add(
    <>
      <ExtendedTxt
        ref={texts.startDev}
        fontWeight={500}
        fontSize={spaceY[1]}
        position={[spaceX[0], spaceNY[2.5]]}
      />
      <Video
        ref={videos.manTyping}
        src={manTyping}
        radius={10}
        height={spaceY[4]}
        opacity={0}
        y={spaceY[1]}
        play
      />
    </>
  );

  yield* all(
    texts.startDev().text("Start Developing", 1),
    delay(0.25, videos.manTyping().opacity(1, 1))
  );

  view.add(
    <>
      <Node ref={nodes.tutorials}>
        <Img
          ref={images.tut1}
          src={tut1}
          position={[spaceNX[2], spaceNY[1.5]]}
          opacity={0}
        />
        <Img
          ref={images.tut3}
          src={tut3}
          position={[spaceX[2], spaceNY[1.5]]}
          opacity={0}
        />
        <Img
          ref={images.tut4}
          src={tut4}
          position={[spaceNX[2], spaceY[1.5]]}
          opacity={0}
        />
        <Img
          ref={images.tut5}
          src={tut5}
          position={[spaceX[2], spaceY[1.5]]}
          opacity={0}
        />
        <Img
          ref={images.tut2}
          src={tut2}
          position={[spaceX[0], spaceY[0]]}
          opacity={0}
        />
        <ExtendedTxt
          ref={texts.checkChannels}
          text={
            "*Be sure to check out these amazing channels.\nThey post high-quality content that you'll find really valuable!"
          }
          y={spaceY[4.5]}
          textAlign={"center"}
          fill={colors.slate[300]}
          opacity={0}
        />
      </Node>
    </>
  );

  yield* all(
    texts.startDev().opacity(0, 0.5),
    videos.manTyping().opacity(0, 0.5),
    delay(0.2, images.tut1().opacity(1, 0.5)),
    delay(0.6, images.tut2().opacity(1, 0.5)),
    delay(0.8, images.tut3().opacity(1, 0.5)),
    delay(1, images.tut4().opacity(1, 0.5)),
    delay(0.4, images.tut5().opacity(1, 0.5)),
    delay(0.2, images.tut1().rotation(-15, 0.75)),
    delay(0.8, images.tut3().rotation(15, 0.75)),
    delay(1, images.tut4().rotation(-10, 0.75)),
    delay(0.4, images.tut5().rotation(10, 0.75)),
    delay(1, texts.checkChannels().opacity(1, 0.5))
  );

  videos.manTyping().remove();

  view.add(
    <>
      <ExtendedTxt
        ref={texts.butAtSome}
        text={"but at some point,"}
        fontWeight={500}
        fontSize={spaceY[1]}
        opacity={0}
      />
    </>
  );

  yield* all(
    nodes.tutorials().opacity(0, 0.5),
    texts.butAtSome().opacity(1, 0.5)
  );

  yield* waitUntil("youWillHave");

  view.add(
    <>
      <ExtendedTxt
        ref={texts.youWillHave}
        text={"you'll have to dive in\nand actually build something."}
        fontWeight={500}
        fontSize={spaceY[1]}
        opacity={0}
        textAlign={"center"}
      />
      <ExtendedTxt
        ref={texts.build}
        text={"build something"}
        fontWeight={500}
        fontSize={spaceY[1]}
        fill={colors.orange[500]}
        position={[262.5, 54]}
        opacity={0}
      />
    </>
  );

  yield* all(
    texts.butAtSome().opacity(0, 0.5),
    texts.youWillHave().opacity(1, 0.5),
    texts.build().opacity(1, 0.5)
  );

  circles.you().position([spaceNX[4.5], spaceY[1]]);

  view.add(
    <>
      <ExtendedCircle
        ref={circles.dev}
        size={spaceY[3.5]}
        color="green"
        x={spaceX[4.5]}
        y={spaceY[1]}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.dev}
        text={"Become a\nDeveloper"}
        textAlign={"center"}
        position={() => circles.dev().position()}
        fontSize={spaceY["0.5"]}
        fontWeight={500}
        opacity={0}
      />
      <Ray
        ref={rays.shortcut}
        from={circles.you().right()}
        to={circles.dev().left()}
        lineWidth={4}
        stroke={colors.slate[0]}
        startOffset={spaceX[0.25]}
        endOffset={spaceX["0.25"]}
        endArrow
        arrowSize={20}
        lineCap={"round"}
        lineDash={[5, 20]}
        opacity={0}
      >
        <ExtendedTxt
          text={"Shortcut"}
          x={spaceNX[0.5]}
          y={spaceY["1.5"]}
          fontSize={spaceY["0.5"]}
        />
      </Ray>
      <Ray
        ref={rays.crossL}
        from={[spaceNX[1.5], spaceY[0]]}
        to={[spaceX[0.5], spaceY[2]]}
        stroke={colors.red[500]}
        lineWidth={6}
        lineCap={"round"}
        end={0}
        opacity={0}
      />
      <Ray
        ref={rays.crossR}
        from={[spaceX[0.5], spaceY[0]]}
        to={[spaceNX[1.5], spaceY[2]]}
        stroke={colors.red[500]}
        lineWidth={6}
        lineCap={"round"}
        end={0}
        opacity={0}
      />
      <Spline
        ref={splines.dev}
        lineWidth={4}
        stroke={colors.slate[0]}
        points={[
          circles.you().top(),
          [spaceNX[0.5], spaceNY[1.5]],
          [spaceX[3], spaceY[0]],
        ]}
        startOffset={spaceX["0.25"]}
        endOffset={spaceX["0.25"]}
        endArrow
        arrowSize={20}
        lineCap={"round"}
        lineDash={[5, 20]}
        end={0}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.develop}
        fontSize={spaceY[1]}
        fontWeight={500}
        position={[spaceNX[0.5], spaceNY[2.5]]}
      />
    </>
  );

  yield* waitUntil("theresNoShort");

  yield* all(
    texts.youWillHave().opacity(0, 0.5),
    texts.build().opacity(0, 0.5),
    circles.you().opacity(1, 0.5),
    texts.you().opacity(1, 0.5),
    circles.dev().opacity(1, 0.5),
    texts.dev().opacity(1, 0.5),
    rays.shortcut().opacity(1, 0.5),
    delay(0.25, rays.crossL().end(1, 0.75)),
    delay(0.25, rays.crossL().opacity(1, 0.5)),
    delay(0.75, rays.crossR().end(1, 0.75)),
    delay(0.75, rays.crossR().opacity(1, 0.5))
  );

  yield* all(
    rays.shortcut().opacity(0, 0.5),
    rays.crossL().opacity(0, 0.5),
    rays.crossR().opacity(0, 0.5),
    delay(0.5, splines.dev().end(1, 2)),
    delay(0.5, splines.dev().opacity(1, 0.5))
  );

  yield* waitUntil("develop");
  yield* all(
    texts.develop().text("Develop", 0.75),
    circles.dev().highlight(true, 0.25)
  );

  view.add(
    <>
      <Node ref={nodes.step} position={[spaceNX[2], spaceNY[3]]}>
        <Path
          ref={paths.step1}
          lineWidth={4}
          stroke={colors.slate[0]}
          scale={1.25}
          opacity={0}
          rotation={30}
          data={
            "M155.507 16.1786C155.4 16.1488 155.274 16.1148 155.13 16.0768C154.519 15.9166 153.617 15.6968 152.457 15.4267C150.139 14.8871 146.815 14.1527 142.785 13.302C134.725 11.6008 123.856 9.43725 112.586 7.44058C101.312 5.44337 89.6523 3.61584 80.0058 2.58363C75.1812 2.06738 70.8778 1.75201 67.3866 1.71144C63.8536 1.67038 61.2842 1.91491 59.842 2.4398L59.8395 2.44072C47.3194 6.95984 33.996 19.1295 24.211 33.867C14.4245 48.6068 8.332 65.6819 9.99323 79.8839L9.99345 79.8859C11.3235 91.4527 7.9651 100.705 5.12566 108.527C4.53712 110.148 3.97088 111.708 3.4733 113.215C2.01021 117.644 1.14835 121.556 1.81388 125.315C2.47156 129.029 4.65334 132.751 9.62381 136.718L9.62546 136.72C11.6631 138.353 13.1121 141.022 14.172 144.298C15.2379 147.592 15.948 151.619 16.4258 156.104C17.3814 165.074 17.424 176.051 17.4317 187.001C17.432 187.447 17.4322 187.893 17.4325 188.339C17.4385 198.867 17.4444 209.3 18.2121 217.953C18.6121 222.462 19.2159 226.448 20.1203 229.689C21.0303 232.951 22.2144 235.345 23.6963 236.782C37.5087 250.149 43.9447 260.565 45.4883 272.442C47.0206 284.232 43.6982 297.319 38.4625 315.889L38.4624 315.889C37.7304 318.483 38.2828 321.763 39.5955 325.547C40.7352 328.832 42.3894 332.343 44.074 335.918C44.3183 336.436 44.5632 336.956 44.8072 337.476C46.7171 341.55 48.5761 345.678 49.5457 349.463C50.5117 353.233 50.6522 356.878 48.8549 359.839L48.8521 359.844C46.7581 363.253 46.8515 366.331 48.0602 369.352C49.3026 372.458 51.7079 375.466 54.2674 378.636L54.3865 378.783C56.8614 381.849 59.4605 385.068 60.8992 388.49C62.3921 392.041 62.6568 395.857 60.3751 399.984C52.9632 413.423 55.4836 427.749 61.1269 442.608C63.4736 448.787 66.339 455.007 69.2209 461.261C69.8031 462.525 70.3861 463.79 70.9656 465.057C74.4035 472.572 77.7137 480.126 79.9578 487.606L79.9582 487.608C82.0342 494.561 88.3223 498.512 97.5603 500.443C106.788 502.373 118.674 502.216 131.408 501.181C141.055 500.396 151.124 499.114 160.826 497.878C163.921 497.484 166.978 497.095 169.973 496.728C182.315 495.215 193.627 494.078 201.931 494.614C205.136 494.819 209.725 495.25 215.161 495.761C217.169 495.95 219.292 496.149 221.504 496.352C229.722 497.106 239.194 497.912 248.612 498.403C258.034 498.893 267.38 499.067 275.347 498.562C283.363 498.053 289.815 496.865 293.574 494.741C300.015 491.09 303.986 486.755 306.409 481.884C308.842 476.994 309.752 471.491 309.949 465.448C310.108 460.587 309.805 455.443 309.487 450.028C309.408 448.693 309.328 447.341 309.255 445.973C308.883 439.085 308.66 431.83 309.48 424.39M155.507 16.1786L310.474 424.5M155.507 16.1786L155.57 16.4401L156.382 16.4156C196.381 15.2081 235.228 20.4516 271.966 37.8407M155.507 16.1786L271.966 37.8407M309.48 424.39L310.474 424.5M309.48 424.39C309.48 424.391 309.48 424.392 309.48 424.392L310.474 424.5M309.48 424.39C309.74 421.997 310.877 419.255 312.335 416.428C313.573 414.028 315.091 411.48 316.605 408.939C316.884 408.47 317.163 408.002 317.44 407.535C319.231 404.515 320.946 401.539 322.181 398.774C323.426 395.987 324.123 393.542 324.002 391.561L324.002 391.558C323.774 387.654 323.524 383.819 323.279 380.041C321.357 350.475 319.659 324.359 330.059 295.662M310.474 424.5C310.915 420.445 314.152 415.01 317.46 409.457C321.328 402.963 325.294 396.307 325 391.5C324.771 387.59 324.522 383.753 324.277 379.976C322.356 350.392 320.675 324.49 331 296M330.059 295.662L331 296M330.059 295.662C330.059 295.661 330.06 295.66 330.06 295.659L331 296M330.059 295.662C334.905 282.177 334.929 267.878 334.716 253.319C334.705 252.603 334.694 251.886 334.683 251.169C334.47 237.362 334.253 223.348 338.112 209.921C338.112 209.921 338.112 209.921 338.112 209.92L339.073 210.197C335.256 223.477 335.47 237.352 335.684 251.197C335.919 266.447 336.153 281.66 331 296M272.396 36.9378C235.474 19.4612 196.459 14.2053 156.352 15.416C156.208 14.8214 72.5352 -3.2443 59.5 1.50011L272.396 36.9378ZM272.396 36.9378L271.968 37.8416C271.968 37.8413 271.967 37.841 271.966 37.8407M272.396 36.9378L271.966 37.8407"
          }
        />
        <Path
          ref={paths.step2}
          lineWidth={4}
          stroke={colors.slate[0]}
          scale={0}
          data={
            "M54.979 10.619L54.9797 10.6196C65.2299 19.2548 72.7951 33.7862 76.4366 49.3841C80.0776 64.9799 79.7532 81.4601 74.4296 93.9407C69.1431 106.251 60.6684 113.341 51.3627 115.048C42.0585 116.753 31.6598 113.125 22.4218 103.446L22.4213 103.445C9.43737 89.8595 3.38613 73.0716 1.1195 52.3624C1.15325 51.4632 1.17007 50.4251 1.18851 49.287C1.23626 46.3399 1.29488 42.7222 1.68633 39.1086L1.68642 39.1077C2.14122 34.8767 3.08754 30.6358 4.24624 26.5271C8.03033 13.429 15.6903 5.23481 24.7985 2.38731C33.9036 -0.459218 44.7156 1.9562 54.979 10.619Z"
          }
        />
        <Path
          ref={paths.step3}
          lineWidth={4}
          stroke={colors.slate[0]}
          scale={0}
          data={
            "M152.406 61.1499L152.407 61.1609L152.408 61.1719C153.366 71.63 151.654 80.6797 147.393 88.1691C143.511 94.9539 138.184 98.8668 132.462 99.8975C126.741 100.928 120.443 99.1109 114.546 94.0707L114.543 94.0678C106.771 87.4849 101.439 77.036 99.2417 65.8681C97.045 54.7013 98.0105 42.9538 102.667 33.8113C106.831 25.6792 112.989 21.1919 119.527 20.3401C126.066 19.4881 133.221 22.2421 139.437 29.0789L139.439 29.0817C147.64 38.0322 151.56 48.9586 152.406 61.1499Z"
          }
        />
        <Path
          ref={paths.step4}
          lineWidth={4}
          stroke={colors.slate[0]}
          scale={0}
          data={
            "M176.572 46.4703L176.574 46.4686C180.035 41.6467 184.39 39.1257 188.836 38.7811C193.284 38.4363 197.995 40.2563 202.194 44.4555C208.254 50.5252 211.898 60.0001 212.749 69.8181C213.6 79.6359 211.643 89.619 206.72 96.6838C203.134 101.83 198.628 104.511 194.051 104.864C189.475 105.217 184.634 103.257 180.347 98.7287C173.759 91.762 171.191 83.0306 169.987 73.5359C169.665 63.6898 170.815 54.4544 176.572 46.4703Z"
          }
        />
        <Path
          ref={paths.step5}
          lineWidth={4}
          stroke={colors.slate[0]}
          scale={0}
          data={
            "M224.64 113.22L224.639 113.22C220.93 107.684 219.6 99.8333 220.477 92.1494C221.354 84.4649 224.416 77.1386 229.259 72.623L229.259 72.6229C232.92 69.2086 236.98 67.8116 240.675 68.2582C244.357 68.7033 247.851 71.0012 250.357 75.3325L250.359 75.3357C251.522 77.3285 252.362 79.5291 253.128 81.8431C253.404 82.6792 253.674 83.5425 253.947 84.4154C254.398 85.8544 254.856 87.3192 255.364 88.7303C255.169 99.4181 252.901 108.693 245.484 115.848C241.971 119.212 238.097 120.501 234.493 120.03C230.88 119.558 227.367 117.295 224.64 113.22Z"
          }
        />
        <Path
          ref={paths.step6}
          lineWidth={4}
          stroke={colors.slate[0]}
          scale={0}
          data={
            "M257.424 118.561C258.128 115.86 258.909 113.357 260.087 111.091L260.087 111.09C261.984 107.443 264.863 105.581 267.909 105.286C270.976 104.989 274.383 106.267 277.321 109.254C280.926 112.927 283.21 118.572 283.87 124.489C284.531 130.404 283.552 136.436 280.819 140.865C278.408 144.734 275.203 146.795 272.045 147.084C268.909 147.37 265.59 145.932 262.867 142.327C261.229 140.144 259.976 137.622 258.795 134.892C258.338 133.837 257.885 132.731 257.423 131.605C256.76 129.988 256.079 128.328 255.345 126.709C255.852 124.949 256.282 123.185 256.697 121.482C256.94 120.483 257.179 119.505 257.424 118.561Z"
          }
        />
      </Node>
    </>
  );

  yield* all(
    splines.dev().opacity(0, 0.5),
    circles.dev().scale(0, 0.75),
    circles.you().scale(0, 0.75),
    texts.you().opacity(0, 0.5),
    texts.dev().opacity(0, 0.5),
    texts.develop().opacity(0, 0.5),
    paths.step1().opacity(1, 1),
    paths.step1().rotation(0, 1),
    delay(1, paths.step1().scale(0.75, 0.75))
  );

  yield* waitUntil("whatMatters");
  yield* all(
    delay(1.2, paths.step1().scale(1, 1)),
    delay(1, paths.step2().scale(1, 1)),
    delay(0.8, paths.step3().scale(1, 1)),
    delay(0.6, paths.step4().scale(1, 1)),
    delay(0.4, paths.step5().scale(1, 1)),
    delay(0.2, paths.step6().scale(1, 1)),
    delay(1.2, paths.step1().lineWidth(8, 1)),
    delay(1, paths.step2().lineWidth(8, 1)),
    delay(0.8, paths.step3().lineWidth(8, 1)),
    delay(0.6, paths.step4().lineWidth(8, 1)),
    delay(0.4, paths.step5().lineWidth(8, 1)),
    delay(0.2, paths.step6().lineWidth(8, 1)),
    paths
      .step1()
      .data(
        "M111.175 142.405C111.316 142.393 111.443 142.384 111.554 142.377L111.57 142.44L112.382 142.415C152.381 141.208 191.228 146.451 227.966 163.841C261.231 179.669 286.125 203.776 295.467 241.175C303.342 272.751 302.947 304.844 294.112 335.92C288.113 356.794 280.59 377.2 273.054 397.643C270.53 404.49 268.004 411.342 265.534 418.216C253.858 450.433 247.11 483.506 249.138 518.214L249.139 518.217C249.683 527.127 250.018 536.091 249.072 544.797C245.854 574.002 234.275 598.275 208.252 613.023C192.632 621.849 175.411 621.734 157.931 620.614C141.703 619.567 128.027 614.727 117.316 606.497C106.608 598.27 98.8061 586.612 94.3936 571.833L94.3932 571.832C85.549 542.351 84.4751 513.163 99.5643 485.804C103.754 478.227 108.634 471.054 113.626 463.895C114.326 462.889 115.03 461.884 115.733 460.878C120.034 454.731 124.356 448.554 128.295 442.14L128.298 442.136C128.999 440.981 129.71 439.819 130.425 438.652C136.153 429.303 142.137 419.537 145.092 409.066L145.092 409.065C155.691 371.471 146.434 337.988 118.68 311.13C109.131 301.865 98.5373 293.692 88.0116 285.57C83.7593 282.29 79.518 279.017 75.3612 275.685L75.3595 275.684C55.0869 259.502 41.0865 239.942 37.9779 212.909L37.9777 212.907C34.6182 184.186 46.825 159.729 71.8802 150.686L71.8827 150.685C78.3149 148.344 88.41 146.125 96.9604 144.562C101.226 143.783 105.086 143.17 107.882 142.79C109.283 142.6 110.405 142.47 111.175 142.405Z",
        2
      ),
    nodes.step().scale(0.5, 1),
    nodes.step().position([spaceNX[1], spaceNY[2]], 1)
  );

  view.add(
    <>
      <ExtendedTxt
        ref={texts.startSm}
        y={spaceNY[1.5]}
        fontSize={spaceY[1]}
        fontWeight={500}
      />
      <Icon
        ref={icons.calc}
        icon={"mdi:calculator"}
        color={colors.sky[500]}
        scale={7.5}
        opacity={0}
        y={spaceY[2]}
        x={spaceNX[2]}
      />
      <Icon
        ref={icons.todo}
        icon={"pajamas:todo-done"}
        color={colors.lime[500]}
        scale={7.5}
        opacity={0}
        y={spaceY[2]}
        x={spaceX[0]}
      />
      <Icon
        ref={icons.html}
        icon={"devicon:html5"}
        color={colors.slate[0]}
        scale={7.5}
        opacity={0}
        y={spaceY[2]}
        x={spaceX[2]}
      />
    </>
  );

  yield* all(
    texts.startSm().text("Start Small", 1),
    delay(1, icons.calc().opacity(1, 1)),
    delay(1, icons.calc().y(spaceY[1], 1)),
    delay(2.5, icons.todo().opacity(1, 1)),
    delay(2.5, icons.todo().y(spaceY[1], 1)),
    delay(4, icons.html().opacity(1, 1)),
    delay(4, icons.html().y(spaceY[1], 1)),
    nodes.step().opacity(0, 0.5)
  );

  yield* waitUntil("asYouBuild");

  const circleYouProgress = createSignal(0);
  circles.you().scale(1);
  circles.you().opacity(0);
  circles.you().position([spaceNX[6], spaceY[4.5]]);
  circles
    .you()
    .position(
      () => splines.journey().getPointAtPercentage(circleYouProgress()).position
    );
  circles.you().highlight();
  splines.journey().lineWidth(2);
  splines.journey().end(0.9);

  yield* all(
    texts.startSm().opacity(0, 0.5),
    icons.calc().scale(0, 0.5),
    icons.todo().scale(0, 0.5),
    icons.html().scale(0, 0.5),
    splines.journey().opacity(1, 1),
    circles.you().opacity(1, 1),
    texts.you().opacity(1, 1),
    circleYouProgress(1, 6),
    circles.you().size(spaceY[3], 6),
    texts.you().fontSize(spaceY[0.5], 6),
    texts.you().fontWeight(500, 6),
    circles.you().highlight(),
    delay(3, texts.you().text("Developer", 1)),
    delay(6.5, splines.journey().opacity(0, 0.5)),
    delay(6.5, circles.you().opacity(0, 0.5)),
    delay(6.5, texts.you().opacity(0, 0.5))
  );

  texts.you().text("You");
  texts.you().fontSize(spaceY["0.33"]);
  texts.you().fontWeight(400);
  circles.you().size(spaceY[1]);
  circles.you().position([spaceNX[6], spaceNY["0.5"]]);

  yield* any(
    circles.you().opacity(1, 0.5),
    texts.you().opacity(1, 0.5),
    nodes.pool().opacity(1, 0.5),
    ...waterDropRays.map((ray) => ray.lineDashOffset(spaceX[1.5], 9.5, linear))
  );

  view.add(
    <>
      <ExtendedTxt
        ref={texts.startHere}
        text={"Start here"}
        fontSize={spaceY["0.67"]}
        fontWeight={500}
        position={[spaceNX[4], spaceY["0.5"]]}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.goDeeper}
        text={"Then go deeper"}
        fontSize={spaceY["0.67"]}
        fontWeight={500}
        position={[spaceX[0], spaceY["3"]]}
        opacity={0}
      />
      <ExtendedCircle
        ref={circles.fellow}
        position={[spaceNX["7.25"], spaceNY[0.5]]}
        highlighted
        color="emerald"
        scale={0}
      />
      <ExtendedCircle
        ref={circles.fellowEyeL}
        position={[spaceNX["7.67"], 84]}
        color="emerald"
        size={16}
        scale={0}
        fill={colors.emerald[700]}
        lineWidth={3}
      />
      <ExtendedCircle
        ref={circles.fellowEyeR}
        position={[spaceNX["7.33"], 84]}
        color="emerald"
        size={16}
        scale={0}
        fill={colors.emerald[700]}
        lineWidth={3}
      />
      <ExtendedCircle
        ref={circles.youEyeL}
        position={[spaceNX["7.67"], -96]}
        color="orange"
        size={16}
        scale={0}
        fill={colors.orange[700]}
        lineWidth={3}
      />
      <ExtendedCircle
        ref={circles.youEyeR}
        position={[spaceNX["7.33"], -96]}
        color="orange"
        size={16}
        scale={0}
        fill={colors.orange[700]}
        lineWidth={3}
      />
    </>
  );

  yield* all(
    delay(1, texts.startHere().opacity(1, 1)),
    delay(3.5, texts.goDeeper().opacity(1, 1)),
    delay(5.5, texts.startHere().opacity(0, 1)),
    delay(5.5, texts.goDeeper().opacity(0, 1))
  );

  yield* waitUntil("teamUp");

  yield* all(circles.fellow().scale(1, 0.75));

  yield* waitFor(1);

  yield* all(
    nodes.pool().opacity(0, 1),
    circles.you().position([spaceNX[7.5], spaceNY["1"]], 1),
    circles.fellow().position([spaceNX[7.5], spaceY["1"]], 1),
    texts.you().opacity(0, 1),
    delay(0.5, circles.fellowEyeL().scale(1, 0.5)),
    delay(0.5, circles.fellowEyeR().scale(1, 0.5)),
    delay(0.5, circles.youEyeL().scale(1, 0.5)),
    delay(0.5, circles.youEyeR().scale(1, 0.5))
  );

  const bugIcons: Icon[] = [];

  view.add(
    <>
      <Node ref={nodes.bugs} opacity={0}>
        {range(10).map((i) => (
          <Icon
            ref={makeRef(bugIcons, i)}
            icon={"solar:bug-linear"}
            size={spaceY[0.5]}
            rotation={-90}
            position={[Math.random() * 864 + 432, Math.random() * 900 - 450]}
            color={() =>
              colors500[Math.floor(Math.random() * colors500.length)]
            }
          />
        ))}
      </Node>
      <ExtendedTxt ref={texts.learn} x={spaceNX[7.5]} />
    </>
  );

  yield* any(
    nodes.bugs().opacity(1, 0.5),
    ...bugIcons.map((bug, i) => bug.x(Math.random() * 864 - 600, 5.5, linear))
  );

  yield* all(
    ...bugIcons.map((bug, i) => delay(0.4 * i, bug.scale(1.5, 0.5).to(0, 1))),
    delay(2.4, texts.learn().text("Learning...", 1.6))
  );

  yield* all(
    circles.you().scale(0, 1),
    circles.fellow().scale(0, 1),
    circles.youEyeL().scale(0, 1),
    circles.fellowEyeL().scale(0, 1),
    circles.youEyeR().scale(0, 1),
    circles.fellowEyeR().scale(0, 1),
    texts.learn().opacity(0, 1)
  );

  view.add(
    <>
      <Img
        ref={images.code2}
        src={code2}
        height={spaceY[5]}
        position={[spaceX[4.75], spaceY[3]]}
        stroke={colors.fuchsia[500]}
        lineWidth={4}
        radius={16}
        opacity={0}
      />
      <Img
        ref={images.code3}
        src={code3}
        height={spaceY[5]}
        position={[spaceNX[4.75], spaceY[3]]}
        stroke={colors.emerald[500]}
        lineWidth={4}
        radius={16}
        opacity={0}
      />
      <Img
        ref={images.code1}
        src={code1}
        height={spaceY[5]}
        position={[0, spaceY[1]]}
        stroke={colors.orange[500]}
        lineWidth={4}
        radius={16}
        opacity={0}
      />
    </>
  );

  yield* all(
    images.code3().opacity(1, 1),
    delay(0.1, images.code2().opacity(1, 1)),
    delay(0.2, images.code1().opacity(1, 1)),
    images.code3().y(spaceY[1], 1),
    delay(0.1, images.code2().y(spaceY[1], 1)),
    delay(0.2, images.code1().y(spaceNY[1], 1))
  );

  view.add(
    <>
      <ExtendedTxt
        ref={texts.watchExpSwim}
        fontWeight={500}
        fontSize={spaceY[1]}
        y={spaceNY[3.5]}
        textAlign={"center"}
      />
    </>
  );

  yield* waitUntil("watchExpSwim");

  yield* all(
    texts
      .watchExpSwim()
      .text("It's like watching\nexperienced swimmers", 2, linear),
    images.code1().y(spaceY[0.5], 1),
    images.code2().y(spaceY[2.5], 1),
    images.code3().y(spaceY[2.5], 1),
    images.code1().scale(0.75, 1),
    images.code2().scale(0.75, 1),
    images.code3().scale(0.75, 1)
  );

  view.add(
    <>
      <ExtendedTxt
        ref={texts.techniques}
        text={"Techniques"}
        fontSize={spaceY[0.67]}
        y={spaceNY[0.5]}
        fontWeight={500}
        fill={colors.rose[500]}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.patterns}
        text={"Patterns"}
        fontSize={spaceY[0.67]}
        y={spaceY[0.5]}
        fontWeight={500}
        fill={colors.teal[500]}
        opacity={0}
      />
      <ExtendedCircle
        ref={circles.skills}
        size={spaceY[4]}
        color="amber"
        scale={0}
      />
      <ExtendedTxt
        ref={texts.skills}
        text={"Skills"}
        fontWeight={500}
        fontSize={spaceY[1]}
        opacity={0}
      />
    </>
  );

  yield* waitUntil("pickTech");

  yield* all(
    texts.watchExpSwim().opacity(0, 0.5),
    images.code1().opacity(0, 0.5),
    images.code2().opacity(0, 0.5),
    images.code3().opacity(0, 0.5),
    delay(0.5, texts.techniques().opacity(1, 0.5)),
    delay(1, texts.patterns().opacity(1, 0.5)),
    delay(2, circles.skills().scale(1, 1)),
    delay(2.25, texts.skills().opacity(1, 1)),
    delay(2, texts.techniques().y(0, 0.5)),
    delay(2, texts.patterns().y(0, 0.5)),
    delay(2, texts.techniques().scale(0, 1)),
    delay(2, texts.patterns().scale(0, 1))
  );

  view.add(
    <>
      <ExtendedTxt
        ref={texts.aimPerf}
        text={"Don't aim for perfection!"}
        fontSize={spaceY[1]}
        fontWeight={500}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.aimPerf2}
        text={"perfection!"}
        fontSize={spaceY[1]}
        fontWeight={500}
        fill={colors.sky[500]}
        x={283.5}
        opacity={0}
      />
    </>
  );

  yield* all(
    circles.skills().opacity(0, 0.5),
    texts.skills().opacity(0, 0.5),
    texts.aimPerf().opacity(1, 0.5),
    texts.aimPerf2().opacity(1, 0.5)
  );

  const polygon = createRef<Polygon>();

  view.add(
    <>
      <Polygon
        ref={polygon}
        sides={3}
        lineWidth={8}
        stroke={"white"}
        size={spaceY[2]}
        scale={0}
      >
        {range(50).map((index) => {
          const colorIndex = Math.floor(Math.random() * colors500.length);
          return (
            <Circle
              fill={colors500[colorIndex]}
              stroke={colors700[colorIndex]}
              lineWidth={4}
              size={spaceY["0.33"]}
              position={() => polygon().vertex(index)}
              opacity={() => polygon().vertexCompletion(index)}
            />
          );
        })}
      </Polygon>
    </>
  );

  yield* waitUntil("startSmall");

  yield* all(
    texts.aimPerf().opacity(0, 0.5),
    texts.aimPerf2().opacity(0, 0.5),
    delay(0.75, polygon().sides(50, 6)),
    polygon().scale(1, 1),
    polygon().size(spaceY[6], 6)
  );

  view.add(
    <>
      <ExtendedTxt
        ref={texts.expIsTeach}
        text={"Experience ≅ Teacher"}
        fontSize={spaceY["1"]}
        fontWeight={500}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.expIsTeachSymb}
        text={"≅"}
        fontSize={spaceY["1"]}
        fontWeight={500}
        x={68.8}
        fill={colors.indigo[500]}
        opacity={0}
      />
    </>
  );

  yield* all(
    polygon().scale(0, 1),
    texts.expIsTeach().opacity(1, 1),
    texts.expIsTeachSymb().opacity(1, 1)
  );

  view.add(
    <>
      <ExtendedTxt
        ref={texts.develop1}
        text={"Develop"}
        fontSize={spaceY["0.75"]}
        fontWeight={500}
        position={[0, spaceNY[1.75]]}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.confident}
        text={"💪 Confidence"}
        fontSize={spaceY["1"]}
        fontWeight={500}
        fill={colors.green[500]}
        opacity={0}
      />
      <ExtendedTxt
        ref={texts.skilled}
        text={"🎯 Skills"}
        fontSize={spaceY["1"]}
        fontWeight={500}
        y={spaceY["1.75"]}
        fill={colors.sky[500]}
        opacity={0}
      />
    </>
  );

  yield* waitUntil("moreDevelop")

  yield* all(
    texts.expIsTeach().opacity(0, 1),
    texts.expIsTeachSymb().opacity(0, 1),
    texts.develop1().opacity(1, 1),
    delay(1, texts.develop1().text("Development leads to:", 1.5)),
    delay(1.25, texts.confident().opacity(1, 1)),
    delay(2, texts.skilled().opacity(1, 1)),
  )

  yield* waitFor(1);
});
