import ENV from "./env";

const apiRequest = {
    get: async (url: string, token?: string) => await fetch(ENV.EXPO_PUBLIC_LARAVEL_API_BASE_URL + url, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }),
    post: async (url: string, body?: Record<string, any> | FormData, token?: string) => {
        const payload = body instanceof FormData ? body :
            typeof body === "object" ? JSON.stringify(body) : undefined;
        return await fetch(ENV.EXPO_PUBLIC_LARAVEL_API_BASE_URL + url, {
            method: "POST", body: payload, headers: {
                'Content-Type': body instanceof FormData ? 'multipart/form-data' : 'application/json',
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        })
    },
    update: async (url: string, body?: Record<string, any> | FormData, token?: string) => {
        const payload = body instanceof FormData ? body :
            typeof body === "object" ? JSON.stringify(body) : undefined;
        return await fetch(ENV.EXPO_PUBLIC_LARAVEL_API_BASE_URL + url, {
            method: "PATCH", body: payload, headers: {
                'Content-Type': body instanceof FormData ? 'multipart/form-data' : 'application/json',
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        })
    },
    delete: async (url: string, token?: string) => await fetch(ENV.EXPO_PUBLIC_LARAVEL_API_BASE_URL + url, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }),
}

export default apiRequest