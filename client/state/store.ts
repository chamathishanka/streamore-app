import { configureStore } from '@reduxjs/toolkit';
import clickReducer from './slices/clickSlice';
import playlistReducer from './slices/playlistSlice';
import songReducer from './slices/songSlice';
import artistReducer from './slices/artistSlice';
import songListReducer from './slices/songListSlice';

const store = configureStore({
    reducer: {
        click: clickReducer,
        playlist: playlistReducer,
        song: songReducer,
        artist: artistReducer,
        songList: songListReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;