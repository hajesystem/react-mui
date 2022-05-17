/** @jsxImportSource @emotion/react */
import {
	AppBar,
	Badge,
	css,
	Grid,
	IconButton,
	InputBase,
	Toolbar,
} from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import React from 'react';

const appBar = css`
	background-color: #fff;
`;

const searchInput = css`
	opacity: 0.6;
	padding: 0px
	font-size: 0.8rem;
	&:hover {
		background-color: #f2f2f2;
	}
`;

export default function Header() {
	return (
		<AppBar position="static" css={appBar}>
			<Toolbar>
				<Grid container alignItems="center">
					<Grid item sm>
						<InputBase
							css={searchInput}
							placeholder="검색"
							startAdornment={<SearchOutlinedIcon fontSize="small" />}
						/>
					</Grid>
					<Grid item sm={4} />
					<Grid item sm>
						<IconButton>
							<Badge badgeContent={4} color="secondary">
								<NotificationsNoneIcon fontSize="small" />
							</Badge>
						</IconButton>
						<IconButton>
							<Badge badgeContent={4} color="primary">
								<ChatBubbleOutlineOutlinedIcon fontSize="small" />
							</Badge>
						</IconButton>
						<IconButton>
							<PowerSettingsNewOutlinedIcon fontSize="small" />
						</IconButton>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
}
