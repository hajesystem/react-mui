import React, { useState } from 'react';

export default function useForm<T, S>(
	values: T,
	setValues: React.Dispatch<React.SetStateAction<T>>,
	initialValues: T,
	initialValidationMessages: S
) {
	const [validationMessages, setValidationMessges] = useState(
		initialValidationMessages
	);
	const [submit, setSubmit] = useState(false);

	const handleUpdateFiled = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
		setSubmit(Object.values(validationMessages).every((msg) => msg === ''));
	};

	const selectUpdateFiled = (
		name: string,
		options: { id: number; value: string; label: string } | null
	) => {
		if (options) {
			setValues({
				...values,
				[name]: options.value,
			});
			setSubmit(Object.values(validationMessages).every((msg) => msg === ''));
		}
	};

	const handleClickUpdateFiled = (key: string, value: string) => {
		setValues({ ...values, [key]: value });
	};

	const onSubmit = async (callback: () => void) => {
		if (Object.values(values).every((value) => value === '')) {
			// TODO 모달띄우기
			alert('필드에 입력값이 있어야 합니다.');
		}
		if (
			Object.values(validationMessages).every((msg) => msg === '' && submit)
		) {
			callback();
		} else console.log('error');
	};

	const resetForm = () => {
		setSubmit(false);
		setValues(initialValues);
		setValidationMessges(initialValidationMessages);
	};

	return {
		handleUpdateFiled,
		selectUpdateFiled,
		handleClickUpdateFiled,
		validationMessages,
		setValidationMessges,
		onSubmit,
		resetForm,
	};
}
