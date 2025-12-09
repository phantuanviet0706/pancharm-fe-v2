import React, { useEffect, useState } from "react";
import FieldDisplay from "../../../../components/FieldDisplay";
import Icon from "../../../../components/Icon";
import { Collection } from "../../../../api/collectionService";
import SwipeSlider from "../../../user/components/SwipeSlider";
import NoImage from "../Common/NoImage";
import { Product, fetchData } from "../../../../api/productService";
import { useSnackbar } from "../../../../contexts/SnackbarProvider";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface DetailProps {
	object: Collection;
	// callback để cha xử lý, vd: unlink khỏi collection
	onProductAction?: (type: "unlink", product: Product) => void;
}

const PAGE_SIZE = 20;

// ===== Helpers cho paginate số 1 2 ... n =====
type PageChip = { type: "page"; index: number } | { type: "ellipsis"; key: string };

function buildPageChips(totalPages: number, currentIndex: number): PageChip[] {
	if (totalPages <= 0) return [];

	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => ({
			type: "page" as const,
			index: i,
		}));
	}

	const cur = currentIndex < 0 ? 0 : currentIndex;

	const indices = new Set<number>();
	indices.add(0);
	indices.add(totalPages - 1);
	indices.add(cur - 1);
	indices.add(cur);
	indices.add(cur + 1);

	const valid = Array.from(indices)
		.filter((i) => i >= 0 && i < totalPages)
		.sort((a, b) => a - b);

	const chips: PageChip[] = [];
	let prev: number | null = null;

	for (const idx of valid) {
		if (prev !== null && idx - prev > 1) {
			chips.push({
				type: "ellipsis",
				key: `ellipsis-${prev + 1}-${idx - 1}`,
			});
		}
		chips.push({ type: "page", index: idx });
		prev = idx;
	}

	return chips;
}

