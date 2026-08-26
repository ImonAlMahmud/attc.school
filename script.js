/**
 * ATTC — Main Script
 * script.js — Hamburger Menu, Scroll Effects, Reveal Animations,
 *              Accordion, Lightbox, Counter Animation, Form Handling
 */

(function () {
  'use strict';

  /* ─── 1. DOM Ready Helper ─────────────────────────────── */
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {

    /* ── WebMCP Tool Registration for AI Browser Agents ───── */
    if (typeof navigator !== 'undefined' && navigator.modelContext && typeof navigator.modelContext.provideContext === 'function') {
      try {
        navigator.modelContext.provideContext({
          tools: [
            {
              name: "search_attc_courses",
              description: "Discover vocational training courses offered by ATTC Dhaka (Plasterer, Tiler, Bar Bending, Formwork Carpentry, Bricklayer)",
              inputSchema: {
                type: "object",
                properties: {
                  trade: { type: "string", description: "Course name or trade keyword" }
                }
              },
              execute: async function(args) {
                window.location.href = '/courses.html';
                return { status: "redirected", target: "/courses.html" };
              }
            },
            {
              name: "enroll_attc_course",
              description: "Open the online enrollment form for ATTC vocational programs",
              inputSchema: {
                type: "object",
                properties: {
                  courseName: { type: "string", description: "Name of the course to enroll in" }
                }
              },
              execute: async function(args) {
                window.location.href = '/enroll-now.html';
                return { status: "redirected", target: "/enroll-now.html" };
              }
            }
          ]
        });
      } catch (err) {
        console.log('WebMCP initialization note:', err.message);
      }
    }

    /* ── 2. Header Scroll Effect ──────────────────────────── */
    const header = document.getElementById('site-header');
    if (header) {
      window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 40);
      }, { passive: true });
    }



    /* ── Smooth Anchor Scrolling Helper ─────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            const headerOffset = 90;
            const elementPosition = targetEl.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    /* ── 3. Hamburger / Mobile Drawer ─────────────────────── */
    const hamburger = document.getElementById('hamburger');
    const drawer = document.getElementById('mobile-drawer');

    if (hamburger && drawer) {
      hamburger.addEventListener('click', () => {
        const isOpen = drawer.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      // Close on link click
      drawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          drawer.classList.remove('open');
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });

      // Close on Escape key
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && drawer.classList.contains('open')) {
          drawer.classList.remove('open');
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    }

    /* ── 4. Scroll-to-Top Button ──────────────────────────── */
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
      window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
      }, { passive: true });

      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    /* ── 5. Scroll Reveal (Intersection Observer) ─────────── */
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
      revealEls.forEach(el => observer.observe(el));
    }

    /* ── 6. Counter Animation ─────────────────────────────── */
    function animateCounter(el) {
      const target = parseInt(el.dataset.target, 10);
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current).toLocaleString();
      }, 16);
    }

    const counters = document.querySelectorAll('[data-target]');
    if (counters.length) {
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              counterObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      counters.forEach(el => counterObserver.observe(el));
    }

    /* ── 7. Curriculum Accordion ──────────────────────────── */
    const accordionItems = document.querySelectorAll('.accordion-item');
    if (accordionItems.length) {
      // Open first by default
      accordionItems[0]?.classList.add('active');

      accordionItems.forEach(item => {
        const trigger = item.querySelector('.accordion-trigger');
        trigger?.addEventListener('click', () => {
          const isActive = item.classList.contains('active');
          // Close all
          accordionItems.forEach(i => i.classList.remove('active'));
          // Toggle clicked
          if (!isActive) item.classList.add('active');
        });
      });
    }

    /* ── 8. Gallery Filtering & Lightbox ─────────────────── */
    const filterBtns = document.querySelectorAll('.filter-bar .filter-btn');
    const galleryCards = document.querySelectorAll('.gallery-card');

    if (filterBtns.length && galleryCards.length) {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const filter = btn.dataset.filter;
          galleryCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
              card.style.display = 'flex';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const clickableGalleryItems = document.querySelectorAll('.gallery-card[data-src], .gallery-item[data-src]');

    if (lightbox && lightboxImg) {
      clickableGalleryItems.forEach(item => {
        item.addEventListener('click', () => {
          lightboxImg.src = item.dataset.src;
          lightboxImg.alt = item.dataset.alt || item.dataset.title || '';
          
          if (lightboxTitle) lightboxTitle.textContent = item.dataset.title || '';
          if (lightboxDesc) lightboxDesc.textContent = item.dataset.caption || '';
          
          lightbox.classList.add('open');
          document.body.style.overflow = 'hidden';
        });
      });

      function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(() => { 
          lightboxImg.src = ''; 
          if (lightboxTitle) lightboxTitle.textContent = '';
          if (lightboxDesc) lightboxDesc.textContent = '';
        }, 300);
      }

      lightboxClose?.addEventListener('click', closeLightbox);
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) {
          closeLightbox();
        }
      });
    }

    /* ── 9. Contact / Enroll Form Handling ────────────────── */
    const forms = document.querySelectorAll('.attc-form');
    forms.forEach(form => {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = form.querySelector('[type="submit"]');
        const originalText = btn.textContent;

        btn.textContent = 'Sending...';
        btn.disabled = true;

        // Simulate async submission
        setTimeout(() => {
          btn.textContent = '✓ Message Sent!';
          btn.style.background = 'hsl(158, 72%, 26%)';
          form.reset();

          setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.background = '';
          }, 3500);
        }, 1200);
      });
    });

    /* ── 10. Course Filter (Courses Page) ─────────────────── */
    const courseFilterBtns = document.querySelectorAll('.filter-bar .filter-btn');
    const courseCards = document.querySelectorAll('.course-card[data-category]');

    if (courseFilterBtns.length && courseCards.length) {
      courseFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          courseFilterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const category = btn.dataset.filter;

          courseCards.forEach(card => {
            const show = category === 'all' || card.dataset.category === category;
            card.style.display = show ? '' : 'none';
            if (show) {
              card.style.animation = 'fadeUp 0.4s ease forwards';
            }
          });
        });
      });
    }

    /* ── 11. Smooth Anchor Links ──────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    /* ── 12. Hero Video Modal Pop-up ──────────────────────── */
    const openVideoBtn = document.getElementById('open-hero-video-modal');
    const videoModal = document.getElementById('hero-video-modal');
    const closeVideoBtn = document.getElementById('close-hero-video-btn');
    const videoBackdrop = document.getElementById('close-hero-video-backdrop');
    const videoIframe = document.getElementById('hero-youtube-iframe');
    const YOUTUBE_URL = "https://www.youtube.com/embed/XuYv9o13aJQ?autoplay=1";

    if (openVideoBtn && videoModal && videoIframe) {
      function openVideoModal() {
        videoIframe.src = YOUTUBE_URL;
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }

      function closeVideoModal() {
        videoModal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
          videoIframe.src = '';
        }, 300);
      }

      openVideoBtn.addEventListener('click', openVideoModal);
      closeVideoBtn?.addEventListener('click', closeVideoModal);
      videoBackdrop?.addEventListener('click', closeVideoModal);

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
          closeVideoModal();
        }
      });
    }

  }); // end ready()

})();
