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
