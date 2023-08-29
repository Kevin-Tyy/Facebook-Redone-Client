import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./features/AuthSlice";
import storage from "redux-persist/lib/storage";
import NotificationSlice from "./features/Notification";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
const rootReducer = combineReducers({
    auth : AuthSlice,
	notifications : NotificationSlice,
});
const persistConfig = {
	key: "root",
	version: 1,
	storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});
const persistor = persistStore(store);

export { store, persistor };
