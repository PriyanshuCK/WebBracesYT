import {
  Img,
  Layout,
  Line,
  makeScene2D,
  QuadBezier,
  Ray,
  SVG,
  Txt,
} from "@motion-canvas/2d";
import {
  all,
  any,
  Color,
  createRef,
  createRefArray,
  createRefMap,
  delay,
  easeOutCubic,
  easeOutElastic,
  fadeTransition,
  linear,
  loopFor,
  loopUntil,
  makeRef,
  range,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import {
  ExtendedCircle,
  ExtendedFillSVG,
  ExtendedRect,
  ExtendedStrokeSVG,
  Grid,
  Window,
} from "../nodes";
import colors from "../lib/colors";
import {
  ChatBubbleRight,
  Cog,
  Library,
  LibraryMarker,
  QuestionMark,
  Search,
  WebsiteSkeleton,
} from "../lib/svgs";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";
import AtomicHabitsImg from "../images/atomic-habits-dots.png";
import { ExtendedTxt } from "../nodes/ExtendedTxt";

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  view.add(
    <>
      {/* <Grid /> */}
    </>
  );

  yield* fadeTransition(1);

  const librarys: ExtendedStrokeSVG[] = [];
  const libMarker = createRef<ExtendedStrokeSVG>();
  const questionMarkRef = createRef<ExtendedStrokeSVG>();
  const atomicHabitsImgRef = createRef<Img>();
  const cogRef = createRef<SVG>();
  const systemRectRef = createRef<ExtendedRect>();
  const chatBubbleRightRef = createRef<ExtendedStrokeSVG>();
  const chatBubbleText = createRef<ExtendedTxt>();
  const bookLibraryMappingText = createRef<ExtendedTxt>();

  view.add(
    <>
      <Layout position={[spaceNX[7], spaceNY[3]]}>
        {range(12).map((index) => {
          return (
            <ExtendedStrokeSVG
              ref={makeRef(librarys, index)}
              svg={Library}
              size={spaceY[1.25]}
              lineWidth={1.5}
              position={[
                (index % 3) * spaceY[2],
                Math.floor(index / 3) * spaceY[2],
              ]}
            />
          );
        })}
      </Layout>
      <ExtendedStrokeSVG ref={libMarker} svg={LibraryMarker} lineWidth={1.5} />
      <SVG
        svg={LibraryMarker}
        stroke={colors.amber[500]}
        lineWidth={2}
        size={spaceY[1]}
      />
    </>
  );

  yield* all(
    ...librarys.map((library, index) => delay(index * 0.05, library.write()))
  );
  yield* libMarker().write();
  view.add(
    <>
      <Img
        ref={atomicHabitsImgRef}
        src={AtomicHabitsImg}
        scale={0}
        position={[spaceX[1], spaceY[1]]}
      />
      <ExtendedStrokeSVG
        ref={questionMarkRef}
        svg={QuestionMark}
        position={[spaceX[1], spaceY[3.25]]}
        white={true}
        size={spaceY[1.25]}
        lineWidth={1}
      />
    </>
  );

  yield* all(questionMarkRef().write(), atomicHabitsImgRef().scale(0.33, 1));

  view.add(
    <>
      <ExtendedRect
        ref={systemRectRef}
        highlighted
        layout
        width={spaceX[4]}
        height={spaceY[5]}
        justifyContent={"center"}
        position={[spaceX[12.25], spaceNY[2]]}
        direction={"column"}
        gap={spaceY[1]}
      >
        <ExtendedTxt
          ref={bookLibraryMappingText}
          textAlign={"center"}
          alignSelf={"center"}
          text={"Book-Library\nMapping System"}
        />
        <SVG
          ref={cogRef}
          svg={Cog}
          lineWidth={2}
          lineCap={"round"}
          lineJoin={"round"}
          size={spaceY[2]}
          alignSelf={"center"}
        />
      </ExtendedRect>
    </>
  );
  cogRef().stroke(systemRectRef().stroke());

  yield* waitUntil("you'llLove");

  const rippleCircle = createRef<ExtendedCircle>();

  yield* any(
    systemRectRef().rotation(-30, 1),
    systemRectRef().x(spaceX[9.75], 1),
    cogRef().rotation(900, 20, linear),
  );
  yield* waitUntil("thatTells");
  view.add(
    <>
      <ExtendedStrokeSVG
        ref={chatBubbleRightRef}
        svg={ChatBubbleRight}
        white={true}
        size={spaceY[3]}
        lineWidth={0.25}
        position={[spaceX[5.75], spaceNY[4]]}
      />
      <ExtendedTxt
        ref={chatBubbleText}
        position={chatBubbleRightRef().position()}
      />
      <ExtendedCircle
        lineWidth={2}
        ref={rippleCircle}
        position={[spaceNX[7], spaceY[1]]}
        scale={0}
      />
    </>
  );

  rippleCircle().stroke(colors.slate[0]);
  yield* all(
    chatBubbleRightRef().write(),
    chatBubbleText().text("I'll tell you.", 1),
    rippleCircle().scale(2, 2),
    rippleCircle().opacity(0, 2)
  );

  yield* waitUntil("whenYouType");

  const windowRef = createRef<Window>();
  const addressBar = createRef<ExtendedRect>();
  const search = createRef<ExtendedFillSVG>();
  const url = createRef<ExtendedTxt>();
  const webSkeleton = createRef<SVG>();
  view.add(
    <>
      <Window ref={windowRef} x={spaceNX[4]} width={spaceX[8]} opacity={0}>
        <ExtendedRect
          ref={addressBar}
          width={spaceX[7.5]}
          height={spaceY["0.5"]}
          alignSelf={"center"}
          radius={spaceY[0.5]}
          marginTop={spaceY["0.25"]}
          highlighted
          layout
          direction={"row"}
          alignItems={"center"}
          lineWidth={2}
        >
          <ExtendedFillSVG
            ref={search}
            lineWidth={1}
            svg={Search}
            scale={0.33}
            white
          />
          <ExtendedTxt ref={url} fontSize={spaceY["0.25"]} />
        </ExtendedRect>
        <SVG ref={webSkeleton} svg={WebsiteSkeleton} size={spaceY[8]} opacity={0} scale={0.95}/>
      </Window>
    </>
  );

  addressBar().stroke(colors[windowRef().colorSignal()][500]);
  addressBar().fill(
    new Color(colors[windowRef().colorSignal()][500]).alpha(0.1)
  );

  yield* all(
    ...librarys.map((library) => library.scale(0, 1)),
    bookLibraryMappingText().text("", 1),
    atomicHabitsImgRef().scale(0, 1),
    questionMarkRef().scale(0, 1),
    chatBubbleRightRef().scale(0, 1),
    chatBubbleText().scale(0, 1),
    delay(0.25, windowRef().opacity(1, 1)),
  );
  
  bookLibraryMappingText().remove()

  yield* all(
    url().text("https://sive.rs/", 2),
    search().write(),
    delay(1.75, systemRectRef().rotation(0, 1)),
    delay(1.75, systemRectRef().position([spaceX[6], 0], 1))
  );

  const reqResLayout = createRef<Layout>();
  const RayRefs = createRefMap<Ray>();
  const TxtRefs = createRefMap<Txt>();

  view.add(
    <>
      <Layout ref={reqResLayout}>
        <Ray
          ref={RayRefs.request}
          lineWidth={4}
          endArrow
          from={[windowRef().right().x, spaceNY[1.5]]}
          to={[systemRectRef().left().x, spaceNY[1.5]]}
          stroke={windowRef().stroke()}
          lineCap={"round"}
          lineDash={[10, 20]}
          startOffset={spaceX["0.25"]}
          endOffset={spaceX["0.25"]}
          arrowSize={18}
          end={0}
        />
        <Ray
          ref={RayRefs.response}
          lineWidth={4}
          endArrow
          to={[windowRef().right().x, spaceY[1.5]]}
          from={[systemRectRef().left().x, spaceY[1.5]]}
          stroke={systemRectRef().stroke()}
          lineCap={"round"}
          lineDash={[10, 20]}
          startOffset={spaceX["0.25"]}
          endOffset={spaceX["0.25"]}
          arrowSize={18}
          end={0}
        />
        <Txt
          ref={TxtRefs.request}
          fontSize={spaceY[0.33]}
          x={spaceX[2]}
          fill={colors.slate[0]}
          fontWeight={400}
          text={""}
          y={RayRefs.request().from().y - spaceY["0.5"]}
        />
        <Txt
          ref={TxtRefs.response}
          fontSize={spaceY[0.33]}
          x={spaceX[2]}
          fill={colors.slate[0]}
          fontWeight={400}
          text={""}
          y={RayRefs.response().from().y + spaceY["0.5"]}
        />
        <Txt
          ref={TxtRefs.cigAH}
          fontSize={spaceY[0.33]}
          x={spaceX[2]}
          fill={systemRectRef().stroke()}
          fontWeight={400}
          text={""}
          y={RayRefs.request().from().y + spaceY["0.5"]}
        />
        <Txt
          ref={TxtRefs.yoc}
          fontSize={spaceY[0.33]}
          x={spaceX[2]}
          fill={windowRef().stroke()}
          fontWeight={400}
          text={""}
          y={RayRefs.response().from().y - spaceY["0.5"]}
        />
      </Layout>
    </>
  );

  yield* all(
    RayRefs.request().end(1, 1),
    TxtRefs.request().text("https://sive.rs/", 1),
    delay(
      1,
      loopFor(2, () => systemRectRef().ripple(1))
    ),
    delay(2.25, RayRefs.response().end(1, 1)),
    delay(2.25, TxtRefs.response().text("8.9.8.112", 1)),
    delay(2.5, webSkeleton().opacity(1,1)),
    delay(2.5, webSkeleton().scale(1,1)),
  );

  const dns = createRef<ExtendedTxt>();

  view.add(
    <>
      <ExtendedTxt ref={dns} position={[systemRectRef().x(), systemRectRef().bottom().y + spaceY[1]]} fontSize={spaceY["0.5"]} colored color={systemRectRef().colorSignal()} />
    </>
  );

  yield* waitUntil("knownAs");

  yield* all(
   dns().text("Domain Name System", 2),
  )

  yield* waitUntil("understandDNS");

  yield* all(
    systemRectRef().scale(0, 1),
    windowRef().scale(0, 1),
    RayRefs.request().end(0,1),
    RayRefs.request().opacity(0, 1),
    TxtRefs.request().text("", 1),
    RayRefs.response().end(0,1),
    RayRefs.response().opacity(0, 1),
    TxtRefs.response().text("", 1),
    dns().position([spaceX[4.5], spaceNY[4.5]], 1),
    dns().fill(colors.slate[0], 1),
    dns().fontSize(spaceY["0.5"], 1),
  )
});
