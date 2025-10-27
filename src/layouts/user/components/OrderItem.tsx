// OrderItem.tsx
import React from "react";
import { formatVND } from "../../../utils/helper";
import MoneyDisplay from "../../../components/MoneyDisplay";

type OrderItemProps = {
	imageUrl: string;
	title: string;
	subTitle?: string;
	quantity: number;
	price: number;
	className?: string;
	onClick?: () => void;
};

const OrderItem: React.FC<OrderItemProps> = ({
	imageUrl,
	title,
	subTitle,
	quantity,
	price,
	className = "",
	onClick,
}) => {
	return (
		<div
			className={`flex items-center justify-between gap-4 select-none w-[100%] ${className}`}
			role={onClick ? "button" : undefined}
			onClick={onClick}
		>
			<div className="flex items-center gap-4">
				<div className="relative shrink-0">
					<div className="w-[82px] h-[82px] border border-white/45 overflow-hidden">
						<img
							src={imageUrl}
							alt={title}
							className="w-full h-full object-cover bg-black"
						/>
					</div>
				</div>

				<div className="">
					<div
						className="item-title font-semibold text-[18px] leading-4.5 line-clamp-1 overflow-hidden 
							text-ellipsis hover:cursor-help"
						title={title}
					>
						{title}
					</div>
					<div className="item-price font-semibold text-[20px]">
						<MoneyDisplay price={price}></MoneyDisplay>
					</div>
					<div className="item-quantity text-[12px]">Số lượng: {quantity}</div>
				</div>
			</div>
		</div>
	);
};

export default OrderItem;
