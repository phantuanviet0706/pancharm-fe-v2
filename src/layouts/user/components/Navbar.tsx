import React, { useState } from "react";
import { Avatar, Box, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Icon from "./Icon";
import SideBar from "./SideBar";

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

const Navbar = () => {
	const [openMenu, setOpenMenu] = useState(false);

	return (
		<div className="sticky top-0 z-[1000] bg-white">
			<div className="hidden lg:flex justify-between px-5 h-[35px] border-b font-normal text-base bg-yellow-500">
				{HEADER_ITEMS.map((item, idx) => (
					<div key={idx} className={item.className + " top-1.5"}>
						<div
							className={
								"flex items-center gap-1 " + (item.icon_right ? "icon-right" : "")
							}
						>
							<div className="item-icons">{item.icon}</div>
							{item.href ? (
								<a href={item.href} className="flex items-center text-black">
									<span className="item-title">{item.title}:</span>&nbsp;
									<span className="item-content text-sm">{item.content}</span>
								</a>
							) : (
								<span className="flex items-center text-black">
									<span className="item-title">{item.title}:</span>&nbsp;
									<span className="item-content text-sm">{item.content}</span>
								</span>
							)}
						</div>
					</div>
				))}
			</div>

			<Box component="nav" aria-label="Main navigation">
				<div className="relative flex items-center justify-between px-4 md:px-5 h-[64px] md:h-[70px] border-b">
					<div className="flex items-center gap-6">
						<div className="flex items-center">
							<button
								onClick={() => setOpenMenu(true)}
								className="flex items-center cursor-pointer"
								aria-label="Open menu"
							>
								<div className="flex justify-center cursor-pointer">
									<MenuIcon />
									<div className="ml-2"></div>
									Menu
								</div>
							</button>
						</div>
					</div>

					<div
						className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2"
						onClick={() => {
							window.location.href = "/";
						}}
					>
						<div className="logo-icon w-7 h-7 md:w-8 md:h-8 flex items-center justify-center">
							<Icon name="pancharm" />
						</div>
						<h1 className="cursor-pointer text-lg md:text-4xl text-primary leading-none uppercase">
							Pancharm
						</h1>
					</div>

					<div className="flex items-center gap-1 md:gap-4 ml-auto">
						<IconButton aria-label="Search">
							<SearchIcon />
						</IconButton>
						<IconButton aria-label="Cart">
							<ShoppingCartIcon className="text-gray-700" sx={{ fontSize: 28 }} />
						</IconButton>

						<div className="hidden lg:block">
							{false ? (
								<Button className="flex items-center gap-2">
									<Avatar
										sx={{ width: 29, height: 29 }}
										src="https://cdn.pixabay.com/photo/2015/05/15/09/28/head-723540_640.jpg"
									/>
									<span className="font-semibold hidden lg:block">Josh</span>
								</Button>
							) : (
								<Button variant="contained">Login</Button>
							)}
						</div>
					</div>
				</div>
			</Box>

			<SideBar open={openMenu} onClose={() => setOpenMenu(false)} />
		</div>
	);
};

export default Navbar;
