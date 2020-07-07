import React from 'react';
import { Router } from '@reach/router';
import Layout from './components/Layout';
import Home from './pages/Home';
import View from './pages/View';

function App() {
	return (
		<Layout>
			<Router>
				<Home path="/" />
				<View path="/note/:id" />
			</Router>
		</Layout>
	);
}

export default App;
