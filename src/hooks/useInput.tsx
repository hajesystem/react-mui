import React, { useState } from 'react';

export default function useInput<T, S>(
	initialValues: T,
	initialErrors: S,
	validate: () => boolean
) {
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState(initialErrors);

	const handleUpdateFiled = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
		validate();
	};

	const handleClickUpdateFiled = (key: string, value: string) => {
		setValues({ ...values, [key]: value });
	};

	const resetForm = () => {
		setValues(initialValues);
	};

	return {
		values,
		setValues,
		handleUpdateFiled,
		handleClickUpdateFiled,
		resetForm,
		errors,
		setErrors,
	};
}
