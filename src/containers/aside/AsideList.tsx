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
import customColor from '../../color/color';

export default function AsideList() {
	return (
		<>
			<List>
				{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>
								{index % 2 === 0 ? (
									<InboxIcon sx={{ color: customColor.fillColor }} />
								) : (
									<MailIcon sx={{ color: customColor.fillColor }} />
								)}
							</ListItemIcon>
							<ListItemText
								primary={text}
								sx={{ color: customColor.fillColor }}
							/>
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider sx={{ borderColor: customColor.fillColor }} />
			<List>
				{['All mail', 'Trash', 'Spam'].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>
								{index % 2 === 0 ? (
									<InboxIcon sx={{ color: customColor.fillColor }} />
								) : (
									<MailIcon sx={{ color: customColor.fillColor }} />
								)}
							</ListItemIcon>
							<ListItemText
								primary={text}
								sx={{ color: customColor.fillColor }}
							/>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</>
	);
}
