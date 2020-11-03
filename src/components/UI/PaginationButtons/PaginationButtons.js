import React, { Fragment } from 'react';
import GenericButton from './../Buttons/GenericButton/GenericButton';
import classes from './PaginationButtons.module.scss';

const PaginationButtons = (props) => {
	return (
		<Fragment>
			<div className={classes.buttonsContainer}>
				<GenericButton
					label={'< Previous Page'}
					clicked={() => {
						props.resetChanges();
						props.fetchApi.prevPage();
					}}
					isDisabled={props.fetchApi.prevPageDisable}
				/>
				<GenericButton
					label={'Next Page >'}
					clicked={() => {
						props.resetChanges();
						props.fetchApi.nextPage();
					}}
					isDisabled={props.fetchApi.nextPageDisable}
				/>
			</div>
		</Fragment>
	);
};

export default PaginationButtons;
