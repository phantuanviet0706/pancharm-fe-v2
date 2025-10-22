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
			className={`flex items-center justify-between gap-4 select-none ${className}`}
			role={onClick ? "button" : undefined}
			onClick={onClick}
		>
			<div className="flex items-center gap-4 min-w-0">
				<div className="relative shrink-0">
					<div className="w-[82px] h-[82px] rounded-[18px] border border-white/45 overflow-hidden p-[5px]">
						<img
							src={imageUrl}
							alt={title}
							className="w-full h-full object-cover rounded-[14px] bg-black"
						/>
					</div>

					<span
						className="
                            absolute -top-2 -right-2 rounded-lg
                            bg-[#8F8F93] text-[var(--color-card-bg)] text-[13px] leading-none
                            px-[9px] py-[6px] border border-white/90 shadow-sm
                        "
					>
						{quantity}
					</span>
				</div>

				<div className="min-w-0 text-[var(--color-card-bg)]">
					<div className="font-medium text-[18px] leading-6 truncate">{title}</div>
					{subTitle && <div className="text-[15px] mt-1 truncate">{subTitle}</div>}
				</div>
			</div>

			<div className="shrink-0 flex items-baseline gap-1">
				<MoneyDisplay price={price}></MoneyDisplay>
			</div>
		</div>
	);
};

export default OrderItem;
