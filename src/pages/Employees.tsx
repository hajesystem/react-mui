import { Button, Paper, Stack, TextField } from '@mui/material';
import React from 'react';

export default function Employees() {
	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		console.log('submit');
	};

	return (
		<Paper elevation={3} sx={{ p: 2, mb: 2 }}>
			<Stack component="form" onSubmit={handleSubmit}>
				<TextField id="outlined-basic" label="Outlined" variant="outlined" />
				<Button
					variant="contained"
					type="submit"
					size="large"
					style={{ marginTop: '3rem' }}
				>
					등록신청
				</Button>
			</Stack>
		</Paper>
	);
}
