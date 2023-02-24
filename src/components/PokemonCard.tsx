import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  Image,
} from 'react-native';
import React from 'react';
//* Background color card
import ImageColors from 'react-native-image-colors';
import {SinglePokemon} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';
import {useState, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

interface Props {
  pokemon: SinglePokemon;
}

export const PokemonCard = ({pokemon}: Props) => {
  //* Background color card
  const [bgColor, setBgColor] = useState('grey');

  //* Problema con la actualizacion del estado
  const isMounted = useRef(true);

  //* Navigation
  const navigation = useNavigation();

  //* Background color card
  useEffect(() => {
    ImageColors.getColors(pokemon.picture, {fallback: 'grey'}).then(colors => {
      //* Problema con la actualizacion del estado
      if (!isMounted.current) return;

      if (colors.platform === 'android') {
        setBgColor(colors.dominant || 'grey');
      } else {
        setBgColor(colors.background || 'grey');
      }
    });
    //* ios background color
    //* Android dominant color
    //* Problema con la actualizacion del estado
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      /* Send the info about the pokemon */
      onPress={() =>
        navigation.navigate('PokemonScreen', {
          singlePokemon: pokemon,
          color: bgColor,
        })
      }>
      <View
        style={{
          ...styles.cardContainer,
          width: windowWidth * 0.4,
          backgroundColor: bgColor,
        }}>
        {/* Nombre pokemon y ID */}
        <View>
          <Text style={styles.name}>
            {pokemon.name}
            {'\n#' + pokemon.id}
          </Text>
        </View>
        {/* Image */}
        <View style={styles.pokebolaContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>
        <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -25,
    bottom: -25,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -5,
    bottom: -5,
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5,
  },
});
