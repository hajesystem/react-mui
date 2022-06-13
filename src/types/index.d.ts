export interface Ids {
	id: number;
}
export interface OptionType {
	id: number;
	label: string;
}
export interface TableColumnType {
	[id: string];
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
	valueFormatter?: (params: string) => string;
}

export interface UsersType {
	id: number;
	user: string;
	password: string;
	name: string;
	phone: string;
	email: string;
	address: string;
	addressDetail: string;
	department: string;
	position: string;
	date: string;
}
