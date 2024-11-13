console.log('home.js')

import { marqueeScrollEffect } from "./marquee.js";
import { introTextEffect } from "./introTextEffect.js"; 
import { cursorInit } from "./cursor.js";
import { shootingEffect } from "./shooting.js";

import { 
    elemFadeIn,
    elemFadeOut, 
    yPercentOpacityReturn,
    elemScaleUp
 } from "./commonAnimations.js";

export const homeInit = (container) => {
    console.log('homeInit')

    return new Promise((resolve) => {
        const hamburger = container.querySelector('.hamburger')
        const scoreWrapper = container.querySelector('.score-wrapper')
        const marqueeSection = container.querySelector('.home-marquee-section')
        gsap.set([hamburger, scoreWrapper, marqueeSection], {
            opacity: 0
        })
        gsap.set('.home-marquee-section', {
            yPercent: 100
        })
        resolve()
    })
}

export const homeAnimate = (container, type) => {
    console.log('homeAnimate')

    const introTextWrapper = container.querySelector('.intro-text-wrapper')
    const hamburger = container.querySelector('.hamburger')
    const scoreWrapper = container.querySelector('.score-wrapper')
    const marqueeSection = container.querySelector('.home-marquee-section')


    if (type === 'once') {
        gsap.timeline()
            .add(() => introTextEffect(container), 0)
            .add(() => elemScaleUp(introTextWrapper, 30), 5.4)
            .add(() => elemFadeOut(introTextWrapper), 5.65)
            .add(() => elemFadeIn(hamburger), 6)
            .add(() => elemFadeIn(scoreWrapper), 6.25)
            .add(() => yPercentOpacityReturn(marqueeSection), 6.5)
            .add(() => marqueeScrollEffect(), 6.75)
            .add(() => cursorInit(container), 6.75)
            .add(() => shootingEffect(), 6.75)
            .add(() => addBtnHoverAnimations(container), 6.75)
    } else{
        gsap.timeline()
        // .add(() => introTextEffect(container), 0)
        // .add(() => elemScaleUp(introTextWrapper, 30), 5.4)
        // .add(() => elemFadeOut(introTextWrapper), 5.65)
        .add(() => elemFadeIn(hamburger), 0)
        .add(() => elemFadeIn(scoreWrapper), 0.25)
        .add(() => yPercentOpacityReturn(marqueeSection), 0.5)
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
            // pointerEmoji.classList.add('no-animation');
            gsap.to(emojiElem, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: 'Power4.out',
                // onComplete: () => {
                //     thumbsUpEmoji.classList.remove('no-animation');
                // },
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
                // onStart: () => {
                //     thumbsUpEmoji.classList.add('no-animation');
                // },
            });
            gsap.to(textElem, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: 'Power4.out',
                // onComplete: () => {
                //     pointerEmoji.classList.remove('no-animation');
                // },
            });
        });
    });
}
