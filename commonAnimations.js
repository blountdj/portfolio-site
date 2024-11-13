
import { textSplit } from "./utilities.js";

export const h1LoadInit = (container) => {
    console.log('h1LoadInit')

    const h1 = container.querySelector('h1')
    textSplit(h1)

    // Get the existing "char" element
    const wordElems = container.querySelectorAll('.page-h1 > .word');
    gsap.set(wordElems, {
        display: "flex"
    });

    // console.log('charElements', charElements)
    wordElems.forEach(wordElem => {
        const charElements = wordElem.querySelectorAll('.page-h1 > .word >.char');
        gsap.set(charElements, {
            x: 100,
            opacity: 0
        });

        charElements.forEach(charElement => {
            // Create a new div element
            const newDiv = document.createElement('div');
            newDiv.classList.add('char-wrapper')

            // Append the existing "char" element as a child of the new div
            newDiv.appendChild(charElement);
            wordElem.appendChild(newDiv)
            // Replace the original "char" element with the new div
            // charElement.parentNode.replaceChild(newDiv, charElement);
        })
    })

}


export const h1LoadEffect = (container) => {


    const charElements2 = container.querySelectorAll('.page-h1 > .word > .char-wrapper > .char');
    gsap.to(charElements2, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        stagger: {
            each: 0.075,
            from: "random"
        },
        
    })
}

export const elemFadeIn = (elem) => {
    gsap.to(elem, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
    })
}

export const elemScaleUp = (elem, scaleTo) => {
    gsap.to(elem, {
        scale: scaleTo,
        duration: 0.75,
        ease: 'power2.out',
    })
}



export const elemFadeOut = (elem) => {
    gsap.to(elem, {
        autoAlpha: 0,
        duration: 0.5,
        ease: 'power2.out',
    })
}

export const yPercentOpacityReturn = (elem) => {
    gsap.to(elem, {
        yPercent: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.inout',
    })
}