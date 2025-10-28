import React, { useEffect, useMemo, useState } from "react";
import ReactQuill from "react-quill";

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
		| "hidden"
		| "select"
		| "textarea"
		| "editor";
	name?: string;
	value?: any;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	onChange?: (value: any) => void;
	className?: string;
	options?: { id: string; name: string; value?: string | number; checked?: boolean }[];
	fileMultiple?: boolean;
	accept?: string;
	isRounded?: boolean;
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
	isRounded = false,
}) => {
	/** Base styles (fallback) */
	const baseStyle =
		"w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 bg-white shadow-sm " +
		"focus:outline-none focus:ring-2 focus:ring-[var(--color-card-bg)] transition " +
		"disabled:bg-gray-100 disabled:cursor-not-allowed ";

	const pillStyle =
		`w-full ${isRounded ? "rounded-full" : ""} px-5 h-[40px] bg-[var(--color-cream-soft)] text-[var(--color-card-bg)] ` +
		"placeholder-[var(--color-card-bg)]/100 border border-[color:var(--color-card-bg)] shadow-sm " +
		"focus:outline-none focus:ring-2 focus:ring-white/40 disabled:opacity-60 " +
		"focus:bg-[var(--color-card-bg)] focus:placeholder-[var(--color-cream-bg)] focus:text-white";

	// ====== Internal states ======
	// Cho text/password: nếu không truyền onChange thì dùng internal state để gõ được
	const [internalValue, setInternalValue] = useState<string>(value ?? "");
	useEffect(() => {
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
		raw = raw.replace(/,/g, ""); // bỏ phẩy cũ

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

	// Handlers cho text/password
	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const v = e.target.value;
		if (onChange) onChange(v);
		else setInternalValue(v);
	};

	const renderFloatingLabel = () =>
		label ? (
			<label
				htmlFor={name}
				className={
					"pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[var(--color-card-bg)]/100 " +
					"transition-opacity duration-150 opacity-0 " +
					"peer-placeholder-shown:opacity-100 " +
					"peer-focus:opacity-0 focus:text[var(--color-cream-bg)]"
				}
			>
				{label}
			</label>
		) : null;

	const renderInput = () => {
		switch (type) {
			case "int":
			case "float":
				return (
					<div className="relative">
						<input
							type="text"
							inputMode="decimal"
							value={displayValue}
							onChange={handleNumberInput}
							placeholder={label}
							required={required}
							disabled={disabled}
							className={`${pillStyle} peer placeholder-transparent`}
							id={name}
						/>
						{renderFloatingLabel()}
					</div>
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
							placeholder={label}
							className={`${pillStyle} peer placeholder-transparent`}
						/>
						{renderFloatingLabel()}
					</div>
				);

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
						{renderFloatingLabel()}

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
					<div className="relative">
						<input
							type="date"
							id={name}
							value={value ?? ""}
							onChange={(e) => onChange?.(e.target.value)}
							required={required}
							disabled={disabled}
							placeholder={label}
							className={`${pillStyle} peer placeholder-transparent [color-scheme:dark]`}
						/>
						{renderFloatingLabel()}
					</div>
				);

			case "datetime":
				const [internalDateTime, setInternalDateTime] = useState(value ?? "");

				useEffect(() => {
					if (value !== undefined && value !== internalDateTime) {
						setInternalDateTime(value);
					}
				}, [value]);

				return (
					<div className="relative">
						<input
							type="datetime-local"
							id={name}
							value={internalDateTime}
							onChange={(e) => {
								const newVal = e.target.value;
								setInternalDateTime(newVal);
								onChange?.(newVal);
							}}
							required={required}
							disabled={disabled}
							placeholder={label}
							className={`${pillStyle} peer placeholder-transparent [color-scheme:dark]`}
						/>
						{renderFloatingLabel()}
					</div>
				);

			case "checkbox":
				const [checked, setChecked] = useState(false);

				return (
					<label className="inline-flex items-center gap-2 cursor-pointer">
						<input
							type="checkbox"
							checked={checked}
							onChange={(e) => setChecked(e.target.checked)}
							className="accent-[var(--color-card-bg)] w-5 h-5"
							name={name}
						/>
						<span className="text-[var(--color-card-bg)]">{label}</span>
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

			case "select":
				return (
					<div className="select-opts">
						<div className="opts-wrapper">
							{options?.map((item) => (
								<>
									<div className="opts-item mb-2">
										<label
											key={String(item.value)}
											className={`flex items-center gap-2 cursor-pointer border px-3 py-2
											${
												value === item.value
													? "border-[var(--color-card-bg)] bg-[color:var(--color-cream-soft)]/40"
													: "border-gray-300"
											}`}
										>
											<input
												type="radio"
												name={name}
												value={String(item.value)}
												checked={item?.checked}
												onChange={() => onChange?.(item.value)}
												disabled={disabled}
												className="accent-[var(--color-card-bg)] w-4 h-4"
											></input>
											<span className="text-gray-800">{item.name}</span>
										</label>
									</div>
								</>
							))}
						</div>
					</div>
				);

			case "textarea":
				return (
					<div className="relative">
						<textarea
							id={name}
							value={onChange ? (value ?? "") : internalValue}
							onChange={handleTextChange}
							required={required}
							disabled={disabled}
							placeholder={label}
							rows={4} // đủ cao như ảnh
							className={`w-full min-h-[120px] rounded-md border border-[var(--color-card-bg)] bg-[var(--color-cream-bg)] text-[var(--color-card-bg)] px-4 py-3 outline-none placeholder:text-[var(--color-card-bg)]/60 focus:border-[var(--color-card-bg)] focus:ring-0 resize-none`}
						/>
					</div>
				);

			case "editor":
				const toolbarOptions = [
					["bold", "italic", "underline", "strike"], // toggled buttons
					["blockquote", "code-block"],
					["link", "image", "video", "formula"],

					[{ header: 1 }, { header: 2 }], // custom button values
					[{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
					[{ script: "sub" }, { script: "super" }], // superscript/subscript
					[{ indent: "-1" }, { indent: "+1" }], // outdent/indent
					[{ direction: "rtl" }], // text direction

					[{ size: ["small", false, "large", "huge"] }], // custom dropdown
					[{ header: [1, 2, 3, 4, 5, 6, false] }],

					[{ color: [] }, { background: [] }], // dropdown with defaults from theme
					[{ font: [] }],
					[{ align: [] }],

					["clean"], // remove formatting button
				];
				const module = {
					toolbar: toolbarOptions,
				};

				return (
					<div className="relative">
						<ReactQuill
							modules={module}
							theme="snow"
							value={value || ""}
							onChange={onChange}
							placeholder={placeholder}
							className="pc-quill__root"
						/>
					</div>
				);

			default:
				// fallback: cũng dùng pill style cho đồng bộ layout
				return (
					<div className="relative">
						<input
							type="text"
							id={name}
							value={value ?? ""}
							onChange={(e) => onChange?.(e.target.value)}
							placeholder=" "
							required={required}
							disabled={disabled}
							className={`${pillStyle} peer placeholder-transparent`}
						/>
						{renderFloatingLabel()}
					</div>
				);
		}
	};

	/** Với text/password/int/float/date/datetime dùng label nổi bên trong input => ẩn label ngoài */
	const showExternalLabel =
		label &&
		type !== "checkbox" &&
		type !== "hidden" &&
		type !== "text" &&
		type !== "password" &&
		type !== "int" &&
		type !== "float" &&
		type !== "date" &&
		type !== "datetime" &&
		type !== "select" &&
		type !== "textarea";

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
