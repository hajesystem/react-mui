import React from 'react';
import { Menu, MenuItem } from '@mui/material';

type AccountMenuProps = {
	anchorEl: HTMLElement | null;
	menuId: string;
	isMenuOpen: boolean;
	menuClose: () => void;
};

export default function AccountMenu({
	anchorEl,
	menuId,
	isMenuOpen,
	menuClose,
}: AccountMenuProps) {
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
			<MenuItem onClick={menuClose}>Profile</MenuItem>
			<MenuItem onClick={menuClose}>My account</MenuItem>
		</Menu>
	);
}
