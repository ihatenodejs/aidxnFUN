const openMenuBtn = document.getElementById('open-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const dropdownMenu = menuButton.nextElementSibling;
    const notificationBanner = document.getElementById('notification-banner');
    const dismissButton = document.getElementById('dismiss-btn');
    const openMenuBtn = document.getElementById('open-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (localStorage.getItem('notificationDismissed')) {
        notificationBanner.style.display = 'none';
    }

    dismissButton.addEventListener('click', () => {
        notificationBanner.style.display = 'none';
        localStorage.setItem('notificationDismissed', 'true');
    });

    menuButton.addEventListener('click', function(event) {
        event.preventDefault();
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', !isExpanded);
        dropdownMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', function(event) {
        if (!menuButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            menuButton.setAttribute('aria-expanded', 'false');
            dropdownMenu.classList.add('hidden');
        }
    });

    openMenuBtn.addEventListener('click', () => {
        mobileMenu.style.display = 'block';
    });

    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
    });
});

openMenuBtn.addEventListener('click', () => {
    mobileMenu.style.display = 'block';
});

closeMenuBtn.addEventListener('click', () => {
    mobileMenu.style.display = 'none';
});