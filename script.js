
// Global variables
let activeSection = '';
let isScrolled = false;
let isMobileMenuOpen = false;
let isTypingComplete = false;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeTypingAnimation();
    initializeScrollAnimations();
    initializeNavigation();
    initializeSkillBars();
});

// Typing animation
function initializeTypingAnimation() {
    const welcomeText = "Welcome To My Portfolio Website";
    const typedTextElement = document.getElementById('typed-text');
    const cursorElement = document.getElementById('cursor');
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
        if (currentIndex <= welcomeText.length) {
            typedTextElement.textContent = welcomeText.slice(0, currentIndex);
            currentIndex++;
        } else {
            isTypingComplete = true;
            cursorElement.style.opacity = '0';
            showHeroElements();
            clearInterval(typingInterval);
        }
    }, 100);
}

// Show hero elements after typing is complete
function showHeroElements() {
    const profileContainer = document.getElementById('profile-container');
    const heroInfo = document.getElementById('hero-info');
    const contactInfo = document.getElementById('contact-info');
    const socialLinks = document.getElementById('social-links');

    setTimeout(() => {
        profileContainer.classList.add('show');
        profileContainer.style.opacity = '1';
    }, 200);

    setTimeout(() => {
        heroInfo.classList.add('show');
        heroInfo.style.opacity = '1';
    }, 400);

    setTimeout(() => {
        contactInfo.classList.add('show');
        contactInfo.style.opacity = '1';
    }, 600);

    setTimeout(() => {
        socialLinks.classList.add('show');
        socialLinks.style.opacity = '1';
    }, 800);
}

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navTitle = document.getElementById('nav-title');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navItems = document.querySelectorAll('.nav-item, .mobile-nav-item');

    // Scroll handler
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        isScrolled = scrollY > 50;
        
        // Update navbar appearance
        if (isScrolled) {
            navbar.classList.remove('transparent');
        } else {
            navbar.classList.add('transparent');
        }

        // Update active section
        updateActiveSection();
        
        // Handle scroll animations
        handleScrollAnimations();
    });

    // Navigation title click
    navTitle.addEventListener('click', scrollToTop);

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        isMobileMenuOpen = !isMobileMenuOpen;
        if (isMobileMenuOpen) {
            mobileMenu.classList.add('open');
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            mobileMenu.classList.remove('open');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Navigation items click
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            scrollToSection(sectionId);
            
            // Close mobile menu if open
            if (isMobileMenuOpen) {
                mobileMenu.classList.remove('open');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                isMobileMenuOpen = false;
            }
        });
    });

    // Initial call
    handleScrollAnimations();
}

// Update active section based on scroll position
function updateActiveSection() {
    const sections = ['about', 'objective', 'projects', 'education', 'skills', 'competencies', 'certifications', 'references'];
    const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
    });
    
    if (current) {
        activeSection = current;
        updateActiveNavItem();
    }
}

// Update active navigation item
function updateActiveNavItem() {
    const navItems = document.querySelectorAll('.nav-item, .mobile-nav-item');
    navItems.forEach(item => {
        const sectionId = item.getAttribute('data-section');
        if (sectionId === activeSection) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const elements = document.querySelectorAll('.scroll-animate');
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe all scroll-animate elements
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Handle scroll animations (legacy support)
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible && !element.classList.contains('animate')) {
            setTimeout(() => {
                element.classList.add('animate');
            }, index * 100);
        }
    });
}

// Initialize skill bars
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const percentage = progressBar.getAttribute('data-percentage');
                setTimeout(() => {
                    progressBar.style.width = percentage + '%';
                }, 500);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Utility functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function downloadCV() {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent('John Doe - CV\n\nInformation Technology Management Student\n\nContact: john.doe@email.com\nPhone: +1 (555) 123-4567\nLocation: New York, NY'));
    element.setAttribute('download', 'John_Doe_CV.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function downloadCV() {
    const link = document.createElement('a');
    link.href = 'Ndiene_Netshikweta_CV.pdf'; // Download CV
    link.download = 'Ndiene_Netshikweta_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}






// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        scrollToSection(targetId);
    }
});


