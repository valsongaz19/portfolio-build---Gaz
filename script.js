const body = document.body;
const canWrapper = document.getElementById('canWrapper');
const layers = document.querySelectorAll('.content-layer');
const dots = document.querySelectorAll('.dot');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = scrollTop / maxScroll;

    // Determine active section index (0 to 3)
    let currentIndex = Math.min(
        Math.floor(scrollProgress * 4),
        3
    );

    // Update UI Layers and Dots
    layers.forEach((layer, idx) => {
        if (idx === currentIndex) {
            layer.classList.add('active');
        } else {
            layer.classList.remove('active');
        }
    });

    dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    // --- Seamless 3D Can Scroll Transformations ---
    let xPos = 0;
    let yPos = 0;
    let rotationY = scrollProgress * 720; // Spins as you scroll
    let rotationX = 0;
    let scale = 1;

    if (scrollProgress < 0.25) {
        // Page 1: Can centered, frosty, beautifully lit
        xPos = window.innerWidth > 768 ? window.innerWidth * 0.25 : 0;
        yPos = 0;
        scale = 1.2;
    } else if (scrollProgress >= 0.25 && scrollProgress < 0.5) {
        // Page 2: Can glides smoothly to the left side
        xPos = window.innerWidth > 768 ? -window.innerWidth * 0.25 : 0;
        yPos = 0;
        scale = 1.1;
    } else if (scrollProgress >= 0.5 && scrollProgress < 0.75) {
        // Page 3: Can shifts backwards / tilts
        xPos = window.innerWidth > 768 ? window.innerWidth * 0.2 : 0;
        yPos = -20;
        rotationX = 15;
        scale = 0.95;
    } else {
        // Page 4: Can comes back to center for the opening animation
        xPos = 0;
        yPos = 0;
        scale = 1.3;
        canWrapper.classList.add('opened');
    }

    if (scrollProgress < 0.75) {
        canWrapper.classList.remove('opened');
    }

    canWrapper.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) rotateY(${rotationY}deg) rotateX(${rotationX}deg) scale(${scale})`;
});