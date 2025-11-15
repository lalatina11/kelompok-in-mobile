import { Stack } from "expo-router";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import QueryClientProvider from "@/components/providers/QueryClientProvider";
import useThemeStore from "@/lib/stores/useThemeStore";
import AuthGuard from "@/components/auth-guard";

export default function RootLayout() {
  const { theme } = useThemeStore();
  return (
    <QueryClientProvider>
      <GluestackUIProvider mode={theme}>
        <AuthGuard>
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{
                headerStyle: {
                  backgroundColor: theme === "dark" ? "black" : "white",
                },
                headerTitleStyle: {
                  color: theme === "dark" ? "white" : "black",
                },
                title: "Home",
                headerTitleAlign: "center",
                headerBackVisible: false,
              }}
            />
            <Stack.Screen
              name="auth"
              options={{
                headerStyle: {
                  backgroundColor: theme === "dark" ? "black" : "white",
                },
                headerTitleStyle: {
                  color: theme === "dark" ? "white" : "black",
                },
                title: "Welcome",
                headerTitleAlign: "center",
                headerBackVisible: false,
              }}
            />
          </Stack>
        </AuthGuard>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
