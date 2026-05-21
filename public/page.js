/* ============================================================
   page.js — small, page-agnostic interactions.
   Lives in /public so it's served at /page.js on every route.

   Scope:
     - nav scrolled state
     - modal open/close + form mock submit
     - FAQ accordion toggle
     - reveal-on-scroll intersection observer

   Anything that's data-driven (steps, benefits, FAQ items) now lives
   in .astro files as static markup — no JS injection needed.
   ============================================================ */

// -------- Nav scrolled state --------
(() => {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => {
    if (window.scrollY > 8) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// -------- FAQ accordion --------
document.querySelectorAll('.faq-item').forEach((item) => {
  const btn = item.querySelector('.faq-q');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const open = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
});

// -------- Modal --------
(() => {
  const modal = document.getElementById('modal');
  if (!modal) return;
  const form = document.getElementById('access-form');
  const formWrap = document.getElementById('modal-form');
  const success = document.getElementById('modal-success');
  const otherField = document.getElementById('other-stack-field');

  const open = () => {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => modal.querySelector('input[type=email]')?.focus(), 50);
  };
  const close = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    // Reset form/state after the closing transition so it doesn't flash.
    setTimeout(() => {
      if (formWrap) formWrap.style.display = '';
      if (success) success.style.display = 'none';
      if (form) form.reset();
      if (otherField) otherField.style.display = 'none';
      // Re-sync radio selected styles to first option.
      [...modal.querySelectorAll('.radio-row')].forEach((r, i) => {
        r.classList.toggle('selected', i === 0)
      });
    }, 200);
  };

  document.querySelectorAll('.js-open-modal').forEach((b) => {
    b.addEventListener('click', open)
  });
  document.querySelectorAll('.js-close-modal').forEach((b) => {
    b.addEventListener('click', (e) => {
      e.preventDefault();
      close();
    })
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });

  if (!form) return;

  // Visually sync the .selected ring on radio rows.
  form.querySelectorAll('.radio-row input[type=radio]').forEach((r) => {
    r.addEventListener('change', () => {
      form.querySelectorAll('.radio-row').forEach((row) => {
        row.classList.toggle('selected', row.querySelector('input').checked);
      });
    });
  });

  // Reveal the "Other…" stack input on demand.
  const stackSelect = form.querySelector('select[name=stack]');
  if (stackSelect && otherField) {
    stackSelect.addEventListener('change', (e) => {
      otherField.style.display = e.target.value === 'other' ? '' : 'none';
    });
  }

  // Mock submit — drops a spinner then shows success. Wire to a real backend
  // (Formspark, Netlify Forms, Cloudflare Worker, etc.) when ready.
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submit = form.querySelector('.btn-submit');
    submit.disabled = true;
    submit.innerHTML = `<svg width="16" height="16" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" fill="none" stroke="${getComputedStyle(document.body).getPropertyValue('--cta-text')}" stroke-width="4" stroke-linecap="round" stroke-dasharray="80 40"><animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.8s" repeatCount="indefinite"/></circle></svg>`;
    setTimeout(() => {
      if (formWrap) formWrap.style.display = 'none';
      if (success) success.style.display = '';
      submit.disabled = false;
      submit.textContent = 'Request Access';
    }, 700);
  });
})();

// -------- Reveal-on-scroll --------
(() => {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach((el) => {
      el.classList.add('in');
    });
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );
  els.forEach((el) => {
    io.observe(el);
  });
})();
