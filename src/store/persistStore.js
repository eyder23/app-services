import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import appReducer from "./slices/appSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

const reducers = combineReducers({
  user: userReducer,
  appState: appReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  // blacklist: ["appState"],
  whitelist: ["user", "appState"],
};

const _persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: _persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

const persistor = persistStore(store);
export { persistor, store };
