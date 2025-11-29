
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    const open = menuBtn.classList.contains('open');
    menuBtn.setAttribute('aria-expanded', open);
    if (open) {
      navMenu.style.display = 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.gap = '10px';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '64px';
      navMenu.style.right = '16px';
      navMenu.style.background = '#fff';
      navMenu.style.padding = '12px';
      navMenu.style.borderRadius = '8px';
      navMenu.style.boxShadow = '0 8px 30px rgba(11,27,42,0.08)';
    } else {
      navMenu.style.display = '';
      navMenu.style.position = '';
      navMenu.style.top = '';
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (menuBtn && menuBtn.classList.contains('open')) {
      menuBtn.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', false);
      if (navMenu) navMenu.style.display = '';
    }
  });
});

const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) backToTop.style.display = 'block';
  else backToTop.style.display = 'none';
});
backToTop && backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('year')?.appendChild(document.createTextNode(new Date().getFullYear()));

const baRange = document.getElementById('baRange');
const baAfter = document.querySelector('.ba-after');

if (baRange && baAfter) {
  baRange.addEventListener('input', (e) => {
    const val = e.target.value;
    baAfter.style.width = val + '%';
  });
}

(function initCarousel(){
  const track = document.querySelector('.carousel-track');
  const prev = document.querySelector('.carousel-btn.prev');
  const next = document.querySelector('.carousel-btn.next');
  if (!track) return;
  let index = 0;
  const items = track.children;
  const itemWidth = items[0].getBoundingClientRect().width + 8;

  function update() {
    const offset = -index * itemWidth;
    track.style.transform = `translateX(${offset}px)`;
  }

  prev && prev.addEventListener('click', () => {
    index = Math.max(0, index - 1);
    update();
  });
  next && next.addEventListener('click', () => {
    index = Math.min(items.length - 1, index + 1);
    update();
  });

  window.addEventListener('resize', () => {
    track.style.transform = 'translateX(0px)';
    index = 0;
  });
})();
