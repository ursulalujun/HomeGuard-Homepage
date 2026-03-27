document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('benchmarkCarouselTrack');
  const prevBtn = document.getElementById('benchmarkPrevBtn');
  const nextBtn = document.getElementById('benchmarkNextBtn');
  const dots = Array.from(document.querySelectorAll('[data-benchmark-slide]'));

  if (!track || !prevBtn || !nextBtn || dots.length === 0) {
    return;
  }

  const totalSlides = dots.length;
  let currentSlide = 0;

  function render() {
    const translateX = -100 * currentSlide;
    track.style.transform = `translateX(${translateX}%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    render();
  });

  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    render();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      render();
    });
  });

  render();
});
