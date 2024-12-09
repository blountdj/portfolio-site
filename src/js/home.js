// console.log('home.js')

// import { CONFIG } from "https://cdn.jsdelivr.net/gh/blountdj/portfolio-site@v15/dist/js/config.js";
import { CONFIG } from "https://cdn.jsdelivr.net/gh/blountdj/portfolio-site@v15/dist/js/config.min.js";

const { marqueeScrollEffect } = await import(`${CONFIG.path}${CONFIG.jsFolder}marquee${CONFIG.jsPostFix}.js`);
const { introTextEffect } = await import(`${CONFIG.path}${CONFIG.jsFolder}introTextEffect${CONFIG.jsPostFix}.js`);
const { cursorInit } = await import(`${CONFIG.path}${CONFIG.jsFolder}cursor${CONFIG.jsPostFix}.js`);
const { shootingEffect } = await import(`${CONFIG.path}${CONFIG.jsFolder}shooting${CONFIG.jsPostFix}.js`);

const {
    elemFadeIn,
    elemFadeOut,
    yPercentOpacityReturn,
    elemScaleUp
} = await import(`${CONFIG.path}${CONFIG.jsFolder}commonAnimations${CONFIG.jsPostFix}.js`);


const home = {
    hamburger: null,
    scoreWrapper: null,
    marqueeSection: null,
}

export const homeInit = (container) => {
    return new Promise((resolve) => {
        home.hamburger = container.querySelector('.hamburger')
        home.scoreWrapper = container.querySelector('.score-wrapper')
        home.marqueeSection = container.querySelector('.home-marquee-section')

        gsap.set([home.hamburger, home.scoreWrapper, home.marqueeSection], {
            opacity: 0
        })
        gsap.set(home.marqueeSection, {
            yPercent: 100
        })
        resolve()
    })
}

export const homeAnimate = (container, type) => {

    const introTextWrapper = container.querySelector('.intro-text-wrapper')

    if (type === 'once') {
        gsap.timeline()
            .add(() => introTextEffect(container), 0)
            .add(() => elemScaleUp(introTextWrapper, 30), 5.4)
            .add(() => elemFadeOut(introTextWrapper), 5.65)
            .add(() => elemFadeIn(home.hamburger), 6)
            .add(() => elemFadeIn(home.scoreWrapper), 6.25)
            .add(() => yPercentOpacityReturn(home.marqueeSection), 6.5)
            .add(() => marqueeScrollEffect(), 6.75)
            .add(() => cursorInit(container), 6.75)
            .add(() => shootingEffect(), 6.75)
            .add(() => addBtnHoverAnimations(container), 6.75)
    } else {
        gsap.timeline()
            // .add(() => introTextEffect(container), 0)
            // .add(() => elemScaleUp(introTextWrapper, 30), 5.4)
            // .add(() => elemFadeOut(introTextWrapper), 5.65)
            .add(() => elemFadeIn(home.hamburger), 0)
            .add(() => elemFadeIn(home.scoreWrapper), 0.25)
            .add(() => yPercentOpacityReturn(home.marqueeSection), 0.5)
            .add(() => marqueeScrollEffect(), 0.75)
            .add(() => cursorInit(container), 0.75)
            .add(() => shootingEffect(), 0.75)
            .add(() => addBtnHoverAnimations(container), 0.75)
    }
}


const addBtnHoverAnimations = (container) => {

    const btns = container.querySelectorAll('.popup-button-wrapper > .btn')

    btns.forEach(btn => {

        const textElem = btn.querySelector('.btn-text')
        const emojiElem = btn.querySelector('.btn-text-emoji-home')

        btn.addEventListener('mouseenter', () => {
            gsap.killTweensOf([textElem, emojiElem]);
            gsap.to(emojiElem, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: 'Power4.out',
            });
            gsap.to(textElem, {
                y: 120,
                opacity: 0,
                duration: 0.5,
                ease: 'Power4.out',
            });
        });


        btn.addEventListener('mouseleave', () => {
            gsap.killTweensOf([textElem, emojiElem]);
            gsap.to(emojiElem, {
                y: 110,
                duration: 0.5,
                opacity: 0,
                ease: 'Power4.out',
            });
            gsap.to(textElem, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: 'Power4.out',
            });
        });
    });
}
