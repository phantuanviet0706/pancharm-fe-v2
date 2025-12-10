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
	getCollection,
	removeProductFromCollections,
	updateCollection,
	updateCollectionImage,
	updateCollectionProducts,
} from "../../../../api/collectionService";
import { useCollections } from "../../../../hooks/useCollections";
import Form from "./Form";
import ErrorPage from "../../../common/ErrorPage";
import { useSnackbar } from "../../../../contexts/SnackbarProvider";
import GenericDetailDialog from "../../../../components/GenericDetailDialog";
import Detail from "./Detail";
import { ObjectPicker } from "../../../../components/ObjectPickerDialog";
import { Product, fetchData } from "../../../../api/productService";

type FormAction = "create" | "update" | "updateImages" | "unlinkProduct";
type ProductPage = { id: string; index: number; name: string };

const Collection = () => {
	const { showSnackbar } = useSnackbar();

	const [page, setPage] = useState(0);
	const [searchText, setSearchText] = useState("");

	const query = useMemo(() => ({ page, limit: 50, keyword: searchText }), [page, searchText]);
	const { collections, loading, error, setCollections, total, totalPages } =
		useCollections(query);

	const [openForm, setOpenForm] = useState(false);
	const [editData, setEditData] = useState<CollectionObject | null>(null);
	const [formAction, setFormAction] = useState<FormAction>("create");

	const [detailData, setDetailData] = useState<CollectionObject | null>(null);
	const [detailOpen, setDetailOpen] = useState(false);

	const onCloseForm = () => setOpenForm(false);

	// ==== Product picker state ====
	const [productPickerOpen, setProductPickerOpen] = useState(false);
	const [productPickerCollection, setProductPickerCollection] = useState<CollectionObject | null>(
		null,
	);

	// Lưu state các ID đang được chọn (trong FE)
	const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

	const [productPage, setProductPage] = useState(0);
	const productLimit = 20;

	const [productItems, setProductItems] = useState<Product[]>([]);
	const [productTotalPages, setProductTotalPages] = useState(1);
	const [loadingProducts, setLoadingProducts] = useState(false);

	const [collectionId, setCollectionId] = useState<number>(0);

	const fetchProductsForPicker = async (page: number, cid?: number) => {
		try {
			setLoadingProducts(true);

			const effectiveCollectionId = cid ?? collectionId ?? 0;

			const params: any = {
				page,
				limit: productLimit,
				keyword: "",
				ignoreCollection: true, // lấy các sản phẩm chưa nằm trong collection
			};

			// chỉ gửi collectionId nếu > 0
			if (effectiveCollectionId && effectiveCollectionId > 0) {
				params.collectionId = effectiveCollectionId;
			}

			const res = await fetchData(params);

			if (res?.code === 1 && res?.result) {
				const items =
					(res.result.items as Product[]) ||
					(res.result.content as Product[]) ||
					(res.result as Product[]);

				const totalPagesFromApi = res.result.totalPages;

				const totalItemsFromApi =
					res.result.totalElements ?? res.result.total ?? items.length;

				const computedTotalPages =
					totalPagesFromApi != null
						? totalPagesFromApi
						: Math.max(1, Math.ceil(totalItemsFromApi / productLimit));

				setProductItems(items || []);
				setProductTotalPages(computedTotalPages);
			}
		} catch (err: any) {
			console.error(err);
			showSnackbar({
				message: err?.response?.data?.message || "Không thể tải danh sách sản phẩm",
				severity: "error",
			});
		} finally {
			setLoadingProducts(false);
		}
	};

	const productPages: ProductPage[] = useMemo(
		() =>
			Array.from({ length: productTotalPages || 1 }, (_, i) => ({
				id: `page-${i}`,
				index: i,
				name: `Trang ${i + 1}`,
			})),
		[productTotalPages],
	);

	const itemsByPage = useMemo(() => {
		const currentPageId = `page-${productPage}`;
		return { [currentPageId]: productItems || [] };
	}, [productItems, productPage]);
	// ==== End product picker state ====

	// ==== Handlers for CRUD operations ====
	const handleCreate = async (body: FormData) => {
		try {
			const res = await createCollection(body as any);
			if (res?.code === 1 && res?.result) {
				setCollections([...collections, res.result]);
				setOpenForm(false);
			}
			return showSnackbar({
				message: res?.message || "Cập nhật thành công",
				severity: "success",
			});
		} catch (err: any) {
			return showSnackbar({
				message: err?.response?.data?.message || err.message,
				severity: "error",
			});
		}
	};

	const handleUpdate = async (id: number, body: FormData) => {
		try {
			const res = await updateCollection(id, body as any);
			if (res?.code === 1 && res?.result) {
				setCollections(collections.map((p) => (p.id === res.result.id ? res.result : p)));
				setOpenForm(false);
			}
			return showSnackbar({
				message: res?.message || "Cập nhật thành công",
				severity: "success",
			});
		} catch (err: any) {
			return showSnackbar({
				message: err?.response?.data?.message || err.message,
				severity: "error",
			});
		}
	};

	const handleDelete = async (id: number) => {
		try {
			const res = await deleteCollection(id);
			if (res?.code === 1) window.location.reload();
			return showSnackbar({
				message: res?.message || "Cập nhật thành công",
				severity: "success",
			});
		} catch (err: any) {
			return showSnackbar({
				message: err?.response?.data?.message || err.message,
				severity: "error",
			});
		}
	};

	const handleUpdateImage = async (id: number, body: FormData) => {
		try {
			const res = await updateCollectionImage(id, body as any);
			if (res?.code === 1 && res?.result) {
				setCollections(collections.map((p) => (p.id === res.result.id ? res.result : p)));
				setOpenForm(false);
			}
			return showSnackbar({
				message: res?.message || "Cập nhật thành công",
				severity: "success",
			});
		} catch (err: any) {
			return showSnackbar({
				message: err?.response?.data?.message || err.message,
				severity: "error",
			});
		}
	};

	const handleDetail = async (id: number) => {
		try {
			const res = await getCollection(id);
			if (res?.code === 1 && res?.result) {
				const collection = res.result;
				setDetailData(collection);
				setDetailOpen(true);
			}
			return;
		} catch (err: any) {
			return showSnackbar({
				message: err?.response?.data?.message || err.message,
				severity: "error",
			});
		}
	};

	// 🟢 API này bây giờ hiểu là: chỉ ADD các productIds truyền vào
	const handleSaveProductsForCollection = async (collectionId: number, productIds: number[]) => {
		try {
			const res = await updateCollectionProducts(collectionId, { productIds });
			if (res?.code === 1 && res?.result) {
				setCollections(collections.map((c) => (c.id === res.result.id ? res.result : c)));
				// nếu đang mở detail đúng collection đó thì update luôn
				if (detailData && detailData.id === res.result.id) {
					setDetailData(res.result);
				}
			}
			if (productIds.length > 0) {
				showSnackbar({
					message: "Đã thêm sản phẩm vào bộ sưu tập",
					severity: "success",
				});
			}
		} catch (err: any) {
			showSnackbar({
				message: err?.response?.data?.message || err.message,
				severity: "error",
			});
		}
	};

	// 🟠 Remove nhiều product khỏi collection (dùng cho ObjectPicker khi bỏ chọn)
	const handleRemoveProductsForCollection = async (
		collectionId: number,
		productIds: number[],
	) => {
		if (productIds.length === 0) return;

		try {
			let lastResult: any = null;

			for (const pid of productIds) {
				const res = await removeProductFromCollections(collectionId, { productId: pid });
				if (res?.code === 1 && res?.result) {
					lastResult = res.result;
				}
			}

			if (lastResult) {
				setCollections(collections.map((c) => (c.id === lastResult.id ? lastResult : c)));
				if (detailData && detailData.id === lastResult.id) {
					setDetailData(lastResult);
				}
			}

			showSnackbar({
				message: "Đã gỡ sản phẩm khỏi bộ sưu tập",
				severity: "success",
			});
		} catch (err: any) {
			showSnackbar({
				message: err?.response?.data?.message || err.message,
				severity: "error",
			});
		}
	};

	// unlink 1 product (luồng có confirm qua Form)
	const handleUnlinkProduct = async (collectionId: number, productId: number) => {
		try {
			const res = await removeProductFromCollections(collectionId, { productId });

			if (res?.code === 1 && res?.result) {
				setCollections(collections.map((c) => (c.id === res.result.id ? res.result : c)));
				setDetailData({ ...res.result });
				setOpenForm(false);

				showSnackbar({
					message: "Đã gỡ sản phẩm khỏi bộ sưu tập",
					severity: "success",
				});
			}
		} catch (err: any) {
			showSnackbar({
				message: err?.response?.data?.message || err.message,
				severity: "error",
			});
		}
	};

	// === End handlers for CRUD operations ====

	// ==== Handle actions from table ====
	const handleAction = async (type: string, object: CollectionObject) => {
		switch (type) {
			case "detail":
				handleDetail(object?.id ?? 0);
				break;
			case "edit":
				setEditData(object);
				setFormAction("update");
				setOpenForm(true);
				break;
			case "delete":
				handleDelete(object?.id ?? 0);
				break;
			case "editImage":
				setEditData(object);
				setFormAction("updateImages");
				setOpenForm(true);
				break;

			case "chooseProducts": {
				setProductPickerCollection(object);
				const cid = object?.id || 0;
				setCollectionId(cid);

				// các ID đang thuộc collection (trạng thái ban đầu)
				const initIds = (object.products || []).map((p: any) => p.id);
				setSelectedProductIds(initIds);

				setProductPage(0);
				// dùng luôn cid, không đợi state collectionId
				await fetchProductsForPicker(0, cid);
				setProductPickerOpen(true);
				break;
			}
		}
	};

	const handleProductAction = async (action: string, product: Product) => {
		switch (action) {
			case "unlink": {
				setEditData({
					id: detailData?.id,
					name: detailData?.name || "",
					productId: product?.id || 0,
				} as any);
				setFormAction("unlinkProduct");
				setOpenForm(true);
				break;
			}
		}
	};
	// ==== End handle actions from table ====

	// ==== Handle page change trong picker ====
	const handlePickerPageChange = async (pageId: string) => {
		const target = productPages.find((p) => p.id === pageId);
		if (!target) return;
		setProductPage(target.index);
		await fetchProductsForPicker(target.index);
	};
	// ==== End handle page change ====

	let content = (
		<>
			<CommonLayout title="Thông tin Bộ sưu tập" width={60}>
				<div className="category-list">
					<Table
						collections={collections}
						page={page}
						totalPages={totalPages}
						setPage={setPage}
						onAction={handleAction}
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
						case "unlinkProduct":
							return handleUnlinkProduct(
								editData!.id || 0,
								(editData as any).productId,
							);
						default:
							return Promise.resolve({
								code: -1,
								message: "Thiếu dữ liệu",
							});
					}
				}}
			/>

			<GenericDetailDialog
				open={detailOpen}
				onClose={() => {
					setDetailOpen(false);
					setDetailData(null);
				}}
				title="Chi tiết Bộ suu tập"
				maxWidth="lg"
			>
				{detailData && <Detail object={detailData} onProductAction={handleProductAction} />}
			</GenericDetailDialog>

			{/* Object picker chọn sản phẩm */}
			<ObjectPicker<Product, ProductPage>
				open={productPickerOpen}
				onClose={() => {
					setProductPickerOpen(false);
					setProductPickerCollection(null);
					setCollectionId(0);
				}}
				title="Chọn sản phẩm cho Bộ sưu tập"
				description={
					productPickerCollection
						? `Bộ sưu tập: ${productPickerCollection.name}`
						: undefined
				}
				pages={productPages}
				getPageId={(p) => p.id}
				getPageLabel={(p) => ({ primary: p.name })}
				itemsByPage={itemsByPage}
				getItemId={(item) => String(item.id)}
				initialSelectedIds={selectedProductIds.map(String)}
				matchSearch={(item, keyword) =>
					item.name.toLowerCase().includes(keyword) ||
					(item.slug || "").toLowerCase().includes(keyword)
				}
				loading={loadingProducts}
				onPageChange={handlePickerPageChange}
				renderItem={({ item, selected, toggle }) => (
					<div
						onClick={toggle}
						className={`flex items-center justify-between rounded-xl border px-4 py-3 cursor-pointer transition-all ${
							selected
								? "border-emerald-400 bg-emerald-50"
								: "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
						}`}
					>
						<div className="min-w-0">
							<p className="text-sm font-medium truncate">{item.name}</p>
							<p className="text-xs text-slate-500 truncate">
								Mã: {item.slug} · ID: {item.id}
							</p>
						</div>
						<div className="flex flex-col items-end gap-1">
							{item.unitPrice != null && (
								<span className="text-sm font-semibold">
									{item.unitPrice.toLocaleString("vi-VN")} ₫
								</span>
							)}
							<button
								type="button"
								className={`text-xs px-3 py-1 rounded-full border ${
									selected
										? "bg-emerald-500 text-white border-emerald-500"
										: "border-slate-300 text-slate-700"
								}`}
							>
								{selected ? "Đã chọn" : "Chọn"}
							</button>
						</div>
					</div>
				)}
				onConfirm={({ selectedIds }) => {
					const newSelected = selectedIds.map((id) => Number(id));
					const oldSelected = selectedProductIds;

					// ID mới được chọn thêm
					const added = newSelected.filter((id) => !oldSelected.includes(id));

					// ID bị bỏ chọn (trước có, giờ không)
					const removed = oldSelected.filter((id) => !newSelected.includes(id));

					setSelectedProductIds(newSelected);

					if (productPickerCollection?.id != null) {
						const cid = productPickerCollection.id;

						if (added.length > 0) {
							handleSaveProductsForCollection(cid, added);
						}

						if (removed.length > 0) {
							handleRemoveProductsForCollection(cid, removed);
						}
					}

					setProductPickerOpen(false);
					setProductPickerCollection(null);
					setCollectionId(0);
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
