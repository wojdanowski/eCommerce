import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';

import './app.scss';

import uiReducer from '../store/reducers/uiReducer';
import cartReducer from '../store/reducers/cartReducer';
import checkoutFormReducer from './../store/reducers/checkoutFormReducer';

import Layout from './../hoc/Layout/Layout';
import Checkout from './../components/Checkout/Checkout';
import MainPage from '../components/MainPage/MainPage';
import CheckoutForm from './CheckoutForm/CheckoutForm';

const rootReducer = combineReducers({
	uiState: uiReducer,
	cartState: cartReducer,
	checkoutFormState: checkoutFormReducer,
});
const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Layout>
					<Switch>
						<Route path='/index.html' exact component={MainPage} />
						<Route path='/products' component={MainPage} />
						<Route
							path='/checkout/shipping'
							component={CheckoutForm}
						/>
						<Route path='/checkout' component={Checkout} />
						<Route path='/' exact component={MainPage} />
					</Switch>
				</Layout>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
