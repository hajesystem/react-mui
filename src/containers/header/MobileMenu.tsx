import React from 'react';
import { IconButton, Menu, MenuItem, Badge } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';

type MobileMenuProps = {
	anchorEl: HTMLElement | null;
	menuId: string;
	isMenuOpen: boolean;
	menuClose: () => void;
	children?: JSX.Element;
};

export default function MobileMenu({
	anchorEl,
	menuId,
	isMenuOpen,
	menuClose,
	children,
}: MobileMenuProps) {
	return (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMenuOpen}
			onClose={menuClose}
		>
			<MenuItem>
				<IconButton size="large" aria-label="show 4 new mails" color="inherit">
					<Badge badgeContent={4} color="error">
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem>
				<IconButton
					size="large"
					aria-label="show 17 new notifications"
					color="inherit"
				>
					<Badge badgeContent={17} color="error">
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			{children}
		</Menu>
	);
}
