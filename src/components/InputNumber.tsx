import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type Props = {
	min?: number;
	max?: number;
	initial?: number;
	onChange?: (value: number) => void;
	className?: string;
	size?: "sm" | "md" | "lg" | "xs";
};

const SIZES = {
	xs: { h: "h-6", wBtn: "w-6", text: "text-xs" },
	sm: { h: "h-8", wBtn: "w-8", text: "text-sm" },
	md: { h: "h-10", wBtn: "w-10", text: "text-base" },
	lg: { h: "h-12", wBtn: "w-12", text: "text-lg" },
};

const InputNumber: React.FC<Props> = ({
	min = 1,
	max = 99,
	initial = 1,
	onChange,
	className = "",
	size = "md",
}) => {
	const [value, setValue] = useState(Math.min(Math.max(initial, min), max));
	const [tempValue, setTempValue] = useState(value.toString());

	const { h, wBtn, text } = SIZES[size];

	const handleChange = (newValue: number) => {
		const bounded = Math.min(Math.max(newValue, min), max);
		setValue(bounded);
		setTempValue(bounded.toString());
		onChange?.(bounded);
	};

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTempValue(e.target.value);
	};

	const handleBlur = () => {
		const parsed = parseInt(tempValue, 10);
		if (isNaN(parsed)) {
			setTempValue(value.toString());
			return;
		}
		handleChange(parsed);
	};

	const decDisabled = value <= min;
	const incDisabled = value >= max;

	return (
		<div
			className={`inline-flex items-stretch rounded-[5px] overflow-hidden border 
                  ${h} border-[color:var(--color-card-bg)]/60 bg-[var(--color-cream-bg)] ${className}`}
			role="group"
			aria-label="Chọn số lượng"
		>
			{/* Nút trừ */}
			<button
				type="button"
				aria-label="Giảm"
				disabled={decDisabled}
				onClick={() => handleChange(value - 1)}
				className={`${wBtn} ${h} grid place-items-center 
                    transition-colors select-none
                    bg-[var(--color-cream-bg)] text-[var(--color-card-bg)]
                    hover:bg-[color:var(--color-cream-bg)]/80
                    disabled:opacity-40 disabled:pointer-events-none`}
			>
				<RemoveIcon fontSize="inherit" />
			</button>

			{/* Ô nhập số */}
			<input
				type="number"
				value={tempValue}
				onChange={handleInput}
				onBlur={handleBlur}
				onKeyDown={(e) => {
					if (e.key === "Enter") (e.target as HTMLInputElement).blur();
				}}
				min={min}
				max={max}
				className={`px-4 ${h} ${text} text-center font-semibold 
					bg-[var(--color-card-bg)] text-[var(--color-cream-bg)] 
					outline-none border-none w-[4em] 
					[&::-webkit-outer-spin-button]:appearance-none 
					[&::-webkit-inner-spin-button]:appearance-none`}
			/>

			{/* Nút cộng */}
			<button
				type="button"
				aria-label="Tăng"
				disabled={incDisabled}
				onClick={() => handleChange(value + 1)}
				className={`${wBtn} ${h} grid place-items-center 
                    transition-colors select-none
                    bg-[var(--color-cream-bg)] text-[var(--color-card-bg)]
                    hover:bg-[color:var(--color-cream-bg)]/80
                    disabled:opacity-40 disabled:pointer-events-none`}
			>
				<AddIcon fontSize="inherit" />
			</button>
		</div>
	);
};

export default InputNumber;
