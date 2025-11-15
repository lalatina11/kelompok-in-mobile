import React from "react";
import { Tabs } from "expo-router";
import useThemeStore from "@/lib/stores/useThemeStore";
import { Home, School, Settings } from "lucide-react-native";

const TabsLayout = () => {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";
  const isRevertColor = isDark ? "white" : "black";
  const isNotRevertColor = !isDark ? "white" : "black";
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarStyle: { backgroundColor: isNotRevertColor },
          tabBarActiveBackgroundColor: isRevertColor,
          tabBarIcon: ({ color }) => <Home color={color} />,
          tabBarActiveTintColor: isNotRevertColor,
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="classroom"
        options={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: isNotRevertColor,
          },
          tabBarActiveBackgroundColor: isRevertColor,
          tabBarIcon: ({ color }) => <School color={color} />,
          tabBarActiveTintColor: isNotRevertColor,
          title: "Classroom",
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: isNotRevertColor,
          },
          tabBarActiveBackgroundColor: isRevertColor,
          tabBarIcon: ({ color }) => <Settings color={color} />,
          tabBarActiveTintColor: isNotRevertColor,
          title: "Setting",
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
