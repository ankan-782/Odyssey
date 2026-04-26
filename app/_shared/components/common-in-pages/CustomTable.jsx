"use client";
import { Table } from "antd";

const CustomTable = ({ columns, dataSource, ...props }) => {
	return (
		<div className="custom-table-wrapper overflow-x-auto rounded-2xl border border-neutral-bright-200">
			<Table
				columns={columns}
				dataSource={dataSource}
				className="custom-antd-table"
				{...props}
			/>
		</div>
	);
};

export default CustomTable;
