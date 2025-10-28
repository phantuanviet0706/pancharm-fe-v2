import React from "react";
import BaseLayout from "../../components/BaseLayout";
import CommonLayout from "../../components/CommonLayout";
import Icon from "../../../../components/Icon";
import { Button } from "@mui/material";
import GenericTable from "../../../../components/GenericTable";
import ActionMenu from "../../../../components/ActionMenu";

const ROWS = [
	{ id: 1, name: "Vòng tay 1", slug: "PRO-1", quantity: 1, unitPrice: 200000, status: "ACTIVE" },
	{ id: 2, name: "Vòng tay 2", slug: "PRO-2", quantity: 1, unitPrice: 200000, status: "ACTIVE" },
	{ id: 3, name: "Vòng tay 3", slug: "PRO-3", quantity: 1, unitPrice: 200000, status: "ACTIVE" },
	{ id: 4, name: "Vòng tay 4", slug: "PRO-4", quantity: 1, unitPrice: 200000, status: "ACTIVE" },
];

const Product = () => {
	return (
		<>
			<BaseLayout
				headers={
					<div className="side-btn absolute right-0 mr-10 top-2">
						<Button
							sx={{
								border: "1px solid #e4c6b9",
								backgroundColor: "var(--color-cream-bg)",
								color: "var(--color-card-bg)",
								paddingInline: "15px",
								fontWeight: 600,
								borderRadius: "10px",
								boxShadow: "0 0 0 rgba(0,0,0,0)",
								transition: "all 0.25s ease",
								"&:hover": {
									backgroundColor: "rgba(180,92,78,0.12)",
									boxShadow: "0 4px 10px rgba(180,92,78,0.25)",
									borderColor: "rgba(180,92,78,0.45)",
									transform: "translateY(-1px)",
								},
							}}
						>
							<div className="side-btn-icon mr-[2px]">
								<Icon name="add" />
							</div>
							<div className="side-btn-content">Thêm mới</div>
						</Button>
					</div>
				}
			>
				<CommonLayout title="Thông tin Sản phẩm" width={60}>
					<div className="category-list">
						<GenericTable
							data={ROWS}
							rowKey={(row) => (row?.id ? row.id : 0)}
							columns={[
								{ key: "id", label: "ID", width: "4vw" },
								{
									key: "name",
									label: "Tên",
									onClick: (row) => {
										// onDetail(row?.id ? row.id : 0)
									},
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
													onClick: () => {
														// onEdit(row)
													},
												},
												{
													label: "Xóa",
													onClick: () => {
														// onDelete(row?.id ? row.id : 0)
													},
													color: "red",
												},
											]}
										/>
									),
								},
							]}
						></GenericTable>
					</div>
				</CommonLayout>
			</BaseLayout>
		</>
	);
};

export default Product;
