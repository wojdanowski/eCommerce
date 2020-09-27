import React from 'react';
import classes from './CategoriesBar.module.scss';
import SearchTools from './../../components/UI/SearchTools/SearchTools';
import Categories from './../../components/Categories/Categories';

const CategoriesBar = () => {
	return (
		<div className={classes.categoriesBar}>
			<div className={classes.categoriesContainer}>
				<Categories />
			</div>
			<SearchTools />
		</div>
	);
};

export default CategoriesBar;
