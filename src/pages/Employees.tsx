import { Button, Paper, Stack, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { AddressInput, PasswordInput } from '../components/controls';
// import useForm from '../hooks/useForm';
import useInput from '../hooks/useInput';
import { min, overlap, required } from '../services/validationMessage';

const iconSize = { fontSize: '1.2rem' };

interface ValuelsType {
	user: string;
	password: string;
	confirmPassword: string;
	name: string;
	phone: string;
	email: string;
	address: string;
	addressDetail: string;
}

const initialValues: ValuelsType = {
	user: '',
	password: '',
	confirmPassword: '',
	name: '',
	phone: '',
	email: '',
	address: '',
	addressDetail: '',
};

const initialErrors = {
	user: '',
	phone: '',
};

const test = {
	staus: 'idle',
	msg: '이미 사용중인 아이디 입니다.',
};

export default function Employees() {
	// TODO 초기값과 같으면 검사하지 않음..??
	const validate: () => boolean = () => {
		const msg = {
			user:
				(required(values.user) || min(4, values.user) || overlap(test)) &&
				`${required(values.user)} ${min(4, values.user)} ${overlap(test)}`,
			phone: required(values.phone),
		};
		setErrors({ ...msg });
		// return to boolean
		return Object.values(msg).every((x) => x === '');
	};

	const {
		values,
		handleUpdateFiled,
		handleClickUpdateFiled,
		errors,
		setErrors,
	} = useInput(initialValues, initialErrors, validate);

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (validate()) {
			console.log('submit');
		}
	};

	useEffect(() => console.log('values>>>', values), [values]);
	useEffect(() => console.log('errors>>>', errors), [errors]);

	return (
		<Paper elevation={3} sx={{ p: 2, mb: 2 }}>
			<Stack component="form" onSubmit={handleSubmit}>
				<Stack spacing={3}>
					<TextField
						id="user"
						name="user"
						label="*아이디"
						variant="outlined"
						onChange={handleUpdateFiled}
						size="small"
						autoComplete="off"
						error={!!errors.user}
						helperText={errors.user && errors.user}
					/>
					<PasswordInput
						name="password"
						onChange={handleUpdateFiled}
						sx={iconSize}
						variant="outlined"
					/>
					<PasswordInput
						name="confirmPassword"
						onChange={handleUpdateFiled}
						sx={iconSize}
						variant="outlined"
					/>
					<TextField
						id="name"
						name="name"
						label="이름"
						variant="outlined"
						onChange={handleUpdateFiled}
						size="small"
						autoComplete="off"
					/>
					<TextField
						id="phone"
						name="phone"
						label="휴대전화"
						variant="outlined"
						onChange={handleUpdateFiled}
						size="small"
						autoComplete="off"
						error={!!errors.phone}
						helperText={errors.phone && errors.phone}
					/>
					<TextField
						id="email"
						name="email"
						label="이메일"
						variant="outlined"
						onChange={handleUpdateFiled}
						size="small"
						autoComplete="off"
					/>
					<AddressInput
						name="address"
						sx={iconSize}
						nextFocusId="addressDetail"
						onChange={handleUpdateFiled}
						onIconChange={handleClickUpdateFiled}
					/>
					<TextField
						id="addressDetail"
						name="addressDetail"
						label="상세주소"
						variant="outlined"
						onChange={handleUpdateFiled}
						size="small"
						autoComplete="off"
					/>
				</Stack>
				<Button
					variant="contained"
					type="submit"
					size="large"
					sx={{ marginTop: '3rem' }}
				>
					등록신청
				</Button>
			</Stack>
		</Paper>
	);
}
