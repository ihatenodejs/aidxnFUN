document.addEventListener('DOMContentLoaded', () => {
    const notificationBanner = document.getElementById('notification-banner');
    const dismissButton = document.getElementById('dismiss-btn');

    if (localStorage.getItem('notificationDismissed')) {
        notificationBanner.style.display = 'none';
    }

    dismissButton.addEventListener('click', () => {
        notificationBanner.style.display = 'none';
        localStorage.setItem('notificationDismissed', 'true');
    });
});

const openMenuBtn = document.getElementById('open-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

openMenuBtn.addEventListener('click', () => {
    mobileMenu.style.display = 'block';
});

closeMenuBtn.addEventListener('click', () => {
    mobileMenu.style.display = 'none';
});