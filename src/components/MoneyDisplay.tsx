import React from "react";
import { formatVND } from "../utils/helper";

export interface MoneyDisplayProps {
	price: number;
	className?: string;
}

const MoneyDisplay = ({ price, className }: MoneyDisplayProps) => {
	return (
		<span className={className} >
			<span>{formatVND(price)}</span>
			<span className="relative -top-[0px] ml-1">đ</span>
		</span>
	);
};

export default MoneyDisplay;
