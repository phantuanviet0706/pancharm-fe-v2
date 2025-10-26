import { Button, Link } from "@mui/material";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Cart = () => {
	return (
		<div className="cart-container">
			<div className="cart-detail">
				<div className="cart-title">Giỏ hàng của bạn</div>

				<div className="cart-content">
					<div className="cart-item">
						<div className="cart-item-image"></div>
						<div className="cart-item-info"></div>
						<div className="cart-item-btn"></div>
					</div>

					<div className="cart-description"></div>

					<div className="cart-btn">
						<Button>
							<Link href="/">
								<div className="flex gap-2">
									<span className="uppercase font-semibold">
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
