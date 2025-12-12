/* script.js - Mahesh portfolio */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------------------- MOBILE NAV ---------------------- */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navMenu.classList.toggle('open');
            document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
        });

        navMenu.querySelectorAll('a.nav-link').forEach(a => {
            a.addEventListener('click', () => {
                navMenu.classList.remove('open');
                hamburger.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    /* ---------------------- BRAND CLICK -> HOME ---------------------- */
    const brand = document.querySelector('.brand');
    if (brand) brand.addEventListener('click', () => window.location.href = 'index.html');


    /* ---------------------- THEME SWITCHER ---------------------- */
    const themeToggle = document.getElementById('themeToggle');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') document.documentElement.setAttribute('data-theme', 'light');

    const setThemeIcon = () => {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        themeToggle.innerHTML = isLight ?
            `<svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M13 2L3 14h7l-1 8L21 10h-7z"/></svg>` :
            `<svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4z"/></svg>`;
    };
    setThemeIcon();

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            if (isLight) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
            setThemeIcon();
        });
    }


    /* ---------------------- REVEAL ANIMATIONS ---------------------- */
    const easeEls = document.querySelectorAll('.ease-in');
    const reveal = () => {
        easeEls.forEach(el => {
            const r = el.getBoundingClientRect();
            if (r.top < window.innerHeight - 60) el.classList.add('visible');
        });
    };
    window.addEventListener('scroll', reveal);
    window.addEventListener('resize', reveal);
    reveal();


    /* ---------------------- EMAILJS CONTACT FORM ---------------------- */
    const form = document.getElementById("contactForm");
    const status = document.getElementById("status");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            status.textContent = "Sending...";
            status.style.color = "var(--muted)";

            emailjs.sendForm(
                    "service_zz0h04p", // your service ID
                    "template_2fjz44v", // FIX THIS → paste your REAL TEMPLATE ID
                    "#contactForm"
                )
                .then(() => {
                    status.textContent = "Message sent successfully!";
                    status.style.color = "var(--accent)";
                    form.reset();
                })
                .catch(err => {
                    console.error(err);
                    status.textContent = "Failed to send message.";
                    status.style.color = "tomato";
                });
        });
    }

    /* ---------------------- ICON HOVER ANIMATION ---------------------- */
    document.querySelectorAll('.contact-card .card').forEach(card => {
        card.addEventListener('mouseenter', () => card.classList.add('hovering'));
        card.addEventListener('mouseleave', () => card.classList.remove('hovering'));
    });

    /* ---------------------- FIX MOBILE OVERFLOW ---------------------- */
    const fixOverflow = () => {
        document.documentElement.style.overflowX =
            window.innerWidth <= 880 ? 'hidden' : '';
    };
    window.addEventListener('resize', fixOverflow);
    fixOverflow();

});