import { Text, Image, FlatList, View } from 'react-native';
import React from 'react';
import { styles } from '../theme/apptheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { ActivityIndicator } from 'react-native';
import { FadeInImage } from '../components/FadeInImage';
import { PokemonCard } from '../components/PokemonCard';

export const HomeScreen = () => {
  //* Code to take care of nodge on iOS devices
  const { top } = useSafeAreaInsets();

  //* Call custom hook
  const { simplePokemonList, loadPokemons } = usePokemonPaginated();

  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokebolaBG}
      />
      {/*      */}
      {/* Try this code in renderItem */}
      {/* <FadeInImage uri={item.picture} style={{width: 100, height: 100}} /> */}
      <View
      // style={{...styles.globalMargin, alignItems: 'center'}}
      >
        <FlatList
          data={simplePokemonList}
          keyExtractor={pokemon => pokemon.id}
          showsVerticalScrollIndicator={false}
          numColumns={3}
          // ListHeaderComponent={
          //   <Text
          //     style={{
          //       ...styles.title,
          //       ...styles.globalMargin,
          //       // top: top + 20,
          //       // marginBottom: top + 20,
          //       paddingBottom: 10,
          //     }}>
          //     Pokedex
          //   </Text>
          // }
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
          //infinity scroll
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          //ActivityIndicator
          ListFooterComponent={
            <ActivityIndicator style={{ height: 100 }} size={20} color="grey" />
          }
        />
      </View>
    </>
  );
};
