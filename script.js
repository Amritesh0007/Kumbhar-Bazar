// Welcome Screen Functionality
function initWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Always show welcome screen on refresh (removed localStorage check)
    welcomeScreen.style.display = 'flex';
    
    // Simulate loading progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        // Update loading text based on progress
        const loadingText = document.querySelector('.loading-text');
        if (progress < 30) {
            loadingText.textContent = 'Loading Traditional Artistry...';
        } else if (progress < 60) {
            loadingText.textContent = 'Connecting with Master Potters...';
        } else if (progress < 90) {
            loadingText.textContent = 'Preparing Marketplace...';
        } else {
            loadingText.textContent = 'Welcome to KUMBHARBAJAR!';
        }
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            
            // Hide welcome screen after completion
            setTimeout(() => {
                welcomeScreen.classList.add('fade-out');
                
                // Remove welcome screen from DOM after animation
                setTimeout(() => {
                    welcomeScreen.style.display = 'none';
                    welcomeScreen.remove();
                }, 1000);
            }, 500);
        }
    }, 200);
    
    // Allow users to skip welcome screen by clicking
    welcomeScreen.addEventListener('click', function(e) {
        if (e.target === welcomeScreen || e.target.closest('.welcome-container')) {
            clearInterval(progressInterval);
            welcomeScreen.classList.add('fade-out');
            
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
                welcomeScreen.remove();
            }, 1000);
        }
    });
    
    // Add keyboard support (ESC to skip)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && welcomeScreen.style.display !== 'none') {
            clearInterval(progressInterval);
            welcomeScreen.classList.add('fade-out');
            
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
                welcomeScreen.remove();
            }, 1000);
        }
    });
}

// Theme System
function initThemeSystem() {
    const themeBtn = document.getElementById('themeBtn');
    const themeOptions = document.getElementById('themeOptions');
    
    // Check if theme elements exist
    if (!themeBtn || !themeOptions) {
        console.warn('Theme elements not found in DOM');
        return;
    }
    
    // Theme button click event
    themeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        themeOptions.classList.toggle('active');
    });
    
    // Theme option click events
    const themeOptionsList = document.querySelectorAll('.theme-option');
    themeOptionsList.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');
            applyTheme(theme);
            themeOptions.classList.remove('active');
        });
    });
    
    // Close theme options when clicking outside
    document.addEventListener('click', (e) => {
        if (!themeBtn.contains(e.target) && !themeOptions.contains(e.target)) {
            themeOptions.classList.remove('active');
        }
    });
    
    // Apply theme function
    function applyTheme(theme) {
        const root = document.documentElement;
        
        // Define theme colors
        const themes = {
            earth: {
                '--primary-color': '#8B4513',
                '--secondary-color': '#D2691E',
                '--accent-color': '#F4A460',
                '--terracotta': '#CD853F',
                '--cream': '#F5F5DC',
                '--warm-white': '#FFF8DC',
                '--dark-brown': '#654321',
                '--gold': '#DAA520'
            },
            ocean: {
                '--primary-color': '#006994',
                '--secondary-color': '#0080A3',
                '--accent-color': '#4FC3F7',
                '--terracotta': '#00838F',
                '--cream': '#E1F5FE',
                '--warm-white': '#F5FCFF',
                '--dark-brown': '#006064',
                '--gold': '#00B0FF'
            },
            sunset: {
                '--primary-color': '#FF6B35',
                '--secondary-color': '#F7931E',
                '--accent-color': '#FFD23F',
                '--terracotta': '#FF8C00',
                '--cream': '#FFF5E6',
                '--warm-white': '#FFFAF0',
                '--dark-brown': '#CC5500',
                '--gold': '#FFAA00'
            },
            forest: {
                '--primary-color': '#2E7D32',
                '--secondary-color': '#4CAF50',
                '--accent-color': '#81C784',
                '--terracotta': '#388E3C',
                '--cream': '#E8F5E9',
                '--warm-white': '#F1F8E9',
                '--dark-brown': '#1B5E20',
                '--gold': '#66BB6A'
            },
            royal: {
                '--primary-color': '#512DA8',
                '--secondary-color': '#7B1FA2',
                '--accent-color': '#E1BEE7',
                '--terracotta': '#7E57C2',
                '--cream': '#EDE7F6',
                '--warm-white': '#F3E5F5',
                '--dark-brown': '#4527A0',
                '--gold': '#AB47BC'
            }
        };
        
        // Apply theme colors
        if (themes[theme]) {
            Object.keys(themes[theme]).forEach(property => {
                root.style.setProperty(property, themes[theme][property]);
            });
            
            // Save theme preference to localStorage
            localStorage.setItem('selectedTheme', theme);
        }
    }
    
    // Load saved theme on page load
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }
}

