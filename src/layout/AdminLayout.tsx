import React, { useState } from 'react';
import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { koKR } from '@mui/material/locale';
import customColor from '../color/color';
import { Aside, Contants, Header } from '../containers';
import { TablePage } from '../pages';

export default function AdminLayout() {
	const drawerWidth = 240;
	const [mobileOpen, setMobileOpen] = useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const theme = createTheme(koKR);
	return (
		<ThemeProvider theme={theme}>
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
		</ThemeProvider>
	);
}
