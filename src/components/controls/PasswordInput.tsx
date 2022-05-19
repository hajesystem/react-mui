import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	OutlinedTextFieldProps,
} from '@mui/material';

interface PasswordInputProps extends OutlinedTextFieldProps {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordInput({
	onChange,
	name,
	sx,
	error,
}: PasswordInputProps) {
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<FormControl variant="outlined" size="small">
			<InputLabel htmlFor="password">패스워드</InputLabel>
			<OutlinedInput
				id={name}
				name={name}
				type={showPassword ? 'text' : 'password'}
				onChange={onChange}
				error={error}
				endAdornment={
					<InputAdornment position="end">
						<IconButton edge="end" onClick={handleClickShowPassword}>
							{showPassword ? (
								<Visibility sx={sx} />
							) : (
								<VisibilityOff sx={sx} />
							)}
						</IconButton>
					</InputAdornment>
				}
				label={name}
			/>
		</FormControl>
	);
}
