import React from 'react';
import {Dimensions, FlatList, Text} from 'react-native';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {Loading} from '../components/Loading';
import {PokemonCard} from '../components/PokemonCard';
import {SearchInput} from '../components/SearchInput';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
import {styles as globalStyles} from '../theme/apptheme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useState} from 'react';
import {SinglePokemon} from '../interfaces/pokemonInterfaces';
import {useEffect} from 'react';

const screenWidth = Dimensions.get('window').width;

export const SearchScreens = () => {
  const {top} = useSafeAreaInsets();
  const {simplePokemonList, isFetching} = usePokemonSearch();
  const [term, setTerm] = useState('');
  const [pokemonFiltered, setPokemonFiltered] = useState<SinglePokemon[]>([]);

  useEffect(() => {
    if (term.length === 0) {
      return setPokemonFiltered([]);
    }

    if (isNaN(Number(term))) {
      setPokemonFiltered(
        simplePokemonList.filter(poke =>
          poke.name.toLocaleLowerCase().includes(term.toLocaleLowerCase()),
        ),
      );
    } else {
      /*  setPokemonFiltered([simplePokemonList.find(poke => poke.id === term)!]); */
      const pokemonById = simplePokemonList.find(poke => poke.id === term);
      setPokemonFiltered(pokemonById ? [pokemonById] : []);
    }
  }, [term]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <SearchInput
        onDebounce={value => setTerm(value)}
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWidth - 40,
          top: top + 10,
        }}
      />
      <FlatList
        /*  data={simplePokemonList} */
        data={pokemonFiltered}
        keyExtractor={pokemon => pokemon.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        ListHeaderComponent={
          <Text
            style={{
              ...globalStyles.title,
              ...globalStyles.globalMargin,
              paddingBottom: 10,
              marginTop: top + 80,
            }}>
            {term}
          </Text>
        }
        renderItem={({item}) => <PokemonCard pokemon={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
