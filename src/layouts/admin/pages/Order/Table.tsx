import React from "react";
import GenericTable from "../../../../components/GenericTable";
import ActionMenu from "../../../../components/ActionMenu";
import { Pagination } from "@mui/material";
import { Order } from "../../../../api/orderService";

interface OrderTable {
	orders: Order[];
	onDetail: (orderId: number) => void;
	totalPages: number;
	page: number;
	setPage: (page: number) => void;
}

const Table = ({ orders, onDetail, totalPages, page, setPage }: OrderTable) => {
	return (
		<div>
			<GenericTable
				data={orders}
				rowKey={(row) => (row?.id ? row.id : 0)}
				columns={[
					{
						key: "slug",
						label: "Mã đơn",
						onClick: (row) => onDetail(row?.id ? row.id : 0),
					},
					{ key: "status", label: "Trạng thái" },
					{ key: "total_price", label: "Tổng tiền" },
					{ key: "description", label: "Ghi chú" },
					{
						key: "actions",
						label: "Thao tác",
						align: "right",
						width: "100px",
						headerStyle: { marginRight: "10px" },
						render: (row) => <ActionMenu actions={[]} />,
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
