import { makeProject } from "@motion-canvas/core";
import Audio from "./audio/audio.wav";
import EverythingIsABox from "./scenes/1everythingIsABox?scene";
import PartsOfABox from "./scenes/2partsOfABox?scene";
import Padding from "./scenes/3padding?scene";
import Border from "./scenes/4border?scene";
import Margin from "./scenes/5margin?scene";
import Marginvspadding from "./scenes/6marginvspadding?scene";
import Margincollapsing from "./scenes/7margincollapsing?scene";
import BoxSizingProblem from "./scenes/8boxSizingProblem?scene";
import BoxSizingSolution from "./scenes/9boxSizingSolution?scene";
import DevTools from "./scenes/10devTools?scene";
import DisplayBlock from "./scenes/11displayBlock?scene";
import DisplayInline from "./scenes/12displayInline?scene";
import DisplayInlineBlock from "./scenes/13displayInlineBlock?scene";
import DisplayTypes from "./scenes/14displayTypes?scene";
import Intro1 from "./scenes/0Intro1?scene";
import Intro2 from "./scenes/0Intro2?scene";
import Intro3 from "./scenes/0Intro3?scene";

export default makeProject({
  scenes: [
    Intro1,
    Intro2,
    Intro3,
    EverythingIsABox,
    PartsOfABox,
    Padding,
    Border,
    Margin,
    Marginvspadding,
    Margincollapsing,
    BoxSizingProblem,
    BoxSizingSolution,
    DevTools,
    DisplayBlock,
    DisplayInline,
    DisplayInlineBlock,
    DisplayTypes,
  ],
  audio: Audio,
});
