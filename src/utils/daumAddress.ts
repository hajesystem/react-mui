/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
	interface Window {
		daum: any;
	}
}

export default function daumAddress(
	nextFocusId: string,
	set: React.Dispatch<React.SetStateAction<string>>
) {
	new window.daum.Postcode({
		oncomplete(data: {
			userSelectedType: string;
			roadAddress: string;
			jibunAddress: string;
		}) {
			let addr = ''; // 주소 변수

			if (data.userSelectedType === 'R') {
				// 사용자가 도로명 주소를 선택했을 경우
				addr = data.roadAddress;
			} else {
				// 사용자가 지번 주소를 선택했을 경우(J)
				addr = data.jibunAddress;
			}
			// 우편번호와 주소 정보를 해당 필드에 넣는다.
			set(addr);
			(document.getElementById('address') as HTMLInputElement).value = addr;
			// 커서를 상세주소 필드로 이동한다.
			(document.getElementById(nextFocusId) as HTMLInputElement).focus();
		},
	}).open();
}
