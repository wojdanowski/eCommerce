import React from 'react';
import { Switch, Route } from 'react-router-dom';

import DashboardLayout from './../hoc/DashboardLayout/DashboardLayout';
import MainDashboard from './../components/Admin/MainDashboard/MainDashboard';
import ListScreen from './Admin/ListScreen/ListScreen';

const DashboardRouter = ({ match }) => {
	return (
		<DashboardLayout>
			<Switch>
				<Route path={match.url} exact component={MainDashboard} />
				<Route path={`${match.url}/`} component={ListScreen} />
				{/* <Route
					path={`${match.url}/orders`}
					exact={true}
					component={OrdersScreen}
				/> */}
			</Switch>
		</DashboardLayout>
	);
};

export default DashboardRouter;
