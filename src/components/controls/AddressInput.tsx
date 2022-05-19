import React, { useCallback, useEffect, useState } from 'react';
import { LocationOn } from '@mui/icons-material';
import {
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	SxProps,
	Theme,
} from '@mui/material';
import { daumAddress } from '../../utils';

type AddressInputProps = {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onIconChange: (key: string, value: string) => void;
	name: string;
	nextFocusId: string;
	sx?: SxProps<Theme> | undefined;
};

export default function AddressInput({
	onChange,
	onIconChange,
	nextFocusId,
	sx,
	name,
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [addressValue]);

	useEffect(() => console.log('addressValue>>', addressValue), [addressValue]);

	return (
		<FormControl variant="outlined" size="small">
			<InputLabel htmlFor="address">주소</InputLabel>
			<OutlinedInput
				id={name}
				name={name}
				value={addressValue}
				onChange={updateFiled}
				endAdornment={
					<InputAdornment position="end">
						<IconButton onClick={addressHandleClick} edge="end">
							<LocationOn sx={sx} />
						</IconButton>
					</InputAdornment>
				}
				label={name}
			/>
		</FormControl>
	);
}
