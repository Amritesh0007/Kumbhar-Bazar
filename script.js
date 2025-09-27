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
}

// 3D Button Effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'perspective(1000px) rotateX(5deg) translateY(-3px) scale(1.05)';
            btn.style.boxShadow = '0 10px 25px rgba(139, 69, 19, 0.3)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0px) scale(1)';
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
let cart = [];
let currentProductId = null;

// Product Data
const products = {
    1: {
        id: 1,
        name: "Traditional Clay Pots",
        description: "Handcrafted earthenware perfect for cooking and storage. Made from natural clay and fired in traditional kilns.",
        price: 599,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=center"
    },
    2: {
        id: 2,
        name: "Decorative Vases",
        description: "Beautiful ceramic vases for home decoration. Each piece is uniquely crafted by skilled artisans.",
        price: 899,
        image: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=300&h=300&fit=crop&crop=center"
    },
    3: {
        id: 3,
        name: "Tea Cups & Sets",
        description: "Traditional terracotta cups for authentic tea experience. Perfect for your morning chai.",
        price: 449,
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=300&fit=crop&crop=center"
    },
    4: {
        id: 4,
        name: "Planters",
        description: "Eco-friendly clay planters for your garden. Natural clay helps regulate soil moisture.",
        price: 699,
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop&crop=center"
    },
    5: {
        id: 5,
        name: "Water Bottles",
        description: "Natural clay bottles for cool, pure water. Clay naturally cools and filters water.",
        price: 574,
        image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=300&fit=crop&crop=center"
    },
    6: {
        id: 6,
        name: "Lamps & Diyas",
        description: "Traditional clay lamps for festivals and decoration. Create warm, ambient lighting.",
        price: 249,
        image: "https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?w=300&h=300&fit=crop&crop=center"
    },
    7: {
        id: 7,
        name: "Clay Bowls",
        description: "Handmade clay bowls for serving and dining. Perfect for traditional meals and modern kitchens.",
        price: 399,
        image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=300&h=300&fit=crop&crop=center"
    },
    8: {
        id: 8,
        name: "Decorative Figurines",
        description: "Artistic clay figurines and sculptures. Beautiful handcrafted pieces for home decoration.",
        price: 1299,
        image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=300&fit=crop&crop=center"
    },
    9: {
        id: 9,
        name: "Storage Jars",
        description: "Large clay jars for food and grain storage. Traditional earthenware with excellent preservation properties.",
        price: 1549,
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=300&fit=crop&crop=center"
    },
    10: {
        id: 10,
        name: "Terracotta Plates",
        description: "Traditional dining plates made from pure clay. Perfect for healthy and eco-friendly dining.",
        price: 299,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop&crop=center"
    },
    11: {
        id: 11,
        name: "Clay Wind Chimes",
        description: "Musical clay wind chimes for peaceful ambiance. Handcrafted with melodious tones.",
        price: 549,
        image: "https://images.unsplash.com/photo-1597149960419-0d90ac2e3db4?w=300&h=300&fit=crop&crop=center"
    },
    12: {
        id: 12,
        name: "Earthen Coolers",
        description: "Natural clay water coolers for summer. Eco-friendly alternative to electric coolers.",
        price: 2399,
        image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=300&h=300&fit=crop&crop=center"
    },
    13: {
        id: 13,
        name: "Kulhad Tea Cups",
        description: "Traditional Indian clay cups for chai. Authentic taste and eco-friendly disposable cups.",
        price: 199,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=center"
    },
    14: {
        id: 14,
        name: "Matka Water Pots",
        description: "Traditional water storage earthen pots. Keep water naturally cool and fresh.",
        price: 799,
        image: "https://images.unsplash.com/photo-1630692131380-31b468e5bff8?w=300&h=300&fit=crop&crop=center"
    },
    15: {
        id: 15,
        name: "Clay Cooking Pots",
        description: "Traditional handi and earthen cookware. Perfect for slow cooking and enhancing flavors.",
        price: 1199,
        image: "https://images.unsplash.com/photo-1586174158878-b1a6b7b5de4f?w=300&h=300&fit=crop&crop=center"
    }
};

// Diwali Offer Configuration
const diwaliDate = new Date('2025-10-26T00:00:00');

