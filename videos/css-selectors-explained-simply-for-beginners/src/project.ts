import { makeProject } from "@motion-canvas/core";

import audio1 from "./audio/Final Aud1.wav";
import scene1 from "./scenes/scene1-intro?scene";
import scene2 from "./scenes/scene2-type-class-intro?scene";
import scene3 from "./scenes/scene3-multiple-classes?scene";
import scene4 from "./scenes/scene4-case-sensitivity-&-invalidity?scene";
import scene5 from "./scenes/scene5-ID-intro-syntax-&-specificity?scene";
import scene6 from "./scenes/scene6-ID-uniqueness?scene";
import scene7 from "./scenes/scene7-ID-why-exist?scene";
import scene8 from "./scenes/scene8-ID-case-sensitivity-&-invalidity?scene";
import scene9 from "./scenes/scene9-selector-lists-intro?scene";
import scene10 from "./scenes/scene10-selector-lists-space-vs-comma?scene"
import scene10b from "./scenes/scene10-selector-lists-space-vs-comma-b?scene"
import scene11 from "./scenes/scene11-selector-lists-invalidity?scene"
import scene12 from "./scenes/scene12-universal-selector-intro?scene"

export default makeProject({
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8, scene9, scene10, scene10b, scene11, scene12],
  audio: audio1,
});
