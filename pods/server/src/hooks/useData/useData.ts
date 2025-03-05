import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Pokemon } from '../../common/pokemon.model';

const fetchData = async (pokeId: string): Promise<Pokemon> => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${pokeId}/`,
  );
  return response.data;
};

const useData = (pokeId: string) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['poke_data', pokeId],
    queryFn: () => fetchData(pokeId),
  });

  return {
    data,
    isPending,
    isError,
  };
};

export default useData;
