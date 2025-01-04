import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlaylistState {
    selectedPlaylistId: number | null;
}

const initialState: PlaylistState = {
    selectedPlaylistId: null,
};

const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        selectPlaylist(state, action: PayloadAction<number>) {
            state.selectedPlaylistId = action.payload;
        },
        resetPlaylist(state) {
            state.selectedPlaylistId = null;
        },
    },
});

export const { selectPlaylist, resetPlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;