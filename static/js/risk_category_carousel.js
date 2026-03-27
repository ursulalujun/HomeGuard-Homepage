document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('riskCarouselTrack');
    const prevBtn = document.getElementById('riskPrevBtn');
    const nextBtn = document.getElementById('riskNextBtn');
    const dots = document.querySelectorAll('.risk-carousel-dots .dot');
    const slides = document.querySelectorAll('.risk-carousel-slide');

    if (!track || !prevBtn || !nextBtn || slides.length === 0) {
        return;
    }

    let currentSlide = 0;
    const totalSlides = slides.length;
    let isTransitioning = false;

    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[totalSlides - 1].cloneNode(true);

    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);
    track.style.transform = 'translateX(-100%)';

    function updateCarousel(smooth = true) {
        track.style.transition = smooth ? 'transform 0.5s ease' : 'none';
        const translateX = -((currentSlide + 1) * 100);
        track.style.transform = `translateX(${translateX}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    track.addEventListener('transitionend', () => {
        isTransitioning = false;
        if (currentSlide === totalSlides) {
            currentSlide = 0;
            updateCarousel(false);
        } else if (currentSlide === -1) {
            currentSlide = totalSlides - 1;
            updateCarousel(false);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        currentSlide += 1;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        currentSlide -= 1;
        updateCarousel();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (isTransitioning || currentSlide === index) return;
            isTransitioning = true;
            currentSlide = index;
            updateCarousel();
        });
    });

    updateCarousel(false);
});
