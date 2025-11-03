import React, { useMemo, useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import CommonLayout from "../../components/CommonLayout";
import Icon from "../../../../components/Icon";
import { Button } from "@mui/material";
import Table from "./Table";
import { Collection as CollectionObject } from "../../../../api/collectionService";
import { useCollections } from "../../../../hooks/useCollections";
import Form from "./Form";

const ROWS = [
	{ id: 1, name: "Vòng đá phong thủy", slug: "COLLECTION-1" },
	{ id: 2, name: "Thiên vi", slug: "COLLECTION-2" },
	{ id: 3, name: "Trà an", slug: "COLLECTION-3" },
	{ id: 4, name: "Diên đá", slug: "COLLECTION-4" },
];

const Collection = () => {
	const [page, setPage] = useState(0);
	const [searchText, setSearchText] = useState("");

	const query = useMemo(() => ({ page, limit: 50, keyword: searchText }), [page, searchText]);

	const { collections, loading, error, setCollections, total, totalPages } =
		useCollections(query);

	const [openForm, setOpenForm] = useState(false);
	const [editData, setEditData] = useState<CollectionObject | null>(null);

	const [detailOpen, setDetailOpen] = useState(false);

	const onCloseForm = () => setOpenForm(false);

	const handleCreate = async (data: Partial<CollectionObject>) => {};
	const handleUpdate = async (data: CollectionObject) => {};
	const handleDelete = async (id: number) => {};
	const handleDetail = async (id: number) => {};

	// if (loading) return <p>Loading ...</p>;
	// if (error) return <p>Failed to load categories</p>;

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
				<CommonLayout title="Thông tin Bộ sưu tập" width={60}>
					<div className="category-list">
						<Table
							collections={ROWS}
							onEdit={(perm) => {
								setEditData(perm);
								setOpenForm(true);
							}}
							onDelete={handleDelete}
							onDetail={handleDetail}
							page={page}
							totalPages={10}
							setPage={setPage}
						></Table>
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

export default Collection;
