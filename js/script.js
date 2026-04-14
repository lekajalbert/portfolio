(function() {
    const navContainer = document.getElementById('nav-container');
    const mainNav = document.getElementById('main-nav');
    if (!navContainer || !mainNav) return;

    function handleScroll() {
        const scrollY = window.scrollY;
        const menuToggle = document.getElementById('mobile-menu-toggle');
        const isMobileMenuOpen = menuToggle && menuToggle.getAttribute('aria-expanded') === 'true' && window.innerWidth < 768;
        const isMobileViewport = window.innerWidth < 768;

        if (isMobileMenuOpen) {
            mainNav.classList.remove('bg-[#fff]/80', 'backdrop-blur-lg');
            navContainer.classList.remove('bg-[#fff]/80', 'backdrop-blur-lg');
            navContainer.classList.add('bg-white');
            return;
        }

        if (isMobileViewport || scrollY > 50) {
            mainNav.classList.remove('bg-[#fff]/80', 'backdrop-blur-lg', 'px-4');
            mainNav.classList.add('px-4');
            navContainer.classList.remove('border-b', 'border-zinc-200/60', 'max-w-full', 'md:px-14', 'lg:px-14');
            navContainer.classList.add('border', 'border-zinc-200/80', 'rounded-[18px]', 'max-w-5xl', 'mt-4', 'bg-[#fff]/80', 'backdrop-blur-lg', 'px-8');
        } else {
            mainNav.classList.add('bg-[#fff]/80', 'backdrop-blur-lg', 'px-4');
            mainNav.classList.remove('px-4');
            navContainer.classList.add('border-b', 'border-zinc-200/60', 'max-w-full', 'md:px-14', 'lg:px-14');
            navContainer.classList.remove('border', 'border-zinc-200/80', 'rounded-[18px]', 'max-w-5xl', 'mt-4', 'bg-[#fff]/80', 'backdrop-blur-lg', 'px-8');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
})();

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');
    const mainNav = document.getElementById('main-nav');
    const navContainer = document.getElementById('nav-container');

    if (menuToggle && mobileMenu) {
        const menuOpenIcon = 'solar:hamburger-menu-linear';
        const menuCloseIcon = 'lucide:x';
        const menuIcon = menuToggle.querySelector('iconify-icon');
        const openMenuClasses = ['max-h-80', 'opacity-100', 'pointer-events-auto', 'bg-white'];
        const closedMenuClasses = ['max-h-0', 'opacity-0', 'pointer-events-none', 'bg-transparent'];
        const menuItemStaggerMs = 55;

        const isMenuOpen = () => menuToggle.getAttribute('aria-expanded') === 'true';

        const resetMobileMenuItems = () => {
            mobileMenuLinks.forEach((link) => {
                link.style.transition = 'opacity 220ms ease, transform 220ms ease';
                link.style.transitionDelay = '0ms';
                link.style.opacity = '0';
                link.style.transform = 'translateY(8px)';
            });
        };

        const animateMobileMenuItemsIn = () => {
            requestAnimationFrame(() => {
                mobileMenuLinks.forEach((link, index) => {
                    link.style.transitionDelay = `${index * menuItemStaggerMs}ms`;
                    link.style.opacity = '1';
                    link.style.transform = 'translateY(0)';
                });
            });
        };

        const closeMenu = () => {
            mobileMenu.classList.remove(...openMenuClasses);
            mobileMenu.classList.add(...closedMenuClasses);
            resetMobileMenuItems();
            if (navContainer) {
                navContainer.classList.remove('bg-white');
            }
            menuToggle.setAttribute('aria-expanded', 'false');
            if (menuIcon) menuIcon.setAttribute('icon', menuOpenIcon);
            window.dispatchEvent(new Event('scroll'));
        };

        const openMenu = () => {
            mobileMenu.classList.remove(...closedMenuClasses);
            mobileMenu.classList.add(...openMenuClasses);
            if (navContainer) {
                navContainer.classList.add('bg-white');
                navContainer.classList.remove('bg-[#fff]/80', 'backdrop-blur-lg');
            }
            if (mainNav) {
                mainNav.classList.remove('bg-[#fff]/80', 'backdrop-blur-lg');
            }
            menuToggle.setAttribute('aria-expanded', 'true');
            if (menuIcon) menuIcon.setAttribute('icon', menuCloseIcon);
            animateMobileMenuItemsIn();
        };

        resetMobileMenuItems();

        menuToggle.addEventListener('click', () => {
            if (!isMenuOpen()) {
                openMenu();
            } else {
                closeMenu();
            }
        });

        mobileMenuLinks.forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('click', (event) => {
            if (isMenuOpen()) {
                const target = event.target;
                if (!mobileMenu.contains(target) && !menuToggle.contains(target)) {
                    closeMenu();
                }
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && isMenuOpen()) {
                closeMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                closeMenu();
            }
        });
    }

    const skillsSection = document.getElementById('skills');
    const skillTags = document.querySelectorAll('.skill-tag');

    if (skillsSection && skillTags.length > 0) {
        // Scroll Parallax Effect
        let ticking = false;

        function updateParallax() {
            const rect = skillsSection.getBoundingClientRect();
            const centerOffset = (rect.top + rect.height / 2) - (window.innerHeight / 2);

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                skillTags.forEach((tag, i) => {
                    const dirY = i % 2 === 0 ? -1 : 1;
                    const speedY = 0.03 + (i % 5) * 0.02;
                    const y = centerOffset * speedY * dirY;
                    tag.style.transform = `translate3d(0, ${y}px, 0)`;
                });
            }
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
        updateParallax();

        // Continuous Highlight Loop
        let currentHighlight = 0;

        setInterval(() => {
            // Reset previous tag
            const prevIndex = currentHighlight === 0 ? skillTags.length - 1 : currentHighlight - 1;
            const prevTag = skillTags[prevIndex];

            prevTag.classList.remove('bg-zinc-900', 'text-white', 'border-transparent', 'scale-110', 'shadow-xl', 'z-20');
            prevTag.classList.add('bg-white', 'text-zinc-600', 'border-zinc-200/60', 'shadow-sm', 'z-0');

            // Highlight new tag
            const currentTag = skillTags[currentHighlight];
            currentTag.classList.remove('bg-white', 'text-zinc-600', 'border-zinc-200/60', 'shadow-sm', 'z-0');
            currentTag.classList.add('bg-zinc-900', 'text-white', 'border-transparent', 'scale-110', 'shadow-xl', 'z-20');

            currentHighlight = (currentHighlight + 1) % skillTags.length;
        }, 2000);
    }

    const workGalleryRoot = document.getElementById('work-media-gallery');
    const workScroller = workGalleryRoot && workGalleryRoot.querySelector('.work-gallery-scroll');
    const workSlides = workGalleryRoot ? workGalleryRoot.querySelectorAll('.work-gallery-slide') : [];
    const workTabs = document.querySelectorAll('[data-work-slide]');
    const workAutoplayBtn = document.getElementById('work-gallery-autoplay');

    if (workGalleryRoot && workScroller && workSlides.length && workTabs.length === workSlides.length && workAutoplayBtn) {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let activeIndex = 0;
        let autoplayOn = !reduceMotion;
        let autoplayTimer = null;
        let scrollTicking = false;
        const autoplayMs = 6000;

        function clearAutoplay() {
            if (autoplayTimer) {
                clearInterval(autoplayTimer);
                autoplayTimer = null;
            }
        }

        function syncAutoplayUi() {
            if (reduceMotion) {
                workAutoplayBtn.setAttribute('data-autoplay', 'false');
                workAutoplayBtn.setAttribute('aria-label', 'Autoplay off (reduced motion)');
                workAutoplayBtn.disabled = true;
                return;
            }
            workAutoplayBtn.setAttribute('data-autoplay', autoplayOn ? 'true' : 'false');
            workAutoplayBtn.setAttribute('aria-label', autoplayOn ? 'Pause slideshow' : 'Play slideshow');
            workAutoplayBtn.disabled = false;
        }

        function setActiveIndex(next) {
            const i = Math.max(0, Math.min(workSlides.length - 1, next));
            activeIndex = i;
            workTabs.forEach((tab, j) => {
                const on = j === i;
                tab.setAttribute('aria-selected', on ? 'true' : 'false');
                tab.tabIndex = on ? 0 : -1;
            });
            workSlides.forEach((slide, j) => {
                slide.classList.toggle('work-gallery-slide-active', j === i);
            });
        }

        function getNearestSlideIndex() {
            const viewportCenter = workScroller.scrollLeft + workScroller.clientWidth / 2;
            let nearest = 0;
            let minDistance = Infinity;
            workSlides.forEach((slide, index) => {
                const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
                const distance = Math.abs(slideCenter - viewportCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearest = index;
                }
            });
            return nearest;
        }

        function goToSlide(index, useSmooth) {
            const slide = workSlides[index];
            if (!slide) return;
            const targetLeft = slide.offsetLeft - (workScroller.clientWidth - slide.offsetWidth) / 2;
            const behavior = reduceMotion || useSmooth === false ? 'auto' : 'smooth';
            workScroller.scrollTo({ left: Math.max(0, targetLeft), behavior });
            if (behavior === 'auto') {
                setActiveIndex(index);
            }
        }

        function syncFromScroll() {
            const next = getNearestSlideIndex();
            if (next !== activeIndex) {
                setActiveIndex(next);
            }
        }

        function startAutoplay() {
            clearAutoplay();
            if (!autoplayOn || reduceMotion) return;
            autoplayTimer = window.setInterval(() => {
                const next = (activeIndex + 1) % workSlides.length;
                goToSlide(next, true);
            }, autoplayMs);
        }

        workTabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                const i = parseInt(tab.getAttribute('data-work-slide'), 10);
                if (Number.isNaN(i)) return;
                autoplayOn = false;
                syncAutoplayUi();
                clearAutoplay();
                goToSlide(i, true);
            });
        });

        workAutoplayBtn.addEventListener('click', () => {
            if (reduceMotion) return;
            autoplayOn = !autoplayOn;
            syncAutoplayUi();
            if (autoplayOn) startAutoplay();
            else clearAutoplay();
        });

        workScroller.addEventListener('pointerdown', () => {
            if (reduceMotion) return;
            autoplayOn = false;
            syncAutoplayUi();
            clearAutoplay();
        });

        workScroller.addEventListener('scroll', () => {
            if (scrollTicking) return;
            scrollTicking = true;
            window.requestAnimationFrame(() => {
                syncFromScroll();
                scrollTicking = false;
            });
        }, { passive: true });

        setActiveIndex(getNearestSlideIndex());
        syncAutoplayUi();
        startAutoplay();

        workScroller.addEventListener('keydown', (e) => {
            if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
            e.preventDefault();
            const delta = e.key === 'ArrowRight' ? 1 : -1;
            const next = (activeIndex + delta + workSlides.length) % workSlides.length;
            autoplayOn = false;
            syncAutoplayUi();
            clearAutoplay();
            goToSlide(next, true);
        });

        const workTablist = document.getElementById('work-gallery-tablist');
        if (workTablist) {
            workTablist.addEventListener('keydown', (e) => {
                if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
                e.preventDefault();
                const delta = e.key === 'ArrowRight' ? 1 : -1;
                let next = activeIndex + delta;
                if (next < 0) next = workSlides.length - 1;
                if (next >= workSlides.length) next = 0;
                goToSlide(next, true);
                workTabs[next].focus();
            });
        }

        window.addEventListener('resize', () => {
            goToSlide(activeIndex, false);
        });
    }
});

