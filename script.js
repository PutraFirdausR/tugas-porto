$(document).ready(function () {
    
    // Daftarkan plugin GSAP
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        /* --------------------------------------------------
           HACKER PRELOADER ANIMATION
        -------------------------------------------------- */
        const hackerLines = [
            "> Initializing system core...",
            "> Establishing secure connection...",
            "> Bypassing security protocols...",
            "> Decrypting data [100%]...",
            "> Portofolio Putra Firdaus",
            "> Loading visual interface..."
        ];
        
        let hackerLineIndex = 0;
        const $hackerText = $('#hacker-text');
        
        function typeHackerLine() {
            if (hackerLineIndex < hackerLines.length) {
                // Tambahkan baris teks dengan kedipan kursor palsu
                $hackerText.append('<span>' + hackerLines[hackerLineIndex] + '</span><br>');
                hackerLineIndex++;
                
                // Jeda random antara 200ms - 500ms agar terlihat seperti sedang memproses sungguhan
                let randomDelay = Math.floor(Math.random() * 300) + 200;
                setTimeout(typeHackerLine, randomDelay);
            } else {
                // Teks selesai, mulai animasi preloader loading bar dan buka halaman
                const preloaderTimeline = gsap.timeline();
                
                preloaderTimeline.to(".preloader-progress", { width: "100%", duration: 1, ease: "power2.inOut" })
                .to(".preloader", { yPercent: -100, duration: 0.8, ease: "power3.inOut", delay: 0.2 })
                .from(".reveal-hero", { y: 30, autoAlpha: 0, duration: 1, stagger: 0.15, ease: "back.out(1.2)" }, "-=0.3")
                .call(typeEffect); // Panggil fungsi ngetik di hero section setelah loading hilang
            }
        }
        
        // Mulai jalankan teks hacker-nya
        typeHackerLine();

        /* --------------------------------------------------
           ADVANCED TYPING EFFECT (CINEMATIC) DENGAN JQUERY
        -------------------------------------------------- */
        const $dynamicText = $('.dynamic-text'); // Selector jQuery
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
            // Cek apakah elemen ada
            if (!$dynamicText.length) return;

            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                currentText = currentPhrase.substring(0, letterIndex - 1);
                letterIndex--;
            } else {
                currentText = currentPhrase.substring(0, letterIndex + 1);
                letterIndex++;
            }

            // Memasukkan teks ke HTML menggunakan fungsi text() dari jQuery
            $dynamicText.text(currentText);

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
           GLOBAL CUSTOM CURSOR (JQUERY + GSAP)
        -------------------------------------------------- */
        const $cursorDot = $('.custom-cursor-dot');
        const $cursorOutline = $('.custom-cursor-outline');

        // Pengecekan lebar layar menggunakan jQuery
        if($(window).width() > 768) {
            $(window).on('mousemove', function(e) {
                gsap.to($cursorDot[0], { x: e.clientX, y: e.clientY, duration: 0.1 });
                gsap.to($cursorOutline[0], { x: e.clientX, y: e.clientY, duration: 0.5 });
            });

            // Hover state warna Hijau Neon
            $('a, button, input, textarea, .detail-pill, .certificate-item, .btn-submit').on('mouseenter', function() {
                gsap.to($cursorOutline[0], { scale: 1.5, borderColor: "rgba(34, 197, 94, 1)", backgroundColor: "rgba(34, 197, 94, 0.1)", duration: 0.2 });
            }).on('mouseleave', function() {
                gsap.to($cursorOutline[0], { scale: 1, borderColor: "rgba(34, 197, 94, 0.5)", backgroundColor: "transparent", duration: 0.2 });
            });
        }

        /* --------------------------------------------------
           GSAP SCROLLTRIGGER (REVEAL ANIMATIONS)
        -------------------------------------------------- */
        $('.reveal-up').each(function() {
            gsap.fromTo(this, { y: 60, autoAlpha: 0 }, { scrollTrigger: { trigger: this, start: "top 85%" }, y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" });
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
           BENTO BOX FLOATING ICONS (JQUERY EACH)
        -------------------------------------------------- */
        $('.float-icon').each(function(index) {
            gsap.to(this, {
                y: "random(-15, 15)", x: "random(-15, 15)", rotation: "random(-10, 10)",
                duration: "random(2, 4)", repeat: -1, yoyo: true, ease: "sine.inOut", delay: index * 0.5
            });
        });

        /* --------------------------------------------------
           MAGNETIC BUTTON EFFECT (JQUERY ON)
        -------------------------------------------------- */
        $('.magnetic-btn').on('mousemove', function(e) {
            const rect = this.getBoundingClientRect(); // Menggunakan fungsi asli DOM untuk presisi
            const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
            gsap.to(this, { x: x, y: y, duration: 0.3, ease: "power2.out" });
        }).on('mouseleave', function() {
            gsap.to(this, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
        });
    }

    /* --------------------------------------------------
       HEADER & NAV SCROLL LOGIC (FULL JQUERY)
    -------------------------------------------------- */
    const $header = $('#header');
    const $scrollProgressBar = $('#scrollProgressBar');
    const $scrollToTopBtn = $('.scroll-to-top');

    $(window).on('scroll', function () {
        const scrollTop = $(this).scrollTop();
        const docHeight = $(document).height() - $(window).height();
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        
        // Atur lebar scrollbar
        $scrollProgressBar.css('width', progress + '%');

        // Toggle shadow di header
        $header.toggleClass('scrolled', scrollTop > 30);

        // Tombol Scroll ke atas
        if (scrollTop > 200) {
            if ($scrollToTopBtn.css('display') !== 'flex') {
                $scrollToTopBtn.css('display', 'flex');
                if (typeof gsap !== 'undefined') gsap.to($scrollToTopBtn[0], { autoAlpha: 1, duration: 0.3 });
            }
        } else {
            if (typeof gsap !== 'undefined') {
                gsap.to($scrollToTopBtn[0], { autoAlpha: 0, duration: 0.3, onComplete: () => { $scrollToTopBtn.css('display', 'none'); } });
            }
        }

        // Active State di Navbar
        let currentSectionId = '';
        $('main section').each(function() {
            if (scrollTop >= ($(this).offset().top - 150)) {
                currentSectionId = $(this).attr('id');
            }
        });

        $('.nav-link').removeClass('active');
        if (currentSectionId) {
            $('.nav-link[href="#' + currentSectionId + '"]').addClass('active');
        }

        // Paksa Menu Home Aktif saat di paling atas
        if ($('main section').length > 0 && scrollTop < $('main section').first().offset().top - 100) {
            $('.nav-link').removeClass('active');
            $('nav ul li a[href="#hero"]').addClass('active');
        }
    });

    /* --------------------------------------------------
       MOBILE MENU TOGGLE (JQUERY)
    -------------------------------------------------- */
    $('.menu-toggle').on('click', function () {
        $('.nav-links').toggleClass('active');
        $(this).toggleClass('open');
        $('body').css('overflow', $('.nav-links').hasClass('active') ? 'hidden' : '');
    });

    $('.nav-link').on('click', function () {
        $('.nav-links').removeClass('active');
        $('.menu-toggle').removeClass('open');
        $('body').css('overflow', '');
    });

    // Menuliskan tahun berjalan otomatis ke footer
    $('#currentYear').text(new Date().getFullYear());

    // Scroll To Top Saat di-klik
    $scrollToTopBtn.on('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* --------------------------------------------------
       CURSOR SHOWCASE (PORTFOLIO HOVER - JQUERY)
    -------------------------------------------------- */
    const $cursorShowcase = $('#cursorShowcase');

    $(document).on('mousemove', function(e) {
        if ($cursorShowcase.length && $(window).width() > 768) {
            $cursorShowcase.css({
                '--x': e.clientX + 'px',
                '--y': e.clientY + 'px'
            });
        }
    });

    $('.project-item').on('mouseenter', function () {
        const imgSrc = $(this).find('.project-image-container img').attr('src');
        if (imgSrc && $cursorShowcase.length && $(window).width() > 768) {
            if (typeof gsap !== 'undefined') gsap.to(['.custom-cursor-dot', '.custom-cursor-outline'], { autoAlpha: 0, duration: 0.2 });
            $cursorShowcase.css('background-image', `url(${imgSrc})`).addClass('visible');
        }
    }).on('mouseleave', function () {
        if ($cursorShowcase.length && $(window).width() > 768) {
            if (typeof gsap !== 'undefined') gsap.to(['.custom-cursor-dot', '.custom-cursor-outline'], { autoAlpha: 1, duration: 0.2 });
            $cursorShowcase.removeClass('visible');
        }
    });

}); 

/* --------------------------------------------------
   CUSTOM ALERT & COPY EMAIL FUNCTION (JQUERY)
-------------------------------------------------- */
// Fungsi-fungsi ini berada di luar $(document).ready agar bisa dipanggil dari atribut onclick="..." di HTML

function tampilkanAlert() {
    const form = $('#contactForm')[0];
    if (!form) return;

    if (form.checkValidity()) {
        const $alertBox = $('#customAlert');
        if ($alertBox.length) {
            $alertBox.find('h3').text("Berhasil!");
            $alertBox.find('p').text("Pesan kamu sudah terkirim.");
            $alertBox.addClass('show');
            if (typeof gsap !== 'undefined') {
                gsap.fromTo($alertBox.find('.custom-alert-box')[0], { scale: 0.5 }, { scale: 1, duration: 0.5, ease: "back.out(1.5)" });
            }
        }
    } else {
        form.reportValidity(); // Memaksa browser menampilkan error validasi standar HTML5
    }
}

function tutupAlert() {
    const $alertBox = $('#customAlert');
    if ($alertBox.length) {
        if (typeof gsap !== 'undefined') {
            gsap.to($alertBox.find('.custom-alert-box')[0], { scale: 0.8, duration: 0.3, ease: "power2.in" });
        }
        setTimeout(() => { $alertBox.removeClass('show'); }, 300);
    }
    
    // Reset form setelah sukses
    const form = $('#contactForm')[0];
    if (form) form.reset();
}

function copyEmailToClipboard() {
    const email = "putrafirdaus6373@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        const $alertBox = $('#customAlert');
        if ($alertBox.length) {
            $alertBox.find('h3').text("Email Disalin!");
            $alertBox.find('p').text("Alamat email telah disalin ke clipboard.");
            $alertBox.addClass('show');
            if (typeof gsap !== 'undefined') {
                gsap.fromTo($alertBox.find('.custom-alert-box')[0], { scale: 0.5 }, { scale: 1, duration: 0.5, ease: "back.out(1.5)" });
            }
        } else {
            alert("Email disalin: " + email);
        }
    }).catch(err => {
        console.error('Gagal menyalin email: ', err);
    });
}

        /* --------------------------------------------------
           MINI GAME: TANGKAP BUG
        -------------------------------------------------- */
        let score = 0;
        let timeLeft = 15;
        let gameInterval;
        let moveInterval;
        let isPlaying = false;
        
        const $bug = $('#bug');
        const $scoreDisplay = $('#score');
        const $timerDisplay = $('#timer');
        const $startBtn = $('#startGameBtn');
        const $gameArea = $('.game-area');
        
        function moveBug() {
            // Menghitung batas area agar bug tidak keluar kotak
            const maxX = $gameArea.width() - 40; 
            const maxY = $gameArea.height() - 40;
            
            const randomX = Math.floor(Math.random() * maxX);
            const randomY = Math.floor(Math.random() * maxY);
            
            $bug.css({
                top: randomY + 'px',
                left: randomX + 'px'
            });
        }
        
        $startBtn.on('click', function() {
            if(isPlaying) return;
            isPlaying = true;
            score = 0;
            timeLeft = 15;
            
            $scoreDisplay.text(score);
            $timerDisplay.text(timeLeft);
            $startBtn.prop('disabled', true).text('Membasmi Bug...');
            $bug.show();
            
            moveBug(); // Gerakkan bug pertama kali
            
            // Bug berpindah setiap 800ms
            moveInterval = setInterval(moveBug, 800);
            
            // Hitung mundur waktu
            gameInterval = setInterval(() => {
                timeLeft--;
                $timerDisplay.text(timeLeft);
                
                if(timeLeft <= 0) {
                    endGame();
                }
            }, 1000);
        });
        
        $bug.on('click', function() {
            if(!isPlaying) return;
            
            score++;
            $scoreDisplay.text(score);
            
            // Animasi pop saat bug diklik menggunakan GSAP
            if (typeof gsap !== 'undefined') {
                gsap.fromTo(this, { scale: 0.3 }, { scale: 1, duration: 0.3, ease: "back.out(2)" });
            }
            
            // Segera pindahkan bug setelah diklik agar lebih menantang
            moveBug();
            
            // Reset interval agar bug tidak tiba-tiba lompat dua kali
            clearInterval(moveInterval);
            moveInterval = setInterval(moveBug, 800);
        });
        
        function endGame() {
            isPlaying = false;
            clearInterval(gameInterval);
            clearInterval(moveInterval);
            $bug.hide();
            $startBtn.prop('disabled', false).text('Main Lagi');
            
            // Menggunakan custom alert milikmu yang sudah ada di script.js
            const $alertBox = $('#customAlert');
            if ($alertBox.length) {
                $alertBox.find('h3').text("Waktu Habis!");
                $alertBox.find('p').text(`Hebat! Kamu berhasil membasmi ${score} bug!`);
                $alertBox.addClass('show');
                if (typeof gsap !== 'undefined') {
                    gsap.fromTo($alertBox.find('.custom-alert-box')[0], { scale: 0.5 }, { scale: 1, duration: 0.5, ease: "back.out(1.5)" });
                }
            } else {
                alert(`Waktu Habis! Kamu berhasil menangkap ${score} bug.`);
            }
        }