import React from 'react';
import './app.scss';
import Main from './MainPage/MainPage';
import Layout from './../hoc/Layout/Layout';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import uiReducer from '../store/reducers/uiReducer';

const store = createStore(uiReducer);

function App() {
	return (
		<Provider store={store}>
			<Layout>
				<Main />
			</Layout>
		</Provider>
	);
}

export default App;
