import React, { useState } from 'react';
import Aux from './../Auxiliary/Auxiliary';
import Toolbar from './../../components/Toolbar/Toolbar';
import Sidebar from './../../components/UI/Sidebar/Sidebar';
import MainNav from './../../components/UI/Navigation/MainNav/MainNav';
import Categories from './../../components/Categories/Categories';

const Layout = (props) => {
	const [leftSidebarVisible, setLeftSidebarVisible] = useState(false);
	const [rightSidebarVisible, setRightSidebarVisible] = useState(true);

	const toggleLeftSidebarHandler = () => {
		setLeftSidebarVisible((prevState) => !prevState);
	};

	const toggleRightSidebarHandler = () => {
		setRightSidebarVisible((prevState) => !prevState);
	};

	return (
		<Aux>
			<Sidebar
				side='left'
				isOpen={leftSidebarVisible}
				toggleSidebar={toggleLeftSidebarHandler}
			>
				<MainNav />
				<Categories />
			</Sidebar>
			<Sidebar
				side='right'
				isOpen={rightSidebarVisible}
				toggleSidebar={toggleRightSidebarHandler}
			>
				<p>Basket</p>
			</Sidebar>

			<Toolbar toggleSidebar={toggleLeftSidebarHandler} />
			<main>{props.children}</main>
		</Aux>
	);
};

export default Layout;
