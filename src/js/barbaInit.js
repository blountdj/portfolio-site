// console.log('barbaInit.js loaded')

// import { CONFIG_DEV } from "./config.js";
import { CONFIG_PROD } from "https://cdn.jsdelivr.net/gh/blountdj/portfolio-site@v29/dist/js/config.min.js";
// import { CONFIG_PROD } from "https://cdn.jsdelivr.net/gh/blountdj/portfolio-site@v29/src/js/config.js";

const CONFIG = CONFIG_PROD

const { hamburgerInit } = await import(`${CONFIG.path}${CONFIG.jsFolder}hamburger${CONFIG.jsPostFix}.js`);
const { menuInit } = await import(`${CONFIG.path}${CONFIG.jsFolder}menu${CONFIG.jsPostFix}.js`);
// const { portfolioInit, portfolioAnimate } = await import(`${CONFIG.path}${CONFIG.jsFolder}portfolio${CONFIG.jsPostFix}.js`);
const { portfolioInit, portfolioAnimate } = await import(`${CONFIG.path}src/js/portfolio.js`);
const { homeInit, homeAnimate } = await import(`${CONFIG.path}${CONFIG.jsFolder}home${CONFIG.jsPostFix}.js`);
const { projectPageAnimate, projectPageInit } = await import(`${CONFIG.path}${CONFIG.jsFolder}project-page${CONFIG.jsPostFix}.js`);
const { aboutInit, aboutAnimations } = await import(`${CONFIG.path}${CONFIG.jsFolder}about${CONFIG.jsPostFix}.js`);
const { contactInit, contactAnimations } = await import(`${CONFIG.path}${CONFIG.jsFolder}contact${CONFIG.jsPostFix}.js`);
const { waveEffectInit } = await import(`${CONFIG.path}${CONFIG.jsFolder}wave-effect${CONFIG.jsPostFix}.js`);


const {
    addFilesCssToBody,
    removeCssFilesFromBody,
} = await import(`${CONFIG.path}${CONFIG.jsFolder}utilities${CONFIG.jsPostFix}.js`);

const {
    elemFadeOut,
    initGridTransitionAnimation,
    showGridTransitionAnimation,
    hideGridTransitionAnimation
} = await import(`${CONFIG.path}${CONFIG.jsFolder}commonAnimations${CONFIG.jsPostFix}.js`);


const homeCssFileUrl = `${CONFIG.cssPath}${CONFIG.cssFolder}css/home${CONFIG.cssPostFix}.css`
const portfolioCssFileUrl = `${CONFIG.cssPath}${CONFIG.cssFolder}css/portfolio${CONFIG.cssPostFix}.css`
const projectsCssFileUrl = `${CONFIG.cssPath}${CONFIG.cssFolder}css/project-page${CONFIG.cssPostFix}.css`
const aboutCssFileUrl = `${CONFIG.cssPath}${CONFIG.cssFolder}css/about${CONFIG.cssPostFix}.css`
const contactCssFileUrl = `${CONFIG.cssPath}${CONFIG.cssFolder}css/contact${CONFIG.cssPostFix}.css`


const animationFadeInEnter = ((container) => {
    // console.log('------animationFadeInEnter')
    const app = container.querySelector('.main-wrapper')
    return new Promise((resolve) => {
        gsap.from(app, {
            duration: 1.5,
            opacity: 0,
            ease: 'power4.out',
            // clearProps: true
            onComplete: () => {
                resolve()
            }
        })
    })
})


const projectPages = ['audiophile', 'arch', 'designo']


function fallElements(selector, delay, staggerAmount) {
    // console.log('fallElements:', selector)

    const divNum = selector.length > 5 ? -1 : 1
    const viewportHeight = (window.innerHeight) / divNum;

    gsap.to(selector, {
        y: viewportHeight + 200,
        rotation: gsap.utils.random(-180, 180, 5), // more extreme rotation
        opacity: 0,
        duration: gsap.utils.random(0.8, 1.6, 0.1), // random duration per element
        ease: "power3.in",
        delay: delay,
        stagger: {
            amount: staggerAmount,
            from: "random",
            ease: "power1.inOut"
        },
        transformOrigin: "center center",
        x: gsap.utils.random(-100, 100, 5), // add some horizontal movement
    });
}


barba.hooks.beforeLeave((data) => {
    // console.log('beforeLeave: animationType:', animationType)
    document.body.style.pointerEvents = 'none';
    document.body.style.cursor = 'wait';
})

