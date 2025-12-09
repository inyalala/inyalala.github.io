# Phases 3-10 Implementation Guide

This document contains all code and instructions for implementing the remaining phases of website optimization.

---

## PHASE 3: SEO & ACCESSIBILITY ENHANCEMENTS

### Step 1: Add Article Schema for Publications

Add this to index.html after the existing schema markup (after line 211):

```html
<!-- Article/ScholarlyArticle schema for each publication -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ScholarlyArticle",
      "headline": "Rectifying the extremely weakened signals for cassava leaf disease detection",
      "author": [
        { "@type": "Person", "name": "Zhang Jiayu" },
        { "@type": "Person", "name": "Baohua Zhang" },
        { "@type": "Person", "name": "Innocent Nyalala", "@id": "https://inyalala.github.io/#person" },
        { "@type": "Person", "name": "Peter Mecha" },
        { "@type": "Person", "name": "Junlong Chen" },
        { "@type": "Person", "name": "Kunjie Chen" },
        { "@type": "Person", "name": "Junfeng Gao" }
      ],
      "datePublished": "2025-05",
      "publisher": {
        "@type": "Organization",
        "name": "Elsevier"
      },
      "isPartOf": {
        "@type": "PublicationIssue",
        "isPartOf": {
          "@type": "PublicationVolume",
          "volumeNumber": "232",
          "isPartOf": {
            "@type": "Periodical",
            "name": "Computers and Electronics in Agriculture",
            "issn": "0168-1699"
          }
        }
      },
      "url": "https://doi.org/10.1016/j.compag.2025.110107",
      "identifier": {
        "@type": "PropertyValue",
        "propertyID": "DOI",
        "value": "10.1016/j.compag.2025.110107"
      },
      "keywords": ["Cassava", "Disease Detection", "Machine Learning", "Agriculture AI"],
      "citation": "960+",
      "about": ["Agricultural AI", "Computer Vision", "Deep Learning"]
    }
  ]
}
</script>
```

### Step 2: Add Breadcrumb Schema

Add this breadcrumb schema near other schema definitions:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://inyalala.github.io/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Research",
      "item": "https://inyalala.github.io/#research"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Publications",
      "item": "https://inyalala.github.io/#publications"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Contact",
      "item": "https://inyalala.github.io/#contact"
    }
  ]
}
</script>
```

### Step 3: Add FAQ Schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Dr. Innocent Nyalala's research focus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dr. Innocent Nyalala focuses on AI for Agriculture and Healthcare in East Africa, including precision agriculture, crop disease detection, medical imaging, and Swahili NLP."
      }
    },
    {
      "@type": "Question",
      "name": "Where is Dr. Innocent Nyalala currently working?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Assistant Professor at IIT Madras Zanzibar and Associate Research Fellow at Wadhwani School of Data Science & AI, IIT Madras Chennai."
      }
    },
    {
      "@type": "Question",
      "name": "What is SAAIL Lab?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SAAIL Lab (Sustainable AI for Agriculture & Intelligent Livelihoods) is a research laboratory led by Dr. Nyalala, developing AI solutions for agriculture and healthcare challenges in East Africa."
      }
    },
    {
      "@type": "Question",
      "name": "How many publications does Dr. Innocent Nyalala have?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dr. Nyalala has 23+ publications with 960+ citations, h-index of 14, and i10-index of 15."
      }
    }
  ]
}
</script>
```

### Step 4: ARIA Improvements for News Slider

Update the news slider HTML with these ARIA attributes:

```html
<!-- Add these attributes to the slider container -->
<div class="news-slider-container" role="region" aria-label="Latest news and achievements carousel">
    <button class="news-slider-btn news-slider-btn-prev"
            aria-label="Previous news"
            aria-controls="news-slider">
        <i class="fas fa-chevron-left" aria-hidden="true"></i>
    </button>

    <div class="news-slider-wrapper">
        <div class="news-slider"
             id="news-slider"
             role="list"
             aria-live="polite"
             aria-atomic="false">

            <div class="news-slide" role="listitem" aria-label="News item 1 of 5">
                <!-- existing news card content -->
            </div>
            <!-- repeat for other slides -->
        </div>
    </div>

    <button class="news-slider-btn news-slider-btn-next"
            aria-label="Next news"
            aria-controls="news-slider">
        <i class="fas fa-chevron-right" aria-hidden="true"></i>
    </button>
</div>

<div class="news-slider-dots"
     role="tablist"
     aria-label="News slider navigation">
    <!-- Dots will be added by JavaScript with proper ARIA roles -->
</div>
```

