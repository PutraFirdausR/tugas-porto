document.addEventListener('DOMContentLoaded', function () {
    // Daftarkan plugin GSAP
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        /* --------------------------------------------------
           PRELOADER & HERO ANIMATION (GSAP)
        -------------------------------------------------- */
        const preloaderTimeline = gsap.timeline();
        
        preloaderTimeline.to(".preloader-progress", { width: "100%", duration: 1.2, ease: "power2.inOut" })
        .to(".preloader", { yPercent: -100, duration: 0.8, ease: "power3.inOut" })
        .from(".reveal-hero", { y: 30, autoAlpha: 0, duration: 1, stagger: 0.15, ease: "back.out(1.2)" }, "-=0.3")
        .call(typeEffect); // Panggil fungsi ngetik setelah animasi hero muncul

        /* --------------------------------------------------
           ADVANCED TYPING EFFECT (CINEMATIC)
        -------------------------------------------------- */
        const dynamicText = document.querySelector('.dynamic-text');
        const phrases = [
            "Lets Connect With me!", 
            "Hey, I'm Putra Firdaus", 
            "I'm a FrontEnd Dev"
        ];
        
        let phraseIndex = 0;
        let letterIndex = 0;
        let currentText = "";
        let isDeleting = false;

        function typeEffect() {
            if (!dynamicText) return;

            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                currentText = currentPhrase.substring(0, letterIndex - 1);
                letterIndex--;
            } else {
                currentText = currentPhrase.substring(0, letterIndex + 1);
                letterIndex++;
            }

            dynamicText.textContent = currentText;

            let typeSpeed = 100; 
            if (isDeleting) typeSpeed /= 2;

            if (!isDeleting && currentText === currentPhrase) {
                typeSpeed = 2000; 
                isDeleting = true;
            } else if (isDeleting && currentText === "") {
                isDeleting = false;
                phraseIndex++;
                if (phraseIndex >= phrases.length) phraseIndex = 0;
                typeSpeed = 500;
            }
            setTimeout(typeEffect, typeSpeed);
        }

        /* --------------------------------------------------
           GLOBAL CUSTOM CURSOR (GSAP)
        -------------------------------------------------- */
        const cursorDot = document.querySelector('.custom-cursor-dot');
        const cursorOutline = document.querySelector('.custom-cursor-outline');

        if(window.innerWidth > 768) {
            window.addEventListener('mousemove', (e) => {
                gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.1 });
                gsap.to(cursorOutline, { x: e.clientX, y: e.clientY, duration: 0.5 });
            });

            // Hover state warna Hijau Neon
            const hoverElements = document.querySelectorAll('a, button, input, textarea, .detail-pill, .certificate-item, .btn-submit');
            hoverElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    gsap.to(cursorOutline, { scale: 1.5, borderColor: "rgba(34, 197, 94, 1)", backgroundColor: "rgba(34, 197, 94, 0.1)", duration: 0.2 });
                });
                el.addEventListener('mouseleave', () => {
                    gsap.to(cursorOutline, { scale: 1, borderColor: "rgba(34, 197, 94, 0.5)", backgroundColor: "transparent", duration: 0.2 });
                });
            });
        }

        /* --------------------------------------------------
           GSAP SCROLLTRIGGER (REVEAL ANIMATIONS)
        -------------------------------------------------- */
        gsap.utils.toArray('.reveal-up').forEach(elem => {
            gsap.fromTo(elem, { y: 60, autoAlpha: 0 }, { scrollTrigger: { trigger: elem, start: "top 85%" }, y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" });
        });
        
        gsap.fromTo(".gsap-stagger-table", 
            { x: -30, autoAlpha: 0 }, 
            { scrollTrigger: { trigger: ".profile-table", start: "top 85%" }, x: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
        );
        gsap.fromTo(".gsap-stagger-cert", 
            { y: 50, autoAlpha: 0, scale: 0.9 }, 
            { scrollTrigger: { trigger: ".certificate-flex", start: "top 85%" }, y: 0, autoAlpha: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)" }
        );
        gsap.fromTo(".gsap-stagger-project", 
            { y: 60, autoAlpha: 0 }, 
            { scrollTrigger: { trigger: ".project-grid", start: "top 85%" }, y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
        );

        /* --------------------------------------------------
           BENTO BOX FLOATING ICONS
        -------------------------------------------------- */
        const icons = document.querySelectorAll('.float-icon');
        icons.forEach((icon, index) => {
            gsap.to(icon, {
                y: "random(-15, 15)", x: "random(-15, 15)", rotation: "random(-10, 10)",
                duration: "random(2, 4)", repeat: -1, yoyo: true, ease: "sine.inOut", delay: index * 0.5
            });
        });

        /* --------------------------------------------------
           MAGNETIC BUTTON EFFECT
        -------------------------------------------------- */
        const magneticBtns = document.querySelectorAll('.magnetic-btn');
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
                const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
                gsap.to(btn, { x: x, y: y, duration: 0.3, ease: "power2.out" });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
            });
        });
    }

    /* --------------------------------------------------
       HEADER & NAV SCROLL LOGIC
    -------------------------------------------------- */
    const header = document.getElementById('header');
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');

    window.addEventListener('scroll', function () {
        const scrollTop  = window.pageYOffset;
        const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
        const progress   = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (scrollProgressBar) scrollProgressBar.style.width = progress + '%';

        if (header) header.classList.toggle('scrolled', window.scrollY > 30);

        if (scrollToTopBtn) {
            if (window.pageYOffset > 200) {
                if (scrollToTopBtn.style.display !== 'flex') {
                    scrollToTopBtn.style.display = 'flex';
                    if (typeof gsap !== 'undefined') gsap.to(scrollToTopBtn, { autoAlpha: 1, duration: 0.3 });
                }
            } else {
                if (typeof gsap !== 'undefined') {
                    gsap.to(scrollToTopBtn, { autoAlpha: 0, duration: 0.3, onComplete: () => { scrollToTopBtn.style.display = 'none'; } });
                }
            }
        }

        let currentSectionId = '';
        sections.forEach(section => {
            if (window.pageYOffset >= (section.offsetTop - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) { link.classList.add('active'); }
        });
        if (sections.length > 0 && window.pageYOffset < sections[0].offsetTop - 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            const homeNav = document.querySelector('nav ul li a[href="#hero"]');
            if(homeNav) homeNav.classList.add('active');
        }
    });

    /* --------------------------------------------------
       MOBILE MENU TOGGLE
    -------------------------------------------------- */
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('nav ul.nav-links');
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

    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* --------------------------------------------------
       CURSOR SHOWCASE (Portfolio Hover)
    -------------------------------------------------- */
    const cursorShowcase = document.getElementById('cursorShowcase');
    const projectItems   = document.querySelectorAll('.project-item');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    const cursorOutline = document.querySelector('.custom-cursor-outline');

    document.addEventListener('mousemove', e => {
        if (cursorShowcase && window.innerWidth > 768) {
            cursorShowcase.style.setProperty('--x', e.clientX + 'px');
            cursorShowcase.style.setProperty('--y', e.clientY + 'px');
        }
    });

    projectItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            const img = this.querySelector('.project-image-container img');
            if (img && cursorShowcase && window.innerWidth > 768) {
                if (typeof gsap !== 'undefined') gsap.to([cursorDot, cursorOutline], { autoAlpha: 0, duration: 0.2 });
                cursorShowcase.style.backgroundImage = `url(${img.src})`;
                cursorShowcase.classList.add('visible');
            }
        });
        item.addEventListener('mouseleave', function () {
            if (cursorShowcase && window.innerWidth > 768) {
                if (typeof gsap !== 'undefined') gsap.to([cursorDot, cursorOutline], { autoAlpha: 1, duration: 0.2 });
                cursorShowcase.classList.remove('visible');
            }
        });
    });
}); 

