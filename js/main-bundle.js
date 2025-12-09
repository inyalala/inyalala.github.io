/**
 * MAIN JAVASCRIPT BUNDLE
 * All site functionality combined in one optimized file
 * @author Dr. Innocent Nyalala - IIT Madras Zanzibar
 */

(function() {
    'use strict';

    // ========================================
    // THEME MANAGEMENT
    // ========================================
    const ThemeManager = {
        init: function() {
            const themeToggle = document.getElementById('themeToggle');
            const html = document.documentElement;
            const savedTheme = localStorage.getItem('theme') || 'light';

            html.setAttribute('data-theme', savedTheme);

            if (themeToggle) {
                themeToggle.addEventListener('click', () => {
                    const currentTheme = html.getAttribute('data-theme');
                    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                    html.setAttribute('data-theme', newTheme);
                    localStorage.setItem('theme', newTheme);
                });
            }
        }
    };

    // ========================================
    // LOADING SCREEN
    // ========================================
    const LoadingScreen = {
        init: function() {
            window.addEventListener('load', () => {
                const loading = document.getElementById('loading');
                if (loading) {
                    loading.classList.add('hidden');
                }
            });
        }
    };

    // ========================================
    // NAVIGATION
    // ========================================
    const Navigation = {
        init: function() {
            const navToggle = document.getElementById('navToggle');
            const navMenu = document.getElementById('navMenu');
            const navbar = document.getElementById('navbar');

            // Mobile menu toggle
            if (navToggle && navMenu) {
                navToggle.addEventListener('click', () => {
                    navToggle.classList.toggle('active');
                    navMenu.classList.toggle('active');
                });

                // Close menu when clicking nav links
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.addEventListener('click', () => {
                        navToggle.classList.remove('active');
                        navMenu.classList.remove('active');
                    });
                });
            }

            // Navbar scroll effect
            if (navbar) {
                window.addEventListener('scroll', () => {
                    navbar.classList.toggle('scrolled', window.scrollY > 50);
                });
            }
        }
    };

    // ========================================
    // SCROLL PROGRESS BAR
    // ========================================
    const ScrollProgress = {
        init: function() {
            const scrollProgress = document.getElementById('scrollProgress');
            if (scrollProgress) {
                window.addEventListener('scroll', () => {
                    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
                    scrollProgress.style.width = scrollPercent + '%';
                });
            }
        }
    };

    // ========================================
    // ACTIVE SECTION HIGHLIGHTING
    // ========================================
    const SectionHighlight = {
        init: function() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');

            if (sections.length && navLinks.length) {
                window.addEventListener('scroll', () => {
                    let current = '';
                    sections.forEach(section => {
                        if (scrollY >= section.offsetTop - 200) {
                            current = section.getAttribute('id');
                        }
                    });

                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href').slice(1) === current) {
                            link.classList.add('active');
                        }
                    });
                });
            }
        }
    };

    // ========================================
    // SMOOTH SCROLLING
    // ========================================
    const SmoothScroll = {
        init: function() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
    };

    // ========================================
    // BACK TO TOP BUTTON
    // ========================================
    const BackToTop = {
        init: function() {
            const backToTop = document.getElementById('backToTop');
            if (backToTop) {
                window.addEventListener('scroll', () => {
                    backToTop.classList.toggle('visible', window.scrollY > 500);
                });

                backToTop.addEventListener('click', () => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }
        }
    };

    // ========================================
    // INTERSECTION OBSERVER (ANIMATIONS)
    // ========================================
    const AnimationObserver = {
        init: function() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1
            });

            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                observer.observe(el);
            });
        }
    };

    // ========================================
    // NEWS SLIDER
    // ========================================
    const NewsSlider = {
        init: function() {
            const slider = document.querySelector('.news-slider');
            const slides = document.querySelectorAll('.news-slide');
            const prevBtn = document.querySelector('.news-slider-btn-prev');
            const nextBtn = document.querySelector('.news-slider-btn-next');
            const dotsContainer = document.querySelector('.news-slider-dots');

            if (!slider || slides.length === 0) return;

            let currentIndex = 0;
            let slidesPerView = 1;
            let autoplayInterval;

            // Calculate slides per view based on screen size
            function updateSlidesPerView() {
                const width = window.innerWidth;
                if (width >= 1024) {
                    slidesPerView = 3;
                } else if (width >= 768) {
                    slidesPerView = 2;
                } else {
                    slidesPerView = 1;
                }
            }

            // Create dots
            function createDots() {
                dotsContainer.innerHTML = '';
                const totalDots = Math.ceil(slides.length / slidesPerView);
                for (let i = 0; i < totalDots; i++) {
                    const dot = document.createElement('div');
                    dot.classList.add('news-slider-dot');
                    if (i === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => goToSlide(i));
                    dotsContainer.appendChild(dot);
                }
            }

            // Update dots
            function updateDots() {
                const dots = document.querySelectorAll('.news-slider-dot');
                const activeIndex = Math.floor(currentIndex / slidesPerView);
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === activeIndex);
                });
            }

            // Update buttons state
            function updateButtons() {
                if (prevBtn && nextBtn) {
                    prevBtn.disabled = currentIndex === 0;
                    nextBtn.disabled = currentIndex >= slides.length - slidesPerView;
                }
            }

            // Go to specific slide
            function goToSlide(index) {
                currentIndex = index * slidesPerView;
                if (currentIndex > slides.length - slidesPerView) {
                    currentIndex = slides.length - slidesPerView;
                }
                if (currentIndex < 0) currentIndex = 0;

                const slideWidth = slides[0].offsetWidth;
                const gap = parseInt(getComputedStyle(slider).gap) || 0;
                const offset = -(currentIndex * (slideWidth + gap));
                slider.style.transform = `translateX(${offset}px)`;

                updateDots();
                updateButtons();
                resetAutoplay();
            }

            // Next slide
            function nextSlide() {
                if (currentIndex < slides.length - slidesPerView) {
                    currentIndex++;
                    goToSlide(Math.floor(currentIndex / slidesPerView));
                }
            }

            // Previous slide
            function prevSlide() {
                if (currentIndex > 0) {
                    currentIndex--;
                    goToSlide(Math.floor(currentIndex / slidesPerView));
                }
            }

            // Autoplay
            function startAutoplay() {
                autoplayInterval = setInterval(() => {
                    if (currentIndex >= slides.length - slidesPerView) {
                        currentIndex = 0;
                        goToSlide(0);
                    } else {
                        nextSlide();
                    }
                }, 5000);
            }

            function resetAutoplay() {
                clearInterval(autoplayInterval);
                startAutoplay();
            }

            // Event listeners
            if (nextBtn) nextBtn.addEventListener('click', nextSlide);
            if (prevBtn) prevBtn.addEventListener('click', prevSlide);

            // Handle window resize
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    const oldSlidesPerView = slidesPerView;
                    updateSlidesPerView();
                    if (oldSlidesPerView !== slidesPerView) {
                        currentIndex = 0;
                        createDots();
                        goToSlide(0);
                    }
                }, 250);
            });

            // Pause autoplay on hover
            slider.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
            slider.addEventListener('mouseleave', startAutoplay);

            // Initialize
            updateSlidesPerView();
            createDots();
            updateButtons();
            startAutoplay();
        }
    };

    // ========================================
    // INITIALIZATION
    // ========================================
    function init() {
        ThemeManager.init();
        LoadingScreen.init();
        Navigation.init();
        ScrollProgress.init();
        SectionHighlight.init();
        SmoothScroll.init();
        BackToTop.init();
        AnimationObserver.init();
        NewsSlider.init();
    }

    // Run initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
