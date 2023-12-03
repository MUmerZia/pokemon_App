import { useEffect, useRef, useState } from 'react';
import { pokemonApi } from '../api/pokemonApi';
import {
    PokemonPaginatedResponse,
    Result,
    SinglePokemon,
} from '../interfaces/pokemonInterfaces';
import AsyncStorage from '@react-native-community/async-storage'

export const usePokemonFav = () => {
    const [isLoading, setIsLoading] = useState(true);

    const [pokemonFavList, sePokemonFav] = useState([]);

    useEffect(() => {
        getFavList()
    }, []);


    const getFavList = async () => {
        let data = await AsyncStorage.getItem('fav_list')
        console.log('GetFavList--->>', data);
        sePokemonFav(data)
    }

    const setPokemonFavourateList = (pokemonObj: Result[]) => {
        // console.log('Set Func----> ', pokemonObj);
        // AsyncStorage.setItem('fav_list', JSON.stringify(pokemonObj))
        const existingData = pokemonFavList ? JSON.parse(pokemonFavList) : {};
        console.log('existingData: ', existingData);
        let newData = { ...existingData, ...pokemonObj }
        console.log('newData: ', newData);

        AsyncStorage.setItem("fav_list", JSON.stringify(newData))
    };




    return {
        setPokemonFavourateList,
        pokemonFavList,
    };
};
