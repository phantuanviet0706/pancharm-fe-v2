import React, { useEffect, useRef, useState } from "react";

export interface DatetimeInputProps {
	name?: string;
	value?: string | Date | null; // 'YYYY-MM-DDTHH:mm' hoặc Date; undefined => uncontrolled
	onChange?: (v: string) => void; // '' khi clear
	required?: boolean;
	disabled?: boolean;
	placeholder?: string;
	className?: string;
	isRounded?: boolean;
	tabIndex?: number;
	min?: string; // 'YYYY-MM-DDTHH:mm'
	max?: string; // 'YYYY-MM-DDTHH:mm'
}

const isFullDateTime = (s: string) => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(s);

const isValidDateTime = (s: string) => {
	if (!isFullDateTime(s)) return false;
	const [datePart, timePart] = s.split("T");
	const [y, m, d] = datePart.split("-").map(Number);
	const [hh, mm] = timePart.split(":").map(Number);
	const dt = new Date(y, m - 1, d, hh, mm, 0, 0);
	return (
		dt.getFullYear() === y &&
		dt.getMonth() === m - 1 &&
		dt.getDate() === d &&
		dt.getHours() === hh &&
		dt.getMinutes() === mm
	);
};

// Tránh lệch múi giờ khi hiển thị input datetime-local
const toLocalDatetime = (d: Date) => {
	const off = d.getTimezoneOffset();
	const local = new Date(d.getTime() - off * 60000);
	return local.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:mm'
};

const normalizeDatetimeLocal = (v: any) => {
	if (v === undefined) return undefined; // để phân biệt uncontrolled
	if (!v) return "";
	if (v instanceof Date && !isNaN(v.getTime())) return toLocalDatetime(v);
	const s = String(v);
	return isFullDateTime(s) ? s : "";
};

const DatetimeInput: React.FC<DatetimeInputProps> = ({
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

	const normalized = normalizeDatetimeLocal(value);
	const isControlled = normalized !== undefined;

	const [buf, setBuf] = useState<string>(isControlled ? (normalized as string) : "");
	const [focused, setFocused] = useState(false);
	const lastCommittedRef = useRef<string>(isControlled ? (normalized as string) : "");

	// Chỉ sync từ prop khi controlled & không focus & prop thật sự đổi
	useEffect(() => {
		if (!isControlled) return;
		const next = normalizeDatetimeLocal(value) as string;
		if (!focused && next !== buf) {
			setBuf(next);
			lastCommittedRef.current = next ?? "";
		}
	}, [isControlled, value, focused, buf]);

	return (
		<div className={`mb-4 ${className ?? ""}`}>
			<div className="relative">
				<input
					type="datetime-local"
					name={name}
					id={name}
					value={buf}
					min={min}
					max={max}
					onFocus={() => setFocused(true)}
					onBlur={() => {
						setFocused(false);
						if (isValidDateTime(buf)) {
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
						const s = e.target.value; // luôn 'YYYY-MM-DDTHH:mm' hoặc ''
						setBuf(s);
						if (isValidDateTime(s) || s === "") {
							lastCommittedRef.current = s;
							onChange?.(s);
						}
					}}
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

export default DatetimeInput;