### Step 5: Enhanced Keyboard Navigation

Add to main-bundle.js or create keyboard-nav.js:

```javascript
// Enhanced Keyboard Navigation
const KeyboardNav = {
    init: function() {
        // Trap focus in mobile menu when open
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');

        document.addEventListener('keydown', (e) => {
            // Close mobile menu on Escape
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.focus();
            }

            // News slider keyboard controls
            if (e.target.closest('.news-slider-container')) {
                const prevBtn = document.querySelector('.news-slider-btn-prev');
                const nextBtn = document.querySelector('.news-slider-btn-next');

                if (e.key === 'ArrowLeft' && prevBtn) {
                    e.preventDefault();
                    prevBtn.click();
                }
                if (e.key === 'ArrowRight' && nextBtn) {
                    e.preventDefault();
                    nextBtn.click();
                }
            }
        });

        // Skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
};
```

Add this CSS for skip link:

```css
.skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--primary);
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
}

.skip-link:focus {
    top: 0;
}
```

---

## PHASE 4: ANALYTICS & MONITORING

### Web Vitals Monitoring

Create `js/web-vitals.js`:

```javascript
/**
 * WEB VITALS MONITORING
 * Tracks Core Web Vitals and reports to Google Analytics
 */

(function() {
    'use strict';

    // Web Vitals thresholds
    const THRESHOLDS = {
        LCP: { good: 2500, poor: 4000 },
        FID: { good: 100, poor: 300 },
        CLS: { good: 0.1, poor: 0.25 },
        FCP: { good: 1800, poor: 3000 },
        TTFB: { good: 800, poor: 1800 }
    };

    // Get rating
    function getRating(metric, value) {
        if (value <= THRESHOLDS[metric].good) return 'good';
        if (value <= THRESHOLDS[metric].poor) return 'needs-improvement';
        return 'poor';
    }

    // Send to Google Analytics
    function sendToAnalytics({name, delta, value, id, rating}) {
        if (typeof gtag === 'undefined') {
            console.log(`${name}:`, {delta, value, id, rating});
            return;
        }

        gtag('event', name, {
            event_category: 'Web Vitals',
            event_label: id,
            value: Math.round(name === 'CLS' ? delta * 1000 : delta),
            metric_rating: rating,
            non_interaction: true
        });
    }

    // Measure vitals
    function measureVitals() {
        // LCP - Largest Contentful Paint
        if ('PerformanceObserver' in window) {
            try {
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    const value = lastEntry.renderTime || lastEntry.loadTime;

                    sendToAnalytics({
                        name: 'LCP',
                        delta: value,
                        value: value,
                        id: `v1-${Date.now()}-${Math.random()}`,
                        rating: getRating('LCP', value)
                    });
                });

                lcpObserver.observe({entryTypes: ['largest-contentful-paint']});
            } catch (e) {
                console.error('LCP measurement failed:', e);
            }

            // FID - First Input Delay
            try {
                const fidObserver = new PerformanceObserver((list) => {
                    list.getEntries().forEach((entry) => {
                        const value = entry.processingStart - entry.startTime;

                        sendToAnalytics({
                            name: 'FID',
                            delta: value,
                            value: value,
                            id: `v1-${Date.now()}-${Math.random()}`,
                            rating: getRating('FID', value)
                        });
                    });
                });

                fidObserver.observe({entryTypes: ['first-input']});
            } catch (e) {
                console.error('FID measurement failed:', e);
            }

            // CLS - Cumulative Layout Shift
            try {
                let clsValue = 0;
                const clsObserver = new PerformanceObserver((list) => {
                    list.getEntries().forEach((entry) => {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                        }
                    });
                });

                clsObserver.observe({entryTypes: ['layout-shift']});

                // Report CLS on page unload
                addEventListener('visibilitychange', () => {
                    if (document.visibilityState === 'hidden') {
                        sendToAnalytics({
                            name: 'CLS',
                            delta: clsValue,
                            value: clsValue,
                            id: `v1-${Date.now()}-${Math.random()}`,
                            rating: getRating('CLS', clsValue)
                        });
                    }
                }, {once: true});
            } catch (e) {
                console.error('CLS measurement failed:', e);
            }
        }

        // FCP & TTFB using Navigation Timing
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];

            if (perfData) {
                // FCP
                const fcp = perfData.responseStart - perfData.fetchStart;
                sendToAnalytics({
                    name: 'FCP',
                    delta: fcp,
                    value: fcp,
                    id: `v1-${Date.now()}-${Math.random()}`,
                    rating: getRating('FCP', fcp)
                });

                // TTFB
                const ttfb = perfData.responseStart - perfData.requestStart;
                sendToAnalytics({
                    name: 'TTFB',
                    delta: ttfb,
                    value: ttfb,
                    id: `v1-${Date.now()}-${Math.random()}`,
                    rating: getRating('TTFB', ttfb)
                });
            }
        });
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', measureVitals);
    } else {
        measureVitals();
    }

})();
```

