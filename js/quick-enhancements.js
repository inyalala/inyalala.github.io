/**
 * QUICK ENHANCEMENTS
 * Implements modern UX improvements and utilities
 */

(function() {
    'use strict';

    const QuickEnhancements = {
        // Configuration
        config: {
            newsUpdateDates: {
                0: '2026-04-05', // ICLR 2026 Paper
                1: '2026-04-01', // AI4Africa Research Spotlight
                2: '2026-03-30', // EAC STI 2026 Paper
                3: '2025-12-05', // Editorial Board Member
                4: '2025-12-03', // Fumba Times
                5: '2025-07-15', // Graduation
                6: '2025-05-20', // Publication
                7: '2024-10-15'  // Joined IIT
            }
        },

        init: function() {
            this.addLastUpdatedTimestamps();
            this.enhanceScrollToTop();
            this.addCopyToClipboard();
            this.setupDynamicPageTitles();
            this.setupSmoothAnchors();
            this.addLoadingSpinnerForExternalLinks();
            this.updateFaviconWithNewsCount();
            this.setupOfflineDetection();
        },

        // 1. Add "Last updated" timestamps to news
        addLastUpdatedTimestamps: function() {
            const newsSlides = document.querySelectorAll('.news-slide');
            newsSlides.forEach((slide, index) => {
                const dateElement = slide.querySelector('.news-date');
                const updateDate = this.config.newsUpdateDates[index];

                if (dateElement && updateDate) {
                    const date = new Date(updateDate);
                    const now = new Date();
                    const daysAgo = Math.floor((now - date) / (1000 * 60 * 60 * 24));

                    let updateText = '';
                    if (daysAgo === 0) {
                        updateText = 'Updated today';
                    } else if (daysAgo === 1) {
                        updateText = 'Updated yesterday';
                    } else if (daysAgo < 7) {
                        updateText = `Updated ${daysAgo} days ago`;
                    } else if (daysAgo < 30) {
                        const weeksAgo = Math.floor(daysAgo / 7);
                        updateText = `Updated ${weeksAgo} week${weeksAgo > 1 ? 's' : ''} ago`;
                    } else {
                        const monthsAgo = Math.floor(daysAgo / 30);
                        updateText = `Updated ${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
                    }

                    const updateSpan = document.createElement('span');
                    updateSpan.className = 'news-update-time';
                    updateSpan.innerHTML = ` <i class="fas fa-sync" style="font-size:0.75rem;opacity:0.6"></i> ${updateText}`;
                    dateElement.appendChild(updateSpan);
                }
            });
        },

        // 2. Enhanced "Scroll to top" button with progress ring
        enhanceScrollToTop: function() {
            const backToTop = document.getElementById('backToTop');
            if (!backToTop) return;

            // Add progress ring
            const progressRing = document.createElement('div');
            progressRing.className = 'scroll-progress-ring';
            backToTop.appendChild(progressRing);

            // Update progress on scroll
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrollPercent = (scrollTop / scrollHeight) * 100;

                progressRing.style.setProperty('--scroll-percent', scrollPercent);

                if (scrollTop > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            });

            // Smooth scroll to top
            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        },

        // 3. Copy-to-clipboard for email addresses
        addCopyToClipboard: function() {
            const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

            emailLinks.forEach(link => {
                const email = link.textContent.trim();
                const wrapper = document.createElement('span');
                wrapper.className = 'email-with-copy';

                const copyBtn = document.createElement('button');
                copyBtn.className = 'copy-email-btn';
                copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                copyBtn.setAttribute('aria-label', 'Copy email to clipboard');
                copyBtn.title = 'Copy to clipboard';

                copyBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    navigator.clipboard.writeText(email).then(() => {
                        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                        copyBtn.classList.add('copied');

                        // Show toast notification
                        this.showToast('Email copied to clipboard!', 'success');

                        setTimeout(() => {
                            copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                            copyBtn.classList.remove('copied');
                        }, 2000);
                    }).catch(() => {
                        this.showToast('Failed to copy email', 'error');
                    });
                });

                link.parentNode.insertBefore(wrapper, link);
                wrapper.appendChild(link);
                wrapper.appendChild(copyBtn);
            });
        },

        // Show toast notification
        showToast: function(message, type = 'info') {
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.innerHTML = `
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            `;

            document.body.appendChild(toast);

            setTimeout(() => toast.classList.add('show'), 100);
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        },

        // 6. Dynamic page titles based on section
        setupDynamicPageTitles: function() {
            const sections = {
                'profile': 'Profile - Dr. Innocent Nyalala',
                'news': 'Latest News - Dr. Innocent Nyalala',
                'research': 'Research - Dr. Innocent Nyalala',
                'publications': 'Publications - Dr. Innocent Nyalala',
                'conferences': 'Conferences - Dr. Innocent Nyalala',
                'teaching': 'Teaching - Dr. Innocent Nyalala',
                'contact': 'Contact - Dr. Innocent Nyalala'
            };

            const defaultTitle = 'Dr. Innocent Nyalala | AI Researcher, Assistant Professor | IIT Madras Zanzibar';

            // Update title on scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;
                        document.title = sections[sectionId] || defaultTitle;
                    }
                });
            }, { threshold: 0.5 });

            Object.keys(sections).forEach(sectionId => {
                const section = document.getElementById(sectionId);
                if (section) observer.observe(section);
            });
        },

        // 8. Smooth anchor links with offset
        setupSmoothAnchors: function() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const href = anchor.getAttribute('href');
                    if (href === '#' || !href) return;

                    const target = document.querySelector(href);
                    if (!target) return;

                    e.preventDefault();

                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL without triggering scroll
                    history.pushState(null, null, href);
                });
            });
        },

        // 9. Loading spinner for external links
        addLoadingSpinnerForExternalLinks: function() {
            document.querySelectorAll('a[target="_blank"]').forEach(link => {
                // Skip links that are just icons or buttons
                if (link.closest('.social-links') || link.classList.contains('btn')) return;

                link.addEventListener('click', (e) => {
                    if (!link.classList.contains('loading')) {
                        link.classList.add('loading');

                        // Create spinner
                        const spinner = document.createElement('span');
                        spinner.className = 'link-spinner';
                        spinner.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                        link.appendChild(spinner);

                        // Remove after delay (simulating load)
                        setTimeout(() => {
                            link.classList.remove('loading');
                            spinner.remove();
                        }, 1500);
                    }
                });
            });
        },

        // 5. Dynamic favicon with unread news count
        updateFaviconWithNewsCount: function() {
            const newsCount = document.querySelectorAll('.news-slide').length;
            if (newsCount === 0) return;

            const canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;
            const ctx = canvas.getContext('2d');

            // Load existing favicon
            const favicon = document.querySelector('link[rel="icon"][type="image/png"]');
            if (!favicon) return;

            const img = new Image();
            img.onload = () => {
                // Draw original favicon
                ctx.drawImage(img, 0, 0, 32, 32);

                // Draw badge
                ctx.fillStyle = '#ff4444';
                ctx.beginPath();
                ctx.arc(24, 8, 8, 0, 2 * Math.PI);
                ctx.fill();

                // Draw count
                ctx.fillStyle = 'white';
                ctx.font = 'bold 10px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(newsCount > 9 ? '9+' : newsCount.toString(), 24, 8);

                // Update favicon
                const link = document.querySelector('link[rel="icon"][type="image/png"]') || document.createElement('link');
                link.type = 'image/png';
                link.rel = 'icon';
                link.href = canvas.toDataURL('image/png');
                document.head.appendChild(link);
            };
            img.src = favicon.href;
        },

        // 4. Offline detection and better error messages
        setupOfflineDetection: function() {
            window.addEventListener('offline', () => {
                this.showToast('You are offline. Some features may not work.', 'error');
            });

            window.addEventListener('online', () => {
                this.showToast('Back online!', 'success');
            });

            // Check if page is loaded from cache
            if (!navigator.onLine) {
                this.showToast('You are currently offline', 'error');
            }
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => QuickEnhancements.init());
    } else {
        QuickEnhancements.init();
    }

    // Expose globally for debugging
    window.QuickEnhancements = QuickEnhancements;

})();
