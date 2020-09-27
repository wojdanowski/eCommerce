import React from 'react';
import './app.scss';
import Main from './MainPage/MainPage';
import Layout from './../hoc/Layout/Layout';

function App() {
	return (
		<Layout>
			<Main />
		</Layout>
	);
}

export default App;
