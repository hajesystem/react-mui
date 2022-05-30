import { Button, Paper, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import {
	AddressInput,
	PasswordInput,
	SearchSelectInput,
} from '../components/controls';
import useForm from '../hooks/useForm';
import * as message from '../services/validationMessage';
import * as pattern from '../services/pattern';
import { OptionType } from '../types';

const iconSize = { fontSize: '1.2rem' };

type ValuelsType = {
	user: string;
	password: string;
	confirmPassword: string;
	name: string;
	phone: string;
	email: string;
	address: string;
	addressDetail: string;
	department: string | null;
};

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
		department: '',
	};

	// initialValidationMessages 타입스크립트에서 제너릭을 사용하기 위한 초기값을 선언한다.
	const initialValidationMessages = {
		user: '',
		password: '',
		confirmPassword: '',
		phone: '',
		email: '',
	};
	// useForm에서 선언하지 않는 이유는 변수 선언을 맨 위로 올리기 위하여 먼저 선언한다.
	const [values, setValues] = useState(initialValues);

	// fatch API 리턴 테스트값
	const test = {
		staus: 'idle',
		msg: '이미 사용중인 아이디 입니다.',
	};

	const userMsg =
		message.required(values.user) +
		message.pattern(
			pattern.username.pattern,
			pattern.username.msg,
			values.user
		) +
		message.overlap(test);

	//  패스워드 메세지
	const passwordMsg = message.required(values.password);
	const confirmPasswordMsg =
		message.required(values.confirmPassword) +
		message.match(values.password, values.confirmPassword);

	const phoneMsg = message.mobilPhoneNumber(values.phone);

	const emailMsg = message.pattern(
		pattern.email.pattern,
		pattern.email.msg,
		values.email
	);

	// 에러 메세지 업데이트
	useEffect(() => {
		const valuesCondition = Object.values(values).every(
			(value) => value === ''
		);
		if (!valuesCondition) {
			setValidationMessges({
				...validationMessages,
				user: userMsg,
				password: passwordMsg,
				confirmPassword: confirmPasswordMsg,
				phone: values.phone ? phoneMsg.msg : '',
				email: emailMsg,
			});
		}
	}, [
		values.user,
		values.password,
		values.confirmPassword,
		values.phone,
		values.email,
	]);

	// select input
	const departmentOptions: OptionType[] = [
		{ id: 1, value: '관리부', label: '관리부 라벨' },
		{ id: 2, value: '출력팀', label: '출력팀 라벨' },
		{ id: 3, value: '디지털출력팀', label: '디지털출력팀 라벨' },
		{ id: 4, value: '인쇄제작부', label: '인쇄제작부 라벨' },
		{ id: 5, value: '디자인팀', label: '디자인팀 라벨' },
		{ id: 6, value: '영업부', label: '영업부 라벨' },
	];

	const {
		handleUpdateFiled,
		selectUpdateFiled,
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
	useEffect(() => console.log('values>>>', values), [values]);

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
						label="*패스워드"
						value={values.password}
						onChange={handleUpdateFiled}
						sx={iconSize}
						variant="outlined"
						error={!!validationMessages.password}
						helperText={validationMessages.password}
					/>
					<PasswordInput
						name="confirmPassword"
						label="*패스워드 확인"
						value={values.confirmPassword}
						onChange={handleUpdateFiled}
						sx={iconSize}
						variant="outlined"
						error={!!validationMessages.confirmPassword}
						helperText={validationMessages.confirmPassword}
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
					<NumberFormat
						customInput={TextField}
						format={phoneMsg.format}
						allowLeadingZeros
						allowNegative={false}
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
					<SearchSelectInput
						name="department"
						options={departmentOptions}
						onChange={selectUpdateFiled}
						label="부서"
						size="small"
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