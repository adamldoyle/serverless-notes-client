import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { getFile } from '../../libs/aws';

export default function NoteView({ id }) {
	const [note, setNote] = useState({});
	useEffect(() => {
		async function fetch() {
      const note = await API.get('notes', `/notes/${id}`);
			if (note.attachment) {
				note.attachmentUrl = await getFile(note.attachment);
			}
			setNote(note);
    }
    fetch();
	}, [id]);

	return (
		<React.Fragment>
			<p>{note.content}</p>
			{note.attachmentUrl && (
				<img src={note.attachmentUrl} alt="Note attachment" />
			)}
		</React.Fragment>
	);
}
