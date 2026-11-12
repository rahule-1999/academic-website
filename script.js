const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const yearNode = document.getElementById('year');
if (yearNode) yearNode.textContent = new Date().getFullYear();
if (menuToggle && siteNav) {
  const closeMenu = () => {
    siteNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  siteNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && siteNav.classList.contains('is-open')) {
      closeMenu();
      menuToggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);
}

document.querySelectorAll('.photo-slider').forEach(slider => {
  const slides = [...slider.querySelectorAll('.photo-slide')];
  const controls = slider.querySelector('.photo-slider-controls');
  const count = slider.querySelector('.photo-slider-count');
  if (slides.length < 2) return;

  let index = 0;
  const showPhoto = step => {
    index = (index + step + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== index; });
    count.textContent = `Photo ${index + 1} of ${slides.length}`;
  };

  controls.querySelectorAll('[data-photo-step]').forEach(button => {
    button.addEventListener('click', () => showPhoto(Number(button.dataset.photoStep)));
  });
  slider.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const photoHadFocus = slides[index] === document.activeElement;
    showPhoto(event.key === 'ArrowLeft' ? -1 : 1);
    if (photoHadFocus) slides[index].focus();
  });
  showPhoto(0);
  controls.hidden = false;
});
