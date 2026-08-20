/* ============================================================
   Apex Signing & Biometric Group, LLC — Site JS
   - Sticky nav transparency toggle on scroll
   - Mobile nav open/close
   - Sticky mobile CTA visibility
   - Data-driven services (statuses flip without HTML edits)
   - FAQ accordion rendered from data
   - Contact form demo submit
   - Current year in footer
   ============================================================ */

// Edit SERVICES + FAQS to change site content without touching HTML.

const SERVICES = [
  {
    key: 'mobile_notary',
    title: 'Mobile Notary Services',
    description: 'Professional general notarial services by appointment. Apex meets you at a location that works for you.',
    status: 'available',
    icon: 'notary'
  },
  {
    key: 'loan_signing',
    title: 'Loan Signing Services',
    description: 'Professional loan-document signing appointments for consumers and industry professionals.',
    status: 'available',
    icon: 'signing'
  },
  {
    key: 'apostille',
    title: 'Apostille Facilitation',
    description: 'Assistance navigating document apostille and authentication processes for international use.',
    status: 'coming_soon',
    icon: 'apostille'
  },
  {
    key: 'live_scan',
    title: 'Live Scan / Biometric Services',
    description: 'Fingerprinting and biometric-related services for professional and personal use.',
    status: 'coming_soon',
    icon: 'biometric'
  }
];

const STATUS_LABELS = {
  available: 'Available',
  coming_soon: 'Coming Soon',
  by_appointment: 'By Appointment',
  temporarily_unavailable: 'Temporarily Unavailable'
};

const SERVICE_ICONS = {
  notary: `<svg viewBox="0 0 24 24" width="26" height="26"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M7 3 H14 L19 8 V21 H5 V5 A2 2 0 0 1 7 3 Z M14 3 V8 H19 M9 13 H15 M9 17 H14"/></svg>`,
  signing: `<svg viewBox="0 0 24 24" width="26" height="26"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M4 20 L8 20 L20 8 L16 4 L4 16 Z M14 6 L18 10 M4 20 C 8 18, 12 22, 20 20"/></svg>`,
  apostille: `<svg viewBox="0 0 24 24" width="26" height="26"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 12 H21 M12 3 C 14.5 6, 14.5 18, 12 21 M12 3 C 9.5 6, 9.5 18, 12 21" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
  biometric: `<svg viewBox="0 0 24 24" width="26" height="26"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M8 21 C 6 18, 5 15, 5 12 A7 7 0 0 1 19 12 C 19 15, 18 18, 16 21 M8.5 12 A3.5 3.5 0 0 1 15.5 12 C 15.5 15, 14.5 18, 13 21 M11.5 12 V16"/></svg>`
};

const FAQS = [
  {
    q: 'What identification is required for notarization?',
    a: 'A current, government-issued photo ID is typically required. Details will be confirmed during scheduling so you know exactly what to bring.'
  },
  {
    q: 'Do you offer mobile appointments?',
    a: 'Yes. Apex is set up to travel to you at a mutually convenient location. Availability and any travel considerations will be confirmed at scheduling.'
  },
  {
    q: 'How do I schedule an appointment?',
    a: 'Use the Book an Appointment button, or send a message through the contact form on this page. Apex will confirm your appointment personally.'
  },
  {
    q: 'What forms of payment are accepted?',
    a: 'Accepted payment methods will be listed at the time of scheduling. Details will be published here once finalized.'
  },
  {
    q: 'What is a loan signing appointment?',
    a: 'A loan signing is a coordinated appointment where a signing agent walks the signer through mortgage or loan closing documents and notarizes what is required.'
  },
  {
    q: 'What is an apostille?',
    a: 'An apostille is a certification that authenticates the origin of a public document so it can be recognized in another country party to the Hague Convention.'
  },
  {
    q: 'How should I prepare for my appointment?',
    a: 'Have your government-issued ID ready, review your documents in advance, and note any pages that require witnesses or additional signatures. Apex will confirm the specifics with you before the appointment.'
  },
  {
    q: 'Do you provide fingerprinting or Live Scan services?',
    a: 'Live Scan and biometric services are being added and will be marked Available on this page as soon as they launch.'
  }
];

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// Header transparency toggle
const header = $('#siteHeader');
function updateHeader() {
  header.dataset.transparent = window.scrollY > 80 ? 'false' : 'true';
}
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// Mobile nav toggle
const navToggle = $('#navToggle');
const primaryNav = $('#primaryNav');
navToggle.addEventListener('click', () => {
  const open = primaryNav.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
$$('#primaryNav a').forEach(a => a.addEventListener('click', () => {
  primaryNav.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

// Sticky mobile CTA — surfaces after the hero on narrow viewports
const stickyCta = $('#stickyCta');
function updateStickyCta() {
  if (window.innerWidth > 720) { stickyCta.classList.remove('visible'); return; }
  const hero = $('.hero');
  const showAfter = hero ? hero.offsetHeight - 100 : 300;
  stickyCta.classList.toggle('visible', window.scrollY > showAfter);
}
window.addEventListener('scroll', updateStickyCta, { passive: true });
window.addEventListener('resize', updateStickyCta);
updateStickyCta();

// Render services
function renderServices() {
  const grid = $('#serviceGrid');
  grid.innerHTML = SERVICES.map(s => `
    <article class="service-card">
      <span class="service-icon" aria-hidden="true">${SERVICE_ICONS[s.icon] || ''}</span>
      <h3>${s.title}</h3>
      <p>${s.description}</p>
      <span class="status-pill ${s.status}" aria-label="Status: ${STATUS_LABELS[s.status]}">${STATUS_LABELS[s.status]}</span>
    </article>
  `).join('');
}
renderServices();

// Render FAQs
function renderFaqs() {
  const list = $('#faqList');
  list.innerHTML = FAQS.map(f => `
    <details class="faq-item">
      <summary>${f.q}</summary>
      <div class="faq-answer">${f.a}</div>
    </details>
  `).join('');
}
renderFaqs();

// Footer year
const yearEl = $('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Contact form (demo)
const form = $('#contactForm');
const note = $('#formNote');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) {
      note.className = 'form-note error';
      note.textContent = 'Please complete the required fields.';
      return;
    }
    note.className = 'form-note success';
    note.textContent = 'Thank you — a real submission endpoint will be connected before launch.';
    form.reset();
  });
}