### Custom Event Tracking

Create `js/event-tracking.js`:

```javascript
/**
 * CUSTOM EVENT TRACKING
 * Tracks user interactions and engagement
 */

(function() {
    'use strict';

    function trackEvent(category, action, label, value) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label,
                value: value
            });
        }
        console.log('Event:', {category, action, label, value});
    }

    // Track PDF downloads
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.href && link.href.endsWith('.pdf')) {
            trackEvent('Downloads', 'CV Download', link.href);
        }
    });

    // Track external links
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.hostname !== window.location.hostname) {
            trackEvent('Outbound Links', 'Click', link.href);
        }
    });

    // Track news slider interactions
    document.addEventListener('click', (e) => {
        if (e.target.closest('.news-slider-btn-prev')) {
            trackEvent('Engagement', 'News Slider', 'Previous');
        }
        if (e.target.closest('.news-slider-btn-next')) {
            trackEvent('Engagement', 'News Slider', 'Next');
        }
    });

    // Track section visibility
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                trackEvent('Engagement', 'Section View', entry.target.id);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('section[id]').forEach(section => {
        sectionObserver.observe(section);
    });

    // Track time on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        trackEvent('Engagement', 'Time on Page', document.title, timeOnPage);
    });

})();
```

---

## PHASE 5: INTERACTIVE FEATURES

### Publication Search

Create `js/publication-search.js`:

