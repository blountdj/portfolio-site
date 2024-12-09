
// import { CONFIG } from "https://cdn.jsdelivr.net/gh/blountdj/portfolio-site@v13/min/js/config.js";
import { CONFIG } from "https://cdn.jsdelivr.net/gh/blountdj/portfolio-site@v13/min/js/config.min.js";

const {
    h1LoadInit,
    h1LoadEffect,
    addDarrenH2Animations,
    h1ShineEffect,
    elemScaleTo1Center,
    yPercentOpacityReturn,
    elemScaleUp
} = await import(`${CONFIG.path}${CONFIG.jsFolder}commonAnimations${CONFIG.jsPostFix}.js`);


const contact = {
    darrenH2: null,
    portfolioTextWrapper: null,
    hamburger: null
};


export const contactInit = (container) => {
    h1LoadInit(container)

    contact.darrenH2 = container.querySelector('.h2-wrapper');
    contact.portfolioTextWrapper = container.querySelector('.marquee-part');
    contact.hamburger = container.querySelector('.hamburger');

    gsap.set(contact.darrenH2, {
        yPercent: -105,
        opacity: 0,
    })

    gsap.set(contact.portfolioTextWrapper, {
        scaleX: 0,
    })

    gsap.set(contact.hamburger, {
        opacity: 0,
        scale: 0.0,
    })
}

export const contactAnimations = (container) => {
    // console.log('contactAnimations')
    const h1Chars = container.querySelectorAll('.page-h1 > .word > .char-wrapper > .char');
    gsap.timeline()
        .add(() => elemScaleTo1Center(contact.portfolioTextWrapper), 0.35)
        .add(() => h1LoadEffect(container), 0.75)
        .add(() => yPercentOpacityReturn(contact.darrenH2), 1.5)
        .add(() => elemScaleUp(contact.hamburger, 1), 2)
        .add(() => addDarrenH2Animations(contact.darrenH2), 2)
        .add(() => setInterval(() => h1ShineEffect(h1Chars), 10000), 2)
}
