/* eslint-disable @typescript-eslint/no-explicit-any */
import camelcaseKeys from 'camelcase-keys';

export default function nullToEmpyString(data: any) {
	const camelcaseKetsData = camelcaseKeys(data);
	if (data) {
		const nullToString = JSON.parse(
			JSON.stringify(camelcaseKetsData).replaceAll(':null,', ':"",')
		);
		return nullToString;
	}
	return data;
}
