import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { useDispatch, useSelector } from 'react-redux';

export default function FavoriteScreen() {
  const fav_list = useSelector((state: any) => state.favourate);
  console.log('fav_list: ', fav_list.favourateList);

  useEffect(() => {
    // getFavList()
  }, []);

  const getFavList = async () => {
    let data = await AsyncStorage.getItem('fav_list')
    // console.log('---->>', data);
  }

  return (
    <View>
      <Text>FavoriteScreen</Text>
    </View>


  )
}