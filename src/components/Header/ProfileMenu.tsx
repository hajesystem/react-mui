import React from 'react';
import { IconButton, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import customColor from '../../color/color';

type ProfileMenuProps = {
	onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

export default function ProfileMenu({ onClick }: ProfileMenuProps) {
	return (
		<MenuItem onClick={onClick}>
			<IconButton
				size="large"
				aria-label="account of current user"
				aria-controls="primary-search-account-menu"
				aria-haspopup="true"
				color="inherit"
			>
				<AccountCircle sx={{ color: customColor.fillColorNegative }} />
			</IconButton>
			<p>Profile</p>
		</MenuItem>
	);
}
