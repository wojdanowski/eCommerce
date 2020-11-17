import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './../hoc/Layout/Layout';
import Checkout from './../components/Checkout/Checkout';
import MainPage from './../components/MainPage/MainPage';
import CheckoutForm from './CheckoutForm/CheckoutForm';
import Logout from './Auth/Logout';

const HomeRouter = ({ match }) => {
	return (
		<Layout>
			<Switch>
				<Route path={match.url} exact={true} component={MainPage} />
				<Route
					path={`${match.url}logout`}
					exact={true}
					component={Logout}
				/>
				<Route
					path={`${match.url}checkout`}
					exact={true}
					component={Checkout}
				/>
				<Route
					path={`${match.url}checkout/shipping`}
					component={CheckoutForm}
				/>
			</Switch>
		</Layout>
	);
};

export default HomeRouter;
