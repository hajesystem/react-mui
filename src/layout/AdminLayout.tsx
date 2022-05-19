import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import customColor from '../color/color';
import Employees from '../pages';
import { Aside, Contants, Header } from '../containers';

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
