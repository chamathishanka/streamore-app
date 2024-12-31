import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ArtistState {
    selectedArtistId: number | null;
}

const initialState: ArtistState = {
    selectedArtistId: null,
};

const artistSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {
        selectArtist(state, action: PayloadAction<number>) {
            state.selectedArtistId = action.payload;
        },
        resetArtist(state) {
            state.selectedArtistId = null;
        },
    },
});

export const { selectArtist, resetArtist } = artistSlice.actions;
export default artistSlice.reducer;