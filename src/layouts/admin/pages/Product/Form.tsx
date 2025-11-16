import React, { useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_PRODUCT, Product } from "../../../../api/productService";
import { useFormHandler } from "../../../../hooks/useFormHandler";
import GenericDialog from "../../../../components/GenericDialog";
import FormInput from "../../../../components/FormInput";
import { handleFormData } from "../../../../utils/helper";
import { fetchData } from "../../../../api/categoryService";
import { ProductStatus, ProductStatusVariable } from "../../../../constants/productStatus";

const isFile = (v: any): v is File => typeof File !== "undefined" && v instanceof File;
const UPLOAD_KEY = "productImages";

interface FormProps {
	open: boolean;
	onClose: () => void;
	onSubmit: (data: any) => any;
	data?: Product;
	onSuccess?: (code: number, message: string) => void;
	action?: "create" | "update" | "updateImages";
}

const Form = ({ open, onClose, onSubmit, data, onSuccess, action = "create" }: FormProps) => {
	const { form, setForm } = useFormHandler<Product>(
		data ?? null,
		DEFAULT_PRODUCT,
		onSubmit,
		open,
		(form: Partial<Product>) => ({
			...form,
			categoryId: form.categoryId,
			categoryName: form.categoryName,
		}),
	);

	const existingImages = useMemo(() => data?.productImages ?? [], [data]);

	const initialDefaultId = useMemo(
		() => existingImages.find((x: any) => x.isDefault)?.id ?? null,
		[existingImages],
	);
	const [defaultImageId, setDefaultImageId] = useState<number | null>(initialDefaultId);

	useEffect(() => {
		if (action === "updateImages" && open) {
			setDefaultImageId(initialDefaultId ?? null);
		}
	}, [action, open, initialDefaultId]);

	const toFormData = (payload: Partial<Product>) => {
		const fd = handleFormData({
			...payload,
			productImages: undefined,
			productImageFiles: undefined,
		});
		const mixed = (payload as any)?.productImageFiles;
		const arr: any[] = Array.isArray(mixed) ? mixed : mixed ? [mixed] : [];
		arr.forEach((item) => {
			if (isFile(item)) fd.append(UPLOAD_KEY, item, item.name);
		});
		return fd;
	};

	const handleSave = async () => {
		try {
			const payload: Partial<Product> =
				action === "updateImages"
					? { id: form.id, defaultImageId }
					: {
							name: form.name,
							slug: form.slug,
							description: form.description,
							quantity: form.quantity,
							unitPrice: form.unitPrice,
							categoryId: form.categoryId,
							productImageFiles: (form as any)?.productImageFiles,
						};

			if (action == "update") {
				payload.status = form.status;
			}

			const fd = toFormData(payload);
			const res = await onSubmit(fd);
			onSuccess?.(res.code, res.message);
			if (res.code === 1) onClose();
		} catch (err) {
			console.error(err);
		}
	};

	// ---- Start handle parent category ----
	const [catOpts, setCatOpts] = useState<any[]>([]);
	const [loadingCats, setLoadingCats] = useState(false);
	const searchTimerRef = useRef<number | null>(null);

	const loadCategories = async (keyword = "") => {
		setLoadingCats(true);
		try {
			const res = await fetchData(keyword ? { keyword } : {});
			setCatOpts(
				(res?.result?.content ?? []).map((it: any) => ({ id: it.id, name: it.name })),
			);
		} catch (e) {
			console.error(e);
			setCatOpts([]);
		} finally {
			setLoadingCats(false);
		}
	};

	const handleSearchCategory = (keyword: string) => {
		if (searchTimerRef.current) window.clearTimeout(searchTimerRef.current);
		searchTimerRef.current = window.setTimeout(() => {
			loadCategories(keyword);
		}, 350) as unknown as number;
	};

	useEffect(() => {
		if (open) loadCategories();
	}, [open]);

	useEffect(() => {
		if (!form.categoryId) return;
		const exist = catOpts.some((o) => o.id === form.categoryId);
		if (!exist) {
			setCatOpts((prev) => [{ id: form.categoryId, name: form.categoryName || "" }, ...prev]);
		}
	}, [form.categoryId, form.categoryName]);
	// ---- End handle parent category ----

	let formContent: React.ReactNode = null;
	let title = "";

	switch (action) {
		case "updateImages":
			title = "Chọn ảnh mặc định";

			formContent = (
				<>
					<div
						className="
						items-stretch gap-3 no-scrollbar py-1 px-1
						snap-x snap-mandatory h-[28em] overflow-y-scroll
						thin-scrollbar
					"
						style={{ scrollBehavior: "smooth" }}
					>
						{existingImages.map((it) => {
							const isChecked = defaultImageId === it.id;
							const hasSelected = defaultImageId !== null;
							const isDisabled = hasSelected && !isChecked;

							return (
								<div
									key={it.id}
									className={`
									shrink-0 snap-start my-2
									w-[520px] rounded-2xl border bg-white
									flex items-center gap-3 px-3 py-2
									${isChecked ? "border-[var(--color-card-bg)] shadow-[0_8px_24px_rgba(0,0,0,0.08)]" : "border-gray-200"}
									transition-all duration-200
									${isDisabled ? "opacity-60" : "hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)]"}
								`}
									onClick={() => {
										if (isChecked) setDefaultImageId(null);
										else setDefaultImageId(it.id!);
									}}
									role="button"
								>
									{/* Thumbnail trái */}
									<div className="w-[44px] h-[44px] rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center shrink-0">
										{it.path?.match(/\.(png|jpg|jpeg|webp|gif|avif|svg)$/i) ? (
											<img
												src={it.path}
												alt=""
												className="w-full h-full object-cover"
											/>
										) : (
											<svg
												viewBox="0 0 24 24"
												className="w-6 h-6 text-gray-600"
											>
												<path
													fill="currentColor"
													d="M6 2h7l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7 1.5V8h4.5"
												/>
											</svg>
										)}
									</div>

									<div className="flex-1 min-w-0">
										<div
											className="text-[15px] font-medium text-gray-800 truncate"
											title={it.filename || it.path}
										>
											{it.filename || it.path?.split("/").pop()}
										</div>
										<div className="text-[12px] mt-[2px]">
											<a
												href={it.path}
												target="_blank"
												rel="noreferrer"
												className="hover:underline"
												onClick={(e) => e.stopPropagation()}
												style={{ color: "var(--color-card-bg)" }}
											>
												Mở tab mới
											</a>
										</div>
									</div>

									<div className="flex items-center gap-2 shrink-0">
										<input
											type="checkbox"
											checked={!!isChecked}
											disabled={!!isDisabled}
											onChange={(e) => {
												e.stopPropagation();
												if (isChecked) setDefaultImageId(null);
												else setDefaultImageId(it.id!);
											}}
											className="accent-[var(--color-card-bg)] size-4"
											title={
												isChecked
													? "Mặc định"
													: isDisabled
														? "Đã khóa"
														: "Chọn mặc định"
											}
										/>
									</div>
								</div>
							);
						})}
					</div>

					<div className="mt-3 flex items-center justify-between">
						<div className="text-xs text-gray-500">
							Chỉ chọn <b>1 ảnh</b> làm mặc định. Muốn đổi ảnh khác, bấm{" "}
							<i>Bỏ chọn</i> trước.
						</div>

						<button
							type="button"
							disabled={defaultImageId === null}
							onClick={() => setDefaultImageId(null)}
							className={`
							text-sm px-3 py-1.5 rounded-lg border transition
							${
								defaultImageId === null
									? "text-gray-400 border-gray-200 cursor-not-allowed"
									: "text-[var(--color-card-bg)] border-[var(--color-card-bg)]/30 hover:bg-[var(--color-card-bg)]/5"
							}
						`}
						>
							Bỏ chọn
						</button>

						<input type="hidden" name="id" value={form.id ?? ""} />
					</div>
				</>
			);
			break;
		default:
			title = data ? "Chỉnh sửa Sản phẩm" : "Thêm mới Sản phẩm";
			formContent = (
				<>
					<div className="grid grid-cols-2 gap-4">
						<FormInput
							type="text"
							label="Tên sản phẩm"
							name="name"
							value={form.name}
							onChange={(v) => setForm((f) => ({ ...f, name: v }))}
						></FormInput>
						<FormInput
							type="text"
							label="Mã sản phẩm"
							name="slug"
							value={form.slug}
							onChange={(v) => setForm((f) => ({ ...f, slug: v }))}
						></FormInput>
					</div>
					<FormInput
						type="autocomplete"
						label="Danh mục cha"
						name="categoryId"
						value={
							form.categoryId
								? (catOpts.find((o) => o.id === form.categoryId) ?? null)
								: null
						}
						autocompleteOptions={catOpts}
						loading={loadingCats}
						onSearch={handleSearchCategory}
						valueAs="object"
						optionValueKey="id"
						optionLabelKey="name"
						onChange={(selected) => {
							if (!selected)
								return setForm((f) => ({
									...f,
									categoryId: null as any,
									categoryName: "",
								}));
							setForm((f) => ({
								...f,
								categoryId: selected.id,
								categoryName: selected.name ?? "",
							}));
						}}
					/>
					<div className="grid grid-cols-2 gap-4">
						<FormInput
							type="int"
							label="Số lượng"
							name="quantity"
							value={form?.quantity}
							onChange={(e) => setForm({ ...form, quantity: e })}
						></FormInput>
						<FormInput
							type="int"
							label="Đơn giá"
							name="unitPrice"
							value={form?.unitPrice}
							onChange={(e) => setForm({ ...form, unitPrice: e })}
						></FormInput>
					</div>
					<FormInput
						type="textarea"
						label="Mô tả"
						name="description"
						value={form.description ?? ""}
						onChange={(e) => setForm({ ...form, description: e })}
					></FormInput>
					{action == "update" && (
						<FormInput
							type="select"
							label="Trạng thái"
							name="status"
							options={ProductStatusVariable()}
							value={form.status ?? "ACTIVE"}
							onChange={(e) => setForm({ ...form, status: e })}
						></FormInput>
					)}
					<FormInput
						type="file"
						label="Ảnh"
						name={UPLOAD_KEY}
						value={form.productImages}
						fileMultiple
						onChange={(val) => setForm({ ...form, productImageFiles: val } as any)}
						showActions
					/>
				</>
			);
	}

	return (
		<GenericDialog
			open={open}
			title={title}
			onClose={onClose}
			actions={[
				{
					label: "Đóng",
					variant: "outlined",
					onClick: onClose,
					sx: {
						width: "50%",
						borderColor: "var(--color-card-bg)",
						color: "var(--color-card-bg)",
					},
				},
				{
					label: "Lưu",
					variant: "contained",
					onClick: () => {
						handleSave();
					},
					sx: { width: "50%", backgroundColor: "var(--color-card-bg)" },
				},
			]}
		>
			{formContent}
		</GenericDialog>
	);
};

export default Form;
