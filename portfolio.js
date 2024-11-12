console.log('portfolio.js')


export function portfolioInit(container) {

    let current = 0;
    let directionForward = true;
    const items = container.querySelectorAll(".card-slider .items .portfolio-item");
    const nextBtn = container.querySelector(".card-slider .next");
    const prevBtn = container.querySelector(".card-slider .prev");

    const setItems = () => {

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

      
    };

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

    function updateClasses() {
        console.log('updateClasses')
      items.forEach((item, index) => {
        if (index == current) {
          item.classList.add("is-active");
        } else {
          item.classList.remove("is-active");
        }
      });
    }

    function next() {

      if (!directionForward) {
        directionForward = !directionForward;
      }
      animate.out(items[current]);
      current = (current + 1) % items.length;
      setTimeout(function () {
        animate.in(items[current]);
      }, 500); // <-- Change the delay here
      updateClasses();
    }

    function prev() {
      if (directionForward) {
        directionForward = !directionForward;
      }
      animate.out(items[current]);
      current = (current - 1 + items.length) % items.length;
      setTimeout(function () {
        animate.in(items[current]);
      }, 500); // <-- Change the delay here
      updateClasses();
    }

    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", prev);

    setItems();
  }
