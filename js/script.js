/* ═══════════════════════════════════════════════════════════
   SANDEEP ANGALA — PORTFOLIO SCRIPTS
   Dark mode, smooth scroll, animations, form handling
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

  // Close mobile menu on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ─── STICKY NAVBAR STYLE ON SCROLL ───
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

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

  // ─── SCROLL REVEAL (Intersection Observer) ───
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  // ─── SKILL TAG ANIMATION ───
  const skillTags = document.querySelectorAll('.skill-tag[data-level]');
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const level = entry.target.getAttribute('data-level');
          entry.target.style.setProperty('--level', level + '%');
          entry.target.classList.add('animated');
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillTags.forEach(tag => skillObserver.observe(tag));

  // ─── COUNTER ANIMATION ───
  const counters = document.querySelectorAll('.stat-number[data-count]');
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          let current = 0;
          const step = Math.max(1, Math.floor(target / 40));
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            el.textContent = current;
          }, 40);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(c => counterObserver.observe(c));

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
      typeSpeed = 2000; // pause at end
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      taglineIdx = (taglineIdx + 1) % taglines.length;
      typeSpeed = 400; // pause before next word
    }

    setTimeout(typeLoop, typeSpeed);
  }
  typeLoop();

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

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formStatus.textContent = 'Please enter a valid email address.';
      formStatus.className = 'form-status error';
      return;
    }

    // Simulate successful submission
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

  // ─── SMOOTH SCROLL FOR ALL ANCHOR LINKS ───
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
