console.log('barbaInit.js loaded')

import { CONFIG } from "./config.js";
import { hamburgerInit } from "./hamburger.js";
import { menuInit } from "./menu.js";
import { portfolioInit } from "./portfolio.js";
import { homeInit, homeAnimate } from "./home.js";
import { projectPageAnimate, projectPageInit } from "./project-page.js";
import { aboutInit } from "./about.js";
import { contactInit } from "./contact.js";

import { 
//     // textSplit,
    removeScriptFromBody,
    addScriptToBody,
    disableScroll,
    enableScroll,
    addFilesCssToBody,
    removeCssFilesFromBody,
} from "./utilities.js";
// import { imgTransitionAnimation, introElementsReset } from "./animations.js";

// const pageIdentifierTextEnter = async (data) => {
//     // console.log('\n\n### pageIdentifierTextEnter')

//     let pageIdentifierTextElem = data.next.container.querySelector('.page-identifer-text')
//     // console.log('pageIdentifierTextElem - barba.hooks.enter:', pageIdentifierTextElem)

//     textSplit(pageIdentifierTextElem)

//     return new Promise((resolve) => {
//         gsap.set('.page-identifer-text', {opacity: 1})
//         gsap.set('.page-identifer-text > .word >.char', {opacity: 0})
//         gsap.to('.page-identifer-text > .word > .char', {
//             opacity: 1,
//             duration: 1.575,
//             stagger: {
//                 from: "random",
//                 each: 0.075,
//             },
//             ease: "power2.out",
//             onComplete: () => {
//                 resolve()
//             }
//         })
//     })
// }

// const pageIdentifierTextLeave = (data) => {
//     // console.log('pageIdentifierTextLeave')
//     // console.log('data.next.namespace:', data.next.namespace)
//     let pageIdentifierTextElem = document.querySelector('.page-identifer-text')
//     // console.log('pageIdentifierTextElem0:', pageIdentifierTextElem)

//     return new Promise((resolve) => {
//         // gsap.set(pageIdentifierTextSplit.chars, { opacity: 0 });
//         gsap.to('.char', {
//             opacity: 0,
//             duration: 1.575,
//             stagger: {
//                 from: "random",
//                 each: 0.075,
//             },
//             ease: "power2.out",
//             onComplete: () => {
//                 resolve()
//                 pageIdentifierTextElem.textContent = data.next.namespace;
//             }
//         })
//     })
// }

const animationFadeInEnter = ((container) => {
    console.log('------animationFadeInEnter')
    // gsap.from(container, {
    const app = container.querySelector('.main-wrapper')
    console.log('app:', app)
    return new Promise((resolve) => {
        gsap.from(app, {
            duration: 1.5,
            // autoAlpha: 0,
            opacity: 0,
            // scale: 0.5,
            ease: 'power4.out',
            // clearProps: true
            onComplete: () => {
                // setTimeout(() => {
                    resolve()
                // }, 2000)
            }
        })
    })
})

export const animationFadeOutLeave = (container) => {
// const animationFadeOutLeave = (data) => {

    const app = container.querySelector('.main-wrapper')
    console.log('------animationFadeOutLeave');
    return new Promise((resolve) => {
        // gsap.set('.char', { opacity: 0 });
        // gsap.to(container, {
        gsap.to(app, {
        // gsap.to('.main-wrapper', {
            duration: 1.5,
            // duration: 3,
            // autoAlpha: 0,
            opacity: 0,
            // scale: 0.5,
            ease: 'power4.out',
            // clearProps: true,
            onComplete: () => {
                resolve()
            }
        });
    });
};


// const homeJsFileUrl = `http://127.0.0.1:5500/home.js`
// const aboutJsFileUrl = `http://127.0.0.1:5500/aboutTester.js`
// const contactJsFileUrl = `http://127.0.0.1:5500/contactTester.js`
// const portfolioJsFileUrl = `http://127.0.0.1:5500/portfolio.js`
// const testerJsFileUrl = `http://127.0.0.1:5500/tester.js`

const projectPages = ['audiophile', 'arch', 'designo']

const homeCssFileUrl = `http://127.0.0.1:5500/home.css`
const portfolioCssFileUrl = `http://127.0.0.1:5500/portfolio.css`
const projectsCssFileUrl = `http://127.0.0.1:5500/project-page.css`
const aboutCssFileUrl = `http://127.0.0.1:5500/about.css`
const contactCssFileUrl = `http://127.0.0.1:5500/contact.css`



// const pageSpecificScriptUrl = `https://cdn.jsdelivr.net/gh/blountdj/arch-studio@v1/home.js`



barba.hooks.beforeEnter((data) => {
//     // window.scrollTo(0, 0); // Scroll to the top of the page
    console.log('## BEFORE ENTER')
    // setTimeout(() => {
    //     window.scrollTo(0, 0);
    //     disableScroll()
    //     // gsap.set('.page-identifer-text > .word > .char', {
    //     //     color: 'white',
    //     // })
    // }, 100); // Adjust the delay time as needed
    
    // const currentPageId = data.next.namespace;

    const nextPageId = data.next.namespace;

    if (nextPageId === 'home') {
        homeInit(data.next.container)
    } else if (nextPageId === 'portfolio') {
        portfolioInit(data.next.container)
    } else if (projectPages.includes(nextPageId)) {
        projectPageInit(data.next.container)
    }

    hamburgerInit(data.next.container)
    menuInit(data.next.container)


    // currentPageId === 'portfolio' ? addScriptToBody(portfolioJsFileUrl) : removeScriptFromBody(portfolioJsFileUrl)
    // currentPageId === 'portfolio' ? addFilesCssToBody([portfolioCssFileUrl]) : removeCssFilesFromBody([portfolioCssFileUrl] )

    // if (data.next.namespace === 'home') {
    //     homeAnimationInit(data.next.container)
    // } else if (data.next.namespace === 'portfolio') {
    //     initPortfolio(data.next.container)
    // } else if (data.next.namespace === 'about us') {
    //     aboutAnimationInit(data.next.container)
    // } else if (data.next.namespace === 'contact') {
    //     contactAnimationInit(data.next.container)
    // }
});