// Initialize welcome screen when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initWelcomeScreen();
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll with 3D effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 3D Particle System
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 2px and 8px
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// 3D Tilt Effect for Pottery
function initTiltEffect() {
    const pots = document.querySelectorAll('[data-tilt]');
    
    pots.forEach(pot => {
        pot.addEventListener('mousemove', (e) => {
            const rect = pot.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            pot.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        pot.addEventListener('mouseleave', () => {
            pot.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// 3D Card Flip Effect
function initCardFlipEffect() {
    // Removed card flip effect to prevent flickering
    /*
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'perspective(1000px) rotateX(10deg) rotateY(5deg) translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
        });
        
        // Mouse move effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
        });
    });
    */
}

// 3D Button Effects
function initButtonEffects() {
    // Simplified button effects to prevent flickering
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px)';
            btn.style.boxShadow = '0 5px 15px rgba(139, 69, 19, 0.2)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
            btn.style.boxShadow = '';
        });
    });
}

// Potter Registration Form
const potterForm = document.getElementById('potterForm');
if (potterForm) {
    potterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.phone || !data.location || !data.experience) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Phone validation
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(data.phone.replace(/\D/g, ''))) {
            showNotification('Please enter a valid 10-digit phone number.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Registration submitted successfully! We will contact you soon.', 'success');
        this.reset();
    });
}

// Custom Order Form
const customForm = document.getElementById('customForm');
if (customForm) {
    customForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.productType || !data.customSize || !data.customDescription || 
            !data.customBudget || !data.customTimeline || !data.customContact) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Custom order request submitted! Our team will get back to you within 24 hours.', 'success');
        this.reset();
    });
}

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.contactName || !data.contactEmail || !data.contactSubject || !data.contactMessage) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.contactEmail)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully! We will reply to you soon.', 'success');
        this.reset();
    });
}

// Newsletter Subscription
const newsletterForm = document.querySelector('.newsletter');
if (newsletterForm) {
    const newsletterInput = newsletterForm.querySelector('input[type="email"]');
    const newsletterBtn = newsletterForm.querySelector('.btn');
    
    newsletterBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const email = newsletterInput.value.trim();
        
        if (!email) {
            showNotification('Please enter your email address.', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        newsletterInput.value = '';
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: auto;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Product card interactions
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Feature card interactions
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.product-card, .feature-card, .custom-step, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.pottery-showcase');
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add loading animation for forms
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Processing...';
    button.disabled = true;
    button.style.opacity = '0.7';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        button.style.opacity = '1';
    }, 2000);
}

// Add loading state to form submissions
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn) {
            addLoadingState(submitBtn);
        }
    });
});

