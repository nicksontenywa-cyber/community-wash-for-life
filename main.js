// Hide/Show Navbar on Scroll (Bootstrap Navbar Compatible)
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add scrolled class for shadow effect
    if (navbar) {
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    if (scrollTop > 100) {
        if (scrollTop > lastScrollTop) {
            // Scrolling DOWN - hide navbar
            if (navbar) {
                navbar.classList.add('navbar-hide');
                navbar.classList.remove('navbar-show');
            }
        } else {
            // Scrolling UP - show navbar
            if (navbar) {
                navbar.classList.remove('navbar-hide');
                navbar.classList.add('navbar-show');
            }
        }
    } else {
        if (navbar) {
            navbar.classList.remove('navbar-hide');
            navbar.classList.add('navbar-show');
        }
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Bootstrap Navbar Link Active State
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Mobile menu collapse on link click
    const navbarCollapse = document.querySelector('.navbar-collapse');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                document.querySelector('.navbar-toggler').click();
            }
        });
    });
});

// Form Validation
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('.form-control');

    inputs.forEach(input => {
        input.classList.remove('is-invalid', 'is-valid');

        if (input.hasAttribute('required') && input.value.trim() === '') {
            input.classList.add('is-invalid');
            isValid = false;
        } else if (input.type === 'email' && input.value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.add('is-valid');
            }
        } else if (input.value.trim() !== '') {
            input.classList.add('is-valid');
        }
    });

    return isValid;
}

// Show Form Success Message
function showFormSuccess(form, message = 'Thank you! We\'ll be in touch soon.') {
    const successBox = form.querySelector('.form-success') || document.createElement('div');
    successBox.className = 'form-success show';
    successBox.innerHTML = `<strong>Success!</strong> ${message}`;

    if (!form.querySelector('.form-success')) {
        form.insertBefore(successBox, form.firstChild);
    }

    setTimeout(() => {
        successBox.classList.remove('show');
        form.reset();
        form.querySelectorAll('.form-control').forEach(input => {
            input.classList.remove('is-valid', 'is-invalid');
        });
    }, 3000);
}

// Animate Impact Counters
function animateCounters() {
    const counters = document.querySelectorAll('.counter-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 50;
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString() + (counter.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString() + (counter.getAttribute('data-suffix') || '');
            }
        };

        updateCounter();
    });
}

// Intersection Observer for Counter Animation
function initCounterAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter-number').forEach(el => {
        observer.observe(el);
    });
}

// Testimonial Carousel
class TestimonialCarousel {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.items = this.container.querySelectorAll('.carousel-testimonial');
        this.dots = this.container.querySelectorAll('.carousel-dot');
        this.currentIndex = 0;

        this.init();
    }

    init() {
        if (this.items.length === 0) return;

        this.items[0].classList.add('active');
        if (this.dots.length > 0) this.dots[0].classList.add('active');

        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Auto-rotate every 5 seconds
        setInterval(() => this.nextSlide(), 5000);
    }

    goToSlide(index) {
        this.items[this.currentIndex].classList.remove('active');
        this.dots[this.currentIndex].classList.remove('active');

        this.currentIndex = index;

        this.items[this.currentIndex].classList.add('active');
        this.dots[this.currentIndex].classList.add('active');
    }

    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.items.length;
        this.goToSlide(nextIndex);
    }
}

// FAQ Search Functionality
function initFAQSearch() {
    const searchBox = document.getElementById('faqSearch');
    const faqItems = document.querySelectorAll('.accordion-item');

    if (!searchBox) return;

    searchBox.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();

        faqItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Global Search Functionality
function initGlobalSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');

    if (!searchInput) return;

    // Sample search index - in production, this would be built server-side
    const searchIndex = [
        { title: 'About Us', url: 'about.html', category: 'Organization' },
        { title: 'Education Programs', url: 'education.html', category: 'Programs' },
        { title: 'Water & Sanitation', url: 'water-sanitation.html', category: 'Programs' },
        { title: 'Health Initiatives', url: 'health-hygiene.html', category: 'Programs' },
        { title: 'Volunteer Opportunities', url: 'volunteer.html', category: 'Get Involved' },
        { title: 'Donate Now', url: 'donate.html', category: 'Support' },
        { title: 'Blog & News', url: 'blog.html', category: 'News' },
        { title: 'FAQs', url: 'faq.html', category: 'Help' },
        { title: 'Contact Us', url: 'contact.html', category: 'Support' },
        { title: 'Gallery', url: 'gallery.html', category: 'Media' },
        { title: 'Projects', url: 'projects.html', category: 'Impact' }
    ];

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();

        if (query.length < 2) {
            searchResults?.classList.remove('show');
            return;
        }

        const results = searchIndex.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );

        if (results.length === 0 || !searchResults) return;

        searchResults.innerHTML = results.map(result => `
            <a href="${result.url}" class="search-result-item">
                <strong>${result.title}</strong>
                <br>
                <small style="color: var(--gray);">${result.category}</small>
            </a>
        `).join('');

        searchResults.classList.add('show');
    });

    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-bar') && searchResults) {
            searchResults.classList.remove('show');
        }
    });
}

