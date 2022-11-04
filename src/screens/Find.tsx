import { Heading, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";

export function Find() {
  const [isLoanding, setIsLoanding] = useState(false);
  const [code, setCode] = useState("");

  const toast = useToast();

  const {navigate} = useNavigation()

  async function handleJoinPool() {
    try {
      setIsLoanding(true);

      if(!code.trim()) {
        return  toast.show({
          title: "Informe o codigo",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post('/pools/join', {code})

      toast.show({
        title: "Voce no Bolão com sucesso",
        placement: "top",
        bgColor: "green.500",
      });

      navigate('pools')

    } catch (error) {
      console.log(error);

      setIsLoanding(false);

      if (error.response?.data?.message === "Pool not found.") {
        return toast.show({
          title: "Bolão não encontrado!",
          placement: "top",
          bgColor: "red.500",
        });
      }

      if (error.response?.data?.message === "You already joined this pool.") {
        return toast.show({
          title: "Voce ja esta no Bolão!",
          placement: "top",
          bgColor: "red.500",
        });
      }

      toast.show({
        title: "Não foi possivel encontrar o bolão",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      
    }
  }
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de {"\n"} seu código único
        </Heading>

        <Input
          onChangeText={setCode}
          value={code}
          autoCapitalize='characters'
          mb={2}
          placeholder="Qual o código do bolão?"
        />

        <Button
          isLoading={isLoanding}
          title="BUSCAR BOLÃO"
          onPress={handleJoinPool}
        />
      </VStack>
    </VStack>
  );
}