// Interactive Form Enhancements
function initFormInteractions() {
    const formInputs = document.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 0 0 3px rgba(139, 69, 19, 0.2)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// 3D Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) rotateX(0deg)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.product-card, .feature-card, .custom-step, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px) rotateX(20deg)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Enhanced Parallax Effect
function initEnhancedParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.pottery-showcase');
        const particles = document.querySelectorAll('.particle');
        
        if (heroImage && scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px) rotateX(${scrolled * 0.1}deg)`;
        }
        
        // Parallax effect for particles
        particles.forEach((particle, index) => {
            const speed = 0.5 + (index % 3) * 0.2;
            particle.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Apply Diwali discount to cart
function applyDiwaliDiscount() {
    const cartTotal = document.getElementById('cartTotal');
    if (!cartTotal) return;
    
    const total = parseInt(cartTotal.textContent);
    
    // Apply 30% discount for orders above ₹2999
    if (total > 2999) {
        const discount = total * 0.3;
        const discountedTotal = total - discount;
        
        // Update cart total with discount
        cartTotal.textContent = Math.round(discountedTotal);
        
        // Show discount notification
        showNotification(`🎉 Diwali Offer Applied! ₹${Math.round(discount)} discount on your order. Total: ₹${Math.round(discountedTotal)}`, 'success');
    } else {
        // Show notification about the offer
        const remaining = 2999 - total;
        if (remaining > 0) {
            showNotification(`🛒 Spend ₹${remaining} more to get 30% off on your order!`, 'info');
        }
    }
}

// Magnetic Cursor Effect for Buttons
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.btn');
    
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px) scale(1)';
        });
    });
}

// Shopping Cart System
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentProductId = null;

// Product Data
const products = {
    1: {
        id: 1,
        name: "Traditional Clay Pots",
        description: "Handcrafted earthenware perfect for cooking and storage. Made from natural clay and fired in traditional kilns.",
        price: 599, // Average of ₹299-₹899
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=center"
    },
    2: {
        id: 2,
        name: "Decorative Vases",
        description: "Beautiful ceramic vases for home decoration. Each piece is uniquely crafted by skilled artisans.",
        price: 699, // Average of ₹499-₹1,299
        image: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=300&h=300&fit=crop&crop=center"
    },
    3: {
        id: 3,
        name: "Tea Cups & Sets",
        description: "Traditional terracotta cups for authentic tea experience. Perfect for your morning chai.",
        price: 324, // Average of ₹199-₹449
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=300&fit=crop&crop=center"
    },
    4: {
        id: 4,
        name: "Planters",
        description: "Eco-friendly clay planters for your garden. Natural clay helps regulate soil moisture.",
        price: 549, // Average of ₹399-₹999
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop&crop=center"
    },
    5: {
        id: 5,
        name: "Water Bottles",
        description: "Natural clay bottles for cool, pure water. Clay naturally cools and filters water.",
        price: 474, // Average of ₹349-₹799
        image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=300&fit=crop&crop=center"
    },
    6: {
        id: 6,
        name: "Lamps & Diyas",
        description: "Traditional clay lamps for festivals and decoration. Create warm, ambient lighting.",
        price: 249, // Average of ₹99-₹399
        image: "https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?w=300&h=300&fit=crop&crop=center"
    },
    7: {
        id: 7,
        name: "Clay Bowls",
        description: "Handmade clay bowls for serving and dining. Perfect for traditional meals and modern kitchens.",
        price: 299, // Average of ₹199-₹599
        image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=300&h=300&fit=crop&crop=center"
    },
    8: {
        id: 8,
        name: "Decorative Figurines",
        description: "Artistic clay figurines and sculptures. Beautiful handcrafted pieces for home decoration.",
        price: 949, // Average of ₹599-₹1,299
        image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=300&fit=crop&crop=center"
    },
    9: {
        id: 9,
        name: "Storage Jars",
        description: "Large clay jars for food and grain storage. Traditional earthenware with excellent preservation properties.",
        price: 1174, // Average of ₹799-₹1,549
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=300&fit=crop&crop=center"
    },
    10: {
        id: 10,
        name: "Terracotta Plates",
        description: "Traditional dining plates made from pure clay. Perfect for healthy and eco-friendly dining.",
        price: 224, // Average of ₹149-₹299
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop&crop=center"
    },
    11: {
        id: 11,
        name: "Clay Wind Chimes",
        description: "Musical clay wind chimes for peaceful ambiance. Handcrafted with melodious tones.",
        price: 424, // Average of ₹299-₹549
        image: "https://images.unsplash.com/photo-1597149960419-0d90ac2e3db4?w=300&h=300&fit=crop&crop=center"
    },
    12: {
        id: 12,
        name: "Earthen Coolers",
        description: "Natural clay water coolers for summer. Eco-friendly alternative to electric coolers.",
        price: 1799, // Average of ₹1299-₹2,299
        image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=300&h=300&fit=crop&crop=center"
    },
    13: {
        id: 13,
        name: "Kulhad Tea Cups",
        description: "Traditional Indian clay cups for chai. Authentic taste and eco-friendly disposable cups.",
        price: 149, // Average of ₹99-₹199
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=center"
    },
    14: {
        id: 14,
        name: "Matka Water Pots",
        description: "Traditional water storage earthen pots. Keep water naturally cool and fresh.",
        price: 599, // Average of ₹399-₹799
        image: "https://images.unsplash.com/photo-1630692131380-31b468e5bff8?w=300&h=300&fit=crop&crop=center"
    },
    15: {
        id: 15,
        name: "Clay Cooking Pots",
        description: "Traditional handi and earthen cookware. Perfect for slow cooking and enhancing flavors.",
        price: 899, // Average of ₹599-₹1,199
        image: "https://images.unsplash.com/photo-1586174158878-b1a6b7b5de4f?w=300&h=300&fit=crop&crop=center"
    }
};

// Diwali Offer Configuration
// Set to Diwali 2025 (October 26th) - actual date
// Try different date formats to ensure compatibility
let diwaliDate;
try {
    // Try ISO format first
    diwaliDate = new Date('2025-10-26T00:00:00');
    
    // Fallback to different format if invalid
    if (isNaN(diwaliDate.getTime())) {
        diwaliDate = new Date(2025, 9, 26, 0, 0, 0); // Month is 0-indexed
    }
    
    // Another fallback
    if (isNaN(diwaliDate.getTime())) {
        diwaliDate = new Date('October 26, 2025');
    }
} catch (error) {
    console.error('Date creation failed:', error);
    // Final fallback - 30 days from now
    diwaliDate = new Date();
    diwaliDate.setDate(diwaliDate.getDate() + 30);
}

// Debug: Log the target date and current time
console.log('Diwali Date:', diwaliDate);
console.log('Current Date:', new Date());
console.log('Time difference (ms):', diwaliDate.getTime() - new Date().getTime());
console.log('Days until Diwali:', Math.floor((diwaliDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));

// Initialize countdown
function initCountdown() {
    console.log('Initializing Diwali countdown...');
    
    const countdownElement = document.getElementById('diwaliCountdown');
    console.log('Countdown container found:', !!countdownElement);
    
    if (!countdownElement) {
        console.error('Diwali countdown container not found!');
        // Try again after a short delay
        setTimeout(() => {
            console.log('Retrying countdown initialization...');
            initCountdown();
        }, 1000);
        return;
    }

    // Test if individual elements exist
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    console.log('Individual timer elements:', {
        days: !!daysElement,
        hours: !!hoursElement,
        minutes: !!minutesElement,
        seconds: !!secondsElement
    });

    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        console.error('Some countdown elements are missing!');
        console.log('Available elements in diwaliCountdown:', countdownElement.innerHTML);
        return;
    }

    // Initialize the countdown immediately
    updateCountdown();
    
    // Set up interval to update every second
    const intervalId = setInterval(updateCountdown, 1000);
    console.log('Countdown interval started with ID:', intervalId);
}

// Update countdown timer
function updateCountdown() {
    try {
        const now = new Date().getTime();
        const distance = diwaliDate.getTime() - now;

        console.log('Update countdown called - distance:', distance);

        if (distance < 0) {
            console.log('Countdown expired, hiding offer section');
            const diwaliOfferSection = document.getElementById('diwaliOffer');
            if (diwaliOfferSection) {
                diwaliOfferSection.style.display = 'none';
            }
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Debug: Check if elements exist
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');

        console.log('Timer elements found:', {
            days: !!daysElement,
            hours: !!hoursElement,
            minutes: !!minutesElement,
            seconds: !!secondsElement
        });

        console.log('Calculated time:', { days, hours, minutes, seconds });

        // Update elements with safety checks
        if (daysElement) {
            daysElement.textContent = days.toString().padStart(2, '0');
            console.log('Updated days element:', daysElement.textContent);
        } else {
            console.error('Days element not found!');
        }
        
        if (hoursElement) {
            hoursElement.textContent = hours.toString().padStart(2, '0');
        } else {
            console.error('Hours element not found!');
        }
        
        if (minutesElement) {
            minutesElement.textContent = minutes.toString().padStart(2, '0');
        } else {
            console.error('Minutes element not found!');
        }
        
        if (secondsElement) {
            secondsElement.textContent = seconds.toString().padStart(2, '0');
        } else {
            console.error('Seconds element not found!');
        }
        
        // Force a repaint
        if (daysElement) {
            daysElement.style.opacity = '0.99';
            setTimeout(() => {
                daysElement.style.opacity = '1';
            }, 10);
        }
        
    } catch (error) {
        console.error('Error in updateCountdown:', error);
    }
}

// Cart Functions
function addToCart(productId) {
    console.log('addToCart function called with productId:', productId);
    console.log('Products object:', products);
    console.log('Product for ID:', products[productId]);
    
    const product = products[productId];
    if (!product) {
        console.error('Product not found for ID:', productId);
        return;
    }
    
    console.log('Product found:', product);

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
        console.log('Increased quantity of existing item. New quantity:', existingItem.quantity);
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
        console.log('Added new item to cart');
    }
    
    updateCartDisplay();
    showNotification(`${product.name} added to cart!`, 'success');
    applyDiwaliDiscount();
}

function removeFromCart(productId) {
    console.log('Removing product from cart. Product ID:', productId);
    cart = cart.filter(item => item.id !== productId);
    console.log('Cart after removal:', cart);
    updateCartDisplay();
}

//dashboard 
// ...existing code...

// --- Dashboard & Order Saving Logic ---

/**
 * Save the current cart as an order and clear the cart.
 * Redirect to dashboard.html after payment.
 */
function saveOrderAndRedirect() {
    if (!cart || cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }

    // Prepare order data
    const order = {
        date: new Date().toLocaleString(),
        items: cart.map(item => ({
            name: item.name,
            qty: item.quantity,
            price: item.price
        })),
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };

    // Save to localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();

    // Redirect to dashboard
    window.location.href = 'dashboard.html';
}

// --- Update Cart Modal Checkout Button ---

function initCartModal() {
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const cartClose = document.getElementById('cartClose');
    const cartItems = document.getElementById('cartItems');

    // ...existing code...

    // Clear cart button
    const clearCartBtn = document.getElementById('clearCart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            cart = [];
            updateCartDisplay();
        });
    }

    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                // Simulate payment process
                if (confirm('Proceed to payment?')) {
                    saveOrderAndRedirect();
                }
            } else {
                showNotification('Your cart is empty!', 'error');
            }
        });
    }
}

// ...existing code...

// Chatbot Functionality
function initChatbot() {
    const chatbotButton = document.getElementById('chatbotButton');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const closeChatbot = document.getElementById('closeChatbot');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const sendButton = document.getElementById('sendButton');
    
    // Toggle chat window visibility
    function toggleChatbot() {
        chatbotWindow.classList.toggle('active');
        if (chatbotWindow.classList.contains('active')) {
            // Focus input when opening
            chatbotInput.focus();
        }
    }
    
    // Close chatbot
    function closeChatbotWindow() {
        chatbotWindow.classList.remove('active');
    }
    
    // Add a message to the chat
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        messageDiv.textContent = message;
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Generate bot response based on user message
    function getBotResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return 'Hello! Welcome to KUMBHARBAJAR. How can I help you today?';
        } else if (lowerMessage.includes('pottery') || lowerMessage.includes('clay') || lowerMessage.includes('ceramic')) {
            return 'We offer a wide variety of handmade pottery items including traditional clay pots, decorative vases, tea cups, planters, and more. All our products are crafted by skilled artisans using traditional techniques.';
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('expensive')) {
            return 'Our prices vary depending on the item and its size. Traditional clay pots start at ₹599, decorative vases at ₹699, and tea cups at ₹324. We offer fair pricing directly from the artisans.';
        } else if (lowerMessage.includes('delivery') || lowerMessage.includes('shipping') || lowerMessage.includes('deliver')) {
            return 'We offer nationwide delivery with secure packaging. Delivery typically takes 3-7 business days depending on your location. We provide tracking information once your order ships.';
        } else if (lowerMessage.includes('custom') || lowerMessage.includes('special') || lowerMessage.includes('unique')) {
            return 'Yes! We offer custom pottery orders. You can request personalized pieces with specific sizes, colors, and designs. Visit our Custom Orders section to submit your request.';
        } else if (lowerMessage.includes('artisan') || lowerMessage.includes('potter') || lowerMessage.includes('maker')) {
            return 'We connect customers directly with traditional potters across India. If you\'re an artisan looking to join our platform, visit our Join as Potter section to register.';
        } else if (lowerMessage.includes('thank')) {
            return 'You\'re welcome! Is there anything else I can help you with?';
        } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('exit')) {
            return 'Thank you for chatting with us! Have a wonderful day.';
        } else {
            return 'I\'m here to help with questions about our pottery products, ordering process, delivery, or becoming an artisan. Could you please specify what you\'d like to know?';
        }
    }
    
    // Send message
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, true);
            
            // Clear input
            chatbotInput.value = '';
            
            // Simulate typing delay
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                addMessage(botResponse, false);
            }, 500 + Math.random() * 1000); // Random delay between 0.5-1.5 seconds
        }
    }
    
    // Event listeners
    if (chatbotButton) {
        chatbotButton.addEventListener('click', toggleChatbot);
    }
    
    if (closeChatbot) {
        closeChatbot.addEventListener('click', closeChatbotWindow);
    }
    
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }
    
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Close chatbot when clicking outside
    document.addEventListener('click', (e) => {
        if (!chatbotWindow.contains(e.target) && !chatbotButton.contains(e.target) && chatbotWindow.classList.contains('active')) {
            closeChatbotWindow();
        }
    });
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initWelcomeScreen();
    initThemeSystem();
    initChatbot();
});

function updateQuantity(productId, change) {
    console.log('Updating quantity. Product ID:', productId, 'Change:', change);
    const item = cart.find(item => item.id === productId);
    if (!item) {
        console.error('Item not found in cart for ID:', productId);
        return;
    }

    item.quantity += change;
    console.log('New quantity:', item.quantity);
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    console.log('updateCartDisplay function called');
    console.log('Current cart contents:', cart);
    
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotal = document.getElementById('cartTotal');
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    console.log('Total items in cart:', totalItems);
    
    if (cartCount) {
        cartCount.textContent = totalItems;
        console.log('Updated cart count display');
    } else {
        console.error('Cart count element not found');
    }
    
    // Update cart items
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <a href="#products" class="btn btn-primary">Start Shopping</a>
                </div>
            `;
            console.log('Cart is empty, showing empty message');
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">₹${item.price}</div>
                    </div>
                    <div class="cart-item-actions">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})" title="Remove item">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
            console.log('Updated cart items display');
        }
    } else {
        console.error('Cart items element not found');
    }
    
    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        console.log('Cart total:', total);
        cartTotal.textContent = total;
    } else {
        console.error('Cart total element not found');
    }
    
    if (cartFooter) {
        cartFooter.style.display = cart.length > 0 ? 'block' : 'none';
        console.log('Updated cart footer display');
    } else {
        console.error('Cart footer element not found');
    }
}

