import { HelmetProvider } from 'react-helmet-async';
import Main from '../../pages/main/main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Favorites } from '../../pages/favorites/favorites';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Login } from '../../pages/login/login';
import { Offer } from '../../pages/offer/offer';
import PrivateRoute from '../private-route/private-route';
import NotFoundPage from '../not-found-page/not-found-page';

type AppScreenProps = {
  offersCount: number;
}

function App({offersCount}: AppScreenProps): JSX.Element {
	return (
		<HelmetProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path={AppRoute.Root}
						element={<Main offersCount={offersCount} />}
					/>
					<Route
						path={AppRoute.Favorites}
						element={
							<PrivateRoute
								restrictedFor={AuthorizationStatus.NoAuth}
								redirectTo={AppRoute.Login}
							>
								<Favorites />
							</PrivateRoute>
						}
					/>
					<Route
						path={AppRoute.Login}
						element={
							<PrivateRoute
								restrictedFor={AuthorizationStatus.Auth}
								redirectTo={AppRoute.Root}
							>
								<Login />
							</PrivateRoute>
						}
					/>
					<Route
						path={`${AppRoute.Offer}/:offerId`} element={<Offer />}
					/>
					<Route path="*" element={<NotFoundPage/>} />
				</Routes>
			</BrowserRouter>
		</HelmetProvider>
	);
}

export default App;
