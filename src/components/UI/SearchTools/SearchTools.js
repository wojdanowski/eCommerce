import React from 'react';
import classes from './SearchTools.module.scss';

const SearchTools = () => {
	return (
		<div className={classes.searchSort}>
			<div className={classes.verticalEvenItem}>
				<input type='text' placeholder='Search...' />
			</div>
			<div className={classes.verticalEvenItem}>
				<form action=''>
					<select name='' id=''>
						<option value='A-Z'>A-Z</option>
						<option value='Z-A'>Z-A</option>
						<option value='priceUp'>cena: rosnąco</option>
						<option value='priceDes'>cena: malejąco</option>
					</select>
				</form>
			</div>
			<div className={`${classes.verticalEvenItem} ${classes.noBorder}`}>
				<label htmlFor=''>Tylko dostepne:</label>
				<input type='checkbox' />
			</div>
		</div>
	);
};

export default SearchTools;
