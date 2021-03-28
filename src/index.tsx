import * as React from 'react';
import { PiletApi } from '@paquitosoft/netflix-piral';
import { Link } from 'react-router-dom';
import FavoriteToggle from './components/FavoriteToggle';
import './style.scss';
import { MovieTileProps } from './models/proptypes';

export function setup(app: PiletApi) {
//   app.showNotification('Hello from Piral!', {
//     autoClose: 2000,
//   });
//   app.registerMenu(() =>
//     <a href="https://docs.piral.io" target="_blank">Documentation</a>
//   );
//   app.registerTile(() => <div>Welcome to Piral!</div>, {
//     initialColumns: 2,
//     initialRows: 1,
//   });

	app.registerMenu('Favorites', () => <Link to="/favorites">Favorites</Link>);

	const MovieTile: React.FC<MovieTileProps> = props => <app.Extension name="MovieTile" params={props} />;
	const Favorites = React.lazy(() => import('./components/Favorites'));
	app.registerPage('/favorites', () => <Favorites MovieTile={MovieTile} />);

	app.registerExtension('ListToggle', props => <FavoriteToggle {...props.params}/>);
}
