import { Box, FlatList, useToast } from 'native-base';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Game, GameProps } from './Game';
import { Loading } from './Loading';



interface Props {
  poolId: string;
}

export function Guesses({ poolId }: Props) {

  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState<GameProps[]>([]);
  const [firstTeamScore, setFirstTeamPoints] = useState('');
  const [secondTeamScore, setSecondTeamPoints] = useState('');

  const toast = useToast();

  async function fetchgame(){
    try {
      setIsLoading(true)
      
      const response = await api.get(`pools/${poolId}/games`)
      setGames(response.data.games)

    } catch (error) {
      console.log(error)
      toast.show({
        title: "Não foi possivel carregar os Jogos",
        placement: "top",
        bgColor: "red.500",
      });
    } finally{
      setIsLoading(false)
    }
  }

  async function handleGuessConfirm(gameId: string){
    try {
      if(!firstTeamScore.trim() || !secondTeamScore.trim()){
        return toast.show({
          title: "Informe o placar de palpite",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamScore: Number(firstTeamScore),
        secondTeamScore: Number(secondTeamScore),
      });

      toast.show({
        title: "Palpite realizado com sucesso",
        placement: "top",
        bgColor: "green.500",
      });

      fetchgame()
      
    } catch (error) {
      console.log( error)

      toast.show({
        title: "Não foi possivel enviar o palpite",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  useEffect(() => {
    fetchgame()
  },[poolId])

  if(isLoading){
    return <Loading />
  }

  return (
      <FlatList
      data={games}
      keyExtractor={item => item.id}
      renderItem={({item})=> (
        <Game
        data={item}
        setFirstTeamPoints={setFirstTeamPoints}
        setSecondTeamPoints={setSecondTeamPoints}
        onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )}
      />
  );
}
