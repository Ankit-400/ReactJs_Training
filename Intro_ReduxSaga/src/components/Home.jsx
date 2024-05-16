import { useDispatch } from "react-redux"
import { getMovies } from "../../redux/feature/movieSlice";
import { useSelector } from "react-redux";
import React, { useRef } from "react";

function Home() {
    const movieStore = useSelector(state => state.movie);
    const { Search: listOfMovies } = movieStore.movieList;
    const dispatch = useDispatch();

    const movieName = useRef();

    return <>
        <h3>Home</h3>
        <input
            type="text"
            ref={movieName}
            style={
                {
                    border: '2px solid black',
                    boxShadow: '2px -0.5px 10px 10px grey',
                    width: '100px',
                    height: '30px',
                    padding: '2px',
                    margin: '10px auto'
                }
            }
        />
        <button onClick={() => {
            dispatch(getMovies({ payload: movieName.current.value }))
        }}>
            Fetch movie
        </button>
        {

            listOfMovies && listOfMovies.map((movie) => {
                return (
                    <div key={movie.Title} style={{ display: 'flex', justifyContent: 'center' }}>
                        <p><b>Title :</b> {movie.Title}</p>
                    </div>
                )
            })
        }
    </>
}

export default Home

