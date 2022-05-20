/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

interface UseFormProps {
	initialValues: any;
	validate: (fieldValues?: any) => boolean;
}

export default function useForm({ initialValues, validate }: UseFormProps) {
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState<any>({});

	const handleUpdateFiled = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
		validate({ [name]: value });
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
