console.log('project-page.js')

const app = document.querySelector('.app');

const frame = document.querySelector('.project-image-frame'),
    frameFigure = frame.querySelector('.project-image-frame-figure'),
    frameImage = frame.querySelector('.image-panel-slide-item-image')
const frameOverlay = document.querySelector('.project-image-frame-overlay'); // green

const gallery = document.querySelector('.project-thumbnails-wrapper')
const galleryImages = gallery.querySelectorAll('.project-thumbnail-image');
const imagePanelText = document.querySelector('.image-panel-slide-item-h3');

let currentImage = null;

const visitSiteBtn = document.querySelector('.btn-project');

const thumbsUpEmoji = document.querySelector('.btn-text-emoji.is-thumbsup');
const pointerEmoji = document.querySelector('.btn-text-emoji.is-pointer');

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


const init = () => {
    addEventListeners();
    // buttonHoverAnimations();
    gsap.set(thumbsUpEmoji, {yPercent: 600});


};

const thumbnailClick = (e) => {
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

const addEventListeners = () => {
    galleryImages.forEach((el) => {
        el.addEventListener('click', thumbnailClick);
    });


};

window.onload = () => {
    init();
};

