import React, { useState, useMemo } from "react";

export interface FormInputProps {
	label?: string;
	type:
		| "text"
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
	const baseStyle =
		"w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 bg-white shadow-sm " +
		"focus:outline-none focus:ring-2 focus:ring-[var(--color-card-bg)] transition " +
		"disabled:bg-gray-100 disabled:cursor-not-allowed";

	const [displayValue, setDisplayValue] = useState<string>(
		value ? formatWithCommas(String(value)) : "",
	);

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

	// Render inputs
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
					/>
				);

			case "text":
				return (
					<input
						type="text"
						value={value ?? ""}
						onChange={(e) => onChange?.(e.target.value)}
						placeholder={placeholder}
						required={required}
						disabled={disabled}
						className={baseStyle}
					/>
				);

			case "date":
				return (
					<input
						type="date"
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

	return (
		<div className={`flex flex-col gap-2 mb-4 ${className}`}>
			{label && type !== "checkbox" && type !== "hidden" && (
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