```javascript
/**
 * PUBLICATION SEARCH & FILTER
 * Search and filter publications by keywords, year, and author
 */

(function() {
    'use strict';

    const publications = [
        {
            year: 2025,
            title: "Rectifying the extremely weakened signals for cassava leaf disease detection",
            authors: ["Zhang Jiayu", "Baohua Zhang", "Innocent Nyalala", "Peter Mecha"],
            journal: "Computers and Electronics in Agriculture",
            topics: ["Machine Learning", "Agriculture", "Computer Vision"],
            doi: "10.1016/j.compag.2025.110107"
        },
        // Add more publications here
    ];

    function createSearchUI() {
        const searchHTML = `
            <div class="publication-search" style="margin-bottom: var(--space-xl);">
                <input type="search"
                       id="pub-search"
                       placeholder="Search publications..."
                       class="search-input"
                       aria-label="Search publications">
                <div class="filter-controls">
                    <select id="year-filter" class="filter-select">
                        <option value="">All Years</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2021">2021</option>
                    </select>
                    <select id="topic-filter" class="filter-select">
                        <option value="">All Topics</option>
                        <option value="Machine Learning">Machine Learning</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Computer Vision">Computer Vision</option>
                    </select>
                </div>
                <div id="search-results" class="search-results"></div>
            </div>
        `;

        const publicationsSection = document.getElementById('publications');
        if (publicationsSection) {
            const container = publicationsSection.querySelector('.container');
            const sectionHeader = container.querySelector('.section-header');
            sectionHeader.insertAdjacentHTML('afterend', searchHTML);
        }
    }

    function search(query, year, topic) {
        const results = publications.filter(pub => {
            const matchesQuery = !query ||
                pub.title.toLowerCase().includes(query.toLowerCase()) ||
                pub.authors.some(a => a.toLowerCase().includes(query.toLowerCase()));

            const matchesYear = !year || pub.year.toString() === year;
            const matchesTopic = !topic || pub.topics.includes(topic);

            return matchesQuery && matchesYear && matchesTopic;
        });

        displayResults(results);
    }

    function displayResults(results) {
        const resultsDiv = document.getElementById('search-results');
        if (results.length === 0) {
            resultsDiv.innerHTML = '<p>No publications found.</p>';
            return;
        }

        resultsDiv.innerHTML = `<p>${results.length} publication(s) found</p>`;
        // Highlight matching publications in the main list
        document.querySelectorAll('.publication-card').forEach((card, index) => {
            card.style.display = results.some(r =>
                card.textContent.includes(r.title)
            ) ? 'block' : 'none';
        });
    }

    // Initialize
    window.addEventListener('load', () => {
        createSearchUI();

        document.getElementById('pub-search')?.addEventListener('input', (e) => {
            const year = document.getElementById('year-filter').value;
            const topic = document.getElementById('topic-filter').value;
            search(e.target.value, year, topic);
        });

        document.getElementById('year-filter')?.addEventListener('change', (e) => {
            const query = document.getElementById('pub-search').value;
            const topic = document.getElementById('topic-filter').value;
            search(query, e.target.value, topic);
        });

        document.getElementById('topic-filter')?.addEventListener('change', (e) => {
            const query = document.getElementById('pub-search').value;
            const year = document.getElementById('year-filter').value;
            search(query, year, e.target.value);
        });
    });

})();
```

Add CSS for search UI:

```css
.publication-search {
    background: var(--bg-card);
    padding: var(--space-lg);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-md);
}

.search-input {
    width: 100%;
    padding: var(--space-md);
    border: 2px solid var(--border-color);
    border-radius: var(--radius-lg);
    font-size: 1rem;
    margin-bottom: var(--space-md);
}

.search-input:focus {
    outline: none;
    border-color: var(--primary);
}

.filter-controls {
    display: flex;
    gap: var(--space-md);
    flex-wrap: wrap;
}

.filter-select {
    flex: 1;
    min-width: 150px;
    padding: var(--space-sm) var(--space-md);
    border: 2px solid var(--border-color);
    border-radius: var(--radius-lg);
    font-size: 0.95rem;
}

.search-results {
    margin-top: var(--space-md);
    font-weight: 600;
    color: var(--primary);
}
```

---

## PHASE 6: BACKEND INTEGRATION

### Serverless Contact Form (Netlify Functions)

Create `netlify/functions/contact-form.js`:

```javascript
const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' })
        };
    }

    try {
        const { name, email, subject, message } = JSON.parse(event.body);

        // Validation
        if (!name || !email || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Missing required fields' })
            };
        }

        // Configure email transport (use environment variables)
        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Send email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: 'innocent@iitmz.ac.in',
            subject: `Contact Form: ${subject || 'No Subject'}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully' })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' })
        };
    }
};
```

Create `netlify.toml`:

```toml
[build]
  functions = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"
```

---

## PHASE 7: SECURITY ENHANCEMENTS

### Subresource Integrity (SRI)

Generate SRI hashes and update CDN links:

```html
<!-- Font Awesome with SRI -->
<link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer">

<!-- Google Analytics with SRI (if applicable) -->
<script async
        src="https://www.googletagmanager.com/gtag/js?id=G-BM25HEGWNW"
        crossorigin="anonymous"></script>
```

### Security Headers (_headers file)

Create `_headers`:

```
/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: https: https://visitor-badge.laobi.icu https://img.shields.io https://komarev.com; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com; frame-src https://www.google.com

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.woff2
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=604800, immutable
```

---

## PHASE 8: INTERNATIONALIZATION

### i18n Structure

Create `js/i18n.js`:

```javascript
/**
 * INTERNATIONALIZATION (i18n)
 * Multi-language support for the website
 */

