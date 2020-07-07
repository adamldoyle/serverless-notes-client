import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import FormError from '../FormError';

const useStyles = makeStyles((theme) => ({
	form: {
		width: '100%',
	},
	formContainer: {
		display: 'flex',
		flexDirection: 'row',
		marginBottom: theme.spacing(1),
	},
	inputContainer: {
		marginRight: theme.spacing(4),
		flexGrow: 1,
	},
	contentField: {
		marginTop: 0,
	},
	submitContainer: {},
	submit: {
		margin: theme.spacing(3, 0, 2),
		height: '100%',
		marginTop: 0,
	},
}));

export default function NoteCreate({ createNote, onSave }) {
	const [loading, setLoading] = useState(false);
	const { register, handleSubmit, errors, setError, clearErrors } = useForm();

	const classes = useStyles();

	function preSubmit() {
    clearErrors('general');
  }

	async function onSubmit(data) {
		setLoading(true);
		try {
      await createNote(data.content, data.attachment?.[0] );
      onSave();
		} catch (err) {
		  setError('general', { type: 'manual', message: err.message });
			setLoading(false);
		}
	}

	return (
		<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
			<Box className={classes.formContainer}>
				<Box className={classes.inputContainer}>
					<TextField
						variant="outlined"
						margin="normal"
						fullWidth
						id="content"
						label="Content"
						name="content"
						autoFocus
						className={classes.contentField}
						inputRef={register({
							required: 'Content is required',
						})}
					/>
					<FormError errors={errors} name="content" />
					<FormControl>
						<InputLabel htmlFor="attachment">Attachment</InputLabel>
						<Input
							type="file"
							id="attachment"
							name="attachment"
							disableUnderline={true}
							inputRef={register({
								validate: (value) =>
									value.length <= 1 ? true : 'Only one attachment allowed',
							})}
						/>
						<FormError errors={errors} name="attachment" />
					</FormControl>
				</Box>
				<Box className={classes.submitContainer}>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
            disabled={loading}
            onClick={preSubmit}
					>
						Create
					</Button>
				</Box>
			</Box>
			<FormError errors={errors} name="general" />
		</form>
	);
}
