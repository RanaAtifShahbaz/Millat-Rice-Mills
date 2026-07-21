const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.site-nav__links');
const backToTop = document.querySelector('.back-to-top');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('p');

function updateHeader() {
  header.classList.toggle('is-scrolled', window.scrollY > 25);
  backToTop.classList.toggle('is-visible', window.scrollY > 500);
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  menuToggle.innerHTML = `<i class="fa-solid fa-${isOpen ? 'xmark' : 'bars'}"></i>`;
});

navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
}));

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

function animateCounter(counter) {
  const target = Number(counter.dataset.count);
  const suffix = counter.dataset.suffix || '';
  const startTime = performance.now();
  const duration = 1400;
  const update = (time) => {
    const progress = Math.min((time - startTime) / duration, 1);
    const value = Math.floor((1 - (1 - progress) ** 3) * target);
    counter.textContent = `${value.toLocaleString()}${suffix}`;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const statistics = document.querySelector('.statistics');
if ('IntersectionObserver' in window) {
  const statisticObserver = new IntersectionObserver((entries, observer) => {
    if (!entries[0].isIntersecting) return;
    document.querySelectorAll('[data-count]').forEach(animateCounter);
    observer.unobserve(entries[0].target);
  }, { threshold: 0.35 });
  statisticObserver.observe(statistics);
} else {
  document.querySelectorAll('[data-count]').forEach(animateCounter);
}

document.querySelectorAll('.gallery-item').forEach((item) => item.addEventListener('click', () => {
  lightboxImage.src = item.dataset.image;
  lightboxImage.alt = item.querySelector('img').alt;
  lightboxCaption.textContent = item.dataset.caption;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
}));

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
}

lightbox.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeLightbox(); });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
