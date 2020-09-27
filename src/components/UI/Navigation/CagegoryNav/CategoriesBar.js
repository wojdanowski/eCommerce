import React from 'react';
import classes from './CategoriesBar.module.scss';
import SubCategoriesList from './SubCategoriesList/SubCategoriesList';

const CategoriesBar = () => {
	return (
		<div className={classes.categoriesBar}>
			<div className={classes.allCategories}>
				<ul className={classes.categoryName}>
					<li>
						<SubCategoriesList />
					</li>
					<li>
						<SubCategoriesList />
					</li>
					<li>
						<SubCategoriesList />
					</li>
				</ul>
			</div>
			<p> rest rest rest </p>
		</div>
	);
};

export default CategoriesBar;