barba.hooks.beforeEnter((data) => {
    //     // window.scrollTo(0, 0); // Scroll to the top of the page
    // console.log('## BEFORE ENTER')
    const nextPageId = data.next.namespace;

    waveEffectInit(data.next.container)

    if (nextPageId === 'home') {
        homeInit(data.next.container)
    } else if (nextPageId === 'portfolio') {
        portfolioInit(data.next.container)
    } else if (projectPages.includes(nextPageId)) {
        projectPageInit(data.next.container)
    } else if (nextPageId === 'contact') {
        contactInit(data.next.container)
    } else if (nextPageId === 'about') {
        aboutInit(data.next.container)
    }


    hamburgerInit(data.next.container)
    menuInit(data.next.container)

});

barba.hooks.once(async (data) => {
    // console.log('barba.hooks.once');

    if (data.next.namespace === 'home') {
        homeAnimate(data.next.container, 'once')
    } else if (data.next.namespace === 'portfolio') {
        portfolioAnimate(data.next.container)
    } else if (projectPages.includes(data.next.namespace)) {
        projectPageAnimate(data.next.container)
    } else if (data.next.namespace === 'about') {
        aboutAnimations(data.next.container)
    } else if (data.next.namespace === 'contact') {
        contactAnimations(data.next.container)
    }
});


barba.hooks.afterEnter((data) => {
    // console.log('barba.hooks.afterEnter')
    const currentPageId = data.current.namespace;
    const nextPageId = data.next.namespace;
    // console.log('currentPageId:', currentPageId)

    nextPageId === 'home' ? addFilesCssToBody([homeCssFileUrl]) : removeCssFilesFromBody([homeCssFileUrl])
    nextPageId === 'portfolio' ? addFilesCssToBody([portfolioCssFileUrl]) : removeCssFilesFromBody([portfolioCssFileUrl])
    nextPageId === 'about' ? addFilesCssToBody([aboutCssFileUrl]) : removeCssFilesFromBody([aboutCssFileUrl])
    nextPageId === 'contact' ? addFilesCssToBody([contactCssFileUrl]) : removeCssFilesFromBody([contactCssFileUrl])

    if (projectPages.includes(nextPageId) && !projectPages.includes(currentPageId)) {
        // addScriptsToBody([designJsFileUrl]);
        addFilesCssToBody([projectsCssFileUrl]);
    } else if (projectPages.includes(currentPageId) && !projectPages.includes(nextPageId)) {
        // removeScriptsFromBody([designJsFileUrl]);
        removeCssFilesFromBody([projectsCssFileUrl]);
    }

    nextPageId === 'home' ? document.body.style.cursor = 'none' : document.body.style.cursor = 'auto'
    setTimeout(() => {
        document.body.style.pointerEvents = 'auto';
    }, 3000);
});


let animationType;

barba.init({
    debug: CONFIG.barbaDebug,
    sync: false,
    views: [],
    transitions: [

        {
            name: 'page-fade-transition',
            // to: { namespace: ['todo'] },

            before: ({ trigger }) => {
                // console.log('BEFORE')
                // Store the animation type in a variable accessible to leave()
                animationType = trigger.dataset?.animation || 'normal';

            },

            once() { },
            async leave(data) {
                // console.log('\n\nLEAVE')

                const mainSection = data.current.container.querySelector('.main-section')
                elemFadeOut(mainSection)

                if (animationType === 'normal') {
                    return new Promise((resolve) => {
                        initGridTransitionAnimation()
                        showGridTransitionAnimation()
                        hideGridTransitionAnimation()
                        setTimeout(() => {
                            resolve()
                        }, 2000)
                    })

                } else if (animationType === 'menu') {
                    return new Promise((resolve) => {
                        const menuCharElems = data.current.container.querySelectorAll('.menu-link-p > span')
                        const menuImgElems = data.current.container.querySelectorAll('.menu-img')
                        const menuItems = data.current.container.querySelectorAll('.menu-item')
                        const mainSection = data.current.container.querySelector('.main-section')
                        gsap.set(mainSection, { opacity: 0 })

                        fallElements(menuCharElems, 0, 1.5)
                        fallElements(menuImgElems, 0.5, 1.5)
                        fallElements(menuItems, 1.8, 0.5)
                        setTimeout(() => {
                            resolve()
                        }, 4000)
                    })
                }
            },
            async enter(data) {
                // console.log('\n\nENTER')
                const nextPage = data.next.namespace;

                if (nextPage === 'home') {
                    homeAnimate(data.next.container, 'enter')
                } else if (nextPage === 'portfolio') {
                    portfolioAnimate(data.next.container)
                } else if (projectPages.includes(nextPage)) {
                    projectPageAnimate(data.next.container)
                } else if (nextPage === 'about') {
                    aboutAnimations(data.next.container)
                } else if (nextPage === 'contact') {
                    contactAnimations(data.next.container)
                } else {
                    animationFadeInEnter(data.next.container);
                }
            },
        },
    ]
});

