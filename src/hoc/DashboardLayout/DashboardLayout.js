import React from 'react';
import { Link } from 'react-router-dom';

import classes from './DashboardLayout.module.scss';
import Toolbar from './../../components/Toolbar/Toolbar';
import Footer from './../../components/UI/Footer/Footer';
import GenericButton from './../../components/UI/Buttons/GenericButton/GenericButton';

const DashboardLayout = (props) => {
	return (
		<div className={classes.dashboard}>
			<div className={classes.dashboardHeadNav}>
				<Toolbar isAdmin={true} />
			</div>
			<div className={classes.dashboardSideToolbar}>
				<Link to='/admin/orders'>
					<GenericButton label='Orders' />
				</Link>
				<Link to='/admin/products'>
					<GenericButton label='Products' />
				</Link>
			</div>
			<div className={classes.dashboardScreenContainer}>
				{props.children}
			</div>
			<div className={classes.dashboardFooterArea}>
				<Footer />
			</div>
		</div>
	);
};

export default DashboardLayout;
