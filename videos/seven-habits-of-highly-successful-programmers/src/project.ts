import { makeProject } from '@motion-canvas/core';

import audio1 from "./audio/audio1.wav";

import habit1 from './scenes/habit1?scene';

export default makeProject({
  scenes: [habit1],
  audio: audio1,
});
