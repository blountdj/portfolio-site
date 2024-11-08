
export const marqueeScrollEffect = () => {
    gsap.to(".marquee-text-wrapper", {
        xPercent: -100,
        repeat: -1,
        duration: 20,
        ease: "linear",
    })
    .totalProgress(0.5);
};
