import React from 'react';
import NumberFormat from 'react-number-format';
import { TextField, OutlinedTextFieldProps } from '@mui/material';

interface PhoneInputProps extends OutlinedTextFieldProps {
	value: string;
}

function PhoneInput({ value, ...props }: PhoneInputProps) {
	return (
		<NumberFormat
			customInput={TextField}
			format="##########"
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

export default PhoneInput;
