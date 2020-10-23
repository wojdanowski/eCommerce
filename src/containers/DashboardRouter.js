import React from 'react';
import { Switch, Route } from 'react-router-dom';

import DashboardLayout from './../hoc/DashboardLayout/DashboardLayout';
import ProductScreen from './../components/Admin/ProductsScreen/ProductsScreen';

const DashboardRouter = ({ match }) => {
	return (
		<DashboardLayout>
			<Switch>
				<Route
					path={match.url}
					exact={true}
					component={ProductScreen}
				/>
				<Route
					path={`${match.url}/products`}
					exact={true}
					component={ProductScreen}
				/>
			</Switch>
		</DashboardLayout>
	);
};

export default DashboardRouter;
