import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import SignInBox from './SignInBox';

const AuthContext = React.createContext({
	authenticating: true,
	user: null,
	signOut: () => {},
});

export const AuthProvider = ({ children }) => {
	const [session, setSession] = useState(null);
	const [authenticating, setAuthenticating] = useState(true);

	useEffect(() => {
		Auth.currentSession()
			.then(setSession)
			.catch(() => {}) // Ignore errors since not having session is a valid scenario
			.then(() => setAuthenticating(false));
	}, []);

	async function signIn(email, password) {
		setSession(null);
		await Auth.signIn(email, password);
		const session = await Auth.currentSession();
		setSession(session);
	}

	async function signOut() {
		if (!session) {
			return;
		}

		try {
			await Auth.signOut();
		} catch (err) {
			console.error(err);
		} finally {
			setSession(null);
		}
	}

	if (authenticating) {
		return null;
	}

	if (!session) {
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<SignInBox signIn={signIn} />
			</Container>
		);
	}

	return (
		<AuthContext.Provider value={{ authenticating, session, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
