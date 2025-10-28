import React from "react";
import BaseLayout from "../../components/BaseLayout";
import CommonLayout from "../../components/CommonLayout";
import Icon from "../../../../components/Icon";
import { Button } from "@mui/material";
import GenericTable from "../../../../components/GenericTable";
import ActionMenu from "../../../../components/ActionMenu";

const ROWS = [
	{ id: 1, name: "Vòng đá phong thủy", slug: "COLLECTION-1" },
	{ id: 2, name: "Thiên vi", slug: "COLLECTION-2" },
	{ id: 3, name: "Trà an", slug: "COLLECTION-3" },
	{ id: 4, name: "Diên đá", slug: "COLLECTION-4" },
];

const Collection = () => {
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
				<CommonLayout title="Thông tin Bộ sưu tập" width={60}>
					<div className="category-list">
						<GenericTable
							data={ROWS}
							rowKey={(row) => (row?.id ? row.id : 0)}
							columns={[
								{ key: "id", label: "ID", width: "4vw" },
								{
									key: "name",
									label: "Tên",
									// onClick: (row) => onDetail(row?.id ? row.id : 0),
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
													onClick: () => {
														// onEdit(row)
													},
												},
												{
													label: "Delete",
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
						/>
					</div>
				</CommonLayout>
			</BaseLayout>
		</>
	);
};

export default Collection;
