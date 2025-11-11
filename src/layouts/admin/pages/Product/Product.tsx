import React, { useMemo, useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import CommonLayout from "../../components/CommonLayout";
import Icon from "../../../../components/Icon";
import { Button, TextField } from "@mui/material";
import ProductTable from "./Table";
import Form from "./Form";
import {
	createProduct,
	deleteProduct,
	Product as ProductObject,
	updateCollectionImage,
	updateProduct,
} from "../../../../api/productService";
import { useProducts } from "../../../../hooks/useProducts";
import ErrorPage from "../../../common/ErrorPage";

type FormAction = "create" | "update" | "updateImages";

const Product = () => {
	const [page, setPage] = useState(0);
	const [searchText, setSearchText] = useState("");

	const query = useMemo(() => ({ page, limit: 50, keyword: searchText }), [page, searchText]);

	const { products, loading, error, setProducts, total, totalPages } = useProducts(query);

	const [openForm, setOpenForm] = useState(false);
	const [editData, setEditData] = useState<ProductObject | null>(null);
	const [formAction, setFormAction] = useState<FormAction>("create");

	const [detailData, setDetailData] = useState<ProductObject | null>(null);
	const [detailOpen, setDetailOpen] = useState(false);

	const onCloseForm = () => setOpenForm(false);

	const handleCreate = async (body: FormData) => {
		try {
			const res = await createProduct(body as any);
			if (res?.code === 1 && res?.result) {
				setProducts([...products, res.result]);
			}
			return { code: res?.code, message: res?.message };
		} catch (err: any) {
			return {
				code: -1,
				message: err?.response?.data?.message || err.message,
			};
		}
	};
	const handleUpdate = async (id: number, body: FormData) => {
		try {
			const res = await updateProduct(id, body as any);
			if (res?.code === 1 && res?.result) {
				setProducts(products.map((p) => (p.id === res.result.id ? res.result : p)));
			}
			return { code: res?.code, message: res?.message };
		} catch (err: any) {
			return { code: -1, message: err?.response?.data?.message || err.message };
		}
	};
	const handleDelete = async (id: number) => {
		try {
			const res = await deleteProduct(id);
			if (res?.code === 1) {
				return window.location.reload();
			}
			return { code: res?.code, message: res?.message };
		} catch (err: any) {
			return {
				code: -1,
				message: err?.response?.data?.message || err.message,
			};
		}
	};

	const handleUpdateImage = async (id: number, body: FormData) => {
		try {
			const res = await updateCollectionImage(id, body as any);
			if (res?.code === 1 && res?.result) {
				setProducts(products.map((p) => (p.id === res.result.id ? res.result : p)));
				window.location.reload();
			}
			return { code: res?.code, message: res?.message };
		} catch (err: any) {
			return { code: -1, message: err?.response?.data?.message || err.message };
		}
	};

	const handleDetail = async (id: number) => {
		const prod = products.find((c) => c.id === id);
		if (prod) {
			setDetailData(prod);
			setDetailOpen(true);
		}
	};

	let content = (
		<>
			<CommonLayout title="Thông tin Sản phẩm" width={60}>
				<div className="product-list">
					<ProductTable
						products={products}
						totalPages={10}
						page={page}
						setPage={setPage}
						onEdit={(row) => {
							setEditData(row);
							setFormAction("update");
							setOpenForm(true);
						}}
						onDelete={handleDelete}
						onDetail={handleDetail}
						onEditImages={(row) => {
							setEditData(row);
							setFormAction("updateImages");
							setOpenForm(true);
						}}
					></ProductTable>
				</div>
			</CommonLayout>

			<Form
				open={openForm}
				onClose={onCloseForm}
				action={formAction}
				data={editData || undefined}
				onSubmit={(body) => {
					switch (formAction) {
						case "create":
							return handleCreate(body as FormData);
						case "update":
							return handleUpdate(editData?.id!, body as FormData);
						case "updateImages":
							return handleUpdateImage(editData?.id!, body as FormData);
						default:
							return Promise.resolve({ code: -1, message: "Thiếu dữ liệu" });
					}
				}}
			></Form>
		</>
	);

	if (loading) {
		content = <div className="my-10 mx-30">Đang tải thông tin sản phẩm...</div>;
	}
	if (error) {
		content = <ErrorPage message="Không thể tải thông tin sản phẩm"></ErrorPage>;
	}
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
				{content}
			</BaseLayout>
		</>
	);
};

export default Product;
