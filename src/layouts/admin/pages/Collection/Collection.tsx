import React, { useMemo, useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import CommonLayout from "../../components/CommonLayout";
import Icon from "../../../../components/Icon";
import { Button } from "@mui/material";
import Table from "./Table";
import {
	Collection as CollectionObject,
	createCollection,
	deleteCollection,
	updateCollection,
	updateCollectionImage,
} from "../../../../api/collectionService";
import { useCollections } from "../../../../hooks/useCollections";
import Form from "./Form";
import ErrorPage from "../../../common/ErrorPage";

type FormAction = "create" | "update" | "updateImages";

const Collection = () => {
	const [page, setPage] = useState(0);
	const [searchText, setSearchText] = useState("");

	const query = useMemo(() => ({ page, limit: 50, keyword: searchText }), [page, searchText]);
	const { collections, loading, error, setCollections, total, totalPages } =
		useCollections(query);

	const [openForm, setOpenForm] = useState(false);
	const [editData, setEditData] = useState<CollectionObject | null>(null);
	const [formAction, setFormAction] = useState<FormAction>("create");

	const onCloseForm = () => setOpenForm(false);

	const handleCreate = async (body: FormData) => {
		try {
			const res = await createCollection(body as any);
			if (res?.code === 1 && res?.result) {
				setCollections([...collections, res.result]);
				window.location.reload();
			}
			return { code: res?.code, message: res?.message };
		} catch (err: any) {
			return { code: -1, message: err?.response?.data?.message || err.message };
		}
	};

	const handleUpdate = async (id: number, body: FormData) => {
		try {
			const res = await updateCollection(id, body as any);
			if (res?.code === 1 && res?.result) {
				setCollections(collections.map((p) => (p.id === res.result.id ? res.result : p)));
				window.location.reload();
			}
			return { code: res?.code, message: res?.message };
		} catch (err: any) {
			return { code: -1, message: err?.response?.data?.message || err.message };
		}
	};

	const handleDelete = async (id: number) => {
		try {
			const res = await deleteCollection(id);
			if (res?.code === 1) window.location.reload();
			return { code: res?.code, message: res?.message };
		} catch (err: any) {
			return { code: -1, message: err?.response?.data?.message || err.message };
		}
	};

	const handleUpdateImage = async (id: number, body: FormData) => {
		try {
			const res = await updateCollectionImage(id, body as any);
			if (res?.code === 1 && res?.result) {
				setCollections(collections.map((p) => (p.id === res.result.id ? res.result : p)));
			}
			return { code: res?.code, message: res?.message };
		} catch (err: any) {
			return { code: -1, message: err?.response?.data?.message || err.message };
		}
	};

	let content = (
		<>
			<CommonLayout title="Thông tin Bộ sưu tập" width={60}>
				<div className="category-list">
					<Table
						collections={collections}
						onEdit={(row) => {
							setEditData(row);
							setFormAction("update");
							setOpenForm(true);
						}}
						onDelete={handleDelete}
						onDetail={() => {}}
						page={page}
						totalPages={totalPages}
						setPage={setPage}
						onEditImages={(row) => {
							setEditData(row);
							setFormAction("updateImages");
							setOpenForm(true);
						}}
					/>
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
			/>
		</>
	);

	if (loading) {
		content = <div className="my-10 mx-30">Đang tải thông tin bộ sưu tập...</div>;
	}
	if (error) {
		content = <ErrorPage message="Không thể tải thông tin bộ sưu tập"></ErrorPage>;
	}

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
							onClick={() => {
								setEditData(null);
								setFormAction("create");
								setOpenForm(true);
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
				{content}
			</BaseLayout>
		</>
	);
};

export default Collection;
