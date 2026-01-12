// ===== DOM ELEMENTS =====
const header = document.querySelector('.header');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const currentYearSpan = document.getElementById('current-year');
const contactForm = document.getElementById('contact-form');

// ===== HEADER SCROLL EFFECT =====
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===== MOBILE MENU TOGGLE =====
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===== SET CURRENT YEAR IN FOOTER =====
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// ===== SCROLL REVEAL ANIMATIONS =====
const fadeElements = document.querySelectorAll('.fade-in');

const revealOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
};

// Initial check and add scroll listener
if (fadeElements.length > 0) {
    window.addEventListener('DOMContentLoaded', revealOnScroll);
    window.addEventListener('scroll', revealOnScroll);
}

// ===== FORM VALIDATION =====
if (contactForm) {
    const validateField = (field) => {
        const value = field.value.trim();
        const errorElement = field.nextElementSibling?.classList?.contains('error-message') 
            ? field.nextElementSibling 
            : field.parentElement.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.style.display = 'none';
        }
        field.style.borderColor = '#e9ecef';
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            if (errorElement) {
                errorElement.textContent = 'This field is required';
                errorElement.style.display = 'block';
            }
            field.style.borderColor = '#e53e3e';
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                if (errorElement) {
                    errorElement.textContent = 'Please enter a valid email address';
                    errorElement.style.display = 'block';
                }
                field.style.borderColor = '#e53e3e';
                return false;
            }
        }
        
        return true;
    };
    
    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formFields = contactForm.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        formFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Show success message
            const submitBtn = contactForm.querySelector('.btn[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! We will contact you shortly.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    });
    
    // Real-time validation
    const formFields = contactForm.querySelectorAll('input, textarea, select');
    formFields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            const errorElement = field.nextElementSibling?.classList?.contains('error-message') 
                ? field.nextElementSibling 
                : field.parentElement.querySelector('.error-message');
            if (errorElement) {
                errorElement.style.display = 'none';
            }
            field.style.borderColor = '#e9ecef';
        });
    });
}

// ===== PAGE INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('WMIC Website Loaded');
    
    // Set current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});