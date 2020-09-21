import React from 'react';
import classes from './Main.module.scss';
import logoImg from '../../img/logo.png';
import Aux from './../../hoc/Auxiliary/Auxiliary';
import productImg from '../../img/product.jpg';

const Main = (props) => {
	return (
		<Aux>
			<header className={classes.main_header}>
				<div className={classes.header_content}>
					<div className={classes.main_nav}>
						<ul>
							<li>
								<a
									href='index.html'
									className={classes.current_link}
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

			<div className={classes.main_container}>
				<div className={classes.category_nav}>
					<ul className={classes.category}>
						<li className={classes.has_dropdown}>
							<a href='#'>kategoria1</a>
							<ul className={classes.dropdown}>
								<li className={classes.dropdown_item}>
									<a href='#'>dropdown1</a>
								</li>
								<li className={classes.dropdown_item}>
									<a href='#'>dropdown2</a>
								</li>
								<li className={classes.dropdown_item}>
									<a href='#'>dropdown3</a>
								</li>
							</ul>
						</li>
						<li className={classes.has_dropdown}>
							<a href='#'>kategoria2</a>
							<ul className={classes.dropdown}>
								<li className={classes.dropdown_item}>
									<a href='#'>dropdown1</a>
								</li>
								<li className={classes.dropdown_item}>
									<a href='#'>dropdown2</a>
								</li>
								<li className={classes.dropdown_item}>
									<a href='#'>dropdown3</a>
								</li>
							</ul>
						</li>
						<li className={classes.has_dropdown}>
							<a href='#'>kategoria3</a>
							<ul className={classes.dropdown}>
								<li className={classes.dropdown_item}>
									<a href='#'>dropdown1</a>
								</li>
								<li className={classes.dropdown_item}>
									<a href='#'>dropdown2</a>
								</li>
								<li className={classes.dropdown_item}>
									<a href='#'>dropdown3</a>
								</li>
							</ul>
						</li>
					</ul>
					<div className={classes.search_sort}>
						<div className={classes.vertical_even_item}>
							<input type='text' placeholder='Search...' />
						</div>
						<div className={classes.vertical_even_item}>
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
							className={`${classes.vertical_even_item} ${classes.no_border}`}
						>
							<label htmlFor=''>Tylko dostepne:</label>
							<input type='checkbox' />
						</div>
					</div>
				</div>
			</div>

			<div className='product_card'>
				<div className='soldTag'></div>
				<img src={productImg} alt='prodImg' />
				<div className='product_descr'>
					<h3>Super Spodnie</h3>
					<div className='product_price'>
						<span className='before_price'>99.99 zł</span>{' '}
						<div className='new_price'>20.99 zł</div>
					</div>
					<div className='button'></div>
				</div>
			</div>
		</Aux>
	);
};

export default Main;
