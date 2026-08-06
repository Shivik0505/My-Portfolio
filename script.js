// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(15,15,23,0.98)';
  } else {
    navbar.style.background = 'rgba(15,15,23,0.85)';
  }
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navItems.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === `#${current}`) {
      a.style.color = 'var(--primary-light)';
    }
  });
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

const animTargets = document.querySelectorAll(
  '.timeline-card, .project-card, .skill-category, .edu-card, .stat, .contact-item'
);
animTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ===== FORMSPREE CONTACT FORM =====
// Setup takes 2 minutes:
// 1. Go to https://formspree.io → Sign up with shivamvikhar0505@gmail.com
// 2. Click "New Form" → name it "Portfolio Contact"
// 3. Copy the Form ID from the endpoint URL shown (e.g. "abcd1234" from https://formspree.io/f/abcd1234)
// 4. Paste it below replacing YOUR_FORM_ID
const FORMSPREE_ID = 'xvkpgaen';

function handleSubmit(e) {
  e.preventDefault();

  const btn     = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const msg     = document.getElementById('form-msg');
  const form    = document.getElementById('contact-form');

  if (FORMSPREE_ID === 'YOUR_FORM_ID') {
    msg.textContent = '⚠ Form not configured yet. Please set your Formspree ID in script.js';
    msg.style.color = '#fb923c';
    return;
  }

  // Loading state
  btn.disabled = true;
  btnText.textContent = 'Sending...';
  btn.style.opacity = '0.7';
  msg.textContent = '';
  msg.style.color = '';

  const data = {
    name:    document.getElementById('name').value,
    email:   document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value,
  };

  fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(res => {
      if (res.ok) {
        msg.textContent = '✓ Message sent! Shivam will get back to you soon.';
        msg.style.color = 'var(--green)';
        form.reset();
      } else {
        return res.json().then(err => { throw err; });
      }
    })
    .catch(() => {
      msg.textContent = '✗ Something went wrong. Email directly: shivamvikhar0505@gmail.com';
      msg.style.color = '#f87171';
    })
    .finally(() => {
      btn.disabled = false;
      btnText.textContent = 'Send Message';
      btn.style.opacity = '1';
      setTimeout(() => { msg.textContent = ''; }, 6000);
    });
}