// Add to Cart Buttons
function initAddToCartButtons() {
    console.log('Initializing Add to Cart Buttons...');
    
    // Wait a bit for DOM to be fully ready
    setTimeout(() => {
        const addToCartBtns = document.querySelectorAll('.add-to-cart');
        console.log('Found', addToCartBtns.length, 'add-to-cart buttons');
        
        if (addToCartBtns.length === 0) {
            console.warn('No add to cart buttons found');
            return;
        }
        
        // Remove any existing event listeners to prevent duplicates
        addToCartBtns.forEach(btn => {
            // Create a new button with the same properties
            const newBtn = document.createElement('button');
            newBtn.className = btn.className;
            newBtn.setAttribute('data-product-id', btn.getAttribute('data-product-id'));
            newBtn.textContent = btn.textContent;
            
            // Replace the old button with the new one
            btn.parentNode.replaceChild(newBtn, btn);
            
            // Add click event listener to the new button
            newBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const productId = parseInt(this.getAttribute('data-product-id'));
                console.log('Add to cart button clicked for product ID:', productId);
                
                if (productId && products[productId]) {
                    addToCart(productId);
                } else {
                    console.error('Invalid product ID or product not found:', productId);
                    showNotification('Error adding product to cart', 'error');
                }
            });
        });
    }, 100);
}

