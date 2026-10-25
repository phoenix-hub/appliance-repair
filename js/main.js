document.body.classList.add('js-ready');

// ===== Scroll Progress Bar =====
const progress = document.createElement('div');
progress.className = 'scroll-progress';
document.body.appendChild(progress);
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progress.style.width = scrolled + '%';
});

// ===== Mobile Menu =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
}

// ===== WhatsApp Number =====
const WHATSAPP_NUMBER = "6392765178";

function sendToWhatsApp(message) {
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
}

// ===== Scroll Reveal (IntersectionObserver) =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-animate]').forEach(el => revealObserver.observe(el));

// ===== Count-up Numbers =====
const countEls = document.querySelectorAll('[data-count]');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.count);
    const duration = 1400;
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    let start = 0;
    const startTime = performance.now();
    function tick(now) {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = (target * eased).toFixed(decimals);
      el.textContent = prefix + formatNum(val) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });

function formatNum(n) {
  const num = parseFloat(n);
  if (num >= 1000) return num.toLocaleString('en-IN');
  return n;
}
countEls.forEach(el => countObserver.observe(el));

// ===== Booking Form =====
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('bName').value;
    const phone = document.getElementById('bPhone').value;
    const appliance = document.getElementById('bAppliance').value;
    const address = document.getElementById('bAddress').value;
    const date = document.getElementById('bDate')?.value || 'Not set';
    const issue = document.getElementById('bIssue')?.value || 'Not specified';
    const msg = `*New Booking — Abhishek Enterprises*%0A%0AName: ${name}%0APhone: ${phone}%0AAppliance: ${appliance}%0AArea: ${address}%0ADate: ${date}%0AIssue: ${issue}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  });
}

// ===== Enquiry Form =====
const enquiryForm = document.getElementById('enquiryForm');
if (enquiryForm) {
  enquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('eName').value;
    const phone = document.getElementById('ePhone').value;
    const message = document.getElementById('eMessage').value;
    const msg = `*New Enquiry — Abhishek Enterprises*%0A%0AName: ${name}%0APhone: ${phone}%0AMessage: ${message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  });
}

// ===== Review Form =====
const reviewForm = document.getElementById('reviewForm');
if (reviewForm) {
  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('rName').value;
    const rating = document.getElementById('rRating').value;
    const review = document.getElementById('rReview').value;
    const msg = `*New Review — Abhishek Enterprises*%0A%0AName: ${name}%0ARating: ${rating} stars%0AReview: ${review}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  });
}

// Active nav
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.href === window.location.href) link.classList.add('active');
});