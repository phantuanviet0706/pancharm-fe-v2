import React, { useEffect, useMemo, useState } from "react";
import GenericDialog from "../../../../components/GenericDialog";
import { useFormHandler } from "../../../../hooks/useFormHandler";
import { Collection, DEFAULT_COLLECTION } from "../../../../api/collectionService";
import FormInput from "../../../../components/FormInput";
import { handleFormData } from "../../../../utils/helper";

const isFile = (v: any): v is File => typeof File !== "undefined" && v instanceof File;
const UPLOAD_KEY = "collectionImages";

interface FormProps {
	open: boolean;
	onClose: () => void;
	onSubmit: (data: any) => any;
	data?: Collection;
	onSuccess?: (code: number, message: string) => void;
	action?: "create" | "update" | "updateImages" | "unlinkProduct";
}

const Form = ({ open, onClose, onSubmit, data, onSuccess, action = "create" }: FormProps) => {
	const { form, setForm } = useFormHandler<Collection>(
		data ?? null,
		DEFAULT_COLLECTION,
		onSubmit,
		open,
		(f: Partial<Collection>) => ({ ...f }),
	);

	const existingImages = useMemo(() => data?.collectionImages ?? [], [data]);

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

	const toFormData = (payload: Partial<Collection>) => {
		const fd = handleFormData({
			...payload,
			collectionImages: undefined,
			collectionImageFiles: undefined,
		});
		console.log(payload);
		const mixed = (payload as any)?.collectionImageFiles;
		const arr: any[] = Array.isArray(mixed) ? mixed : mixed ? [mixed] : [];
		arr.forEach((item) => {
			if (isFile(item)) fd.append(UPLOAD_KEY, item, item.name);
		});
		return fd;
	};

	const handleSave = async () => {
		try {
			const payload: Partial<Collection> =
				action === "updateImages"
					? { id: form.id, defaultImageId }
					: {
							name: form.name,
							slug: form.slug,
							description: form.description,
							collectionImageFiles: (form as any)?.collectionImageFiles,
						};

			const fd = toFormData(payload);
			const res = await onSubmit(fd);
			onSuccess?.(res.code, res.message);
			if (res.code === 1) onClose();
		} catch (err) {
			console.error(err);
		}
	};

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
										if (isChecked) {
											setDefaultImageId(null);
										} else {
											setDefaultImageId(it.id!);
											setForm({ ...form, defaultImageId: it.id });
										}
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
											onChange={() => {
												if (isChecked) {
													setDefaultImageId(null);
												} else {
													setDefaultImageId(it.id!);
													setForm({ ...form, defaultImageId: it.id });
												}
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
		case "unlinkProduct":
			const productName = (data as any)?.productName || (data as any)?.name || "sản phẩm này";

			title = "Gỡ sản phẩm khỏi Bộ sưu tập";
			formContent = (
				<div className="py-2">
					<p className="text-sm text-slate-700 mb-2">
						Muốn gỡ <b>{productName}</b> khỏi bộ sưu tập{" "}
						<b>{(data as any)?.collectionName || form.name}</b>?
					</p>
					<p className="text-xs text-slate-500">
						Hành động này <b>không xóa sản phẩm</b>, chỉ bỏ liên kết khỏi bộ sưu tập.
						Bạn vẫn có thể thêm lại sản phẩm vào bộ sưu tập sau này.
					</p>
				</div>
			);
			break;
		default:
			title = data ? "Chỉnh sửa Bộ sưu tập" : "Thêm mới Bộ sưu tập";
			formContent = (
				<>
					<div className="grid grid-cols-2 gap-4">
						<FormInput
							type="text"
							label="Tên bộ sưu tập"
							name="name"
							value={form.name ?? ""}
							onChange={(e) => setForm({ ...form, name: e })}
						/>
						<FormInput
							type="text"
							label="Mã bộ sưu tập"
							name="slug"
							value={form.slug ?? ""}
							onChange={(e) => setForm({ ...form, slug: e })}
						/>
					</div>

					<FormInput
						type="textarea"
						label="Mô tả"
						name="description"
						value={form.description ?? ""}
						onChange={(e) => setForm({ ...form, description: e })}
					/>

					<FormInput
						type="file"
						label="Ảnh"
						name={UPLOAD_KEY}
						value={form.collectionImages}
						fileMultiple
						onChange={(val) => setForm({ ...form, collectionImageFiles: val } as any)}
						showActions
					/>
				</>
			);
	}

	const actions =
		action === "create" || action === "update"
			? [
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
						onClick: handleSave,
						sx: { width: "50%", backgroundColor: "var(--color-card-bg)" },
					},
				]
			: [
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
						label: "Đồng ý",
						variant: "contained",
						onClick: handleSave,
						sx: { width: "50%", backgroundColor: "var(--color-card-bg)" },
					},
				];

	return (
		<GenericDialog open={open} title={title} onClose={onClose} actions={actions}>
			{formContent}
		</GenericDialog>
	);
};

export default Form;
