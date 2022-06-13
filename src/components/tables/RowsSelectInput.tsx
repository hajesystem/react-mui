import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	SelectChangeEvent,
} from '@mui/material';
import React from 'react';

interface RowsSelectInputType {
	pageSize: number;
	onChange: (e: SelectChangeEvent) => void;
	rowsPerPageOptions: number[];
}

export default function RowsSelectInput({
	pageSize,
	onChange,
	rowsPerPageOptions,
}: RowsSelectInputType) {
	return (
		<FormControl sx={{ width: 100 }} size="small">
			<InputLabel id="select-label">열</InputLabel>
			<Select
				labelId="select-label"
				value={String(pageSize)}
				label="Rows"
				onChange={onChange}
			>
				{rowsPerPageOptions.map((item) => (
					<MenuItem value={item} key={item}>
						{item}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