barba.hooks.once(async (data) => {
    console.log('barba.hooks.once');
    // introAnimation(data, 3.25)
    // await introAnimation(data)

    if (data.next.namespace === 'home') {
        homeAnimate(data.next.container, 'once')
    //     homeAnimationEnter(data.next.container)
    } else if (data.next.namespace === 'portfolio') {
        portfolioInit(data.next.container)
    //     animatePortfolioEnter(data.next.container)
    } else if (projectPages.includes(data.next.namespace )) {
        projectPageAnimate(data.next.container)
    } else if (data.next.namespace === 'about') {
        aboutInit(data.next.container)
    } else if (data.next.namespace === 'contact') {
        contactInit(data.next.container)
    }
    // } else if (data.next.namespace === 'about us') {
    //     aboutAnimationEnter(data.next.container)
    // } else if (data.next.namespace === 'contact') {
    //     contactAnimationEnter(data.next.container)
    // }
});


barba.hooks.afterEnter((data) => {
    console.log('barba.hooks.afterEnter')
    const currentPageId = data.current.namespace;
    const nextPageId = data.next.namespace;
    console.log('currentPageId:', currentPageId)

    
        
    // currentPageId === 'home' ? addScriptToBody(homeJsFileUrl) : removeScriptFromBody(homeJsFileUrl)
    // currentPageId === 'about us' ? addScriptToBody(aboutJsFileUrl) : removeScriptFromBody(aboutJsFileUrl)
    // currentPageId === 'contact' ? addScriptToBody(contactJsFileUrl) : removeScriptFromBody(contactJsFileUrl)
    
    nextPageId === 'home' ? addFilesCssToBody([homeCssFileUrl]) : removeCssFilesFromBody([homeCssFileUrl] )
    nextPageId === 'portfolio' ? addFilesCssToBody([portfolioCssFileUrl]) : removeCssFilesFromBody([portfolioCssFileUrl] )
    nextPageId === 'about' ? addFilesCssToBody([aboutCssFileUrl]) : removeCssFilesFromBody([aboutCssFileUrl] )
    nextPageId === 'contact' ? addFilesCssToBody([contactCssFileUrl]) : removeCssFilesFromBody([contactCssFileUrl] )
    
    if (projectPages.includes(nextPageId) && !projectPages.includes(currentPageId)) {
        // addScriptsToBody([designJsFileUrl]);
        addFilesCssToBody([projectsCssFileUrl]);
    } else if (projectPages.includes(currentPageId) && !projectPages.includes(nextPageId)) {
        // removeScriptsFromBody([designJsFileUrl]);
        removeCssFilesFromBody([projectsCssFileUrl]);
    }

    projectsCssFileUrl


});


barba.init({
    debug: CONFIG.barbaDebug,
    sync: false,
    views: [],
    transitions: [
        {
            name: 'page-fade-transition',
            // to: { namespace: ['todo'] },
            once() {},
            async leave(data) {
                console.log('\n\nLEAVE')
                animationFadeOutLeave(data.current.container);
                // await introElementsReset()

                // if (data.next.namespace === 'home') {
                //     homeInit(data.next.container)
                // } 
                console.log('LEAVE END')
                
            },
            async enter(data) {
                console.log('\n\nENTER')
                // introAnimation(data)
                // introAnimation(data);

                const nextPage = data.next.namespace;

                // animationFadeInEnter(data.next.container);


                if (nextPage === 'home') {
                    homeAnimate(data.next.container, 'enter')
                    // animationFadeInEnter(data.next.container);
                //     setTimeout(() => {
                //         homeAnimationEnter(data.next.container)
                //     }, 3000);
                } else if (nextPage === 'portfolio') {
                    portfolioInit(data.next.container)
                    // animationFadeInEnter(data.next.container);
                //     setTimeout(() => {
                //         animatePortfolioEnter(data.next.container)
                    // }, 3250);
                } else if (projectPages.includes(nextPage)) {
                    projectPageAnimate(data.next.container)
                    // animationFadeInEnter(data.next.container);
                } else if (nextPage === 'about') {
                    aboutInit(data.next.container)
                    // animationFadeInEnter(data.next.container);
                // } else if (nextPage === 'about us') {
                //     setTimeout(() => {
                //         aboutAnimationEnter(data.next.container)
                //     }, 3250);
                // } else if (nextPage === 'contact') {
                //     setTimeout(() => {
                //         contactAnimationEnter(data.next.container)
                //     }, 3250);
                } else if (nextPage === 'contact') {
                    contactInit(data.next.container)
                    // animationFadeInEnter(data.next.container);
                //     setTimeout(() => {
                //         animatePortfolioEnter(data.next.container)
                    // }, 3250);
                }else {
                    animationFadeInEnter(data.next.container);
                }

                console.log('FINISH ENTER')
            },
        },
    ]
});
