import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormError from '../FormError';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	instructions: {
		color: theme.palette.text.primary,
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignInBox({ signIn, toSignUp }) {
	const {
		register,
		handleSubmit,
		setError,
		errors,
		clearErrors,
		reset,
		watch,
	} = useForm();
	// Form(s) submitting
	const [loading, setLoading] = useState(false);
	// True if signing up, false if signing in
	const [signingUp, setSigningUp] = useState(false);
	// Contains user data when waiting to confirm sign up, null otherwise
	const [confirmData, setConfirmData] = useState(null);

	function preSubmit() {
		clearErrors('general');
	}

	async function onSubmit(data) {
		setLoading(true);
		try {
			if (confirmData) {
				await Auth.confirmSignUp(confirmData.email, data.confirmCode);
				await signIn(confirmData.email, confirmData.password);
			} else if (signingUp) {
				await Auth.signUp({
					username: data.email,
					password: data.password,
				});
				setConfirmData({
					email: data.email,
					password: data.password,
				});
				reset();
				setLoading(false);
			} else {
				await signIn(data.email, data.password);
			}
		} catch (err) {
			setError('general', { type: 'manual', message: err.message });
			setLoading(false);
		}
	}

	const classes = useStyles();

	return (
		<Box className={classes.paper}>
			<Avatar className={classes.avatar}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				{signingUp ? 'Sign up' : 'Sign in'}
			</Typography>
			<form
				className={classes.form}
				noValidate
				onSubmit={handleSubmit(onSubmit)}
			>
				<FormError errors={errors} name="general" />
				{!confirmData ? (
					<React.Fragment>
						<TextField
							variant="outlined"
							margin="normal"
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							inputRef={register({
								required: 'Email is required',
							})}
						/>
						<FormError errors={errors} name="email" />
						<TextField
							variant="outlined"
							margin="normal"
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							inputRef={register({
								required: 'Password is required',
							})}
						/>
						<FormError errors={errors} name="password" />
						{signingUp && (
							<React.Fragment>
								<TextField
									variant="outlined"
									margin="normal"
									fullWidth
									name="passwordConfirm"
									label="Password (confirm)"
									type="password"
									id="passwordConfirm"
									inputRef={register({
										validate: (value) =>
											value === watch('password')
												? true
												: 'Password confirm must match',
									})}
								/>
								<FormError errors={errors} name="passwordConfirm" />
							</React.Fragment>
						)}
					</React.Fragment>
				) : (
					<React.Fragment>
						<FormHelperText className={classes.instructions}>
							An email has been sent with a confirmation code. Please submit
							that code here to complete the registration.
						</FormHelperText>
						<TextField
							variant="outlined"
							margin="normal"
							fullWidth
							id="confirmCode"
							label="Confirm Code"
							name="confirmCode"
							autoFocus
							inputRef={register({
								required: 'Confirm code is required',
							})}
						/>
						<FormError errors={errors} name="confirmCode" />
					</React.Fragment>
				)}
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
					disabled={loading}
					onClick={preSubmit}
				>
					{confirmData ? 'Confirm' : signingUp ? 'Sign up' : 'Sign In'}
				</Button>
			</form>
			{!confirmData && (
				<Grid container justify="flex-end">
					<Grid item>
						<Link
							variant="body2"
							component="button"
							onClick={() => setSigningUp(!signingUp)}
						>
							{signingUp
								? 'Already have an account? Sign in'
								: "Don't have an account? Sign up"}
						</Link>
					</Grid>
				</Grid>
			)}
		</Box>
	);
}
