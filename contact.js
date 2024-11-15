
import { 
    h1LoadInit, 
    h1LoadEffect,
    addH1HoverAnimations,
    addDarrenH2Animations,
    h1ShineEffect
 } from "./commonAnimations.js";


 export const contactInit = (container) => {
    h1LoadInit(container)
 }


export const contactAnimations= (container) => {
    h1LoadEffect(container)

    const h1Chars = container.querySelectorAll('.page-h1 > .word > .char-wrapper > .char');
    // addH1HoverAnimations(h1Chars)
    setInterval(() => h1ShineEffect(h1Chars), 10000)

    const darrenH2 = container.querySelector('.h2-wrapper');
    addDarrenH2Animations(darrenH2)
}