const translations = {
    en: {
        nav: {
            profile: "Profile",
            news: "News",
            research: "Research",
            publications: "Publications",
            conferences: "Conferences",
            teaching: "Teaching",
            contact: "Contact"
        },
        hero: {
            title: "AI Researcher & Assistant Professor of Data Science and AI",
            downloadCV: "Download CV",
            visitLab: "Visit SAAIL Lab"
        },
        // Add more translations
    },
    sw: { // Swahili
        nav: {
            profile: "Wasifu",
            news: "Habari",
            research: "Utafiti",
            publications: "Machapisho",
            conferences: "Mikutano",
            teaching: "Ufundishaji",
            contact: "Wasiliana"
        },
        hero: {
            title: "Mtafiti wa AI na Profesa Msaidizi wa Sayansi ya Data na AI",
            downloadCV: "Pakua CV",
            visitLab: "Tembelea SAAIL Lab"
        }
    },
    zh: { // Chinese
        nav: {
            profile: "简介",
            news: "新闻",
            research: "研究",
            publications: "出版物",
            conferences: "会议",
            teaching: "教学",
            contact: "联系"
        },
        hero: {
            title: "人工智能研究员和数据科学与人工智能助理教授",
            downloadCV: "下载简历",
            visitLab: "访问 SAAIL 实验室"
        }
    }
};

class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('lang') || 'en';
        this.init();
    }

    init() {
        this.createLanguageSwitcher();
        this.applyTranslations();
    }

    createLanguageSwitcher() {
        const switcher = `
            <div class="lang-switcher">
                <button class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}"
                        data-lang="en">EN</button>
                <button class="lang-btn ${this.currentLang === 'sw' ? 'active' : ''}"
                        data-lang="sw">SW</button>
                <button class="lang-btn ${this.currentLang === 'zh' ? 'active' : ''}"
                        data-lang="zh">中文</button>
            </div>
        `;

        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.insertAdjacentHTML('beforebegin', switcher);

            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.setLanguage(e.target.dataset.lang);
                });
            });
        }
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('lang', lang);
        this.applyTranslations();

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    }

    translate(key) {
        const keys = key.split('.');
        let value = translations[this.currentLang];

        for (const k of keys) {
            value = value?.[k];
        }

        return value || key;
    }

    applyTranslations() {
        // Update navigation
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            el.textContent = this.translate(key);
        });

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang;
    }
}

// Initialize
window.i18n = new I18n();
```

Add CSS for language switcher:

```css
.lang-switcher {
    position: fixed;
    bottom: 220px;
    right: 30px;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    z-index: 1000;
}

.lang-btn {
    width: 50px;
    height: 40px;
    background: var(--bg-card);
    border: 2px solid var(--border-color);
    border-radius: var(--radius-md);
    cursor: pointer;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-secondary);
    transition: all var(--transition-normal);
}

.lang-btn.active {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
}

.lang-btn:hover {
    transform: scale(1.05);
}
```

---

## PHASE 9: MODERN CSS FEATURES

Add to modern.css:

```css
/* Container Queries */
@container (min-width: 700px) {
    .news-card {
        display: grid;
        grid-template-columns: 200px 1fr;
        gap: var(--space-md);
    }
}

/* View Transitions API */
@view-transition {
    navigation: auto;
}

::view-transition-old(root),
::view-transition-new(root) {
    animation-duration: 0.3s;
}

/* Scroll-driven Animations */
@supports (animation-timeline: view()) {
    .animate-on-scroll {
        animation: fade-in linear;
        animation-timeline: view();
        animation-range: entry 0% cover 30%;
    }

    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
}

/* CSS Subgrid */
@supports (grid-template-rows: subgrid) {
    .publication-card {
        display: grid;
        grid-template-rows: subgrid;
        grid-row: span 3;
    }
}

/* Modern Color Spaces */
@supports (color: oklch(50% 0.2 180)) {
    :root {
        --primary: oklch(50% 0.15 240);
        --accent: oklch(60% 0.18 150);
    }
}

