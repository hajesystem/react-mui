export function required(value: string) {
	if (value) {
		return '';
	}
	return '필수 입력 항목입니다.';
}

export function min(num: number, value: string) {
	if (num < value.length) {
		return '';
	}
	return `${num}자 이상 입력하세요.`;
}

export function max(num: number, value: string) {
	if (num >= value.length) {
		return '';
	}
	return `${num + 1}자 이하 입력하세요.`;
}

export function pattern(regExp: RegExp, value: string) {
	if (regExp.test(value)) {
		return '';
	}
	return `지정된 형식과 일치하지 않습니다.`;
}

// TODO email phoneNumber
export function overlap(value: { staus: string; msg: string }) {
	if (value.staus !== 'error') {
		return '';
	}
	return value.msg;
}

export function email(value: string) {
	console.log(value);
}
