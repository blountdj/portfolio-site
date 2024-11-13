
const cloneText = (container) => {

    const rollingTexts = container.querySelectorAll('.intro-text');

    rollingTexts.forEach((text) => {
        // console.log('text', text);
        const data = text.dataset.text;
        // console.log('data', data);
        const chars = Array.from(data);
        // console.log('chars', chars);
        for (let i = 0; i < chars.length; i++) {
            const inner = document.createElement('span');
            inner.classList.add('intro-text-inner');
        
            text.appendChild(inner);
        
            const letter = document.createElement('span');
            letter.classList.add('intro-text-letter');
        
            letter.textContent = chars[i];
            inner.appendChild(letter);
        
            for (let j = 0; j < 6; j++) {
                let clone = letter.cloneNode(true);
                letter.after(clone);
            }
        }
    });

    animateText(container);
};

const animateText = (container) => {
    const rollingInners = container.querySelectorAll('.intro-text-inner');

    gsap.set(rollingInners, {
        //? -100% = 1 row of inner letters
        y: '-700%',
    });

    const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'power4.inOut' },
    });

    tl.to(rollingInners, {
        duration: 4,
        y: '0',
        stagger: {
            grid: 'auto',
            from: 'random',
            ease: 'power4.inOut',
            amount: 1.2,
        },
    }).fromTo(
        '.intro-text-letter',
        {
            filter: 'brightness(0.5)',
        },
        {
            duration: 3,
            filter: 'brightness(1)',
            stagger: {
                grid: 'auto',
                ease: 'power4.inOut',
                amount: 0.8,
            },
        },
        0
    );

    tl.play();

    // document.querySelector('.re-roll').addEventListener('click', () => {
    //     tl.reverse().then(() => {
    //         tl.play();
    //     });
    // });
};

export const introTextEffect = (container) => {
    cloneText(container);
}