const Detail = ({ object, onProductAction }: DetailProps) => {
	const { showSnackbar } = useSnackbar();

	const collectionImages = object.collectionImages || [];
	const slides =
		collectionImages.map((img) => ({
			kind: "image" as const,
			src: img.path,
			content: `Collection Image ${img.id}`,
		})) || [];

	// ===== State cho list product trong detail =====
	const [products, setProducts] = useState<Product[]>([]);
	const [productPage, setProductPage] = useState(0); // 0-based
	const [productTotalPages, setProductTotalPages] = useState(0);
	const [loadingProducts, setLoadingProducts] = useState(false);

	// Jump box state (bấm vào "…" để nhập số trang)
	const [showJumpBox, setShowJumpBox] = useState(false);
	const [jumpPageInput, setJumpPageInput] = useState("");

	// Menu action cho từng product
	const [actionAnchorEl, setActionAnchorEl] = useState<null | HTMLElement>(null);
	const [actionProduct, setActionProduct] = useState<Product | null>(null);

	const openActionMenu = Boolean(actionAnchorEl);

	const handleOpenActionMenu = (e: React.MouseEvent<HTMLElement>, product: Product) => {
		e.stopPropagation();
		setActionAnchorEl(e.currentTarget);
		setActionProduct(product);
	};

	const handleCloseActionMenu = () => {
		setActionAnchorEl(null);
		setActionProduct(null);
	};

	const handleUnlinkProduct = () => {
		if (onProductAction && actionProduct) {
			onProductAction("unlink", actionProduct);
		}
		handleCloseActionMenu();
	};

	// Khi đổi collection thì reset về trang 1
	useEffect(() => {
		setProductPage(0);
		setShowJumpBox(false);
	}, [object.id]);

	// Fetch products mỗi khi collectionId hoặc trang thay đổi
	useEffect(() => {
		if (!object?.id) return;

		const loadProducts = async () => {
			try {
				setLoadingProducts(true);

				const res = await fetchData({
					page: productPage,
					limit: PAGE_SIZE,
					collectionId: object.id,
					ignoreCollection: false, // trong detail: lấy đúng products thuộc collection này
				} as any);

				if (res?.code === 1 && res?.result) {
					const items =
						(res.result.items as Product[]) ||
						(res.result.content as Product[]) ||
						(res.result as Product[]);

					const totalPagesFromApi = res.result.totalPages;
					const totalElementsFromApi =
						res.result.totalElements ?? res.result.total ?? items.length;

					const computedTotalPages =
						totalPagesFromApi != null
							? totalPagesFromApi
							: Math.max(1, Math.ceil(totalElementsFromApi / PAGE_SIZE));

					setProducts(items || []);
					setProductTotalPages(computedTotalPages);
				} else {
					setProducts([]);
					setProductTotalPages(0);
				}
			} catch (err: any) {
				console.error(err);
				showSnackbar({
					message:
						err?.response?.data?.message ||
						"Không thể tải danh sách sản phẩm của bộ sưu tập",
					severity: "error",
				});
			} finally {
				setLoadingProducts(false);
			}
		};

		loadProducts();
	}, [object.id, productPage, showSnackbar]);

	const hasProducts = products.length > 0 || loadingProducts;

	const handlePrevPage = () => {
		setProductPage((prev) => (prev > 0 ? prev - 1 : prev));
		setShowJumpBox(false);
	};

	const handleNextPage = () => {
		setProductPage((prev) =>
			productTotalPages > 0 && prev + 1 < productTotalPages ? prev + 1 : prev,
		);
		setShowJumpBox(false);
	};

	const pageChips = buildPageChips(productTotalPages, productPage);

	const openJumpPopup = () => {
		const safeIndex = productPage >= 0 ? productPage : 0;
		setJumpPageInput(String(safeIndex + 1));
		setShowJumpBox(true);
	};

	const handleSubmitJump = (e: React.FormEvent) => {
		e.preventDefault();
		if (!productTotalPages) return;

		const raw = parseInt(jumpPageInput, 10);
		if (Number.isNaN(raw)) return;

		let pageNum = raw;
		if (pageNum < 1) pageNum = 1;
		if (pageNum > productTotalPages) pageNum = productTotalPages;

		setProductPage(pageNum - 1);
		setShowJumpBox(false);
	};

	return (
		<>
			<div className="object-detail w-full flex">
				<div className="w-[60%] h-fit">
					{/* Common Info */}
					<div className="label-content uppercase text-xl font-medium mb-4">
						Thông tin chung
					</div>
					<div className="grid grid-cols-1 gap-4">
						<FieldDisplay
							label="Tên danh mục"
							value={object?.name || ""}
							icon={<Icon name="catName" />}
							inline
						/>
						<FieldDisplay
							label="Mã danh mục"
							value={object?.slug || ""}
							icon={<Icon name="catSlug" />}
							inline
						/>
					</div>

					{/* List Products */}
					{hasProducts && (
						<>
							<div
								className="sep mr-6"
								style={{
									borderColor: "#f0f0f0",
									marginBlock: "0.5em",
									marginBottom: "1em",
								}}
							></div>
							<div className="label-content uppercase text-xl font-medium mb-2">
								Danh sách sản phẩm
							</div>

							<div className="product-list border rounded-xl border-slate-200 overflow-hidden mr-4">
								<div className="bg-slate-50 px-4 py-2 text-xs text-slate-500 flex justify-between">
									<span>
										{loadingProducts
											? "Đang tải sản phẩm..."
											: `Trang ${productPage + 1}${
													productTotalPages
														? ` / ${productTotalPages}`
														: ""
												}`}
									</span>
								</div>

								<div className="max-h-[320px] overflow-auto divide-y divide-slate-100">
									{loadingProducts ? (
										<div className="px-4 py-6 text-sm text-slate-500 text-center">
											Đang tải dữ liệu...
										</div>
									) : products.length === 0 ? (
										<div className="px-4 py-6 text-sm text-slate-500 text-center">
											Chưa có sản phẩm nào trong bộ sưu tập này.
										</div>
									) : (
										products.map((p) => (
											<div
												key={p.id}
												className="px-4 py-3 flex items-center justify-between gap-3"
											>
												<div className="min-w-0 max-w-[20em]">
													<div className="text-sm font-medium truncate">
														{p.name}
													</div>
													<div className="text-xs text-slate-500 truncate">
														Mã: {p.slug} · ID: {p.id}
													</div>
												</div>

												<div className="flex items-center gap-2">
													<div className="text-right">
														{p.unitPrice != null && (
															<div className="text-sm font-semibold">
																{p.unitPrice.toLocaleString(
																	"vi-VN",
																)}{" "}
																₫
															</div>
														)}
														<div className="text-[11px] text-slate-400">
															SL: {p.quantity ?? 0}
														</div>
													</div>

													{/* 3 chấm action */}
													<IconButton
														size="small"
														onClick={(e) => handleOpenActionMenu(e, p)}
													>
														<MoreVertIcon fontSize="small" />
													</IconButton>
												</div>
											</div>
										))
									)}
								</div>

								{/* Pagination controls: Trước | 1 2 ... n | Sau + jump box */}
								{productTotalPages > 1 && (
									<>
										<div className="px-4 py-2 bg-slate-50 flex items-center justify-between text-xs gap-3">
											<span className="text-slate-500">
												Trang {productPage + 1} / {productTotalPages}
											</span>

											<div className="flex items-center gap-2">
												{/* Prev */}
												<button
													type="button"
													onClick={handlePrevPage}
													disabled={productPage === 0 || loadingProducts}
													className={`px-3 py-1 rounded-full border text-xs ${
														productPage === 0 || loadingProducts
															? "border-slate-200 text-slate-300 cursor-not-allowed"
															: "border-slate-300 text-slate-700 hover:bg-slate-100"
													}`}
												>
													Trước
												</button>

												{/* Page numbers 1,2,...,n */}
												{pageChips.map((chip) =>
													chip.type === "page" ? (
														<button
															key={chip.index}
															type="button"
															onClick={() => {
																setProductPage(chip.index);
																setShowJumpBox(false);
															}}
															className={`min-w-[32px] px-2 py-1 rounded-full border text-xs ${
																chip.index === productPage
																	? "bg-slate-800 text-white border-slate-800"
																	: "border-slate-300 text-slate-700 hover:bg-slate-100"
															}`}
														>
															{chip.index + 1}
														</button>
													) : (
														<button
															key={chip.key}
															type="button"
															onClick={openJumpPopup}
															className="px-1 text-xs text-slate-400 hover:text-slate-600"
														>
															…
														</button>
													),
												)}

												{/* Next */}
												<button
													type="button"
													onClick={handleNextPage}
													disabled={
														loadingProducts ||
														productTotalPages === 0 ||
														productPage + 1 >= productTotalPages
													}
													className={`px-3 py-1 rounded-full border text-xs ${
														loadingProducts ||
														productTotalPages === 0 ||
														productPage + 1 >= productTotalPages
															? "border-slate-200 text-slate-300 cursor-not-allowed"
															: "border-slate-300 text-slate-700 hover:bg-slate-100"
													}`}
												>
													Sau
												</button>
											</div>
										</div>

										{showJumpBox && (
											<div className="px-4 pb-3 bg-slate-50 border-t border-slate-200">
												<form
													onSubmit={handleSubmitJump}
													className="flex items-center gap-2 text-xs"
												>
													<span className="text-slate-500">
														Nhảy tới trang:
													</span>
													<input
														type="number"
														className="w-16 px-2 py-1 border border-slate-300 rounded-md text-xs outline-none focus:border-slate-500"
														min={1}
														max={productTotalPages}
														value={jumpPageInput}
														onChange={(e) =>
															setJumpPageInput(e.target.value)
														}
													/>
													<button
														type="submit"
														className="px-3 py-1 rounded-full border text-xs border-slate-300 text-slate-700 hover:bg-slate-100"
													>
														Đi
													</button>
													<button
														type="button"
														onClick={() => setShowJumpBox(false)}
														className="px-3 py-1 rounded-full border text-xs border-slate-200 text-slate-400 hover:bg-slate-100"
													>
														Hủy
													</button>
												</form>
											</div>
										)}
									</>
								)}
							</div>
						</>
					)}
				</div>

				<div className="image-preview w-[40%] mr-3">
					{slides.length > 0 ? (
						<SwipeSlider showThumbs width="30rem" height="40rem" slides={slides} />
					) : (
						<NoImage />
					)}
				</div>
			</div>

			{/* Menu action 3 chấm */}
			<Menu
				anchorEl={actionAnchorEl}
				open={openActionMenu}
				onClose={handleCloseActionMenu}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
			>
				<MenuItem onClick={handleUnlinkProduct}>Gỡ khỏi bộ sưu tập</MenuItem>
			</Menu>
		</>
	);
};

export default Detail;
