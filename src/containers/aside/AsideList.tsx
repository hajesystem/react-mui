import React from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
			<Accordion
				sx={{
					color: customColor.fillColor,
					backgroundColor: customColor.themeColor,
				}}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon sx={{ color: customColor.fillColor }} />}
				>
					<Typography>메뉴</Typography>
				</AccordionSummary>
				<AccordionDetails>
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
				</AccordionDetails>
			</Accordion>
			<Accordion
				expanded
				sx={{
					color: customColor.fillColor,
					backgroundColor: customColor.themeColor,
				}}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon sx={{ color: customColor.fillColor }} />}
				>
					<Typography>메뉴2</Typography>
				</AccordionSummary>
				<AccordionDetails>
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
				</AccordionDetails>
			</Accordion>
		</>
	);
}
