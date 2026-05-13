import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import AppHeader from '../AppHeader.vue'
import fr from '../../i18n/locales/fr.json'
import en from '../../i18n/locales/en.json'

const createWrapper = (locale = 'fr') => {
    const i18n = createI18n({
        legacy: false,
        locale,
        messages: { fr, en },
    })

    return mount(AppHeader, {
        global: {
            plugins: [i18n],
        },
    })
}

describe('AppHeader', () => {
    it('affiche les liens de navigation en français', () => {
        const wrapper = createWrapper('fr')
        expect(wrapper.text()).toContain('Accueil')
        expect(wrapper.text()).toContain('À propos')
        expect(wrapper.text()).toContain('Nos actions')
        expect(wrapper.text()).toContain('Contact')
    })

    it('affiche les liens de navigation en anglais', () => {
        const wrapper = createWrapper('en')
        expect(wrapper.text()).toContain('Home')
        expect(wrapper.text()).toContain('About')
        expect(wrapper.text()).toContain('Our Actions')
        expect(wrapper.text()).toContain('Contact')
    })

    it('affiche le logo FFBN', () => {
        const wrapper = createWrapper('fr')
        expect(wrapper.find('.logo-text').text()).toBe('FFBN')
    })

    it('contient le bouton Nous rejoindre', () => {
        const wrapper = createWrapper('fr')
        expect(wrapper.find('.btn-join').text()).toBe('Nous rejoindre')
    })

    it('toggle le menu mobile', async () => {
        const wrapper = createWrapper('fr')
        const menuBtn = wrapper.find('.mobile-menu-btn')
        const nav = wrapper.find('nav ul')

        expect(nav.classes()).not.toContain('open')
        await menuBtn.trigger('click')
        expect(nav.classes()).toContain('open')
    })
})
