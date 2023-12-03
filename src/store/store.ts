import { applyMiddleware, combineReducers, configureStore, createStore } from "@reduxjs/toolkit"; 
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import addToFavSlice  from "./favourate";
import AsyncStorage from "@react-native-community/async-storage";

 



const persistConfig = {
  key: 'root',
  storage:AsyncStorage,
}

const reducer = combineReducers({
    favourate:addToFavSlice,
});
const persistedReducer = persistReducer(persistConfig, reducer)


export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export const persistor = persistStore(store)