import React from 'react';
import {
	Dialog,
	DialogTitle,
	Stack,
	Typography,
	DialogContent,
	Button,
	DialogActions,
} from '@mui/material';
import { DaumMap } from '../../services';

interface MapModalProps {
	address: string;
	open: boolean;
	close: () => void;
}

export default function MapModal({ address, open, close }: MapModalProps) {
	return (
		<Dialog open={open} maxWidth="md" fullWidth onClose={close}>
			<DialogTitle>
				<Stack>
					<Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
						위치
					</Typography>
				</Stack>
			</DialogTitle>
			<DialogContent dividers>
				<Stack
					id="map"
					sx={{
						height: '40vh',
					}}
				/>
				<DaumMap address={address} />
			</DialogContent>
			<DialogActions>
				<Button variant="contained" onClick={close}>
					닫기
				</Button>
			</DialogActions>
		</Dialog>
	);
}
