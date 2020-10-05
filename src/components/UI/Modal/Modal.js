import React, { Fragment } from 'react';
import classes from './Modal.module.scss';
import Backdrop from './../Backdrop/Backdrop';
import CloseButton from './../Buttons/CloseButton/CloseButton';

const Modal = (props) => {
	return (
		<Fragment>
			<Backdrop show={props.show} clicked={props.modalClosed} />
			<div
				className={`${classes.Modal} shadowBox`}
				style={{
					transform: props.show
						? 'translateY(0)'
						: 'translateY(-100vh)',
					opacity: props.show ? '1' : '0',
				}}
			>
				<CloseButton clicked={props.modalClosed} />
				{props.children}
			</div>
		</Fragment>
	);
};

export default Modal;
