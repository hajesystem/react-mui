import React, { useEffect, useState } from 'react';
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Pagination,
	Paper,
	Select,
	Stack,
} from '@mui/material';
import {
	DataGrid,
	GridColDef,
	gridPageCountSelector,
	gridPageSelector,
	GridRenderCellParams,
	GridSelectionModel,
	GridValueFormatterParams,
	useGridApiContext,
	useGridSelector,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import rowData from './tabledata.json';
import { TableToolbar } from '../components/controls';

type BusinessRegistrationType = {
	id: number;
	companyName: string;
	representative?: string;
	businessNumber?: string;
	address?: string;
	addressDetail?: string;
	businessType?: string;
	businessItem?: string;
	email?: string;
	phone?: string;
	memo?: string;
};
function TablePagination() {
	const apiRef = useGridApiContext();
	const page = useGridSelector(apiRef, gridPageSelector);
	const pageCount = useGridSelector(apiRef, gridPageCountSelector);

	return (
		<Pagination
			color="primary"
			count={pageCount}
			page={page + 1}
			onChange={(event, value) => apiRef.current.setPage(value - 1)}
		/>
	);
}

export default function TablePage() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [rows, setRows] = useState<BusinessRegistrationType[]>(rowData);
	const [pageSize, setPageSize] = useState<number>(10);
	const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

	useEffect(() => console.log(selectionModel), [selectionModel]);

	const columns: GridColDef[] = [
		// { field: 'id', headerName: 'ID' },
		{
			field: 'companyName',
			headerName: '상호',
			flex: 50,
			headerAlign: 'center',
		},
		{
			field: 'businessNumber',
			headerName: '사업자등록번호',
			valueFormatter: (params: GridValueFormatterParams<string>) =>
				params.value.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3'),
			flex: 40,
			headerAlign: 'center',
		},
		{
			field: 'representative',
			headerName: '대표',
			flex: 25,
			headerAlign: 'center',
		},
		{
			field: 'address',
			headerName: '주소',
			flex: 200,
			headerAlign: 'center',
			renderCell: (params: GridRenderCellParams) => {
				const { id } = params;
				const detile = rows.filter((row) => row.id === id);
				const text = `${params.value} ${detile[0].addressDetail}`;
				return (
					<Button variant="text" onClick={() => console.log(params.value)}>
						{text}
					</Button>
				);
			},
		},
		{
			field: 'businessType',
			headerName: '업태',
			headerAlign: 'center',
			flex: 50,
		},
		{
			field: 'businessItem',
			headerName: '종목',
			headerAlign: 'center',
			flex: 50,
		},
		{ field: 'email', headerName: '이메일', headerAlign: 'center', flex: 50 },
		{ field: 'phone', headerName: '연락처', headerAlign: 'center', flex: 50 },
		{ field: 'memo', headerName: '메모', headerAlign: 'center', flex: 50 },
	];

	return (
		<Paper elevation={3} sx={{ p: 2, mb: 2 }}>
			<Stack direction="row" spacing={2}>
				<Button variant="outlined" startIcon={<DeleteIcon />}>
					Delete
				</Button>
				<Button variant="contained" endIcon={<SendIcon />}>
					Send
				</Button>
				<FormControl sx={{ width: 100 }}>
					<InputLabel id="demo-simple-select-label">Age</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						// value={age}
						label="Age"
						// onChange={handleChange}
					>
						<MenuItem value={10}>Ten</MenuItem>
						<MenuItem value={20}>Twenty</MenuItem>
						<MenuItem value={30}>Thirty</MenuItem>
					</Select>
				</FormControl>
			</Stack>
			<Stack spacing={3}>
				<DataGrid
					checkboxSelection
					disableSelectionOnClick
					onSelectionModelChange={(newSelectionModel) => {
						setSelectionModel(newSelectionModel);
					}}
					selectionModel={selectionModel}
					columns={columns}
					rows={rows}
					autoHeight
					pageSize={pageSize}
					pagination
					onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
					rowsPerPageOptions={[10, 25, 50, 100]}
					localeText={{
						toolbarColumns: '열',
						toolbarColumnsLabel: 'columns',
						toolbarDensity: '크기',
						toolbarDensityLabel: 'Size',
						toolbarDensityCompact: '작게',
						toolbarDensityStandard: '중간',
						toolbarDensityComfortable: '크게',
						toolbarExport: '내보내기',
						toolbarExportCSV: 'CSV로 저장',
					}}
					components={{
						Toolbar: TableToolbar,
						Pagination: TablePagination,
					}}
				/>
			</Stack>
		</Paper>
	);
}
