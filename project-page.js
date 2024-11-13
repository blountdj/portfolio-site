console.log('project-page.js')

import { 
    h1LoadInit, 
    h1LoadEffect
 } from "./commonAnimations.js";


const addBtnHoverAnimations = (visitSiteBtn, thumbsUpEmoji, pointerEmoji) => {
    visitSiteBtn.addEventListener('mouseenter', () => {
        gsap.killTweensOf([thumbsUpEmoji, pointerEmoji]); 
        pointerEmoji.classList.add('no-animation');
        gsap.to(thumbsUpEmoji, {
            yPercent: 0,
            duration: 0.5,
            ease: 'Power4.out',
            onComplete: () => {
                thumbsUpEmoji.classList.remove('no-animation');
            },
        });
        gsap.to(pointerEmoji, {
            yPercent: -650,
            duration: 0.5,
            ease: 'Power4.out',
        });
    });


    visitSiteBtn.addEventListener('mouseleave', () => {
        gsap.killTweensOf([thumbsUpEmoji, pointerEmoji]); 
        gsap.to(thumbsUpEmoji, {
            yPercent: 600,
            duration: 0.5,
            // delay: 0.5,
            ease: 'Power4.out',
            onStart: () => {
                thumbsUpEmoji.classList.add('no-animation');
            },
        });
        gsap.to(pointerEmoji, {
            yPercent: 0,
            duration: 0.5,
            ease: 'Power4.out',
            onComplete: () => {
                pointerEmoji.classList.remove('no-animation');
            },
        });
    });
}


const thumbnailClick = (e, frameOverlay, frameImage, imagePanelText) => {
    const getSrc = e.srcElement.attributes.src.nodeValue;

    const imageText = e.srcElement.getAttribute('data-text');
    
    // TODO -check to see if image is already loaded
    gsap.timeline()
        .to(frameOverlay, {
            duration: 0.3,
            x: 0,
            delay: 0.2,
            ease: 'Power4.out',
            onComplete: () => {
                gsap.set(frameImage, { attr: { src: getSrc, srcset: getSrc } });
                imagePanelText.textContent = imageText;
            },
        })
        .to(frameOverlay, {
            duration: 0.5,
            x: '-101%',
            ease: 'Power4.out',
            onComplete: () => {
                gsap.set(frameOverlay, { x: '101%' });
            },
        });
};

const addEventListeners = (galleryImages, frameOverlay, frameImage, imagePanelText) => {
    galleryImages.forEach((el) => {
        el.addEventListener('click', (e) => thumbnailClick(e, frameOverlay, frameImage, imagePanelText));
    });
};

export const projectPageInit = (container) => {
    h1LoadInit(container)

    const hamburger = container.querySelector('.hamburger');
    const liveBtn = container.querySelector('.link-block-3');
    const portfolioTextWrapper = container.querySelector('.portfolio-page-text-wrapper');
    const frameFigure = container.querySelector('.project-image-frame-figure');
    const projectThumbnailsWrapper = container.querySelectorAll('.project-thumbnails-wrapper');
    const imagePanelText = container.querySelector('.image-panel-slide-item-h3');
    const projectH2 = container.querySelector('.project-h2');
    const projectParagraph = container.querySelectorAll('.project-paragraph');
    // hide elements


    gsap.set([hamburger, projectH2, projectParagraph], {
        opacity: 0,
    })

    gsap.set(liveBtn, {
        x: '100%',
        opacity: 0,
    })

    gsap.set(portfolioTextWrapper, {
        y: '105%',
        opacity: 0,
    })

    gsap.set(imagePanelText, {
        y: '-105%',
        opacity: 0,
    })

    gsap.set([frameFigure, projectThumbnailsWrapper], {
        opacity: 0,
        scale: 0.0,
    })

};

export const projectPageAnimate = (container) => {
    console.log('projectPageAnimate')

    h1LoadEffect(container)
    const liveBtn = container.querySelector('.link-block-3');
    
        // const app = container.querySelector('.app');

    //     const frame = container.querySelector('.project-image-frame'),
    //     // frameFigure = frame.querySelector('.project-image-frame-figure'),
    //     frameImage = frame.querySelector('.image-panel-slide-item-image')
    // const frameOverlay = container.querySelector('.project-image-frame-overlay'); // green
    
    // const gallery = container.querySelector('.project-thumbnails-wrapper')
    // const galleryImages = gallery.querySelectorAll('.project-thumbnail-image');
    // const imagePanelText = container.querySelector('.image-panel-slide-item-h3');
    
    // // let currentImage = null;
    
    // const visitSiteBtn = container.querySelector('.btn-project');
    
    // const thumbsUpEmoji = container.querySelector('.btn-text-emoji.is-thumbsup');
    // const pointerEmoji = container.querySelector('.btn-text-emoji.is-pointer');




    // h1LoadEffect(container)

    // addEventListeners(galleryImages, frameOverlay, frameImage, imagePanelText);
    // // buttonHoverAnimations();
    // gsap.set(thumbsUpEmoji, {yPercent: 600});

    // addBtnHoverAnimations(visitSiteBtn, thumbsUpEmoji, pointerEmoji)
}


