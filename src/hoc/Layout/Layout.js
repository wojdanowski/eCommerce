import React from 'react';
import Aux from './../Auxiliary/Auxiliary';
import Toolbar from './../../components/Toolbar/Toolbar';
import Sidebar from './../../components/UI/Sidebar/Sidebar';

const Layout = (props) => {
	return (
		<Aux>
			<Sidebar />
			<Toolbar />
			<main>{props.children}</main>
		</Aux>
	);
};

export default Layout;
