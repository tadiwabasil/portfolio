// DOM Elements
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav_links');
const scrollProgress = document.querySelector('.scroll-progress');
const contactForm = document.getElementById('contactForm');
const backToTop = document.querySelector('.back-to-top');
const themeToggle = document.querySelector('.theme-toggle');
const preloader = document.querySelector('.preloader');

// Typed.js effect for hero section
const typedText = document.getElementById('typed-text');
const roles = [
    "Data Analyst",
    "Data Scientist",
    "Machine Learning Engineer",
    "Business Intelligence Developer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typedText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isEnd = true;
        isDeleting = true;
        setTimeout(typeEffect, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500);
    } else {
        let typeSpeed = isDeleting ? 50 : 100;
        typeSpeed = isEnd ? 2000 : typeSpeed;
        setTimeout(typeEffect, typeSpeed);
    }
}

// Theme Toggle
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Header scroll effect
function handleScroll() {
    const scrollY = window.scrollY;

    // Header background
    if (scrollY > 50) {
        header.style.padding = '15px 0';
        header.style.backdropFilter = 'blur(15px)';
    } else {
        header.style.padding = '20px 0';
        header.style.backdropFilter = 'blur(10px)';
    }

    // Scroll progress
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollPercent = (scrollY / (docHeight - winHeight)) * 100;
    scrollProgress.style.width = scrollPercent + '%';

    // Back to top button
    if (scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

// Mobile menu toggle
function toggleMenu() {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.className = navLinks.classList.contains('active')
        ? 'fas fa-times'
        : 'fas fa-bars';
}

// Close mobile menu when clicking on a link
function closeMenu() {
    navLinks.classList.remove('active');
    menuToggle.querySelector('i').className = 'fas fa-bars';
}

// Contact form submission
function handleFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if (name && email && subject && message) {
        // In a real application, you would send this data to a server
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    } else {
        showNotification('Please fill in all fields.', 'error');
    }
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

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

            // Animate skill bars
            if (entry.target.classList.contains('skill-level')) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 300);
            }
        }
    });
}, observerOptions);

// Preloader
function hidePreloader() {
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            typeEffect(); // Start typed effect after loading
        }, 500);
    }, 1500);
}

// Initialize everything
function init() {
    // Preloader
    hidePreloader();

    // Theme
    initTheme();
    themeToggle.addEventListener('click', toggleTheme);

    // Scroll events
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    // Mobile menu
    menuToggle.addEventListener('click', toggleMenu);
    document.querySelectorAll('.nav_links .link a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Contact form
    contactForm.addEventListener('submit', handleFormSubmit);

    // Back to top
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Observe elements for animation
    document.querySelectorAll('.fade-in, .skill-level, .category-card, .project-card, .timeline-content').forEach(el => {
        observer.observe(el);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Data visualization canvas (simple example)
    initDataVisualization();
}

// Simple data visualization
function initDataVisualization() {
    const canvas = document.getElementById('dataCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const points = [];
    const pointCount = 50;

    // Create points
    for (let i = 0; i < pointCount; i++) {
        points.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connections
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;

        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const dx = points[i].x - points[j].x;
                const dy = points[i].y - points[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(points[i].x, points[i].y);
                    ctx.lineTo(points[j].x, points[j].y);
                    ctx.stroke();
                }
            }
        }

        // Update and draw points
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';

        points.forEach(point => {
            // Update position
            point.x += point.vx;
            point.y += point.vy;

            // Bounce off edges
            if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
            if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

            // Draw point
            ctx.beginPath();
            ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize on load
window.addEventListener('load', init);