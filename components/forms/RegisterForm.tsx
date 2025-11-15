import { Box } from "@/components/ui/box";
import {
  Button,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
} from "@/components/ui/button";
import { CheckIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import {
  registerSchema,
  RegisterSchemaType,
  RoleType,
} from "@/lib/schemas/AuthSchema";
import useSessionStore from "@/lib/stores/useSessionStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { useState } from "react";

const RegisterForm = () => {
  const { register, isLoading } = useSessionStore();
  const [isShowPassword, setIsShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      iam_a: "student" as RoleType,
    },
  });

  const onSubmit = async (values: RegisterSchemaType) => {
    const { password, confirmPassword } = values;
    if (password !== confirmPassword) {
      return form.setError("confirmPassword", {
        message: "Password dan Konfirmasi Password harus sama",
      });
    }
    const { error, message } = await register(values);
    if (error) {
      return form.setError("root", { message });
    }
    return router.navigate("/(tabs)");
  };

  const isTeacher = form.watch().iam_a === "teacher";

  const isFormBusy =
    form.formState.isLoading || form.formState.isSubmitting || isLoading;

  return (
    <Box className="flex flex-col gap-4">
      {form.formState.errors.root?.message && (
        <Text className="text-error-500 text-center">
          {form.formState.errors.root?.message}
        </Text>
      )}

      <Box className="flex flex-col gap-2">
        <Text className="text-lg">Nama</Text>
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField
            className="text-lg"
            onChangeText={(val) => form.setValue("name", val)}
            placeholder="Isikan Namamu"
          />
        </Input>
        {form.formState.errors.name?.message && (
          <Text className="text-error-500">
            {form.formState.errors.name?.message}
          </Text>
        )}
      </Box>
      <Box className="flex flex-col gap-2">
        <Text className="text-lg">Email</Text>
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField
            className="text-lg"
            onChangeText={(val) => form.setValue("email", val)}
            placeholder="Isikan Emailmu"
          />
        </Input>
        {form.formState.errors.email?.message && (
          <Text className="text-error-500">
            {form.formState.errors.email?.message}
          </Text>
        )}
      </Box>
      <Box className="flex flex-col gap-2">
        <Text className="text-lg">Password</Text>
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField
            className="text-lg"
            onChangeText={(val) => form.setValue("password", val)}
            placeholder="Isikan Password"
            type={isShowPassword.password ? "text" : "password"}
          />
          <Button
            onPress={() =>
              setIsShowPassword((prev) => ({
                ...prev,
                password: !prev.password,
              }))
            }
            variant="outline"
          >
            <InputIcon as={isShowPassword.password ? EyeOffIcon : EyeIcon} />
          </Button>
        </Input>
        {form.formState.errors.password?.message && (
          <Text className="text-error-500">
            {form.formState.errors.password?.message}
          </Text>
        )}
      </Box>
      <Box className="flex flex-col gap-2">
        <Text className="text-lg">Konfirmasi Password</Text>
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField
            className="text-lg"
            onChangeText={(val) => form.setValue("confirmPassword", val)}
            placeholder="Konfirmasi Password"
            type={isShowPassword.confirmPassword ? "text" : "password"}
          />
          <Button
            onPress={() =>
              setIsShowPassword((prev) => ({
                ...prev,
                confirmPassword: !prev.confirmPassword,
              }))
            }
            variant="outline"
          >
            <InputIcon
              as={isShowPassword.confirmPassword ? EyeOffIcon : EyeIcon}
            />
          </Button>
        </Input>
        {form.formState.errors.confirmPassword?.message && (
          <Text className="text-error-500">
            {form.formState.errors.confirmPassword?.message}
          </Text>
        )}
      </Box>
      <Box className="flex flex-col gap-3">
        <Text className="text-lg">Daftar Sebagai</Text>
        <Box className="flex flex-grow flex-row gap-2">
          <Button
            variant={!isTeacher ? "solid" : "outline"}
            onPress={() => form.setValue("iam_a", "student")}
            className="w-1/2 transition-all ease-in-out duration-300"
          >
            {!isTeacher && <ButtonIcon as={CheckIcon} />}
            <ButtonText>Pelajar</ButtonText>
          </Button>
          <Button
            variant={isTeacher ? "solid" : "outline"}
            onPress={() => form.setValue("iam_a", "teacher")}
            className="w-1/2 transition-all ease-in-out duration-300"
          >
            {isTeacher && <ButtonIcon as={CheckIcon} />}
            <ButtonText>Pengajar</ButtonText>
          </Button>
        </Box>
        {form.formState.errors.iam_a?.message && (
          <Text className="text-error-500">
            {form.formState.errors.iam_a?.message}
          </Text>
        )}
        <Box className="flex flex-col gap-1">
          <Text className="text-warning-300">
            - Daftar sebagai pengajar untuk guru/dosen
          </Text>
          <Text className="text-warning-300">
            - Daftar sebagai pelajar untuk siswa/mahasiswa
          </Text>
        </Box>
      </Box>
      <Button disabled={isFormBusy} onPress={form.handleSubmit(onSubmit)}>
        {isFormBusy && <ButtonSpinner />}
        <ButtonText>{isFormBusy ? "Loading" : "Daftar"}</ButtonText>
      </Button>
    </Box>
  );
};

export default RegisterForm;
