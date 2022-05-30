import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { OptionType } from '../../types';

interface SearchSelectInputProps {
	name: string;
	onChange: (name: string, options: OptionType | null) => void;
	options: OptionType[];
	size?: 'small' | 'medium' | undefined;
	label?: React.ReactNode;
}

export default function SearchSelectInput({
	name,
	onChange,
	options,
	size,
	label,
}: SearchSelectInputProps) {
	return (
		<Autocomplete
			isOptionEqualToValue={(option, value) => option.id === value.id}
			onChange={(_event, newValue: OptionType | null) => {
				onChange(name, newValue);
			}}
			options={options}
			getOptionLabel={(option) => option.label}
			renderInput={(params) => (
				// eslint-disable-next-line react/jsx-props-no-spreading
				<TextField {...params} label={label} size={size} />
			)}
		/>
	);
}
