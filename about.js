
import { 
    h1LoadInit, 
    h1LoadEffect,
    addH1HoverAnimations,
    addDarrenH2Animations
 } from "./commonAnimations.js";


 export const aboutInit = (container) => {
    h1LoadInit(container)
 }


export const aboutAnimations= (container) => {
    h1LoadEffect(container)

    const h1Chars = container.querySelectorAll('.page-h1 > .word > .char-wrapper > .char');
    addH1HoverAnimations(h1Chars)

    const darrenH2 = container.querySelector('.h2-wrapper');
    addDarrenH2Animations(darrenH2)
}
