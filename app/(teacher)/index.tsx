import ModeToggle from "@/components/ModeToggle";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import useSessionStore from "@/lib/stores/useSessionStore";
import { useRouter } from "expo-router";
import { LogOut } from "lucide-react-native";

export default function Index() {
  const router = useRouter();
  const { session, logout, isLoading } = useSessionStore();
  console.log({ session });

  const handleLogOut = async () => {
    if (session?.token) {
      await logout(session?.token);
      router.navigate("/auth");
    }
  };

  return (
    <Box className="flex-1 flex justify-center items-center flex-col gap-6 bg-secondary-0">
      <Text>This is entry point of Teacher</Text>
      {session !== null && !isLoading && (
        <Button action="negative" onPress={handleLogOut}>
          <ButtonIcon as={LogOut} />
          <ButtonText>Logout</ButtonText>
        </Button>
      )}
      <ModeToggle />
    </Box>
  );
}
