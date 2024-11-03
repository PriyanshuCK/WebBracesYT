import {makeProject} from '@motion-canvas/core';
import Audio from "./audio/Audio.wav";
import Intro from './scenes/1intro?scene';
import Journey from './scenes/2journey?scene';
import ProblemSolving from './scenes/3problemSolving?scene';
import CommunitySupport from './scenes/4communitySupport?scene';

export default makeProject({
  scenes: [Intro, Journey, ProblemSolving, CommunitySupport],
  audio: Audio,
});
