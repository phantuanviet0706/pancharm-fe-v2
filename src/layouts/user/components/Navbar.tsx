import React, { useEffect, useRef, useState } from "react";
import { Avatar, Box, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Icon from "../../../components/Icon";
import SideBar from "./SideBar";
import UserNav from "../../../components/UserNav";

const HEADER_ITEMS = [
	{
		title: "Hotline",
		className: "phone-contact relative",
		icon: <PhoneIcon />,
		content: "097.151.6201",
		href: "tel:0971516201",
	},
	{
		title: "Email",
		className: "email-contact absolute left-3/7",
		icon: <EmailIcon />,
		content: "vietphan565@gmail.com",
		href: "mailto:vietphan565@gmail.com",
	},
	{
		title: "Address",
		className: "address-contact relative",
		icon: <LocationOnIcon />,
		content: "47 Nguyen Tuan, Thanh Xuan, Ha Noi",
		icon_right: true,
	},
];

const MAIN_MENU = [
	{ key: "bracelets", label: "VÒNG TAY", href: "/vong-tay" },
	{ key: "gifts", label: "QUÀ TẶNG", href: "/qua-tang" },
	{ key: "dien-da", label: "DIÊN ĐÁ", href: "/dien-da" },
	{ key: "dien-ngoc", label: "DIÊN NGỌC", href: "/dien-ngoc" },
	{ key: "thien-vi", label: "THIÊN VI", href: "/thien-vi" },
	{ key: "tra-an", label: "TRẢ ÂN", href: "/tra-an" },
];

const PROFILE_SETTINGS = [
	{
		key: "profile",
		label: "Profile",
		href: "/profile",
	},
	{
		key: "change-password",
		label: "Đổi mật khẩu",
		href: "/change-password",
	},
	{
		key: "orders",
		label: "Đặt Order",
		href: "/orders",
	},
	{
		key: "wishlist",
		label: "Danh sách yêu thích",
		href: "/wishlist",
	},
];

const Navbar: React.FC<{ activeKey?: string }> = ({ activeKey = "gifts" }) => {
	const [openProfile, setOpenProfile] = useState(false);
	const profileRef = useRef<HTMLDivElement | null>(null);

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

	const suffix = location.pathname.split("/").filter(Boolean).pop();
	PROFILE_SETTINGS.forEach((item) => {
		if (item.key != suffix) return;
		item.active = true;
	});

	return (
		<div className="sticky top-0 z-[1000] bg-[var(--color-cream-thick)]">
			<div className="hidden lg:flex justify-between px-5 h-[30px] border-b font-normal text-base bg-[var(--color-card-bg)]">
				{HEADER_ITEMS.map((item, idx) => (
					<div key={idx} className={item.className + " top-0.5"}>
						<div
							className={
								"flex items-center gap-1 " + (item.icon_right ? "icon-right" : "")
							}
						>
							<div className="item-icons">{item.icon}</div>
							{item.href ? (
								<a
									href={item.href}
									className="flex items-center text-[var(--color-cream-bg)]"
								>
									<span className="item-title text-sm">{item.title}:</span>
									<span className="text-sm">&nbsp;</span>
									<span className="item-content text-sm">{item.content}</span>
								</a>
							) : (
								<span className="flex items-center text-[var(--color-cream-bg)]">
									<span className="item-title text-sm">{item.title}:</span>
									<span className="text-sm">&nbsp;</span>
									<span className="item-content text-sm">{item.content}</span>
								</span>
							)}
						</div>
					</div>
				))}
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
							<Icon name="pancharm" />
						</div>
						<h1 className="cursor-pointer text-lg md:text-2xl text-[var(--color-card-bg)] leading-none uppercase">
							Pancharm
						</h1>
					</div>

					{/* Mid Nav */}
					<nav className="hidden md:flex items-center gap-2">
						{MAIN_MENU.map((it) => {
							const active = it.key === activeKey;
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

						<IconButton sx={{ color: "var(--color-card-bg)" }} aria-label="Giỏ hàng">
							<ShoppingCartIcon />
						</IconButton>

						<div className="relative" ref={profileRef}>
							<IconButton
								sx={{ color: "var(--color-card-bg)" }}
								aria-label="Tài khoản"
								aria-expanded={openProfile}
								onClick={() => setOpenProfile((v) => !v)}
							>
								<Avatar
									sx={{ width: 32, height: 32 }}
									src="https://cdn.pixabay.com/photo/2015/05/15/09/28/head-723540_640.jpg"
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
					</div>
				</div>
			</Box>
		</div>
	);
};

export default Navbar;
