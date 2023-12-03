import { useEffect, useRef, useState } from 'react';
import { pokemonApi } from '../api/pokemonApi';
import {
    PokemonPaginatedResponse,
    Result,
    SinglePokemon,
} from '../interfaces/pokemonInterfaces';
import AsyncStorage from '@react-native-community/async-storage'
import { useSelector } from 'react-redux';

export const usePokemonFav = (id: string) => {
    // console.log('id: ', id);
    const fav_list = useSelector((state: any) => state.favourate);
    let isFavrorite;
    if (fav_list.favourateList.length == 0) {
        isFavrorite = false
    } else {
        fav_list.favourateList.filter((item) => {
            if (item.id == id) {
                isFavrorite = true
            }
        })
    }



    return {
        isFavrorite,
    };
};
