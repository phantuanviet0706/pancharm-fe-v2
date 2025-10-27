import { Button, Dialog, Link } from "@mui/material";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FormInput from "../../../../components/FormInput";
import CartItem from "./CartItem";

const Cart = () => {
	return (
		<div className="cart-container">
			<div className="cart-detail">
				<div className="cart-content">
					<div
						className="cart-item thin-scrollbar grid grid-cols-1 gap-4 mb-4 pr-4 
							h-[300px] overflow-y-auto"
					>
						{[1, 1, 1, 1].map((item) => (
							<CartItem></CartItem>
						))}
					</div>

					<div className="cart-description">
						<FormInput
							type="textarea"
							name="cart_description"
							label="Ghi chú đơn hàng ..."
						></FormInput>
					</div>

					<div className="cart-btn">
						<Button
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
							<Link
								href="orders"
								underline="none"
								sx={{
									color: "var(--color-cream-bg)",
									"&:hover": {
										color: "var(--color-cream-bg-hover)",
									},
								}}
							>
								<div className="flex gap-2">
									<span className="uppercase font-semibold leading-7">
										Tiến hành thanh toán
									</span>
									<span className="cart-icon-btn">
										<ShoppingCartIcon />
									</span>
								</div>
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
