// console.log('portfolio.js')

// import { CONFIG_DEV } from "./config.js";
import { CONFIG_PROD } from "https://cdn.jsdelivr.net/gh/blountdj/portfolio-site@v25/dist/js/config.min.js";
// import { CONFIG_PROD } from "https://cdn.jsdelivr.net/gh/blountdj/portfolio-site@v25/src/js/config.js";

const CONFIG = CONFIG_PROD

const {
  h1LoadInit,
  h1LoadEffect,
  addDarrenH2Animations,
  yPercentOpacityReturn,
  h1ShineEffect,
  elemScaleTo1Center,
  imageStationaryAnimation,
  moveRightFiveOpacityOne,
  moveLeftFiveOpacityOne,
  elemScaleUp,
} = await import(`${CONFIG.path}${CONFIG.jsFolder}commonAnimations${CONFIG.jsPostFix}.js`);


let current;
let directionForward = true;

const portfolio = {
  items: null,
  portfolioTextWrapper: null,
  darrenH2: null,
  firstImage: null,
  prevArrow: null,
  nextArrow: null,
  hamburger: null,
  itemTitles: null,
}

export function portfolioInit(container) {
  console.log('portfolioInit NOT MIN')

  current = 0;

  h1LoadInit(container)

  portfolio.items = container.querySelectorAll(".card-slider .items .portfolio-item");
  portfolio.portfolioTextWrapper = container.querySelector('.marquee-part');
  portfolio.darrenH2 = container.querySelector('.h2-wrapper');
  portfolio.firstImage = container.querySelector('.portfolio-item');
  portfolio.prevArrow = container.querySelector('.prev');
  portfolio.nextArrow = container.querySelector('.next');
  portfolio.hamburger = container.querySelector('.hamburger');
  portfolio.itemTitles = container.querySelectorAll('.item-title');

  portfolio.items.forEach((item, index) => {
    if (index === current) return;

    gsap.set(item, {
      translateX: "100vw",
      opacity: 0,
      rotate: 40,
    });
  });

  gsap.set(portfolio.items[current], {
    translateX: 0,
    opacity: 1,
  });

  gsap.set(portfolio.items[!current], {
    translateX: "100vw",
    opacity: 0,
  });

  gsap.set(portfolio.portfolioTextWrapper, {
    scaleX: 0,
  })

  gsap.set(portfolio.darrenH2, {
    yPercent: -105,
    opacity: 0,
  })

  gsap.set(portfolio.itemTitles, {
    yPercent: 105,
    opacity: 0,
  })

  gsap.set([portfolio.firstImage, portfolio.hamburger], {
    opacity: 0,
    scale: 0.0,
  })

  const windowWidth = window.innerWidth;
  let moveValue = '47%'
  if (windowWidth < 768) {
    moveValue = '105%'
  }

  gsap.set(portfolio.prevArrow, {
    left: moveValue,
  })

  gsap.set(portfolio.nextArrow, {
    right: moveValue,
  })
}


const arrowsEnter = () => {

  const windowWidth = window.innerWidth;
  if (windowWidth > 768) {
    return moveRightFiveOpacityOne(portfolio.nextArrow), moveLeftFiveOpacityOne(portfolio.prevArrow)
  } else {
    return gsap.to(portfolio.nextArrow, {
      right: '36%',
      duration: 1.25,
      ease: "back.inOut(1.7)"
    }), gsap.to(portfolio.prevArrow, {
      left: '29%',
      duration: 1.25,
      ease: "back.inOut(1.7)"
    })
  }
}

