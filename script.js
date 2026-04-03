// THEME
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const saved = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', saved);
setIcon(saved);
themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  setIcon(next);
});
function setIcon(t) {
  themeIcon.className = t === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
}

// HAMBURGER
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('open')));

// ACTIVE NAV
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 80;
  document.querySelectorAll('section[id]').forEach(sec => {
    const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
    if (!link) return;
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

// MODALS
const overlay = document.getElementById('overlay');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.exp-card').forEach(card => {
  card.addEventListener('click', () => {
    const tpl = document.getElementById(card.dataset.modal);
    if (!tpl) return;
    modalBody.innerHTML = tpl.innerHTML;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});
function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}
modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// SCROLL REVEAL — cards only
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.animationPlayState = 'running';
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.exp-card, .proj-card').forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});

// CONTACT FORM
// Replace with your actual EmailJS credentials:
const SERVICE_ID  = 'YOUR_SERVICE_ID';
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';

const form     = document.getElementById('contactForm');
const formMsg  = document.getElementById('formMsg');
const submitBtn = document.getElementById('submitBtn');
const btnText  = document.getElementById('btnText');

form.addEventListener('submit', async e => {
  e.preventDefault();
  btnText.textContent = 'Sending...';
  submitBtn.disabled = true;
  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      from_name:  document.getElementById('fname').value,
      from_email: document.getElementById('femail').value,
      message:    document.getElementById('fmsg').value,
    }, PUBLIC_KEY);
    show("Message sent! I'll get back to you soon.", 'ok');
    form.reset();
  } catch (err) {
    show('Something went wrong. Please try again.', 'err');
  } finally {
    btnText.textContent = 'Send Message';
    submitBtn.disabled = false;
  }
});
function show(msg, cls) {
  formMsg.textContent = msg;
  formMsg.className = 'form-msg ' + cls;
  setTimeout(() => { formMsg.textContent = ''; formMsg.className = 'form-msg'; }, 5000);
}