import React from 'react';
import classes from './ProdPageEdit.module.scss';
import Input from './../../UI/Input/Input';

const ProdPageEdit = (props) => {
	const { prodData } = props;
	const saveSubmitHandler = (event) => {
		event.preventDefault();
		console.log(`[saveHandler]`);
	};

	return (
		<div className={classes.prodPageContainer}>
			<div className={classes.dropContainer}>dropZOne</div>
			<div className='utilPad_1'>
				<form className='utilMarBot_1' onSubmit={saveSubmitHandler}>
					fsdafsd
				</form>

				{/* <h1>ProdName: {prodData.name}</h1>
				<h3>ID: {prodData.id}</h3>
				<h3>PRICE: {prodData.price}</h3>
				<h3>OLD PRICE: {prodData.oldPrice}</h3> */}
			</div>
		</div>
	);
};

export default ProdPageEdit;
