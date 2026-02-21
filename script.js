document.addEventListener('DOMContentLoaded', () => {

    // --- JARVIS Boot Sequence ---
    const bootScreen = document.getElementById('boot-screen');
    const bootText = document.getElementById('boot-text');
    const bootProgress = document.querySelector('.boot-progress');
    const bootStatus = document.querySelector('.boot-status');

    // Disable scrolling during boot
    document.body.style.overflow = 'hidden';

    const bootMessages = [
        "J.A.R.V.I.S. SYSTEM INITIALIZING...",
        "ACCESSING BHARGAV RAWAT MAINFRAME...",
        "LOADING MECHANICAL ENGINEERING PROTOCOLS...",
        "ESTABLISHING SECURE CONNECTION...",
        "BYPASSING ENCRYPTION...",
        "OVERRIDING DEFAULT PROTOCOLS...",
        "ENGAGING HOLOGRAPHIC HUD...",
        "CALIBRATING ARC REACTOR...",
        "ALL SYSTEMS NOMINAL."
    ];

    let messageIndex = 0;

    function typeMessage() {
        if (messageIndex < bootMessages.length) {
            bootText.innerHTML += `> ${bootMessages[messageIndex]}<br>`;
            // Auto scroll to bottom of boot text area
            bootText.scrollTop = bootText.scrollHeight;
            messageIndex++;

            // Random delay between messages to simulate processing
            setTimeout(typeMessage, Math.random() * 200 + 100);

            // Update progress bar
            let progress = (messageIndex / bootMessages.length) * 100;
            bootProgress.style.width = `${progress}%`;

        } else {
            // Boot complete
            bootStatus.style.opacity = '1';

            setTimeout(() => {
                bootScreen.style.opacity = '0';
                bootScreen.style.visibility = 'hidden';
                document.body.style.overflow = ''; // Restore scrolling

                // Initialize normal site features *after* boot
                initSiteFeatures();
            }, 1000);
        }
    }

    // Start boot sequence slightly after load
    setTimeout(typeMessage, 500);

    // --- Main Site Features ---
    function initSiteFeatures() {
        // Custom Cursor
        const cursor = document.querySelector('.cursor');
        const follower = document.querySelector('.cursor-follower');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            // slight delay for follower
            setTimeout(() => {
                follower.style.left = e.clientX + 'px';
                follower.style.top = e.clientY + 'px';
            }, 50);
        });

        // Hover effects for cursor on links and buttons
        const interactiveElements = document.querySelectorAll('a, .btn, .skill-card');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                cursor.style.backgroundColor = 'var(--accent-cyan)';
                follower.style.borderColor = 'var(--accent-orange)';
                follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });

            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.backgroundColor = 'var(--accent-orange)';
                follower.style.borderColor = 'var(--accent-cyan)';
                follower.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });

        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // If it's a skill card, re-trigger the animation
                    if (entry.target.classList.contains('skill-card')) {
                        entry.target.style.animation = 'none';
                        entry.target.offsetHeight; /* trigger reflow */
                        entry.target.style.animation = null;
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.skill-card').forEach(card => {
            observer.observe(card);
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Simple Glitch Effect on Title
        const title = document.querySelector('.glitch');
        if (title) {
            setInterval(() => {
                if (Math.random() > 0.95) {
                    title.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
                    title.style.textShadow = `
                    ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(0, 240, 255, 0.7),
                    ${Math.random() * -10 + 5}px ${Math.random() * -10 + 5}px 0 rgba(255, 123, 0, 0.7)
                `;

                    setTimeout(() => {
                        title.style.transform = 'translate(0, 0)';
                        title.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.3)';
                    }, 100);
                }
            }, 100);
        }
    } // End initSiteFeatures

});
