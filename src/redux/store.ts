import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./features/AuthSlice";
import storage from 'redux-persist/lib/storage'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};
const persistedReducer = persistReducer(persistConfig, AuthSlice);
const store = configureStore({
	reducer: {
		auth: persistedReducer,
	},
	middleware: (getDefaultMiddleware) =>
	getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	}),
});
const persistor = persistStore(store);

export { store, persistor };