import React from 'react';
import { Paper, Stack } from '@mui/material';
import {
	DataGrid,
	GridColDef,
	GridRenderCellParams,
	GridValueFormatterParams,
} from '@mui/x-data-grid';
import rowData from './tabledata.json';

// type BusinessRegistrationType = {
// 	id: number;
// 	companyName: string;
// 	representative?: string;
// 	businessNumber?: string;
// 	address?: string;
// 	addressDetail?: string;
// 	businessType?: string;
// 	businessItem?: string;
// 	email?: string;
// 	phone?: string;
// 	memo?: string;
// };

// function ExpandableCell({ value }: GridRenderCellParams) {
// 	const [expanded, setExpanded] = React.useState(false);

// 	return (
// 		<Box>
// 			{expanded ? value : value.slice(0, 10)}&nbsp;
// 			{value.length > 20 && (
// 				// eslint-disable-next-line jsx-a11y/anchor-is-valid
// 				<Link
// 					type="button"
// 					component="button"
// 					sx={{ fontSize: 'inherit' }}
// 					onClick={() => setExpanded(!expanded)}
// 				>
// 					{expanded ? 'view less' : '더보기'}
// 				</Link>
// 			)}
// 		</Box>
// 	);
// }

export default function TablePage() {
	const [pageSize, setPageSize] = React.useState<number>(10);

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
				const a = `${params.value} ${detile[0].addressDetail}`;
				return (
					<button type="button" onClick={() => console.log(params.value)}>
						{a}
					</button>
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
	const rows = rowData;
	return (
		<Paper elevation={3} sx={{ p: 2, mb: 2 }}>
			<Stack spacing={3}>
				<DataGrid
					columns={columns}
					rows={rows}
					autoHeight
					pageSize={pageSize}
					pagination
					onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
					rowsPerPageOptions={[10, 25, 50, 100]}
				/>
			</Stack>
		</Paper>
	);
}
