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
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                const backdrop = document.querySelector('.menu-backdrop');
                if (backdrop) backdrop.classList.remove('active');
                const navbar = document.getElementById('navbar');
                if (navbar) navbar.style.zIndex = '';
                document.body.style.overflow = '';
            }
        });
    });

    // --- Mobile Menu Toggle & Sidebar Drawer ---
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        // Create backdrop dynamically
        let backdrop = document.querySelector('.menu-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.className = 'menu-backdrop';
            document.body.appendChild(backdrop);
        }
        
        // Create close button dynamically inside sidebar
        let closeBtn = navMenu.querySelector('.menu-close');
        if (!closeBtn) {
            closeBtn = document.createElement('button');
            closeBtn.className = 'menu-close';
            closeBtn.innerHTML = '&times;';
            navMenu.insertBefore(closeBtn, navMenu.firstChild);
        }

        // Add branding at the top of sidebar
        let sidebarBrand = navMenu.querySelector('.sidebar-brand');
        if (!sidebarBrand) {
            sidebarBrand = document.createElement('div');
            sidebarBrand.className = 'sidebar-brand';
            sidebarBrand.innerHTML = '<img src="logo-trans.png" alt="Phoenix Financial"><span>Phoenix Financial</span>';
            // Insert after close button
            closeBtn.after(sidebarBrand);
        }

        // Add footer section at the bottom of sidebar
        let sidebarFooter = navMenu.querySelector('.sidebar-footer');
        if (!sidebarFooter) {
            sidebarFooter = document.createElement('div');
            sidebarFooter.className = 'sidebar-footer';
            sidebarFooter.innerHTML = `
                <div class="sidebar-contact-item">
                    <i class="fa-solid fa-phone"></i>
                    <span>+91 84858 19118</span>
                </div>
                <div class="sidebar-contact-item">
                    <i class="fa-solid fa-envelope"></i>
                    <span>phoenixcfe@gmail.com</span>
                </div>
                <div class="sidebar-socials">
                    <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
                    <a href="#"><i class="fa-brands fa-twitter"></i></a>
                    <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                    <a href="#"><i class="fa-brands fa-instagram"></i></a>
                </div>
            `;
            navMenu.appendChild(sidebarFooter);
        }

        const openMenu = () => {
            navMenu.classList.add('active');
            backdrop.classList.add('active');
            const navbar = document.getElementById('navbar');
            if (navbar) navbar.style.zIndex = '10002';
            document.body.style.overflow = 'hidden';
        };

        const closeMenu = () => {
            navMenu.classList.remove('active');
            backdrop.classList.remove('active');
            const navbar = document.getElementById('navbar');
            if (navbar) navbar.style.zIndex = '';
            document.body.style.overflow = '';
        };

        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            openMenu();
        });

        closeBtn.addEventListener('click', closeMenu);
        backdrop.addEventListener('click', closeMenu);
        
        // Also close sidebar on pressing escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMenu();
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
