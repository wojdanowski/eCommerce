import React from 'react';

import classes from './DashboardLayout.module.scss';
import Toolbar from './../../components/Toolbar/Toolbar';
import Footer from './../../components/UI/Footer/Footer';

const DashboardLayout = (props) => {
	return (
		<div className={classes.dashboard}>
			<div className={classes.dashboardHeadNav}>
				<Toolbar />
			</div>
			<div className={classes.dashboardSideToolbar}>
				<p>Lorem ipsum dolor sit amet.</p>
				<p>Lorem ipsum dolor sit amet.</p>
				<p>Lorem ipsum dolor sit amet.</p>
				<p>Lorem ipsum dolor sit amet.</p>
				<p>Lorem ipsum dolor sit amet.</p>
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
