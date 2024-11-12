export const hamburgerInit = (container) => {

    let isMenuOpen = false;
    const menuLinkHover = container.querySelectorAll(".menu-link-hover2");
    const menuLinkMain = container.querySelectorAll(".menu-link-main");

    console.log('hamburgerInit');
    const hamburger = container.querySelector('.hamburger');
    const spans = Array(3).fill().map(() => {
        const span = document.createElement('span');
        hamburger.appendChild(span);
        return span;
    });
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');

        if (isMenuOpen) {
            gsap.to([menuLinkHover, menuLinkMain], {
                opacity: 0,
                duration: 0.1,
                ease: "power5.out",
            })
        } else {
            gsap.to([menuLinkHover, menuLinkMain], {
                opacity: 1,
                duration: 0.1,
                ease: "power5.out",
            })
        }
        isMenuOpen = !isMenuOpen;
    });
};

// hamburgerInit(document)