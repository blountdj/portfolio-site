console.log('project-page.js')

const app = document.querySelector('.app');

const frame = document.querySelector('.project-image-frame'),
    frameFigure = frame.querySelector('.project-image-frame-figure'),
    frameImage = frame.querySelector('.image-panel-slide-item-image'),
    frameOverlay = frame.querySelector('.project-image-frame-overlay');

const gallery = document.querySelector('.project-thumbnails-wrapper')
const galleryImages = gallery.querySelectorAll('.project-thumbnail-image');

const init = () => {
    addEventListeners();
};

const onMouseEnter = (e) => {
    const getSrc = e.srcElement.attributes.src.nodeValue;

    console.log(e);
    console.log('getSrc:', getSrc);
    console.log('frameImage1', frameImage);
    gsap.timeline()
        .to(frameOverlay, {
            duration: 0.3,
            x: 0,
            ease: 'Power4.out',
            onComplete: () => {
                gsap.set(frameImage, { attr: { src: getSrc } });
                frameImage.addEventListener('load', () => {
                    // The image has finished loading
                });
            },
            // onComplete: () => {
            //     setTimeout(() => {
            //         gsap.set(frameImage, { attr: { src: getSrc } });
            //     }, 100);

            //     // if (!frameFigure.classList.contains('is-hidden')) return;
            //     // frameFigure.classList.remove('is-hidden');
            //     console.log('frameImage2', frameImage);
            // },
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
        el.addEventListener('click', onMouseEnter);
    });
};

window.onload = () => {
    init();
};
