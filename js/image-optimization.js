/**
 * IMAGE OPTIMIZATION UTILITIES
 * Handles responsive images, WebP fallbacks, and lazy loading
 * @author Dr. Innocent Nyalala - IIT Madras Zanzibar
 */

(function() {
    'use strict';

    // Image Optimization Manager
    const ImageOptimizer = {
        // Check WebP support
        supportsWebP: false,
        supportsAVIF: false,

        // Initialize
        init: function() {
            this.detectFormatSupport();
            this.handleLazyImages();
            this.addImageErrorHandling();
        },

        // Detect browser support for modern image formats
        detectFormatSupport: function() {
            const webpImg = new Image();
            webpImg.onload = webpImg.onerror = function() {
                ImageOptimizer.supportsWebP = (webpImg.height === 2);
                document.documentElement.classList.toggle('webp', ImageOptimizer.supportsWebP);
            };
            webpImg.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';

            const avifImg = new Image();
            avifImg.onload = avifImg.onerror = function() {
                ImageOptimizer.supportsAVIF = (avifImg.height === 2);
                document.documentElement.classList.toggle('avif', ImageOptimizer.supportsAVIF);
            };
            avifImg.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
        },

        // Enhanced lazy loading with Intersection Observer
        handleLazyImages: function() {
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            this.loadImage(img);
                            observer.unobserve(img);
                        }
                    });
                }, {
                    rootMargin: '50px 0px',
                    threshold: 0.01
                });

                document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                    imageObserver.observe(img);
                });
            }
        },

        // Load image with optimal format
        loadImage: function(img) {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }

            // Add fade-in effect
            img.addEventListener('load', function() {
                img.classList.add('loaded');
            }, { once: true });
        },

        // Global error handling for images
        addImageErrorHandling: function() {
            document.addEventListener('error', function(e) {
                if (e.target.tagName === 'IMG') {
                    const img = e.target;

                    // Prevent infinite loop
                    if (img.dataset.errorHandled) return;
                    img.dataset.errorHandled = 'true';

                    // Try fallback to original format
                    if (img.dataset.fallback) {
                        img.src = img.dataset.fallback;
                    } else {
                        // Add placeholder class
                        img.classList.add('image-error');
                        console.warn('Image failed to load:', img.src);
                    }
                }
            }, true);
        },

        // Preload critical images
        preloadImages: function(urls) {
            urls.forEach(url => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = url;
                document.head.appendChild(link);
            });
        },

        // Get optimized image URL
        getOptimizedUrl: function(originalUrl) {
            const basePath = originalUrl.substring(0, originalUrl.lastIndexOf('.'));
            const extension = originalUrl.substring(originalUrl.lastIndexOf('.'));

            // Check for modern format support and return appropriate URL
            if (this.supportsAVIF) {
                return basePath + '.avif';
            } else if (this.supportsWebP) {
                return basePath + '.webp';
            }
            return originalUrl;
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            ImageOptimizer.init();
        });
    } else {
        ImageOptimizer.init();
    }

    // Expose to global scope
    window.ImageOptimizer = ImageOptimizer;

})();
