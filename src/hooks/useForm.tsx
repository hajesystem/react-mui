import React, { useState } from 'react';

interface UseFormProps {
	initialValues: object;
}

export default function useForm({ initialValues }: UseFormProps) {
	const [values, setValues] = useState(initialValues);

	const handleUpdateFiled = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
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
	};
}
