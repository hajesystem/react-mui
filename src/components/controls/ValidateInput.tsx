import React, { useState } from 'react';
import { OutlinedTextFieldProps, TextField } from '@mui/material';

interface ValidateInputProps extends OutlinedTextFieldProps {
	minLength?: number;
	maxLength?: number;
	regExp?: RegExp;
}

export default function ValidateInput({ ...props }: ValidateInputProps) {
	const initialRules = {
		status: 'idle',
		msg: '',
	};
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isRules, setIsRules] = useState(initialRules);

	return (
		<TextField
			id={props.id}
			name={props.name}
			label={props.label}
			type={props.type}
			required={props.required}
			variant={props.variant}
			onChange={props.onChange}
			onClick={props.onClick}
			size={props.size}
			autoComplete={props.autoComplete}
			error={isRules.status === 'error'}
			helperText={isRules.status === 'error' ? isRules.msg : ''}
		/>
	);
}
