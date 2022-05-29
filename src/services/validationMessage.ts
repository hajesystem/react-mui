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
export function mobilPhoneNumber(number: string) {
	const message = (reg: RegExp, value: string) =>
		reg.test(value) ? '' : '휴대폰 형식이 아닙니다.';
	const checkNum = number.substring(0, 3);
	if (checkNum === '010') {
		const reg = /^(\d{3})(\d{4})(\d{4})/;
		return { format: '###########', msg: message(reg, number) };
	}
	return { format: undefined, msg: '휴대폰 형식이 아닙니다.' };
}

// react-number-format을 위한 format형식 리턴.
export function phoneNumber(number: string) {
	const message = (reg: RegExp, value: string) =>
		reg.test(value) ? '' : '전화번호 형식이 아닙니다.';

	const checkNum = number.substring(0, 3);

	if (checkNum.substring(0, 2) === '15' || checkNum.substring(0, 2) === '16') {
		const reg = /^(\d{4})(\d{4})/;
		return { format: '########', msg: message(reg, number) };
	}
	if (checkNum.substring(0, 2) === '02') {
		const reg = /^(\d{2})(\d{3,4})(\d{4})/;
		return { format: '##########', msg: message(reg, number) };
	}
	if (checkNum === '010' || checkNum === '070' || checkNum === '080') {
		const reg = /^(\d{3})(\d{4})(\d{4})/;
		return { format: '###########', msg: message(reg, number) };
	}
	if (checkNum.substring(0, 1) === '0') {
		const reg = /^\d{3}\d{3,4}\d{4}/;
		if (checkNum === '031') {
			return { format: '##########', msg: message(reg, number) };
		}
		if (checkNum === '032') {
			return { format: '##########', msg: message(reg, number) };
		}
		if (checkNum === '033') {
			return { format: '##########', msg: message(reg, number) };
		}
		if (checkNum === '041') {
			return { format: '##########', msg: message(reg, number) };
		}
		if (checkNum === '042') {
			return { format: '##########', msg: message(reg, number) };
		}
		if (checkNum === '043') {
			return { format: '##########', msg: message(reg, number) };
		}
		if (checkNum === '051') {
			return { format: '##########', msg: message(reg, number) };
		}
		if (checkNum === '052') {
			return { format: '##########', msg: message(reg, number) };
		}
		if (checkNum === '053') {
			return { format: '##########', msg: message(reg, number) };
		}
		if (checkNum === '054') {
			return { format: '##########', msg: message(reg, number) };
		}
		if (checkNum === '055') {
			return { format: '##########', msg: message(reg, number) };
		}
		if (checkNum === '061') {
			return { format: '##########', msg: message(reg, number) };
		}
		if (checkNum === '062') {
			return { format: '##########', msg: message(reg, number) };
		}
		if (checkNum === '063') {
			return { format: '##########', msg: message(reg, number) };
		}
		if (checkNum === '064') {
			return { format: '###########', msg: message(reg, number) };
		}
	}
	return { format: undefined, msg: '전화번호 형식이 아닙니다.' };
}
