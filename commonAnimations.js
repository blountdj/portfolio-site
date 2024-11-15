
import { textSplit, wordsSplit, emojisList } from "./utilities.js";


export const h1LoadInit = (container) => {
    // console.log('h1LoadInit')

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

export const elemScaleUp = (elem, scaleTo, ease='power2.out') => {
    gsap.to(elem, {
        scale: scaleTo,
        opacity: 1,
        duration: 0.75,
        ease: ease,
    })
}


// export const elemScaleUp2 = (elem, scaleTo) => {
//     gsap.to(elem, {
//         scale: scaleTo,
//         opacity: 1,
//         duration: 0.75,
//         ease: "back.inOut(1.7)",
//     })
// }

export const elemScaleTo1RightToLeft = (elem) => {
    gsap.to(elem, {
        scaleX: 1,
        transformOrigin: 'right',
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

export const xPercentOpacityReturn = (elem) => {
    gsap.to(elem, {
        xPercent: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.inout',
    })
}

export const staggerOpacityToOneEffect = (elems) => {
    gsap.to(elems, {
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        stagger: {
            each: 0.075,
            // from: "random"
        },
        
    })
}

export const staggerOpacityAndScaleToOneEffect = (elems) => {
    gsap.to(elems, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.inOut",
        stagger: {
            each: 0.075,
            // from: "random"
        },
        
    })
}

export const addH1HoverAnimations = (h1Chars) => {
    h1Chars.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            gsap.to(el, {
                textShadow: '0 0 12px var(--lighter-green)',
                duration: 0.15,
                ease: 'Power4.inout',
            });
        });
    });

    h1Chars.forEach((el) => {
        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                textShadow: '0 0 7px var(--lighter-green)',
                duration: 0.15,
                ease: 'Power4.inout',
            });
        });
    });
}

export const addDarrenH2Animations = (darrenH2) => {

    const heading = darrenH2.querySelector('.h2-heading');
    wordsSplit(heading)

    const h2Emoji = darrenH2.querySelector('.h2-emoji');
    gsap.set(h2Emoji, {opacity: 0, scale: 0.0})

    const wordElems = heading.querySelectorAll('.word');
    wordElems.forEach(wordElem => {
        wordElem.addEventListener('mouseenter', () => {
            h2Emoji.textContent = emojisList[Math.floor(Math.random() * emojisList.length)];
            gsap.to(h2Emoji, {opacity: 1, scale: 1, duration: 0.1, ease: 'Power4.inOut'})
        })

        wordElem.addEventListener('mouseleave', () => {
            gsap.to(h2Emoji, {opacity: 0, scale: 0, duration: 0.1, ease: 'Power4.inOut'})
        })
    })     
}

export const h1ShineEffect = (h1Chars) => { 
    h1Chars.forEach((char, index) => {
      setTimeout(() => {
        gsap.timeline()
          .add(gsap.to(char, {
            textShadow: '0 0 16px var(--lighter-green)',
            duration: 0.14,
            ease: 'elastic.out(1, 0.3)'
            }, 0))
          .add(gsap.to(char, {
              textShadow: '0 0 7px var(--lighter-green)',
              duration: 0.14,
              ease: 'elastic.out(1, 0.3)'
            }, 0.2))
        }, index * 40); 
    });
}

export const moveRightFiveOpacityOne = (elem) => {
    gsap.to(elem, {
        right: '5%',
        opacity: 1,
        duration: 1.25,
        // ease: 'power2.inOut',
        ease: "back.inOut(1.7)",
    })
}

export const moveLeftFiveOpacityOne = (elem) => {
    gsap.to(elem, {
        left: '5%',
        opacity: 1,
        duration: 1.25,
        // ease: 'power2.inOut',
        ease: "back.inOut(1.7)",
    })
}

export const imageStationaryAnimation = (elems) => {

    let tl = gsap.timeline({ repeat: -1, yoyo: true, ease: 'power1.inOut' });
  
    if (elems.length > 0) {
        elems.forEach(elem => {
            tl.to(elem, {
                x: '-=2.5',
                y: '+=2.5',
                duration: 0.5
            });
        });
    } else {
        tl.to(elems, {
            x: '-=2.5',
            y: '+=2.5',
            duration: 0.5
        });
    }
  };