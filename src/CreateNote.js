import React, { useState, useRef } from 'react';
import { API } from 'aws-amplify';
import { storeFile } from './libs/aws';

export default function CreateNote() {
	const [note, setNote] = useState('');
	const attachmentRef = useRef(null);
	const [saving, setSaving] = useState(false);

	function validate() {
		return note.length > 0;
	}

	async function onSubmit(event) {
		event.preventDefault();
		setSaving(true);

		try {
			const attachment = attachmentRef.current
				? await storeFile(attachmentRef.current)
        : null;
			await API.post('notes', '/notes', {
				body: {
          content: note,
          attachment
				},
			});
		} catch (err) {
			console.error(err);
		} finally {
			setSaving(false);
		}
	}

	return (
		<form onSubmit={onSubmit}>
			<div>
				<label htmlFor="note">Note:</label>
				<textarea
					id="note"
					onChange={(e) => setNote(e.target.value)}
					value={note}
				></textarea>
			</div>
			<div>
				<label htmlFor="attachment">Attachment:</label>
				<input
					id="attachment"
					type="file"
					onChange={(e) => (attachmentRef.current = e.target.files[0])}
				/>
			</div>
			<input type="submit" disabled={!validate() || saving} value="Save" />
		</form>
	);
}
