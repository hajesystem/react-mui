import React, { useEffect, useState } from 'react';
import {
	Button,
	FormControl,
	IconButton,
	InputLabel,
	Link,
	MenuItem,
	Pagination,
	Paper,
	Select,
	SelectChangeEvent,
	Stack,
	useMediaQuery,
} from '@mui/material';
import {
	DataGrid,
	GridColDef,
	GridCsvExportMenuItem,
	gridPageCountSelector,
	gridPageSelector,
	GridRenderCellParams,
	GridSelectionModel,
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarExportContainer,
	GridToolbarFilterButton,
	GridToolbarQuickFilter,
	GridValueFormatterParams,
	useGridApiContext,
	useGridSelector,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import rows from './tabledata.json';

export default function TablePage() {
	const [pageSize, setPageSize] = useState<number>(10);
	const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

	const mobileSize = useMediaQuery('(min-width:440px)');

	useEffect(
		() => console.log('selectionModel>>>', selectionModel),
		[selectionModel]
	);

	const columns: GridColDef[] = [
		{
			field: '__check__',
			headerName: '선택',
		},
		{
			field: 'companyName',
			headerName: '상호',
			headerAlign: 'center',
			minWidth: 120,
			maxWidth: 180,
			flex: 1,
		},
		{
			hide: !mobileSize,
			field: 'businessNumber',
			headerName: '사업자등록번호',
			valueFormatter: (params: GridValueFormatterParams<string>) =>
				params.value.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3'),
			headerAlign: 'center',
			maxWidth: 130,
			flex: 1,
		},
		{
			hide: !mobileSize,
			field: 'representative',
			headerName: '대표',
			headerAlign: 'center',
			maxWidth: 80,
			flex: 1,
		},
		{
			field: 'address',
			headerName: '주소',
			width: 400,
			renderCell: (params: GridRenderCellParams) => {
				const { id } = params;
				const detile = rows.filter((row) => row.id === id);
				const text = `${params.value} ${detile[0].addressDetail}`;
				return (
					// eslint-disable-next-line jsx-a11y/anchor-is-valid
					<Link
						component="button"
						underline="none"
						color="inherit"
						onClick={() => console.log(params.value)}
					>
						{text}
					</Link>
				);
			},
		},
		{
			hide: !mobileSize,
			field: 'businessType',
			headerName: '업태',
			headerAlign: 'center',
			// flex: 50,
		},
		{
			hide: !mobileSize,
			field: 'businessItem',
			headerName: '종목',
			headerAlign: 'center',
			// flex: 50,
		},
		{
			hide: !mobileSize,
			field: 'email',
			headerName: '이메일',
			headerAlign: 'center',
		},
		{ field: 'phone', headerName: '연락처', headerAlign: 'center' },
	];

	const handleChangePageSize = (e: SelectChangeEvent) => {
		setPageSize(Number(e.target.value as string));
	};

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
			</Stack>
			<Stack spacing={3}>
				<DataGrid
					sx={{
						'& .MuiDataGrid-columnHeaderTitleContainerContent .MuiButtonBase-root':
							{
								display: 'none',
							},
					}}
					checkboxSelection
					disableSelectionOnClick
					onCellClick={(params, e) => {
						console.log(params);
						console.log('event>>', e);
						if (params.field === 'businessNumber') {
							alert(params.value);
						}
					}}
					onSelectionModelChange={(newSelectionModel) => {
						setSelectionModel(newSelectionModel);
					}}
					selectionModel={selectionModel}
					columns={columns}
					rows={rows}
					autoHeight
					pagination
					pageSize={pageSize}
					onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
					rowsPerPageOptions={[10, 25, 50, 100]}
					localeText={{
						checkboxSelectionHeaderName: '선택',
						columnMenuUnsort: '원본',
						columnMenuSortAsc: '오름차순',
						columnMenuSortDesc: '내림차순',
						columnMenuFilter: '필터',
						columnMenuHideColumn: '숨기기',
						columnMenuShowColumns: '보이기',
						toolbarColumns: '항목',
						columnsPanelTextFieldLabel: '항목 검색',
						columnsPanelTextFieldPlaceholder: '검색 할 열',
						columnsPanelHideAllButton: '모두 숨기기',
						columnsPanelShowAllButton: '모두 보이기',
						toolbarFilters: '필터',
						filterPanelColumns: '항목',
						filterPanelOperators: '조건',
						filterPanelInputLabel: '입력',
						filterPanelInputPlaceholder: '내용을 입력하세요.',
						filterOperatorContains: '포함',
						filterOperatorEquals: '같음',
						filterOperatorStartsWith: '시작 문자',
						filterOperatorEndsWith: '마지막 문자',
						filterOperatorIsEmpty: '빈 내용',
						filterOperatorIsNotEmpty: '빈 내용 제외',
						filterOperatorIsAnyOf: '다음중 하나',
						toolbarDensity: '크기',
						toolbarDensityCompact: '작게',
						toolbarDensityStandard: '중간',
						toolbarDensityComfortable: '크게',
						toolbarExport: '내보내기',
						toolbarExportCSV: 'CSV로 저장',
						toolbarExportPrint: '인쇄',
					}}
					components={{
						Toolbar: TableToolbar,
						Pagination: mobileSize ? TablePagination : undefined,
					}}
				/>
			</Stack>
		</Paper>
	);
}

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

function TableToolbar() {
	return (
		<GridToolbarContainer>
			<GridToolbarColumnsButton />
			<GridToolbarFilterButton />
			<GridToolbarDensitySelector />
			<GridToolbarExportContainer>
				<GridCsvExportMenuItem
					options={{
						fileName: 'customerDataBase',
						delimiter: ',',
						utf8WithBom: true,
					}}
				/>
			</GridToolbarExportContainer>
			<GridToolbarQuickFilter />
		</GridToolbarContainer>
	);
}
