import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';

import './app.scss';
import MainPage from './MainPage/MainPage';
import Layout from './../hoc/Layout/Layout';

import uiReducer from '../store/reducers/uiReducer';
import cartReducer from '../store/reducers/cartReducer';
import Checkout from './../components/Checkout/Checkout';

const rootReducer = combineReducers({
	uiState: uiReducer,
	cartState: cartReducer,
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
						<Route path='/products' component={MainPage} />
						<Route path='/checkout' component={Checkout} />
						<Route path='/' exact component={MainPage} />
					</Switch>
				</Layout>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
