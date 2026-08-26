/**
 * ATTC — Global Components
 * components.js — Injects shared Nav, CTA, and Footer across all pages.
 * Detects current page path to set active nav link state.
 */

(function () {
  'use strict';

  /* ─── Path Helper ──────────────────────────────────────── */
  function getBasePath() {
    const depth = window.location.pathname.split('/').filter(Boolean).length;
    // Inside /courses/ directory => go up one level
    if (window.location.pathname.includes('/courses/')) return '../';
    return '';
  }

  function isActive(href) {
    const path = window.location.pathname;
    if (href === '' || href === 'index.html') {
      return path === '/' || path.endsWith('/index.html') || path === '';
    }
    return path.includes(href.replace('../', '').replace('.html', ''));
  }

  /* ─── Navigation Links Config ──────────────────────────── */
  const navLinks = [
    { label: 'Home', href: 'index.html' },
    { label: 'About', href: 'about.html' },
    { label: 'Courses', href: 'courses.html' },
    { label: 'Gallery', href: 'gallery.html' },
    { label: 'Contact', href: 'contact.html' },
  ];

  /* ─── Build Navigation HTML ────────────────────────────── */
  function buildNav() {
    const base = getBasePath();
    const linksHtml = navLinks.map(link => {
      const href = base + link.href;
      const active = isActive(link.href) ? ' active' : '';
      return `<li><a href="${href}" class="${active.trim()}">${link.label}</a></li>`;
    }).join('');

    const mobileLinksHtml = navLinks.map(link => {
      const href = base + link.href;
      const active = isActive(link.href) ? ' active' : '';
      return `<a href="${href}" class="${active.trim()}">${link.label}</a>`;
    }).join('');

    const navHtml = `
      <header id="site-header">
        <div class="container nav-container">
          <a href="${base}index.html" class="nav-logo" aria-label="ATTC Home">
            <img src="${base}images/logo.webp" alt="ATTC Logo" class="nav-logo-img">
            <div class="nav-logo-text">
              <span class="logo-line-1">Advance Training &amp;</span>
              <span class="logo-line-2">Testing Center</span>
            </div>
          </a>

          <nav aria-label="Main Navigation">
            <ul class="nav-links">${linksHtml}</ul>
          </nav>

          <div class="nav-actions">
            <a href="${base}enroll-now.html" class="btn btn-accent btn-sm">
              <i class="fa-solid fa-plus"></i>
              Enroll Now
            </a>
            <button class="hamburger" id="hamburger" aria-label="Open Menu" aria-expanded="false">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      <!-- Mobile Drawer -->
      <nav class="mobile-drawer" id="mobile-drawer" aria-label="Mobile Navigation">
        ${mobileLinksHtml}
        <div class="drawer-cta">
          <a href="${base}enroll-now.html" class="btn btn-accent btn-lg" style="width:100%;justify-content:center;">
            Enroll Now — Start Your Journey
          </a>
        </div>
      </nav>
    `;

    document.body.insertAdjacentHTML('afterbegin', navHtml);
  }

  /* ─── Build Footer HTML ────────────────────────────────── */
  function buildFooter() {
    const base = getBasePath();

    const footerHtml = `
      <footer id="site-footer">
        <div class="container">
          <div class="footer-top">
            <!-- Brand -->
            <div class="footer-brand">
              <a href="${base}index.html" class="nav-logo" style="margin-bottom: var(--space-4); display: flex; align-items: center; gap: 12px; text-decoration: none;">
                <img src="${base}images/logo.webp" alt="ATTC Logo" class="nav-logo-img" style="height: 48px; width: auto; flex-shrink: 0;">
                <div class="nav-logo-text">
                  <span class="logo-line-1">Advance Training &amp;</span>
                  <span class="logo-line-2">Testing Center</span>
                </div>
              </a>
              <p>Empowering individuals with cutting-edge vocational skills to drive global progress. ISO 9001:2015 certified, industry-recognized training in Dhaka, Bangladesh.</p>
              <div class="footer-social" style="display: flex; flex-direction: row; gap: 10px; margin-top: var(--space-4);">
                <a href="https://www.youtube.com/@ATTC_school" target="_blank" rel="noopener" class="social-btn" aria-label="YouTube">
                  <i class="fa-brands fa-youtube"></i>
                </a>
                <a href="https://wa.me/8801335143359" target="_blank" rel="noopener" class="social-btn" aria-label="WhatsApp">
                  <i class="fa-brands fa-whatsapp"></i>
                </a>
              </div>
            </div>

            <!-- Quick Links -->
            <div class="footer-col">
              <h4>Quick Links</h4>
              <ul class="footer-links">
                <li><a href="${base}index.html">Home</a></li>
                <li><a href="${base}about.html">About Us</a></li>
                <li><a href="${base}courses.html">All Courses</a></li>
                <li><a href="${base}gallery.html">Gallery</a></li>
                <li><a href="${base}contact.html">Contact</a></li>
                <li><a href="${base}enroll-now.html">Enroll Now</a></li>
              </ul>
            </div>

            <!-- Courses -->
            <div class="footer-col">
              <h4>Our Courses</h4>
              <ul class="footer-links">
                <li><a href="${base}courses/plasterer.html">Plasterer</a></li>
                <li><a href="${base}courses/tiler.html">Tiler</a></li>
                <li><a href="${base}courses/formwork-carpentry.html">Formwork Carpentry</a></li>
                <li><a href="${base}courses/bar-bending.html">Bar Bending</a></li>
                <li><a href="${base}courses/bricklayer.html">Bricklayer</a></li>
              </ul>
            </div>

            <!-- Contact -->
            <div class="footer-col">
              <h4>Contact Us</h4>
              <div class="footer-contact-item">
                <i class="fa-solid fa-location-dot" style="color: #1877F2; font-size: 16px; margin-top: 3px; flex-shrink: 0;"></i>
                <span>Madani Avenue, Block-I, Bashundhara C/A, Dhaka-1229, Bangladesh</span>
              </div>
              <div class="footer-contact-item">
                <i class="fa-solid fa-phone" style="color: #1877F2; font-size: 14px; flex-shrink: 0;"></i>
                <a href="tel:+8801335143359" style="color:inherit;">+880 1335 143 359</a>
              </div>
              <div class="footer-contact-item">
                <i class="fa-solid fa-envelope" style="color: #1877F2; font-size: 14px; flex-shrink: 0;"></i>
                <a href="mailto:info@attc.school" style="color:inherit;">info@attc.school</a>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} Advance Training &amp; Testing Center (ATTC). All rights reserved.</p>
            <div class="footer-bottom-links">
              <a href="${base}privacy-policy.html">Privacy Policy</a>
              <a href="${base}terms-of-services.html">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <!-- Scroll-to-Top -->
      <button id="scroll-top" aria-label="Scroll to top">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
      </button>
    `;

    document.body.insertAdjacentHTML('beforeend', footerHtml);
  }

  /* ─── Build CTA Section ────────────────────────────────── */
  function buildCTA() {
    const base = getBasePath();
    const target = document.getElementById('cta-placeholder');
    if (!target) return;

    target.outerHTML = `
      <section class="cta-section" aria-label="Enroll Call to Action">
        <div class="container">
          <div class="section-label" style="justify-content:center;margin-inline:auto;">
            Take the Next Step
          </div>
          <h2>Ready to Build a Career That <em style="font-style:normal;color:#FFB9B9;">Lasts a Lifetime?</em></h2>
          <p>Join hundreds of skilled professionals trained at ATTC. Our ISO-certified programs are designed for the real world — get certified and get hired.</p>
          <div class="cta-actions">
            <a href="${base}enroll-now.html" class="btn btn-accent">
              <i class="fa-solid fa-plus"></i>
              Enroll Now — Free to Apply
            </a>
            <a href="${base}courses.html" class="btn btn-outline">Browse All Courses →</a>
          </div>
          <div class="cta-contact-links">
            <a href="tel:+8801335143359" class="cta-contact-link">
              <i class="fa-solid fa-phone" style="font-size:14px;"></i>
              +880 1335 143 359
            </a>
            <a href="mailto:info@attc.school" class="cta-contact-link">
              <i class="fa-solid fa-envelope" style="font-size:14px;"></i>
              info@attc.school
            </a>
            <a href="https://maps.google.com/?q=Bashundhara+Dhaka" target="_blank" rel="noopener" class="cta-contact-link">
              <i class="fa-solid fa-location-dot" style="font-size:14px;"></i>
              Bashundhara, Dhaka
            </a>
          </div>
        </div>
      </section>
    `;
  }

  /* ─── Build Preloader Screen ────────────────────────────── */
  function buildLoader() {
    const base = getBasePath();
    const loaderHtml = `
      <div id="attc-preloader" aria-label="Loading ATTC">
        <div class="loader-backdrop"></div>
        <div class="loader-content">
          <div class="loader-logo-wrapper">
            <div class="loader-glow-ring"></div>
            <img src="${base}images/logo_loader.svg" alt="ATTC Logo" class="loader-split-logo">
          </div>
          <div class="loader-brand-text">
            <h2>ATTC</h2>
            <p>Advance Training &amp; Testing Center</p>
          </div>
          <div class="loader-progress-box">
            <div class="loader-progress-bar">
              <div class="loader-progress-fill"></div>
            </div>
            <span class="loader-tagline">Building World-Class Vocational Excellence</span>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', loaderHtml);

    // Hide loader smoothly once loaded
    window.addEventListener('load', function () {
      const loader = document.getElementById('attc-preloader');
      if (loader) {
        setTimeout(() => {
          loader.classList.add('fade-out');
          setTimeout(() => {
            loader.style.display = 'none';
          }, 600);
        }, 500);
      }
    });
  }

  /* ─── AI Agent Integrations ────────────────────────────── */
  function loadAgentScripts() {
    const base = getBasePath();
    if (!document.querySelector('script[src*="webmcp.js"]')) {
      const s1 = document.createElement('script');
      s1.src = `${base}webmcp.js`;
      s1.defer = true;
      document.head.appendChild(s1);
    }
    if (!document.querySelector('script[src*="markdown-agent.js"]')) {
      const s2 = document.createElement('script');
      s2.src = `${base}markdown-agent.js`;
      s2.defer = true;
      document.head.appendChild(s2);
    }
  }

  /* ─── Init ─────────────────────────────────────────────── */
  function init() {
    buildLoader();
    buildNav();
    buildFooter();
    buildCTA();
    loadAgentScripts();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

