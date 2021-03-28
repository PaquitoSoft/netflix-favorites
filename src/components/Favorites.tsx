import * as React from 'react';
import createPersistedState from 'use-persisted-state';
import { FavoritesProps } from '../models/proptypes';
import { FavoritesData, User } from '../models/types';
import Favorite from './Favorite';
import { NoFavs, NoUser } from './Messages';

const useFavoritesState = createPersistedState('favorites');
const useUserState = createPersistedState('user');

const Favorites: React.FC<FavoritesProps> = (props) => {
	const [favorites, _]: [FavoritesData, any] = useFavoritesState({});
  	const [user, __]: [User, any] = useUserState();

	if (!user) return <NoUser />;
	if (!userHasFavorites(favorites, user)) return <NoFavs />;

	const tiles = Object.entries(favorites[user.userId]).map(([userId, mediaType]) => {
		<Favorite
			key={userId}
			id={userId}
			media_type={mediaType}
			MovieTile={props.MovieTile}
		/>
	});

	return (
		<div className="Favorites">{tiles}</div>
	);
};

export default Favorites;

const userHasFavorites = (favorites: FavoritesData, user: User) =>
	favorites?.[user.userId] && // the user is in storage
	Object.keys(favorites[user.userId]).length > 0; // the user has more than 0 favorites
