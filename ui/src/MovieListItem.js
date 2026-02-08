export default function MovieListItem(props) {
    return (
        <div>
            <div>
                <strong>{props.movie.title}</strong>
                {' '}
                <span>({props.movie.year})</span>
                {' '}
                <span>directed by {props.movie.director}</span>
                {' '}
            </div>
            <div>
                <strong>Actors:</strong> {props.movie.actors}
            </div>
            <div>
                <strong>Description:</strong> {props.movie.description}
            </div>
            <div style={{display: 'flex', gap: '20px', marginTop: '10px'}}>
                <button onClick={props.onDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
}
