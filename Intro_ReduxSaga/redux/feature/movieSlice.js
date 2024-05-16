import { createSlice } from '@reduxjs/toolkit'

const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        movieList: [],
        movie: {}
    },
    reducers: {
        getMovies(state) {
            console.log('returning state as it is..');
            return state;
        },
        setMovies: (state, action) => {
            state.movieList = action.payload;
        }
    }
});

export const { getMovies, setMovies } = movieSlice.actions;
export default movieSlice.reducer;