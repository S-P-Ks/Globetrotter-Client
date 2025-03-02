// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { cityAPI } from './features/cityApi';
import { userAPI } from './features/userApi';

export const store = configureStore({
    reducer: {
        [cityAPI.reducerPath]: cityAPI.reducer,
        [userAPI.reducerPath]: userAPI.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cityAPI.middleware).concat(userAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector