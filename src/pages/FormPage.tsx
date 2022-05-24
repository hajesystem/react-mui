/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Paper, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AddressInput, PasswordInput } from '../components/controls';
import useForm from '../hooks/useForm';
import { overlap, pattern, required } from '../services/validationMessage';
import * as regexp from '../services/pattern';

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

export default function FormPage() {
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

	// initialValidationMessages 타입스크립트에서 제너릭을 사용하기 위한 초기값을 선언한다.
	const initialValidationMessages = {
		user: '',
		phone: '',
		email: '',
	};
	// useForm에서 선언하지 않는 이유는 변수 선언을 맨 위로 올리기 위하여 먼저 선언한다.
	const [values, setValues] = useState(initialValues);

	// fatch API 리턴 테스트값
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const test = {
		staus: 'idle',
		msg: '이미 사용중인 아이디 입니다.',
	};

	const userMsg =
		required(values.user) +
		pattern(regexp.username.pattern, values.user, regexp.username.msg) +
		overlap(test);

	const phoneMsg = required(values.phone);

	const emailMsg = pattern(
		regexp.email.pattern,
		values.email,
		regexp.email.msg
	);

	// 에러 메세지 업데이트
	useEffect(() => {
		const valuesCondition = Object.values(values).every(
			(value) => value === ''
		);
		if (!valuesCondition) {
			setValidationMessges({
				user: userMsg || '',
				phone: phoneMsg || '',
				email: emailMsg || '',
			});
		}
	}, [values.user, values.phone, values.email]);

	const {
		handleUpdateFiled,
		handleClickUpdateFiled,
		validationMessages,
		setValidationMessges,
		onSubmit,
		resetForm,
	} = useForm(values, setValues, initialValues, initialValidationMessages);

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		onSubmit(() => {
			console.log('submit');
			console.log('values>>>', values);
		});
	};

	return (
		<Paper elevation={3} sx={{ p: 2, mb: 2 }}>
			<Stack component="form" onSubmit={handleSubmit}>
				<Stack spacing={3}>
					<TextField
						name="user"
						value={values.user}
						label="*아이디"
						variant="outlined"
						onChange={handleUpdateFiled}
						size="small"
						autoComplete="off"
						error={!!validationMessages.user}
						helperText={validationMessages.user}
					/>
					<PasswordInput
						name="password"
						label="패스워드"
						value={values.password}
						onChange={handleUpdateFiled}
						sx={iconSize}
						variant="outlined"
					/>
					<PasswordInput
						name="confirmPassword"
						label="패스워드 확인"
						value={values.confirmPassword}
						onChange={handleUpdateFiled}
						sx={iconSize}
						variant="outlined"
					/>
					<TextField
						name="name"
						value={values.name}
						label="이름"
						variant="outlined"
						onChange={handleUpdateFiled}
						size="small"
						autoComplete="off"
					/>
					<TextField
						name="phone"
						value={values.phone}
						label="휴대전화"
						variant="outlined"
						onChange={handleUpdateFiled}
						size="small"
						autoComplete="off"
						error={!!validationMessages.phone}
						helperText={validationMessages.phone}
					/>
					<TextField
						name="email"
						value={values.email}
						label="이메일"
						variant="outlined"
						onChange={handleUpdateFiled}
						size="small"
						autoComplete="off"
						error={!!validationMessages.email}
						helperText={validationMessages.email}
					/>
					<AddressInput
						name="address"
						value={values.address}
						sx={iconSize}
						nextFocusId="addressDetail"
						onChange={handleUpdateFiled}
						onIconChange={handleClickUpdateFiled}
						variant="outlined"
					/>
					<TextField
						id="addressDetail"
						name="addressDetail"
						value={values.addressDetail}
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
				<Button
					variant="outlined"
					size="large"
					sx={{ marginTop: '1rem' }}
					onClick={resetForm}
				>
					초기화
				</Button>
			</Stack>
		</Paper>
	);
}
