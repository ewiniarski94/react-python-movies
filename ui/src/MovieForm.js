import {useState} from "react";
import {toast} from "react-toastify";

export default function MovieForm(props) {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [actors, setActors] = useState('');
    const [director, setDirector] = useState('');
    const [description, setDescription] = useState('');

    function addMovie(event) {
        event.preventDefault();
        props.onMovieSubmit({title, year, actors, director, description});
        setTitle('');
        setYear('');
        setActors('');
        setDirector('');
        setDescription('');
    }

    return <form onSubmit={addMovie}>
        <h2>Add movie</h2>
        <div>
            <label>Tytuł</label>
            <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
        </div>
        <div>
            <label>Year</label>
            <input type="number" value={year} onChange={(event) => setYear(event.target.value)}/>
        </div>
        <div>
            <label>Actors</label>
            <input type="text" value={actors} onChange={(event) => setActors(event.target.value)}/>
        </div>
        <div>
            <label>Director</label>
            <input type="text" value={director} onChange={(event) => setDirector(event.target.value)}/>
        </div>
        <div>
            <label>Description</label>
            <textarea value={description} onChange={(event) => setDescription(event.target.value)}/>
        </div>
        <button>{props.buttonLabel || 'Submit'}</button>
    </form>;
}
