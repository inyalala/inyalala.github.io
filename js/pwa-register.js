/**
 * PWA REGISTRATION SCRIPT
 * Registers service worker and handles PWA installation
 * @author Dr. Innocent Nyalala - IIT Madras Zanzibar
 */

(function() {
    'use strict';

    // Check for service worker support
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            registerServiceWorker();
            handlePWAInstall();
        });
    }

    // Register service worker
    async function registerServiceWorker() {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js', {
                scope: '/'
            });

            console.log('✅ Service Worker registered:', registration.scope);

            // Check for updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                console.log('🔄 Service Worker update found');

                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New service worker available
                        showUpdateNotification();
                    }
                });
            });

            // Check for updates every hour
            setInterval(() => {
                registration.update();
            }, 3600000);

        } catch (error) {
            console.error('❌ Service Worker registration failed:', error);
        }
    }

    // Handle PWA installation
    function handlePWAInstall() {
        let deferredPrompt;
        const installButton = document.getElementById('pwa-install-btn');

        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent default mini-infobar
            e.preventDefault();
            deferredPrompt = e;

            // Show custom install button
            if (installButton) {
                installButton.style.display = 'block';

                installButton.addEventListener('click', async () => {
                    if (!deferredPrompt) return;

                    // Show install prompt
                    deferredPrompt.prompt();

                    // Wait for user response
                    const { outcome } = await deferredPrompt.userChoice;
                    console.log(`PWA install ${outcome}`);

                    // Clear prompt
                    deferredPrompt = null;
                    installButton.style.display = 'none';
                });
            }
        });

        // Track install
        window.addEventListener('appinstalled', () => {
            console.log('✅ PWA installed successfully');
            deferredPrompt = null;

            // Track with analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'pwa_install', {
                    event_category: 'engagement',
                    event_label: 'PWA Installation'
                });
            }
        });
    }

    // Show update notification
    function showUpdateNotification() {
        const notification = document.createElement('div');
        notification.className = 'pwa-update-notification';
        notification.innerHTML = `
            <div class="pwa-update-content">
                <p>🎉 A new version is available!</p>
                <button id="pwa-update-btn" class="btn btn-sm">Update Now</button>
                <button id="pwa-dismiss-btn" class="btn btn-sm btn-outline">Later</button>
            </div>
        `;
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Update button
        document.getElementById('pwa-update-btn').addEventListener('click', () => {
            navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
            window.location.reload();
        });

        // Dismiss button
        document.getElementById('pwa-dismiss-btn').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    }

    // Detect if running as PWA
    function isPWA() {
        return window.matchMedia('(display-mode: standalone)').matches ||
               window.navigator.standalone === true;
    }

    if (isPWA()) {
        console.log('✅ Running as PWA');
        document.documentElement.classList.add('pwa-mode');

        // Track PWA usage
        if (typeof gtag !== 'undefined') {
            gtag('event', 'pwa_usage', {
                event_category: 'engagement',
                event_label: 'PWA Mode Active'
            });
        }
    }

})();
