import React, { useEffect, useState } from 'react';
import {
	Button,
	createTheme,
	Paper,
	Stack,
	ThemeProvider,
} from '@mui/material';
import {
	DataGrid,
	GridColDef,
	GridRenderCellParams,
	GridSelectionModel,
	GridValueFormatterParams,
} from '@mui/x-data-grid';
import { koKR } from '@mui/material/locale';
import rowData from './tabledata.json';

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

	const theme = createTheme(
		{
			palette: {
				primary: { main: '#1976d2' },
			},
		},
		koKR
	);

	return (
		<Paper elevation={3} sx={{ p: 2, mb: 2 }}>
			<ThemeProvider theme={theme}>
				<Stack spacing={3}>
					<DataGrid
						checkboxSelection
						disableSelectionOnClick
						onSelectionModelChange={(newSelectionModel) => {
							setSelectionModel(newSelectionModel);
						}}
						// selectionModel={selectionModel}
						columns={columns}
						rows={rows}
						autoHeight
						pageSize={pageSize}
						pagination
						onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
						rowsPerPageOptions={[10, 25, 50, 100]}
					/>
				</Stack>
			</ThemeProvider>
		</Paper>
	);
}
