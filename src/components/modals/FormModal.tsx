import React from 'react';
import {
	Dialog,
	DialogTitle,
	Typography,
	DialogContent,
	IconButton,
	Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface FormModalType {
	open: boolean;
	close: () => void;
	title: string;
	children?: React.ReactNode;
}

export default function FormModal({
	open,
	title,
	children,
	close,
}: FormModalType) {
	return (
		<Dialog open={open} maxWidth="sm" fullWidth>
			<DialogTitle>
				<Stack>
					<Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
						{title}
					</Typography>

					<IconButton
						aria-label="close"
						onClick={close}
						sx={{
							position: 'absolute',
							right: 8,
							top: 8,
						}}
					>
						<CloseIcon />
					</IconButton>
				</Stack>
			</DialogTitle>
			<DialogContent dividers>{children}</DialogContent>
		</Dialog>
	);
}
