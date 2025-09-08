import { makeProject } from "@motion-canvas/core";

import audioAI1 from "./audio/audioAI1.wav";
import scene1 from "./scenes/scene1-intro?scene";
import scene2 from "./scenes/scene2-type-class-intro?scene";

export default makeProject({
  scenes: [scene1, scene2],
  audio: audioAI1,
});
