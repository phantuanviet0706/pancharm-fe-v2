import React, { useEffect, useMemo, useState } from "react";

/** Phân trang chung */
export type PageParams = { page: number; size: number; q?: string };
export type PageResult<T> = { data: T[]; total: number };

type RenderItemArgs<T> = {
	item: T;
	selected: boolean;
	disabled: boolean;
	toggle: () => void;
};

export type FormPickerProps<T, K extends string | number> = {
	/** Controlled value: danh sách ID đã chọn ([] nếu rỗng) */
	value: K[];
	onChange: (ids: K[], items?: T[]) => void;

	/** Label của input */
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	className?: string;

	/** Chế độ chọn 1 hay nhiều (mặc định: nhiều) */
	singleSelect?: boolean;

	/** Hàm tải 1 trang dữ liệu (server-side paging) */
	fetchPage: (p: PageParams) => Promise<PageResult<T>>;

	/** Lấy khóa ID của 1 item */
	keyOf: (item: T) => K;

	/** Lấy label hiển thị cho chip/summary */
	labelOf: (item: T) => string;

	/** render card trong danh sách chọn */
	renderItem: (args: RenderItemArgs<T>) => React.ReactNode;

	/** item nào bị khóa không cho chọn */
	isItemDisabled?: (item: T) => boolean;

	/** Tùy chọn phân trang UI */
	pageSizeOptions?: number[];
	defaultPageSize?: number;

	/** Ẩn ô tìm kiếm */
	hideSearch?: boolean;

	/** Nút mở dialog (nếu muốn tự custom ở ngoài thì ẩn đi) */
	showOpenButton?: boolean;
	openButtonText?: string;
};

const useDebounce = <T,>(value: T, delay = 350) => {
	const [v, setV] = useState(value);
	useEffect(() => {
		const t = setTimeout(() => setV(value), delay);
		return () => clearTimeout(t);
	}, [value, delay]);
	return v;
};

