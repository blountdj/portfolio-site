
// import { CONFIG_DEV } from "./config.js";
import { CONFIG_PROD } from "https://cdn.jsdelivr.net/gh/blountdj/portfolio-site@v18/dist/js/config.min.js";

const CONFIG = CONFIG_PROD

const {
  h1LoadInit,
  h1LoadEffect,
  addDarrenH2Animations,
  h1ShineEffect,
  elemScaleTo1Center,
  yPercentOpacityReturn,
  elemScaleUp,
  unBlurOpacity1,
  unBlurOpacity1Stagger
} = await import(`${CONFIG.path}${CONFIG.jsFolder}commonAnimations${CONFIG.jsPostFix}.js`);


const about = {
  darrenH2: null,
  portfolioTextWrapper: null,
  hamburger: null,
  portfolioBtn: null,
  contactBtn: null,
  btnEmojis: null,
  mainText: null,
  certificate: null
};

export const aboutInit = (container) => {
  h1LoadInit(container)

  about.darrenH2 = container.querySelector('.h2-wrapper');
  about.portfolioTextWrapper = container.querySelector('.marquee-part');
  about.hamburger = container.querySelector('.hamburger');

  about.portfolioBtn = container.querySelector('.about-btn-link.is-portfolio');
  about.contactBtn = container.querySelector('.about-btn-link.is-contact');
  about.btnEmojis = container.querySelectorAll('.about-btn-emoji');
  about.mainText = container.querySelectorAll('.project-paragraph');
  about.certificate = container.querySelector('.certificate-img-wrapper');

  gsap.set([about.portfolioBtn, about.contactBtn, about.mainText, about.certificate, about.mainText], {
    filter: "blur(20px)",
    opacity: 0,
  })


  gsap.set(about.darrenH2, {
    yPercent: -105,
    opacity: 0,
  })

  gsap.set(about.portfolioTextWrapper, {
    scaleX: 0,
  })

  gsap.set(about.hamburger, {
    opacity: 0,
    scale: 0.0,
  })
}

export const aboutAnimations = (container) => {
  // console.log('aboutAnimations')
  const h1Chars = container.querySelectorAll('.page-h1 > .word > .char-wrapper > .char');
  gsap.timeline()
    .add(() => unBlurOpacity1Stagger(about.mainText), 1.15)
    .add(() => unBlurOpacity1([about.portfolioBtn, about.contactBtn]), 1.65)
    .add(() => unBlurOpacity1(about.certificate), 1.8)


    .add(() => elemScaleTo1Center(about.portfolioTextWrapper), 2.4)
    .add(() => h1LoadEffect(container), 2.65)
    .add(() => yPercentOpacityReturn(about.darrenH2), 3.0)
    .add(() => elemScaleUp(about.hamburger, 1), 3.3)
    .add(() => addDarrenH2Animations(about.darrenH2), 3.4)
    .add(() => setInterval(() => h1ShineEffect(h1Chars), 10000), 3.4)
}
