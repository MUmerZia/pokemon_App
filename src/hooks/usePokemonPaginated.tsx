import {useEffect, useRef, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {
  PokemonPaginatedResponse,
  SinglePokemon,
} from '../interfaces/pokemonInterfaces';

export const usePokemonPaginated = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [simplePokemonList, setSimplePokemonList] = useState<SinglePokemon[]>(
    [],
  );

  //* URL to get 40 pokemons
  //const url = 'https://pokeapi.co/api/v2/pokemon?limit=40';
  const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

  const loadPokemons = async () => {
    setIsLoading(true);
    //* Tipar las llamadas a la API con typescript
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(
      nextPageUrl.current,
    );

    nextPageUrl.current = resp.data.next;
    mapPokemonList(resp.data.results);
  };

  const mapPokemonList = (pokemonList: Result[]) => {
    const newPokemonList: SinglePokemon[] = pokemonList.map(({name, url}) => {
      //* Split the url to get the id
      const urlParts = url.split('/');

      //* Get the id from the url
      const id = urlParts[urlParts.length - 2];

      //* Get the picture
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {
        id,
        name,
        picture,
      };
    });

    setSimplePokemonList([...simplePokemonList, ...newPokemonList]);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    simplePokemonList,
    isLoading,
    loadPokemons,
  };
};
