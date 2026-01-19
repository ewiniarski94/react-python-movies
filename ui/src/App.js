import './App.css';
import {useEffect, useState} from "react";
import "milligram";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";
import Swal from 'sweetalert2';
import { confirmDelete, showSuccess } from "./utils/alerts";

function App() {
    const [movies, setMovies] = useState([]);
    const [addingMovie, setAddingMovie] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch(`/movies`);
            if (response.ok) {
                const movies = await response.json();
                setMovies(movies);
            }
        };
        fetchMovies();
    }, []);

    async function handleAddMovie(movie) {
        const response = await fetch('/movies', {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {'Content-Type': 'application/json'}
        });
        if (response.ok) {
            const movieWithId = await response.json();
            movie.id = movieWithId.id;
            setMovies([...movies, movie]);
            setAddingMovie(false);
            toast.success("Movie added correctly!");
        } else if (response.status === 422) {
            const errorData = await response.json();

            if (errorData.detail) {
                errorData.detail.forEach(err => {
                    const fieldName = err.loc[err.loc.length - 1];
                    toast.error(`Error in field: "${fieldName}": ${err.msg}`);
                });
            }
        } else {
            toast.error(`Server error! Status code: ${response.status}`);
        }
    }

    async function handleDeleteMovie(movie) {
        const result = await confirmDelete(movie.title);
        if (result.isConfirmed) {
            const url = `/movies/${movie.id}`;
            const response = await fetch(url,
                {method: 'DELETE'});
            if (response.ok) {
                setMovies(movies.filter(m => m !== movie));
                toast.success("Movie deleted!");
            }
        }
    }


    return (
        <div className="container">
            <ToastContainer position="top-right"/>
            <h1>My favourite movies to watch</h1>
            {movies.length === 0
                ? <p>No movies yet. Maybe add something?</p>
                : <MoviesList movies={movies}
                              onDeleteMovie={handleDeleteMovie}
                />}
            {addingMovie
                ? <MovieForm onMovieSubmit={handleAddMovie}
                             buttonLabel="Add a movie"
                />
                : <button onClick={() => setAddingMovie(true)}>Add a movie</button>
            }
        </div>
    );
}

export default App;
