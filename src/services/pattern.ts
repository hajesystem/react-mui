/* eslint-disable no-useless-escape */
export const username = {
	pattern: /^[A-Za-z0-9]{4,32}$/,
	msg: '영문,숫자만 사용가능하며, 최소 4글자 이상 최대 32글자까지 입력',
};

export const email = {
	pattern: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
	msg: '이메일 형식이 아닙니다.',
};

export const password = {
	pattern: /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
	msg: '최소 8자 이상으로 숫자, 특수문자가 각각 최소 1개이상',
};

export const password2 = {
	pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
	msg: '최소 8자 이상으로 영문자 대문자, 영문자 소문자, 숫자, 특수문자가 각각 최소 1개 이상',
};

export const mobile = {
	pattern: /^010-?([0-9]{4})-?([0-9]{4})/,
	msg: '휴대폰 형식이 아닙니다.',
};

export const number = {
	pattern: /^[0-9]/g,
	msg: '숫자만 입력',
};