// Product Modal System
function initProductModal() {
    console.log('Initializing Product Modal System...');
    const productModal = document.getElementById('productModal');
    const productClose = document.getElementById('productClose');
    const modalProductName = document.getElementById('modalProductName');
    const modalProductImage = document.getElementById('modalProductImage');
    const modalProductDescription = document.getElementById('modalProductDescription');
    const modalProductPrice = document.getElementById('modalProductPrice');
    const modalAddToCart = document.getElementById('modalAddToCart');
    
    // Check if all required elements exist
    if (!productModal || !productClose || !modalProductName || !modalProductImage || 
        !modalProductDescription || !modalProductPrice || !modalAddToCart) {
        console.error('Product modal elements not found in DOM');
        return;
    }
    
    // Handle view details buttons
    setTimeout(() => {
        const viewDetailBtns = document.querySelectorAll('.view-details');
        console.log('Found', viewDetailBtns.length, 'view-details buttons');
        
        viewDetailBtns.forEach(btn => {
            // Create a new button with the same properties
            const newBtn = document.createElement('button');
            newBtn.className = btn.className;
            newBtn.setAttribute('data-product-id', btn.getAttribute('data-product-id'));
            newBtn.textContent = btn.textContent;
            
            // Replace the old button with the new one
            btn.parentNode.replaceChild(newBtn, btn);
            
            // Add click event listener to the new button
            newBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const productId = parseInt(this.getAttribute('data-product-id'));
                console.log('View detail button clicked for product ID:', productId);
                const product = products[productId];
                
                if (product) {
                    // Find the product card to get the image source
                    const productCard = document.querySelector(`.product-card[data-product-id="${productId}"]`);
                    let productImageSrc = '';
                    
                    if (productCard) {
                        const productImage = productCard.querySelector('.product-image img');
                        if (productImage) {
                            productImageSrc = productImage.src;
                        }
                    }
                    
                    currentProductId = productId;
                    modalProductName.textContent = product.name;
                    modalProductImage.src = productImageSrc || product.image;
                    modalProductImage.alt = product.name;
                    modalProductDescription.textContent = product.description;
                    modalProductPrice.textContent = product.price;
                    
                    productModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                } else {
                    console.error('Product not found for ID:', productId);
                    showNotification('Product not found', 'error');
                }
            });
        });
    }, 100);
    
    // Handle close button for product modal
    setTimeout(() => {
        const newProductClose = document.createElement('button');
        newProductClose.id = 'productClose';
        newProductClose.className = productClose.className;
        newProductClose.innerHTML = productClose.innerHTML;
        
        productClose.parentNode.replaceChild(newProductClose, productClose);
        
        newProductClose.addEventListener('click', () => {
            productModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }, 100);
    
    // Close on backdrop click
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Handle add to cart from modal
    setTimeout(() => {
        const newModalAddToCart = document.createElement('button');
        newModalAddToCart.id = 'modalAddToCart';
        newModalAddToCart.className = modalAddToCart.className;
        newModalAddToCart.textContent = modalAddToCart.textContent;
        
        modalAddToCart.parentNode.replaceChild(newModalAddToCart, modalAddToCart);
        
        newModalAddToCart.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Add to cart from modal clicked. Current product ID:', currentProductId);
            
            if (currentProductId && products[currentProductId]) {
                addToCart(currentProductId);
                productModal.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                console.error('Invalid product ID or product not found in modal:', currentProductId);
                showNotification('Error adding product to cart', 'error');
            }
        });
    }, 100);
}

