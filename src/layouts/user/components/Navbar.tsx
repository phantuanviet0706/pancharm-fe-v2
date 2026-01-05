import React, { useContext, useEffect, useRef, useState } from "react";
import {
	Avatar,
	Box,
	Button,
	Collapse,
	Dialog,
	DialogContent,
	DialogTitle,
	Drawer,
	IconButton,
	Link,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Icon from "../../../components/Icon";
import UserNav from "../../../components/UserNav";
import { useMe } from "../../../hooks/useMe";
import { logout } from "../../../api/authService";
import { ConfigContext } from "../../../contexts/ConfigProvider";
import { useCartDialog } from "../pages/Cart/CartDialogProvider";
import { getCookie } from "../../../utils/auth";
import { Category } from "../../../api/categoryService";

const MAIN_MENU = [
	{ key: "collections", label: "Bộ Sưu Tập", href: "/collections" },
	{ key: "categories", label: "Trang sức" },
	{ key: "products", label: "Sản phẩm", href: "/products" },
];

const PROFILE_SETTINGS = [
	{
		key: "admin",
		label: "Đi đến trang quản trị",
		href: "/admin",
	},
	{
		key: "change-password",
		label: "Đổi mật khẩu",
		href: "/change-password",
	},
	{
		key: "logout",
		label: "Đăng xuất",
		onClick: () => handleLogout(),
	},
];

const handleLogout = async () => {
	try {
		const token = getCookie("ACCESS_TOKEN") || "";
		await logout({ token });
	} catch (err) {
		console.error("Failed to logout:", err);
	} finally {
		document.cookie = "ACCESS_TOKEN=; Max-Age=0; Path=/;";
		window.location.href = "/login";
	}
};

const Navbar: React.FC<{ activeKey?: string }> = ({ activeKey = "default" }) => {
	const { state: APP_CONFIG } = useContext(ConfigContext);
	const company = APP_CONFIG?.company || {};
	const categories = APP_CONFIG?.categories || {};

	const [openProfile, setOpenProfile] = useState(false);
	const [openDrawer, setOpenDrawer] = useState(false);
	const [mobileOpenCategories, setMobileOpenCategories] = useState(false);

	const profileRef = useRef<HTMLDivElement | null>(null);
	const { openCart } = useCartDialog();
	const [openCategories, setOpenCategories] = useState(false);
	const categoriesRef = useRef<HTMLDivElement | null>(null);

	// Search logic
	const [showSearch, setShowSearch] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const searchRef = useRef<HTMLDivElement | null>(null);

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			window.location.href = `/products?keyword=${encodeURIComponent(searchQuery.trim())}`;
			setShowSearch(false);
		}
	};

	let userProfileHtml = (
		<div className="relative authentication-btn">
			<Button
				sx={{
					backgroundColor: "var(--color-card-bg)",
					"&:hover": {
						backgroundColor: "var(--color-card-bg-hover)",
					},
					borderRadius: "24px",
					paddingInline: "15px",
				}}
			>
				<Link
					href="/login"
					sx={{
						color: "var(--color-cream-bg)",
						"&:hover": {
							color: "var(--color-cream-bg-hover)",
						},
					}}
					underline="none"
				>
					<div className="login-btn">Đăng nhập</div>
				</Link>
			</Button>
		</div>
	);

	const token = getCookie("ACCESS_TOKEN");
	const { me } = useMe();
	if (token) {
		userProfileHtml = (
			<div className="relative" ref={profileRef}>
				<IconButton
					sx={{ color: "var(--color-card-bg)" }}
					aria-label="Tài khoản"
					aria-expanded={openProfile}
					onClick={(e) => {
						e.stopPropagation();
						setOpenProfile((v) => !v);
					}}
				>
					<Avatar
						sx={{ width: 32, height: 32 }}
						src={me?.avatar || "/default-avatar.png"}
					/>
				</IconButton>

				{openProfile && (
					<div
						role="menu"
						className="t-container absolute right-0 mt-3 w-48 overflow-hidden rounded-xl shadow-xl"
						style={{ backgroundColor: "var(--color-card-bg)" }}
					>
						<UserNav settings={PROFILE_SETTINGS}></UserNav>
					</div>
				)}
			</div>
		);
	}

	useEffect(() => {
		const onDocClick = (e: MouseEvent) => {
			if (categoriesRef.current && !categoriesRef.current.contains(e.target as Node)) {
				setOpenCategories(false);
			}
			if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
				setOpenProfile(false);
			}
			if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
				setShowSearch(false);
			}
		};
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setOpenCategories(false);
				setOpenProfile(false);
				setShowSearch(false);
			}
		};
		document.addEventListener("mousedown", onDocClick);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("mousedown", onDocClick);
			document.removeEventListener("keydown", onKey);
		};
	}, []);

	const suffix = location.pathname;
	PROFILE_SETTINGS.forEach((item) => {
		const pattern = new RegExp(`(${item?.key})`, "i");
		if (!pattern.test(suffix || "")) return;
		item.active = true;
	});

	return (
		<div className="sticky top-0 z-[1000] bg-[var(--color-cream-thick)] mb-0" ref={searchRef}>
			<div className="hidden lg:flex justify-between px-5 h-[30px] border-b font-normal text-base bg-[var(--color-card-bg)]"></div>

			<Box component="nav" aria-label="Main navigation">
				<div className="relative flex items-center justify-between px-4 md:px-5 h-[64px] md:h-[70px] border-b">
					{/* Left Nav */}
					<div className="flex items-center gap-2">
						<div className="lg:hidden">
							<IconButton
								sx={{ color: "var(--color-card-bg)", ml: -1 }}
								onClick={() => setOpenDrawer(true)}
							>
								<MenuIcon />
							</IconButton>
						</div>

						<div
							className="flex items-center gap-2 cursor-pointer"
							onClick={() => (window.location.href = "/")}
						>
							<div className="logo-icon w-7 h-7 md:w-10 md:h-10 flex items-center justify-center">
								<Icon name="pancharm" color="var(--color-card-bg)" />
							</div>
							<h1 className="text-lg md:text-2xl text-[var(--color-card-bg)] leading-none uppercase font-bold">
								Pancharm
							</h1>
						</div>
					</div>

					{/* Mid Nav */}
					<nav className="hidden md:flex items-center gap-2">
						{MAIN_MENU.map((it) => {
							const suffix = location.pathname;
							const pattern = new RegExp(`(${it?.key})`, "i");
							const active = pattern.test(suffix);
							if (it.key === "categories") {
								return (
									<div key={it.key} ref={categoriesRef} className="relative">
										<button
											type="button"
											aria-haspopup="menu"
											aria-expanded={openCategories}
											onClick={() => setOpenCategories((v) => !v)}
											className={[
												"px-3 py-2 text-sm font-semibold tracking-wide rounded-full transition-colors",
												openCategories
													? "text-[var(--color-cream-bg)]"
													: "text-[var(--color-card-bg)] hover:text-black",
											].join(" ")}
											style={{
												backgroundColor: openCategories
													? "var(--color-card-bg)"
													: "transparent",
											}}
										>
											{it.label}
										</button>

										{openCategories && (
											<div
												role="menu"
												className="t-container absolute left-full -translate-x-1/2 mt-2 w-48 rounded-2xl shadow-xl overflow-hidden"
												style={{ backgroundColor: "var(--color-card-bg)" }}
											>
												<ul className="py-2">
													{categories.length > 0 &&
														categories.map(
															(op: Category, idx: number) => (
																<li key={idx}>
																	<a
																		role="menuitem"
																		href={`/products?categoryId=${op.id}`}
																		onClick={() =>
																			setOpenCategories(false)
																		}
																		className="
                                                                            block px-4 py-2 text-sm text-[var(--color-cream-bg)]
                                                                            hover:bg-[color:var(--color-cream-soft)]/15
                                                                            overflow-hidden text-ellipsis whitespace-nowrap
                                                                        "
																	>
																		{op.name}
																	</a>
																</li>
															),
														)}
												</ul>
											</div>
										)}
									</div>
								);
							}

							return (
								<a
									key={it.key}
									href={it.href}
									className={[
										"px-3 py-2 text-sm font-semibold tracking-wide rounded-full transition-colors",
										active
											? "text-white"
											: "text-[var(--color-card-bg)] hover:text-black",
									].join(" ")}
									style={{
										backgroundColor: active
											? "var(--color-card-bg)"
											: "transparent",
										color: active
											? "var(--color-cream-bg)"
											: "var(--color-card-bg)",
									}}
								>
									{it.label}
								</a>
							);
						})}
					</nav>

					{/* Right Nav */}
					<div className="flex items-center gap-2 md:gap-3">
						<div className="relative hidden lg:flex items-center">
							<Collapse orientation="horizontal" in={showSearch}>
								<form onSubmit={handleSearchSubmit}>
									<input
										type="text"
										placeholder="Tìm kiếm..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										onClick={(e) => e.stopPropagation()}
										className="outline-none border-b border-[var(--color-card-bg)] bg-transparent px-2 mr-2 w-48 transition-all"
										autoFocus
									/>
								</form>
							</Collapse>
							<IconButton
								sx={{ color: "var(--color-card-bg)" }}
								onClick={() => {
									if (showSearch) {
										// Nếu đang mở mà nhấn icon thì submit luôn
										const event = new Event("submit") as any;
										handleSearchSubmit(event);
									} else {
										setShowSearch(true);
									}
								}}
							>
								<SearchIcon />
							</IconButton>
						</div>

						<div className="lg:hidden">
							<IconButton
								sx={{ color: "var(--color-card-bg)" }}
								onClick={() => setShowSearch(!showSearch)}
							>
								<SearchIcon />
							</IconButton>
						</div>

						<IconButton
							sx={{ color: "var(--color-card-bg)" }}
							aria-label="Giỏ hàng"
							onClick={openCart}
						>
							<ShoppingCartIcon />
						</IconButton>

						{userProfileHtml}
					</div>
				</div>
			</Box>

			<Drawer
				anchor="left"
				open={openDrawer}
				onClose={() => setOpenDrawer(false)}
				PaperProps={{
					sx: { width: 280, backgroundColor: "var(--color-cream-thick)" },
				}}
			>
				<Box
					sx={{
						p: 2,
						display: "flex",
						alignItems: "center",
						borderBottom: "1px solid #ddd",
					}}
				>
					<Icon name="pancharm" color="var(--color-card-bg)" />
					<h2 className="ml-2 font-bold uppercase text-[var(--color-card-bg)]">
						Pancharm
					</h2>
				</Box>
				<List sx={{ px: 1 }}>
					{MAIN_MENU.map((item) => {
						if (item.key === "categories") {
							return (
								<React.Fragment key={item.key}>
									<ListItemButton
										onClick={() =>
											setMobileOpenCategories(!mobileOpenCategories)
										}
									>
										<ListItemText
											primary={item.label}
											primaryTypographyProps={{
												fontWeight: 600,
												color: "var(--color-card-bg)",
											}}
										/>
										{mobileOpenCategories ? <ExpandLess /> : <ExpandMore />}
									</ListItemButton>
									<Collapse
										in={mobileOpenCategories}
										timeout="auto"
										unmountOnExit
									>
										<List component="div" disablePadding>
											{categories.length > 0 &&
												categories.map((cat: Category) => (
													<ListItemButton
														key={cat.id}
														component="a"
														href={`/products?categoryId=${cat.id}`}
														sx={{ pl: 4 }}
													>
														<ListItemText
															primary={cat.name}
															sx={{
																color: "var(--color-card-bg)",
															}}
														/>
													</ListItemButton>
												))}
										</List>
									</Collapse>
								</React.Fragment>
							);
						}
						return (
							<ListItem disablePadding key={item.key}>
								<ListItemButton component="a" href={item.href}>
									<ListItemText
										primary={item.label}
										primaryTypographyProps={{
											fontWeight: 600,
											sx: {
												color: "var(--color-card-bg)",
												display: "-webkit-box",
												WebkitLineClamp: 1,
												WebkitBoxOrient: "vertical",
												overflow: "hidden",
												wordBreak: "break-all",
											},
										}}
										noWrap
									/>
								</ListItemButton>
							</ListItem>
						);
					})}
				</List>
			</Drawer>

			<Collapse in={showSearch} className="lg:hidden">
				<Box
					sx={{
						px: 2,
						pb: 2,
						pt: 1,
						backgroundColor: "var(--color-cream-thick)",
						borderBottom: "1px solid rgba(0,0,0,0.05)",
						boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)",
					}}
				>
					<form onSubmit={handleSearchSubmit}>
						<div className="relative flex items-center group">
							<input
								autoFocus
								type="text"
								placeholder="Bạn đang tìm gì hôm nay?"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full h-11 pl-4 pr-12 rounded-2xl border-none outline-none text-sm shadow-sm transition-all focus:shadow-md"
								style={{
									backgroundColor: "#ffffff",
									color: "var(--color-card-bg)",
								}}
							/>
							<IconButton
								type="submit"
								size="small"
								sx={{
									position: "absolute",
									right: 8,
									backgroundColor: "var(--color-card-bg)",
									color: "white",
									"&:hover": {
										backgroundColor: "var(--color-card-bg-hover)",
										opacity: 0.9,
									},
									width: 32,
									height: 32,
								}}
							>
								<SearchIcon sx={{ fontSize: 18 }} />
							</IconButton>
						</div>
					</form>
				</Box>
			</Collapse>
		</div>
	);
};

export default Navbar;
