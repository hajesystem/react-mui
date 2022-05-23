import React, { useState } from 'react';

export default function useInput<T, S>(
	values: T,
	setValues: React.Dispatch<React.SetStateAction<T>>,
	initialValues: T,
	initialErrors: S,
	initialValidate: any
) {
	const [errors, setErrors] = useState(initialErrors);
	// const [validate, setValidate] = useState(initialValidate);
	const [submit, setSubmit] = useState(false);

	const handleUpdateFiled = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
		setErrors({ ...errors, [name]: initialValidate[name] });
		// setOnSubmit(Object.values(errors).every((x) => x === ''));
	};

	const handleClickUpdateFiled = (key: string, value: string) => {
		setValues({ ...values, [key]: value });
	};

	const resetForm = () => {
		setValues(initialValues);
	};

	const onSubmit = async (callback: () => void) => {
		setErrors(initialValidate);
		// TODO setSubmit
		if (Object.values(errors).every((x) => x === '' && submit)) {
			callback();
		}
	};

	return {
		handleUpdateFiled,
		handleClickUpdateFiled,
		resetForm,
		errors,
		setErrors,
		onSubmit,
		setSubmit,
	};
}
