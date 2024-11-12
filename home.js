console.log('home.js')

import { marqueeScrollEffect } from "./marquee.js";
import { introTextEffect } from "./introTextEffect.js"; 
import { cursorInit } from "./cursor.js";
import { shootingEffect } from "./shooting.js";


export const homeInit = (container) => {
    console.log('homeInit')
    marqueeScrollEffect();
    introTextEffect();
    cursorInit();
    shootingEffect();
}
