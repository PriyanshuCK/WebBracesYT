import { makeProject } from '@motion-canvas/core';

import audio1234 from "./audio/audio1234.wav";

import habit1 from './scenes/habit1?scene';
import habit2 from './scenes/habit2?scene';
import habit3 from './scenes/habit3?scene';
import habit4 from './scenes/habit4?scene';
import outro from './scenes/outro?scene';

export default makeProject({
  scenes: [habit1, habit2, habit3, habit4, outro],
  audio: audio1234,
});
