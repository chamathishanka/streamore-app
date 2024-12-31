import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SongListState {
    songIds: number[];
    currentSongIndex: number;
}

interface SetSongListPayload {
    songIds: number[];
    currentSongIndex?: number;
}

const initialState: SongListState = {
    songIds: [],
    currentSongIndex: 0,
};

const songListSlice = createSlice({
    name: 'songList',
    initialState,
    reducers: {
        setSongList(state, action: PayloadAction<SetSongListPayload>) {
            state.songIds = action.payload.songIds;
            if (action.payload.currentSongIndex !== undefined) {
                state.currentSongIndex = action.payload.currentSongIndex;
            }
        },
        setCurrentSongIndex(state, action: PayloadAction<number>) {
            state.currentSongIndex = action.payload;
        },
        nextSong(state) {
            if (state.currentSongIndex < state.songIds.length - 1) {
                state.currentSongIndex += 1;
            }
        },
        prevSong(state) {
            if (state.currentSongIndex > 0) {
                state.currentSongIndex -= 1;
            }
        },
    },
});

export const { setSongList, setCurrentSongIndex, nextSong, prevSong } = songListSlice.actions;
export default songListSlice.reducer;