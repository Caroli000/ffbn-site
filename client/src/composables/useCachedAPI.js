

import { ref, computed } from 'vue'
import axios from 'axios'
import clientCache from '../utils/clientCache'

export function useCachedAPI(url, options = {}) {
    const {
        method = 'GET',
        cacheTTL = 300000,
        immediate = true
    } = options

    const data = ref(null)
    const loading = ref(false)
    const error = ref(null)
    const fromCache = ref(false)

async function fetch() {

        if (method === 'GET') {
            const cached = clientCache.get(method, url)
            if (cached) {
                data.value = cached
                fromCache.value = true
                return cached
            }
        }

        loading.value = true
        error.value = null
        fromCache.value = false

        try {
            const response = await axios({
                method,
                url: `/api${url}`,
                ...options.axiosConfig
            })

            data.value = response.data

            if (method === 'GET') {
                clientCache.set(method, url, response.data, cacheTTL)
            }

            return response.data
        } catch (err) {
            error.value = err.message
            console.error(`API Error (${method} ${url}):`, err)
            throw err
        } finally {
            loading.value = false
        }
    }

function invalidateCache() {
        clientCache.invalidate(url)
    }

async function refresh() {
        invalidateCache()
        return fetch()
    }

    if (immediate) {
        fetch()
    }

    return {
        data: computed(() => data.value),
        loading: computed(() => loading.value),
        error: computed(() => error.value),
        fromCache: computed(() => fromCache.value),
        fetch,
        refresh,
        invalidateCache
    }
}

export default useCachedAPI
