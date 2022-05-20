import React from 'react';
import { Box, Toolbar } from '@mui/material';
import PageHeader from '../../containers/pageheader';

type ContantsProps = {
	drawerWidth: number;
	children?: JSX.Element;
};

export default function Contants({ drawerWidth, children }: ContantsProps) {
	return (
		<Box
			component="main"
			sx={{
				flexGrow: 1,
				p: 3,
				width: { sm: `calc(100% - ${drawerWidth}px)` },
			}}
		>
			<Toolbar />
			<PageHeader title="사원" subTitle="등록" />
			{children}
		</Box>
	);
}
