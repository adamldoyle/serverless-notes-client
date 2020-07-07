import { useState, useEffect, useCallback } from 'react';
import { API } from 'aws-amplify';
import { storeFile, getFile } from '../libs/aws';

export default function useNotes() {
	const [notes, setNotes] = useState([]);

	function reload() {
		API.get('notes', '/notes').then(setNotes);
	}

	useEffect(() => {
		reload();
	}, []);

	async function createNote(content, attachmentFile) {
		const attachment = attachmentFile ? await storeFile(attachmentFile) : null;
		await API.post('notes', '/notes', {
			body: {
				content,
				attachment,
			},
    });
    reload();
  }

	return { notes, createNote, reload };
}
