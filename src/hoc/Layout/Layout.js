import React from 'react';
import Aux from './../Auxiliary/Auxiliary';
import Toolbar from './../../components/Toolbar/Toolbar';

const Layout = (props) => {
	return (
		<Aux>
			<Toolbar />
			<main>{props.children}</main>
		</Aux>
	);
};

export default Layout;
