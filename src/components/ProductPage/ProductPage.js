import React from 'react';
import classes from './ProductPage.module.scss';
import GenericButton from './../UI/Buttons/GenericButton/GenericButton';
import ProdGallery from './../ImageGallery/ProdGallery';

const ProductPage = (props) => {
	return (
		<div className={classes.prodPageContainer}>
			<div className={classes.firstRow}>
				<div className={classes.imgGalleryContainer}>
					<ProdGallery />
				</div>
				<div className={classes.description}>
					<div className={classes.shortDescription}>
						<div className={classes.nameAndPrice}>
							<h1>{props.prodData.name}</h1>
							<h3>PRICE: {props.prodData.price}</h3>
							<h4 className='textLineThrough'>
								OLD PRICE: {props.prodData.oldPrice}
							</h4>
							<p>{props.prodData.shortDescription}</p>
						</div>
						<GenericButton label='Add To Cart' />
					</div>
					<div className={classes.fullDescription}>
						{/* <p>{props.prodData.fullDescription}</p> */}
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing
							elit. Doloribus, possimus. Quidem suscipit non error
							commodi adipisci placeat temporibus doloribus,
							itaque sunt quod nisi, hic rem. Quibusdam quas
							deserunt suscipit dolore quidem deleniti doloremque
							placeat voluptates eligendi nihil delectus minus
							dicta ab modi libero, laborum, voluptate inventore
							atque odit assumenda quaerat architecto. Assumenda
							vel amet incidunt? Incidunt nostrum neque dolores
							eligendi libero illum, facere facilis numquam in
							eius officia ratione aliquid necessitatibus
							temporibus repudiandae dolorum velit odio fugiat a
							voluptate voluptates, laborum debitis? Similique id
							qui perferendis quod, asperiores ut blanditiis a
							assumenda dolore quia voluptatum obcaecati eum
							nesciunt eligendi! Obcaecati?
						</p>
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing
							elit. Doloribus, possimus. Quidem suscipit non error
							commodi adipisci placeat temporibus doloribus,
							itaque sunt quod nisi, hic rem. Quibusdam quas
							deserunt suscipit dolore quidem deleniti doloremque
							placeat voluptates eligendi nihil delectus minus
							dicta ab modi libero, laborum, voluptate inventore
							atque odit assumenda quaerat architecto. Assumenda
							vel amet incidunt? Incidunt nostrum neque dolores
							eligendi libero illum, facere facilis numquam in
							eius officia ratione aliquid necessitatibus
							temporibus repudiandae dolorum velit odio fugiat a
							voluptate voluptates, laborum debitis? Similique id
							qui perferendis quod, asperiores ut blanditiis a
							assumenda dolore quia voluptatum obcaecati eum
							nesciunt eligendi! Obcaecati?
						</p>
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing
							elit. Doloribus, possimus. Quidem suscipit non error
							commodi adipisci placeat temporibus doloribus,
							itaque sunt quod nisi, hic rem. Quibusdam quas
							deserunt suscipit dolore quidem deleniti doloremque
							placeat voluptates eligendi nihil delectus minus
							dicta ab modi libero, laborum, voluptate inventore
							atque odit assumenda quaerat architecto. Assumenda
							vel amet incidunt? Incidunt nostrum neque dolores
							eligendi libero illum, facere facilis numquam in
							eius officia ratione aliquid necessitatibus
							temporibus repudiandae dolorum velit odio fugiat a
							voluptate voluptates, laborum debitis? Similique id
							qui perferendis quod, asperiores ut blanditiis a
							assumenda dolore quia voluptatum obcaecati eum
							nesciunt eligendi! Obcaecati?
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductPage;
