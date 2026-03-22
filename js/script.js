/* ═══════════════════════════════════════════════════════════
   SANDEEP ANGALA — PORTFOLIO SCRIPTS
   Enhanced animations, micro-interactions, staggered reveals
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) lucide.createIcons();

  // ─── DARK MODE TOGGLE ───
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // ─── MOBILE MENU ───
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ─── NAVBAR SHRINK ON SCROLL ───
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  const handleNavbar = () => {
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 50);
    lastScroll = scrollY;
  };
  window.addEventListener('scroll', handleNavbar, { passive: true });
  handleNavbar();

  // ─── ACTIVE NAV LINK ON SCROLL ───
  const sections = document.querySelectorAll('.section, .hero');
  const navLinksList = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinksList.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

  // ─── ENHANCED SCROLL REVEAL WITH STAGGER ───
  const isMobile = window.innerWidth < 768;
  const STAGGER_DELAY = isMobile ? 0.08 : 0.12; // seconds per child

  // Apply stagger delays to children
  document.querySelectorAll('.stagger-container').forEach(container => {
    const children = container.querySelectorAll('.stagger-child');
    children.forEach((child, index) => {
      child.style.transitionDelay = `${index * STAGGER_DELAY}s`;
    });
  });

  // Intersection Observer for reveal animations
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: isMobile ? 0.08 : 0.12,
      rootMargin: '0px 0px -30px 0px'
    }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ─── SKILL TAG ANIMATION ───
  const skillTags = document.querySelectorAll('.skill-tag[data-level]');
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Slight delay for stagger feel
          setTimeout(() => {
            const level = entry.target.getAttribute('data-level');
            entry.target.style.setProperty('--level', level + '%');
            entry.target.classList.add('animated');
          }, 200);
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillTags.forEach(tag => skillObserver.observe(tag));

  // ─── COUNTER ANIMATION (eased) ───
  const counters = document.querySelectorAll('.stat-number[data-count]');
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          const duration = 1200; // ms
          const startTime = performance.now();

          function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
          }

          function updateCount(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutCubic(progress);
            el.textContent = Math.round(easedProgress * target);
            if (progress < 1) {
              requestAnimationFrame(updateCount);
            }
          }

          requestAnimationFrame(updateCount);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(c => counterObserver.observe(c));

  // ─── EDUCATION TIMELINE LINE GROW ───
  const timeline = document.getElementById('educationTimeline');
  if (timeline) {
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            timeline.classList.add('animate-line');
            timelineObserver.unobserve(timeline);
          }
        });
      },
      { threshold: 0.15 }
    );
    timelineObserver.observe(timeline);
  }

  // ─── TYPING ANIMATION ───
  const taglines = [
    'Full Stack Developer',
    'UI Enthusiast',
    'Problem Solver',
    'Creative Coder'
  ];
  const taglineEl = document.getElementById('heroTagline');
  let taglineIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typeLoop() {
    const current = taglines[taglineIdx];
    if (isDeleting) {
      taglineEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 40;
    } else {
      taglineEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIdx === current.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      taglineIdx = (taglineIdx + 1) % taglines.length;
      typeSpeed = 400;
    }

    setTimeout(typeLoop, typeSpeed);
  }
  typeLoop();

  // ─── BUTTON RIPPLE EFFECT ───
  document.querySelectorAll('.btn-ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      this.style.setProperty('--ripple-x', x + 'px');
      this.style.setProperty('--ripple-y', y + 'px');

      // Use a pseudo-element approach via class toggle
      this.classList.remove('rippling');
      // Force reflow
      void this.offsetWidth;
      this.classList.add('rippling');

      setTimeout(() => {
        this.classList.remove('rippling');
      }, 600);
    });

    // Update ripple positioning
    btn.style.cssText += `
      --ripple-x: 50%;
      --ripple-y: 50%;
    `;

    // Override ::after to use custom position
    const style = document.createElement('style');
    style.textContent = `
      .btn-ripple::after {
        left: var(--ripple-x);
        top: var(--ripple-y);
      }
    `;
    if (!document.querySelector('#ripple-style')) {
      style.id = 'ripple-style';
      document.head.appendChild(style);
    }
  });

  // ─── CONTACT FORM HANDLING ───
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Please fill in all fields.';
      formStatus.className = 'form-status error';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formStatus.textContent = 'Please enter a valid email address.';
      formStatus.className = 'form-status error';
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i data-lucide="loader-2" class="spin-icon"></i> Sending...';
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
      formStatus.className = 'form-status success';
      form.reset();
      btn.disabled = false;
      btn.innerHTML = '<i data-lucide="send"></i> Send Message';
      if (window.lucide) lucide.createIcons();

      setTimeout(() => {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
      }, 5000);
    }, 1500);
  });

  // ─── SMOOTH SCROLL ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
