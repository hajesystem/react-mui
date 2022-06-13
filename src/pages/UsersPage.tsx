import React, { useEffect, useState } from 'react';
import {
	Button,
	IconButton,
	Paper,
	SelectChangeEvent,
	Stack,
	useMediaQuery,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import tableDatas from './usersList.json';
import {
	DataTable,
	DataSearchInput,
	RowsSelectInput,
} from '../components/tables';
import { TableColumnType } from '../types';

export default function UsersPage() {
	const mobileSize = useMediaQuery('(max-width:440px)');
	const [pageSize, setPageSize] = useState<number>(10);
	const [search, setSearch] = useState('');
	const [selectionItems, setSelectionItems] = useState<number[]>([]);

	useEffect(() => console.log(selectionItems), [selectionItems]);

	const handleChangePageSize = (e: SelectChangeEvent) => {
		setPageSize(Number(e.target.value as string));
	};

	const handleUpdateFiled = (e: React.ChangeEvent<HTMLInputElement>) =>
		setSearch(e.target.value);

	// id는 array[union]를 typescript에서 사용하기 위해 union 타입으로 변환하기 위해 필요하다.
	//  array[string] type은 타입스크립트에서 사용할 수 없다.
	// interface Column extends TableColumnType {
	// 	id:
	// 		| 'user'
	// 		| 'password'
	// 		| 'name'
	// 		| 'phone'
	// 		| 'email'
	// 		| 'address'
	// 		| 'addressDetail'
	// 		| 'department'
	// 		| 'position'
	// 		| 'date';
	// }

	const columns: TableColumnType[] = [
		{
			id: 'user',
			field: 'user',
			headerName: '아이디',
			cellSx: {
				maxWidth: '100px',
				overflow: 'hidden',
				whiteSpace: 'nowrap',
				textOverflow: 'ellipsis',
			},
		},
		{
			id: 'password',
			field: 'password',
			hide: mobileSize,
			headerName: '패스워드',
		},
		{
			id: 'name',
			field: 'name',
			hide: mobileSize,
			headerName: '이름',
		},
		{
			id: 'phone',
			field: 'phone',
			headerName: '전화번호',
			valueFormatter: (params) =>
				params.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'),
		},
		{
			id: 'email',
			field: 'email',
			hide: mobileSize,
			headerName: '이메일',
		},
		{
			id: 'address',
			field: 'address',
			headerName: '주소',
		},
		{
			id: 'department',
			field: 'department',
			headerName: '부서',
		},
		{
			id: 'position',
			field: 'position',
			headerName: '직책',
		},
		{
			id: 'date',
			field: 'date',
			headerName: '입사일',
		},
	];

	const screenButtons = (
		<>
			<Button
				variant="outlined"
				size="small"
				disabled
				startIcon={<AddBoxIcon />}
			>
				추가
			</Button>
			<Button variant="outlined" size="small" startIcon={<EditIcon />}>
				수정
			</Button>
			<Button variant="outlined" size="small" startIcon={<DeleteIcon />}>
				삭제
			</Button>
		</>
	);
	const mobileButtons = (
		<>
			<IconButton disabled aria-label="추가" color="primary">
				<AddBoxIcon />
			</IconButton>
			<IconButton aria-label="수정" color="primary">
				<EditIcon />
			</IconButton>
			<IconButton aria-label="삭제" color="primary">
				<DeleteIcon />
			</IconButton>
		</>
	);

	return (
		<Paper elevation={3} sx={{ p: 2, mb: 2 }}>
			<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
				{!mobileSize ? screenButtons : mobileButtons}
				<RowsSelectInput
					pageSize={pageSize}
					onChange={handleChangePageSize}
					rowsPerPageOptions={[10, 15, 25, 50, 100]}
				/>
				<DataSearchInput onChange={handleUpdateFiled} />
			</Stack>
			<DataTable
				checkbox
				search={search}
				pagination
				pageSize={pageSize}
				rowDatas={tableDatas}
				columns={columns}
				selectionItems={selectionItems}
				setSelectionItems={setSelectionItems}
			/>
		</Paper>
	);
}
