import React, { useState } from "react";
import { Product } from "../../../../api/productService";
import GenericTable from "../../../../components/GenericTable";
import ActionMenu from "../../../../components/ActionMenu";
import { Pagination } from "@mui/material";
import GenericDialog from "../../../../components/GenericDialog";
import { ProductStatusVariable } from "../../../../constants/productStatus";
import { formatVND } from "../../../../utils/helper";

interface ProductTableProps {
	products: Product[];
	totalPages: number;
	page: number;
	setPage: (page: number) => void;
	onAction: (type: string, product: Product) => void;
	getBy?: "list" | "object";
}

const Table = ({ products, totalPages, page, setPage, onAction, getBy = "list" }: ProductTableProps) => {
	// ==== Confirm delete state ====
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [pendingRow, setPendingRow] = useState<Product | null>(null);

	const askDelete = (row: Product) => {
		setPendingRow(row);
		setConfirmOpen(true);
	};

	const handleConfirmDelete = async () => {
		if (pendingRow?.id != null) {
			await onAction("delete", pendingRow);
		}
		setConfirmOpen(false);
		setPendingRow(null);
	};

	const handleCancelDelete = () => {
		setConfirmOpen(false);
		setPendingRow(null);
	};

	// ==== Get actions ====
	const getActions = (row: any) => {
		var action: any[] = [];
		if (!row) {
			return action;
		}

		if (getBy == "object") {
			return [
				{
					label: "Bỏ khỏi bộ sưu tập",
					onClick: () => onAction("removeFromCollection", row),
				},
			];
		}

		action.push(
			{
				label: "Sửa",
				onClick: () => onAction("edit", row),
			},
			{
				label: "Chỉnh sửa hiển thị ảnh",
				onClick: () => onAction("editImage", row),
				acl: row.productImages && row.productImages.length > 0,
			},
			{
				label: "Xóa",
				onClick: () => askDelete(row),
				color: "red",
			},
		);

		return action;
	};

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
						onClick: (row) => onAction("detail", row),
					},
					{ key: "slug", label: "Mã" },
					// { key: "quantity", label: "Số lượng" },
					// {
					// 	key: "unitPrice",
					// 	label: "Đơn giá",
					// 	render: (row) => {
					// 		return (
					// 			<div>
					// 				<div className="product-unit-price">
					// 					{formatVND(row.unitPrice)}
					// 				</div>
					// 			</div>
					// 		);
					// 	},
					// },
					{
						key: "status",
						label: "Trạng thái",
						render: (row) => {
							var status = ProductStatusVariable().find((item) => {
								return item.value === row.status;
							});
							return (
								<div>
									<div className="product-status">{status?.name}</div>
								</div>
							);
						},
					},
					{
						key: "actions",
						label: "Thao tác",
						align: "right",
						width: "100px",
						headerStyle: { marginRight: "10px" },
						render: (row) => <ActionMenu actions={getActions(row)} />,
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

			<GenericDialog
				open={confirmOpen}
				title="Xác nhận xóa"
				onClose={handleCancelDelete}
				actions={[
					{
						label: "Hủy",
						variant: "outlined",
						onClick: handleCancelDelete,
						sx: {
							width: "50%",
							borderColor: "var(--color-card-bg)",
							color: "var(--color-card-bg)",
						},
					},
					{
						label: "Xóa",
						variant: "contained",
						onClick: handleConfirmDelete,
						sx: { width: "50%", backgroundColor: "#dc2626" },
					},
				]}
			>
				<div className="text-[14px] leading-6">
					Bạn có chắc muốn xóa sản phẩm
					{pendingRow?.name ? (
						<>
							{" "}
							<b>{pendingRow.name}</b>
						</>
					) : null}
					? Hành động này không thể hoàn tác.
				</div>
			</GenericDialog>
		</div>
	);
};

export default Table;
