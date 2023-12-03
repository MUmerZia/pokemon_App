import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
//import {Navigator} from './src/navigator/Navigator';
import { Tabs } from './src/navigator/Tabs';
import { Provider } from "react-redux";
import persistStore from 'redux-persist/es/persistStore';
import { store } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';

let persistor = persistStore(store)

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Tabs />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
