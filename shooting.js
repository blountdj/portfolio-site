
let isSubmitting = false;

const updateScore = (score) => {
    document.querySelector('.score-count').textContent = score;
}

const createFireGif = (x, y) => {
    const gif = document.createElement("img");
    gif.src = "https://cdn.prod.website-files.com/672d4ae3adf0bed6be877464/672e82088d9b4327d4832fbb_explosion.gif";
    gif.style.position = "absolute";
    gif.style.left = `${x - 10}px`;
    gif.style.top = `${y - 10}px`;
    gif.style.transform = `scale(2.5)`;
    gif.style.pointerEvents = "none";
    return gif;
}

const createPointsText = (x, y, points) => {
    const pointsText = document.createElement("div");
    pointsText.classList.add('points-text');
    pointsText.style.position = "absolute";
    pointsText.style.left = `${x + 80}px`;
    pointsText.style.top = `${y + -20}px`;
    pointsText.style.opacity = 1;
    pointsText.textContent = points > 0 ? `+${points}` : points;
    return pointsText;
}

const showOverlay = (elem) => {
    gsap.to(elem, {
        autoAlpha: 1,
        duration: 1,
        ease: "power4.inOut",
    });
}

const addBlockPositions = () => {
    let blockPositions;
    const windowWidth = window.innerWidth;
    if (windowWidth > 991) {
        blockPositions = {
            "block-1": { top: "55%", left: "30%" }, /* green alien */
            "block-2": { top: "25%", left: "20%" }, /* skull */
            "block-3": { top: "70%", left: "50%" }, /* devil */ 
            "block-4": { top: "40%", left: "60%" }, /* saint */
            "block-5": { top: "30%", left: "30%" }, /* heart eyes */
            "block-6": { top: "30%", left: "70%" }, /* aliens */
            "block-7": { top: "50%", left: "30%" }, /* sunglasses */
            "block-8": { top: "70%", left: "70%" }, /* star eyes */
            "block-9": { top: "70%", left: "70%" }, /* mind blown */
            "block-10": { top: "50%", left: "70%" }, /* baby */
            "block-11": { top: "30%", left: "30%" }, /* portfolio */
            "block-12": { top: "70%", left: "34%" }, /* about */
            "block-13": { top: "55%", left: "60%" }, /* designo */
            "block-14": { top: "42%", left: "35%" }, /* arch */
            "block-15": { top: "60%", left: "50%" }, /* audiophile */
            "block-16": { top: "37%", left: "45%" } /* contact */
        }
    } else if (windowWidth > 768) {
        blockPositions = {
            "block-1": { top: "55%", left: "30%" }, /* green alien */
            "block-2": { top: "25%", left: "20%" }, /* skull */
            "block-3": { top: "70%", left: "50%" }, /* devil */ 
            "block-4": { top: "40%", left: "60%" }, /* saint */
            "block-5": { top: "30%", left: "30%" }, /* heart eyes */
            "block-6": { top: "30%", left: "70%" }, /* aliens */
            "block-7": { top: "50%", left: "15%" }, /* sunglasses */
            "block-8": { top: "70%", left: "70%" }, /* star eyes */
            "block-9": { top: "70%", left: "70%" }, /* mind blown */
            "block-10": { top: "50%", left: "70%" }, /* baby */
            "block-11": { top: "30%", left: "30%" }, /* portfolio */
            "block-12": { top: "70%", left: "34%" }, /* about */
            "block-13": { top: "55%", left: "60%" }, /* designo */
            "block-14": { top: "42%", left: "35%" }, /* arch */
            "block-15": { top: "60%", left: "50%" }, /* audiophile */
            "block-16": { top: "30%", left: "45%" } /* contact */
        }
        
    } else {
        blockPositions = {
            "block-1": { top: "55%", left: "30%" }, /* green alien */
            "block-2": { top: "25%", left: "20%" }, /* skull */
            "block-3": { top: "70%", left: "50%" }, /* devil */ 
            "block-4": { top: "40%", left: "60%" }, /* saint */
            "block-5": { top: "30%", left: "30%" }, /* heart eyes */
            "block-6": { top: "30%", left: "70%" }, /* aliens */
            "block-7": { top: "50%", left: "15%" }, /* sunglasses */
            "block-8": { top: "70%", left: "70%" }, /* star eyes */
            "block-9": { top: "70%", left: "70%" }, /* mind blown */
            "block-10": { top: "50%", left: "70%" }, /* baby */
            "block-11": { top: "30%", left: "30%" }, /* portfolio */
            "block-12": { top: "70%", left: "34%" }, /* about */
            "block-13": { top: "55%", left: "60%" }, /* designo */
            "block-14": { top: "44%", left: "35%" }, /* arch */
            "block-15": { top: "60%", left: "50%" }, /* audiophile */
            "block-16": { top: "30%", left: "15%" } /* contact */
        }
    }
    
    Object.keys(blockPositions).forEach((blockName) => {
        const block = document.querySelector(`.${blockName}`);
        const { top, left } = blockPositions[blockName];
        block.style.top = top;
        block.style.left = left;
    });
}

