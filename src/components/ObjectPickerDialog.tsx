import React, { useEffect, useMemo, useState } from "react";
import {
	Avatar,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	List,
	ListItemButton,
	ListItemText,
	Typography,
	TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

export type ObjectPickerProps<TItem, TPage> = {
	open: boolean;
	onClose: () => void;
	title?: string;
	description?: string;

	pages: TPage[];
	getPageId: (page: TPage) => string;
	getPageLabel: (page: TPage) => { primary: string; secondary?: string };

	itemsByPage: Record<string, TItem[]>;
	getItemId: (item: TItem) => string;

	renderItem: (args: { item: TItem; selected: boolean; toggle: () => void }) => React.ReactNode;

	enableSearch?: boolean;
	searchPlaceholder?: string;
	matchSearch?: (item: TItem, keyword: string) => boolean;

	initialSelectedIds?: string[];
	onConfirm: (params: { selectedIds: string[]; selectedItems: TItem[] }) => void;

	onPageChange?: (pageId: string) => void;

	loading?: boolean;
};

type PageChip = { type: "page"; index: number } | { type: "ellipsis"; key: string };

function buildPageChips(totalPages: number, currentIndex: number): PageChip[] {
	if (totalPages <= 0) return [];

	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => ({
			type: "page" as const,
			index: i,
		}));
	}

	// normalized currentIndex
	const cur = currentIndex < 0 ? 0 : currentIndex;

	const indices = new Set<number>();
	indices.add(0);
	indices.add(1);
	indices.add(totalPages - 1);
	indices.add(totalPages - 2);
	indices.add(cur - 1);
	indices.add(cur);
	indices.add(cur + 1);

	const validIndices = Array.from(indices)
		.filter((i) => i >= 0 && i < totalPages)
		.sort((a, b) => a - b);

	const chips: PageChip[] = [];
	let prev: number | null = null;

	for (const idx of validIndices) {
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

export function ObjectPicker<TItem, TPage>({
	open,
	onClose,
	title = "Chọn đối tượng",
	description,
	pages,
	getPageId,
	getPageLabel,
	itemsByPage,
	getItemId,
	renderItem,
	enableSearch = true,
	searchPlaceholder = "Tìm kiếm...",
	matchSearch,
	initialSelectedIds = [],
	onConfirm,
	onPageChange,
	loading = false,
}: ObjectPickerProps<TItem, TPage>) {
	const firstPageId = pages[0] ? getPageId(pages[0]) : "";
	const [currentPageId, setCurrentPageId] = useState<string>(firstPageId);
	const [searchText, setSearchText] = useState("");

	const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set(initialSelectedIds));

	const [showJumpBox, setShowJumpBox] = useState(false);
	const [jumpPageInput, setJumpPageInput] = useState("");

	// reset khi mở dialog
	useEffect(() => {
		if (!open) return;
		const fpId = pages[0] ? getPageId(pages[0]) : "";
		setCurrentPageId(fpId);
		setSearchText("");
		setSelectedIds(new Set(initialSelectedIds));
		setShowJumpBox(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open]);

	const changePageByIndex = (index: number) => {
		if (!pages.length) return;
		if (index < 0 || index >= pages.length) return;
		const id = getPageId(pages[index]);
		setCurrentPageId(id);
		setSearchText("");
		onPageChange?.(id);
	};

	const handleToggleSelect = (id: string) => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	};

	const handleChangePage = (pageId: string) => {
		const idx = pages.findIndex((p) => getPageId(p) === pageId);
		if (idx === -1) return;
		changePageByIndex(idx);
	};

	const handlePrevNext = (delta: -1 | 1) => {
		if (!pages.length) return;
		const currentIndex = pages.findIndex((p) => getPageId(p) === currentPageId);
		const nextIndex = currentIndex + delta;
		changePageByIndex(nextIndex);
	};

	const handleConfirm = () => {
		const allItems = Object.values(itemsByPage).flat();
		const selectedItems = allItems.filter((i) => selectedIds.has(getItemId(i)));
		onConfirm({
			selectedIds: Array.from(selectedIds),
			selectedItems,
		});
		onClose();
	};

	const items = itemsByPage[currentPageId] ?? [];

	const sortedItems: TItem[] = useMemo(() => {
		const arr = [...items];
		return arr.sort((a, b) => {
			const aSelected = selectedIds.has(getItemId(a));
			const bSelected = selectedIds.has(getItemId(b));

			if (aSelected === bSelected) return 0;
			return aSelected ? -1 : 1;
		});
	}, [items, selectedIds, getItemId]);

	const filteredItems: TItem[] = useMemo(() => {
		if (!enableSearch || !searchText.trim()) return sortedItems;

		const keyword = searchText.trim().toLowerCase();

		return sortedItems.filter((item) => {
			if (matchSearch) return matchSearch(item, keyword);
			return JSON.stringify(item).toLowerCase().includes(keyword);
		});
	}, [sortedItems, enableSearch, searchText, matchSearch]);

	const selectedCount = selectedIds.size;
	const currentPageIndex = pages.findIndex((p) => getPageId(p) === currentPageId);
	const totalPages = pages.length;

	const pageChips = buildPageChips(totalPages, currentPageIndex);

	const openJumpPopup = () => {
		const safeIndex = currentPageIndex >= 0 ? currentPageIndex : 0;
		setJumpPageInput(String(safeIndex + 1));
		setShowJumpBox(true);
	};

	const handleSubmitJump = (e: React.FormEvent) => {
		e.preventDefault();
		if (!totalPages) return;

		const raw = parseInt(jumpPageInput, 10);
		if (Number.isNaN(raw)) return;

		let pageNum = raw;
		if (pageNum < 1) pageNum = 1;
		if (pageNum > totalPages) pageNum = totalPages;

		changePageByIndex(pageNum - 1);
		setShowJumpBox(false);
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth="lg"
			fullWidth
			PaperProps={{
				className: "rounded-2xl !overflow-hidden shadow-xl border border-slate-100",
			}}
		>
			<DialogTitle
				className="flex items-center justify-between bg-slate-50 px-6 py-3"
				sx={{ m: 0 }}
			>
				<Box>
					<Typography variant="h6" className="font-semibold">
						{title}
					</Typography>
					{description && (
						<Typography variant="body2" className="text-slate-500">
							{description}
						</Typography>
					)}
				</Box>
				<IconButton onClick={onClose} size="small">
					<CloseIcon fontSize="small" />
				</IconButton>
			</DialogTitle>

			<DialogContent className="!p-0 flex h-[540px]">
				{/* Sidebar pages */}
				<Box className="w-64 border-r border-slate-200 flex flex-col">
					<Box className="flex items-center gap-3 px-4 py-4 border-b border-slate-200">
						<Avatar sx={{ width: 40, height: 40 }}>U</Avatar>
						<Box>
							<Typography className="font-medium text-sm">Collections</Typography>
							<Typography className="text-xs text-slate-500">
								Chọn trang / nhóm
							</Typography>
						</Box>
					</Box>

					<Box className="overflow-auto flex-1">
						<List dense disablePadding>
							{pageChips.map((chip) =>
								chip.type === "page" ? (
									<ListItemButton
										key={`page-${chip.index}`}
										selected={chip.index === currentPageIndex}
										onClick={() =>
											handleChangePage(getPageId(pages[chip.index]))
										}
										className="px-4 py-2"
									>
										<ListItemText
											primary={
												<span className="text-sm font-medium">
													Trang {chip.index + 1}
												</span>
											}
										/>
									</ListItemButton>
								) : (
									<ListItemButton
										key={chip.key}
										onClick={openJumpPopup}
										className="px-4 py-2"
									>
										<ListItemText
											primary={
												<span className="text-sm font-semibold text-slate-500">
													…
												</span>
											}
											secondary={
												<span className="text-[11px] text-slate-400">
													Nhảy tới trang…
												</span>
											}
										/>
									</ListItemButton>
								),
							)}
						</List>

						{showJumpBox && totalPages > 0 && (
							<Box className="px-4 py-3 border-t border-slate-200 bg-slate-50">
								<form
									onSubmit={handleSubmitJump}
									className="flex items-center gap-2"
								>
									<TextField
										size="small"
										type="number"
										label={`Trang (1–${totalPages})`}
										value={jumpPageInput}
										onChange={(e) => setJumpPageInput(e.target.value)}
										inputProps={{ min: 1, max: totalPages }}
										fullWidth
									/>
									<Button type="submit" variant="contained" size="small">
										Đi
									</Button>
									<Button
										type="button"
										variant="text"
										size="small"
										onClick={() => setShowJumpBox(false)}
									>
										Hủy
									</Button>
								</form>
							</Box>
						)}
					</Box>
				</Box>

				{/* Content */}
				<Box className="flex-1 flex flex-col">
					<Box className="px-6 py-3 border-b border-slate-200 flex items-center justify-between gap-4">
						<Box>
							<Typography className="font-semibold text-sm">
								{pages.find((p) => getPageId(p) === currentPageId)
									? getPageLabel(
											pages.find(
												(p) => getPageId(p) === currentPageId,
											) as TPage,
										).primary
									: "Không có trang"}
							</Typography>
							<Typography className="text-xs text-slate-500">
								{loading
									? "Đang tải dữ liệu..."
									: `${filteredItems.length} mục hiển thị`}
							</Typography>
						</Box>

						{enableSearch && (
							<Box className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-1.5 bg-white min-w-[220px]">
								<SearchIcon fontSize="small" className="text-slate-400" />
								<input
									className="outline-none bg-transparent text-sm w-full placeholder:text-slate-400"
									placeholder={searchPlaceholder}
									value={searchText}
									onChange={(e) => setSearchText(e.target.value)}
								/>
							</Box>
						)}
					</Box>

					<Box className="flex-1 overflow-auto px-6 py-2 space-y-2">
						{loading ? (
							<Box className="h-full flex items-center justify-center text-sm text-slate-500">
								Đang tải dữ liệu...
							</Box>
						) : filteredItems.length > 0 ? (
							filteredItems.map((item) => {
								const id = getItemId(item);
								const selected = selectedIds.has(id);
								const toggle = () => handleToggleSelect(id);
								return (
									<React.Fragment key={id}>
										{renderItem({ item, selected, toggle })}
									</React.Fragment>
								);
							})
						) : (
							<Box className="h-full flex items-center justify-center text-sm text-slate-500">
								Không có mục nào phù hợp.
							</Box>
						)}
					</Box>
				</Box>
			</DialogContent>

			<Divider />
			<DialogActions className="px-6 py-3 flex items-center justify-between bg-slate-50">
				<Typography className="text-sm text-slate-600">
					{selectedCount === 0 ? "Chưa chọn mục nào." : `Đã chọn ${selectedCount} mục.`}
				</Typography>
				<Box className="flex gap-2">
					<Button variant="text" onClick={onClose}>
						Hủy
					</Button>
					<Button
						variant="contained"
						onClick={handleConfirm}
						disabled={selectedCount === 0}
					>
						Xác nhận
					</Button>
				</Box>
			</DialogActions>
		</Dialog>
	);
}
