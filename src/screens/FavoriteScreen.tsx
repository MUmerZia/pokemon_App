import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FadeInImage } from '../components/FadeInImage';
import { PokemonFavCard } from '../components/PokemonFavCard';

export default function FavoriteScreen() {
  const fav_list = useSelector((state: any) => state.favourate);
  // console.log('fav_list: ', fav_list.favourateList);


  return (
    <View style={{
      justifyContent: 'center',
    }}>
      <ScrollView>
        {
          fav_list.favourateList == [] ? null :
            fav_list.favourateList.map((item, index) => {
              // console.log('item: ', item);
              return (
                <PokemonFavCard pokemon={item} />
              )
            })
        }
      </ScrollView>

    </View>


  )
}