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
	const [currentPageId, setCurrentPageId] = useState<string>(pages[0] ? getPageId(pages[0]) : "");
	const [searchText, setSearchText] = useState("");

	const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set(initialSelectedIds));

	// CHỈ reset khi dialog được mở mới, không phụ thuộc pages / initialSelectedIds
	useEffect(() => {
		if (!open) return;
		const firstPageId = pages[0] ? getPageId(pages[0]) : "";
		setCurrentPageId(firstPageId);
		setSearchText("");
		setSelectedIds(new Set(initialSelectedIds));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open]);

	const handleToggleSelect = (id: string) => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	};

	const handleChangePage = (pageId: string) => {
		setCurrentPageId(pageId);
		setSearchText("");
		onPageChange?.(pageId);
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

	const filteredItems: TItem[] = useMemo(() => {
		if (!enableSearch || !searchText.trim()) return items;

		const keyword = searchText.trim().toLowerCase();

		return items.filter((item) => {
			if (matchSearch) return matchSearch(item, keyword);
			return JSON.stringify(item).toLowerCase().includes(keyword);
		});
	}, [items, enableSearch, searchText, matchSearch]);

	const selectedCount = selectedIds.size;

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
							{pages.map((p) => {
								const id = getPageId(p);
								const label = getPageLabel(p);
								return (
									<ListItemButton
										key={id}
										selected={id === currentPageId}
										onClick={() => handleChangePage(id)}
										className="px-4 py-2"
									>
										<ListItemText
											primary={
												<span className="text-sm font-medium">
													{label.primary}
												</span>
											}
											secondary={
												label.secondary && (
													<span className="text-xs text-slate-500">
														{label.secondary}
													</span>
												)
											}
										/>
									</ListItemButton>
								);
							})}
						</List>
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
