import * as React from 'react';
import createPersistedState from 'use-persisted-state';
import { FavoriteToggleProps } from '../models/proptypes';
import { FavoritesData, User } from '../models/types';

const useUserState = createPersistedState('user');
const useFavoritesState = createPersistedState('favorites');

const FavoriteToggle: React.FC<FavoriteToggleProps> = (props) => {
	const [favorites, setFavorites] = useFavoritesState<FavoritesData>({});
	const [user, _] = useUserState<User>();

	if (!user) {
		return <React.Fragment />;
	}

	const toggle = React.useCallback(() => {
		if (!favorites ||!user) return false;

		const favs = { ...favorites };

		if (user.userId in favs && props.movieId in favs[user.userId]) {
			delete favs[user.userId][props.movieId];
		} else {
			favs[user.userId] = favs?.userId ?? {};
			favs[user.userId][props.movieId] = props.media_type;
		}

		setFavorites(favs);
	}, [favorites, user]);

	const icons = (
		<div>
			<i className="fa fa-fw fa-heart"></i>
			<i className="fa fa-fw fa-check"></i>
		</div>
	);

	if (!props.full) {
		return (
			<div
				className="ListToggle"
				onClick={toggle}
				data-toggled={`${!!favorites?.[user.userId]?.[props.movieId]}`}
			>
				{icons}
			</div>
		);
	} else {
		<div
			className="Buton FavoriteToggleFull"
			onClick={toggle}
			data-primary={false}
			data-toggled={`${!!favorites?.[user.userId]?.[props.movieId]}`}
		>
			{icons}
			Add to favorites
		</div>
	}
};

export default FavoriteToggle;
