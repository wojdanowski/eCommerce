import React from 'react';
import classes from './CategoriesBar.module.scss';
import Dropdown from '../../components/UI/Navigation/Dropdown/Dropdown';
import SearchTools from './../../components/UI/SearchTools/SearchTools';

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
			<SearchTools />
		</div>
	);
};

export default CategoriesBar;
