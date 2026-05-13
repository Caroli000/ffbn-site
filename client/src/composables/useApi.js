import axios from 'axios'
import { ref } from 'vue'

const getBaseURL = () => {
    if (import.meta.env.DEV) return '/api/'

    const path = window.location.pathname
    const base = path.split('/admin')[0].replace(/\/$/, '') || ''
    return base + '/api/'
}

const apiClient = axios.create({
    baseURL: getBaseURL(),
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 10000
})

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('admin_token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export function useApi() {
    const loading = ref(false)
    const error = ref(null)

    const get = async (url, lang = 'fr') => {
        loading.value = true
        error.value = null
        try {
            const res = await apiClient.get(url, { headers: { 'Accept-Language': lang } })
            return res.data
        } catch (err) {
            error.value = err.response?.data?.message || err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    const post = async (url, data, lang = 'fr') => {
        loading.value = true
        error.value = null
        try {
            const res = await apiClient.post(url, data, { headers: { 'Accept-Language': lang } })
            return res.data
        } catch (err) {
            error.value = err.response?.data?.message || err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    const put = async (url, data, lang = 'fr') => {
        loading.value = true
        error.value = null
        try {
            const res = await apiClient.put(url, data, { headers: { 'Accept-Language': lang } })
            return res.data
        } catch (err) {
            error.value = err.response?.data?.message || err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    const del = async (url, lang = 'fr') => {
        loading.value = true
        error.value = null
        try {
            const res = await apiClient.delete(url, { headers: { 'Accept-Language': lang } })
            return res.data
        } catch (err) {
            error.value = err.response?.data?.message || err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    return { get, post, put, del, loading, error }
}
