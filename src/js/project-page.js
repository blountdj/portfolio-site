// console.log('project-page.js')

// import { CONFIG } from "https://cdn.jsdelivr.net/gh/blountdj/portfolio-site@v5/min/js/config.js";
import { CONFIG } from "https://cdn.jsdelivr.net/gh/blountdj/portfolio-site@v8/min/js/config.min.js";

const {
    h1LoadInit,
    h1LoadEffect,
    elemFadeIn,
    yPercentOpacityReturn,
    xPercentOpacityReturn,
    elemScaleTo1Center,
    elemScaleUp,
    staggerOpacityToOneEffect,
    staggerOpacityAndScaleToOneEffect,
    addDarrenH2Animations,
    h1ShineEffect,
    imageStationaryAnimation
} = await import(`${CONFIG.path}${CONFIG.jsFolder}commonAnimations${CONFIG.jsPostFix}.js`);


const project = {
    items: null,
    liveBtn: null,
    portfolioTextWrapper: null,
    frameFigure: null,
    projectThumbnails: null,
    imagePanelText: null,
    darrenH2: null,
    projectH2: null,
    projectParagraph: null,
    thumbsUpEmoji: null,
    pointerEmoji: null,
}

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
    // console.log('thumbnailClick')
    const getSrc = e.srcElement.attributes.src.nodeValue;
    const imageText = e.srcElement.getAttribute('data-text');

    // TODO -check to see if image is already loaded
    gsap.timeline()
        .to(frameOverlay, {
            duration: 0.3,
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            delay: 0.2,
            ease: 'Power4.out',
            onComplete: () => {
                gsap.set(frameImage, { attr: { src: getSrc, srcset: getSrc } });
                imagePanelText.textContent = imageText;
            },
        })
        .to(frameOverlay, {
            duration: 0.5,
            clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
            ease: 'Power4.out',
            onComplete: () => {
                gsap.set(frameOverlay, { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' });
            },
        });
};

const addEventListeners = (galleryImages, frameOverlay, frameImage, imagePanelText) => {
    galleryImages.forEach((el) => {
        el.addEventListener('click', (e) => thumbnailClick(e, frameOverlay, frameImage, imagePanelText));
    });
};

export const projectPageInit = (container) => {
    // console.log('projectPageInit')
    h1LoadInit(container)

    project.hamburger = container.querySelector('.hamburger');
    project.liveBtn = container.querySelector('.link-block-3');
    project.portfolioTextWrapper = container.querySelector('.marquee-part');
    project.frameFigure = container.querySelector('.project-image-frame-figure2');
    project.projectThumbnails = container.querySelectorAll('.project-thumbnail-image');
    project.imagePanelText = container.querySelector('.image-panel-slide-item-h3');
    project.darrenH2 = container.querySelector('.h2-wrapper');
    project.projectH2 = container.querySelector('.project-h2');
    project.projectParagraph = container.querySelectorAll('.project-paragraph');
    project.thumbsUpEmoji = container.querySelector('.btn-text-emoji.is-thumbsup');
    project.pointerEmoji = container.querySelector('.btn-text-emoji.is-pointer');


    gsap.set([project.hamburger, project.projectH2, project.projectParagraph], {
        opacity: 0,
    })

    gsap.set(project.liveBtn, {
        xPercent: 100,
        opacity: 0,
    })

    gsap.set(project.portfolioTextWrapper, {
        scaleX: 0,
    })

    gsap.set([project.imagePanelText, project.darrenH2], {
        yPercent: -105,
        opacity: 0,
    })

    gsap.set(project.thumbsUpEmoji, {
        yPercent: 650,
    })

    gsap.set([project.frameFigure, project.projectThumbnails], {
        opacity: 0,
        scale: 0.0,
    })

};

export const projectPageAnimate = (container) => {
    // console.log('projectPageAnimate')

    const frameOverlay = container.querySelector('.project-image-frame-overlay');
    const frameImage = container.querySelector('.image-panel-slide-item-image');

    const h1Chars = container.querySelectorAll('.page-h1 > .word > .char-wrapper > .char');

    const thumbNails = container.querySelectorAll('.thumbnail-image-wrapper');

    const screenWidth = window.innerWidth;
    if (screenWidth > 991) {
        gsap.timeline()
            .add(() => elemScaleUp(project.frameFigure, 1), 0.3)
            .add(() => elemFadeIn(project.projectH2), 0.5)
            .add(() => yPercentOpacityReturn(project.imagePanelText), 0.75)
            .add(() => staggerOpacityToOneEffect(project.projectParagraph), 0.5)
            .add(() => staggerOpacityAndScaleToOneEffect(project.projectThumbnails), 0.75)

            .add(() => elemScaleTo1Center(project.portfolioTextWrapper), 1.75)
            .add(() => h1LoadEffect(container), 2.0)
            .add(() => xPercentOpacityReturn(project.liveBtn), 2.25)
            .add(() => yPercentOpacityReturn(project.darrenH2), 3)

            .add(() => elemFadeIn(project.hamburger), 3)

            .add(() => addBtnHoverAnimations(project.liveBtn, project.thumbsUpEmoji, project.pointerEmoji), 3)
            .add(() => addEventListeners(project.projectThumbnails, frameOverlay, frameImage, project.imagePanelText), 3)
            // .add(() => addH1HoverAnimations(h1Chars), 3)
            .add(() => setInterval(() => h1ShineEffect(h1Chars), 10000), 3)
            .add(() => addDarrenH2Animations(project.darrenH2), 3)
            .add(() => imageStationaryAnimation(thumbNails), 3)
    } else {
        gsap.timeline()

            .add(() => elemFadeIn(project.projectH2), 0.3)
            .add(() => staggerOpacityToOneEffect(project.projectParagraph), 0.3)
            .add(() => staggerOpacityAndScaleToOneEffect(project.projectThumbnails), 0.75)

            .add(() => yPercentOpacityReturn(project.imagePanelText), 1.75)
            .add(() => elemScaleUp(project.frameFigure, 1), 1.75)

            .add(() => elemScaleTo1Center(project.portfolioTextWrapper), 2.15)
            .add(() => h1LoadEffect(container), 2.25)
            .add(() => xPercentOpacityReturn(project.liveBtn), 3.5)
            .add(() => yPercentOpacityReturn(project.darrenH2), 3.8)

            .add(() => elemFadeIn(project.hamburger), 4.25)

            .add(() => addBtnHoverAnimations(project.liveBtn, project.thumbsUpEmoji, project.pointerEmoji), 3)
            .add(() => addEventListeners(project.projectThumbnails, frameOverlay, frameImage, project.imagePanelText), 3)
            // .add(() => addH1HoverAnimations(h1Chars), 3)
            .add(() => setInterval(() => h1ShineEffect(h1Chars), 10000), 3)
            .add(() => addDarrenH2Animations(project.darrenH2), 3)
            .add(() => imageStationaryAnimation(thumbNails), 3)
    }
}
