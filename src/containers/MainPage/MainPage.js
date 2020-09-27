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
			<div className='utilBigContainer'>
				<CategoriesBar />
				<p>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit.
					Corporis velit eos explicabo cumque! Laborum mollitia dicta
					adipisci reprehenderit quasi ad quae itaque, vel ea optio,
					consectetur, modi consequuntur rem necessitatibus tempore
					ullam perspiciatis enim placeat explicabo? Quae molestiae
					nobis officia ducimus id, ut maiores nihil adipisci
					voluptatibus velit dolorem iure.
				</p>
			</div>
			<div className='utilBigContainer'>
				<div className='utilContainer'>
					<div className={classes.categoryNav}>
						<ul className={classes.category}>
							<li className={classes.hasDropdown}>
								<a href='#'>kategoria1</a>
								<ul className={classes.dropdown}>
									<li className={classes.dropdownItem}>
										<a href='#'>dropdown1</a>
									</li>
									<li className={classes.dropdownItem}>
										<a href='#'>dropdown2</a>
									</li>
									<li className={classes.dropdownItem}>
										<a href='#'>dropdown3</a>
									</li>
								</ul>
							</li>
							<li className={classes.hasDropdown}>
								<a href='#'>kategoria2</a>
								<ul className={classes.dropdown}>
									<li className={classes.dropdownItem}>
										<a href='#'>dropdown1</a>
									</li>
									<li className={classes.dropdownItem}>
										<a href='#'>dropdown2</a>
									</li>
									<li className={classes.dropdownItem}>
										<a href='#'>dropdown3</a>
									</li>
								</ul>
							</li>
							<li className={classes.hasDropdown}>
								<a href='#'>kategoria3</a>
								<ul className={classes.dropdown}>
									<li className={classes.dropdownItem}>
										<a href='#'>dropdown1</a>
									</li>
									<li className={classes.dropdownItem}>
										<a href='#'>dropdown2</a>
									</li>
									<li className={classes.dropdownItem}>
										<a href='#'>dropdown3</a>
									</li>
								</ul>
							</li>
						</ul>
						<div className={classes.searchSort}>
							<div className={classes.verticalEvenItem}>
								<input type='text' placeholder='Search...' />
							</div>
							<div className={classes.verticalEvenItem}>
								<form action=''>
									<select name='' id=''>
										<option value='A-Z'>A-Z</option>
										<option value='Z-A'>Z-A</option>
										<option value='priceUp'>
											cena: rosnąco
										</option>
										<option value='priceDes'>
											cena: malejąco
										</option>
									</select>
								</form>
							</div>
							<div
								className={`${classes.verticalEvenItem} ${classes.noBorder}`}
							>
								<label htmlFor=''>Tylko dostepne:</label>
								<input type='checkbox' />
							</div>
						</div>
					</div>
				</div>
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
