import * as React from 'react';
import { FavoriteProps, MovieTileProps } from '../models/proptypes';
import { ApiDataEntry } from '../models/types';

const apiKey = '87dfa1c669eea853da609d4968d294be';

const Favorite: React.FC<FavoriteProps> = (props) => {
	const [data, setData] = React.useState<ApiDataEntry>(null);

	const loadContent = () => {
		const requestUrl = `https://api.themoviedb.org/3/${props.media_type}/${props.id}?api_key=${apiKey}`;

		fetch(requestUrl)
			.then(res => res.json())
			.then(data => setData(data))
			.catch(console.error);
	};

	React.useEffect(() => {
		loadContent();
	}, [props.id]);

	if (!data) return <React.Fragment />

	const movieTileProps: MovieTileProps = createMovieTileProps(data);
	return (
		<props.MovieTile {...movieTileProps} />
	)
};

export default Favorite;

const createMovieTileProps = (title: ApiDataEntry) => ({
	media_type: title.media_type,
	movieId: title.id,
	title: title.name || title.original_title,
	score: title.vote_average,
	overview: title.overview,
	backdrop: `http://image.tmdb.org/t/p/original${title.backdrop_path}`,
});
