import React from 'react';
import classes from './CategoriesBar.module.scss';
import SearchTools from '../UI/SearchTools/SearchTools';

const CategoriesBar = () => {
	return (
		<div className={classes.categoriesBar}>
			{/* <div className={classes.categoriesContainer}>
				<Categories />
			</div> */}
			<SearchTools />
		</div>
	);
};

export default CategoriesBar;
