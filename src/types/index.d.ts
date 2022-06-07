export type OptionType = {
	id: number;
	label: string;
};

export interface TableColumnType {
	field: string;
	headerName: string;
	headerSx?: SxProps<Theme>;
	hide?: boolean | undefined;
	headerAlign?: 'center' | 'inherit' | 'left' | 'right' | 'justify';
	headerClassName?: string | undefined;
	headerOnChange?: React.FormEventHandler<HTMLTableCellElement>;
	headerOnClick?: React.MouseEventHandler<HTMLTableCellElement>;
	cellAlign?: 'center' | 'inherit' | 'left' | 'right' | 'justify';
	cellClassName?: string | undefined;
	cellSx?: SxProps<Theme>;
	cellOnChange?: React.FormEventHandler<HTMLTableCellElement>;
	cellOnClick?: React.MouseEventHandler<HTMLTableCellElement>;
}
