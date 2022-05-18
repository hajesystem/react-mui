import React, { useState } from 'react';
import './App.css';
import { Box, CssBaseline } from '@mui/material';
import Header from '../components/Header';
import Aside from '../components/Aside';

const drawerWidth = 240;

function App() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<Aside
				onClick={handleDrawerToggle}
				mobileOpen={mobileOpen}
				drawerWidth={drawerWidth}
			/>
			<Header onClick={handleDrawerToggle} drawerWidth={drawerWidth} />
		</Box>
	);
}

export default App;
