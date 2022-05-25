export function required(value: string) {
	if (value) {
		return '';
	}
	return '필수 입력 항목입니다.';
}

export function min(num: number, value: string) {
	if (!value || num - 1 < value.length) {
		return '';
	}
	return `${num}자 이상 입력하세요.`;
}

export function max(num: number, value: string) {
	if (!value || num >= value.length) {
		return '';
	}
	return `${num + 1}자 이하 입력하세요.`;
}

export function pattern(regExp: RegExp, msg: string, value: string) {
	if (!value || regExp.test(value)) {
		return '';
	}
	return msg;
}

// TODO fetch API
export function overlap(value: { staus: string; msg: string }) {
	if (!value || value.staus !== 'error') {
		return '';
	}
	return value.msg;
}
