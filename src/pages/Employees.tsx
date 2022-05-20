/* eslint-disable react/jsx-props-no-spreading */
import { Button, Paper, Stack, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { AddressInput, PasswordInput } from '../components/controls';
import useForm from '../hooks/useForm';

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

export default function Employees() {
	const validate = (fieldValues = values) => {
		const msg = {
			user: fieldValues.user ? '' : '아이디 필드는 필수 항목입니다',
			phone: fieldValues.phone ? '' : '전화번호 필드는 필수 항목입니다',
		};
		setErrors({ ...msg });
		// return to boolean
		if (fieldValues === values) {
			return Object.values(msg).every((x) => x === '');
		}
		return false;
	};

	const {
		values,
		handleUpdateFiled,
		handleClickUpdateFiled,
		setErrors,
		errors,
	} = useForm({ initialValues, validate });

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		validate() && console.log('submit');
	};

	useEffect(() => console.log(values), [values]);

	return (
		<Paper elevation={3} sx={{ p: 2, mb: 2 }}>
			<Stack component="form" onSubmit={handleSubmit}>
				<Stack spacing={3}>
					<TextField
						id="user"
						name="user"
						label="아이디"
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
