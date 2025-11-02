import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { loginSchema, LoginSchemaType } from "@/lib/schemas/AuthSchema";
import useSessionStore from "@/lib/stores/useSessionStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const { login } = useSessionStore();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginSchemaType) => {
    const { error, message } = await login(values);
    if (error) return form.setError("root", { message });
    router.navigate("/");
  };

  return (
    <Box className="flex flex-col gap-4">
      {form.formState.errors.root?.message && (
        <Text className="text-sm text-error-500">
          {form.formState.errors.root?.message}
        </Text>
      )}
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
      <Button onPress={form.handleSubmit(onSubmit)}>
        <ButtonText>Submit</ButtonText>
      </Button>
    </Box>
  );
};

export default LoginForm;
