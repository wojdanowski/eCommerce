import React from 'react';
import classes from './Main.module.scss';
import logoImg from '../../img/logo.png';
import Aux from './../../hoc/Auxiliary/Auxiliary';
import productImg from '../../img/product.jpg';

const Main = (props) => {
	return (
		<Aux>
			<header className={classes.mainHeader}>
				<div className={classes.headerContent}>
					<div className={classes.mainNav}>
						<ul>
							<li>
								<a
									href='index.html'
									className={classes.currentLink}
								>
									about
								</a>
							</li>
							<li>
								<a href='index.html'>basket</a>
							</li>
							<li>
								<a href='index.html'>profile</a>
							</li>
						</ul>
					</div>

					<div className={classes.logo}>
						<img src={logoImg} alt='logo' />
						<h1>Vintage Lump</h1>
					</div>
				</div>
			</header>

			<div className={classes.container}>
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
			<div className={classes.container}>
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
		</Aux>
	);
};

export default Main;
