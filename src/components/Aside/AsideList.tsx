import React from 'react';
import {
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export default function AsideList() {
	return (
		<>
			<List>
				{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>
								{index % 2 === 0 ? (
									<InboxIcon sx={{ color: '#FFFFFF' }} />
								) : (
									<MailIcon sx={{ color: '#FFFFFF' }} />
								)}
							</ListItemIcon>
							<ListItemText primary={text} sx={{ color: '#FFFFFF' }} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{['All mail', 'Trash', 'Spam'].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>
								{index % 2 === 0 ? (
									<InboxIcon sx={{ color: '#FFFFFF' }} />
								) : (
									<MailIcon sx={{ color: '#FFFFFF' }} />
								)}
							</ListItemIcon>
							<ListItemText primary={text} sx={{ color: '#FFFFFF' }} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</>
	);
}
