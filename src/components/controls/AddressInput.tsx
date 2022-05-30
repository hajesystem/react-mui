import React, { useCallback, useEffect, useState } from 'react';
import { LocationOn } from '@mui/icons-material';
import {
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	OutlinedTextFieldProps,
} from '@mui/material';
import { daumAddress } from '../../services';

interface AddressInputProps extends OutlinedTextFieldProps {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onIconChange: (key: string, value: string) => void;
	nextFocusId: string;
	name: string;
}

export default function AddressInput({
	onChange,
	onIconChange,
	nextFocusId,
	sx,
	name,
	...props
}: AddressInputProps) {
	const [addressValue, setAddressValue] = useState('');

	const addressHandleClick = useCallback(() => {
		daumAddress(nextFocusId, setAddressValue);
	}, [nextFocusId]);

	const updateFiled = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAddressValue(e.target.value);
		onChange(e);
	};

	useEffect(() => {
		onIconChange(name, addressValue);
	}, [addressValue]);

	return (
		<FormControl variant="outlined" size="small">
			<InputLabel htmlFor="address">주소</InputLabel>
			<OutlinedInput
				id={props.id}
				name={name}
				value={props.value}
				onChange={updateFiled}
				endAdornment={
					<InputAdornment position="end">
						<IconButton tabIndex={-1} onClick={addressHandleClick} edge="end">
							<LocationOn sx={sx} />
						</IconButton>
					</InputAdornment>
				}
				label={name}
			/>
		</FormControl>
	);
}
