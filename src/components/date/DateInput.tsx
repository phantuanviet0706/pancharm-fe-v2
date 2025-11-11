import React, { useEffect, useRef, useState } from "react";

export interface DateInputProps {
	name?: string;
	value?: string | Date | null; // nếu undefined => uncontrolled
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
	if (v === undefined) return undefined; // ⚠️ giữ nguyên undefined để biết uncontrolled
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

	const normalized = normalizeDateValue(value);
	const isControlled = normalized !== undefined; // undefined => uncontrolled

	const [buf, setBuf] = useState<string>(isControlled ? (normalized as string) : "");

	const [focused, setFocused] = useState(false);
	const lastCommittedRef = useRef<string>(isControlled ? (normalized as string) : "");

	useEffect(() => {
		if (!isControlled) return;
		const next = normalizeDateValue(value) as string;
		// chỉ sync khi KHÔNG focus và prop khác với buffer hiện tại
		if (!focused && next !== buf) {
			setBuf(next);
			lastCommittedRef.current = next ?? "";
		}
	}, [isControlled, value, focused, buf]);

	return (
		<div className={`mb-4 ${className ?? ""}`}>
			<div className="relative">
				<input
					type="date"
					name={name}
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
							// invalid => revert lại buffer về giá trị đã commit gần nhất
							setBuf(lastCommittedRef.current);
						}
					}}
					onChange={(e) => {
						const s = e.target.value; // input type="date" luôn là 'YYYY-MM-DD' hoặc ''
						setBuf(s);
						if (isValidDate(s) || s === "") {
							lastCommittedRef.current = s;
							onChange?.(s);
						}
					}}
					inputMode="numeric"
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
