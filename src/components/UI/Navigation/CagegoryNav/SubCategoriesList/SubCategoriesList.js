import React from 'react';
import classes from './SubCategoriesList.module.scss';

const SubCategoriesList = () => {
	return (
		<div className={`${classes.subCategoryName} ${classes.hasDropdown}`}>
			<p>Kategoria 1</p>
			<ul className={classes.dropdown}>
				<li className={classes.dropdownItem}>
					<a href='#'>dropdown1</a>
				</li>
				<li className={classes.dropdownItem}>
					<a href='#'>dropdown2</a>
				</li>
				<li className={classes.dropdownItem}>
					<a href='#'>dropdown3</a>
				</li>
			</ul>
		</div>
	);
};

export default SubCategoriesList;
