/* ============================================================
   PORTFOLIO JAVASCRIPT — Animations & Interactions
   ============================================================ */

// ===== CURSOR GLOW =====
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
}

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    // Shrink navbar
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active link highlight
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 200;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
});

navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('active');
    });
});

// ===== HERO ENTRANCE ANIMATION =====
function animateHero() {
    const elements = [
        { el: '#heroBadge', delay: 200 },
        { el: '.hero-greeting', delay: 400 },
        { el: '.hero-name', delay: 600 },
        { el: '#heroHeadline', delay: 800 },
        { el: '#heroSub', delay: 1000 },
        { el: '#heroCta', delay: 1200 },
        { el: '#heroTech', delay: 1400 },
        { el: '#scrollIndicator', delay: 1600 }
    ];

    elements.forEach(({ el, delay }) => {
        const element = document.querySelector(el);
        if (element) {
            setTimeout(() => {
                element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, delay);
        }
    });
}

// Run hero animation on load
window.addEventListener('load', animateHero);

// ===== SCROLL REVEAL =====
function createScrollObserver() {
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Animate skill bars when skills section is visible
                if (entry.target.closest('#skills') || entry.target.id === 'skills') {
                    animateSkillBars();
                }
                // Animate stat counters
                if (entry.target.closest('#about') || entry.target.id === 'about') {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Add reveal class to elements
    const revealSelectors = [
        '.about-text-col', '.about-stats-col',
        '.skill-category',
        '.project-card',
        '.contact-info-col', '.contact-form',
        '.section-title', '.section-subtitle'
    ];

    revealSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    });
}

createScrollObserver();

// ===== SKILL BARS ANIMATION =====
let skillBarsAnimated = false;
function animateSkillBars() {
    if (skillBarsAnimated) return;
    skillBarsAnimated = true;

    document.querySelectorAll('.skill-fill').forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, index * 80);
    });
}

// ===== STAT COUNTER ANIMATION =====
let countersAnimated = false;
function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    document.querySelectorAll('.stat-number[data-count]').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== CONTACT FORM (UI ONLY) =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
        btn.style.background = 'var(--teal)';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
            contactForm.reset();
        }, 3000);
    });
}

// ===== PROJECT CARD TILT =====
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===== PARALLAX ON SCROLL =====
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
    }
});

// ===== TYPING EFFECT FOR HEADLINE (subtle) =====
const headline = document.getElementById('heroHeadline');
if (headline) {
    const text = headline.textContent;
    headline.textContent = '';
    headline.style.opacity = '1';
    headline.style.transform = 'translateY(0)';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            headline.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 25);
        }
    }
    // Start typing after hero animation begins
    setTimeout(typeWriter, 900);
}
