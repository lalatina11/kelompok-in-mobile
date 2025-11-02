import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import apiRequest from "../apiRequest"
import { RegisterSchemaType } from "../schemas/AuthSchema"

export type AuthResponse = {
    error: boolean,
    message: string
}

export type UseSessionStore = {
    isLoading: boolean
    session: any
    register: (body: RegisterSchemaType) => Promise<AuthResponse>
    login: (body: RegisterSchemaType) => Promise<AuthResponse>
    logout: (token: string) => Promise<AuthResponse>
}

const useSessionStore = create(persist<UseSessionStore>(set => ({
    isLoading: false,
    session: null,
    register: async (body) => {
        try {
            set(prevState => ({ ...prevState, isLoading: true }))
            // console.log(ENV.EXPO_PUBLIC_LARAVEL_API_BASE_URL);
            // const res = await fetch(ENV.EXPO_PUBLIC_LARAVEL_API_BASE_URL + "/register", {
            //     method: "POST", body: JSON.stringify(body), headers: {
            //         "Content-Type": "application/json",
            //         Accept: "application/json"
            //     }
            // })
            const res = await apiRequest.post("/register", body)
            console.log(res);
            const result = await res.json()
            console.log(result);
            set({ session: result, isLoading: false })
            return { error: false, message: "OK" }
        } catch (error) {
            console.log(error);
            const { message } = error as Error
            return { error: true, message }
        }
    },
    login: async (body) => {
        try {
            set(prevState => ({ ...prevState, isLoading: true }))
            const res = await apiRequest.post("/login", body)
            const result = await res.json()
            set({ session: result, isLoading: false })
            return { error: false, message: "OK" }
        } catch (error) {
            const { message } = error as Error
            return { error: true, message }
        }
    },
    logout: async (token) => {
        try {
            set(prevState => ({ ...prevState, isLoading: true }))
            await apiRequest.post("/logout", undefined, token)
            set({ session: null, isLoading: false })
            return { error: false, message: "OK" }
        } catch (error) {
            const { message } = error as Error
            return { error: true, message }
        }
    }
}), { name: "session", storage: createJSONStorage(() => AsyncStorage) }))

export default useSessionStore