// Cart Modal System
function initCartModal() {
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const cartClose = document.getElementById('cartClose');
    const cartItems = document.getElementById('cartItems');
    
    // Check if cart elements exist
    if (!cartBtn || !cartModal || !cartClose) {
        console.warn('Cart modal elements not found in DOM');
        return;
    }
    
    // Open cart modal
    cartBtn.addEventListener('click', () => {
        cartModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close cart modal
    cartClose.addEventListener('click', () => {
        cartModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close on backdrop click
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Clear cart button
    const clearCartBtn = document.getElementById('clearCart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            cart = [];
            updateCartDisplay();
        });
    }
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                // Save cart to localStorage before redirecting
                localStorage.setItem('cart', JSON.stringify(cart));
                // Redirect to payment page
                window.location.href = 'payment.html';
            } else {
                showNotification('Your cart is empty!', 'error');
            }
        });
    }
}

// Initialize all systems when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing systems...');
    
    initWelcomeScreen();
    initThemeSystem();
    initCartModal();
    
    // Initialize product modal and add to cart buttons
    console.log('Initializing product modal and add to cart buttons...');
    initProductModal();
    initAddToCartButtons();
    
    // Initialize video previews
    console.log('Initializing video previews...');
    initVideoPreviews();
    
    // Initialize Diwali countdown
    setTimeout(() => {
        console.log('Initializing Diwali countdown...');
        initCountdown();
    }, 300);
    
    initMagneticButtons();
    initCustomCursor();
});

