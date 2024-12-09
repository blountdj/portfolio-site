
export const cursorInit = (container) => {
    const cursor = document.querySelector(".cursor");
    document.body.addEventListener("mousemove", onMouseMove);
    
    function onMouseMove(e) {
        gsap.to(cursor, 0.0125, {
            x: e.pageX - 30,
            y: e.pageY - 30,
        });
    }
};
