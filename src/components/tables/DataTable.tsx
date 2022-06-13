import React, { useEffect, useMemo, useState } from 'react';
import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	Checkbox,
	TableBody,
	Pagination,
	Stack,
} from '@mui/material';
import { debounce } from '../../services';

interface DataTableType {
	checkbox?: boolean;
	pagination?: boolean;
	pageSize?: number;
	search?: string;
	rowDatas: any[];
	columns: any[];
	selectionItems?: number[];
	setSelectionItems?: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function DataTable({
	checkbox,
	pagination,
	pageSize,
	search,
	rowDatas,
	columns,
	selectionItems,
	setSelectionItems,
}: DataTableType) {
	// 체크박스
	const [checkedAll, setCheckedAll] = useState(false);
	const handleChangeAllChecked = () => {
		setCheckedAll(!checkedAll);
	};
	useEffect(() => {
		if (checkedAll) {
			const checkedIds = showRows.map((record) => record.id);
			setSelectionItems?.(checkedIds);
		}
		if (!checkedAll) {
			setSelectionItems?.([]);
		}
	}, [checkedAll]);

	// Rows
	const [rows, setRows] = useState(rowDatas);
	const [showRows, setShowRows] = useState(rows.slice(0, pageSize));
	const [page, setPage] = useState<number>(1);
	useEffect(() => {
		if (pageSize) {
			const start = page * pageSize - pageSize;
			const end = page * pageSize;
			setShowRows(rows.slice(start, end));
		}
	}, [page, rows]);

	useEffect(() => {
		setCheckedAll(false);
		setSelectionItems?.([]);
		setShowRows(rows.slice(0, pageSize));
	}, [pageSize]);

	// select
	const handleChangeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { checked, id } = e.target;
		const rowID = Number(id);
		if (checked) {
			setSelectionItems?.([...(selectionItems as number[]), rowID]);
		}
		if (!checked) {
			const newArray = selectionItems?.filter((item) => item !== rowID);
			setSelectionItems?.(newArray as number[]);
		}
	};

	// search record
	const searchRecord = useMemo(
		() =>
			debounce((text, setArray) => {
				const searchText = new RegExp(text, 'gi');
				const searchArray = rowDatas.filter((record) =>
					Object.values(record).join('^').match(searchText)
				);
				setPage(1);
				setArray(searchArray);
			}, 300),
		[]
	);

	useEffect(() => searchRecord(search, setRows), [search]);

	// pagination
	const handleChangePagination = (
		_event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setCheckedAll(false);
		setSelectionItems?.([]);
		setPage(value);
	};

	const dataPagination = (
		<Stack spacing={2} alignItems="end">
			<Pagination
				page={page}
				count={pageSize && Math.ceil(rows.length / pageSize)}
				color="primary"
				onChange={handleChangePagination}
			/>
		</Stack>
	);

	return (
		<Stack spacing={3}>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							{checkbox && (
								<TableCell padding="checkbox">
									<Checkbox
										color="primary"
										checked={checkedAll}
										indeterminate={
											checkedAll && showRows.length !== selectionItems?.length
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
								{checkbox && (
									<TableCell padding="checkbox">
										<Checkbox
											color="primary"
											id={String(record.id)}
											checked={selectionItems?.includes(record.id)}
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
			{!!pagination && dataPagination}
		</Stack>
	);
}
