import React from "react";
import { Product } from "../../../../api/productService";
import GenericTable from "../../../../components/GenericTable";
import ActionMenu from "../../../../components/ActionMenu";
import { Pagination } from "@mui/material";

interface ProductTableProps {
	products: Product[];
	onEdit: (perm: Product) => void;
	onDelete: (id: number) => void;
	onDetail: (id: number) => void;
	totalPages: number;
	page: number;
	setPage: (page: number) => void;
}

const Table = ({
	products,
	onEdit,
	onDelete,
	onDetail,
	totalPages,
	page,
	setPage,
}: ProductTableProps) => {
	return (
		<div>
			<GenericTable
				data={products}
				rowKey={(row) => (row?.id ? row.id : 0)}
				columns={[
					{ key: "id", label: "ID", width: "4vw" },
					{
						key: "name",
						label: "Tên",
						onClick: (row) => onDetail(row?.id ? row.id : 0),
					},
					{ key: "slug", label: "Mã" },
					{ key: "quantity", label: "Số lượng" },
					{ key: "unitPrice", label: "Đơn giá" },
					{ key: "status", label: "Trạng thái" },
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
										label: "Sửa",
										onClick: () => onEdit(row),
									},
									{
										label: "Xóa",
										onClick: () => onDelete(row?.id ? row.id : 0),
										color: "red",
									},
								]}
							/>
						),
					},
				]}
			></GenericTable>
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
