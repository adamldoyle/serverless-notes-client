import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { storeFile } from '../libs/aws';
import { onError } from '../libs/error';

export default function useNotes() {
	const [notes, setNotes] = useState([]);

	function reload() {
		API.get('notes', '/notes').then(setNotes).catch(onError);
	}

	useEffect(() => {
		reload();
	}, []);

	async function createNote(content, attachmentFile) {
		const attachment = attachmentFile ? await storeFile(attachmentFile) : null;
		try {
			await API.post('notes', '/notes', {
				body: {
					content,
					attachment,
				},
			});
		} catch (err) {
			onError(err);
			throw err;
		}
		reload();
	}

	return { notes, createNote, reload };
}
