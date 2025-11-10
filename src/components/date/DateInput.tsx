import React, { useEffect, useRef, useState } from "react";

export interface DateInputProps {
	name?: string;
	value?: string | Date | null;
	onChange?: (v: string) => void; // '' khi clear
	required?: boolean;
	disabled?: boolean;
	placeholder?: string;
	className?: string;
	isRounded?: boolean;
	tabIndex?: number;
	min?: string; // 'YYYY-MM-DD'
	max?: string; // 'YYYY-MM-DD'
}

const isFullDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);
const isValidDate = (s: string) => {
	if (!isFullDate(s)) return false;
	const [y, m, d] = s.split("-").map(Number);
	const dt = new Date(y, m - 1, d);
	return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
};
const normalizeDateValue = (v: any) => {
	if (!v) return "";
	if (v instanceof Date && !isNaN(v.getTime())) return v.toISOString().slice(0, 10);
	const s = String(v);
	return isFullDate(s) ? s : "";
};

const DateInput: React.FC<DateInputProps> = ({
	name,
	value,
	onChange,
	required,
	disabled,
	placeholder,
	className = "",
	isRounded = false,
	tabIndex,
	min,
	max,
}) => {
	const pillStyle =
		`w-full ${isRounded ? "rounded-full" : "rounded-lg"} px-5 h-[40px] bg-[var(--color-cream-soft)] text-[var(--color-card-bg)] ` +
		"placeholder-[var(--color-card-bg)]/90 border border-[color:var(--color-card-bg)] shadow-sm " +
		"focus:outline-none focus:ring-2 focus:ring-white/40 disabled:opacity-60 " +
		"focus:bg-[var(--color-card-bg)] focus:placeholder-[var(--color-cream-bg)] focus:text-white";

	const [buf, setBuf] = useState<string>(normalizeDateValue(value));
	const [focused, setFocused] = useState(false);
	const lastCommittedRef = useRef<string>(normalizeDateValue(value));

	// Sync prop -> buffer khi không focus
	useEffect(() => {
		const next = normalizeDateValue(value);
		if (!focused && next !== lastCommittedRef.current) {
			setBuf(next);
		}
	}, [value, focused]);

	return (
		<div className={`mb-4 ${className ?? ""}`}>
			<div className="relative">
				<input
					type="date"
					id={name}
					value={buf}
					min={min}
					max={max}
					onFocus={() => setFocused(true)}
					onBlur={() => {
						setFocused(false);
						if (isValidDate(buf)) {
							lastCommittedRef.current = buf;
							onChange?.(buf);
						} else if (!buf) {
							lastCommittedRef.current = "";
							onChange?.("");
						} else {
							// không commit giá trị invalid, revert lại
							setBuf(lastCommittedRef.current);
						}
					}}
					onChange={(e) => {
						const s = e.target.value;
						setBuf(s);
						if (isValidDate(s)) {
							lastCommittedRef.current = s;
							onChange?.(s);
						}
					}}
					inputMode="numeric"
					pattern="\d{4}-\d{2}-\d{2}"
					required={required}
					disabled={disabled}
					placeholder={placeholder}
					autoComplete="off"
					className={`${pillStyle} [color-scheme:dark]`}
					tabIndex={tabIndex}
				/>
			</div>
		</div>
	);
};

export default DateInput;
