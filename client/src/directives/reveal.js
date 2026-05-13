
export default {
    mounted(el, binding) {
        const options = {
            root: null,
            threshold: 0.1,
            ...binding.value
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    el.classList.add('active');
                    observer.unobserve(el);
                }
            });
        }, options);

        observer.observe(el);
    }
}
