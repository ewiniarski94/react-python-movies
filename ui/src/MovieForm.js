import {useState} from "react";
import { useSpring, animated, config } from '@react-spring/web';

export default function MovieForm(props) {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [actors, setActors] = useState('');
    const [director, setDirector] = useState('');
    const [description, setDescription] = useState('');
    const styles = useSpring({
        from: { opacity: 0, transform: 'translateY(-20px)' },
        to: { opacity: 1, transform: 'translateY(0px)' },
        config: config.gentle
    });

    function addMovie(event) {
        event.preventDefault();
        props.onMovieSubmit({title, year, actors, director, description});
        setTitle('');
        setYear('');
        setActors('');
        setDirector('');
        setDescription('');
    }

    return <animated.form style={styles} onSubmit={addMovie}>
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
    </animated.form>;
}
