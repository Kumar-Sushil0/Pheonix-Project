/* ==========================================================================
   PHOENIX FINANCIAL : V5 CLEAN SCRIPTS (DETAILED)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Homepage Product Cards Alternation ---
    const productCards = document.querySelectorAll('.product-card');

    function updateProductAlternation() {
        const isMobile = window.innerWidth <= 768;
        productCards.forEach((card, idx) => {
            const iconWrapper = card.querySelector('.product-icon-wrapper');
            if (iconWrapper) {
                if (isMobile) {
                    // Alternate on mobile: 0 (orange), 1 (grey), 2 (orange), 3 (grey)...
                    if (idx % 2 === 1) {
                        iconWrapper.classList.add('dark');
                    } else {
                        iconWrapper.classList.remove('dark');
                    }
                } else {
                    // Checkerboard on PC: 0 (orange), 1 (grey), 2 (grey), 3 (orange)...
                    const mod = idx % 4;
                    if (mod === 1 || mod === 2) {
                        iconWrapper.classList.add('dark');
                    } else {
                        iconWrapper.classList.remove('dark');
                    }
                }
            }
        });
    }

    if (productCards.length > 0) {
        updateProductAlternation();
        window.addEventListener('resize', updateProductAlternation);
    }

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
            
            // Close mobile menu if open
            if (window.innerWidth <= 768 && navMenu.style.display === 'flex') {
                navMenu.style.display = 'none';
            }
        });
    });

    // --- Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            if (navMenu.style.display === 'flex') {
                navMenu.style.display = 'none';
            } else {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.backgroundColor = '#FFFFFF';
                navMenu.style.padding = '20px';
                navMenu.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }
        });
    }

    // --- FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Check if currently active
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // --- Contact Form Mock Submission ---
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Store original text
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending Request...';
            submitBtn.style.opacity = '0.8';
            submitBtn.disabled = true;
            
            // Simulate network request
            setTimeout(() => {
                // Success state
                submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Request Received';
                submitBtn.style.backgroundColor = '#28a745';
                submitBtn.style.borderColor = '#28a745';
                submitBtn.style.opacity = '1';
                
                // Reset form
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.borderColor = '';
                    submitBtn.disabled = false;
                }, 3000);
                
            }, 1500);
        });
    }


    // --- Promotional Popup Modal ---
    const promoModal = document.getElementById('promoModal');
    const closePromoBtn = document.getElementById('closePromoBtn');
    const dismissPromoBtn = document.getElementById('dismissPromoBtn');
    const promoBackdrop = document.getElementById('promoBackdrop');

    if (promoModal) {
        const showPromo = () => {
            // Only show if user has not dismissed it during the current browser session
            if (!sessionStorage.getItem('promoDismissed')) {
                setTimeout(() => {
                    promoModal.classList.add('show');
                    document.body.style.overflow = 'hidden'; // Lock background scroll
                }, 1500); // Gentle 1.5s delay
            }
        };

        const closePromo = () => {
            promoModal.classList.remove('show');
            document.body.style.overflow = ''; // Unlock background scroll
            sessionStorage.setItem('promoDismissed', 'true');
        };

        if (closePromoBtn) closePromoBtn.addEventListener('click', closePromo);
        if (dismissPromoBtn) dismissPromoBtn.addEventListener('click', closePromo);
        if (promoBackdrop) promoBackdrop.addEventListener('click', closePromo);

        // Run show checker
        showPromo();
    }
});
