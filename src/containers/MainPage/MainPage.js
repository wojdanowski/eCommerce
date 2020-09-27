import React from 'react';
import classes from './MainPage.module.scss';
import productImg from '../../assets/img/product.jpg';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import MainHeader from './../../components/MainHeader/MainHeader';
import CategoriesBar from '../CategoriesBar/CategoriesBar';

const Main = (props) => {
	return (
		<Aux>
			<MainHeader />
			<div className='utilContainer'>
				<CategoriesBar />
			</div>

			<div className='utilBigContainer'>
				<div className='utilContainer'>
					<div className={classes.productsGrid}>
						<div className={classes.productCard}>
							<div className={classes.soldTag}>
								<span>Sprzedane</span>
							</div>
							<div className={classes.prodImgContainer}>
								<img
									className={classes.productImg}
									src={productImg}
									alt='prodImg'
								/>
							</div>
							<div className={classes.prodDescription}>
								<h4>Super Spodnie</h4>
								<div className={classes.productPrice}>
									<span className={classes.beforePrice}>
										99.99 zł
									</span>
									<span className={classes.newPrice}>
										20.99 zł
									</span>
								</div>
								<a href='#' className={classes.regularButton}>
									BUTTON
								</a>
							</div>
						</div>
						<div className={classes.productCard}>
							<div className={classes.soldTag}>
								<span>Sprzedane</span>
							</div>
							<div className={classes.prodImgContainer}>
								<img
									className={classes.productImg}
									src={productImg}
									alt='prodImg'
								/>
							</div>
							<div className={classes.prodDescription}>
								<h4>Super Spodnie</h4>
								<div className={classes.productPrice}>
									<span className={classes.beforePrice}>
										99.99 zł
									</span>
									<span className={classes.newPrice}>
										20.99 zł
									</span>
								</div>
								<a href='#' className={classes.regularButton}>
									BUTTON
								</a>
							</div>
						</div>
						<div className={classes.productCard}>
							<div className={classes.soldTag}>
								<span>Sprzedane</span>
							</div>
							<div className={classes.prodImgContainer}>
								<img
									className={classes.productImg}
									src={productImg}
									alt='prodImg'
								/>
							</div>
							<div className={classes.prodDescription}>
								<h4>Super Spodnie</h4>
								<div className={classes.productPrice}>
									<span className={classes.beforePrice}>
										99.99 zł
									</span>
									<span className={classes.newPrice}>
										20.99 zł
									</span>
								</div>
								<a href='#' className={classes.regularButton}>
									BUTTON
								</a>
							</div>
						</div>
						<div className={classes.productCard}>
							<div className={classes.soldTag}>
								<span>Sprzedane</span>
							</div>
							<div className={classes.prodImgContainer}>
								<img
									className={classes.productImg}
									src={productImg}
									alt='prodImg'
								/>
							</div>
							<div className={classes.prodDescription}>
								<h4>Super Spodnie</h4>
								<div className={classes.productPrice}>
									<span className={classes.beforePrice}>
										99.99 zł
									</span>
									<span className={classes.newPrice}>
										20.99 zł
									</span>
								</div>
								<a href='#' className={classes.regularButton}>
									BUTTON
								</a>
							</div>
						</div>
						<div className={classes.productCard}>
							<div className={classes.soldTag}>
								<span>Sprzedane</span>
							</div>
							<div className={classes.prodImgContainer}>
								<img
									className={classes.productImg}
									src={productImg}
									alt='prodImg'
								/>
							</div>
							<div className={classes.prodDescription}>
								<h4>Super Spodnie</h4>
								<div className={classes.productPrice}>
									<span className={classes.beforePrice}>
										99.99 zł
									</span>
									<span className={classes.newPrice}>
										20.99 zł
									</span>
								</div>
								<a href='#' className={classes.regularButton}>
									BUTTON
								</a>
							</div>
						</div>
						<div className={classes.productCard}>
							<div className={classes.soldTag}>
								<span>Sprzedane</span>
							</div>
							<div className={classes.prodImgContainer}>
								<img
									className={classes.productImg}
									src={productImg}
									alt='prodImg'
								/>
							</div>
							<div className={classes.prodDescription}>
								<h4>Super Spodnie</h4>
								<div className={classes.productPrice}>
									<span className={classes.beforePrice}>
										99.99 zł
									</span>
									<span className={classes.newPrice}>
										20.99 zł
									</span>
								</div>
								<a href='#' className={classes.regularButton}>
									BUTTON
								</a>
							</div>
						</div>
						<div className={classes.productCard}>
							<div className={classes.soldTag}>
								<span>Sprzedane</span>
							</div>
							<div className={classes.prodImgContainer}>
								<img
									className={classes.productImg}
									src={productImg}
									alt='prodImg'
								/>
							</div>
							<div className={classes.prodDescription}>
								<h4>Super Spodnie</h4>
								<div className={classes.productPrice}>
									<span className={classes.beforePrice}>
										99.99 zł
									</span>
									<span className={classes.newPrice}>
										20.99 zł
									</span>
								</div>
								<a href='#' className={classes.regularButton}>
									BUTTON
								</a>
							</div>
						</div>
						<div className={classes.productCard}>
							<div className={classes.soldTag}>
								<span>Sprzedane</span>
							</div>
							<div className='shadowBox'>
								<div className={classes.prodImgContainer}>
									<img
										className={classes.productImg}
										src={productImg}
										alt='prodImg'
									/>
								</div>
							</div>
							<div className={classes.prodDescription}>
								<h4>Super Spodnie</h4>
								<div className={classes.productPrice}>
									<span className={classes.beforePrice}>
										99.99 zł
									</span>
									<span className={classes.newPrice}>
										20.99 zł
									</span>
								</div>
								<a href='#' className={classes.regularButton}>
									BUTTON
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Aux>
	);
};

export default Main;