export const shootingEffect = () => {
    // window.Barba.Pjax.start();
    addBlockPositions()
    let blocks = document.querySelectorAll(".block");
    let duration = 0.25;
    let stagger = duration;
    let repeatDelay = 0.075 * (blocks.length - 1);

    const overlayCloseBtn = document.querySelector('[data-action="close"]');
    const overlayGoBtn = document.querySelector('[data-action="go"]');

    const overlay = document.querySelector('.overlay');
    gsap.set(overlay, {
        autoAlpha: 0,
        display: "flex",
    });

    const colours = ["var(--darker-green)", "var(--lighter-green)", "var(--snow)"];
    let score = 0;

    let animationTimeline = gsap.from(".block", 5, {
        scale: 0,
        top: "50%",
        left: "50%",
        transform: "translateZ(-200px)",
        stagger: {
            each: duration,
            from: "random",
            repeat: -1,
            repeatDelay: repeatDelay,
        },
        onComplete: () => {
            gsap.to(".block", {
                duration: 1,
                opacity: 0
            });
        }
    });

    let previousGif = null;

    blocks.forEach((block) => {
        const randomColour = colours[Math.floor(Math.random() * colours.length)];
        gsap.set(block, {
            color: randomColour,
        });
        
        block.addEventListener("click", (event) => {
            const x = event.clientX;
            const y = event.clientY;
            const clickTarget = event.target.closest('.block').dataset.type;

            // console.log('clickTarget:', clickTarget)

            if (clickTarget === "baddy" || clickTarget === "goody") {
                let points = clickTarget === "baddy" ? 10 : -10;
                score += points
                const pointsText = createPointsText(x, y, points);
                document.body.appendChild(pointsText);
                setTimeout(() => {
                    pointsText.remove();
                }, 850);
                updateScore(score);
            } else {
                animationTimeline.pause();
                showOverlay(overlay);

                // Update text on overlay
                const nextPageTextElem = overlay.querySelector('.home-popup-text.is-next-page')
                nextPageTextElem.textContent = `${clickTarget.charAt(0).toUpperCase() + clickTarget.slice(1)} page?`
                

                overlayCloseBtn.addEventListener('click', () => {
                    animationTimeline.resume();
                    gsap.to(overlay, {
                        autoAlpha: 0,
                        duration: 0.5,
                        ease: "power4.inOut",
                    });
                });

                overlayGoBtn.addEventListener('click', () => {
                    if (isSubmitting) {
                      return; // Do nothing if already submitting
                    }
                  
                    isSubmitting = true;
                  
                    switch (clickTarget) {
                      case "portfolio":
                        barba.go("portfolio");
                        break;
                      case "about":
                        barba.go("about");
                        break;
                      case "designo project":
                        barba.go("designo");
                        break;
                      case "arch project":
                        barba.go("arch-studio");
                        break;
                      case "audiophile project":
                        barba.go("audiophile");
                        break;
                      case "contact":
                        barba.go("contact");
                        break;
                      default:
                        break;
                    }
                  
                    isSubmitting = false;
                  });
            }
            

            if (previousGif) {
                previousGif.remove();
            }

            const gif = createFireGif(x, y);
            
            document.body.appendChild(gif);
            
            // showPoints(pointsText);

            setTimeout(() => {  
                gif.src = "";
            }, 500);

            previousGif = gif;
            
            block.style.display = "none";
            setTimeout(() => {
                block.style.display = "block";
            }, 5000);
        });
    });
}
