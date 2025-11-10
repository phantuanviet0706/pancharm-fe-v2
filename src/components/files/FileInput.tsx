// components/files/FileInput.tsx
import React, { useEffect, useRef, useState } from "react";
import { FileInputManager, MixedValue } from "./FileInputManager";

function isImageName(nameOrUrl?: string) {
	return !!nameOrUrl && /\.(png|jpe?g|gif|webp|bmp|svg|heic|heif)$/i.test(nameOrUrl);
}

export interface FileInputProps {
	name?: string;
	label?: string;
	value?: MixedValue | { items?: any[]; primaryIndex?: number }; // hỗ trợ adapter mới
	onChange?: (v: any) => void;
	multiple?: boolean;
	accept?: string;
	disabled?: boolean;
	tabIndex?: number;
	className?: string;
	/** Ẩn/hiện các nút hành động (mặc định & xoá). Mặc định = true (hiện) */
	showActions?: boolean;
}

const FileInput: React.FC<FileInputProps> = ({
	name,
	label,
	value,
	onChange,
	multiple = false,
	accept,
	disabled,
	tabIndex,
	className = "",
	showActions = true,
}) => {
	const mgrRef = useRef(new FileInputManager(multiple));
	const [, force] = useState(0); // trigger re-render

	// =============== Pending & Dialog state ===============
	const [dialogOpen, setDialogOpen] = useState(false);
	const [pendingFiles, setPendingFiles] = useState<File[]>([]);

	// init / sync when value changes from parent (bind remote)
	useEffect(() => {
		const mgr = mgrRef.current;
		mgr.multiple = multiple;

		const v = value as any;
		if (v && typeof v === "object" && ("items" in v || "primaryIndex" in v)) {
			mgr.setInitialValue(v.items ?? []);
			if (Number.isInteger(v.primaryIndex)) {
				mgr.setDefault(v.primaryIndex as number);
			}
		} else {
			mgr.setInitialValue(value as MixedValue);
		}

		force((n) => n + 1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value, multiple]);

	const getShowing = () => mgrRef.current.getShowing();
	const getPrimaryIndex = () => mgrRef.current.primaryIndex;

	const emit = () => {
		const out = mgrRef.current.emitValue();
		onChange?.(out);
		force((n) => n + 1);
	};

	// ===== CHỈNH Ở ĐÂY =====
	// Nếu danh sách hiện đang rỗng -> thêm thẳng, KHÔNG mở dialog
	// Nếu đã có file -> mở dialog xác nhận ghi đè như cũ
	const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files ?? []);
		if (!files.length) return;

		const hasExisting = getShowing().length > 0;

		if (!hasExisting) {
			// thêm trực tiếp
			mgrRef.current.addLocalFiles(files);
			// nếu chưa có mặc định thì set về 0 (tuỳ nhu cầu)
			if (getPrimaryIndex() === -1) {
				mgrRef.current.setDefault(0);
			}
			emit();
			e.currentTarget.value = ""; // cho phép chọn lại cùng file
			return;
		}

		// vẫn như cũ: đã có -> hỏi ghi đè
		setPendingFiles(files);
		setDialogOpen(true);
		e.currentTarget.value = ""; // allow selecting same file again later
	};

	// Confirm overwrite
	const confirmOverwrite = () => {
		const mgr = mgrRef.current;
		mgr.clearAll();
		mgr.addLocalFiles(pendingFiles);
		// set default = 0 sau khi ghi đè (nếu muốn)
		if (mgr.primaryIndex === -1 && mgr.getShowing().length > 0) {
			mgr.setDefault(0);
		}
		setPendingFiles([]);
		setDialogOpen(false);
		emit();
	};

	// Cancel overwrite
	const cancelOverwrite = () => {
		setPendingFiles([]);
		setDialogOpen(false);
	};

	// Close with ESC
	useEffect(() => {
		if (!dialogOpen) return;
		const onKey = (ev: KeyboardEvent) => {
			if (ev.key === "Escape") setDialogOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [dialogOpen]);

	const removeAt = (idx: number) => {
		mgrRef.current.removeAt(idx);
		emit();
	};

	const setDefault = (idx: number) => {
		const list = getShowing();
		if (idx < 0 || idx >= list.length) return;
		mgrRef.current.setDefault(idx);
		force((n) => n + 1);
		emit();
	};

	const unsetDefault = () => {
		mgrRef.current.unsetDefault();
		force((n) => n + 1);
		emit();
	};

	const clearAll = () => {
		mgrRef.current.clearAll();
		emit();
	};

	const list = getShowing();
	const primaryIdx = getPrimaryIndex();

	return (
		<div className={`space-y-3 ${className}`}>
			{label && (
				<label className="text-sm font-medium text-[var(--color-card-bg)]">{label}</label>
			)}

			{/* picker */}
			<div className="flex items-center gap-3">
				<input
					id={name}
					name={name}
					type="file"
					multiple={multiple}
					accept={accept}
					disabled={disabled}
					onChange={handleSelect}
					className="block w-full rounded-lg border border-[var(--color-card-bg)] bg-[var(--color-cream-bg)] px-4 py-2 text-[var(--color-card-bg)] file:mr-3 file:rounded-md file:border-0 file:bg-[var(--color-card-bg)] file:px-3 file:py-1.5 file:text-white hover:file:opacity-90 disabled:opacity-60"
					tabIndex={tabIndex}
				/>
				{showActions && list.length > 0 && (
					<button
						type="button"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							clearAll();
						}}
						disabled={disabled}
						className="text-sm px-3 py-2 rounded-md bg-red-50 text-red-700 hover:bg-red-100 disabled:opacity-60 pointer-events-auto"
					>
						Xoá tất cả
					</button>
				)}
			</div>

			{/* list */}
			{list.length > 0 && (
				<ul className="space-y-2 max-h-72 overflow-auto pr-1">
					{list.map((it, idx) => {
						const isPrimary = primaryIdx === idx;
						const canPreview = isImageName(it.label) || isImageName(it.url);

						return (
							<li
								key={idx}
								className="flex items-center gap-3 rounded-md border p-2 bg-white"
							>
								<div className="w-12 h-12 shrink-0 rounded bg-gray-50 border flex items-center justify-center overflow-hidden">
									{canPreview && it.url ? (
										<img
											src={it.url}
											alt={it.label}
											className="w-full h-full object-cover"
										/>
									) : (
										<svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-500">
											<path
												fill="currentColor"
												d="M14 2H6a2 2 0 0 0-2 2v16l4-4h10a2 2 0 0 0 2-2V8z"
											/>
										</svg>
									)}
								</div>

								<div className="flex-1 min-w-0">
									<div className="font-medium text-gray-800 truncate">
										{it.label}
										{/* Hiển thị badge mặc định nếu cần */}
										{/* {isPrimary && (
                      <span className="ml-2 inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-300">
                        Mặc định
                      </span>
                    )} */}
									</div>
									{it.url && (
										<a
											href={it.url}
											target="_blank"
											rel="noreferrer"
											className="text-xs underline truncate"
											title={it.url}
											style={{ color: "var(--color-card-bg)" }}
										>
											Mở xem
										</a>
									)}
								</div>

								{/* ACTION BUTTONS (hide/show by prop) */}
								{showActions && (
									<div className="flex items-center gap-2">
										{/* Nút set default nếu bạn muốn bật lại */}
										{/* {isPrimary ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          unsetDefault();
                        }}
                        disabled={disabled}
                        className="text-sm px-3 py-1.5 rounded-md border bg-yellow-50 text-yellow-800 border-yellow-200 hover:bg-yellow-100 disabled:opacity-60 pointer-events-auto"
                        aria-pressed="true"
                      >
                        Bỏ mặc định
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setDefault(idx);
                        }}
                        disabled={disabled}
                        className="text-sm px-3 py-1.5 rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50 disabled:opacity-60 pointer-events-auto"
                        aria-pressed="false"
                      >
                        Chọn mặc định
                      </button>
                    )} */}

										<button
											type="button"
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
												removeAt(idx);
											}}
											disabled={disabled}
											className="text-sm px-3 py-1.5 rounded-md bg-red-50 text-red-700 hover:bg-red-100 disabled:opacity-60 pointer-events-auto"
										>
											Xoá
										</button>
									</div>
								)}
							</li>
						);
					})}
				</ul>
			)}

			{/* Dialog Overwrite */}
			{dialogOpen && (
				<div
					className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40 p-4"
					role="dialog"
					aria-modal="true"
				>
					<div className="w-full max-w-md rounded-xl bg-white shadow-lg border">
						<div className="px-5 py-4 border-b">
							<h3 className="text-base font-semibold text-gray-800">
								Cấu hình cập nhật tệp
							</h3>
						</div>

						<div className="px-5 py-4 space-y-3 text-sm text-gray-700">
							<p>
								<strong>Lưu ý:</strong> Nếu bạn chỉnh sửa thì sẽ{" "}
								<strong>ghi đè</strong> toàn bộ tệp đã có trước đó.
							</p>
							{pendingFiles.length > 0 && (
								<div className="rounded-md bg-gray-50 border px-3 py-2">
									<div className="text-xs text-gray-600 mb-1">
										Tệp sẽ thay thế:
									</div>
									<ul className="max-h-28 overflow-auto text-xs list-disc pl-5">
										{pendingFiles.map((f, i) => (
											<li key={i} className="truncate">
												{f.name}
											</li>
										))}
									</ul>
								</div>
							)}
						</div>

						<div className="px-5 py-4 border-t flex items-center justify-end gap-2">
							<button
								type="button"
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									cancelOverwrite();
								}}
								className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
							>
								Huỷ
							</button>
							<button
								type="button"
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									confirmOverwrite();
								}}
								className="px-4 py-2 rounded-md bg-[var(--color-card-bg)] text-white hover:opacity-90"
							>
								Ghi đè &amp; Lưu
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default FileInput;
