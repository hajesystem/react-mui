import { Search } from '@mui/icons-material';
import { TextField, InputAdornment } from '@mui/material';
import React from 'react';

interface DataSearchInputType {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DataSearchInput({ onChange }: DataSearchInputType) {
	return (
		<TextField
			label="검색"
			size="small"
			name="search"
			onChange={onChange}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<Search />
					</InputAdornment>
				),
			}}
		/>
	);
}
