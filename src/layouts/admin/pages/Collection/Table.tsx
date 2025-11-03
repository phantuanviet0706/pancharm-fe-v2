import React from "react";
import ActionMenu from "../../../../components/ActionMenu";
import GenericTable from "../../../../components/GenericTable";
import { Collection } from "../../../../api/collectionService";
import { Pagination } from "@mui/material";

interface TableProps {
	collections: Collection[];
	onEdit: (collection: Collection) => void;
	onDelete: (id: number) => void;
	onDetail: (id: number) => void;
	totalPages: number;
	page: number;
	setPage: (page: number) => void;
}

const Table = ({
	collections,
	onEdit,
	onDelete,
	onDetail,
	totalPages,
	page,
	setPage,
}: TableProps) => {
	return (
		<div>
			<GenericTable
				data={collections}
				rowKey={(row) => (row?.id ? row.id : 0)}
				columns={[
					{ key: "id", label: "ID", width: "4vw" },
					{
						key: "name",
						label: "Tên",
						onClick: (row) => onDetail(row?.id ? row.id : 0),
					},
					{ key: "slug", label: "Mã" },
					{
						key: "actions",
						label: "Thao tác",
						align: "right",
						width: "100px",
						headerStyle: { marginRight: "10px" },
						render: (row) => (
							<ActionMenu
								actions={[
									{
										label: "Edit",
										onClick: () => onEdit(row),
									},
									{
										label: "Delete",
										onClick: () => onDelete(row?.id ? row.id : 0),
										color: "red",
									},
								]}
							/>
						),
					},
				]}
			/>
			<div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
				<Pagination
					count={totalPages}
					page={page + 1}
					onChange={(e, value) => setPage(value - 1)}
					color="primary"
				/>
			</div>
		</div>
	);
};

export default Table;