// Initialize all 3D effects after a delay to ensure DOM is ready
setTimeout(() => {
    createParticles();
    initTiltEffect();
    initCardFlipEffect();
    initButtonEffects();
    initFormInteractions();
    initScrollAnimations();
    initEnhancedParallax();
    
    // Initialize cart display
    updateCartDisplay();
}, 100);

// Backup initialization using window.onload
window.addEventListener('load', function() {
    console.log('Window fully loaded - backup countdown initialization...');
    
    // Always try to reinitialize countdown to ensure it works
    setTimeout(() => {
        console.log('Running backup countdown initialization...');
        
        // Force reinitialize the countdown
        const countdownContainer = document.getElementById('diwaliCountdown');
        if (countdownContainer) {
            console.log('Found countdown container, forcing update...');
            
            // Manually trigger an update
            updateCountdown();
            
            // Start the interval again as a backup
            setInterval(updateCountdown, 1000);
        }
    }, 2000);
});

// Additional manual trigger for testing
setTimeout(() => {
    console.log('Manual countdown trigger after 3 seconds...');
    if (typeof updateCountdown === 'function') {
        updateCountdown();
        
        // Force update the display with current time
        const now = new Date();
        const currentSeconds = now.getSeconds();
        const currentMinutes = now.getMinutes();
        const currentHours = now.getHours();
        
        console.log('Current time for testing:', {
            hours: currentHours,
            minutes: currentMinutes, 
            seconds: currentSeconds
        });
        
        // Test by setting the seconds element to current seconds to verify it's working
        const secondsElement = document.getElementById('seconds');
        if (secondsElement) {
            console.log('Testing: Setting seconds to current seconds:', currentSeconds);
            secondsElement.textContent = currentSeconds.toString().padStart(2, '0');
            
            // Change it back after 2 seconds to show it's dynamic
            setTimeout(() => {
                console.log('Reverting to countdown...');
                updateCountdown();
            }, 2000);
        }
    }
}, 3000);

