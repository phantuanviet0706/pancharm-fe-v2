import { Button, IconButton, Link as MUILink } from "@mui/material";
import React, { useState } from "react";
import CartDrawer from "./CartDrawer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link as RouterLink } from "react-router-dom";

export interface CardItemProps {
	item: Object;
}

const CardItem = ({ item }: CardItemProps) => {
	const [openCart, setOpenCart] = useState(false);

	const dummyItems = [
		{
			id: 1,
			name: "Gorgon Helios Black Silver",
			variant: "Size 7",
			price: 3750000,
			quantity: 1,
			image: "https://helios.vn/cdn/shop/files/HE-GorgonBlackSilver_1.jpg?v=1695460210",
		},
		{
			id: 2,
			name: "Kim Ngưu Helios Black Silver",
			variant: "Default Title",
			price: 650000,
			quantity: 1,
			image: "https://helios.vn/cdn/shop/files/HE-KimNguu_1.jpg?v=1695451231",
		},
	];

	return (
		<div className="w-[280px] mx-3 cursor-pointer border-[1px]-[var(--color-text-light)] rounded-xl bg-[var(--color-card-bg)]">
			<MUILink
				component={RouterLink}
				to="detail"
				underline="none"
				sx={{
					"&:hover": {
						textDecoration: "none",
					},
				}}
			>
				<div className="w-full h-[280px] object-cover object-top p-2">
					<img
						className="rounded-xl"
						src="https://helios.vn/cdn/shop/files/ontario-lotus-helios-black-silver_3_1296x.jpg?v=1754845293"
						alt=""
					/>
				</div>
				<div className="p-2 text-center mb-2 text-[var(--color-cream-bg)] pt-0">
					<div className="p-2 pt-0">
						<p className="text-sm font-semibold uppercase">
							Vòng tay thiên vi lắc bạc ngọc bích xanh
						</p>
					</div>
					<div className="flex justify-between p-2">
						<p className="flex text-xl font-bold pl-1">
							1,000,000
							<span className="">đ</span>
						</p>
						<Button
							fullWidth
							sx={{
								backgroundColor: "var(--color-cream-bg)",
								color: "var(--color-card-bg)",
								"&:hover": {
									backgroundColor: "var(--color-cream-light)",
									color: "var(--color-card-light)",
								},
								fontWeight: "bold",
								textTransform: "uppercase",
								width: "100px",
								height: "30px",
								borderRadius: "20px",
							}}
						>
							Mua ngay
						</Button>
					</div>
				</div>
			</MUILink>

			<CartDrawer open={openCart} onClose={() => setOpenCart(false)} items={dummyItems} />
		</div>
	);
};

export default CardItem;
