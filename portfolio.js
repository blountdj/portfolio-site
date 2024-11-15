console.log('portfolio.js')

import { 
  h1LoadInit, 
  h1LoadEffect,
  addH1HoverAnimations,
  addDarrenH2Animations,
  staggerOpacityAndScaleToOneEffect,
  yPercentOpacityReturn,
  h1ShineEffect,
  elemScaleTo1RightToLeft,
  imageStationaryAnimation,
  moveRightFiveOpacityOne,
  moveLeftFiveOpacityOne,
  elemScaleUp
} from "./commonAnimations.js";


let current = 0;
let directionForward = true;


export function portfolioInit(container) {
  console.log('portfolioInit')

  h1LoadInit(container)

  const items = container.querySelectorAll(".card-slider .items .portfolio-item");
  const portfolioTextWrapper = container.querySelector('.marquee-part');
  const darrenH2 = container.querySelector('.h2-wrapper');
  const firstImage = container.querySelector('.portfolio-item');
  const prevArrow = container.querySelector('.prev');
  const nextArrow = container.querySelector('.next');

  items.forEach((item, index) => {
    if (index === current) return;

    gsap.set(item, {
      translateX: "100vw",
      opacity: 0,
      rotate: 40
    });

  });

  gsap.set(items[current], {
    translateX: 0,
    opacity: 1,
  });

  gsap.set(portfolioTextWrapper, {
    scaleX: 0,
    // opacity: 0,
  })

  gsap.set(darrenH2, {
    yPercent: -105,
    opacity: 0,
  })

  gsap.set(firstImage, {
    opacity: 0,
    scale: 0.0,
  })

  gsap.set(prevArrow, {
    // opacity: 0,
    left: '47%',
  })

  gsap.set(nextArrow, {
    // opacity: 0,
    right: '47%',
  })


}

export function portfolioAnimate(container) {
    console.log('portfolioAnimate')
    
    const nextBtn = container.querySelector(".card-slider .next");
    const prevBtn = container.querySelector(".card-slider .prev");
    const h1Chars = container.querySelectorAll('.page-h1 > .word > .char-wrapper > .char');
    const itemCards = container.querySelectorAll('.item-card');
    const darrenH2 = container.querySelector('.h2-wrapper');
    const items = container.querySelectorAll(".card-slider .items .portfolio-item");
    const portfolioTextWrapper = container.querySelector('.marquee-part');
    const firstImage = container.querySelector('.portfolio-item');
    
    gsap.timeline()
    .add(() => moveRightFiveOpacityOne(nextBtn), 0.25)
    .add(() => [moveLeftFiveOpacityOne(prevBtn), moveLeftFiveOpacityOne(prevBtn)], 0.25)
    .add(() => elemScaleUp(firstImage, 1), 0.8)
    .add(() => elemScaleTo1RightToLeft(portfolioTextWrapper), 1.0)
    .add(() => h1LoadEffect(container), 1.4)

    .add(() => yPercentOpacityReturn(darrenH2), 2.5)

    .add(() => addDarrenH2Animations(darrenH2), 3)
    .add(() => arrowAnimations(container), 3)
    .add(() => imageStationaryAnimation(itemCards), 3)
    .add(() => imageHoverAnimation(container), 3)
    .add(() => nextBtn.addEventListener("click", () => next(items)), 3)
    .add(() => prevBtn.addEventListener("click", () => prev(items)), 3)
    .add(() => setInterval(() => h1ShineEffect(h1Chars), 10000), 3)

}


const animate = {
  in(item) {
    gsap.set(item, {
      translateX: directionForward ? "100vw" : "-100vw",
      rotate: directionForward ? 40 : -40,
    })

    gsap.to(item, {
      opacity: 1,
      translateX: "0vw",
      rotate: 0,
      duration: 1,
      ease: "power4.inOut",
    })
  },

  out(item) {

    gsap.to(item, {
      opacity: 0,
      translateX: directionForward ? "-100vw" : "100vw",
      rotate: directionForward ? -40 : 40,
      duration: 1,
      ease: "power4.inOut",
    })
  },
};

function updateClasses(items) {
  console.log('updateClasses')
  items.forEach((item, index) => {
    if (index == current) {
      item.classList.add("is-active");
    } else {
      item.classList.remove("is-active");
    }
  });
}

function next(items) {

  if (!directionForward) {
    directionForward = !directionForward;
  }
  animate.out(items[current]);
  current = (current + 1) % items.length;
  setTimeout(function () {
    animate.in(items[current]);
  }, 500); // <-- Change the delay here
  updateClasses(items);
}

function prev(items) {
  if (directionForward) {
    directionForward = !directionForward;
  }
  animate.out(items[current]);
  current = (current - 1 + items.length) % items.length;
  setTimeout(function () {
    animate.in(items[current]);
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

