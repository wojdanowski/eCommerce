import React from 'react';
import classes from './MainHeader.module.scss';
import logoImg from '../../assets/img/logo.png';

const MainHeader = () => {
	return (
		<header className={classes.mainHeader}>
			<div className={classes.headerContent}>
				<div className={classes.logo}>
					<img src={logoImg} alt='logo' />
					<h1>Vintage Lump</h1>
				</div>
			</div>
		</header>
	);
};

export default MainHeader;
