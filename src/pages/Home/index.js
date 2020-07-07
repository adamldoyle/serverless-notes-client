import React, { useContext, useLayoutEffect } from 'react';
import TitleContext from '../../contexts/TitleContext';
import NotesList from '../../components/NotesList';

export default function Home() {
	const { setTitle } = useContext(TitleContext);

	useLayoutEffect(() => {
		setTitle('Notes');
	}, [setTitle]);

	return <NotesList />;
}
