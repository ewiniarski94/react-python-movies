import MovieListItem from "./MovieListItem";
import {useTransition, animated, config} from '@react-spring/web';

const animation = {
    from: {
        opacity: 0,
        transform: 'translate3d(-40px,0,0)',
        height: 0,
    },

    enter: {
        opacity: 1,
        transform: 'translate3d(0,0,0)',
        height: 'auto',
    },

    leave: {
        opacity: 0,
        height: 0,
        marginBottom: 0,
    },
    config: config.gentle,
    trail: 100
}

export default function MoviesList(props) {
    const transitions = useTransition(props.movies, {
        keys: movie => movie.id,
        ...animation
    });

    return (
        <div>
            <h2>Movies</h2>
            <ul className="movies-list" style={{listStyle: 'none', padding: 0}}>
                {transitions((style, movie) => (
                    <animated.li style={{...style, overflow: 'hidden'}}>
                        <MovieListItem
                            movie={movie}
                            onDelete={() => props.onDeleteMovie(movie)}/>
                    </animated.li>
                ))}
            </ul>
        </div>
    );
}
