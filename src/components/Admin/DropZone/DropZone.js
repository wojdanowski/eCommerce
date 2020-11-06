import React, { useEffect, useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiPlusCircle } from 'react-icons/fi';

import classes from './DropZone.module.scss';
import IconButton from './../../UI/Buttons/IconButton/IconButton';
import ImgThumb from './../../UI/ImgThumb/ImgThumb';

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
	minHeight: '100px',
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
		<ImgThumb
			key={file.name}
			clicked={() => imgClickHandler(file.name)}
			imgSrc={file.preview}
		/>
	));

	const addButton = (
		<div className={classes.thumb} key={'button'}>
			<div className={classes.iconButton}>
				<IconButton
					icon={<FiPlusCircle />}
					size={'2rem'}
					clicked={addImgClickHandler}
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
