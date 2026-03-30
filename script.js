document.documentElement.classList.add('js-enabled');

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const siteHeader = document.querySelector('.site-header');
    const currentYear = document.getElementById('current-year');

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#') {
                return;
            }

            const target = document.querySelector(targetId);
            if (!target) {
                return;
            }

            event.preventDefault();
            const headerHeight = siteHeader ? siteHeader.offsetHeight : 0;
            const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;

            window.scrollTo({
                top: targetTop,
                behavior: 'smooth'
            });

            if (navLinks) {
                navLinks.classList.remove('open');
            }
            if (menuToggle) {
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.18
    });

    revealElements.forEach((element) => revealObserver.observe(element));

    const counters = document.querySelectorAll('.counter');
    const animatedCounters = new Set();

    const runCounter = (element) => {
        const target = Number(element.dataset.target || 0);
        const suffix = element.dataset.suffix || '';
        const duration = 1200;
        const start = performance.now();

        const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const value = Math.round(target * progress);
            element.textContent = `${value}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            if (!animatedCounters.has(entry.target)) {
                runCounter(entry.target);
                animatedCounters.add(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach((counter) => counterObserver.observe(counter));
});
