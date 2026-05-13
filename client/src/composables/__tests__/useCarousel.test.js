import { describe, it, expect } from 'vitest'
import { useCarousel } from '../useCarousel'

describe('useCarousel', () => {
    it('initialise avec le slide 0', () => {
        const { currentSlide } = useCarousel(3)
        expect(currentSlide.value).toBe(0)
    })

    it('passe au slide suivant', () => {
        const { currentSlide, nextSlide } = useCarousel(3)
        nextSlide()
        expect(currentSlide.value).toBe(1)
    })

    it('passe au slide précédent', () => {
        const { currentSlide, prevSlide } = useCarousel(3)
        prevSlide()
        expect(currentSlide.value).toBe(2)
    })

    it('wrap-around au dernier -> premier', () => {
        const { currentSlide, nextSlide } = useCarousel(3)
        nextSlide()
        nextSlide()
        nextSlide()
        expect(currentSlide.value).toBe(0)
    })

    it('va directement à un slide donné', () => {
        const { currentSlide, goToSlide } = useCarousel(5)
        goToSlide(3)
        expect(currentSlide.value).toBe(3)
    })

    it('gère un index négatif (wrap-around)', () => {
        const { currentSlide, goToSlide } = useCarousel(5)
        goToSlide(-1)
        expect(currentSlide.value).toBe(4)
    })

    it('gère un index supérieur au nombre de slides', () => {
        const { currentSlide, goToSlide } = useCarousel(3)
        goToSlide(5)
        expect(currentSlide.value).toBe(0)
    })
})
