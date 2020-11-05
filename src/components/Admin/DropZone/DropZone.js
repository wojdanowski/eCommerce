import React, { useEffect, useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiPlusCircle } from 'react-icons/fi';
import { IconContext } from 'react-icons';

import classes from './DropZone.module.scss';
import IconButton from './../../UI/Buttons/IconButton/IconButton';

const baseStyle = {
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: '20px',
	borderWidth: 2,
	borderRadius: 2,
	borderColor: '#eeeeee',
	borderStyle: 'dashed',
	backgroundColor: '#fafafa',
	color: '#bdbdbd',
	justifyContent: 'center',
	minHeight: '200px',
	outline: 'none',

	transition: 'border .24s ease-in-out',
};

const activeStyle = {
	borderColor: '#2196f3',
};

const acceptStyle = {
	borderColor: '#00e676',
};

const rejectStyle = {
	borderColor: '#ff1744',
};

function DropZone(props) {
	const [files, setFiles] = useState([]);
	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		accept: 'image/*',
		onDrop: (acceptedFiles) => {
			setFiles(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			);
		},
	});

	const imgClickHandler = (fileName) => {
		setFiles(files.filter((file) => file.name !== fileName));
		// console.log(files.filter((file) => file.name !== fileName));
	};

	const addImgClickHandler = () => {
		console.log(`PLUS ICON CLICKED`);
	};

	const style = useMemo(
		() => ({
			...baseStyle,
			...(isDragActive ? activeStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isDragActive, isDragReject, isDragAccept]
	);

	const thumbs = files.map((file) => (
		<div className={classes.thumb} key={file.name}>
			<div
				className={classes.thumbInner}
				onClick={() => imgClickHandler(file.name)}
			>
				<img
					src={file.preview}
					className={classes.img}
					alt={'thumbImg'}
				/>
			</div>
		</div>
	));

	const addButton = (
		<div className={classes.thumb} key={'button'}>
			<div className={classes.iconButton}>
				<IconButton
					icon={<FiPlusCircle />}
					size={'2rem'}
					clicked={addImgClickHandler}
					// isDisabled={disabledStatus}
					// isRemoved={props.removed}
					// isModified={props.edited}
				/>
			</div>
		</div>
	);

	useEffect(
		() => () => {
			// Make sure to revoke the data uris to avoid memory leaks
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		},
		[files]
	);
	return (
		<section className={classes.container}>
			<div {...getRootProps({ style })}>
				<input {...getInputProps()} />
				<p>Drag 'n' drop some files here, or click to select files</p>
			</div>
			<aside className={classes.thumbsContainer}>
				{thumbs}
				{addButton}
			</aside>
		</section>
	);
}

export default DropZone;
