import { Button, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ko } from 'date-fns/locale';
import {
	AddressInput,
	DatePickerInput,
	MobileDatePickerInput,
	PasswordInput,
	SearchSelectInput,
} from '../controls';
import useForm from '../../hooks/useForm';
import * as message from '../../services/validationMessage';
import * as pattern from '../../services/pattern';
import { OptionType } from '../../types';

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
	department: string;
	departmentId: number | null;
	date: string;
	datePicker: string | null;
	mobileDatePicker: string | null;
};

interface UserType {
	close?: () => void;
}

export default function User({ close }: UserType) {
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
		departmentId: null,
		date: '',
		datePicker: null,
		mobileDatePicker: '2022-06-02',
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
		if (values.user !== '') {
			setValidationMessges({
				...validationMessages,
				user: userMsg,
			});
		}
	}, [values.user]);

	useEffect(() => {
		if (values.password !== '') {
			setValidationMessges({
				...validationMessages,
				password: passwordMsg,
			});
		}
	}, [values.password]);

	useEffect(() => {
		if (values.confirmPassword !== '') {
			setValidationMessges({
				...validationMessages,
				confirmPassword: confirmPasswordMsg,
			});
		}
	}, [values.confirmPassword]);

	useEffect(() => {
		const valuesCondition = Object.values(values).every(
			(value) => value === '' || value === null
		);
		if (!valuesCondition) {
			setValidationMessges({
				...validationMessages,
				phone: values.phone ? phoneMsg.msg : '',
				email: emailMsg,
			});
		}
	}, [values.phone, values.email]);

	// select input
	const departmentOptions: OptionType[] = [
		{ id: 1, label: '관리부' },
		{ id: 2, label: '출력팀' },
		{ id: 3, label: '디지털출력팀' },
		{ id: 4, label: '인쇄제작부' },
		{ id: 5, label: '디자인팀' },
		{ id: 6, label: '영업부' },
	];

	const {
		handleUpdateFiled,
		handleSelectIdUpdateFiled,
		handleSelectLabelUpdateFiled,
		handleDateUpdateFiled,
		handleClickUpdateFiled,
		validationMessages,
		setValidationMessges,
		onSubmit,
		resetForm,
	} = useForm(values, setValues, initialValues, initialValidationMessages);

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		setValidationMessges({
			...validationMessages,
			user: userMsg,
			password: passwordMsg,
			confirmPassword: confirmPasswordMsg,
			phone: values.phone ? phoneMsg.msg : '',
			email: emailMsg,
		});
		onSubmit(() => {
			console.log('submit');
			console.log('values>>>', values);
		});
	};
	useEffect(
		() => console.log('validationMessages>>>', validationMessages),
		[validationMessages]
	);
	useEffect(() => console.log('values>>>', values), [values]);

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
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
						size="small"
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
						size="small"
						error={!!validationMessages.confirmPassword}
						helperText={validationMessages.user}
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
						defaultValue={values.department}
						name="department"
						options={departmentOptions}
						onChange={handleSelectLabelUpdateFiled}
						label="부서"
						size="small"
					/>
					<SearchSelectInput
						defaultValue={values.departmentId}
						name="departmentId"
						options={departmentOptions}
						onChange={handleSelectIdUpdateFiled}
						label="부서ID"
						size="small"
					/>
					<TextField
						name="date"
						label="date"
						type="date"
						size="small"
						key={values.date}
						defaultValue={values.date}
						onChange={handleUpdateFiled}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<DatePickerInput
						label="date picker"
						name="datePicker"
						value={values.datePicker}
						size="small"
						onChange={handleDateUpdateFiled}
					/>
					<MobileDatePickerInput
						label="date picker"
						name="mobileDatePicker"
						value={values.mobileDatePicker}
						size="small"
						onChange={handleDateUpdateFiled}
					/>
				</Stack>
				<Stack spacing={2} direction="row-reverse" sx={{ mt: 3 }}>
					<Button variant="contained" type="submit" size="medium">
						저장
					</Button>
					<Button variant="outlined" size="medium" onClick={close || resetForm}>
						{close ? '취소' : 'RESET'}
					</Button>
				</Stack>
			</Stack>
		</LocalizationProvider>
	);
}
