import React, { useState, useContext } from 'react';
import $ from 'jquery';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const openSidebar = () => {
		
		
	
		setIsSidebarOpen(true);
		$(":root").css("overflow", "hidden");
	};

	const closeSidebar = () => {
		$(":root").css("overflow", "auto");
	 
		setIsSidebarOpen(false);
		
	};
	return (
		<AppContext.Provider
			value={{ isSidebarOpen, openSidebar, closeSidebar }}
		>
			{children}
		</AppContext.Provider>
	);
};
export const useGlobalContext = () => {
	return useContext(AppContext);
};
export { AppContext, AppProvider };
