// ═══════════════════════════════════════
// PORTFOLIO — DINESH KUMAR V
// ═══════════════════════════════════════

// ── Navbar scroll effect ──────────────
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');
const allNavLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
  updateActiveNav();
});

// ── Hamburger menu ─────────────────────
function openMenu() {
  navLinks.classList.add('open');
  hamburger.classList.add('open');
  navOverlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
  navOverlay.classList.remove('show');
  document.body.style.overflow = '';
}
hamburger.addEventListener('click', () => {
  navLinks.classList.contains('open') ? closeMenu() : openMenu();
});
navOverlay.addEventListener('click', closeMenu);
allNavLinks.forEach(link => link.addEventListener('click', closeMenu));

// ── Smooth scroll for nav links ────────
allNavLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      const offset = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

// ── Active nav on scroll ──────────────
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  allNavLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}
updateActiveNav();

// ── Scroll Reveal ─────────────────────
const revealEls = document.querySelectorAll(
  '.section-title, .section-sub, .section-header::after, ' +
  '.about-grid, .about-text, .about-info, ' +
  '.edu-grid, .timeline-col, .tl-item, ' +
  '.projects-grid, .project-card, ' +
  '.contact-wrap, .contact-form, .contact-info, .ci-item'
);

// Add reveal class to major blocks
const revealTargets = [
  '.section-header',
  '.about-text', '.about-info',
  '.timeline-col',
  '.project-card',
  '.contact-form', '.ci-item',
  '.tl-item'
];
revealTargets.forEach(sel => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i * 0.08) + 's';
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Contact Form → Google Sheets ──────
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbwi4REXGjqz5L4P48AvEIhEMGI1wgk0FmyHbQM9FlFvYa4GfJXcvdEDf2EGyRuHDKHP/exec';
const form       = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i>&nbsp; Sending...';
    formStatus.textContent = '';
    formStatus.style.color = '';

    try {
      await fetch(SHEET_URL, { method: 'POST', body: new FormData(form),mode: 'no-cors' });
      formStatus.textContent = '✅ Message sent successfully!';
      formStatus.style.color = '#22c55e';
      form.reset();
    } catch (err) {
      formStatus.textContent = '❌ Something went wrong. Please try again.';
      formStatus.style.color = '#ef4444';
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa fa-paper-plane"></i>&nbsp; Send Message';
      setTimeout(() => { formStatus.textContent = ''; }, 5000);
    }
  });
}
// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  themeIcon.className = isLight ? 'fa fa-sun' : 'fa fa-moon';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Remember preference
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light');
  themeIcon.className = 'fa fa-sun';
}