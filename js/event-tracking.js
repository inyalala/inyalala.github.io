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
        if (link && link.hostname && link.hostname !== window.location.hostname) {
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
    if ('IntersectionObserver' in window) {
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
    }

    // Track time on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        trackEvent('Engagement', 'Time on Page', document.title, timeOnPage);
    });

})();
