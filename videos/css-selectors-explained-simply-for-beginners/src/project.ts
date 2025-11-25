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

export default makeProject({
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8, scene9],
  audio: audio1,
});
