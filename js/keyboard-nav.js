/**
 * ENHANCED KEYBOARD NAVIGATION
 * Improves accessibility with keyboard controls
 */

(function() {
    'use strict';

    const KeyboardNav = {
        init: function() {
            // Trap focus in mobile menu when open
            const navMenu = document.getElementById('navMenu');
            const navToggle = document.getElementById('navToggle');

            document.addEventListener('keydown', (e) => {
                // Close mobile menu on Escape
                if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (navToggle) {
                        navToggle.classList.remove('active');
                        navToggle.focus();
                    }
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

        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => KeyboardNav.init());
    } else {
        KeyboardNav.init();
    }

})();
