import React from 'react';
import { TextField } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';

interface MobileDatePickerInputProps {
	onChange: (name: string, value: string | null) => void;
	label: string;
	value: string | null;
	name: string;
	size?: 'small' | 'medium';
}

export default function MobileDatePickerInput({
	onChange,
	label,
	value,
	name,
	size,
}: MobileDatePickerInputProps) {
	return (
		<MobileDatePicker
			label={label}
			value={value}
			inputFormat="yyyy년MM월dd일"
			showToolbar={false}
			closeOnSelect
			// toolbarFormat="yyyy년MM월dd일"
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
