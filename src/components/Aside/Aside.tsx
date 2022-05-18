import React from 'react';
import { Box, Divider, Drawer } from '@mui/material';
import Logo from './Logo';
import AsideList from './AsideList';

type SideMenuProps = {
	mobileOpen: boolean;
	drawerWidth: number;
	onClick: () => void;
	window?: () => Window;
};

export default function Aside({
	window,
	onClick,
	mobileOpen,
	drawerWidth,
}: SideMenuProps) {
	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<Box
			component="nav"
			sx={{
				width: { sm: drawerWidth },
				flexShrink: { sm: 0 },
			}}
			aria-label="mailbox folders"
		>
			<Drawer
				container={container}
				variant="temporary"
				open={mobileOpen}
				onClose={onClick}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
				sx={{
					display: { xs: 'block', sm: 'none' },
					'& .MuiDrawer-paper': {
						boxSizing: 'border-box',
						width: drawerWidth,
						backgroundColor: '#1976D2',
					},
				}}
			>
				<Logo />
				<Divider />
				<AsideList />
			</Drawer>
			<Drawer
				variant="permanent"
				sx={{
					display: { xs: 'none', sm: 'block' },
					'& .MuiDrawer-paper': {
						boxSizing: 'border-box',
						width: drawerWidth,
						backgroundColor: '#1976D2',
					},
				}}
				open
			>
				<Logo />
				<Divider />
				<AsideList />
			</Drawer>
		</Box>
	);
}
