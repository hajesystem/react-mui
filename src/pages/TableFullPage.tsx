/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import {
	Button,
	Checkbox,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	Pagination,
	Paper,
	Select,
	SelectChangeEvent,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	useMediaQuery,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Search } from '@mui/icons-material';
import { TableColumnType } from '../types';
import tableDatas from './businessRegistration.json';
import { debounce } from '../services';
import { FormModal } from '../components/modals';
import FormPage from './FormPage';

export default function TableFullPage() {
	const [rows, setRows] = useState(tableDatas);
	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(10);
	const [showRows, setShowRows] = useState(rows.slice(0, pageSize));
	const [tableCheckbox, setTableCheckbox] = useState(true);
	const [selectionModel, setSelectionModel] = useState<number[]>([]);
	const [checkedAll, setCheckedAll] = useState(false);

	const mobileSize = useMediaQuery('(max-width:440px)');

	useEffect(() => {
		const start = page * pageSize - pageSize;
		const end = page * pageSize;
		setShowRows(rows.slice(start, end));
	}, [page, rows]);

	useEffect(() => {
		setCheckedAll(false);
		setSelectionModel([]);
		setShowRows(rows.slice(0, pageSize));
	}, [pageSize]);

	useEffect(
		() => console.log('selectionModel>>>', selectionModel),
		[selectionModel]
	);

	useEffect(() => console.log('rows lenth >>>', rows.length), [rows]);

	// id는 array[union]를 typescript에서 사용하기 위해 union 타입으로 변환하기 위해 필요하다.
	//  array[string] type은 타입스크립트에서 사용할 수 없다.
	interface Column extends TableColumnType {
		id:
			| 'companyName'
			| 'businessNumber'
			| 'representative'
			| 'address'
			| 'businessType'
			| 'businessItem'
			| 'phone';
	}

	const columns: Column[] = [
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

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		searchRecord(e.target.value, setRows);
	};

	const handleChangePageSize = (e: SelectChangeEvent) => {
		setPageSize(Number(e.target.value as string));
	};

	// 검색 코드
	const searchRecord = useMemo(
		() =>
			debounce((text, setArray) => {
				const searchText = new RegExp(text, 'gi');
				const searchArray = tableDatas.filter((record) =>
					Object.values(record).join('^').match(searchText)
				);
				setPage(1);
				setArray(searchArray);
			}, 300),
		[]
	);

	// 체크박스
	const handleChangeAllChecked = () => {
		setCheckedAll(!checkedAll);
	};
	useEffect(() => {
		if (checkedAll) {
			const checkedIds = showRows.map((record) => record.id);
			setSelectionModel(checkedIds);
		}
		if (!checkedAll) {
			setSelectionModel([]);
		}
	}, [checkedAll]);

	const handleChangeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { checked, id } = e.target;
		const rowID = Number(id);
		if (checked) {
			setSelectionModel([...selectionModel, rowID]);
		}
		if (!checked) {
			const newArray = selectionModel.filter((item) => item !== rowID);
			setSelectionModel(newArray);
		}
	};

	// 페이지네이션
	const handleChangePagination = (
		_event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setCheckedAll(false);
		setSelectionModel([]);
		setPage(value);
	};

	useEffect(() => console.log(checkedAll), [checkedAll]);
	useEffect(() => console.log('rows>>', rows), [rows]);

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
				<TextField
					label="검색"
					size="small"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<Search />
							</InputAdornment>
						),
					}}
					onChange={onChange}
				/>
				<FormControl sx={{ width: 100 }} size="small">
					<InputLabel id="select-label">열</InputLabel>
					<Select
						labelId="select-label"
						value={String(pageSize)}
						label="Rows"
						onChange={handleChangePageSize}
					>
						<MenuItem value={10}>10</MenuItem>
						<MenuItem value={25}>25</MenuItem>
						<MenuItem value={50}>50</MenuItem>
						<MenuItem value={100}>100</MenuItem>
					</Select>
				</FormControl>
			</Stack>
			<Stack spacing={3}>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								{tableCheckbox && (
									<TableCell padding="checkbox">
										<Checkbox
											color="primary"
											checked={checkedAll}
											indeterminate={
												checkedAll && showRows.length !== selectionModel.length
											}
											onChange={handleChangeAllChecked}
										/>
									</TableCell>
								)}
								{columns.map(
									(column) =>
										!column.hide && (
											<TableCell
												key={column.field}
												className={column.headerClassName}
												sx={column.headerSx}
												onClick={column.headerOnClick}
												onChange={column.headerOnChange}
												align={column.headerAlign}
											>
												{column.headerName}
											</TableCell>
										)
								)}
							</TableRow>
						</TableHead>
						<TableBody>
							{showRows.map((record) => (
								<TableRow
									key={record.id}
									// sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									sx={{
										'&:nth-of-type(odd)': {
											backgroundColor: '#fafafa',
										},
									}}
								>
									{tableCheckbox && (
										<TableCell padding="checkbox">
											<Checkbox
												color="primary"
												id={String(record.id)}
												checked={selectionModel.includes(record.id)}
												onChange={handleChangeChecked}
											/>
										</TableCell>
									)}
									{columns.map(
										(column) =>
											!column.hide && (
												<TableCell
													key={column.id}
													onClick={column.cellOnClick}
													sx={column.cellSx}
													align={column.cellAlign}
													onChange={column.cellOnChange}
												>
													{column.valueFormatter
														? column.valueFormatter(record[column.id] as string)
														: record[column.id]}
												</TableCell>
											)
									)}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<Stack spacing={2} alignItems="end">
					<Pagination
						page={page}
						count={Math.ceil(rows.length / pageSize)}
						color="primary"
						onChange={handleChangePagination}
					/>
				</Stack>
			</Stack>
		</Paper>
	);
}
