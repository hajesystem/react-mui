import React from 'react';
import { Paper, Typography } from '@mui/material';

type PageHeaderProps = {
	title: string;
	subTitle: string;
};

export default function PageHeader({ title, subTitle }: PageHeaderProps) {
	return (
		<Paper elevation={3} sx={{ p: 2, mb: 2 }}>
			<Typography variant="subtitle1" component="div">
				{title} / {subTitle}
			</Typography>
		</Paper>
	);
}
