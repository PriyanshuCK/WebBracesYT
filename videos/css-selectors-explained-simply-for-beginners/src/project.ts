import { makeProject } from "@motion-canvas/core";

import audioAI1 from "./audio/audioAI1.wav";
import scene1 from "./scenes/scene1-intro?scene";
import scene2 from "./scenes/scene2-type-class-intro?scene";
import scene3 from "./scenes/scene3-multiple-classes?scene";
import scene4 from "./scenes/scene4-case-sensitivity-&-invalidity?scene";

export default makeProject({
  scenes: [scene1, scene2, scene3, scene4],
  audio: audioAI1,
});
