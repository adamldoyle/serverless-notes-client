import React, { useState } from 'react';

const TitleContext = React.createContext({
	title: 'Notes',
	setTitle: (title) => title,
});

export default TitleContext;

export const TitleProvider = ({ children }) => {
	const [title, setTitle] = useState('Notes');

	return (
		<TitleContext.Provider value={{ title, setTitle }}>
			{children}
		</TitleContext.Provider>
	);
};
