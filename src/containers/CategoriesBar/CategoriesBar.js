import React from 'react';
import classes from './CategoriesBar.module.scss';
import Dropdown from '../../components/UI/Navigation/Dropdown/Dropdown';

const CategoriesBar = () => {
	return (
		<div className={classes.categoriesBar}>
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

			<p> rest rest rest </p>
		</div>
	);
};

export default CategoriesBar;
