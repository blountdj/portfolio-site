
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

export const shootingEffect = () => {
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
                    console.log('GO!')
                    if (clickTarget === "portfolio") {
                        console.log('PORTFOLIO')
                        
                    } else if (clickTarget === "about") {
                        console.log('ABOUT')
                    } else if (clickTarget === "designo") {
                        console.log('DESIGNO')
                    } else if (clickTarget === "arch") {
                        console.log('ARCH')
                    } else if (clickTarget === "audiophile") {
                        console.log('AUDIOPHILE')
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

    