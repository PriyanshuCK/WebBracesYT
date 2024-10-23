import {makeProject} from '@motion-canvas/core';
import Audio from "./audio/Audio.wav";
import Intro from './scenes/1intro?scene';

export default makeProject({
  scenes: [Intro],
  audio: Audio,
});