// Add fade-in animation to hero content
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
    setTimeout(() => {
        heroContent.style.opacity = '1';
    }, 500);
}

// Add floating animation to pottery showcase
const pots = document.querySelectorAll('.pot');
pots.forEach((pot, index) => {
    pot.style.animationDelay = `${index * 0.5}s`;
});

// Add staggered animation to feature cards
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

// Add hover effects to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add click ripple effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add magnetic cursor effect for buttons
initMagneticButtons();

// Initialize custom cursor
initCustomCursor();

// Video Preview Functionality
function initVideoPreviews() {
    console.log('Initializing video previews...');
    
    // Add click event to video containers
    const videoContainers = document.querySelectorAll('.video-container');
    
    videoContainers.forEach(container => {
        // Initially hide the iframe
        const iframe = container.querySelector('iframe');
        if (iframe) {
            // Store the src in data attribute and remove src to prevent loading
            const src = iframe.src || iframe.getAttribute('data-src');
            if (src) {
                iframe.setAttribute('data-src', src);
                iframe.removeAttribute('src');
            }
        }
        
        container.addEventListener('click', function() {
            // Add active class to container
            this.classList.add('active');
            
            // Get the iframe
            const iframe = this.querySelector('iframe');
            
            // If iframe doesn't have src but has data-src, set it to load the video
            if (iframe && !iframe.src) {
                const src = iframe.getAttribute('data-src');
                if (src) {
                    iframe.src = src;
                }
            }
        });
    });
}
