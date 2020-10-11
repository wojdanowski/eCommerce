import React from 'react';
import ImageGallery from 'react-image-gallery';
import classes from './ProdGallery.module.scss';

const ProdGallery = () => {
	const images = [
		{
			original: 'https://source.unsplash.com/random/500x800',
			thumbnail: 'https://source.unsplash.com/random/500x800',
			originalClass: classes.prodGalImg,
		},
		{
			original: 'https://source.unsplash.com/random/500x800',
			thumbnail: 'https://source.unsplash.com/random/500x800',
			originalClass: classes.prodGalImg,
		},
		{
			original: 'https://source.unsplash.com/random/500x800',
			thumbnail: 'https://source.unsplash.com/random/500x800',
			originalClass: classes.prodGalImg,
		},
		{
			original: 'https://source.unsplash.com/random/500x800',
			thumbnail: 'https://source.unsplash.com/random/500x800',
			originalClass: classes.prodGalImg,
		},
		{
			original: 'https://source.unsplash.com/random/500x800',
			thumbnail: 'https://source.unsplash.com/random/500x800',
			originalClass: classes.prodGalImg,
		},
		{
			original: 'https://source.unsplash.com/random/500x800',
			thumbnail: 'https://source.unsplash.com/random/500x800',
			originalClass: classes.prodGalImg,
		},
		{
			original: 'https://source.unsplash.com/random/500x800',
			thumbnail: 'https://source.unsplash.com/random/500x800',
			originalClass: classes.prodGalImg,
		},
		{
			original: 'https://source.unsplash.com/random/500x800',
			thumbnail: 'https://source.unsplash.com/random/500x800',
			originalClass: classes.prodGalImg,
		},
	];

	return (
		<ImageGallery
			items={images}
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
