document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const navLinksContainer = document.querySelector('nav ul.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');
    const scrollToTopBtn = document.querySelector('.scroll-to-top');

    // Efek header saat scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 30) { 
            if(header) header.classList.add('scrolled');
        } else {
            if(header) header.classList.remove('scrolled');
        }

        // Tampilkan/sembunyikan tombol scroll to top
        if (window.pageYOffset > 200) { 
            if(scrollToTopBtn) {
                if (scrollToTopBtn.style.display !== 'block') {
                    scrollToTopBtn.style.display = 'block';
                    void scrollToTopBtn.offsetWidth;
                    scrollToTopBtn.style.opacity = '1';
                }
            }
        } else {
            if(scrollToTopBtn) {
                scrollToTopBtn.style.opacity = '0';
                setTimeout(() => {
                    if (window.pageYOffset <= 200) { 
                        scrollToTopBtn.style.display = 'none';
                    }
                }, 300);
            }
        }

        // Highlight navigasi aktif saat scroll
        let currentSectionId = '';
        let minDistance = Infinity;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const distanceToTop = Math.abs(window.pageYOffset - (sectionTop - (header ? header.offsetHeight : 70) - 50));
            const rect = section.getBoundingClientRect();

            if (rect.top <= (header ? header.offsetHeight : 70) + 50 && rect.bottom >= (header ? header.offsetHeight : 70) + 50) {
                if (distanceToTop < minDistance) {
                    minDistance = distanceToTop;
                    currentSectionId = section.getAttribute('id');
                }
            } else if (rect.bottom > (header ? header.offsetHeight : 70) + 50 && rect.top < window.innerHeight && distanceToTop < minDistance) {
                minDistance = distanceToTop;
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref && linkHref.substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
        
        // Jika di paling atas, set 'Beranda' sebagai aktif
        if (sections.length > 0 && window.pageYOffset < sections[0].offsetTop - (header ? header.offsetHeight : 70) - 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('nav ul li a[href="#hero"]');
            if(homeLink) homeLink.classList.add('active');
        }
    });

    // =========================================
    // FITUR DARK MODE
    // =========================================
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const icon = darkModeToggle.querySelector('i');

    const currentMode = localStorage.getItem('darkMode');
    if (currentMode === 'enabled') {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun'); 
    }

    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('darkMode', 'enabled'); 
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('darkMode', 'disabled'); 
        }
    });

    // Toggle menu mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            if(navLinksContainer) navLinksContainer.classList.toggle('active');
            this.classList.toggle('open');
            document.body.style.overflow = navLinksContainer.classList.contains('active') ? 'hidden' : '';
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinksContainer && navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                if(menuToggle) menuToggle.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });

    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinksContainer && navLinksContainer.contains(event.target);
        const isClickOnToggle = menuToggle && menuToggle.contains(event.target);

        if (!isClickInsideNav && !isClickOnToggle && navLinksContainer && navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
            if(menuToggle) menuToggle.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    if(scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // =========================================
    // FITUR EFEK MESIN TIK (TYPEWRITER)
    // =========================================
    const typingElements = document.querySelectorAll('.typing-effect');
    let typingDelay = 500; 

    typingElements.forEach((element) => {
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

    // =========================================
    // FITUR CURSOR SHOWCASE PORTOFOLIO
    // =========================================
    const cursorShowcase = document.getElementById('cursorShowcase');
    const projectItemsElements = document.querySelectorAll('.project-item');

    document.addEventListener('mousemove', (e) => {
        if(cursorShowcase) {
            cursorShowcase.style.setProperty('--x', e.clientX + 'px');
            cursorShowcase.style.setProperty('--y', e.clientY + 'px');
        }
    });

    // Menambahkan event saat mouse masuk dan keluar dari kartu portofolio
    projectItemsElements.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const img = this.querySelector('.project-image-container img');
            if (img && cursorShowcase) {
                cursorShowcase.style.backgroundImage = `url(${img.src})`;
                cursorShowcase.classList.add('visible'); 
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if(cursorShowcase) {
                cursorShowcase.classList.remove('visible');
            }
        });
    });

}); // Penutup DOMContentLoaded

// ================================
// FUNGSI UNTUK CUSTOM ALERT FORM 
// ================================

function tampilkanAlert() {
    const form = document.getElementById('contactForm');
    
    if (form.checkValidity()) {
        const alertBox = document.getElementById('customAlert');
        alertBox.classList.add('show');
        

    } else {
        form.reportValidity();
    }
}

function tutupAlert() {
    const alertBox = document.getElementById('customAlert');
    alertBox.classList.remove('show');
    
    // Mereset (mengosongkan) form setelah pesan sukses ditutup
    document.getElementById('contactForm').reset();
}