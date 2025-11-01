import useThemeStore from "@/lib/stores/useThemeStore";
import { Button, ButtonIcon } from "./ui/button";
import { MoonIcon, SunIcon } from "./ui/icon";

const ModeToggle = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <Button
      onPress={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
    >
      <ButtonIcon as={theme === "light" ? MoonIcon : SunIcon} />
    </Button>
  );
};

export default ModeToggle;
