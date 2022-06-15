import React, { useEffect } from 'react';

// document.getElementById('map') 가 먼저 생성후 사용이 가능하여 따로 컴포넌트를 분리하여 생성 후 스크립트 적용.
export default function DaumMap({ address }: { address: string }) {
	useEffect(() => {
		window.daum.maps.load(() => {
			const mapContainer = document.getElementById('map') as HTMLDivElement;
			const mapOption = {
				center: new window.daum.maps.LatLng(37.506502, 127.053617), // 지도 중심 좌표
				level: 4, // 지도 확대 레벨
			};

			const map = new window.daum.maps.Map(mapContainer, mapOption); // 지도 미리 생성
			const geocoder = new window.daum.maps.services.Geocoder(); // 주소를 좌표로 변환객체
			const marker = new window.daum.maps.Marker({
				// 마커 미리 생성
				position: new window.daum.maps.LatLng(37.537187, 127.005476),
				map,
			});
			geocoder.addressSearch(address, (results: any, status: any) => {
				if (status === window.daum.maps.services.Status.OK) {
					const result = results[0];
					const coords = new window.daum.maps.LatLng(result.y, result.x);
					mapContainer.style.display = 'block';
					map.relayout();
					map.setCenter(coords);
					marker.setPosition(coords);
				}
			});
		});
	}, [address]);
	// eslint-disable-next-line react/jsx-no-useless-fragment
	return <></>;
}
