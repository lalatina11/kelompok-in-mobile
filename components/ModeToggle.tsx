import useThemeStore from "@/lib/stores/useThemeStore";
import { Button, ButtonIcon } from "./ui/button";
import { MoonIcon, SunIcon } from "./ui/icon";

const ModeToggle = () => {
  const { theme, setTheme } = useThemeStore();

  const handleSwitchTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button onPress={handleSwitchTheme}>
      <ButtonIcon as={theme === "light" ? MoonIcon : SunIcon} />
    </Button>
  );
};

export default ModeToggle;
