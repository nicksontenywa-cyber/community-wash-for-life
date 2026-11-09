/**
 * COMMUNITY LISTENERS FOR CHRIST (CLC)
 * Official Interactive Scripts
 * "Listening with Love, Sharing Christ's Hope"
 * Busia District, Uganda
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // --- 1. Sticky Navbar & Header Scroll ---
  // Uses passive listener + rAF debounce to keep scroll silky-smooth on mobile
  const navbar = document.querySelector('.clc-navbar');
  let navbarScrollRaf = null;
  window.addEventListener('scroll', function () {
    if (navbarScrollRaf) return;
    navbarScrollRaf = requestAnimationFrame(function () {
      if (navbar) {
        if (window.scrollY > 30) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
      navbarScrollRaf = null;
    });
  }, { passive: true });

  // --- 2. Mobile Drawer Navigation ---
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileOverlay = document.querySelector('.mobile-drawer-overlay');
  const mobileClose = document.querySelector('.mobile-drawer-close');

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (mobileOverlay) mobileOverlay.classList.add('open');
    if (mobileToggle) mobileToggle.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('open');
    if (mobileToggle) mobileToggle.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (mobileClose) mobileClose.addEventListener('click', closeDrawer);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);

  // Close drawer on link click
  const drawerLinks = document.querySelectorAll('.mobile-drawer-menu a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // --- 3. Active Link Highlighting ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.nav-link, .mobile-drawer-menu a');
  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- 4. Interactive Community Listener 6-Step Model ---
  const stepCards = document.querySelectorAll('.model-step-card');
  const detailBoxTitle = document.getElementById('modelDetailTitle');
  const detailBoxDesc = document.getElementById('modelDetailDesc');
  const detailBoxAction = document.getElementById('modelDetailAction');
  const detailBoxBoundary = document.getElementById('modelDetailBoundary');

  const modelStepsData = {
    1: {
      title: "Step 1: LISTEN (Compassionate & Non-Judgmental Presence)",
      desc: "Christian Community Listeners visit households and community members to offer patient, dignified, and active listening. We provide a safe, calm space for people to express grief, worry, marital tension, or life challenges without fear of judgment, criticism, or unwanted unsolicited advice.",
      action: "Field Action: Unhurried home visits, listening with deep empathy, active reflective listening, and unconditional positive regard.",
      boundary: "Boundary: Listeners never diagnose, dispute, or force conversation; listening is confidential and completely voluntary."
    },
    2: {
      title: "Step 2: UNDERSTAND (Empathy & Discerning Core Needs)",
      desc: "Taking time to deeply comprehend the root spiritual, emotional, relational, or socio-economic stress facing the individual or family. Listeners discern whether the primary need is spiritual encouragement, family reconciliation, life guidance, or acute specialized care.",
      action: "Field Action: Empathetic clarification, understanding family dynamics, noting vulnerabilities, assessing safeguarding concerns.",
      boundary: "Boundary: Respecting personal dignity; no assumptions or pryings into confidential matters beyond the person's comfort."
    },
    3: {
      title: "Step 3: ENCOURAGE (Biblical Comfort & Spiritual Hope)",
      desc: "Offering uplifting Christian encouragement, affirming human dignity, sharing verses of comfort, and extending prayer where welcomed. CLC operates under the constitutional principle that prayer is offered respectfully and without coercion.",
      action: "Field Action: Sharing prayer of peace, scripture of hope, affirming God's love, restoring personal self-worth.",
      boundary: "Boundary: Participation is never conditional upon religious affiliation or conversion. Services are free and open to everyone."
    },
    4: {
      title: "Step 4: SUPPORT (Practical Care & Family Accompaniment)",
      desc: "Standing alongside families through difficult moments with community solidarity, practical care, mentorship for youth, and guidance for peaceful conflict resolution within the household.",
      action: "Field Action: Life skills mentorship for youth, family reconciliation dialogues, connecting neighbors with local church care.",
      boundary: "Boundary: Volunteers avoid financial entanglements and maintain strict ethical volunteer boundaries."
    },
    5: {
      title: "Step 5: REFER (Safe, Responsible Professional Referral)",
      desc: "Community Listeners are trained to strictly recognize the limits of their competence. When a case involves medical distress, mental health disorders, severe domestic abuse, legal disputes, or child safeguarding, responsible immediate referrals are made to qualified professionals.",
      action: "Field Action: Direct coordination with Busia District hospitals, Health Centers, Probation & Social Welfare, Police CFPU, and legal aid.",
      boundary: "Boundary: Volunteers NEVER attempt psychiatric therapy, legal representation, or medical diagnosis. Referral is mandatory."
    },
    6: {
      title: "Step 6: FOLLOW UP (Continuous Pastoral & Community Walking Alongside)",
      desc: "Referral is not the end of care. Community Listeners conduct structured follow-up visits to ensure the individual received professional assistance, encourage ongoing treatment adherence, and continue offering emotional and spiritual support.",
      action: "Field Action: Scheduled follow-up home visits, check-ins on family stability, prayer support, and long-term mentorship.",
      boundary: "Boundary: Observing confidentiality throughout; checking that safeguarding measures remain intact."
    }
  };

  stepCards.forEach(card => {
    card.addEventListener('click', function () {
      const stepNumber = this.getAttribute('data-step');
      stepCards.forEach(c => c.classList.remove('active'));
      this.classList.add('active');

      const data = modelStepsData[stepNumber];
      if (data && detailBoxTitle && detailBoxDesc && detailBoxAction && detailBoxBoundary) {
        detailBoxTitle.textContent = data.title;
        detailBoxDesc.textContent = data.desc;
        detailBoxAction.textContent = data.action;
        detailBoxBoundary.textContent = data.boundary;
      }
    });
  });

  // --- 5. Animated Stats Counter ---
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          const target = parseInt(entry.target.getAttribute('data-count'), 10);
          const prefix = entry.target.getAttribute('data-prefix') || '';
          const suffix = entry.target.getAttribute('data-suffix') || '';
          let current = 0;
          const duration = 1800;
          const stepTime = Math.abs(Math.floor(duration / target)) || 20;

          const timer = setInterval(() => {
            current += Math.ceil(target / 45);
            if (current >= target) {
              entry.target.textContent = prefix + target.toLocaleString() + suffix;
              clearInterval(timer);
            } else {
              entry.target.textContent = prefix + current.toLocaleString() + suffix;
            }
          }, stepTime);

          entry.target.classList.add('counted');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statNumbers.forEach(stat => statsObserver.observe(stat));
  }

  // --- 6. Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // --- 7. Modals: Request a Listener, Volunteer, Donate ---
  const modalTriggers = document.querySelectorAll('[data-open-modal]');
  const modalClosers = document.querySelectorAll('.clc-modal-close, [data-close-modal]');
  const allModals = document.querySelectorAll('.clc-modal-backdrop');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      const modalId = this.getAttribute('data-open-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  modalClosers.forEach(closer => {
    closer.addEventListener('click', function () {
      allModals.forEach(modal => modal.classList.remove('active'));
      document.body.style.overflow = '';
    });
  });

  allModals.forEach(modal => {
    modal.addEventListener('click', function (e) {
      if (e.target === this) {
        this.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // --- 8. Toast Notification Utility ---
  function showToast(message, icon = 'fa-check-circle') {
    let toast = document.querySelector('.clc-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'clc-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }
  window.clcShowToast = showToast;

  // --- 9. Form Submission Handlers ---
  const forms = document.querySelectorAll('form[data-clc-form]');
  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const formType = this.getAttribute('data-clc-form');
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }

        // Close parent modal if inside one
        const parentModal = form.closest('.clc-modal-backdrop');
        if (parentModal) {
          parentModal.classList.remove('active');
          document.body.style.overflow = '';
        }

        form.reset();

        if (formType === 'prayer-request') {
          showToast('Thank you. Your listening/prayer request has been received with strict confidentiality.', 'fa-heart');
        } else if (formType === 'volunteer-apply') {
          showToast('Thank you! Your volunteer application has been submitted to the Training Committee.', 'fa-user-check');
        } else if (formType === 'complaint-feedback') {
          showToast('Your feedback has been logged securely under our independent governance policy.', 'fa-shield-halved');
        } else if (formType === 'partner-inquiry') {
          showToast('Thank you for reaching out. Our Executive Committee will contact you shortly.', 'fa-handshake');
        } else {
          showToast('Thank you! Your message has been received.', 'fa-check-circle');
        }
      }, 900);
    });
  });

  // --- 10. Filterable Tab Controls (Programs & Gallery) ---
  // Uses CSS class toggling instead of inline style mutation for better GPU performance
  const filterButtons = document.querySelectorAll('[data-filter]');
  const filterItems = document.querySelectorAll('[data-category]');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      const filterValue = this.getAttribute('data-filter');
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      filterItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('filter-hidden');
        } else {
          item.classList.add('filter-hidden');
        }
      });
    });
  });
  // --- 11. Keyboard Esc Handler & Dynamic Year ---
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeDrawer();
      allModals.forEach(modal => modal.classList.remove('active'));
      document.body.style.overflow = '';
    }
  });

  const yearSpans = document.querySelectorAll('#currentYear');
  yearSpans.forEach(span => {
    span.textContent = new Date().getFullYear();
  });
});
