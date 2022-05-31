import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { OptionType } from '../../types';

interface SearchSelectInputProps {
	defaultValue: string | number | null;
	name: string;
	onChange: (name: string, options: OptionType | null) => void;
	options: OptionType[];
	size?: 'small' | 'medium' | undefined;
	label?: React.ReactNode;
}

export default function SearchSelectInput({
	defaultValue,
	name,
	onChange,
	options,
	size,
	label,
}: SearchSelectInputProps) {
	// 디폴트 값이 숫자인지 문자인지 확인한다.
	const type = typeof defaultValue;
	const values =
		type === 'string'
			? options.filter((x) => x.label === defaultValue)
			: options.filter((x) => x.id === defaultValue);
	return (
		<Autocomplete
			// key >> 값이 변경이 되면 value가 초기화 된다.
			key={defaultValue}
			value={values[0]}
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
