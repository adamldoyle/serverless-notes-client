import React, { useState } from 'react';
import { Link } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import useNotes from '../../hooks/useNotes';
import NoteCreate from '../NoteCreate';

const useStyles = makeStyles((theme) => ({
	avatar: {
		fontSize: 40,
		cursor: 'pointer',
	},
}));

export default function NotesList() {
	const { notes, createNote } = useNotes();
	const [creatingNew, setCreatingNew] = useState(false);

	const classes = useStyles();

	return (
		<List>
			<ListItem>
				<ListItemAvatar
					className={classes.avatar}
					onClick={() => setCreatingNew(true)}
				>
					<span>{'\uFF0B'}</span>
				</ListItemAvatar>
				{!creatingNew ? (
					<ListItemText primary={`Create a new note`} />
				) : (
					<NoteCreate createNote={createNote} onSave={() => setCreatingNew(false)} />
				)}
			</ListItem>
			{notes.map((note) => (
				<ListItem key={note.noteId}>
					<ListItemText
						primary={<Link to={`/note/${note.noteId}`}>{note.content.trim().split('\n')[0]}</Link>}
						secondary={`Created: ${new Date(note.createdAt).toLocaleString()}`}
					/>
				</ListItem>
			))}
		</List>
	);
}