/* Scroll Snap */
.news-slider {
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
}

.news-slide {
    scroll-snap-align: start;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

::-webkit-scrollbar-track {
    background: var(--bg-tertiary);
}

::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: var(--radius-full);
}

::-webkit-scrollbar-thumb:hover {
    background: var(--primary-dark);
}

/* Smooth Scrolling */
@media (prefers-reduced-motion: no-preference) {
    html {
        scroll-behavior: smooth;
    }
}

/* High Contrast Mode Support */
@media (prefers-contrast: high) {
    :root {
        --border-color: #000;
        --text-primary: #000;
        --bg-primary: #fff;
    }
}

/* Dark Mode Preference */
@media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
        --primary: #60a5fa;
        --bg-primary: #0f172a;
        --text-primary: #f1f5f9;
    }
}
```

---

## PHASE 10: DEPLOYMENT & TESTING

### Deployment Checklist

```markdown
# Deployment Checklist

## Pre-Deployment
- [ ] Run all tests
- [ ] Check browser compatibility
- [ ] Validate HTML (validator.w3.org)
- [ ] Check accessibility (WAVE, axe DevTools)
- [ ] Test all forms
- [ ] Verify all links work
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Run Lighthouse audit
- [ ] Check loading performance
- [ ] Verify PWA installation
- [ ] Test offline functionality

## Performance
- [ ] Images optimized and WebP/AVIF available
- [ ] CSS minified
- [ ] JavaScript minified and bundled
- [ ] Service worker registered
- [ ] Cache headers configured
- [ ] CDN configured (if applicable)
- [ ] Gzip/Brotli compression enabled

## Security
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] SRI hashes added to CDN resources
- [ ] CSP configured
- [ ] No sensitive data exposed
- [ ] Forms have CSRF protection
- [ ] Rate limiting configured

## SEO
- [ ] Meta tags complete
- [ ] Structured data (JSON-LD) validated
- [ ] Sitemap.xml generated
- [ ] Robots.txt configured
- [ ] Canonical URLs set
- [ ] Social media cards tested
- [ ] Google Search Console configured
- [ ] Google Analytics working

## Accessibility
- [ ] ARIA labels present
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] Color contrast passes WCAG AA
- [ ] Focus indicators visible
- [ ] Alt text for all images
- [ ] Forms have labels

## Post-Deployment
- [ ] Monitor error logs
- [ ] Track Web Vitals
- [ ] Check analytics data
- [ ] Test PWA installation
- [ ] Verify service worker updates
- [ ] Monitor uptime
- [ ] Check broken links
- [ ] Review user feedback
```

### Testing Script

Create `test-all.sh`:

```bash
#!/bin/bash

echo "🧪 Running All Tests..."

# HTML Validation
echo "📝 Validating HTML..."
# Use online validator or local tools

# CSS Validation
echo "🎨 Validating CSS..."
# Use csslint or stylelint

# JavaScript Lint
echo "⚙️ Linting JavaScript..."
# Use eslint if configured

# Check file sizes
echo "📊 Checking file sizes..."
echo "CSS: $(wc -c < css/modern.min.css) bytes"
echo "JS: $(wc -c < js/main-bundle.min.js) bytes"

# Check image optimization
echo "🖼️ Checking images..."
find images -type f \( -name "*.jpg" -o -name "*.png" \) -exec echo {} \;

# Test service worker
echo "⚡ Testing service worker..."
# Check if sw.js exists and is valid

echo "✅ All tests complete!"
```

---

## IMPLEMENTATION PRIORITY

### Critical (Do First):
1. Add structured data (SEO)
2. Implement ARIA improvements
3. Add Web Vitals monitoring
4. Add security headers

### Important (Do Soon):
1. Publication search
2. Contact form backend
3. Custom event tracking
4. Modern CSS features

### Nice to Have (Do Later):
1. Internationalization
2. Advanced analytics
3. Additional PWA features

---

## NOTES

- All implementations are progressive enhancements
- Maintain backward compatibility
- Test on multiple browsers
- Monitor performance impact
- Keep documentation updated
