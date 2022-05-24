import React, { useState } from 'react';

export default function useForm<T, S>(
	values: T,
	setValues: React.Dispatch<React.SetStateAction<T>>,
	initialValues: T,
	initialErrors: S,
	validate: any
) {
	const [errors, setErrors] = useState(initialErrors);
	const [submit, setSubmit] = useState(false);

	const handleUpdateFiled = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
		setErrors({ ...errors, [name]: validate[name] });
		setSubmit(Object.values(errors).every((x) => x === ''));
	};

	const handleClickUpdateFiled = (key: string, value: string) => {
		setValues({ ...values, [key]: value });
	};

	const onSubmit = async (callback: () => void) => {
		setErrors(validate);
		console.log('submit>>', submit);
		if (Object.values(errors).every((msg) => msg === '' && submit)) {
			callback();
		} else console.log('error');
	};

	const resetForm = () => {
		setValues(initialValues);
		setErrors(initialErrors);
	};

	return {
		handleUpdateFiled,
		handleClickUpdateFiled,
		errors,
		onSubmit,
		resetForm,
	};
}