export function FormPicker<T, K extends string | number>({
	value,
	onChange,
	label,
	placeholder = "Chọn…",
	disabled,
	required,
	className,
	singleSelect = false,
	fetchPage,
	keyOf,
	labelOf,
	renderItem,
	isItemDisabled,
	pageSizeOptions = [8, 12, 24, 48],
	defaultPageSize = 12,
	hideSearch = false,
	showOpenButton = true,
	openButtonText = "Chọn",
}: FormPickerProps<T, K>) {
	const [open, setOpen] = useState(false);

	// Tìm kiếm + phân trang
	const [q, setQ] = useState("");
	const dq = useDebounce(q, 350);
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(defaultPageSize);
	const [loading, setLoading] = useState(false);
	const [rows, setRows] = useState<T[]>([]);
	const [total, setTotal] = useState(0);

	// Lựa chọn (persist cross pages)
	const [selectedIds, setSelectedIds] = useState<Set<K>>(new Set(value));
	const [selectedCache, setSelectedCache] = useState<Map<K, T>>(new Map());

	// Mỗi khi value từ ngoài đổi → sync vào state
	useEffect(() => {
		setSelectedIds(new Set(value));
	}, [value]);

	// Reset khi mở
	useEffect(() => {
		if (open) {
			setPage(1);
			setSize(defaultPageSize);
			setQ("");
		}
	}, [open, defaultPageSize]);

	// Fetch trang
	useEffect(() => {
		if (!open) return;
		let cancelled = false;
		(async () => {
			setLoading(true);
			try {
				const res = await fetchPage({ page, size, q: dq || undefined });
				if (cancelled) return;
				setRows(res.data);
				setTotal(res.total);
				// cache item nếu đang được chọn
				setSelectedCache((prev) => {
					const next = new Map(prev);
					res.data.forEach((it) => {
						const k = keyOf(it);
						if (selectedIds.has(k)) next.set(k, it);
					});
					return next;
				});
			} finally {
				if (!cancelled) setLoading(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [open, page, size, dq]); // không thêm selectedIds để tránh refetch vòng lặp

	const totalPages = Math.max(1, Math.ceil(total / size));

	const toggleOne = (item: T) => {
		const k = keyOf(item);
		if (isItemDisabled?.(item)) return;

		if (singleSelect) {
			onChange([k], [item]);
			setOpen(false);
			return;
		}

		setSelectedIds((prev) => {
			const next = new Set(prev);
			if (next.has(k)) {
				next.delete(k);
				setSelectedCache((prevC) => {
					const m = new Map(prevC);
					m.delete(k);
					return m;
				});
			} else {
				next.add(k);
				setSelectedCache((prevC) => {
					const m = new Map(prevC);
					m.set(k, item);
					return m;
				});
			}
			return next;
		});
	};

	const confirm = () => {
		const ids = Array.from(selectedIds);
		const items = ids.map((id) => selectedCache.get(id)).filter(Boolean) as T[];
		onChange(ids, items);
		setOpen(false);
	};

	const clearOne = (id: K) => {
		const ids = new Set(selectedIds);
		ids.delete(id);
		setSelectedIds(ids);
		onChange(Array.from(ids));
	};

	const selectedItems = useMemo(
		() =>
			Array.from(selectedIds)
				.map((id) => selectedCache.get(id))
				.filter(Boolean) as T[],
		[selectedIds, selectedCache],
	);

	return (
		<div className={className}>
			{label && (
				<label className="block mb-1 text-sm font-medium text-gray-700">
					{label}
					{required ? " *" : ""}
				</label>
			)}

			{/* Input "giả" hiển thị chips + nút mở */}
			<div
				className={`flex flex-wrap items-center gap-2 rounded-lg border px-2 py-2 bg-white ${disabled ? "opacity-60" : ""}`}
			>
				{selectedItems.length === 0 && (
					<span className="text-gray-400 px-1">{placeholder}</span>
				)}

				{selectedItems.map((it) => {
					const id = keyOf(it);
					return (
						<span
							key={String(id)}
							className="inline-flex items-center gap-1 text-sm bg-gray-100 rounded-full px-2 py-1"
						>
							<span>{labelOf(it)}</span>
							{!disabled && (
								<button
									type="button"
									onClick={() => clearOne(id)}
									className="text-gray-500 hover:text-black"
									aria-label="remove"
								>
									×
								</button>
							)}
						</span>
					);
				})}

				{showOpenButton && !disabled && (
					<button
						type="button"
						onClick={() => setOpen(true)}
						className="ml-auto px-3 h-9 rounded-md border hover:bg-gray-50"
					>
						{openButtonText}
					</button>
				)}
			</div>

			{/* Dialog chọn */}
			{!open ? null : (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
					<div className="w-[min(1100px,95vw)] max-h-[90vh] bg-white rounded-2xl shadow-xl flex flex-col">
						<div className="px-5 py-4 border-b">
							<div className="flex items-center justify-between gap-3">
								<h3 className="text-lg font-semibold">
									{label || "Chọn đối tượng"}
								</h3>
								<button
									onClick={() => setOpen(false)}
									className="px-3 py-1.5 rounded-md border"
								>
									Đóng
								</button>
							</div>
							{!hideSearch && (
								<div className="mt-3">
									<input
										value={q}
										onChange={(e) => {
											setPage(1);
											setQ(e.target.value);
										}}
										placeholder="Tìm kiếm…"
										className="w-full h-10 rounded-md border px-3"
									/>
								</div>
							)}
							<div className="mt-3 flex items-center gap-2">
								<span className="text-sm text-gray-500">Hiển thị</span>
								<select
									value={size}
									onChange={(e) => {
										setPage(1);
										setSize(Number(e.target.value));
									}}
									className="h-10 rounded-md border px-2"
								>
									{pageSizeOptions.map((n) => (
										<option key={n} value={n}>
											{n}/trang
										</option>
									))}
								</select>
								<div className="ml-auto text-sm text-gray-500">
									Đã chọn: <b>{selectedIds.size}</b> • Tổng: {total}
								</div>
							</div>
						</div>

						<div className="p-5 overflow-auto">
							{loading && rows.length === 0 && (
								<div className="py-16 text-center text-gray-500">Đang tải…</div>
							)}
							{!loading && rows.length === 0 && (
								<div className="py-16 text-center text-gray-500">
									Không có dữ liệu
								</div>
							)}

							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
								{rows.map((item) => {
									const k = keyOf(item);
									const disabledItem = isItemDisabled?.(item) ?? false;
									const selected = selectedIds.has(k);
									return (
										<div
											key={String(k)}
											className={`rounded-xl border p-2 transition cursor-pointer
                        ${selected ? "border-black shadow" : "border-gray-200 hover:shadow-sm"}
                        ${disabledItem ? "opacity-50 cursor-not-allowed" : ""}
                      `}
											onClick={() => !disabledItem && toggleOne(item)}
										>
											{renderItem({
												item,
												selected,
												disabled: disabledItem,
												toggle: () => toggleOne(item),
											})}
										</div>
									);
								})}
							</div>
						</div>

						{!singleSelect && (
							<div className="px-5 py-4 border-t flex items-center justify-end gap-3">
								<button
									className="px-4 py-2 rounded-lg border"
									onClick={() => setOpen(false)}
								>
									Hủy
								</button>
								<button
									className="px-4 py-2 rounded-lg text-white"
									style={{ backgroundColor: "var(--color-card-bg, #111)" }}
									onClick={confirm}
									disabled={selectedIds.size === 0}
								>
									Xác nhận ({selectedIds.size})
								</button>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
