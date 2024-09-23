import {makeProject} from '@motion-canvas/core';
import clientServerModel from './scenes/clientServerModel?scene';
import ipAddress from './scenes/ipAddress?scene';
import dns1 from './scenes/dns1?scene';
import audio from "./audio/Audio.wav"
import dns2 from './scenes/dns2?scene';
import dns3 from './scenes/dns3?scene';
import http from './scenes/http?scene';
import tcp1 from './scenes/tcp1?scene';
import tcp2 from './scenes/tcp2?scene';
import files from './scenes/files?scene';
import html from './scenes/html?scene';
import css from './scenes/css?scene';
import js from './scenes/js?scene';
import assembling from './scenes/assembling?scene';
import intro1 from './scenes/intro1?scene';
import intro2 from './scenes/intro2?scene';
import intro3 from './scenes/intro3?scene';
import intro4 from './scenes/intro4?scene';
import outro1 from './scenes/outro1?scene';
import outro2 from './scenes/outro2?scene';
// import test from './scenes/test?scene';

export default makeProject({
  scenes: [intro1,intro2,intro3, intro4, clientServerModel, ipAddress, dns1, dns2, dns3, http, tcp1, tcp2, files, html, css, js, assembling, outro1, outro2],
  // scenes: [intro1,intro2,intro3, intro4, clientServerModel],
  audio: audio,
});
