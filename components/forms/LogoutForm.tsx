import { LogOut } from "lucide-react-native";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import { useRouter } from "expo-router";
import useSessionStore from "@/lib/stores/useSessionStore";
import { Spinner } from "../ui/spinner";

const LogoutForm = () => {
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
    <Button
      onPress={handleLogOut}
      variant="solid"
      action="negative"
      disabled={isLoading}
    >
      {isLoading ? <Spinner /> : <ButtonIcon as={LogOut} />}
      <ButtonText>Logout</ButtonText>
    </Button>
  );
};

export default LogoutForm;
