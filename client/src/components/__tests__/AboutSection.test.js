import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import AboutSection from '../AboutSection.vue'
import fr from '../../i18n/locales/fr.json'
import en from '../../i18n/locales/en.json'

const createWrapper = (locale = 'fr') => {
    const i18n = createI18n({
        legacy: false,
        locale,
        messages: { fr, en },
    })

    return mount(AboutSection, {
        global: {
            plugins: [i18n],
        },
    })
}

describe('AboutSection', () => {
    it('affiche le contenu en français par défaut', () => {
        const wrapper = createWrapper('fr')
        expect(wrapper.text()).toContain('Qui sommes-nous ?')
        expect(wrapper.text()).toContain('La Voix des Étudiants Burundais')
    })

    it('affiche le contenu en anglais', () => {
        const wrapper = createWrapper('en')
        expect(wrapper.text()).toContain('Who are we?')
        expect(wrapper.text()).toContain('The Voice of Burundian Students')
    })

    it('affiche les statistiques par défaut', () => {
        const wrapper = createWrapper('fr')
        expect(wrapper.text()).toContain('500+')
        expect(wrapper.text()).toContain('Membres')
    })

    it('contient le bouton En savoir plus', () => {
        const wrapper = createWrapper('fr')
        expect(wrapper.find('.btn-primary').text()).toBe('En savoir plus')
    })
})
