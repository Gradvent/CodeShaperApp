import axios, { AxiosInstance, AxiosResponse } from "axios"

export function useApiClient(): [AxiosInstance, Promise<AxiosResponse<any>>] {
    const http_client = axios.create({ baseURL: window.origin })
    return [http_client, http_client.get('sanctum/csrf-cookie').catch()]
}

export async function fetchPageMyPasta(page: number) {
    try {
        const [apiClient, apiFetch] = useApiClient()
        const pre = await apiFetch
        const res = await apiClient.get(`/api/my-pasta/${page}`)
        return res.data
    }
    catch {
        return undefined
    }
}

export async function fetchMyPasta(page: number) {
    try {
        const [apiClient, apiFetch] = useApiClient()
        const pre = await apiFetch
        const res = await apiClient.get(`/api/my-pasta/${page}`)
        return res.data.data
    }
    catch {
        return undefined
    }
}

export async function fetchMyLast10Pasta() {
    try {
        const [apiClient, apiFetch] = useApiClient()
        const pre = await apiFetch
        const res = await apiClient.get('/api/my-pasta')
        return res.data.data
    }
    catch {
        return undefined
    }
}

export async function fetchPublicLast10Pasta() {
    const [apiClient, apiFetch] = useApiClient()
    const pre = await apiFetch
    const res = await apiClient.get('/api/pasta')
    return res.data.data
}