const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

function closeMenu() {
  if (!menuButton || !mobileMenu) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  mobileMenu.classList.remove('open');
  document.body.classList.remove('menu-open');
}

if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
    mobileMenu.classList.toggle('open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
  document.addEventListener('click', event => {
    if (!mobileMenu.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
}

document.querySelector('#year').textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.reveal').forEach((element, index) => {
    gsap.fromTo(element,
      { autoAlpha: 0, y: 34 },
      { autoAlpha: 1, y: 0, duration: 1.05, ease: 'power3.out',
        delay: index % 3 * 0.06,
        scrollTrigger: { trigger: element, start: 'top 88%', once: true }
      }
    );
  });

  gsap.utils.toArray('.story-photo img, .neighborhood-image img').forEach(image => {
    gsap.fromTo(image, { scale: 1.12, yPercent: -3 }, {
      scale: 1.03, yPercent: 3, ease: 'none',
      scrollTrigger: { trigger: image.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

} else if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.animate(
        [{ opacity: 0, transform: 'translateY(25px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 800, easing: 'cubic-bezier(.2,.7,.2,1)' }
      );
      observer.unobserve(entry.target);
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}
