import React from 'react';
import classes from './EditStatus.module.scss';

const EditStatus = (props) => {
	const editStatusVisible = props.isEdited
		? classes.visible
		: classes.invisible;
	const editedStatus = (
		<span className={`${classes.editedTag} ${editStatusVisible}`}>
			Edited!
		</span>
	);

	return editedStatus;
};

export default EditStatus;
