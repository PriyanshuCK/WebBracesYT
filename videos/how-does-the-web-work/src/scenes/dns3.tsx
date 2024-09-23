import { Img, Layout, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import {
  all,
  any,
  createRef,
  delay,
  fadeTransition,
  makeRef,
  map,
  tween,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { Cursor, ExtendedRect, Grid } from "../nodes";
import colors from "../lib/colors";
import { ExtendedTxt } from "../nodes/ExtendedTxt";
import spaceX, { spaceNX, spaceNY, spaceY } from "../lib/space";

export default makeScene2D(function* (view) {
  view.fill(colors.zinc[950]);
  view.fontFamily("Geist");
  view.add(<>
    {/* <Grid /> */}
  </>);

  //   yield* fadeTransition(1);

  const phonebook = {
    Mohanlal: "+91-9876543210",
    Mammootty: "+91-9876543211",
    "Fahadh Faasil": "+91-9876543212",
    "Prithviraj Sukumaran": "+91-9876543213",
    "Parvathy Thiruvothu": "+91-9876543214",
    "Manju Warrier": "+91-9876543215",
    "Dulquer Salmaan": "+91-9876543216",
    "Nivin Pauly": "+91-9876543217",
    "Lijo Jose Pellissery (Director)": "+91-9876543218",
    "Aashiq Abu (Director)": "+91-9876543219",
    Rajinikanth: "+91-9876543220",
    "Kamal Haasan": "+91-9876543221",
    "Puneeth Rajkumar": "+91-9876543241",
    "Thala Ajith": "+91-9876543223",
    "Aparna Das": "+91-9876543224",
    Dhanush: "+91-9876543227",
    "Jyothika": "+91-9876543225",
    "Kalyani Priyardarshan": "+91-9876543226",
    "Nani": "+91-9876543229",
    Suriya: "+91-9876543228",
    "Thalapathy": "+91-9876543230",
    "Mahesh Babu": "+91-9876543231",
    Prabhas: "+91-9876543232",
    "Allu Arjun": "+91-9876543233",
    "Anushka Shetty": "+91-9876543234",
    "Samantha Akkineni": "+91-9876543235",
    Nagarjuna: "+91-9876543236",
    "Ram Charan": "+91-9876543237",
    "S. S. Rajamouli (Director)": "+91-9876543238",
    "Pawan Kalyan": "+91-9876543239",
    Rajkumar: "+91-9876543240",
    Vijay: "+91-9876543222",
    Yash: "+91-9876543242",
    Sudeep: "+91-9876543243",
    "Rashmika Mandanna": "+91-9876543244",
    Ramya: "+91-9876543245",
    Darshan: "+91-9876543246",
    Upendra: "+91-9876543247",
    Shivarajkumar: "+91-9876543248",
    "S. Narayan (Director)": "+91-9876543249",
  };

  const dnsData = [
    { domain: "example.com", ip: "192.0.2.1", server: "Example Hosting Co." },
    { domain: "example.org", ip: "192.0.2.2", server: "Another Host LLC" },
    { domain: "example.net", ip: "192.0.2.3", server: "Web Services Inc." },
    { domain: "testsite.com", ip: "192.0.2.4", server: "Test Hosting Ltd." },
    { domain: "mywebsite.org", ip: "192.0.2.5", server: "My Host LLC" },
    { domain: "sample.net", ip: "192.0.2.6", server: "Sample Web Services" },
    { domain: "demo.com", ip: "192.0.2.7", server: "Demo Hosting Co." },
    { domain: "example1.org", ip: "192.0.2.8", server: "Host Services Inc." },
    { domain: "example2.net", ip: "192.0.2.9", server: "Another Web Host" },
    { domain: "example3.com", ip: "192.0.2.10", server: "Example Hosting Co." },
    { domain: "website.org", ip: "192.0.2.11", server: "Web Host Ltd." },
    {
      domain: "placeholder.net",
      ip: "192.0.2.12",
      server: "Placeholder Hosting",
    },
    { domain: "mysite.com", ip: "192.0.2.13", server: "My Hosting LLC" },
    { domain: "sitetest.org", ip: "192.0.2.14", server: "Test Web Services" },
    {
      domain: "wikipedia.org",
      ip: "198.35.26.96",
      server: "Wikimedia Foundation Inc.",
    },
    {
      domain: "atomichabits.com",
      ip: "172.67.216.166",
      server: "Cloudflare, Inc.",
    },
    { domain: "example4.net", ip: "192.0.2.15", server: "Example Web Inc." },
    {
      domain: "siteexample.com",
      ip: "192.0.2.15",
      server: "Example Web Inc.",
    },
    { domain: "domain.org", ip: "192.0.2.18", server: "Domain Hosting LLC" },
    { domain: "amazon.com", ip: "52.94.236.248", server: "Amazon.com, Inc." },
    {
      domain: "priyanshusharma.dev",
      ip: "76.76.21.93",
      server: "Amazon.com, Inc.",
    },
    { domain: "webpage.net", ip: "192.0.2.18", server: "Web Page Services" },
    {
      domain: "hostexample.com",
      ip: "192.0.2.19",
      server: "Example Hosting Co.",
    },
    {
      domain: "examplehost.org",
      ip: "192.0.2.20",
      server: "Host Services LLC",
    },
  ];

  const dns = createRef<ExtendedTxt>();
  const phonebookText = createRef<ExtendedTxt>();
  const pbtitles = createRef<Layout>();
  const dnstitles = createRef<Layout>();
  const phonebookLayout = createRef<Layout>();
  const dnsLayout = createRef<Layout>();
  view.add(
    <>
      <Rect
        fill={colors.zinc[950]}
        width={spaceX[8]}
        height={spaceY[3]}
        shadowBlur={spaceY[1]}
        shadowColor={colors.zinc[950]}
        shadowOffsetY={spaceY[0.75]}
        position={[spaceNX[5.5], spaceNY[4.5]]}
        zIndex={1}
      />
      <Rect
        fill={colors.zinc[950]}
        width={spaceX[8]}
        height={spaceY[3]}
        shadowBlur={spaceY[1]}
        shadowColor={colors.zinc[950]}
        shadowOffsetY={spaceNY[1]}
        position={[spaceNX[5.5], spaceY[6.5]]}
        zIndex={1}
      />
      <ExtendedTxt
        ref={phonebookText}
        text={"Phonebook"}
        fontSize={spaceY["0.5"]}
        position={[spaceNX[5.5], spaceNY[4.5]]}
        zIndex={2}
        opacity={0}
      />
      <Layout
        ref={pbtitles}
        position={[spaceNX[5.5], spaceNY[3.25]]}
        layout
        width={spaceX[7]}
        direction={"row"}
        zIndex={2}
        justifyContent={"space-between"}
        opacity={0}
      >
        <ExtendedTxt fontWeight={700} letterSpacing={1} text={"Name"} />
        <ExtendedTxt fontWeight={700} letterSpacing={1} text={"Number"} />
      </Layout>
      <Layout
        ref={phonebookLayout}
        position={[spaceNX[5.5], spaceNY[1]]}
        layout
        width={spaceX[8]}
        height={spaceY[8]}
        direction={"column"}
        opacity={0}
      />
      <ExtendedTxt
        ref={dns}
        text={"Domain Name System"}
        position={[spaceX[4.5], spaceNY[4.5]]}
        fontSize={spaceY[0.5]}
        zIndex={2}
      />
      <Rect
        fill={colors.zinc[950]}
        width={spaceX[10]}
        height={spaceY[3]}
        shadowBlur={spaceY[1]}
        shadowColor={colors.zinc[950]}
        shadowOffsetY={spaceY[0.75]}
        position={[spaceX[4.5], spaceNY[4.5]]}
        zIndex={1}
      />
      <Rect
        fill={colors.zinc[950]}
        width={spaceX[10]}
        height={spaceY[3]}
        shadowBlur={spaceY[1]}
        shadowColor={colors.zinc[950]}
        shadowOffsetY={spaceNY[1]}
        position={[spaceX[4.5], spaceY[6.5]]}
        zIndex={1}
      />
      <Layout
        ref={dnstitles}
        position={[spaceX[4.5], spaceNY[3.25]]}
        layout
        width={spaceX[9]}
        direction={"row"}
        zIndex={2}
        gap={90}
        justifyContent={"center"}
        opacity={0}
      >
        <ExtendedTxt fontWeight={700} letterSpacing={1} text={"IP Address"} />
        <ExtendedTxt
          fontWeight={700}
          letterSpacing={1}
          text={"Domain Name"}
          marginRight={spaceX[1.75]}
        />
        <ExtendedTxt fontWeight={700} letterSpacing={1} text={"AS Name"} />
      </Layout>
      <Layout
        ref={dnsLayout}
        position={[spaceX[4.5], spaceNY[1]]}
        layout
        width={spaceX[10]}
        height={spaceY[8]}
        direction={"column"}
        opacity={0}
      />
    </>
  );

  const phonebookEntries: Layout[] = [];
  Object.entries(phonebook).forEach(([name, value], index) => {
    const entry = makeRef(phonebookEntries, index);
    phonebookLayout().add(
      <Layout
        ref={entry}
        width={"100%"}
        height={spaceY["0.75"]}
        padding={spaceY["0.5"]}
        layout
        direction={"row"}
        justifyContent={"space-between"}
      >
        <ExtendedTxt text={name} fontWeight={600} />
        <ExtendedTxt text={value} />
      </Layout>
    );
  });

  const dnsEntries: Layout[] = [];
  dnsData.forEach((entry, index) => {
    const dnsEntriesLayout = makeRef(dnsEntries, index);
    dnsLayout().add(
      <Layout
        ref={dnsEntriesLayout}
        width={"100%"}
        height={spaceY["0.75"]}
        padding={spaceY["0.5"]}
        layout
        direction={"row"}
        justifyContent={"space-between"}
      >
        <ExtendedTxt text={entry.ip} fontWeight={600} />
        <Layout width={spaceX[6.25]} layout justifyContent={"space-between"}>
          <ExtendedTxt text={entry.domain} />
          <ExtendedTxt text={entry.server} />
        </Layout>
      </Layout>
    );
  });

  yield* any(
    phonebookText().opacity(1, 2),
    pbtitles().opacity(1, 2),
    delay(0.25, phonebookLayout().opacity(1, 2)),
    delay(0.25, phonebookLayout().y(spaceNY[12], 2)),
    delay(0.5, dnstitles().opacity(1, 2)),
    delay(1, dnsLayout().opacity(1, 1)),
    delay(1, dnsLayout().y(spaceNY[12], 2))
  );

  const highlighter = createRef<ExtendedRect>();
  // const cursor = createRef<Cursor>();

  view.add(
    <>
      <ExtendedRect ref={highlighter} width={spaceX[10]} position={[spaceX[4.5], spaceY[1.25]]} height={spaceY[2]} highlighted opacity={0} end={0}/>
      {/* <Cursor ref={cursor} position={[spaceNX[1.75], spaceY[4]]} zIndex={2} opacity={0}/> */}
    </>
  );

  // yield* all(
  //   cursor().opacity(1,1),
  //   cursor().position([spaceNX[0.5], spaceY[0.25]],1),
  // );
  yield* waitUntil("noteThat");
  yield* all(highlighter().end(1, 1), highlighter().opacity(1, 1));

  yield* waitUntil("sceneEnd");

});
