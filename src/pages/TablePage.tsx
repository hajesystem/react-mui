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
import { debounce, map, remove, values } from 'lodash';
import { TableColumnType } from '../types';
import tableDatas from './tabledata.json';

export default function TablePage() {
	const [rows, setRows] = useState(tableDatas);
	const [pageSize, setPageSize] = useState<number>(10);
	const [tableCheckbox, setTableCheckbox] = useState(true);
	const [selectionModel, setSelectionModel] = useState<number[]>([]);
	const [allChecked, setAllChecked] = useState(false);

	const mobileSize = useMediaQuery('(min-width:440px)');

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
		debouncedSearch(e.target.value);
	};

	const handleChangePageSize = (e: SelectChangeEvent) => {
		setPageSize(Number(e.target.value as string));
	};

	const debouncedSearch = useMemo(
		() =>
			debounce((value) => {
				const searchData = map(tableDatas, (record) => {
					const { ...textSource } = record;
					const matchText = values(textSource).join('^').match(value);
					if (!matchText) {
						return null;
					}
					return record;
				});

				const fieldDatas = searchData.filter(
					(row) => row !== null && row !== undefined
				);
				setRows(fieldDatas as any);
			}, 200),
		[]
	);

	// 체크박스
	const handleChangeAllChecked = () => {
		setAllChecked(!allChecked);
	};
	useEffect(() => {
		if (allChecked) {
			const all: number[] = [];
			for (let i = 0; i < rows.length; i += 1) {
				all.push(rows[i].id);
				setSelectionModel(all);
			}
		}
		if (!allChecked) {
			setSelectionModel([]);
		}
	}, [allChecked]);

	const handleChangeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { checked, id } = e.target;
		const rowID = Number(id);
		if (checked) {
			setSelectionModel([...selectionModel, rowID]);
		}
		if (!checked) {
			const newArray = remove(selectionModel, (n) => n !== rowID);
			setSelectionModel(newArray);
		}
	};

	useEffect(() => console.log(allChecked), [allChecked]);
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
											checked={allChecked}
											indeterminate={
												allChecked && rows.length !== selectionModel.length
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
							{rows.map((row) => (
								<TableRow
									key={row.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									{tableCheckbox && (
										<TableCell padding="checkbox">
											<Checkbox
												color="primary"
												id={String(row.id)}
												checked={selectionModel.includes(row.id)}
												onChange={handleChangeChecked}
											/>
										</TableCell>
									)}
									<TableCell align="left">{row.companyName}</TableCell>
									<TableCell align="left">{row.businessNumber}</TableCell>
									<TableCell align="left">{row.representative}</TableCell>
									<TableCell align="left">{row.address}</TableCell>
									<TableCell align="left">{row.businessType}</TableCell>
									<TableCell align="left">{row.businessItem}</TableCell>
									<TableCell align="left">{row.phone}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Stack>
		</Paper>
	);
}
