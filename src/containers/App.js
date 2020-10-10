import React from 'react';
import './app.scss';
import MainPage from './MainPage/MainPage';
import Layout from './../hoc/Layout/Layout';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import uiReducer from '../store/reducers/uiReducer';
import cartReducer from '../store/reducers/cartReducer';

const rootReducer = combineReducers({
	uiState: uiReducer,
	cartState: cartReducer,
});
const store = createStore(rootReducer);

function App() {
	return (
		<Provider store={store}>
			<Layout>
				<MainPage />
			</Layout>
		</Provider>
	);
}

export default App;
