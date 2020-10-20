import React from 'react';

import classes from './Input.module.scss';

const Input = (props) => {
	let inputElement = null;

	switch (props.elementType) {
		case 'input':
			inputElement = (
				<input
					className={classes.inputElement}
					onChange={props.changed}
					{...props.elementConfig}
					value={props.value}
				/>
			);
			break;
		case 'textarea':
			inputElement = (
				<textarea
					className={classes.inputElement}
					onChange={props.changed}
					{...props.elementConfig}
				/>
			);
			break;
		case 'select':
			inputElement = (
				<select
					className={classes.inputElement}
					value={props.value}
					onChange={props.changed}
				>
					{props.elementConfig.options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>
			);
			break;
		default:
			inputElement = (
				<input
					className={classes.inputElement}
					{...props.elementConfig}
				/>
			);
	}

	return (
		<div className={classes.input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
		</div>
	);
};

export default Input;
