import { Autocomplete, TextField } from '@mui/material';
import React, { useState } from 'react';
import { OptionType } from '../../types';

interface SearchSelectInputProps {
	initialValue: string;
	name: string;
	onChange: (name: string, options: OptionType | null) => void;
	options: OptionType[];
	size?: 'small' | 'medium' | undefined;
	label?: React.ReactNode;
}

export default function SearchSelectInput({
	initialValue,
	name,
	onChange,
	options,
	size,
	label,
}: SearchSelectInputProps) {
	const [inputValue, setInputValue] = useState(initialValue);
	return (
		<Autocomplete
			inputValue={inputValue ? initialValue : ''}
			onInputChange={(_event, value) => setInputValue(value)}
			isOptionEqualToValue={(option, value) => option.label === value.label}
			onChange={(_event, newValue: OptionType | null) => {
				onChange(name, newValue);
			}}
			options={options}
			renderInput={(params) => (
				// eslint-disable-next-line react/jsx-props-no-spreading
				<TextField {...params} label={label} size={size} />
			)}
		/>
	);
}