// Newsletter Signup
function initNewsletterSignup() {
    const forms = document.querySelectorAll('.newsletter-form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = this.querySelector('input[type="email"]');
            if (email && email.value) {
                // Show success message
                const button = this.querySelector('button');
                const originalText = button.textContent;
                button.textContent = 'Subscribed! ✓';
                button.style.background = 'var(--primary-green)';
                button.style.color = 'white';

                setTimeout(() => {
                    this.reset();
                    button.textContent = originalText;
                    button.style.background = '';
                    button.style.color = '';
                }, 3000);
            }
        });
    });
}

// Mobile Menu Close on Link Click
function initMobileMenuClose() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navCollapse = document.querySelector('.navbar-collapse');
    const navToggler = document.querySelector('.navbar-toggler');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navCollapse?.classList.contains('show')) {
                navToggler?.click();
            }
        });
    });
}

// Impact Calculator
function initImpactCalculator() {
    const slider = document.getElementById('impactSlider');
    const amountDisplay = document.getElementById('impactAmount');

    if (!slider) return;

    const impactData = {
        10000: 'Provides clean water for one family for a month',
        25000: 'Educates 10 students about water safety',
        50000: 'Supports a complete community water system',
        100000: 'Builds a complete water & sanitation facility',
        250000: 'Funds a school water & hygiene project',
        500000: 'Supports multiple communities with infrastructure'
    };

    slider.addEventListener('input', function() {
        const value = parseInt(this.value);
        amountDisplay.textContent = value.toLocaleString();

        let description = 'Custom donation amount';
        Object.keys(impactData).forEach(key => {
            if (value >= parseInt(key)) {
                description = impactData[key];
            }
        });

        document.getElementById('impactDescription').textContent = description;

        // Update slider background color
        const percent = (value - 1000) / (500000 - 1000) * 100;
        this.style.background = `linear-gradient(to right, var(--primary-green) 0%, var(--primary-green) ${percent}%, #ddd ${percent}%, #ddd 100%)`;
    });
}

// Select Donation Level
function selectDonationLevel(amount, description) {
    document.getElementById('donation-amount').value = amount;
    document.getElementById('donation-amount').focus();

    // Scroll to form
    const formSection = document.getElementById('donate');
    if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Initialize All Features on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ once: true, duration: 900, offset: 80 });
    }

    // Initialize impact calculator
    initImpactCalculator();

    // Initialize counter animations with scroll observer
    if (document.querySelector('.counter-number')) {
        initCounterAnimation();
    }

    // Initialize testimonial carousel
    new TestimonialCarousel('testimonialCarousel');

    // Initialize FAQ search
    initFAQSearch();

    // Initialize global search
    initGlobalSearch();

    // Initialize newsletter signup
    initNewsletterSignup();

    // Initialize mobile menu close
    initMobileMenuClose();

    // Initialize scroll reveal animations
    initScrollReveal();

    // Form submission handlers
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            // Skip newsletter forms
            if (this.classList.contains('newsletter-form')) return;

            if (!validateForm(this)) {
                e.preventDefault();
                return false;
            }

            e.preventDefault();
            showFormSuccess(this);
        });
    });
});

// Smooth Scroll to Section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

/* ============================================================================
   ADVANCED INTERACTIONS – Scroll Reveals, Enhanced Navbar & More
   ============================================================================ */

// Scroll Reveal Animations – Intersection Observer
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    if (!revealElements.length) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    revealElements.forEach(element => observer.observe(element));
}

// Enhanced Navbar Scroll Behavior – Add scrolled class for styling
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            if (navbar && !navbar.classList.contains('scrolled')) {
                navbar.classList.add('scrolled');
            }
        } else {
            if (navbar) {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

// Animated Number Counter – Smooth counting effect
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Initialize Enhanced Counter Animation
function initEnhancedCounters() {
    const counters = document.querySelectorAll('[data-target]');

    if (!counters.length) return;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

// Parallax Scroll Effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');

    if (!parallaxElements.length) return;

    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const elementPosition = element.offsetTop;
            const distance = scrollPosition - elementPosition;
            element.style.backgroundPosition = `center ${distance * 0.5}px`;
        });
    });
}

// Mobile-friendly Parallax
function checkAndInitParallax() {
    if (window.innerWidth > 768) {
        initParallax();
    }
}

// Ripple Button Effect
function initRippleButtons() {
    const rippleButtons = document.querySelectorAll('.btn-ripple');

    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');

            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 400);
        });
    });
}

// Close mobile nav when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.getElementById('nav');
    const menuToggle = document.getElementById('menuToggle');

    if (nav && menuToggle && !nav.contains(event.target) && !menuToggle.contains(event.target)) {
        nav.classList.remove('active');
    }
});

// Initialize all advanced features on load
document.addEventListener('DOMContentLoaded', function() {
    initNavbarScroll();
    checkAndInitParallax();
    initRippleButtons();
    initEnhancedCounters();
});
