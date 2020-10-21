import React from 'react';
import classes from './MainNavItem.module.scss';
import { useHistory } from 'react-router-dom';

const MainNavItem = (props) => {
	const history = useHistory();
	let isCurrentClass;
	props.isCurrent
		? (isCurrentClass = classes.currentLink)
		: (isCurrentClass = null);

	let appendClass = '';

	props.direction === 'vertical'
		? (appendClass = classes.vertical)
		: (appendClass = classes.horizontal);

	const clickedHandler = (event) => {
		event.preventDefault();
		if (props.clicked) {
			props.clicked();
		} else {
			if (props.link) {
				history.push(props.link);
			} else console.log(`No link specified in component`);
		}
	};

	return (
		<li className={`${classes.navItem} ${appendClass}`}>
			<a
				href={props.link}
				className={isCurrentClass}
				onClick={clickedHandler}
			>
				{props.label}
			</a>
		</li>
	);
};

export default MainNavItem;
