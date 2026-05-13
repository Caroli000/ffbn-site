

export default {
    mounted(el, binding) {
        const loadImage = () => {
            const imagesToLoad = el.querySelectorAll('img[data-src]');
            
            imagesToLoad.forEach(img => {
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }
            });
        };

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px'
        });

        const images = el.querySelectorAll('img[data-src]');
        images.forEach(img => imageObserver.observe(img));
    }
};
