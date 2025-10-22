import React from "react";
import { formatVND } from "../utils/helper";

export interface MoneyDisplayProps {
	price: number;
	className?: string;
}

const MoneyDisplay = ({ price, className }: MoneyDisplayProps) => {
	return (
		<span className={className}>
			<span className="font-normal text-[18px]">{formatVND(price)}</span>
			<span className="text-[18px] relative -top-[1px] ml-1">đ</span>
		</span>
	);
};

export default MoneyDisplay;
