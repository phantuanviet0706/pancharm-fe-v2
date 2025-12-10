import { Button, IconButton, Link as MUILink } from "@mui/material";
import React, { useState } from "react";
import CartDrawer from "./CartDrawer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link as RouterLink } from "react-router-dom";
import { formatVND } from "../../../utils/helper";

export interface CardItemProps {
	item: Object;
}

const CardItem = ({ item }: CardItemProps) => {
	const [openCart, setOpenCart] = useState(false);

	// const dummyItems = [
	// 	{
	// 		id: 1,
	// 		name: "Gorgon Helios Black Silver",
	// 		variant: "Size 7",
	// 		price: 3750000,
	// 		quantity: 1,
	// 		image: "https://helios.vn/cdn/shop/files/HE-GorgonBlackSilver_1.jpg?v=1695460210",
	// 	},
	// 	{
	// 		id: 2,
	// 		name: "Kim Ngưu Helios Black Silver",
	// 		variant: "Default Title",
	// 		price: 650000,
	// 		quantity: 1,
	// 		image: "https://helios.vn/cdn/shop/files/HE-KimNguu_1.jpg?v=1695451231",
	// 	},
	// ];

	return (
		<div
			className="group w-[280px] mx-3 cursor-pointer border border-[var(--color-text-light)] 
				bg-[var(--color-cream-bg)] hover:bg-[var(--color-card-bg)] transition-all duration-300"
		>
			<MUILink
				component={RouterLink}
				to={"/products/" + item?.id}
				underline="none"
				sx={{
					"&:hover": {
						textDecoration: "none",
					},
				}}
			>
				<div className="w-full h-[280px] overflow-hidden">
					<img className="w-full h-full object-cover object-center" src={item?.src} alt="" />
				</div>
				<div className="p-2 text-center mb-2 text-[var(--color-card-bg)] group-hover:text-[var(--color-cream-bg)] pt-0 mt-2 transition-colors duration-300">
					<div className="p-2 pt-0">
						<p className="text-sm font-semibold uppercase line-clamp-1 overflow-hidden text-ellipsis">
							{item?.name}
						</p>
					</div>
					<div className="flex justify-center px-2">
						<p className="flex text-xl font-bold pl-1 gap-1">
							{formatVND(item?.unitPrice ?? 0)}
							<span className="">đ</span>
						</p>
					</div>
					<div className="pt-2">
						<Button
							variant="contained"
							color="inherit"
							disableElevation
							className="
								btn-add transition-all duration-300
								!bg-[var(--color-card-bg)] !text-[var(--color-cream-bg)]
								group-hover:!bg-[var(--color-cream-bg)] group-hover:!text-[var(--color-card-bg)]
								font-bold uppercase rounded-md h-[2em] px-4"
						>
							<div className="font-[14px]">Mua ngay</div>
						</Button>
					</div>
				</div>
			</MUILink>

			{/* <CartDrawer open={openCart} onClose={() => setOpenCart(false)} items={listItems} /> */}
		</div>
	);
};

export default CardItem;
