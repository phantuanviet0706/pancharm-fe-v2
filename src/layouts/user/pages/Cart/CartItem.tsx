import React from "react";
import InputNumber from "../../../../components/InputNumber";
import MoneyDisplay from "../../../../components/MoneyDisplay";
import DeleteIcon from "@mui/icons-material/Delete";
import { CartItemType } from "../../../../utils/cart";

interface CartItemProps {
	item: CartItemType;
	onChangeQty: (productId: number, qty: number) => void;
	onRemove: (productId: number) => void;
}

const CartItem = ({ item, onChangeQty, onRemove }: CartItemProps) => {
	const handleRemoveItem = () => {
		onRemove(item.productId);
	};

	const handleChangeInput = (value: number) => {
		const qty = Number(value) || 1;
		onChangeQty(item.productId, qty);
	};

	return (
		<div
			className="cart-item-container p-3 rounded-xl"
			style={{
				border: "1px solid var(--color-card-bg)",
				textAlign: "left",
			}}
		>
			<div className="cart-item-wrapper flex gap-2 justify-between align-middle">
				<div className="cart-item-img w-[80px] h-[80px]">
					<img className="w-[80px] h-[80px]" src={item?.imgSrc || "/cart/DSC02707.jpeg"} alt="Cart Item" />
				</div>
				<div
					className="cart-item-info"
					style={{
						width: "calc(100% - 120px)",
					}}
				>
					<div>
						<div className="uppercase font-semibold line-clamp-1 overflow-hidden text-ellipsis">
							{item.productName}
						</div>
						<div className="flex gap-4 justify-items-bottom">
							<div className="font-semibold leading-6">
								<MoneyDisplay price={item.unitPrice} />
							</div>
							{/* <div className="flex gap-2 justify-items-center align-middle">
								<div className="text-[14px] leading-6">Số lượng</div>
								<div className="relative top-[2px]">
									<InputNumber
										size="xs"
										onChange={handleChangeInput}
										initial={item.quantity}
									/>
								</div>
							</div> */}
						</div>
						{/* <div className="flex font-semibold align-middle italic">
							<div className="leading-6">Tổng tiền:</div>&nbsp;
							<div className="leading-6">
								<MoneyDisplay price={item.unitPrice * item.quantity} />
							</div>
						</div> */}
					</div>
				</div>
				<div
					className="cart-item-btn relative w-[30px] flex items-center cursor-pointer"
					onClick={handleRemoveItem}
				>
					<DeleteIcon />
				</div>
			</div>
		</div>
	);
};

export default CartItem;
