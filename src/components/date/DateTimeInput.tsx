import React, { useEffect, useRef, useState } from "react";

export interface DatetimeInputProps {
	name?: string;
	value?: string | Date | null; // 'YYYY-MM-DDTHH:mm' hoặc Date
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

const toLocalDatetime = (d: Date) => {
	// tránh lệch múi giờ khi hiển thị
	const off = d.getTimezoneOffset();
	const local = new Date(d.getTime() - off * 60000);
	return local.toISOString().slice(0, 16);
};

const normalizeDatetimeLocal = (v: any) => {
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

	const [buf, setBuf] = useState<string>(normalizeDatetimeLocal(value));
	const [focused, setFocused] = useState(false);
	const lastCommittedRef = useRef<string>(normalizeDatetimeLocal(value));

	useEffect(() => {
		const next = normalizeDatetimeLocal(value);
		if (!focused && next !== lastCommittedRef.current) {
			setBuf(next);
		}
	}, [value, focused]);

	return (
		<div className={`mb-4 ${className ?? ""}`}>
			<div className="relative">
				<input
					type="datetime-local"
					id={name}
					value={buf}
					min={min}
					max={max}
					onFocus={() => setFocused(true)}
					onBlur={() => {
						setFocused(false);
						if (isFullDateTime(buf)) {
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
						if (isFullDateTime(s)) {
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
