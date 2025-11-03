import React, { useMemo, useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import CommonLayout from "../../components/CommonLayout";
import Icon from "../../../../components/Icon";
import { Button, TextField } from "@mui/material";
import ProductTable from "./Table";
import Form from "./Form";
import { Product as ProductObject } from "../../../../api/productService";
import { useProducts } from "../../../../hooks/useProducts";

const ROWS = [
	{
		id: 1,
		name: "Vòng tay 1",
		slug: "PRO-1",
		quantity: 1,
		unitPrice: 200000,
		status: "ACTIVE",
		categoryId: 1,
	},
	{
		id: 2,
		name: "Vòng tay 2",
		slug: "PRO-2",
		quantity: 1,
		unitPrice: 200000,
		status: "ACTIVE",
		categoryId: 1,
	},
	{
		id: 3,
		name: "Vòng tay 3",
		slug: "PRO-3",
		quantity: 1,
		unitPrice: 200000,
		status: "ACTIVE",
		categoryId: 1,
	},
	{
		id: 4,
		name: "Vòng tay 4",
		slug: "PRO-4",
		quantity: 1,
		unitPrice: 200000,
		status: "ACTIVE",
		categoryId: 1,
	},
];

const Product = () => {
	const [page, setPage] = useState(0);
	const [searchText, setSearchText] = useState("");

	const query = useMemo(() => ({ page, limit: 50, keyword: searchText }), [page, searchText]);

	const { products, loading, error, setProducts, total, totalPages } = useProducts(query);

	const [openForm, setOpenForm] = useState(false);
	const [editData, setEditData] = useState<ProductObject | null>(null);

	const [detailOpen, setDetailOpen] = useState(false);

	const onCloseForm = () => setOpenForm(false);

	const handleCreate = async (data: Partial<ProductObject>) => {};
	const handleUpdate = async (data: ProductObject) => {};
	const handleDelete = async (id: number) => {};
	const handleDetail = async (id: number) => {};

	// if (loading) return <p>Loading ...</p>;
	// if (error) return <p>Failed to load categories</p>;

	return (
		<>
			<BaseLayout
				headers={
					<div className="side-btn absolute right-0 mr-10 top-2">
						<div className="flex gap-2">
							<TextField
								className="search-box-wrapper"
								label="Tìm kiếm"
								variant="outlined"
								size="small"
								fullWidth
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										setSearchText((e.target as HTMLInputElement).value);
										setPage(0);
									}
								}}
								sx={{
									width: "20vw",
								}}
							/>

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
								onClick={() => {
									setEditData(null);
									setOpenForm(true);
								}}
							>
								<div className="side-btn-icon mr-[2px]">
									<Icon name="add" />
								</div>
								<div className="side-btn-content">Thêm mới</div>
							</Button>
						</div>
					</div>
				}
			>
				<CommonLayout title="Thông tin Sản phẩm" width={60}>
					<div className="category-list">
						<ProductTable
							products={ROWS}
							totalPages={10}
							page={page}
							setPage={setPage}
							onEdit={(perm) => {
								setEditData(perm);
								setOpenForm(true);
							}}
							onDelete={handleDelete}
							onDetail={handleDetail}
						></ProductTable>
					</div>
				</CommonLayout>

				<Form
					open={openForm}
					onClose={onCloseForm}
					onSubmit={(data) =>
						editData ? handleUpdate({ ...editData, ...data }) : handleCreate(data)
					}
					data={editData}
				></Form>
			</BaseLayout>
		</>
	);
};

export default Product;
