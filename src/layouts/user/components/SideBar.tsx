import { Drawer, IconButton } from "@mui/material";
import React, { useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export interface MenuItemProps {
	label: string;
	path?: string;
	children?: MenuItemProps[];
}

const MENU_DATA: MenuItemProps[] = [
	{
		label: "Products",
		path: "/products",
	},
	{
		label: "Collections",
		path: "/collections",
	},
	{
		label: "Categories",
		path: "/categories",
		children: [
			{ label: "Necklaces and pendants", path: "/jewelry/necklaces" },
			{ label: "Bracelets", path: "/jewelry/bracelets" },
			{ label: "Earrings", path: "/jewelry/earrings" },
			{ label: "Rings", path: "/jewelry/rings" },
			{ label: "Sets", path: "/jewelry/sets" },
			{ label: "Brooches", path: "/jewelry/brooches" },
			{ label: "Extenders", path: "/jewelry/extenders" },
			{ label: "Shop by collection", path: "/jewelry/collections" },
		],
	},
];

export interface SideBarProps {
	open: boolean;
	onClose: () => void;
}

const SideBar = ({ open, onClose }: SideBarProps) => {
	const [stack, setStack] = useState<MenuItemProps[]>([]);
	const level = stack.length;
	const current = level ? stack[level - 1] : undefined;

	const list = useMemo<MenuItemProps[]>(
		() => (level ? (current?.children ?? []) : MENU_DATA),
		[level, current],
	);

	const panels: MenuItemProps[][] = [MENU_DATA, current?.children ?? []];

	const goInto = (item: MenuItemProps) => {
		if (item.children?.length) setStack((s) => [...s, item]);
		else if (item.path) window.location.href = item.path;
	};

	const goBack = () => setStack((s) => s.slice(0, -1));

	const closeAll = () => {
		setStack([]);
		onClose();
	};

	return (
		<Drawer
			anchor="left"
			open={open}
			onClose={closeAll}
			PaperProps={{
				sx: {
					width: { xs: 360, sm: 420 },
					borderRight: "1px solid #eee",
					borderTopRightRadius: 12,
					borderBottomRightRadius: 12,
					overflow: "hidden",
				},
			}}
			ModalProps={{ keepMounted: true }}
		>
			<div className="sticky top-0 z-20 bg-white">
				<div className="relative h-14 flex items-center px-2">
					<IconButton aria-label="Close menu" onClick={closeAll} className="!mr-2">
						<CloseIcon />
					</IconButton>

					<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
						<h3 className="font-semibold text-[16px]">
							{current?.label ?? "Categories"}
						</h3>
					</div>
				</div>
				<div className="h-px bg-gray-200" />

				<div className={`h-12 items-center px-4 ${level > 0 ? "flex" : "hidden"}`}>
					<button
						onClick={goBack}
						className="flex items-center gap-2 text-gray-700 font-medium"
						aria-label="Back"
					>
						<ArrowBackIosNewIcon fontSize="small" />
						<span>Back</span>
					</button>

					<a
						href={current?.path || "#"}
						className="ml-auto text-[14px] text-gray-500 hover:text-gray-700"
					>
						Discover All
					</a>
				</div>
				{level > 0 && <div className="h-px bg-gray-200" />}
			</div>

			<div className="relative overflow-hidden">
				<div
					className="flex transition-transform duration-300 ease-out"
					style={{ transform: `translateX(-${Math.min(level, 1) * 100}%)` }}
				>
					<Panel list={panels[0]} onClickItem={goInto} />
					<Panel list={panels[1]} onClickItem={goInto} />
				</div>
			</div>

			<div className="mt-auto border-t">
				<a href="/wishlist" className="block px-5 h-14 flex items-center hover:bg-gray-50">
					Wishlist
				</a>
				<a href="/login" className="block px-5 h-14 flex items-center hover:bg-gray-50">
					Login
				</a>
			</div>
		</Drawer>
	);
};

function Panel({
	list,
	onClickItem,
}: {
	list: MenuItemProps[];
	onClickItem: (item: MenuItemProps) => void;
}) {
	return (
		<div className="min-w-full">
			<ul className="divide-y">
				{list.map((item, idx) => (
					<li key={idx}>
						<button
							onClick={() => onClickItem(item)}
							className="w-full h-16 px-5 flex items-center justify-between hover:bg-gray-50"
						>
							<span className="text-[15px] text-gray-800">{item.label}</span>
							{item.children?.length ? (
								<ChevronRightIcon sx={{ color: "#9ca3af" }} />
							) : null}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default SideBar;
