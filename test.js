const cards = document.querySelectorAll('.card');
const cards1 = document.querySelectorAll('.card1');


cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            duration: 0.5,
            rotationY: 180,
            ease: 'power2.inOut'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            duration: 0.5,
            rotationY: 0,
            ease: 'power2.inOut'
        });
    });

    cards1.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.5,
                rotationY: 180,
                ease: 'power2.inOut'
            });
        });
    
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.5,
                rotationY: 0,
                ease: 'power2.inOut'
            });
        });
    });
});