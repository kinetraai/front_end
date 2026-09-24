// Initialize Lucide Icons
lucide.createIcons();

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.mobile-menu-toggle');
  const desktopNav = document.querySelector('.desktop-nav');
  const navActions = document.querySelector('.nav-actions');

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const isExpanded = desktopNav.style.display === 'flex';
      desktopNav.style.display = isExpanded ? 'none' : 'flex';
      desktopNav.style.flexDirection = 'column';
      desktopNav.style.position = 'absolute';
      desktopNav.style.top = '80px';
      desktopNav.style.left = '0';
      desktopNav.style.width = '100%';
      desktopNav.style.background = 'rgba(10, 4, 60, 0.95)';
      desktopNav.style.padding = '2rem';
      desktopNav.style.borderBottom = '1px solid rgba(3, 80, 111, 0.4)';
      
      if (navActions) {
        navActions.style.display = isExpanded ? 'none' : 'flex';
        navActions.style.flexDirection = 'column';
        navActions.style.position = 'absolute';
        navActions.style.top = '280px';
        navActions.style.left = '0';
        navActions.style.width = '100%';
        navActions.style.background = 'rgba(10, 4, 60, 0.95)';
        navActions.style.padding = '0 2rem 2rem';
      }
    });
  }

  // FAQ Accordion
  const accordionTriggers = document.querySelectorAll('.acc-trigger-modern');
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const content = trigger.nextElementSibling;
      
      // Close all others
      accordionTriggers.forEach(t => {
        t.setAttribute('aria-expanded', 'false');
        t.nextElementSibling.style.maxHeight = null;
      });

      if (!isExpanded) {
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  // Cookie Consent
  const cookieBanner = document.getElementById('cookieBanner');
  const acceptBtn = document.getElementById('acceptCookies');
  const declineBtn = document.getElementById('declineCookies');

  if (cookieBanner && !localStorage.getItem('kinetra_cookie_consent')) {
    setTimeout(() => {
      cookieBanner.classList.remove('hidden');
    }, 1500);
  }

  const handleConsent = (status) => {
    localStorage.setItem('kinetra_cookie_consent', status);
    cookieBanner.classList.add('hidden');
  };

  if (acceptBtn) acceptBtn.addEventListener('click', () => handleConsent('accepted'));
  if (declineBtn) declineBtn.addEventListener('click', () => handleConsent('declined'));

  // Shared Formspree submit helper
  // NOTE: takes a pre-built FormData snapshot, not the live form element —
  // disabling inputs for the "submitting..." state removes them from
  // `new FormData(form)`, so the snapshot must be taken before disabling.
  const submitToFormspree = async (action, formData) => {
    const response = await fetch(action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    });

    if (response.ok) return { ok: true };

    const data = await response.json().catch(() => null);
    const message = data && data.errors
      ? data.errors.map((err) => err.message).join(', ')
      : 'Something went wrong. Please try again.';
    return { ok: false, message };
  };

  // Newsletter Form
  const nlForm = document.getElementById('nlForm');
  if (nlForm) {
    nlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = nlForm.querySelector('input');
      const btn = nlForm.querySelector('button');
      const msg = document.getElementById('nlStatus');
      const formData = new FormData(nlForm);

      input.disabled = true;
      btn.disabled = true;

      submitToFormspree(nlForm.action, formData)
        .catch(() => ({ ok: false, message: 'Network error. Please try again.' }))
        .then(({ ok, message }) => {
          msg.textContent = ok ? 'Thank you! You\'re subscribed.' : message;
          msg.classList.toggle('error', !ok);
          msg.classList.remove('hidden');

          if (ok) input.value = '';

          setTimeout(() => {
            input.disabled = false;
            btn.disabled = false;
            msg.classList.add('hidden');
          }, 3000);
        });
    });
  }

  // Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const status = document.getElementById('contactStatus');
      const originalText = btn.textContent;

      // reCAPTCHA must be solved before we even hit the network
      const hasRecaptcha = window.grecaptcha && contactForm.querySelector('.g-recaptcha');
      if (hasRecaptcha && !window.grecaptcha.getResponse().trim()) {
        status.textContent = 'Please verify you\'re not a robot.';
        status.classList.add('visible', 'error');
        return;
      }

      const formData = new FormData(contactForm);

      btn.textContent = 'Sending...';
      btn.disabled = true;
      status.classList.remove('visible', 'success', 'error');

      submitToFormspree(contactForm.action, formData)
        .catch(() => ({ ok: false, message: 'Network error. Please try again.' }))
        .then(({ ok, message }) => {
          status.textContent = ok ? 'Thank you! Your message has been sent — we\'ll be in touch soon.' : message;
          status.classList.add('visible', ok ? 'success' : 'error');

          if (hasRecaptcha) window.grecaptcha.reset();

          if (!ok) {
            btn.textContent = originalText;
            btn.disabled = false;
            return;
          }

          btn.textContent = 'Message Sent ✓';
          contactForm.reset();

          setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            status.classList.remove('visible', 'success');
          }, 3000);
        });
    });
  }

  // Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Optional: stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => observer.observe(el));
});
