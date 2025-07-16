
// Initialize Lucide icons
lucide.createIcons();

// Global variables
let mousePosition = { x: 0, y: 0 };
let visibleSections = [];
let isMenuOpen = false;
let activeSection = 'hero';
let animatedCounters = {
    experience: 0,
    brands: 0,
    roas: 0,
    ctr: 0
};

// DOM elements
const cursorTrail = document.getElementById('cursor-trail');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

// Mouse movement tracking
document.addEventListener('mousemove', (e) => {
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;

    if (cursorTrail) {
        cursorTrail.style.left = (mousePosition.x - 12) + 'px';
        cursorTrail.style.top = (mousePosition.y - 12) + 'px';
    }
});

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        if (isMenuOpen) {
            toggleMobileMenu();
        }
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
        mobileMenu.classList.add('show');
        mobileMenu.style.display = 'block';
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    } else {
        mobileMenu.classList.remove('show');
        mobileMenu.style.display = 'none';
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
}

// Mobile menu button event listener
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

// Navigation item click handlers
document.querySelectorAll('.nav-item, .mobile-nav-item').forEach(item => {
    item.addEventListener('click', () => {
        const section = item.getAttribute('data-section');
        if (section) {
            scrollToSection(section);
        }
    });
});

// Update active navigation item
function updateActiveNavItem(sectionId) {
    // Update desktop nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === sectionId) {
            item.classList.add('active');
        }
    });

    // Update mobile nav
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === sectionId) {
            item.classList.add('active');
        }
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;

            // Add to visible sections if not already there
            if (!visibleSections.includes(sectionId)) {
                visibleSections.push(sectionId);
            }

            // Update active section
            activeSection = sectionId;
            updateActiveNavItem(sectionId);

            // Trigger section-specific animations
            triggerSectionAnimations(sectionId);
        }
    });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = ['hero', 'about', 'services', 'case-studies', 'why-us', 'cta'];
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            observer.observe(section);
        }
    });
});

// Trigger section-specific animations
function triggerSectionAnimations(sectionId) {
    switch (sectionId) {
        case 'about':
            animateCounters();
            break;
        case 'services':
            animateServiceCards();
            break;
        case 'case-studies':
            animateCaseStudies();
            break;
    }
}

// Animate counters
function animateCounters() {
    if (animatedCounters.experience > 0) return; // Already animated

    const counters = [
        { key: 'experience', target: 4, duration: 2000, element: 'experience-counter', suffix: '+' },
        { key: 'brands', target: 30, duration: 2500, element: 'brands-counter', suffix: '+' },
        { key: 'roas', target: 5.5, duration: 2000, element: 'roas-counter', suffix: '%+' },
        { key: 'ctr', target: 3.7, duration: 2000, element: 'ctr-counter', suffix: '%+' }
    ];


    counters.forEach(({ key, target, duration, element, suffix }) => {
        const el = document.getElementById(element);
        if (!el) return;

        let start = 0;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (target - start) * progress);

            animatedCounters[key] = current;
            el.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    });
}

// Animate service cards
function animateServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Animate case studies
function animateCaseStudies() {
    const caseStudyCards = document.querySelectorAll('.case-study-card');
    caseStudyCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 300);
    });
}

// Parallax effect for hero section
function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');

    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
    });
}

// Scroll event listener for parallax
window.addEventListener('scroll', () => {
    updateParallax();

    // Update navbar background opacity based on scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
        const scrolled = window.pageYOffset;
        const opacity = Math.min(scrolled / 100, 0.95);
        navbar.style.background = `rgba(10, 31, 68, ${opacity})`;
    }
});

// Add hover effects to interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add glow effect to CTA buttons
    const ctaButtons = document.querySelectorAll('.hero-cta, .nav-cta, .cta-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.boxShadow = '0 0 30px rgba(255, 196, 0, 0.5)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.boxShadow = '';
        });
    });

    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 20px 40px rgba(255, 196, 0, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
        });
    });

    // Add click effects to case study cards
    const caseStudyCards = document.querySelectorAll('.case-study-card');
    caseStudyCards.forEach(card => {
        card.addEventListener('click', () => {
            // Add a subtle scale animation
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'scale(1.05)';
            }, 100);
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
        toggleMobileMenu();
    }
});

// Resize handler for responsive adjustments
window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && isMenuOpen) {
        toggleMobileMenu();
    }
});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add initial animation classes
    const heroContent = document.querySelector('.hero-content');
    const heroDashboard = document.querySelector('.hero-dashboard');

    if (heroContent) {
        heroContent.style.animation = 'slideInUp 1s ease-out';
    }

    if (heroDashboard) {
        heroDashboard.style.animation = 'slideInUp 1s ease-out 0.3s both';
    }

    // Initialize Lucide icons again after DOM manipulation
    lucide.createIcons();
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledParallax = throttle(updateParallax, 16); // ~60fps
window.addEventListener('scroll', throttledParallax);

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = () => {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    document.addEventListener('DOMContentLoaded', smoothScrollPolyfill);
}

// Add loading states for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });

        img.addEventListener('error', () => {
            img.style.opacity = '0.5';
            console.warn('Failed to load image:', img.src);
        });
    });
});

// Add intersection observer for fade-in animations
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.metric-box, .feature-item, .footer-section');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(el);
    });
});