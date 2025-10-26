import React, { useEffect, useMemo, useState } from "react";

export interface FormInputProps {
	label?: string;
	type:
		| "text"
		| "password"
		| "int"
		| "float"
		| "date"
		| "datetime"
		| "checkbox"
		| "radio"
		| "color"
		| "file"
		| "hidden";
	name?: string;
	value?: any;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	onChange?: (value: any) => void;
	className?: string;
	options?: { label: string; value: string | number }[];
	fileMultiple?: boolean;
	accept?: string;
}

const FormInput: React.FC<FormInputProps> = ({
	label,
	type,
	name,
	value,
	placeholder,
	required,
	disabled,
	onChange,
	className = "",
	options,
	fileMultiple = false,
	accept,
}) => {
	/** Base styles */
	const baseStyle =
		"w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 bg-white shadow-sm " +
		"focus:outline-none focus:ring-2 focus:ring-[var(--color-card-bg)] transition " +
		"disabled:bg-gray-100 disabled:cursor-not-allowed";

	/** Pill style giống ảnh: bo tròn full + nền brand + chữ trắng */
	const pillStyle =
		"w-full rounded-full px-5 py-3 bg-[var(--color-card-bg)] text-white " +
		"placeholder-white/80 border border-[color:var(--color-card-bg)] shadow-sm " +
		"focus:outline-none focus:ring-2 focus:ring-white/40 disabled:opacity-60 h-[40px]";

	// ====== Internal states ======
	// Cho text/password: nếu không truyền onChange thì dùng internal state để gõ được
	const [internalValue, setInternalValue] = useState<string>(value ?? "");
	useEffect(() => {
		// Đồng bộ khi prop value thay đổi từ bên ngoài
		setInternalValue(value ?? "");
	}, [value]);

	// Cho number formatting
	const [displayValue, setDisplayValue] = useState<string>(
		value ? formatWithCommas(String(value)) : "",
	);

	const [showPassword, setShowPassword] = useState(false);

	function formatWithCommas(val: string) {
		if (!val) return "";
		const [intPart, decPart] = val.split(".");
		const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return decPart ? `${formattedInt}.${decPart}` : formattedInt;
	}

	function handleNumberInput(e: React.ChangeEvent<HTMLInputElement>) {
		let raw = e.target.value;

		// Cho phép số, dấu chấm, dấu phẩy
		raw = raw.replace(/[^\d.,]/g, "");
		raw = raw.replace(/,/g, ""); // bỏ phẩy cũ trước khi format

		// Nếu có nhiều dấu chấm -> chỉ giữ dấu đầu tiên
		const parts = raw.split(".");
		if (parts.length > 2) {
			raw = parts[0] + "." + parts.slice(1).join("");
		}

		// Format phần nguyên bằng dấu phẩy hàng nghìn
		let [intPart, decPart] = raw.split(".");
		intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

		const formatted = decPart !== undefined ? `${intPart}.${decPart}` : intPart;
		setDisplayValue(formatted);

		const numericValue = parseFloat(raw);
		onChange?.(isNaN(numericValue) ? null : numericValue);
	}

	// Handlers cho text/password: hỗ trợ cả controlled & uncontrolled
	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const v = e.target.value;
		if (onChange) onChange(v);
		else setInternalValue(v);
	};

	const renderInput = () => {
		switch (type) {
			case "int":
			case "float":
				return (
					<input
						type="text"
						inputMode="decimal"
						value={displayValue}
						onChange={handleNumberInput}
						placeholder={placeholder}
						required={required}
						disabled={disabled}
						className={baseStyle}
						id={name}
					/>
				);

			case "text":
				return (
					<div className="relative">
						<input
							type="text"
							id={name}
							value={onChange ? (value ?? "") : internalValue}
							onChange={handleTextChange}
							required={required}
							disabled={disabled}
							placeholder=" "
							className={`${pillStyle} peer placeholder-transparent`}
						/>
						{label && (
							<label
								htmlFor={name}
								className={
									"pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-white/80 " +
									"transition-opacity duration-150 opacity-0 " +
									"peer-placeholder-shown:opacity-100 " +
									"peer-focus:opacity-0"
								}
							>
								{label}
							</label>
						)}
					</div>
				);

			/** PASSWORD -> pill + toggle 👁️, label bên trong tương tự */
			case "password":
				return (
					<div className="relative">
						<input
							type={showPassword ? "text" : "password"}
							id={name}
							value={onChange ? (value ?? "") : internalValue}
							onChange={handleTextChange}
							required={required}
							disabled={disabled}
							placeholder=" "
							className={`${pillStyle} peer placeholder-transparent pr-12`}
							autoComplete="current-password"
						/>

						{label && (
							<label
								htmlFor={name}
								className={
									"pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-white/80 " +
									"transition-opacity duration-150 opacity-0 " +
									"peer-placeholder-shown:opacity-100 " +
									"peer-focus:opacity-0"
								}
							>
								{label}
							</label>
						)}

						<button
							type="button"
							aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
							onClick={() => setShowPassword((s) => !s)}
							className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-white/40 disabled:opacity-50"
							disabled={disabled}
						>
							{showPassword ? (
								<svg viewBox="0 0 24 24" className="w-6 h-6 fill-white/90">
									<path d="M12 6c-5 0-9 4.5-10 6 1 1.5 5 6 10 6s9-4.5 10-6c-1-1.5-5-6-10-6Zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
								</svg>
							) : (
								<svg viewBox="0 0 24 24" className="w-6 h-6 fill-white/90">
									<path d="M3 5.27 4.28 4l16.97 16.97-1.27 1.27-3.04-3.05A12.5 12.5 0 0 1 12 18c-5 0-9-4.5-10-6a20.9 20.9 0 0 1 5.38-4.83L3 5.27Zm7.73 7.73a3 3 0 0 0 4.17 4.17l-4.17-4.17Zm7.87 1.67L7.33 5.4A18.9 18.9 0 0 1 12 6c5 0 9 4.5 10 6-.26.4-1.3 1.63-3.4 2.67Z" />
								</svg>
							)}
						</button>
					</div>
				);

			case "date":
				return (
					<input
						type="date"
						id={name}
						value={value ?? ""}
						onChange={(e) => onChange?.(e.target.value)}
						required={required}
						disabled={disabled}
						className={baseStyle}
					/>
				);

			case "datetime":
				return (
					<input
						type="datetime-local"
						id={name}
						value={value ?? ""}
						onChange={(e) => onChange?.(e.target.value)}
						required={required}
						disabled={disabled}
						className={baseStyle}
					/>
				);

			case "checkbox":
				return (
					<label className="inline-flex items-center gap-2 cursor-pointer">
						<input
							type="checkbox"
							checked={!!value}
							onChange={(e) => onChange?.(e.target.checked)}
							disabled={disabled}
							className="accent-[var(--color-card-bg)] w-5 h-5"
						/>
						<span className="text-gray-800">{label}</span>
					</label>
				);

			case "radio":
				return (
					<div className="flex flex-wrap gap-4">
						{options?.map((opt) => (
							<label
								key={String(opt.value)}
								className={`flex items-center gap-2 cursor-pointer rounded-md border px-3 py-2
                ${
					value === opt.value
						? "border-[var(--color-card-bg)] bg-[color:var(--color-cream-soft)]/40"
						: "border-gray-300"
				}`}
							>
								<input
									type="radio"
									name={name}
									value={String(opt.value)}
									checked={value === opt.value}
									onChange={() => onChange?.(opt.value)}
									disabled={disabled}
									className="accent-[var(--color-card-bg)] w-4 h-4"
								/>
								<span className="text-gray-800">{opt.label}</span>
							</label>
						))}
					</div>
				);

			case "color":
				return (
					<input
						type="color"
						name={name}
						value={value ?? "#000000"}
						onChange={(e) => onChange?.(e.target.value)}
						disabled={disabled}
						className="w-12 h-10 cursor-pointer border border-gray-300 rounded-md"
					/>
				);

			case "file":
				return (
					<FilePicker
						multiple={fileMultiple}
						accept={accept}
						disabled={disabled}
						onChange={(files) =>
							onChange?.(fileMultiple ? files : (files?.[0] ?? null))
						}
					/>
				);

			default:
				return (
					<input
						type="text"
						id={name}
						value={value ?? ""}
						onChange={(e) => onChange?.(e.target.value)}
						placeholder={placeholder}
						required={required}
						disabled={disabled}
						className={baseStyle}
					/>
				);
		}
	};

	/** Với text/password ta đưa label vào trong input, nên ẩn label bên ngoài */
	const showExternalLabel =
		label && type !== "checkbox" && type !== "hidden" && type !== "text" && type !== "password";

	return (
		<div className={`flex flex-col gap-2 mb-4 ${className}`}>
			{showExternalLabel && (
				<label htmlFor={name} className="text-sm font-medium text-gray-700 tracking-wide">
					{label}
					{required && <span className="text-red-500 ml-0.5">*</span>}
				</label>
			)}
			{renderInput()}
		</div>
	);
};

