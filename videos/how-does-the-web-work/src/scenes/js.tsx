import { Code, Img, Layout, makeScene2D } from "@motion-canvas/2d";
import {
  all,
  createRef,
  delay,
  fadeTransition,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import {
  Cursor,
  ExtendedFillSVG,
  ExtendedRect,
  Grid,
  JSCode,
  Window,
} from "../nodes";
import colors from "../lib/colors";
import {
  Cooker,
  GasStove,
  JS,
  LightBulbColored,
  LightBulbMono,
} from "../lib/svgs";
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

  yield* fadeTransition(1);

  const jsSVG = createRef<ExtendedFillSVG>();
  const jsCode = createRef<Code>();
  const bulbSVG = createRef<ExtendedFillSVG>();

  view.add(
    <>
      <ExtendedFillSVG ref={jsSVG} svg={JS} size={spaceY[2]} y={spaceNY[3]} />
      <JSCode
        ref={jsCode}
        opacity={0}
        y={spaceY[2]}
        code={`\
document.getElementById('myButton').addEventListener('click', function() {
    document.getElementById('clickResult').textContent = 'Button was clicked!';
    this.style.backgroundColor = 'red';
});

document.addEventListener('click', function(event) {
    document.getElementById('clickResult').textContent = 
        'User clicked at coordinates: ' + event.clientX + ', ' + event.clientY;
});
`}
      />
      <ExtendedFillSVG
        ref={bulbSVG}
        svg={LightBulbMono}
        size={spaceY[2]}
        opacity={0}
      />
    </>
  );
  yield* all(jsSVG().write(), jsCode().opacity(1, 1), bulbSVG().write());
  yield* waitUntil("itsLike");
  yield* all(
    jsCode().opacity(0, 1),
    jsSVG().scale(0, 1),
    bulbSVG().opacity(1, 1)
  );

  const cookerLayout = createRef<Layout>();
  const gasStove = createRef<ExtendedFillSVG>();
  const cooker = createRef<ExtendedFillSVG>();

  view.add(
    <>
      <Layout ref={cookerLayout} x={spaceX[3]}>
        <ExtendedFillSVG
          ref={cooker}
          svg={Cooker}
          size={spaceY[2]}
          color="slate"
          y={spaceNY[1.5]}
        />
        <ExtendedFillSVG
          ref={gasStove}
          svg={GasStove}
          size={spaceY[3]}
          opacity={0}
          color="red"
          y={spaceY[0.5]}
        />
      </Layout>
    </>
  );

  yield* all(
    delay(0.25, bulbSVG().svg(LightBulbColored, 0.5)),
    delay(0.8, bulbSVG().svg(LightBulbMono, 0.5)),
    gasStove().write()
  );

  yield* all(
    gasStove().opacity(1, 1),
    cookerLayout().x(0, 1),
    cooker().write(),
    bulbSVG().x(spaceNX[3], 1),
    bulbSVG().opacity(0, 1)
  );

  const window = createRef<Window>();

  jsCode().x(spaceNX[4.33]);
  jsCode().y(0);
  jsCode().code(`\
document.getElementById('myButton').addEventListener
('click', function() {
    document.getElementById('clickResult').
    this.style.color = 'red';
});
`);

  const cursor = createRef<Cursor>();
  const button = createRef<ExtendedRect>();
  const buttonTxt = createRef<ExtendedTxt>();
  const name = createRef<ExtendedRect>();
  const email = createRef<ExtendedRect>();
  const nameTxt = createRef<ExtendedTxt>()
  const emailTxt = createRef<ExtendedTxt>()
  const submit = createRef<ExtendedRect>();
  const submitTxt = createRef<ExtendedTxt>();
  const formTxt = createRef<ExtendedTxt>()

  view.add(
    <>
      <Cursor ref={cursor} opacity={0} position={[spaceX[7], spaceNY[3]]} scale={0.8}/>
      <Window ref={window} x={spaceX[5]} width={spaceX[8]} opacity={0}>
        <ExtendedRect
          ref={button}
          width={spaceX[1.25]}
          height={spaceY["0.67"]}
          padding={spaceY["0.25"]}
          justifyContent={"center"}
          lineWidth={3}
          color="red"
        >
          <ExtendedTxt
            ref={buttonTxt}
            text={"Button"}
            alignSelf={"center"}
            fontSize={spaceY["0.25"]}
            fontWeight={600}
          />
        </ExtendedRect>
        <ExtendedTxt
          text={"Name"}
          fontSize={spaceY["0.25"]}
          marginTop={spaceY["0.5"]}
          marginBottom={spaceY["0.25"]}
        />
        <ExtendedRect
          ref={name}
          height={spaceY["0.67"]}
          width={"60%"}
          color="slate"
          lineWidth={2}
          paddingLeft={spaceY["0.25"]}
          alignItems={"center"}
        >
          <ExtendedTxt ref={nameTxt} fontSize={spaceY["0.25"]} fontWeight={600} fill={colors.slate[300]}/>
        </ExtendedRect>
        <ExtendedTxt
          text={"Email"}
          fontSize={spaceY["0.25"]}
          marginTop={spaceY["0.5"]}
          marginBottom={spaceY["0.25"]}
        />
        <ExtendedRect
          ref={email}
          height={spaceY["0.67"]}
          width={"60%"}
          color="slate"
          lineWidth={2}
          paddingLeft={spaceY["0.25"]}
          alignItems={"center"}
        >
          <ExtendedTxt ref={emailTxt} fontSize={spaceY["0.25"]} fontWeight={600} fill={colors.slate[300]} /></ExtendedRect>
          <ExtendedRect
          ref={submit}
          width={spaceX[1.25]}
          height={spaceY["0.67"]}
          padding={spaceY["0.25"]}
          justifyContent={"center"}
          lineWidth={3}
          marginTop={spaceY["0.5"]}
        >
          <ExtendedTxt
            ref={submitTxt}
            text={"Submit"}
            alignSelf={"center"}
            fontSize={spaceY["0.25"]}
            fontWeight={600}
          />
        </ExtendedRect>
        <ExtendedTxt ref={formTxt} fontSize={spaceY["0.25"]} marginTop={spaceY["0.5"]} text={"Form submitted with name: Vivekanand and email: \nvivekanand@examplemail.org"} opacity={0}/>
      </Window>
    </>
  );

  window().inner.padding(spaceY["0.25"]);

  yield* all(
    cookerLayout().scale(0, 1),
    window().opacity(1, 1),
  );
  
  yield* all(
    cursor().opacity(1, 1),
    cursor().position([spaceX[2], spaceNY[4]], 1),
    jsCode().opacity(1, 1),
    delay(1, cursor().scale(0.6, 0.5)),
    delay(1, buttonTxt().fill(colors.red[500], 1)),
    delay(1.5, cursor().scale(0.8, 0.5)),
    delay(1.5, cursor().position([spaceX[3], spaceY[1]], 1))
    // delay(2.5, cursor().scale(0.7, 0.5)),
    // delay(3, cursor().scale(1, 0.5)),
  );

  yield* all(
    jsCode().code.append(`
document.getElementById('myForm').addEventListener
('submit', function (event) {
    event.preventDefault();
    var name = document.getElementById('nameInput').
    value;
    var email = document.getElementById('emailInput').
    value;
    document.getElementById('formResult').textContent
    =
        'Form submitted with name: ' + name + ' and 
        email: ' + email;
});`, 1),
    nameTxt().text("Vivekanand",1.25),
    emailTxt().text("vivekanand@examplemail.org",1.25),
    cursor().position([spaceX[2], spaceY["0.5"]],0.75),
    delay(0.75, cursor().scale(0.6, 0.5)),
    delay(0.75, submit().highlight(true, 0.5)),
    delay(1.25, cursor().scale(0.8, 0.5)),
    delay(1, formTxt().opacity(1, 1)),
    delay(1.75, cursor().position([spaceX[3], spaceY[2]],0.75)),
    delay(1.75, cursor().opacity(0,0.75)),
  )
  
  yield* waitUntil("sceneEnd");

});
