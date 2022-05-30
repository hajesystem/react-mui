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
	...props
}: PasswordInputProps) {
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<FormControl variant="outlined" size="small">
			<InputLabel htmlFor={props.name}>{props.label}</InputLabel>
			<OutlinedInput
				id={props.id}
				name={props.name}
				value={props.value}
				type={showPassword ? 'text' : 'password'}
				onChange={onChange}
				error={props.error}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							tabIndex={-1}
							edge="end"
							onClick={handleClickShowPassword}
						>
							{showPassword ? (
								<Visibility sx={props.sx} />
							) : (
								<VisibilityOff sx={props.sx} />
							)}
						</IconButton>
					</InputAdornment>
				}
				label={props.label}
			/>
		</FormControl>
	);
}
