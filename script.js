document.addEventListener('DOMContentLoaded', function () {

    /* --------------------------------------------------
       ELEMENT REFERENCES
    -------------------------------------------------- */
    const header          = document.getElementById('header');
    const navLinksContainer = document.querySelector('nav ul.nav-links');
    const menuToggle      = document.querySelector('.menu-toggle');
    const navLinks        = document.querySelectorAll('.nav-link');
    const sections        = document.querySelectorAll('main section');
    const scrollToTopBtn  = document.querySelector('.scroll-to-top');
    const scrollProgressBar = document.getElementById('scrollProgressBar');

    /* --------------------------------------------------
       SCROLL PROGRESS BAR
    -------------------------------------------------- */
    function updateScrollProgress() {
        const scrollTop  = window.pageYOffset;
        const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
        const progress   = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (scrollProgressBar) scrollProgressBar.style.width = progress + '%';
    }

    /* --------------------------------------------------
       SCROLL: Header Effect + Active Nav + Scroll-to-Top
    -------------------------------------------------- */
    window.addEventListener('scroll', function () {
        updateScrollProgress();

        // Header shrink on scroll
        if (header) header.classList.toggle('scrolled', window.scrollY > 30);

        // Scroll-to-top button visibility
        if (scrollToTopBtn) {
            if (window.pageYOffset > 200) {
                if (scrollToTopBtn.style.display !== 'flex') {
                    scrollToTopBtn.style.display = 'flex';
                    void scrollToTopBtn.offsetWidth; // trigger reflow
                    scrollToTopBtn.style.opacity = '1';
                }
            } else {
                scrollToTopBtn.style.opacity = '0';
                setTimeout(() => {
                    if (window.pageYOffset <= 200) scrollToTopBtn.style.display = 'none';
                }, 300);
            }
        }

        // Active nav highlight
        let currentSectionId = '';
        let minDistance = Infinity;
        const headerH = header ? header.offsetHeight : 70;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const distanceToTop = Math.abs(window.pageYOffset - (section.offsetTop - headerH - 50));

            if (rect.top <= headerH + 50 && rect.bottom >= headerH + 50) {
                if (distanceToTop < minDistance) {
                    minDistance = distanceToTop;
                    currentSectionId = section.getAttribute('id');
                }
            } else if (rect.bottom > headerH + 50 && rect.top < window.innerHeight && distanceToTop < minDistance) {
                minDistance = distanceToTop;
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') && link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });

        // Default to Home link when at very top
        if (sections.length > 0 && window.pageYOffset < sections[0].offsetTop - headerH - 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('nav ul li a[href="#hero"]');
            if (homeLink) homeLink.classList.add('active');
        }
    });

    /* --------------------------------------------------
       DARK MODE TOGGLE
    -------------------------------------------------- */
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const icon = darkModeToggle ? darkModeToggle.querySelector('i') : null;

    if (darkModeToggle && icon) {
        if (localStorage.getItem('darkMode') === 'disabled') {
            body.classList.remove('dark-mode');
            icon.classList.replace('fa-sun', 'fa-moon');
        } else {
            body.classList.add('dark-mode');
            icon.classList.replace('fa-moon', 'fa-sun');
        }

        darkModeToggle.addEventListener('click', function () {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            icon.classList.toggle('fa-sun', isDark);
            icon.classList.toggle('fa-moon', !isDark);
            localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
        });
    }

    /* --------------------------------------------------
       MOBILE MENU TOGGLE
    -------------------------------------------------- */
    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            const isOpen = navLinksContainer && navLinksContainer.classList.toggle('active');
            this.classList.toggle('open', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (navLinksContainer && navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });

    document.addEventListener('click', function (e) {
        const insideNav    = navLinksContainer && navLinksContainer.contains(e.target);
        const onToggle     = menuToggle && menuToggle.contains(e.target);
        const menuIsOpen   = navLinksContainer && navLinksContainer.classList.contains('active');

        if (!insideNav && !onToggle && menuIsOpen) {
            navLinksContainer.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    /* --------------------------------------------------
       CURRENT YEAR IN FOOTER
    -------------------------------------------------- */
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

    /* --------------------------------------------------
       SCROLL TO TOP BUTTON
    -------------------------------------------------- */
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* --------------------------------------------------
       TYPEWRITER EFFECT
    -------------------------------------------------- */
    const typingElements = document.querySelectorAll('.typing-effect');
    let typingDelay = 500;

    typingElements.forEach(element => {
        const textToType = element.getAttribute('data-text');
        element.textContent = '';

        setTimeout(() => {
            let charIndex = 0;
            element.classList.add('active-cursor');

            function typeWriter() {
                if (charIndex < textToType.length) {
                    element.textContent += textToType.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeWriter, 50);
                } else {
                    element.classList.remove('active-cursor');
                }
            }
            typeWriter();
        }, typingDelay);

        typingDelay += (textToType.length * 50) + 800;
    });

    /* --------------------------------------------------
       CURSOR SHOWCASE (Portfolio Hover Effect)
    -------------------------------------------------- */
    const cursorShowcase = document.getElementById('cursorShowcase');
    const projectItems   = document.querySelectorAll('.project-item');

    document.addEventListener('mousemove', e => {
        if (cursorShowcase) {
            cursorShowcase.style.setProperty('--x', e.clientX + 'px');
            cursorShowcase.style.setProperty('--y', e.clientY + 'px');
        }
    });

    projectItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            const img = this.querySelector('.project-image-container img');
            if (img && cursorShowcase) {
                cursorShowcase.style.backgroundImage = `url(${img.src})`;
                cursorShowcase.classList.add('visible');
            }
        });
        item.addEventListener('mouseleave', function () {
            if (cursorShowcase) cursorShowcase.classList.remove('visible');
        });
    });

    /* --------------------------------------------------
       INTERSECTION OBSERVER — REVEAL ANIMATIONS
    -------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* --------------------------------------------------
       MAGNETIC BUTTON EFFECT
    -------------------------------------------------- */
    const magneticBtns = document.querySelectorAll('.magnetic-btn');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
            btn.style.transition = 'transform 0.45s cubic-bezier(0.25, 0.8, 0.25, 1), background-color 0.3s ease, box-shadow 0.3s ease';
        });

        btn.addEventListener('mouseenter', () => {
            btn.style.transition = 'transform 0.12s linear, background-color 0.3s ease, box-shadow 0.3s ease';
        });
    });

    /* --------------------------------------------------
       INIT: Call scroll once to set initial progress
    -------------------------------------------------- */
    updateScrollProgress();

}); // End DOMContentLoaded


/* --------------------------------------------------
   CUSTOM ALERT — CONTACT FORM
-------------------------------------------------- */
function tampilkanAlert() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    if (form.checkValidity()) {
        const alertBox = document.getElementById('customAlert');
        if (alertBox) alertBox.classList.add('show');
    } else {
        form.reportValidity();
    }
}

function tutupAlert() {
    const alertBox = document.getElementById('customAlert');
    if (alertBox) alertBox.classList.remove('show');
    const form = document.getElementById('contactForm');
    if (form) form.reset();
}