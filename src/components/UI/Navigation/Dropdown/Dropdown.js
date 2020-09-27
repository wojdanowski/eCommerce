import React from 'react';
import classes from './Dropdown.module.scss';

const Dropdown = () => {
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

export default Dropdown;
