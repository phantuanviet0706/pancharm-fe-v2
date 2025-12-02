import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FormInput from "../../../../components/FormInput";
import CartItem from "./CartItem";
import { CartItemType, getCart, saveCart } from "../../../../utils/cart";
import { useNavigate } from "react-router-dom";
import { useCartDialog } from "./CartDialogProvider";

const VITE_MESSENGER_URL = import.meta.env.VITE_MESSENGER_URL;
const VITE_PAGE_ID = import.meta.env.VITE_PAGE_ID;

const Cart = () => {
	const [items, setItems] = useState<CartItemType[]>([]);
	const [note, setNote] = useState("");
	const navigate = useNavigate();
	const { closeCart } = useCartDialog();

	useEffect(() => {
		setItems(getCart());
	}, []);

	const syncCart = (next: CartItemType[]) => {
		setItems(next);
		saveCart(next);
	};

	const handleChangeQty = (productId: number, qty: number) => {
		const next = items.map((it) =>
			it.productId === productId ? { ...it, quantity: qty } : it,
		);
		syncCart(next);
	};

	const handleRemove = (productId: number) => {
		const next = items.filter((it) => it.productId !== productId);
		syncCart(next);
	};

	const total = items.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0);
	const isEmpty = items.length === 0;

	const handleCheckout = () => {
		if (!items.length) return;

		// const payloadItems = items.map((it) => ({
		// 	productId: it.productId,
		// 	productName: it.productName,
		// 	quantity: it.quantity,
		// 	unitPrice: it.unitPrice,
		// }));

		// closeCart();
		// navigate("/orders", {
		// 	state: {
		// 		mode: "cart",
		// 		items: payloadItems,
		// 		note,
		// 	},
		// });

		const productNames = items.map((it) => it.productName).join("&");
		window.open(VITE_MESSENGER_URL + `/${VITE_PAGE_ID}?ref=` + encodeURIComponent(productNames), "_blank");
		syncCart([]);
	};

	return (
		<div className="cart-container">
			<div className="cart-detail">
				{isEmpty ? (
					<div className="cart-content flex items-center justify-center h-[300px]">
						<p className="text-center text-[22px] md:text-[26px] font-medium text-[var(--color-header-text,#c66a53)]">
							Giỏ hàng của bạn đang trống
						</p>
					</div>
				) : (
					<div className="cart-content">
						<div className="cart-item thin-scrollbar grid grid-cols-1 gap-4 mb-4 pr-4 h-[280px] overflow-y-auto">
							{items.map((item) => (
								<CartItem
									key={item.productId}
									item={item}
									onChangeQty={handleChangeQty}
									onRemove={handleRemove}
								/>
							))}
						</div>

						<div className="cart-description mb-3">
							<FormInput
								type="textarea"
								name="cart_description"
								label="Ghi chú đơn hàng ..."
								value={note}
								onChange={setNote}
							/>
						</div>

						{/* <div className="flex justify-between mb-3 font-semibold">
							<span>Tổng cộng:</span>
							<span>{total.toLocaleString("vi-VN")} đ</span>
						</div> */}

						<div className="cart-btn">
							<Button
								onClick={handleCheckout}
								sx={{
									backgroundColor: "var(--color-card-bg)",
									"&:hover": {
										backgroundColor: "var(--color-card-bg-hover)",
									},
									height: "2.5em",
									borderRadius: "0px",
									paddingInline: "1em",
								}}
							>
								<div className="flex gap-2 text-[var(--color-cream-bg)]">
									<span className="uppercase font-semibold leading-7">
										{/* Tiến hành thanh toán */}
										Nhận tư vấn
									</span>
									<span className="cart-icon-btn">
										<ShoppingCartIcon />
									</span>
								</div>
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Cart;
