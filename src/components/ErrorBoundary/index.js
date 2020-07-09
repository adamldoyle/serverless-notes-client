import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { logError } from '../../libs/error';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}));

const ErrorView = ({ error }) => {
	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box className={classes.paper}>There was a problem loading the page.</Box>
		</Container>
	);
};

export default class ErrorBoundary extends React.Component {
	state = { hasError: false };

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		logError(error, errorInfo);
	}

	render() {
		if (!this.state.hasError) {
			return this.props.children;
		}

		return <ErrorView />;
	}
}
