(function() {
    const navContainer = document.getElementById('nav-container');
    const mainNav = document.getElementById('main-nav');
    if (!navContainer || !mainNav) return;

    function handleScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            mainNav.classList.remove('bg-[#fff]/80', 'backdrop-blur-sm');
            navContainer.classList.remove('border-b', 'border-zinc-200/60', 'max-w-full', 'md:px-14', 'lg:px-14');
            navContainer.classList.add('border', 'border-zinc-200/80', 'rounded-full', 'max-w-5xl', 'mt-4', 'bg-[#fff]/80', 'backdrop-blur-sm', 'shadow-sm', 'px-8');
        } else {
            mainNav.classList.add('bg-[#fff]/80', 'backdrop-blur-sm');
            navContainer.classList.add('border-b', 'border-zinc-200/60', 'max-w-full', 'md:px-14', 'lg:px-14');
            navContainer.classList.remove('border', 'border-zinc-200/80', 'rounded-full', 'max-w-5xl', 'mt-4', 'bg-[#fff]/80', 'backdrop-blur-sm', 'shadow-sm', 'px-8');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
})();

document.addEventListener('DOMContentLoaded', () => {
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
});