// Initialize countdown
function initCountdown() {
    const countdownElement = document.getElementById('diwaliCountdown');
    if (!countdownElement) return;

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Update countdown timer
function updateCountdown() {
    const now = new Date().getTime();
    const distance = diwaliDate.getTime() - now;

    if (distance < 0) {
        document.getElementById('diwaliOffer').style.display = 'none';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Cart Functions
function addToCart(productId) {
    const product = products[productId];
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showNotification(`${product.name} added to cart!`, 'success');
    applyDiwaliDiscount();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotal = document.getElementById('cartTotal');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <a href="#products" class="btn btn-primary">Start Shopping</a>
            </div>
        `;
        cartFooter.style.display = 'none';
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
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total;
        cartFooter.style.display = 'block';
    }
}

// Theme System
function initThemeSystem() {
    const themeBtn = document.getElementById('themeBtn');
    const themeOptions = document.getElementById('themeOptions');
    const themeOptionElements = document.querySelectorAll('.theme-option');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('kumbharbajar-theme') || 'earth';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Initialize Diwali countdown
    initCountdown();
    
    // Theme button click
    themeBtn.addEventListener('click', () => {
        themeOptions.classList.toggle('active');
    });
    
    // Theme option selection
    themeOptionElements.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('kumbharbajar-theme', theme);
            themeOptions.classList.remove('active');
            showNotification(`Theme changed to ${theme}!`, 'success');
        });
    });
    
    // Close theme options when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.theme-switcher')) {
            themeOptions.classList.remove('active');
        }
    });
}

// Cart Modal System
function initCartModal() {
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const cartClose = document.getElementById('cartClose');
    const clearCart = document.getElementById('clearCart');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
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
    
    // Clear cart
    clearCart.addEventListener('click', () => {
        cart = [];
        updateCartDisplay();
        showNotification('Cart cleared!', 'success');
    });
    
    // Checkout
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Your cart is empty!', 'error');
            return;
        }
        showNotification('Checkout functionality coming soon!', 'success');
        cartModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Product Modal System
function initProductModal() {
    const productModal = document.getElementById('productModal');
    const productClose = document.getElementById('productClose');
    const viewDetailBtns = document.querySelectorAll('.view-details');
    const modalProductName = document.getElementById('modalProductName');
    const modalProductImage = document.getElementById('modalProductImage');
    const modalProductDescription = document.getElementById('modalProductDescription');
    const modalProductPrice = document.getElementById('modalProductPrice');
    const modalAddToCart = document.getElementById('modalAddToCart');
    
    // View details buttons
    viewDetailBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.getAttribute('data-product-id'));
            const product = products[productId];
            
            if (product) {
                currentProductId = productId;
                modalProductName.textContent = product.name;
                modalProductImage.src = product.image;
                modalProductImage.alt = product.name;
                modalProductDescription.textContent = product.description;
                modalProductPrice.textContent = product.price;
                
                productModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close product modal
    productClose.addEventListener('click', () => {
        productModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close on backdrop click
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Add to cart from modal
    modalAddToCart.addEventListener('click', () => {
        if (currentProductId) {
            addToCart(currentProductId);
            productModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Add to Cart Buttons
function initAddToCartButtons() {
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.getAttribute('data-product-id'));
            addToCart(productId);
        });
    });
}

// Cursor Reactive Effects System
let mouseX = 0, mouseY = 0;
let isMouseMoving = false;
let mouseTimeout;

// Custom Cursor
function initCustomCursor() {
    const cursor = document.getElementById('customCursor');
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        
        isMouseMoving = true;
        clearTimeout(mouseTimeout);
        
        mouseTimeout = setTimeout(() => {
            isMouseMoving = false;
        }, 100);
    });
    
    // Cursor interactions with elements
    const interactiveElements = document.querySelectorAll('a, button, .product-card, .feature-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'radial-gradient(circle, var(--primary-color), var(--gold))';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'radial-gradient(circle, var(--gold), var(--primary-color))';
        });
    });
}

// Cursor Trail Effect
function initCursorTrail() {
    const trail = document.getElementById('cursorTrail');
    let trailElements = [];
    
    document.addEventListener('mousemove', (e) => {
        const trailElement = document.createElement('div');
        trailElement.className = 'cursor-trail';
        trailElement.style.left = e.clientX + 'px';
        trailElement.style.top = e.clientY + 'px';
        trailElement.style.opacity = '1';
        
        trail.appendChild(trailElement);
        trailElements.push(trailElement);
        
        // Remove old trail elements
        if (trailElements.length > 10) {
            const oldElement = trailElements.shift();
            oldElement.remove();
        }
        
        // Fade out trail elements
        setTimeout(() => {
            trailElement.style.opacity = '0';
            setTimeout(() => {
                trailElement.remove();
                const index = trailElements.indexOf(trailElement);
                if (index > -1) {
                    trailElements.splice(index, 1);
                }
            }, 1000);
        }, 500);
    });
}

// Floating Pottery Elements
function initFloatingPottery() {
    const floatingPottery = document.getElementById('floatingPottery');
    const potCount = 15;
    
    for (let i = 0; i < potCount; i++) {
        const pot = document.createElement('div');
        pot.className = 'floating-pot';
        pot.style.left = Math.random() * 100 + '%';
        pot.style.top = Math.random() * 100 + '%';
        pot.style.animationDelay = Math.random() * 10 + 's';
        pot.style.animationDuration = (Math.random() * 5 + 5) + 's';
        
        floatingPottery.appendChild(pot);
    }
    
    // Make pots react to cursor
    document.addEventListener('mousemove', (e) => {
        const pots = document.querySelectorAll('.floating-pot');
        const cursorX = e.clientX;
        const cursorY = e.clientY;
        
        pots.forEach((pot, index) => {
            const rect = pot.getBoundingClientRect();
            const potX = rect.left + rect.width / 2;
            const potY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(cursorX - potX, 2) + Math.pow(cursorY - potY, 2)
            );
            
            if (distance < 150) {
                const angle = Math.atan2(potY - cursorY, potX - cursorX);
                const force = (150 - distance) / 150;
                
                pot.style.transform = `translate(${Math.cos(angle) * force * 20}px, ${Math.sin(angle) * force * 20}px) scale(${1 + force * 0.3})`;
                pot.style.opacity = 0.3 + force * 0.4;
            } else {
                pot.style.transform = '';
                pot.style.opacity = 0.3;
            }
        });
    });
}

// Dynamic Particles
function initDynamicParticles() {
    const dynamicParticles = document.getElementById('dynamicParticles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'dynamic-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        dynamicParticles.appendChild(particle);
    }
    
    // Make particles react to cursor
    document.addEventListener('mousemove', (e) => {
        const particles = document.querySelectorAll('.dynamic-particle');
        const cursorX = e.clientX;
        const cursorY = e.clientY;
        
        particles.forEach(particle => {
            const rect = particle.getBoundingClientRect();
            const particleX = rect.left + rect.width / 2;
            const particleY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(cursorX - particleX, 2) + Math.pow(cursorY - particleY, 2)
            );
            
            if (distance < 100) {
                const angle = Math.atan2(particleY - cursorY, particleX - cursorX);
                const force = (100 - distance) / 100;
                
                particle.style.transform = `translate(${Math.cos(angle) * force * 30}px, ${Math.sin(angle) * force * 30}px) scale(${1 + force * 0.5})`;
                particle.style.opacity = 0.6 + force * 0.4;
            }
        });
    });
}

// Magnetic Field Effect
function initMagneticField() {
    const magneticField = document.getElementById('magneticField');
    
    document.addEventListener('mousemove', (e) => {
        magneticField.style.left = e.clientX - 100 + 'px';
        magneticField.style.top = e.clientY - 100 + 'px';
        
        // Activate magnetic field near interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .product-card, .feature-card');
        let nearElement = false;
        
        interactiveElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const distance = Math.sqrt(
                Math.pow(e.clientX - (rect.left + rect.width / 2), 2) +
                Math.pow(e.clientY - (rect.top + rect.height / 2), 2)
            );
            
            if (distance < 150) {
                nearElement = true;
            }
        });
        
        if (nearElement) {
            magneticField.classList.add('active');
        } else {
            magneticField.classList.remove('active');
        }
    });
}

// Interactive Grid
function initInteractiveGrid() {
    const grid = document.getElementById('interactiveGrid');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        grid.style.backgroundPosition = `${x * 100}% ${y * 100}%`;
        
        // Activate grid near interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .product-card, .feature-card');
        let nearElement = false;
        
        interactiveElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const distance = Math.sqrt(
                Math.pow(e.clientX - (rect.left + rect.width / 2), 2) +
                Math.pow(e.clientY - (rect.top + rect.height / 2), 2)
            );
            
            if (distance < 200) {
                nearElement = true;
            }
        });
        
        if (nearElement) {
            grid.classList.add('active');
        } else {
            grid.classList.remove('active');
        }
    });
}

// Cursor Wave Effect
function initCursorWave() {
    document.addEventListener('click', (e) => {
        const wave = document.createElement('div');
        wave.className = 'cursor-wave';
        wave.style.left = e.clientX - 50 + 'px';
        wave.style.top = e.clientY - 50 + 'px';
        
        document.body.appendChild(wave);
        
        setTimeout(() => {
            wave.remove();
        }, 1000);
    });
}

// Magnetic Attraction for Elements
function initMagneticAttraction() {
    const magneticElements = document.querySelectorAll('.btn, .product-card, .feature-card');
    
    magneticElements.forEach(el => {
        el.classList.add('magnetic-element');
        
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
}

// Enhanced Particle System with Cursor Interaction
function enhanceParticleSystem() {
    const particles = document.querySelectorAll('.particle');
    
    document.addEventListener('mousemove', (e) => {
        particles.forEach((particle, index) => {
            const rect = particle.getBoundingClientRect();
            const particleX = rect.left + rect.width / 2;
            const particleY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(e.clientX - particleX, 2) + Math.pow(e.clientY - particleY, 2)
            );
            
            if (distance < 120) {
                const angle = Math.atan2(particleY - e.clientY, particleX - e.clientX);
                const force = (120 - distance) / 120;
                
                particle.style.transform = `translate(${Math.cos(angle) * force * 50}px, ${Math.sin(angle) * force * 50}px) scale(${1 + force * 0.5})`;
                particle.style.opacity = 0.3 + force * 0.4;
            }
        });
    });
}

// Initialize all systems when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initWelcomeScreen();
    initThemeSystem();
    initCartModal();
    initProductModal();
    initAddToCartButtons();
    initMagneticButtons();
    initCustomCursor();
});

// Initialize all 3D effects
createParticles();
initTiltEffect();
initCardFlipEffect();
initButtonEffects();
initFormInteractions();
initScrollAnimations();
initEnhancedParallax();

// Initialize cart display
updateCartDisplay();

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
