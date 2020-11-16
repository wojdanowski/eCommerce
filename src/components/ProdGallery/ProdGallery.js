import React from 'react';
import ImageGallery from 'react-image-gallery';
import classes from './ProdGallery.module.scss';

const ProdGallery = (props) => {
	const imagesToLoad =
		props.images &&
		props.images.map((image) => {
			return {
				original: image,
				thumbnail: image,
				originalClass: classes.prodGalImg,
			};
		});

	return (
		<ImageGallery
			items={imagesToLoad}
			thumbnailPosition={'left'}
			showFullscreenButton={false}
			showPlayButton={false}
			showBullets={true}
			showNav={false}
			slideDuration={200}
			additionalClass={classes.prodGalleryRoot}
		/>
	);
};

export default ProdGallery;
