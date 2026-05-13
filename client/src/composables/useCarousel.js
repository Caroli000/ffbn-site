import { ref } from 'vue'

export function useCarousel(totalSlides, interval = 5000) {
    const currentSlide = ref(0)
    let autoPlayTimer = null

    const showSlide = (index) => {
        if (index >= totalSlides) {
            currentSlide.value = 0
        } else if (index < 0) {
            currentSlide.value = totalSlides - 1
        } else {
            currentSlide.value = index
        }
    }

    const nextSlide = () => showSlide(currentSlide.value + 1)
    const prevSlide = () => showSlide(currentSlide.value - 1)
    const goToSlide = (index) => showSlide(index)

    const startAutoPlay = () => {
        stopAutoPlay()
        autoPlayTimer = setInterval(nextSlide, interval)
    }

    const stopAutoPlay = () => {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer)
            autoPlayTimer = null
        }
    }

    const resetAutoPlay = () => {
        stopAutoPlay()
        startAutoPlay()
    }

    return {
        currentSlide,
        nextSlide,
        prevSlide,
        goToSlide,
        startAutoPlay,
        stopAutoPlay,
        resetAutoPlay,
    }
}
