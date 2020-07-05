import React from 'react';
import { ErrorMessage } from '@hookform/error-message';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	error: {
		color: theme.palette.error.main,
	},
}));

export default function FormError({ errors, name }) {
	const classes = useStyles();

	return (
		<ErrorMessage
			errors={errors}
			name={name}
			render={({ message }) => (
				<FormHelperText className={classes.error}>{message}</FormHelperText>
			)}
		/>
	);
}
