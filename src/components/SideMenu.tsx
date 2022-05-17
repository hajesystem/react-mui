/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

const sideMenu = css`
	display: flex;
	flex-direction: column;
	position: absolute;
	left: 0;
	width: 20rem;
	height: 100%;
	background-color: #253053;
`;

export default function SideMenu() {
	return <div css={sideMenu}>SideMenu</div>;
}
