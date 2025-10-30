import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ModeType } from "@/components/ui/gluestack-ui-provider"

export interface UseThemeStore {
    theme: ModeType
    setTheme: (t: UseThemeStore['theme']) => void
}

const useThemeStore = create(persist<UseThemeStore>(set => ({
    theme: "light",
    setTheme: (t) => set({ theme: t })
}), { name: "theme", storage: createJSONStorage(() => AsyncStorage) }))

export default useThemeStore