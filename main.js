const header = document.querySelector('.header');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const currentYearSpan = document.getElementById('current-year');
const contactForm = document.getElementById('contact-form');

if (header) {
    // Initial check for scroll position on page load
    const checkInitialScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    // Check immediately when DOM is loaded
    document.addEventListener('DOMContentLoaded', checkInitialScroll);
    
    // Also check on window load in case DOMContentLoaded fires before scroll position is set
    window.addEventListener('load', checkInitialScroll);
    
    // Continue with scroll listener
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

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
            // Check if this is a team card and apply 3s delay based on screen width
            if (element.classList.contains('team-card')) {
                if (!element.classList.contains('team-delayed')) {
                    element.classList.add('team-delayed');
                    setTimeout(() => {
                        element.classList.add('visible');
                    }, 3000);
                }
            } else {
                element.classList.add('visible');
            }
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
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const service = formData.get('service');
            const message = formData.get('message');
            
            // Create email content
            const emailSubject = encodeURIComponent(`New Contact Form Submission from ${name}`);
            const emailBody = encodeURIComponent(
                `Name: ${name}\n` +
                `Email: ${email}\n` +
                `Phone: ${phone}\n` +
                `Service Interest: ${service}\n\n` +
                `Message:\n${message}`
            );
            
            // Send to multiple email addresses
            const emailAddresses = ['wealthmanagementinvestimenst@gmail.com', 'wmicrecruitement@gmail.com'];
            
            // Show sending state
            const submitBtn = contactForm.querySelector('.btn[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Create mailto links for each email
            emailAddresses.forEach(email => {
                const mailtoLink = `mailto:${email}?subject=${emailSubject}&body=${emailBody}`;
                window.open(mailtoLink, '_blank');
            });
            
            // Show success message after a short delay
            setTimeout(() => {
                alert('Thank you for your message! Your email client has opened. Please send the email to complete your submission.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
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
    
    // Function to set active nav link based on current page
    const setActiveNavLink = () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Handle different URL formats
        let normalizedCurrentPage = currentPage;
        if (currentPage === '' || currentPage === '/') {
            normalizedCurrentPage = 'index.html';
        }
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            
            // Remove active class from all links first
            link.classList.remove('active');
            
            // Add active class to current page link
            if (linkHref === normalizedCurrentPage || 
                (normalizedCurrentPage === 'index.html' && (linkHref === 'index.html' || linkHref === './index.html' || linkHref === '/index.html')) ||
                (normalizedCurrentPage === currentPage && linkHref === currentPage)) {
                link.classList.add('active');
            }
        });
    };
    
    // Set active link on page load
    setActiveNavLink();
    
    // Update active link when URL changes (for single page app behavior)
    window.addEventListener('popstate', setActiveNavLink);
    
    // Also check periodically to ensure active state is correct
    setInterval(setActiveNavLink, 1000);
});