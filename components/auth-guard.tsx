import useSessionStore from "@/lib/stores/useSessionStore";
import { UserRole } from "@/types/user";
import { useRouter, useSegments } from "expo-router";
import { ReactNode, useEffect, useState } from "react";

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { session } = useSessionStore();
  const segments = useSegments();
  const router = useRouter();

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
      const isInLoginPage = segments[0] === "auth";
      const isHasSession = session !== null;
      if (isInLoginPage && isHasSession) {
        return redirecting(session.user.iam_a);
      } else if (!isInLoginPage && !isHasSession) {
        return router.navigate("/auth");
      }
    }
  }, [segments, session, router, isMounted]);
  return <>{children}</>;
};

export default AuthGuard;
