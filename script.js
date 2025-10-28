// Ensure video plays and resizes on all devices
const video = document.getElementById('backgroundVideo');
if (video) {
    // Force video to be muted for autoplay
    video.muted = true;
    
    // Ensure video fills screen
    function ensureFullCoverage() {
        video.style.width = '100vw';
        video.style.height = '100vh';
        video.style.objectFit = 'cover';
    }
    
    // Try to play video
    video.play().catch(err => {
        console.log('Autoplay prevented:', err);
    });
    
    // Ensure full coverage on load and resize
    ensureFullCoverage();
    window.addEventListener('resize', ensureFullCoverage);
    window.addEventListener('orientationchange', ensureFullCoverage);
}

// Navigation bar scroll behavior
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Combined menu toggle with body scroll control
const handleMenuToggle = () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when mobile menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
};

hamburger.addEventListener('click', handleMenuToggle);

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Button click handlers
const quoteButtons = document.querySelectorAll('.nav-cta, .nav-cta-mobile, .btn-primary');
const serviceButton = document.querySelector('.btn-secondary');

quoteButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Quote request form would open here!');
        // In a real application, this would open a form or modal
    });
});

serviceButton.addEventListener('click', () => {
    alert('Services section would scroll here!');
    // In a real application, this would scroll to services section
});

// Add active state to navigation link on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Add subtle parallax effect to glass box (disabled on mobile)
window.addEventListener('scroll', () => {
    const glassBox = document.querySelector('.glass-box');
    if (glassBox && window.innerWidth > 768) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        glassBox.style.transform = `translateY(${parallax}px)`;
    } else if (glassBox) {
        glassBox.style.transform = '';
    }
});

