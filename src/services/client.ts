import axios from 'axios';

export default function client() {
	axios.create({
		// 다른 도메인간 쿠키 전송
		withCredentials: true,
		// baseURL: 'http://localhost:3200',
	});
}
