// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded successfully');
    
    // ===== FIXED SMOOTH SCROLL (修复滚动功能) =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip empty anchors
            if (href === '#' || href === '#!') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate position with header offset
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight - 20;
                
                // Smooth scroll
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL
                history.pushState(null, null, href);
            }
        });
    });
    
    // ===== FIXED FILTER WORKS =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workCards = document.querySelectorAll('.work-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filter = button.dataset.filter;
            
            // Show/hide work cards based on filter
            workCards.forEach(card => {
                const category = card.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    // Fade in animation
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.3s ease';
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // ===== FIXED LIGHTBOX =====
    const lightbox = document.getElementById('lightbox');
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCategory = document.getElementById('lightboxCategory');
    const lightboxDownload = document.getElementById('lightboxDownload');
    const viewButtons = document.querySelectorAll('.view-btn');
    
    // Open lightbox
    viewButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const src = button.dataset.src;
            const title = button.dataset.title;
            const category = button.dataset.category;
            
            // Set lightbox content
            lightboxImage.src = src;
            lightboxTitle.textContent = title;
            lightboxCategory.textContent = category;
            lightboxDownload.href = src;
            
            // Show lightbox
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox function
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Close lightbox events
    lightboxOverlay.addEventListener('click', closeLightbox);
    lightboxClose.addEventListener('click', closeLightbox);
    
    // Close lightbox with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    // ===== ENSURE BUTTONS WORK =====
    // Fix for View Works button in hero section
    const viewWorksBtn = document.querySelector('.hero .btn-primary');
    if (viewWorksBtn) {
        viewWorksBtn.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#work') {
                e.preventDefault();
                const workSection = document.querySelector('#work');
                if (workSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = workSection.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - headerHeight - 20;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    history.pushState(null, null, '#work');
                }
            }
        });
    }
    
    // Fix for Contact button in hero section
    const contactBtn = document.querySelector('.hero .btn-outline');
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#contact') {
                e.preventDefault();
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - headerHeight - 20;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    history.pushState(null, null, '#contact');
                }
            }
        });
    }
    
    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add shadow when scrolled
            if (scrollTop > 10) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            } else {
                header.style.boxShadow = 'none';
            }
        });
    }
    
    // ===== CURRENT YEAR IN FOOTER =====
    const currentYearElement = document.querySelector('#currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    } else {
        // Fallback: add year to footer if element doesn't exist
        const footerCopyright = document.querySelector('.footer-copyright p');
        if (footerCopyright) {
            const currentYear = new Date().getFullYear();
            footerCopyright.innerHTML = footerCopyright.innerHTML.replace('2024', currentYear);
        }
    }
    
    // ===== INITIAL OPACITY =====
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    }, 100);
    
    document.body.style.opacity = '0';
});
