import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';

import './app.scss';

import uiReducer from '../store/reducers/uiReducer';
import cartReducer from '../store/reducers/cartReducer';
import formReducer from './../store/reducers/formReducer';

import HomeRouter from './HomeRouter';
import DashboardRouter from './DashboardRouter';

const rootReducer = combineReducers({
	uiState: uiReducer,
	cartState: cartReducer,
	formState: formReducer,
});
const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Route path='/admin' component={DashboardRouter} />
					<Route path='/' component={HomeRouter} />
				</Switch>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
