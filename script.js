const activePage = document.querySelector('[data-shared-header]')?.dataset.sharedHeader;
const sharedHeader = document.querySelector('[data-shared-header]');
const sharedFooter = document.querySelector('[data-shared-footer]');
const navItems = [['index.html','Home','home'],['about.html','About','about'],['products.html','Products','products'],['infrastructure.html','Infrastructure','infrastructure'],['gallery.html','Gallery','gallery'],['contact.html','Contact','contact']];

if (sharedHeader) sharedHeader.innerHTML = `<div class="topbar"><div class="container"><a href="mailto:info@millatricemills.com"><i class="fa-regular fa-envelope"></i>info@millatricemills.com</a><span class="topbar__line"></span><span><i class="fa-regular fa-clock"></i>Mon - Sat: 9:00 AM - 6:00 PM</span><select aria-label="Language"><option>English</option><option>Urdu</option></select></div></div><nav class="main-nav" aria-label="Primary navigation"><div class="container"><a class="brand" href="index.html"><img src="images/logo.jpeg" alt="Millat Rice Mills logo"><span>Millat <b>Rice Mills</b></span></a><button class="menu-toggle" aria-label="Open navigation" aria-expanded="false"><i class="fa-solid fa-bars"></i></button><ul class="nav-links">${navItems.map(([href,label,key])=>`<li><a class="${key===activePage?'is-active':''}" href="${href}">${label}</a></li>`).join('')}</ul><a class="call-link" href="tel:+923004007323"><i class="fa-solid fa-phone-volume"></i><span>Call Anytime<b>+92 300 4007323</b></span></a></div></nav>`;
if (sharedFooter) sharedFooter.innerHTML = `<div class="container footer__main"><div><a class="brand brand--footer" href="index.html"><img src="images/logo.jpeg" alt="Millat Rice Mills logo"><span>Millat <b>Rice Mills</b></span></a><p>Thoughtfully processed premium rice for families and markets worldwide.</p><p class="footer__promise">Premium Rice, Our Promise</p><div class="social-links"><a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a><a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a><a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a></div></div><div><h3>Quick Links</h3><ul>${navItems.map(([href,label])=>`<li><a href="${href}">${label}</a></li>`).join('')}</ul></div><div><h3>Products</h3><ul><li>Super Basmati Rice</li><li>1121 Basmati Rice</li><li>PK-386 Rice</li><li>IRRI Rice</li><li>Brown Rice</li><li>Export Rice</li></ul></div><div><h3>Contact Information</h3><ul class="footer-contact"><li><i class="fa-solid fa-phone"></i>+92 300 4007323</li><li><i class="fa-regular fa-envelope"></i>info@millatricemills.com</li><li><i class="fa-solid fa-location-dot"></i>Pakistan</li><li><i class="fa-regular fa-clock"></i>Mon - Sat, 9 AM - 6 PM</li></ul></div></div><div class="container footer__bottom"><span>© <span id="year"></span> Millat Rice Mills. All Rights Reserved.</span><span>Developed by Millat Rice Mills</span></div>`;

const homeCta = document.querySelector('.home-hero ~ .cta');
if (homeCta) homeCta.insertAdjacentHTML('beforebegin', `<section class="section section--cream home-extra"><div class="container split"><div class="split__copy reveal"><p class="eyebrow">Our Infrastructure</p><h2>Modern care for <em>every grain.</em></h2><p>From careful handling to protective packing, our operations are designed around dependable quality.</p><a class="button button--green" href="infrastructure.html">Explore Facilities <i class="fa-solid fa-arrow-right"></i></a></div><div class="split__image reveal"><img src="images/rice-bag.png" alt="Millat Rice Mills infrastructure"><span class="split__badge"><i class="fa-solid fa-industry"></i>Made for quality</span></div></div></section><section class="section home-testimonials"><div class="container"><header class="section-heading reveal"><p class="eyebrow">Customer Trust</p><h2>Quality our customers <em>remember.</em></h2></header><div class="feature-grid"><article class="feature reveal"><i class="fa-solid fa-quote-left"></i><h3>“Beautiful aroma.”</h3><p>“The rice cooks consistently and is a favourite in our home.”</p></article><article class="feature reveal"><i class="fa-solid fa-quote-left"></i><h3>“Reliable service.”</h3><p>“A dependable partner for our product requirements.”</p></article><article class="feature reveal"><i class="fa-solid fa-quote-left"></i><h3>“A quality choice.”</h3><p>“Thoughtful packing and rice that customers enjoy.”</p></article></div></div></section>`);

const homeHero = document.querySelector('.home-hero');
if (homeHero) { const heroImages = ['images/hero-bg.png', 'images/rice-bag.png', 'images/bowl-rice.png']; let heroImageIndex = 0; setInterval(() => { heroImageIndex = (heroImageIndex + 1) % heroImages.length; homeHero.style.backgroundImage = `url('${heroImages[heroImageIndex]}')`; }, 6000); }

const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');
const topButton = document.querySelector('.back-top');

function updatePageChrome() {
  header?.classList.toggle('is-scrolled', window.scrollY > 25);
  topButton?.classList.toggle('is-visible', window.scrollY > 500);
}
window.addEventListener('scroll', updatePageChrome, { passive: true });
updatePageChrome();

menuToggle?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.innerHTML = `<i class="fa-solid fa-${isOpen ? 'xmark' : 'bars'}"></i>`;
});
navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
}));

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: .12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else revealItems.forEach((item) => item.classList.add('is-visible'));

function runCounter(element) { const target = Number(element.dataset.count); const suffix = element.dataset.suffix || ''; const started = performance.now(); const render = (now) => { const progress = Math.min((now - started) / 1300, 1); element.textContent = `${Math.floor((1 - (1 - progress) ** 3) * target).toLocaleString()}${suffix}`; if (progress < 1) requestAnimationFrame(render); }; requestAnimationFrame(render); }
const stats = document.querySelector('.stats');
if (stats && 'IntersectionObserver' in window) { const counterObserver = new IntersectionObserver((entries, observer) => { if (entries[0].isIntersecting) { document.querySelectorAll('[data-count]').forEach(runCounter); observer.unobserve(stats); } }, { threshold: .35 }); counterObserver.observe(stats); }

const lightbox = document.querySelector('.lightbox');
document.querySelectorAll('[data-lightbox]').forEach((item) => item.addEventListener('click', () => { if (!lightbox) return; lightbox.querySelector('img').src = item.dataset.lightbox; lightbox.querySelector('img').alt = item.querySelector('img').alt; lightbox.querySelector('p').textContent = item.dataset.caption || ''; lightbox.classList.add('is-open'); lightbox.setAttribute('aria-hidden', 'false'); }));
function closeLightbox() { lightbox?.classList.remove('is-open'); lightbox?.setAttribute('aria-hidden', 'true'); }
lightbox?.querySelector('button').addEventListener('click', closeLightbox); lightbox?.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); }); document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeLightbox(); });
topButton?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.querySelectorAll('#year').forEach((item) => { item.textContent = new Date().getFullYear(); });
