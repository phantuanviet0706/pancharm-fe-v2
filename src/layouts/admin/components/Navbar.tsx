import React, { useState } from "react";

import navigation from "../../../menu-item";
import NavGroup from "./NavGroup";
import Icon from "../../../components/Icon";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";

const Navbar = () => {
	const [main, setMain] = useState({});
	const [item, setItem] = useState({});

	let content = "";

	return (
		<div className="nav-container">
			<Link to="/">
				<div className="nav-header flex gap-2 p-[20px] px-[30px] align-center">
					<div className="header-icon">
						<Icon name="pancharm" className="w-[32px] h-[32px]"></Icon>
					</div>
					<div className="header-title text-[24px] leading-[32px]">
						<span className="title uppercase font-semibold text-[var(--color-card-bg)]">
							Pancharm
						</span>
					</div>
				</div>
			</Link>
			<div className="nav-body pt-[10px]">
				{navigation.items.map((item) => (
					<div key={item.id}>
						<NavGroup item={item} />
					</div>
				))}
			</div>
			<div className="nav-footer px-[30px]">
				<div className="footer-container">
					<div className="footer-content">
						<div className="font-semibold text-[15px]">Cần hỗ trợ?</div>
						<div className="text-[13px]">
							Nếu bạn gặp vấn đề gì, xin hãy vui lòng liên hệ với chúng tôi!
						</div>
					</div>
					<div className="footer-redirect mt-[10px] pb-[30px]">
						<Box
							component="a"
							className="hover:bg-[var(--color-cream-soft)]"
							href="https://facebook.com/phan.tsuki.1"
							sx={{
								backgroundColor: "var(--color-card-soft)",
								color: "var(--color-cream-soft)",
								border: "1px solid var(--color-card-weak)",
								width: "12rem",
								height: "2rem",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								borderRadius: "5px",
								"&:hover": {
									backgroundColor: "var(--color-card-soft-hover)",
									color: "var(--color-cream-soft-hover)",
								},
							}}
						>
							Hỗ trợ
						</Box>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
