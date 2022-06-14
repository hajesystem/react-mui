import React from 'react';
import { Paper } from '@mui/material';
import User from '../components/forms/User';

export default function FormPage() {
	return (
		<Paper elevation={3} sx={{ p: 2, mb: 2 }}>
			<User />
		</Paper>
	);
}
