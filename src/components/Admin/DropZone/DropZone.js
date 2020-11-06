import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import classes from './DropZone.module.scss';
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

	const sendFilesToParent = useCallback(props.sendFilesToParent, [
		props.sendFilesToParent,
	]);

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		accept: 'image/*',
		onDrop: (acceptedFiles) => {
			const finalFiles = acceptedFiles.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
				})
			);
			setFiles(finalFiles);
			sendFilesToParent(finalFiles);
		},
	});

	const imgClickHandler = (fileName) => {
		setFiles(files.filter((file) => file.name !== fileName));
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
		</section>
	);
}

export default DropZone;
