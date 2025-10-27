import React from "react";
import InputNumber from "../../../../components/InputNumber";
import MoneyDisplay from "../../../../components/MoneyDisplay";
import DeleteIcon from "@mui/icons-material/Delete";

const CartItem = () => {
	function handleRemoveItem() {
		alert("Done")
	}

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
					<img
						className="w-[80px] h-[80px]"
						src="public/cart/DSC02707.jpeg"
						alt="Cart Item"
					/>
				</div>
				<div
					className="cart-item-info"
					style={{
						width: "calc(100% - 120px)",
					}}
				>
					<div className="">
						<div
							className="uppercase font-semibold line-clamp-1 overflow-hidden 
							text-ellipsis"
						>
							Vòng tay đá phong thủy cao cấp
						</div>
						<div className="flex gap-4 justify-items-center">
							<div className="font-semibold leading-6">
								<MoneyDisplay price={2000000}></MoneyDisplay>
							</div>
							<div className="flex gap-2 justify-items-center align-middle">
								<div className="text-[14px] leading-6">Số lượng</div>
								<div className="relative top-[2px]">
									<InputNumber size="xs"></InputNumber>
								</div>
							</div>
						</div>
						<div className="flex font-semibold align-middle italic">
							<div className="leading-6">Tổng tiền:</div>&nbsp;
							<div className="leading-6">
								<MoneyDisplay price={200000}></MoneyDisplay>
							</div>
						</div>
					</div>
				</div>
				<div
					className="cart-item-btn relative w-[30px] flex items-center cursor-pointer"
					onClick={handleRemoveItem}
				>
					<DeleteIcon></DeleteIcon>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
