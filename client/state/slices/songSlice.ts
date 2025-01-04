import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SongState {
    selectedSongId: number | null;
}

const initialState: SongState = {
    selectedSongId: null,
};

const songSlice = createSlice({
    name: 'song',
    initialState,
    reducers: {
        selectSong(state, action: PayloadAction<number>) {
            state.selectedSongId = action.payload;
        },
    },
});

export const { selectSong } = songSlice.actions;
export default songSlice.reducer;