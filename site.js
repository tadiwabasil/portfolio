// DOM Elements
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav_links');
const scrollProgress = document.querySelector('.scroll-progress');
const contactForm = document.getElementById('contactForm');
const slider = document.querySelector('.slider');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const cards = document.querySelectorAll('.card');

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Scroll progress
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset;
    const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav_links .link a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Project slider
let currentSlide = 0;
const cardWidth = cards[0].offsetWidth + 30; // card width + gap

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
}

nextBtn.addEventListener('click', () => {
    if (currentSlide < cards.length - 3) {
        currentSlide++;
    } else {
        currentSlide = 0;
    }
    updateSlider();
});

prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
    } else {
        currentSlide = cards.length - 3;
    }
    updateSlider();
});

// Auto-slide projects
let autoSlideInterval = setInterval(() => {
    if (currentSlide < cards.length - 3) {
        currentSlide++;
    } else {
        currentSlide = 0;
    }
    updateSlider();
}, 4000);

// Pause auto-slide on hover
slider.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

slider.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
        if (currentSlide < cards.length - 3) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        updateSlider();
    }, 4000);
});

// Contact form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Simple validation
    if (name && email && subject && message) {
        // In a real application, you would send this data to a server
        alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill, .category, .card, .about-image, .about-text, .contact-details, .contact-form, .timeline-item').forEach(el => {
    observer.observe(el);
});

// Animate about section paragraphs with delay
document.querySelectorAll('.about-text p').forEach((p, index) => {
    p.style.animationDelay = `${0.3 + index * 0.2}s`;
    observer.observe(p);
});

// Animate social liter links with delay
document.querySelectorAll('.social-liter a').forEach((link, index) => {
    link.style.animationDelay = `${1.2 + index * 0.1}s`;
    observer.observe(link);
});

// Animate contact details paragraphs with delay
document.querySelectorAll('.contact-details p').forEach((p, index) => {
    p.style.animationDelay = `${0.3 + index * 0.2}s`;
    observer.observe(p);
});

// Animate contact items with delay
document.querySelectorAll('.contact-item').forEach((item, index) => {
    item.style.animationDelay = `${0.8 + index * 0.1}s`;
    observer.observe(item);
});

// Animate social links with delay
document.querySelectorAll('.social-link').forEach((link, index) => {
    link.style.animationDelay = `${1.2 + index * 0.1}s`;
    observer.observe(link);
});

// Create floating particles for hero section
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random size and position
        const size = Math.random() * 20 + 5;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 20 + 10;
        const animationDelay = Math.random() * 5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${animationDuration}s`;
        particle.style.animationDelay = `${animationDelay}s`;

        particlesContainer.appendChild(particle);
    }
}

// Initialize particles
createParticles();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add keyboard navigation for project slider
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        if (currentSlide > 0) {
            currentSlide--;
        } else {
            currentSlide = cards.length - 3;
        }
        updateSlider();
    } else if (e.key === 'ArrowRight') {
        if (currentSlide < cards.length - 3) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        updateSlider();
    }
});

// Initialize slider on load
window.addEventListener('load', updateSlider);