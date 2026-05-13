

export function initPerformanceOptimizations() {

    document.documentElement.classList.add('no-animations-startup')

    const animationDisabler = document.createElement('style')
    animationDisabler.id = 'performance-booster'
    animationDisabler.textContent = `
        .no-animations-startup * {
            animation: none !important;
            transition: none !important;
        }
        
        .no-animations-startup .reveal,
        .no-animations-startup .fade-in-up,
        .no-animations-startup .fade-in-left,
        .no-animations-startup .fade-in-right,
        .no-animations-startup .stagger-up,
        .no-animations-startup .image-reveal,
        .no-animations-startup .rotate-slow,
        .no-animations-startup .particle {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
        }
    `
    document.head.appendChild(animationDisabler)

    setTimeout(() => {
        document.documentElement.classList.remove('no-animations-startup')

        const booster = document.getElementById('performance-booster')
        if (booster) booster.remove()
    }, 2000)
}

export function optimizePerformance() {

    const style = document.createElement('style')
    style.textContent = `
        * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        .reveal, .fade-in-up, .fade-in-left, .fade-in-right, 
        .stagger-up, .image-reveal {
            transform: translateZ(0);
            will-change: auto;
            backface-visibility: hidden;
        }
    `
    document.head.appendChild(style)

if (document.documentElement.style.scrollBehavior !== 'auto') {
        document.documentElement.style.scrollBehavior = 'auto'
    }
}

export function lazyLoadComponents() {

    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.as = 'image'
    link.href = '/images/discover/mission.webp'
    document.head.appendChild(link)
}
