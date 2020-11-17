import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import ReactDOM from 'react-dom';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';

import cartReducer from './store/reducers/cartReducer';
import uiReducer from './store/reducers/uiReducer';
import formReducer from './store/reducers/formReducer';
import authReducer from './store/reducers/authReducer';

const rootReducer = combineReducers({
	uiState: uiReducer,
	cartState: cartReducer,
	formState: formReducer,
	authState: authReducer,
});
const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
