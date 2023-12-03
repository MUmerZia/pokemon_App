import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Navigator} from './Navigator';
import {SearchScreens} from '../screens/SearchScreens';
import Icon from 'react-native-vector-icons/Ionicons';
import FavoriteScreen from '../screens/FavoriteScreen';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderWidth: 0,
          elevation: 0,
          height: 70,
          position: 'absolute',
          backgroundColor: 'rgba(255,255,255,0.92)',
        },
      }}
      sceneContainerStyle={{
        backgroundColor: 'white',
      }}
      tabBarOptions={{
        activeTintColor: '#5856D6',
        labelStyle: {
          marginBottom: 10,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={Navigator}
        options={{
          tabBarLabel: 'Listado',
          tabBarIcon: ({color}) => (
            <Icon name="list-outline" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{
          tabBarLabel: 'Listado',
          tabBarIcon: ({color}) => (
            <Icon name="list-outline" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreens}
        options={{
          tabBarLabel: 'Busqueda',
          tabBarIcon: ({color}) => (
            <Icon name="search-outline" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
