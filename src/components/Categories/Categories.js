import React from 'react';
import classes from './Categories.module.scss';
import Dropdown from './../UI/Navigation/Dropdown/Dropdown';
import Aux from './../../hoc/Auxiliary/Auxiliary';

const Categories = () => {
	return (
		<Aux>
			<div className={classes.infoForMobile}>
				<span>Categories:</span>
			</div>
			<ul className={classes.categoryName}>
				<li>
					<Dropdown />
				</li>
				<li>
					<Dropdown />
				</li>
				<li>
					<Dropdown />
				</li>
			</ul>
		</Aux>
	);
};

export default Categories;
