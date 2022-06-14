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
import tableDatas from './businessRegistration.json';
import {
	DataTable,
	DataSearchInput,
	RowsSelectInput,
} from '../components/tables';
import { TableColumnType } from '../types';
import FormModal from '../components/modals';
import User from '../components/forms/User';

export default function TablePage() {
	const mobileSize = useMediaQuery('(max-width:440px)');
	const [pageSize, setPageSize] = useState<number>(10);
	const [search, setSearch] = useState('');
	const [selectionItems, setSelectionItems] = useState<number[]>([]);
	const [openModal, setOpenModal] = useState(false);

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
	// 		| 'companyName'
	// 		| 'businessNumber'
	// 		| 'representative'
	// 		| 'address'
	// 		| 'businessType'
	// 		| 'businessItem'
	// 		| 'phone';
	// }

	// const columns: TableColumnType[] = [
	const columns: TableColumnType[] = [
		{
			id: 'companyName',
			field: 'companyName',
			headerName: '상호',
			headerAlign: 'center',
			cellSx: {
				maxWidth: '100px',
				overflow: 'hidden',
				whiteSpace: 'nowrap',
				textOverflow: 'ellipsis',
			},
		},
		{
			id: 'businessNumber',
			field: 'businessNumber',
			hide: mobileSize,
			headerName: '사업자등록번호',
			valueFormatter: (params) =>
				params.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3'),
		},
		{
			id: 'representative',
			field: 'representative',
			hide: mobileSize,
			headerName: '대표',
			headerAlign: 'center',
		},
		{
			id: 'address',
			field: 'address',
			headerName: '주소',
			cellOnClick: (e) => console.log(e.currentTarget.innerText),
			cellSx: {
				'&:hover': {
					cursor: 'pointer',
				},
				maxWidth: '250px',
				overflow: 'hidden',
				whiteSpace: 'nowrap',
				textOverflow: 'ellipsis',
			},
		},
		{
			id: 'businessType',
			field: 'businessType',
			hide: mobileSize,
			headerName: '업태',
			headerAlign: 'center',
		},
		{
			id: 'businessItem',
			field: 'businessItem',
			hide: mobileSize,
			headerName: '종목',
			headerAlign: 'center',
		},
		{
			id: 'phone',
			field: 'phone',
			headerName: '연락처',
			headerAlign: 'center',
			cellSx: {
				minWidth: '100px',
			},
		},
	];

	const open = () => {
		setOpenModal(true);
	};
	const close = () => {
		setOpenModal(false);
	};

	const screenButtons = (
		<>
			<Button
				variant="outlined"
				size="small"
				disabled={false}
				onClick={open}
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
			<IconButton
				disabled={false}
				aria-label="추가"
				onClick={open}
				color="primary"
			>
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
					pageSize={10}
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
			<FormModal open={openModal} close={close} title="모달 타이틀">
				<User close={close} />
			</FormModal>
		</Paper>
	);
}
