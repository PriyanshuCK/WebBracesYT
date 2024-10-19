import {makeProject} from '@motion-canvas/core';
import Audio from "./audio/Audio.wav";
import example from './scenes/example?scene';

export default makeProject({
  scenes: [example],
  audio: Audio,
});
