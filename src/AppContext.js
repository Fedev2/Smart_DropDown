import React, { createContext, useState } from 'react';

const defaultGlobalState = {
    status: "500",
    flag: false
}

const AppContext = createContext({defaultGlobalState});

export const AppProvider = ({ children }) => {
	// meaningful default values
	const [ctx, setCtx] = useState({
		status: "000",
		flag: false
	});

	return (
		<AppContext.Provider value={{ ctx, setCtx }}>
			{children}
		</AppContext.Provider>
	)
}

export default AppContext 