// Hero Video Circle Interaction
document.addEventListener('DOMContentLoaded', () => {
    const heroVideoCircle = document.querySelector('.hero-video-circle');
    if (!heroVideoCircle) return;

    let mouseX = 0;
    let mouseY = 0;
    let orientationGamma = 0; // Left-right tilt
    let orientationBeta = 0;  // Front-back tilt
    let circleX = 0;
    let circleY = 0;
    const lerpFactor = 0.02; // Slower smooth following factor
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Track mouse position (desktop)
    if (!isMobile) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
    }

    // Track device orientation (mobile)
    if (isMobile && window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (e) => {
            orientationGamma = e.gamma || 0; // Left-right tilt (-90 to 90)
            orientationBeta = e.beta || 0;   // Front-back tilt (-180 to 180)
        });
    }

    // Animation loop
    function animate() {
        let deltaX = 0;
        let deltaY = 0;

        if (isMobile) {
            // Use device orientation for mobile
            deltaX = orientationGamma * 2; // Scale the tilt
            deltaY = (orientationBeta - 45) * 1.5; // Adjust beta range
        } else {
            // Smooth follow mouse for desktop
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            deltaX = (mouseX - centerX) * 0.1; // Small movement
            deltaY = (mouseY - centerY) * 0.1;
        }

        circleX += (deltaX - circleX) * lerpFactor;
        circleY += (deltaY - circleY) * lerpFactor;

        // Apply transform
        heroVideoCircle.style.transform = `translate(${circleX}px, ${circleY}px)`;

        requestAnimationFrame(animate);
    }

    animate();
});

// Ensure video autoplay on all devices
document.addEventListener('DOMContentLoaded', () => {
    const heroVideo = document.querySelector('.hero-video');
    if (!heroVideo) return;

    // Try to play immediately
    const playPromise = heroVideo.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            // Autoplay failed, try again on user interaction
            const playOnInteraction = () => {
                heroVideo.play().catch(() => {});
                document.removeEventListener('click', playOnInteraction);
                document.removeEventListener('touchstart', playOnInteraction);
            };
            document.addEventListener('click', playOnInteraction);
            document.addEventListener('touchstart', playOnInteraction);
        });
    }
});

