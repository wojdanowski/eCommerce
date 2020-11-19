import React from 'react';
import classes from './MainHeader.module.scss';
import { IconContext } from 'react-icons';
import { SiShopify } from 'react-icons/si';

const MainHeader = () => {
	return (
		<header className={classes.mainHeader}>
			<div className={classes.LogoContainer}>
				<IconContext.Provider
					value={{
						size: '10rem',
						color: '#fc955e	',
					}}
				>
					<SiShopify />
				</IconContext.Provider>
			</div>
			<h1>Vintage Lump</h1>
		</header>
	);
};

export default MainHeader;
