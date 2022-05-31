import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
	IconButton,
	InputAdornment,
	OutlinedTextFieldProps,
	TextField,
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
		<TextField
			id={props.id}
			name={props.name}
			value={props.value}
			variant={props.variant}
			size={props.size}
			sx={props.sx}
			type={showPassword ? 'text' : 'password'}
			onChange={onChange}
			error={props.error}
			helperText={props.helperText}
			InputProps={{
				endAdornment: (
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
				),
			}}
			label={props.label}
		/>
		// </FormControl>
	);
}
