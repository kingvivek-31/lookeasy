// ============================================
// LookEasy — Premium Agency Scripts
// Mobile-First Responsive Interactions
// ============================================

// Initialize AOS with mobile-friendly settings
AOS.init({
    duration: 700,
    once: true,
    offset: 60,
    easing: 'ease-out-cubic',
    disable: function () {
        return window.innerWidth < 360;
    }
});

// =================== UTILITIES ===================
function debounce(fn, ms = 16) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), ms);
    };
}

function isDesktop() {
    return window.innerWidth >= 1024 && matchMedia('(hover: hover)').matches;
}

function isTabletUp() {
    return window.innerWidth >= 768;
}

// =================== CURSOR GLOW (Desktop Only) ===================
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow && isDesktop()) {
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.15;
        glowY += (mouseY - glowY) * 0.15;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
}

// =================== MOBILE MENU ===================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    let isMenuOpen = false;

    mobileMenuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        mobileMenu.classList.toggle('open', isMenuOpen);
        mobileMenuBtn.querySelector('i').className = isMenuOpen
            ? 'fa-solid fa-xmark text-le-white text-lg'
            : 'fa-solid fa-bars text-le-white text-lg';
        mobileMenuBtn.setAttribute('aria-expanded', isMenuOpen);

        // Prevent body scroll when menu is open
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            mobileMenu.classList.remove('open');
            mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars text-le-white text-lg';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            isMenuOpen = false;
            mobileMenu.classList.remove('open');
            mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars text-le-white text-lg';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

// =================== NAVBAR SCROLL EFFECT ===================
const nav = document.querySelector('nav');
const onScroll = debounce(() => {
    if (!nav) return;
    if (window.scrollY > 80) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
}, 10);

window.addEventListener('scroll', onScroll, { passive: true });

// =================== COUNTER ANIMATION ===================
const counters = document.querySelectorAll('.counter');
if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const suffix = counter.getAttribute('data-suffix') || '+';
                let current = 0;
                const increment = target / 40;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target + suffix;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + suffix;
                    }
                }, 40);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => counterObserver.observe(counter));
}

// =================== SECTION REVEAL ON SCROLL ===================
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.05 });

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(15px)';
    section.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    sectionObserver.observe(section);
});

// =================== PARALLAX ON HERO ORBS (Desktop Only) ===================
if (isDesktop()) {
    const onParallax = debounce(() => {
        const scrollY = window.scrollY;
        const orbs = document.querySelectorAll('.hero-orb');
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.12;
            orb.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }, 16);
    window.addEventListener('scroll', onParallax, { passive: true });
}

// =================== TILT ON PORTFOLIO CARDS (Desktop Only) ===================
if (isDesktop()) {
    document.querySelectorAll('.portfolio-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        }, { passive: true });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// =================== MAGNETIC BUTTONS (Desktop Only) ===================
if (isDesktop()) {
    document.querySelectorAll('.btn-glow').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px) translateY(-3px)`;
        }, { passive: true });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// =================== ACTIVE NAV LINK ===================
const navLinks = document.querySelectorAll('.nav-link');
const updateActiveNav = debounce(() => {
    let current = '';
    document.querySelectorAll('section[id], header[id]').forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('text-le-white', 'active');
        link.classList.add('text-le-silver');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('text-le-white', 'active');
            link.classList.remove('text-le-silver');
        }
    });
}, 50);

window.addEventListener('scroll', updateActiveNav, { passive: true });

// =================== BUTTON RIPPLE EFFECT ===================
document.querySelectorAll('.btn-glow, .btn-ghost').forEach(button => {
    button.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        Object.assign(ripple.style, {
            position: 'absolute',
            left: (e.clientX - rect.left) + 'px',
            top: (e.clientY - rect.top) + 'px',
            width: '0',
            height: '0',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.4)',
            pointerEvents: 'none',
            animation: 'ripple-animation 0.6s ease-out'
        });

        if (!this.style.position || this.style.position === 'static') {
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
        }

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// =================== SMOOTH SCROLL ===================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const navHeight = nav ? nav.offsetHeight : 0;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// =================== RESIZE HANDLER ===================
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (isTabletUp() && mobileMenu) {
            mobileMenu.classList.remove('open');
            if (mobileMenuBtn) {
                mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars text-le-white text-lg';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
            document.body.style.overflow = '';
        }
    }, 250);
}, { passive: true });