/* --------------------------------------------------
   CUSTOM ALERT & COPY EMAIL FUNCTION
-------------------------------------------------- */
function tampilkanAlert() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    if (form.checkValidity()) {
        const alertBox = document.getElementById('customAlert');
        if (alertBox) {
            alertBox.querySelector('h3').textContent = "Berhasil!";
            alertBox.querySelector('p').textContent = "Pesan kamu sudah terkirim.";
            alertBox.classList.add('show');
            if (typeof gsap !== 'undefined') {
                gsap.fromTo(alertBox.querySelector('.custom-alert-box'), { scale: 0.5 }, { scale: 1, duration: 0.5, ease: "back.out(1.5)" });
            }
        }
    } else {
        form.reportValidity();
    }
}

function tutupAlert() {
    const alertBox = document.getElementById('customAlert');
    if (alertBox) {
        if (typeof gsap !== 'undefined') {
            gsap.to(alertBox.querySelector('.custom-alert-box'), { scale: 0.8, duration: 0.3, ease: "power2.in" });
        }
        setTimeout(() => { alertBox.classList.remove('show'); }, 300);
    }
    const form = document.getElementById('contactForm');
    if (form) form.reset();
}

function copyEmailToClipboard() {
    const email = "putrafirdaus6373@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        const alertBox = document.getElementById('customAlert');
        if (alertBox) {
            alertBox.querySelector('h3').textContent = "Email Disalin!";
            alertBox.querySelector('p').textContent = "Alamat email telah disalin ke clipboard.";
            alertBox.classList.add('show');
            if (typeof gsap !== 'undefined') {
                gsap.fromTo(alertBox.querySelector('.custom-alert-box'), { scale: 0.5 }, { scale: 1, duration: 0.5, ease: "back.out(1.5)" });
            }
        } else {
            alert("Email disalin: " + email);
        }
    }).catch(err => {
        console.error('Gagal menyalin email: ', err);
    });
}