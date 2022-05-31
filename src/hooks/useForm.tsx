import React, { useState } from 'react';
import { OptionType } from '../types';

export default function useForm<T, S>(
	values: T,
	setValues: React.Dispatch<React.SetStateAction<T>>,
	initialValues: T,
	initialValidationMessages: S
) {
	const [validationMessages, setValidationMessges] = useState(
		initialValidationMessages
	);
	const [submitStaus, setSubmitStaus] = useState(false);

	const handleUpdateFiled = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
		setSubmitStaus(
			Object.values(validationMessages).every((msg) => msg === '')
		);
	};

	// 선택시 label to value 업데이트
	const handleSelectLabelUpdateFiled = (
		name: string,
		options: OptionType | null
	) => {
		if (options) {
			setValues({
				...values,
				[name]: options.label,
			});
			setSubmitStaus(
				Object.values(validationMessages).every((msg) => msg === '')
			);
		}
	};

	// 선택시 id to value 업데이트
	const handleSelectIdUpdateFiled = (
		name: string,
		options: OptionType | null
	) => {
		if (options) {
			setValues({
				...values,
				[name]: options.id,
			});
			setSubmitStaus(
				Object.values(validationMessages).every((msg) => msg === '')
			);
		}
	};

	const handleClickUpdateFiled = (key: string, value: string) => {
		setValues({ ...values, [key]: value });
	};

	const onSubmit = async (callback: () => void) => {
		if (
			Object.values(values).every((value) => value === '' || value === null)
		) {
			// TODO 모달띄우기
			alert('필드에 입력값이 있어야 합니다.');
		}
		if (
			Object.values(validationMessages).every(
				(msg) => msg === '' && submitStaus
			)
		) {
			callback();
		} else console.log('error');
	};

	const resetForm = () => {
		setSubmitStaus(false);
		setValues(initialValues);
		setValidationMessges(initialValidationMessages);
	};

	return {
		handleUpdateFiled,
		handleSelectIdUpdateFiled,
		handleSelectLabelUpdateFiled,
		handleClickUpdateFiled,
		validationMessages,
		setValidationMessges,
		onSubmit,
		resetForm,
	};
}
