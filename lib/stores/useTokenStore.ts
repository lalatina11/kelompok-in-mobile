import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"

export interface UseTokenStore {
    token: string
    setToken: (t: string) => void
}

const useTokenStore = create(persist<UseTokenStore>(set => ({
    token: "",
    setToken: (t) => set({ token: t })
}), { name: "token", storage: createJSONStorage(() => AsyncStorage) }))

export default useTokenStore