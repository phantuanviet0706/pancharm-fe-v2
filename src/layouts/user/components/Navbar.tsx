import React, { useContext, useEffect, useRef, useState } from "react";
import {
	Avatar,
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	Link,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Icon from "../../../components/Icon";
import SideBar from "./SideBar";
import UserNav from "../../../components/UserNav";
import Cart from "../pages/Cart/Cart";
import { useMe } from "../../../hooks/useMe";
import { User } from "../../../api/userService";
import { href } from "react-router-dom";
import { logout } from "../../../api/authService";
import { ConfigContext } from "../../../contexts/ConfigProvider";
import { useCartDialog } from "../pages/Cart/CartDialogProvider";
import { getCookie } from "../../../utils/auth";
import { Category } from "../../../api/categoryService";

const MAIN_MENU = [
	{ key: "collections", label: "Bộ Sưu Tập", href: "/collections" },
	{ key: "categories", label: "Trang sức" },
	{ key: "products", label: "Sản phẩm", href: "/products" },
	// { key: "gifts", label: "Quà tặng", href: "/gifts" },
	// { key: "others", label: "Phụ kiện phong thủy", href: "/others" },
];

const CATEGORY_OPTIONS = [
	{ label: "Vòng tay nam", href: "/categories/bracelet-men" },
	{ label: "Vòng tay nữ", href: "/categories/bracelet-women" },
	{ label: "Dây chuyền", href: "/categories/necklace" },
	{ label: "Nhẫn", href: "/categories/ring" },
];

const PROFILE_SETTINGS = [
	{
		key: "admin",
		label: "Đi đến trang quản trị",
		href: "/admin",
	},
	// {
	// 	key: "profile",
	// 	label: "Profile",
	// 	href: "/profile",
	// },
	{
		key: "change-password",
		label: "Đổi mật khẩu",
		href: "/change-password",
	},
	// {
	// 	key: "orders",
	// 	label: "Đặt Order",
	// 	href: "/orders",
	// },
	// {
	// 	key: "wishlist",
	// 	label: "Danh sách yêu thích",
	// 	href: "/wishlist",
	// },
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
	const profileRef = useRef<HTMLDivElement | null>(null);

	const { openCart } = useCartDialog();

	const [openCategories, setOpenCategories] = useState(false);
	const categoriesRef = useRef<HTMLDivElement | null>(null);

	let userProfileHtml = (
		<>
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
						href="login"
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
		</>
	);

	const token = getCookie("ACCESS_TOKEN");
	if (token) {
		const { me, setMe } = useMe();
		userProfileHtml = (
			<div className="relative" ref={profileRef}>
				<IconButton
					sx={{ color: "var(--color-card-bg)" }}
					aria-label="Tài khoản"
					aria-expanded={openProfile}
					onClick={() => setOpenProfile((v) => !v)}
				>
					<Avatar
						sx={{ width: 32, height: 32 }}
						src={me?.avatar || "/default-avatar.png"}
					/>
				</IconButton>

				{openProfile && (
					<div
						role="menu"
						className="absolute right-0 mt-3 w-48 overflow-hidden rounded-xl shadow-xl"
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
		};
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpenCategories(false);
		};
		document.addEventListener("mousedown", onDocClick);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("mousedown", onDocClick);
			document.removeEventListener("keydown", onKey);
		};
	}, []);

	useEffect(() => {
		const onClick = (e: MouseEvent) => {
			if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
				setOpenProfile(false);
			}
		};
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpenProfile(false);
		};
		document.addEventListener("mousedown", onClick);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("mousedown", onClick);
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
		<div className="sticky top-0 z-[1000] bg-[var(--color-cream-thick)] mb-0">
			<div className="hidden lg:flex justify-between px-5 h-[30px] border-b font-normal text-base bg-[var(--color-card-bg)]">
				{/* {HEADER_ITEMS.map(
					(item, idx) =>
						item.display && (
							<div key={idx} className={item.className + " top-0.5 w-[33%]"}>
								<div
									className={
										"flex items-center gap-1 " +
										(item.icon_right ? "icon-right" : "")
									}
								>
									<div className="item-icons">{item.icon}</div>
									{item.href ? (
										<a
											href={item.href}
											className="flex items-center text-[var(--color-cream-bg)]"
										>
											<span className="item-title text-sm">
												{item.title}:
											</span>
											<span className="text-sm">&nbsp;</span>
											<span className="item-content text-sm line-clamp-1 overflow-hidden text-ellipsis">
												{item.content}
											</span>
										</a>
									) : (
										<span className="flex items-center text-[var(--color-cream-bg)]">
											<span className="item-title text-sm w-[10em]">
												{item.title}:
											</span>
											<span className="text-sm">&nbsp;</span>
											<span className="item-content text-sm line-clamp-1 overflow-hidden text-ellipsis">
												{item.content}
											</span>
										</span>
									)}
								</div>
							</div>
						),
				)} */}
			</div>

			<Box component="nav" aria-label="Main navigation">
				<div className="relative flex items-center justify-between px-4 md:px-5 h-[64px] md:h-[70px] border-b">
					{/* Left Nav */}
					<div
						className="flex items-center gap-2"
						onClick={() => {
							window.location.href = "/";
						}}
					>
						<div className="logo-icon w-7 h-7 md:w-10 md:h-10 flex items-center justify-center">
							<Icon name="pancharm" color="var(--color-card-bg)" />
						</div>
						<h1 className="cursor-pointer text-lg md:text-2xl text-[var(--color-card-bg)] leading-none uppercase">
							Pancharm
						</h1>
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
												className="absolute left-full -translate-x-1/2 mt-2 w-48 rounded-2xl shadow-xl overflow-hidden"
												style={{ backgroundColor: "var(--color-card-bg)" }}
											>
												<ul className="py-2">
													{categories.map((op: Category, idx: number) => (
														<li key={idx}>
															<a
																role="menuitem"
																href={`/products?categoryId=${op.id}`}
																className="block px-4 py-2 text-sm text-[var(--color-cream-bg)] hover:bg-[color:var(--color-cream-soft)]/15"
																onClick={() =>
																	setOpenCategories(false)
																}
															>
																{op.name}
															</a>
														</li>
													))}
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
						<IconButton sx={{ color: "var(--color-card-bg)" }} aria-label="Tìm kiếm">
							<SearchIcon />
						</IconButton>

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
		</div>
	);
};

export default Navbar;
