/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import './App.css';

const appMain = css`
	padding-left: 20rem;
	width: 100%;
`;

function App() {
	return (
		<>
			<SideMenu />
			<div css={appMain}>
				<Header />
			</div>
		</>
	);
}

export default App;
