import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/Navigator';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetail } from '../components/PokemonDetail';
import FavoriteScreen from './FavoriteScreen';
import { usePokemonFav } from '../hooks/usePokemonFav';
import { useDispatch } from 'react-redux';
import { addToFav, removeToFav } from '../store/favourate';

//* Con el argumento de tipo podemos recibir los argumentos que se envian desde el componente Navigator
interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> { }

export const PokemonScreen = ({ navigation, route }: Props) => {
  const dispatch = useDispatch()
  //console.log(JSON.stringify(route.params, null, 5));

  const { singlePokemon, color } = route.params;
  const { id, name, picture } = singlePokemon;
  //* Use this for iOS devices
  const { top } = useSafeAreaInsets();

  //* Use custom pokemon hook
  const { isLoading, pokemon } = usePokemon(id);
  const { isFavrorite } = usePokemonFav(id);

  const favourateFunc = () => {
    if (isFavrorite == true) {
      dispatch(removeToFav(id))
    } else {
      dispatch(addToFav(singlePokemon))
    }
  }


  return (
    <View style={{ flex: 1 }}>
      <View style={{ ...styles.headerContainer, backgroundColor: color }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 22 }}>

          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.pop()}><Icon name="arrow-back-outline" color="white" size={35} /></TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} onPress={() => favourateFunc()}>
            <Icon name={isFavrorite == true ? "heart-sharp" : "heart-outline"} color="white" size={35} />
          </TouchableOpacity>

        </View>
        <Text style={{ ...styles.pokemonName, top: top + 40 }}>{name + '\n'} #{id}</Text>
        <Image source={require('../assets/pokebola-blanca.png')} style={styles.pokeBall} />
        <FadeInImage uri={picture} style={styles.pokemonImage} />
      </View>
      {/* Detalles y Loading */}
      {isLoading ? (
        <View style={styles.loadingIndicator}><ActivityIndicator color={color} size={50} /></View>
      ) : (<PokemonDetail pokemon={pokemon} />)}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    // alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 50,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    textTransform: 'capitalize',
    left: 20,
  },
  pokeBall: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15,
  },
  loadingIndicator: {
    flex: 1,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