export default FormInput;

/* =========================== FilePicker =========================== */

interface FilePickerProps {
	multiple?: boolean;
	accept?: string;
	disabled?: boolean;
	onChange?: (files: File[] | null) => void;
}

const FilePicker: React.FC<FilePickerProps> = ({ multiple, accept, disabled, onChange }) => {
	const [files, setFiles] = useState<File[]>([]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const sel = Array.from(e.target.files ?? []);
		setFiles(sel);
		onChange?.(sel.length ? sel : null);
	};

	const prettyCount = useMemo(() => {
		if (!files.length) return "Chưa chọn tệp";
		if (files.length === 1) return files[0].name;
		return `${files.length} tệp đã chọn`;
	}, [files]);

	return (
		<div className="w-full">
			<label
				className={`flex items-center justify-between gap-3 border rounded-lg px-3 py-2 bg-white 
        ${disabled ? "border-gray-200 bg-gray-50 cursor-not-allowed" : "border-gray-300"} `}
			>
				<div className="flex items-center gap-3 min-w-0">
					<div className="shrink-0 w-9 h-9 rounded-md bg-[var(--color-card-bg)]/10 flex items-center justify-center">
						<svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--color-card-bg)]">
							<path
								fill="currentColor"
								d="M16.5 6.5L15 5l-7 7l1.5 1.5l7-7M5 18h14v2H5z"
							/>
						</svg>
					</div>
					<div className="truncate text-gray-700">{prettyCount}</div>
				</div>

				<div>
					<span
						className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-semibold
            ${
				disabled
					? "bg-gray-200 text-gray-500"
					: "bg-[var(--color-card-bg)] text-white hover:bg-[var(--color-card-light)]"
			}`}
					>
						Chọn tệp
					</span>
				</div>

				<input
					type="file"
					multiple={multiple}
					accept={accept}
					disabled={disabled}
					onChange={handleChange}
					className="hidden"
				/>
			</label>

			{files.length > 1 && (
				<ul className="mt-2 space-y-1 max-h-40 overflow-auto pr-1">
					{files.map((f, i) => (
						<li key={i} className="flex items-center gap-2 text-sm text-gray-700">
							<span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-card-bg)]" />
							<span className="truncate">{f.name}</span>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
