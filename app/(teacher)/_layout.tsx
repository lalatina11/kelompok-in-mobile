import useThemeStore from "@/lib/stores/useThemeStore";
import { Tabs } from "expo-router";
import { Home, School, Settings, TableProperties } from "lucide-react-native";

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
          href: "/(teacher)",
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
          href: "/(teacher)/classroom",
        }}
      />
      <Tabs.Screen
        name="project"
        options={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: isNotRevertColor,
          },
          tabBarActiveBackgroundColor: isRevertColor,
          tabBarIcon: ({ color }) => <TableProperties color={color} />,
          tabBarActiveTintColor: isNotRevertColor,
          title: "Project",
          href: "/(teacher)/project",
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
          href: "/(teacher)/setting",
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
