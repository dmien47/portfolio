// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Calculate offset for fixed navbar
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Unobserve after animation to improve performance
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Set current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Optional: Add active state to navigation links on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = Array.from(document.querySelectorAll('.nav-link'));

    function updateActiveNav() {
        let current = '';
        const scrollPosition = window.pageYOffset + 100; // Offset for navbar

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call

    // Scroll indicator visibility
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const scrollThreshold = 200; // Show indicator when within 200px of top

    function updateScrollIndicator() {
        if (scrollIndicator) {
            const scrollPosition = window.pageYOffset;
            
            if (scrollPosition < scrollThreshold) {
                scrollIndicator.classList.add('visible');
            } else {
                scrollIndicator.classList.remove('visible');
            }
        }
    }

    // Update scroll indicator on scroll
    window.addEventListener('scroll', updateScrollIndicator);
    updateScrollIndicator(); // Initial call

    // Set project images based on project names
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const titleElement = card.querySelector('.project-title');
        const imgElement = card.querySelector('.project-image img');
        
        if (titleElement && imgElement) {
            const projectName = titleElement.textContent.trim();
            // Convert project name to filename format: lowercase with underscores
            const filename = projectName.toLowerCase().replace(/\s+/g, '_');
            imgElement.src = `assets/${filename}.png`;
            imgElement.alt = projectName;
        }
    });

});
