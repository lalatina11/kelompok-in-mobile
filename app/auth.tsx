import LoginForm from "@/components/forms/LoginForm";
import RegisterForm from "@/components/forms/RegisterForm";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import { KeyboardAvoidingView } from "react-native";

export type AuthPageParams = "login" | "register";

const AuthPage = () => {
  const [params, setParams] = useState<AuthPageParams>("login");

  const isLoginPage = params === "login";

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Box className="p-3 flex-1 bg-background-0">
        <Card
          size="md"
          variant="elevated"
          className="flex flex-col gap-6 bg-background-50"
        >
          <Box>
            <Heading size="md" className="">
              {isLoginPage ? "Masuk" : "Daftar"}
            </Heading>
            <Text size="sm">
              {isLoginPage ? "Masuk ke Akun Anda" : "Daftarkan Akun Anda"}
            </Text>
          </Box>
          {isLoginPage ? <LoginForm /> : <RegisterForm />}
          <Box className="mx-auto flex flex-row gap-1">
            <Text className="">
              {isLoginPage ? "Belum punya akun?" : "Sudah punya akun?"}
            </Text>
            <Text
              className="underline underline-offset-4"
              onPress={() => setParams(isLoginPage ? "register" : "login")}
            >
              {isLoginPage ? "daftar disini" : "masuk disini"}
            </Text>
          </Box>
        </Card>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default AuthPage;
