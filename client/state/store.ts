import { configureStore } from '@reduxjs/toolkit';
import clickReducer from '../state/slices/clickSlice';

const store = configureStore({
    reducer: {
        click: clickReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;