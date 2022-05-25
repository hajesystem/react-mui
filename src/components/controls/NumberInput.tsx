import React from 'react';
import NumberFormat from 'react-number-format';
import { TextField, OutlinedTextFieldProps } from '@mui/material';

interface NumberInputProps extends OutlinedTextFieldProps {
	value: string;
	format: string;
}

export default function NumberInput({
	value,
	format,
	...props
}: NumberInputProps) {
	return (
		<NumberFormat
			customInput={TextField}
			format={format}
			id={props.id}
			name={props.name}
			value={value}
			variant="outlined"
			onChange={props.onChange}
			size={props.size}
			label={props.label}
			error={props.error}
			helperText={props.helperText}
		/>
	);
}
