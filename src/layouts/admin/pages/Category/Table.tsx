import React, { useState } from "react";
import ActionMenu from "../../../../components/ActionMenu";
import GenericTable from "../../../../components/GenericTable";
import { Category } from "../../../../api/categoryService";
import { Pagination } from "@mui/material";
import GenericDialog from "../../../../components/GenericDialog";

interface TableProps {
	categories: Category[];
	totalPages: number;
	page: number;
	setPage: (page: number) => void;
	onAction: (type: string, category: Category) => void;
}

const Table = ({
	categories,
	totalPages,
	page,
	setPage,
	onAction,
}: TableProps) => {
	// ==== Confirm delete state ====
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [pendingRow, setPendingRow] = useState<Category | null>(null);

	const askDelete = (row: Category) => {
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

		action.push(
			{
				label: "Sửa",
				onClick: () => onAction("edit", row),
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
				data={categories}
				rowKey={(row) => (row?.id ? row.id : 0)}
				columns={[
					{ key: "id", label: "ID", width: "4vw" },
					{
						key: "name",
						label: "Tên",
						onClick: (row) => onAction("detail", row),
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
								actions={getActions(row)}
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
					Bạn có chắc muốn xóa danh mục
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
