import useSessionStore from "@/lib/stores/useSessionStore";
import { useRouter, useSegments } from "expo-router";
import { ReactNode, useEffect, useState } from "react";

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { session } = useSessionStore();
  const segments = useSegments();
  const router = useRouter();
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
    if (isMounted) {
      const isInLoginPage = segments[0] === "auth";
      const isHasSession = session !== null;
      if (isInLoginPage && isHasSession) {
        router.navigate("/");
      }
      if (!isInLoginPage && !isHasSession) {
        router.navigate("/auth");
      }
    }
  }, [segments, session, router, isMounted]);
  return <>{children}</>;
};

export default AuthGuard;
