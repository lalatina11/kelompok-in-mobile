import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import useSessionStore from "@/lib/stores/useSessionStore";
import { UserRole } from "@/types/user";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const { session } = useSessionStore();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    function redirecting(role: UserRole) {
      if (role === "student") return router.navigate("/(student)");
      if (role === "teacher") return router.navigate("/(teacher)");
      return router.navigate("/(admin)");
    }
    if (!isMounted) {
      setIsMounted(true);
    }
    if (isMounted) {
      if (session === null) {
        return router.navigate("/auth");
      }
      return redirecting(session.user.iam_a);
    }
  }, [isMounted, router, session]);
  return <Box />;
}
