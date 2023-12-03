import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {PokemonScreen} from '../screens/PokemonScreen';
import {SinglePokemon} from '../interfaces/pokemonInterfaces';
import FavoriteScreen from '../screens/FavoriteScreen';

//* Recibir argumentos en los props
export type RootStackParams = {
  HomeScreen: undefined;
  PokemonScreen: {singlePokemon: SinglePokemon; color: string};
};
//*Asignar el tipo de argumentos que recibe el componente
const Stack = createStackNavigator<RootStackParams>();

export const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
      <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
    </Stack.Navigator>
  );
};
