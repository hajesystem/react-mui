import React from 'react';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';

interface DatePickerInputProps {
	onChange: (name: string, value: string | null) => void;
	label: string;
	value: string | null;
	name: string;
	size?: 'small' | 'medium';
}

export default function DatePickerInput({
	onChange,
	label,
	value,
	name,
	size,
}: DatePickerInputProps) {
	return (
		<DatePicker
			label={label}
			value={value}
			inputFormat="yyyy년MM월dd일"
			mask="____년__월__일"
			onChange={(newValue) => {
				if (newValue) {
					const date = format(new Date(newValue), 'yyyy-MM-dd');
					onChange(name, date);
				}
			}}
			// eslint-disable-next-line react/jsx-props-no-spreading
			renderInput={(params) => <TextField {...params} size={size} />}
		/>
	);
}
