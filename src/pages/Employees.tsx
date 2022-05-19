import { Button, Paper, Stack, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import {
	AddressInput,
	PasswordInput,
	ValidateInput,
} from '../components/controls';
import useForm from '../hooks/useForm';

const iconSize = { fontSize: '1.2rem' };

export default function Employees() {
	const initialValues = {
		user: '',
		password: '',
		confirmPassword: '',
		name: '',
		phone: '',
		email: '',
		address: '',
		addressDetail: '',
	};
	const { values, handleUpdateFiled, handleClickUpdateFiled } = useForm({
		initialValues,
	});

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		console.log('submit');
	};

	useEffect(() => console.log(values), [values]);

	return (
		<Paper elevation={3} sx={{ p: 2, mb: 2 }}>
			<Stack component="form" onSubmit={handleSubmit}>
				<Stack spacing={3}>
					<ValidateInput
						id="user"
						name="user"
						label="아이디"
						variant="outlined"
						minLength={5}
						maxLength={7}
						required
						onChange={handleUpdateFiled}
						size="small"
						autoComplete="off"
						helperText=""
					/>
					<PasswordInput
						name="password"
						onChange={handleUpdateFiled}
						sx={iconSize}
						error
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
