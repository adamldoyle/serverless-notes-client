import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { TitleProvider } from '../../contexts/TitleContext';
import Navigation from '../Navigation';

export default function Layout({ children }) {
	return (
		<TitleProvider>
			<Navigation />
			<Container component="main">
				<CssBaseline />
				{children}
			</Container>
		</TitleProvider>
	);
}
