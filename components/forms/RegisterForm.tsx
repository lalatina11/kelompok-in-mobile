import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { CheckIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
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

const RegisterForm = () => {
  const { register } = useSessionStore();
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
    const { error, message } = await register(values);
    if (error) {
      return form.setError("root", { message });
    }
    return router.navigate("/");
  };

  const isTeacher = form.watch().iam_a === "teacher";

  return (
    <Box className="flex flex-col gap-4">
      {form.formState.errors.root?.message && (
        <Text className="text-sm text-error-500">
          {form.formState.errors.root?.message}
        </Text>
      )}
      <Box className="flex flex-col gap-2">
        <Text>Nama</Text>
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField
            onChangeText={(val) => form.setValue("name", val)}
            placeholder="Isikan Namamu"
          />
        </Input>
        {form.formState.errors.name?.message && (
          <Text className="text-sm text-error-500">
            {form.formState.errors.name?.message}
          </Text>
        )}
      </Box>
      <Box className="flex flex-col gap-2">
        <Text>Email</Text>
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField
            onChangeText={(val) => form.setValue("email", val)}
            placeholder="Isikan Emailmu"
          />
        </Input>
        {form.formState.errors.email?.message && (
          <Text className="text-sm text-error-500">
            {form.formState.errors.email?.message}
          </Text>
        )}
      </Box>
      <Box className="flex flex-col gap-2">
        <Text>Password</Text>
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField
            onChangeText={(val) => form.setValue("password", val)}
            placeholder="Isikan Password"
          />
        </Input>
        {form.formState.errors.password?.message && (
          <Text className="text-sm text-error-500">
            {form.formState.errors.password?.message}
          </Text>
        )}
      </Box>
      <Box className="flex flex-col gap-2">
        <Text>Daftar Sebagai</Text>
        <Box className="flex flex-grow flex-row gap-2">
          <Button
            variant={isTeacher ? "solid" : "outline"}
            onPress={() => form.setValue("iam_a", "teacher")}
            className="w-1/2 transition-all ease-in-out duration-300"
          >
            {isTeacher && <ButtonIcon as={CheckIcon} />}
            <ButtonText>Pengajar</ButtonText>
          </Button>
          <Button
            variant={!isTeacher ? "solid" : "outline"}
            onPress={() => form.setValue("iam_a", "student")}
            className="w-1/2 transition-all ease-in-out duration-300"
          >
            {!isTeacher && <ButtonIcon as={CheckIcon} />}
            <ButtonText>Pelajar</ButtonText>
          </Button>
        </Box>
        {form.formState.errors.iam_a?.message && (
          <Text className="text-sm text-error-500">
            {form.formState.errors.iam_a?.message}
          </Text>
        )}
        <Box className="flex flex-col gap-1">
          <Text className="text-sm text-warning-300">
            - Login sebagai pengajar untuk guru/dosen
          </Text>
          <Text className="text-sm text-warning-300">
            - Login sebagai pelajar untuk siswa/mahasiswa
          </Text>
        </Box>
      </Box>
      <Button onPress={form.handleSubmit(onSubmit)}>
        <ButtonText>Submit</ButtonText>
      </Button>
    </Box>
  );
};

export default RegisterForm;