export function portfolioAnimate(container) {
  // console.log('portfolioAnimate')

  const h1Chars = container.querySelectorAll('.page-h1 > .word > .char-wrapper > .char');
  const itemCards = container.querySelectorAll('.item-card');

  let nextArrowEnter
  let prevArrowEnter

  nextArrowEnter, prevArrowEnter = arrowsEnter()

  gsap.timeline()
    .add(() => nextArrowEnter, 0.25)
    .add(() => prevArrowEnter, 0.25)
    .add(() => elemScaleUp(portfolio.firstImage, 1, "back.out(1.7)"), 0.8)
    .add(() => elemScaleTo1Center(portfolio.portfolioTextWrapper), 1.0)
    .add(() => h1LoadEffect(container), 1.4)

    .add(() => yPercentOpacityReturn(portfolio.darrenH2), 2.5)
    .add(() => elemScaleUp(portfolio.hamburger, 1), 2.5)
    .add(() => addDarrenH2Animations(portfolio.darrenH2), 3)
    // .add(() => arrowAnimations(container), 3)
    .add(() => imageStationaryAnimation(itemCards), 3)
    .add(() => imageHoverAnimation(container), 3)
    .add(() => portfolio.nextArrow.addEventListener("click", () => next(portfolio.items, portfolio.itemTitles)), 3)
    .add(() => portfolio.prevArrow.addEventListener("click", () => prev(portfolio.items, portfolio.itemTitles)), 3)
    .add(() => setInterval(() => h1ShineEffect(h1Chars), 10000), 3)
    .add(() => yPercentOpacityReturn(portfolio.itemTitles[0]), 3)
}

const animate = {
  in(item, itemTitle) {
    gsap.set(item, {
      translateX: directionForward ? "100vw" : "-100vw",
      rotate: directionForward ? 40 : -40,
      display: "flex",
    })
    gsap.to(item, {
      opacity: 1,
      translateX: "0vw",
      rotate: 0,
      duration: 1,
      ease: "power4.inOut",
    })
    gsap.to(itemTitle, {
      opacity: 1,
      yPercent: 0,
      duration: 0.3,
      delay: 0.75,
      ease: "power4.inOut",
    })
  },

  out(item, itemTitle) {
    gsap.to(item, {
      opacity: 0,
      translateX: directionForward ? "-100vw" : "100vw",
      rotate: directionForward ? -40 : 40,
      duration: 1,
      ease: "power4.inOut",
      onComplete: () => {
        gsap.set(item, {
          display: "none",
        })
      }
    })
    gsap.to(itemTitle, {
      opacity: 0,
      yPercent: 105,
      delay: 0.75,
    })
  },
};

function updateClasses(items) {
  items.forEach((item, index) => {
    if (index == current) {
      item.classList.add("is-active");
    } else {
      item.classList.remove("is-active");
    }
  });
}

function next(items, itemTitles) {

  if (!directionForward) {
    directionForward = !directionForward;
  }
  animate.out(items[current], itemTitles[current]);
  current = (current + 1) % items.length;
  setTimeout(function () {
    animate.in(items[current], itemTitles[current]);
  }, 500); // <-- Change the delay here
  updateClasses(items);
}

function prev(items, itemTitles) {
  if (directionForward) {
    directionForward = !directionForward;
  }
  animate.out(items[current], itemTitles[current]);
  current = (current - 1 + items.length) % items.length;
  setTimeout(function () {
    animate.in(items[current], itemTitles[current]);
  }, 500); // <-- Change the delay here
  updateClasses(items);
}

const arrowAnimations = (container) => {

  // Diagonal Bounce:
  gsap.to('.svg-arrow', {
    x: 10,
    y: 10,
    duration: 1.5,
    yoyo: true,
    repeat: -1,
    ease: 'elastic.out(1, 0.3)'
  });
}

const imageHoverAnimation = (container) => {
  const itemCards = container.querySelectorAll('.item-card');

  itemCards.forEach(itemCard => {
    itemCard.addEventListener('mouseenter', () => {
      gsap.to(itemCard, {
        scale: 1.05,
        border: '3px solid var(--lighter-green)',
        duration: 0.3,
        ease: 'power1.inOut'
      });
    });

    itemCard.addEventListener('mouseleave', () => {
      gsap.to(itemCard, {
        scale: 1.00,
        border: '0px solid var(--lighter-green)',
        duration: 0.3,
        ease: 'power1.inOut'
      });
    });
  });
};

