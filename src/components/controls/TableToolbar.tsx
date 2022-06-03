import React from 'react';
import {
	GridCsvExportMenuItem,
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarExportContainer,
	GridToolbarFilterButton,
} from '@mui/x-data-grid';

export default function TableToolbar() {
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
		</GridToolbarContainer>
	);
}
