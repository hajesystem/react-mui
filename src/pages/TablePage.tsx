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
import tableDatas from './tabledata.json';
import { debounce } from '../services';

export default function TablePage() {
	const [rows, setRows] = useState(tableDatas);
	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(10);
	const [showRows, setShowRows] = useState(rows.slice(0, pageSize));
	const [tableCheckbox, setTableCheckbox] = useState(true);
	const [selectionModel, setSelectionModel] = useState<number[]>([]);
	const [checkedAll, setCheckedAll] = useState(false);

	const mobileSize = useMediaQuery('(min-width:440px)');

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

	const columns: TableColumnType[] = [
		{
			field: 'companyName',
			headerName: '상호',
			headerAlign: 'center',
		},
		{
			hide: !mobileSize,
			field: 'businessNumber',
			headerName: '사업자등록번호',
		},
		{
			hide: !mobileSize,
			field: 'representative',
			headerName: '대표',
			headerAlign: 'center',
		},
		{
			field: 'address',
			headerName: '주소',
		},
		{
			hide: !mobileSize,
			field: 'businessType',
			headerName: '업태',
			headerAlign: 'center',
		},
		{
			hide: !mobileSize,
			field: 'businessItem',
			headerName: '종목',
			headerAlign: 'center',
		},
		{ field: 'phone', headerName: '연락처', headerAlign: 'center' },
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
				{mobileSize ? screenButtons : mobileButtons}
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
					<InputLabel id="select-label">Rows</InputLabel>
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
				테이블
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
								{columns.map((column) => (
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
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{showRows.map((record) => (
								<TableRow
									key={record.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
									<TableCell align="left">{record.companyName}</TableCell>
									<TableCell align="left">{record.businessNumber}</TableCell>
									<TableCell align="left">{record.representative}</TableCell>
									<TableCell
										align="left"
										onClick={() => console.log(record.address)}
										sx={{
											'&:hover': {
												cursor: 'pointer',
											},
											maxWidth: '150px',
											overflow: 'hidden',
											whiteSpace: 'nowrap',
											textOverflow: 'ellipsis',
										}}
									>
										{record.address}
									</TableCell>
									<TableCell align="left">{record.businessType}</TableCell>
									<TableCell align="left">{record.businessItem}</TableCell>
									<TableCell align="left">{record.phone}</TableCell>
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
