import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Aside from '../components/Aside';
import Header from '../components/Header';
import customColor from '../color/color';
import Contants from '../components/Contants';
import Employees from '../pages';

export default function AdminLayout() {
	const drawerWidth = 240;
	const [mobileOpen, setMobileOpen] = useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	return (
		<Box
			sx={{
				display: 'flex',
				height: '100vh',
				backgroundColor: customColor.background,
			}}
		>
			<CssBaseline />
			<Aside
				onClick={handleDrawerToggle}
				mobileOpen={mobileOpen}
				drawerWidth={drawerWidth}
			/>
			<Header onClick={handleDrawerToggle} drawerWidth={drawerWidth} />
			<Contants drawerWidth={drawerWidth}>
				<Employees />
			</Contants>
		</Box>
	);
}
