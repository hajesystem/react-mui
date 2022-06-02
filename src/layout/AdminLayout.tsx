/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import customColor from '../color/color';
import { Aside, Contants, Header } from '../containers';
import { FormPage, TablePage } from '../pages';

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
				{/* <FormPage /> */}
				<TablePage />
			</Contants>
		</Box>
	);
}
