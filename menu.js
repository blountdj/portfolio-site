console.log('menu')

export const menuInit = (container) => {
    console.log('menuInit')

    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop",
      "M0,0 C0.091,0.543 0.148,0.662 0.277,0.786 0.405,0.909 0.596,0.979 1,1 "
    );

    const hamburger = container.querySelector(".hamburger");
    const menu = container.querySelector(".menu");
    const menuItems = container.querySelectorAll(".menu-item");
    
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

    gsap.set(".menu-link-p span", { x: 350 });

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
        },
      });

      menuItems.forEach((menuItem) => {
        const menuItemLetters =
          menuItem.querySelectorAll(".menu-link-p span");
        gsap.to(menuItemLetters, {
          delay: isMenuOpen ? 0 : 0.25,
          x: isMenuOpen ? 350 : 0,
          duration: 1,
          stagger: isMenuOpen ? -0.075 : 0.075,
          ease: "power3.out",
        });

      });
    };

    hamburger.addEventListener("click", handleMenu);

    menuItems.forEach((menuItem) => {
      menuItem.addEventListener('click', () => {
        console.log('menu item click:', menuItem)
        handleMenu()
      })
    })
}

// menuInit(document)
