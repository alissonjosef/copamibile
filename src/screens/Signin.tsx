import { Text, Center, Icon } from "native-base";
import Logo from "../assets/logo.svg";
import { useAuth } from "../hook/useAuth";
import { Button } from "../components/Button";
import { Fontisto } from "@expo/vector-icons";

export function SignIn() {
  const { signIn, user } = useAuth();
  console.log("🚀 ~ file: Signin.tsx ~ line 9 ~ SignIn ~ user", user);
  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={212} height={40} />
      <Button
        type="SECONDARY"
        title={"ENTRAR COM GOOGLE"}
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        mt={12}
        onPress={signIn}
      />

      <Text color="white" textAlign="center" mt={4}>
        Não utilizamos nenhuma informação além {"\n"} do seu e-mail para criação
        de sua conta.
      </Text>
    </Center>
  );
}
