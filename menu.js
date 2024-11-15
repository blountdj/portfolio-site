// console.log('menu')

export const menuInit = (container) => {
    console.log('menuInit')

    const currentUrl = window.location.href;
    let currentPage = currentUrl.split('/').pop();
    currentPage = currentPage === '' ? '/' : currentPage;
    // console.log('currentPage:', currentPage)

    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop",
      "M0,0 C0.091,0.543 0.148,0.662 0.277,0.786 0.405,0.909 0.596,0.979 1,1 "
    );

    const hamburger = container.querySelector(".hamburger");
    const menu = container.querySelector(".menu");
    const menuItems = container.querySelectorAll('.menu-item');

    
    let isMenuOpen = false;

    function splitTextIntoSpans(selector) {
      let elements = container.querySelectorAll(selector);
      elements.forEach((element) => {
        let text = element.innerText;
        let splitText = text
          .split("")
          .map(function (char) {
            return `<span>${char === " " ? "&nbsp;&nbsp;" : char}</span>`;
          })
          .join("");
        element.innerHTML = splitText;
      });
    }

    splitTextIntoSpans(".menu-link-p");

    const hoverHeadings = container.querySelectorAll('.menu-link-hover2 > .menu-link-p > span')
    const mainHeadings = container.querySelectorAll('.menu-link-main > .menu-link-p')
    const mainHeadingsChars = container.querySelectorAll('.menu-link-main > .menu-link-p > span')

    gsap.set(mainHeadingsChars, { xPercent: 350 });
    gsap.set(hoverHeadings, { xPercent: -350 });

    const handleMenu = () => {

      gsap.to(menu, {
        width: isMenuOpen ? "0vw" : "100vw", // CHANGE TO 0vw later
        duration: 1,
        ease: "hop",
      });

      gsap.to(".menu-item", {
        justifyContent: isMenuOpen ? "center" : "flex-start",
        duration: 1,
        ease: "power3.out",
        onComplete: () => {
            isMenuOpen = !isMenuOpen;
            menuItems.forEach((menuItem) => {
                if (isMenuOpen) {
                  menuItem.classList.add("menu-opened");
                } else {
                  menuItem.classList.remove("menu-opened");
                  
                }
              });
              isMenuOpen ? menuItemHoverAnimations(container) : removeMenuItemHoverAnimations(container);
        },
      });

      mainHeadings.forEach((mainHeading) => {
        const menuItemLetters = mainHeading.querySelectorAll("span");
        gsap.to(menuItemLetters, {
          delay: 0.25,
          xPercent: 0,
          duration: 1,
          stagger: 0.075,
          ease: "power3.out",
        });

      });
    };

    hamburger.addEventListener("click", handleMenu);

    menuItems.forEach(link => {
      if (link.getAttribute('href') === `/${currentPage}` || 
         (link.getAttribute('href') === '/' && currentPage === '/')) { 
          const spans = link.querySelectorAll('span')
          gsap.set(spans, { color: 'grey' })

          const currentEmoji = link.querySelector('.menu-emoji')
          currentEmoji.textContent = '❌'
      }
  });


  
    menuItems.forEach((menuItem) => {
      menuItem.addEventListener('click', (event) => {
        console.log('menu item click:', menuItem)

        const clickedUrl = event.currentTarget.href;

        if (currentUrl === clickedUrl) {
          event.preventDefault(); // Prevent the default link action
          return; // Exit the event handler
        }

        removeMenuItemHoverAnimations(container)
        hideHamburger()
        stopRocking(menuItem.querySelector('.menu-img'))

      })
    }) 
}


const hideHamburger = () => {
  gsap.to('.hamburger', {
    autoAlpha: 0,
    duration: 0.5,
    ease: 'power5.inOut'
  })
}

/* Hover Animations */
function startRocking(element) {
  gsap.set(element, {
    rotation: -2.5,
    x: -2
});

// Then animate
gsap.to(element, {
    rotation: 2.5,
    duration: 1.5,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
    transformOrigin: "center bottom",
    x: 2
});
}

function stopRocking(element) {
  // Kill any tweens associated with this element
  gsap.getTweensOf(element).forEach(tween => tween.kill());
  
  // Reset position
  gsap.to(element, {
      rotation: 0,
      x: 0,
      duration: 0.5
  });
}

const handleMouseEnter = (menuItem) => {
  // console.log('handleMouseEnter')
  const menuItemLettersMain = menuItem.querySelectorAll(".menu-link-main > .menu-link-p span");
  gsap.to(menuItemLettersMain, {
    xPercent: 350,  //: 0,
    opacity: 0,
    duration: 1,
    stagger: 0.075,
    ease: "power3.out",
  });

  const menuItemLettersHover = menuItem.querySelectorAll(".menu-link-hover2 > .menu-link-p span");
  gsap.to(menuItemLettersHover, {
    xPercent: 0,  //: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.075,
    ease: "power3.out",
  });


  const menuImg = menuItem.querySelector('.menu-img');
  gsap.to(menuImg, {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    duration: 0.175,
    ease: 'power5.inOut',
    onComplete: () => {
      startRocking(menuImg);
    }
  })
}

const handleMouseLeave = (menuItem) => {
  // console.log('handleMouseLeave')

  const menuItemLettersMain = menuItem.querySelectorAll(".menu-link-main > .menu-link-p span");
  gsap.to(menuItemLettersMain, {
    // delay: isMenuOpen ? 0 : 0.25,
    xPercent: 0,  //: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.075,
    ease: "power3.out",
  });

  const menuItemLettersHover = menuItem.querySelectorAll(".menu-link-hover2 > .menu-link-p span");
  gsap.to(menuItemLettersHover, {
    // delay: isMenuOpen ? 0 : 0.25,
    xPercent: -350,  //: 0,
    opacity: 0,
    duration: 1,
    stagger: 0.075,
    ease: "power3.out",
  });

  const menuImg = menuItem.querySelector('.menu-img');
  stopRocking(menuImg);
  gsap.to(menuImg, {
    clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
    duration: 0.075,
    ease: 'power5.inOut',
  })


}

const createMouseEnterHandler = (menuItem) => () => handleMouseEnter(menuItem);
const createMouseLeaveHandler = (menuItem) => () => handleMouseLeave(menuItem);

const menuItemHoverAnimations = (container) => {
  const menuItems = container.querySelectorAll('.menu-item.menu-opened');
  menuItems.forEach((menuItem) => {
    // Store the handlers as properties on the menuItem
    menuItem._mouseEnterHandler = createMouseEnterHandler(menuItem);
    menuItem._mouseLeaveHandler = createMouseLeaveHandler(menuItem);
    
    menuItem.addEventListener('mouseenter', menuItem._mouseEnterHandler);
    menuItem.addEventListener('mouseleave', menuItem._mouseLeaveHandler);
  });
}

const removeMenuItemHoverAnimations = (container) => {
  const menuItems = container.querySelectorAll('.menu-item');
  menuItems.forEach((menuItem) => {
    // Remove using the stored handlers
    if (menuItem._mouseEnterHandler) {
      menuItem.removeEventListener('mouseenter', menuItem._mouseEnterHandler);
    }
    if (menuItem._mouseLeaveHandler) {
      menuItem.removeEventListener('mouseleave', menuItem._mouseLeaveHandler);
    }
  });
}


