// ================================
// CHIMES CRANE HIRE - MAIN JS
// ================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ================================
    // SCROLL ANIMATIONS
    // ================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in');
    animatedElements.forEach(el => observer.observe(el));

    // ================================
    // NAVBAR SCROLL EFFECTS
    // ================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ================================
    // MOBILE MENU TOGGLE
    // ================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    }

    // ================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ================================
    // FORM VALIDATION & SUBMISSION
    // ================================
    const contactForm = document.getElementById('contactForm');
    const quoteForm = document.getElementById('quoteForm');

    // Contact Form Handler
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };

            // Basic validation
            if (!formData.name || !formData.email || !formData.message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('.form-submit');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<span class="loading"></span> Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Show success message
                showSuccessMessage('Thank you! Your message has been sent. We\'ll get back to you soon.');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Quote Form Handler
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                company: document.getElementById('company').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                craneType: document.getElementById('craneType').value,
                projectDate: document.getElementById('projectDate').value,
                location: document.getElementById('location').value,
                details: document.getElementById('details').value
            };

            // Validation
            if (!formData.name || !formData.phone || !formData.craneType) {
                alert('Please fill in all required fields.');
                return;
            }

            // Show loading state
            const submitBtn = quoteForm.querySelector('.form-submit');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<span class="loading"></span> Submitting...';
            submitBtn.disabled = true;

            // Simulate submission
            setTimeout(() => {
                showSuccessMessage('Quote request received! Our team will contact you within 24 hours.');
                quoteForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Success message display function
    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message show';
        successDiv.textContent = message;
        
        const form = contactForm || quoteForm;
        form.parentElement.insertBefore(successDiv, form);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    // ================================
    // PROJECT GALLERY FILTER
    // ================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ================================
    // PHONE NUMBER FORMATTING
    // ================================
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // South African phone number format
            if (value.length > 3 && value.length <= 6) {
                value = value.slice(0, 3) + ' ' + value.slice(3);
            } else if (value.length > 6) {
                value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 10);
            }
            
            e.target.value = value;
        });
    });

    // ================================
    // DATE PICKER MIN DATE
    // ================================
    const dateInputs = document.querySelectorAll('input[type="date"]');
    if (dateInputs.length > 0) {
        const today = new Date().toISOString().split('T')[0];
        dateInputs.forEach(input => {
            input.setAttribute('min', today);
        });
    }

    // ================================
    // LAZY LOADING IMAGES
    // ================================
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ================================
    // BACK TO TOP BUTTON
    // ================================
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ================================
    // WHATSAPP MESSAGE PREFILL
    // ================================
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const currentPage = document.title;
            const message = `Hi Chimes! I'm interested in your crane services. I'm viewing: ${currentPage}`;
            const encodedMessage = encodeURIComponent(message);
            
            const href = this.getAttribute('href');
            if (!href.includes('?text=')) {
                this.setAttribute('href', `${href}?text=${encodedMessage}`);
            }
        });
    });

    // ================================
    // CRANE CARD INTERACTIONS
    // ================================
    const craneCards = document.querySelectorAll('.crane-card');
    craneCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ================================
    // GALLERY LIGHTBOX (Simple Implementation)
    // ================================
    const galleryImages = document.querySelectorAll('.gallery-item');
    galleryImages.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img')?.src;
            const title = this.querySelector('h4')?.textContent;
            
            if (imgSrc) {
                openLightbox(imgSrc, title);
            }
        });
    });

    function openLightbox(src, title) {
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${src}" alt="${title}">
                <p class="lightbox-title">${title}</p>
            </div>
        `;
        
        // Add styles
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            cursor: pointer;
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Close lightbox
        lightbox.addEventListener('click', function() {
            this.remove();
            document.body.style.overflow = '';
        });
        
        // Prevent closing when clicking on image
        const lightboxContent = lightbox.querySelector('.lightbox-content');
        lightboxContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // ================================
    // ANALYTICS TRACKING (Placeholder)
    // ================================
    function trackEvent(category, action, label) {
        // Implement your analytics tracking here
        // Example: gtag('event', action, { 'event_category': category, 'event_label': label });
        console.log('Event tracked:', category, action, label);
    }

    // Track CTA clicks
    const ctaButtons = document.querySelectorAll('.primary-btn, .secondary-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const text = this.textContent.trim();
            trackEvent('CTA', 'Click', text);
        });
    });

    // Track phone clicks
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('Contact', 'Phone Click', this.getAttribute('href'));
        });
    });

    // ================================
    // PERFORMANCE OPTIMIZATION
    // ================================
    // Debounce function for scroll events
    function debounce(func, wait) {
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

    // Apply debounce to scroll-heavy operations
    const debouncedScroll = debounce(() => {
        // Any expensive scroll operations here
    }, 100);

    window.addEventListener('scroll', debouncedScroll);

    // ================================
    // CONSOLE MESSAGE
    // ================================
    console.log('%c🏗️ Chimes Crane Hire', 'font-size: 24px; font-weight: bold; color: #22c55e;');
    console.log('%cWebsite by Modern Web Design 2025', 'font-size: 12px; color: #10b981;');
    console.log('%cGauteng\'s Premier Crane Hire | Since 2003', 'font-size: 14px; color: #a1a1a6;');
    
});

// ================================
// UTILITY FUNCTIONS
// ================================

// Format phone number for display
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return match[1] + ' ' + match[2] + ' ' + match[3];
    }
    return phoneNumber;
}

// Validate email
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validate South African phone number
function isValidSAPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10 && (cleaned.startsWith('0') || cleaned.startsWith('27'));
}

// Export functions for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatPhoneNumber,
        isValidEmail,
        isValidSAPhone
    };
}