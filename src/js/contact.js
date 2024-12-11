
// import { CONFIG_DEV } from "./config.js";
import { CONFIG_PROD } from "https://cdn.jsdelivr.net/gh/blountdj/portfolio-site@v17/dist/js/config.min.js";

const CONFIG = CONFIG_PROD

const {
    h1LoadInit,
    h1LoadEffect,
    addDarrenH2Animations,
    h1ShineEffect,
    elemScaleTo1Center,
    yPercentOpacityReturn,
    elemScaleUp,
    yPercentOpacityReturnStagger
} = await import(`${CONFIG.path}${CONFIG.jsFolder}commonAnimations${CONFIG.jsPostFix}.js`);


const contact = {
    darrenH2: null,
    portfolioTextWrapper: null,
    hamburger: null,
    letsTalk: null,
    mainText: null,
    fieldText: null,
    inputs: null,
    btn: null
};


export const contactInit = (container) => {
    h1LoadInit(container)

    contact.darrenH2 = container.querySelector('.h2-wrapper');
    contact.portfolioTextWrapper = container.querySelector('.marquee-part');
    contact.hamburger = container.querySelector('.hamburger');
    contact.letsTalk = container.querySelector('.h3-heading');
    contact.mainText = container.querySelector('.project-paragraph');
    contact.fieldText = container.querySelectorAll('.field-label');
    contact.inputs = container.querySelectorAll('.text-field');
    contact.btn = container.querySelector('.btn');

    gsap.set([contact.darrenH2, contact.letsTalk, contact.mainText, contact.fieldText, contact.inputs, contact.btn], {
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
        .add(() => yPercentOpacityReturn([contact.letsTalk, contact.mainText, contact.inputs, contact.fieldText, contact.btn]), 1.15)
        .add(() => elemScaleTo1Center(contact.portfolioTextWrapper), 1.65)
        .add(() => h1LoadEffect(container), 1.95)
        .add(() => yPercentOpacityReturn(contact.darrenH2), 2.6)
        .add(() => elemScaleUp(contact.hamburger, 1), 3.0)
        .add(() => addDarrenH2Animations(contact.darrenH2), 3.0)
        .add(() => setInterval(() => h1ShineEffect(h1Chars), 10000), 3.0)

}
