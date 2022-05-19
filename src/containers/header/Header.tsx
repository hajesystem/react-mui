import React, { useState } from 'react';
import {
	AppBar,
	Badge,
	Box,
	IconButton,
	Toolbar,
	Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import AccountMenu from './AccountMenu';
import MobileMenu from './MobileMenu';
import ProfileMenu from './ProfileMenu';
import { Search, SearchIconWrapper, StyledInputBase } from './styled';
import customColor from '../../color/color';

type HeaderProps = {
	drawerWidth: number;
	onClick: () => void;
};

export default function Header({ onClick, drawerWidth }: HeaderProps) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
		useState<null | HTMLElement>(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="fixed"
				sx={{
					backgroundColor: customColor.themeColor,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={onClick}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon sx={{ color: customColor.fillColor }} />
					</IconButton>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{
							display: { xs: 'none', sm: 'block' },
							color: customColor.fillColor,
						}}
					>
						PPMS
					</Typography>
					<Search>
						<SearchIconWrapper>
							<SearchIcon sx={{ color: customColor.fillColor }} />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="검색"
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Search>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						<IconButton
							size="large"
							aria-label="show 4 new mails"
							color="inherit"
						>
							<Badge badgeContent={4} color="error">
								<MailIcon sx={{ color: customColor.fillColor }} />
							</Badge>
						</IconButton>
						<IconButton
							size="large"
							aria-label="show 17 new notifications"
							color="inherit"
						>
							<Badge badgeContent={17} color="error">
								<NotificationsIcon sx={{ color: customColor.fillColor }} />
							</Badge>
						</IconButton>
						<IconButton
							size="large"
							edge="end"
							aria-label="account of current user"
							aria-controls="primary-search-account-menu"
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
						>
							<AccountCircle sx={{ color: customColor.fillColor }} />
						</IconButton>
					</Box>
					<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="show more"
							aria-controls="primary-search-account-menu-mobile"
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon sx={{ color: customColor.fillColor }} />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			<MobileMenu
				anchorEl={mobileMoreAnchorEl}
				menuId="primary-search-account-menu-mobile"
				isMenuOpen={isMobileMenuOpen}
				menuClose={handleMobileMenuClose}
			>
				<ProfileMenu onClick={handleProfileMenuOpen} />
			</MobileMenu>
			<AccountMenu
				anchorEl={anchorEl}
				menuId="primary-search-account-menu"
				isMenuOpen={isMenuOpen}
				menuClose={handleMenuClose}
			/>
		</Box>
	);
}
