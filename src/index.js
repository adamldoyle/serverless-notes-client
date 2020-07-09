import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { initSentry } from './libs/error';
import { AuthProvider } from './contexts/AuthContext';
import { configure as awsConfigure } from './libs/aws';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App';

initSentry();
awsConfigure();

ReactDOM.render(
	<React.StrictMode>
		<ErrorBoundary>
			<AuthProvider>
				<App />
			</AuthProvider>
		</ErrorBoundary>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
