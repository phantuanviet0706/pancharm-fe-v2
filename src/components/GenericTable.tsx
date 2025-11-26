export interface Column<T> {
	key: keyof T | string;
	label: string;
	render?: (row: T) => React.ReactNode;
	width?: string; // ví dụ "180px" | "12rem" | "20%"
	align?: "left" | "right" | "center";
	headerStyle?: React.CSSProperties;
	cellStyle?: React.CSSProperties;
	className?: string;
	onClick?: (row: T) => void;
}

interface GenericTableProps<T> {
	data: T[];
	columns: Column<T>[];
	rowKey: (row: T) => string | number;
	maxHeight?: number | string;
	zebra?: boolean;
	compact?: boolean;
}

export default function GenericTable<T>({
	data,
	columns,
	rowKey,
	maxHeight = "62vh",
	zebra = true,
	compact = false,
}: GenericTableProps<T>) {
	if (!data || data.length === 0) return <p className="text-sm text-gray-500 text-center my-4">Không tìm thấy dữ liệu</p>;

	const pad = compact ? "px-3 py-2" : "px-4 py-3";

	const alignClass = (a?: Column<T>["align"]) =>
		a === "center" ? "text-center" : a === "right" ? "text-right" : "text-left";

	return (
		<div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden">
			<div className="overflow-auto thin-scrollbar" style={{ maxHeight }}>
				<table className="min-w-full table-fixed border-collapse">
					<thead className="bg-[var(--color-cream-bg)] sticky top-0 z-10">
						<tr className="border-b border-gray-200">
							{columns.map((col, idx) => (
								<th
									key={idx}
									className={[
										pad,
										"text-sm font-semibold tracking-wide text-[var(--color-card-bg)]",
										"border-r last:border-r-0 border-gray-200",
										alignClass(col.align),
										"whitespace-nowrap",
									].join(" ")}
									style={{
										width: col.width || "auto",
										...col.headerStyle,
									}}
									scope="col"
								>
									{col.label}
								</th>
							))}
						</tr>
					</thead>

					<tbody className="bg-white">
						{data.map((row, rIdx) => (
							<tr
								key={rowKey(row)}
								className={[
									"border-b border-gray-200",
									zebra ? "odd:bg-white even:bg-gray-50" : "",
									"hover:bg-[rgba(180,92,78,0.06)] transition-colors",
								].join(" ")}
							>
								{columns.map((col, cIdx) => {
									const content = col.render
										? col.render(row)
										: (row[col.key as keyof T] as any);

									return (
										<td
											key={cIdx}
											className={[
												pad,
												"text-sm text-gray-800",
												"border-r last:border-r-0 border-gray-200",
												alignClass(col.align),
												"align-middle",
												"truncate",
												col.onClick ? "cursor-pointer select-none" : "",
												col.className || "",
											].join(" ")}
											style={{
												width: col.width || "auto",
												...col.cellStyle,
											}}
											onClick={() => col.onClick?.(row)}
											title={
												typeof content === "string" ||
												typeof content === "number"
													? String(content)
													: undefined
											}
										>
											{col.render ? (
												content
											) : (
												<span className="block truncate">
													{content as any}
												</span>
											)}
										</td>
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
