import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
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
		| "editor"
		| "autocomplete";
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

	// Autocomplete
	autocompleteOptions?: any[];
	onSearch?: (keyword: string) => void;
	loading?: boolean;
	optionValueKey?: string; // default "id"
	optionLabelKey?: string; // default "name"
	getOptionLabel?: (o: any) => string;
	isOptionEqualToValue?: (o: any, v: any) => boolean;
	valueAs?: "id" | "object"; // default "id"
	freeSolo?: boolean;
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

	// ---- Autocomplete props ----
	autocompleteOptions = [],
	onSearch,
	loading,
	optionValueKey = "id",
	optionLabelKey = "name",
	getOptionLabel,
	isOptionEqualToValue,
	valueAs = "id",
	freeSolo = false,
}) => {
	// ====== Styles ======
	const pillStyle =
		`w-full ${isRounded ? "rounded-full" : "rounded-lg"} px-5 h-[40px] bg-[var(--color-cream-soft)] text-[var(--color-card-bg)] ` +
		"placeholder-[var(--color-card-bg)]/100 border border-[color:var(--color-card-bg)] shadow-sm " +
		"focus:outline-none focus:ring-2 focus:ring-white/40 disabled:opacity-60 " +
		"focus:bg-[var(--color-card-bg)] focus:placeholder-[var(--color-cream-bg)] focus:text-white";

	// ====== Text/password fallback ======
	const [internalValue, setInternalValue] = useState<string>(value ?? "");
	useEffect(() => {
		setInternalValue(value ?? "");
	}, [value]);

	// ====== Number formatting (int/float) ======
	const [displayValue, setDisplayValue] = useState<string>(
		value === 0 || value ? formatWithCommas(String(value)) : "",
	);

	useEffect(() => {
		if (type === "int" || type === "float") {
			const raw = value === 0 || value ? String(value) : "";
			setDisplayValue(formatWithCommas(raw));
		}
	}, [value, type]);

	function formatWithCommas(val: string) {
		if (!val) return "";
		const [intPartRaw, decPart] = val.split(".");
		const intPart = (intPartRaw || "").replace(/\D/g, "");
		const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt;
	}

	function handleNumberInput(e: React.ChangeEvent<HTMLInputElement>, allowDecimal: boolean) {
		let raw = e.target.value;

		// Giữ lại số, dấu chấm, dấu phẩy
		raw = raw.replace(/[^\d.,]/g, "");
		raw = raw.replace(/,/g, "");

		if (!allowDecimal) {
			raw = raw.replace(/[.]/g, "");
		} else {
			const parts = raw.split(".");
			if (parts.length > 2) raw = parts[0] + "." + parts.slice(1).join("");
		}

		let [intPart, decPart] = raw.split(".");
		intPart = (intPart || "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		const formatted = decPart !== undefined ? `${intPart}.${decPart}` : intPart;

		setDisplayValue(formatted || "");

		// --- PATCHED: Không ép về "0" khi rỗng ---
		const numericValue = allowDecimal ? parseFloat(raw) : parseInt(raw, 10); /* PATCHED */
		onChange?.(raw === "" || Number.isNaN(numericValue) ? null : numericValue); /* PATCHED */
	}

	// ====== Password toggle ======
	const [showPassword, setShowPassword] = useState(false);

	// ====== Floating label ======
	const renderFloatingLabel = () =>
		label ? (
			<label
				htmlFor={name}
				className={
					"pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[var(--color-card-bg)]/100 " +
					"transition-opacity duration-150 opacity-0 " +
					"peer-placeholder-shown:opacity-100 " +
					"peer-focus:opacity-0 focus:text-[var(--color-cream-bg)]"
				}
			>
				{label}
			</label>
		) : null;

	// ====== Date / Datetime helpers (NEW) ======
	const isFullDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);
	const isFullDateTime = (s: string) => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(s);
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
	const toLocalDatetime = (d: Date) => {
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

	// ====== Date buffers ======
	const [dateBuf, setDateBuf] = useState<string>(
		type === "date" ? normalizeDateValue(value) : "",
	);
	const [dateFocused, setDateFocused] = useState(false);
	const lastCommittedDateRef = useRef<string>(normalizeDateValue(value));

	useEffect(() => {
		if (type !== "date") return;
		// chỉ sync khi không focus và props thực sự khác giá trị đã commit
		const next = normalizeDateValue(value);
		if (!dateFocused && next !== lastCommittedDateRef.current) {
			setDateBuf(next);
		}
	}, [type, value, dateFocused]);

	// ====== Datetime-local buffers ======
	const [dtBuf, setDtBuf] = useState<string>(
		type === "datetime" ? normalizeDatetimeLocal(value) : "",
	);
	const [dtFocused, setDtFocused] = useState(false);
	const lastCommittedDtRef = useRef<string>(normalizeDatetimeLocal(value));

	useEffect(() => {
		if (type !== "datetime") return;
		const next = normalizeDatetimeLocal(value);
		if (!dtFocused && next !== lastCommittedDtRef.current) {
			setDtBuf(next);
		}
	}, [type, value, dtFocused]);

	// ====== Render inputs ======
	const renderInput = () => {
		switch (type) {
			case "int":
				return (
					<div className="relative">
						<input
							type="text"
							inputMode="numeric"
							value={displayValue}
							onChange={(e) => handleNumberInput(e, false)}
							placeholder={label}
							required={required}
							disabled={disabled}
							className={`${pillStyle} peer placeholder-transparent`}
							id={name}
						/>
						{renderFloatingLabel()}
					</div>
				);

			case "float":
				return (
					<div className="relative">
						<input
							type="text"
							inputMode="decimal"
							value={displayValue}
							onChange={(e) => handleNumberInput(e, true)}
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
							onChange={(e) =>
								onChange
									? onChange(e.target.value)
									: setInternalValue(e.target.value)
							}
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
							onChange={(e) =>
								onChange
									? onChange(e.target.value)
									: setInternalValue(e.target.value)
							}
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
							value={dateBuf}
							onFocus={() => setDateFocused(true)}
							onBlur={() => {
								setDateFocused(false);
								// Chỉ emit khi đầy đủ & hợp lệ; nếu không thì KHÔNG đụng state phía trên
								if (isValidDate(dateBuf)) onChange?.(dateBuf);
								else if (!dateBuf) onChange?.(""); // cho phép xoá sạch
							}}
							onChange={(e) => {
								const s = e.target.value; // có thể là rỗng trong lúc gõ
								setDateBuf(s); // luôn update buffer để không bị reset
								// Emit ngay khi đủ chuẩn & hợp lệ để parent nhận được kịp thời
								if (isValidDate(s)) onChange?.(s);
							}}
							inputMode="numeric"
							pattern="\d{4}-\d{2}-\d{2}"
							required={required}
							disabled={disabled}
							placeholder={label}
							autoComplete="off"
							className={`${pillStyle} peer placeholder-transparent [color-scheme:dark]`}
						/>
						{renderFloatingLabel()}
					</div>
				);

			case "datetime":
				return (
					<div className="relative">
						<input
							type="datetime-local"
							id={name}
							value={dtBuf}
							onFocus={() => setDtFocused(true)}
							onBlur={() => {
								setDtFocused(false);
								if (isFullDateTime(dtBuf)) onChange?.(dtBuf);
								else if (!dtBuf) onChange?.("");
							}}
							onChange={(e) => {
								const s = e.target.value;
								setDtBuf(s);
								if (isFullDateTime(s)) onChange?.(s);
							}}
							required={required}
							disabled={disabled}
							placeholder={label}
							autoComplete="off"
							className={`${pillStyle} peer placeholder-transparent [color-scheme:dark]`}
						/>
						{renderFloatingLabel()}
					</div>
				);

			case "checkbox":
				return (
					<label className="inline-flex items-center gap-2 cursor-pointer">
						<input
							type="checkbox"
							checked={!!value}
							onChange={(e) => onChange?.(e.target.checked)}
							className="accent-[var(--color-card-bg)] w-5 h-5"
							name={name}
							disabled={disabled}
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
                ${value === opt.value ? "border-[var(--color-card-bg)] bg-[color:var(--color-cream-soft)]/40" : "border-gray-300"}`}
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
								<span className="text-gray-800">
									{(opt as any).label ?? opt.name}
								</span>
							</label>
						))}
					</div>
				);

			case "color":
				return (
					<input
						type="color"
						name={name}
						// --- PATCHED: Không gán mặc định nếu chưa có ---
						{...(value ? { value } : {})} /* PATCHED */
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
						value={value}
						onChange={(files) =>
							onChange?.(
								fileMultiple
									? files
									: Array.isArray(files)
										? (files[0] ?? null)
										: files,
							)
						}
					/>
				);

			case "select":
				return (
					<div className="select-opts">
						<div className="opts-wrapper">
							{options?.map((item) => (
								<div key={String(item.value)} className="opts-item mb-2">
									<label
										className={`flex items-center gap-2 cursor-pointer border px-3 py-2
                    ${value === item.value ? "border-[var(--color-card-bg)] bg-[color:var(--color-cream-soft)]/40" : "border-gray-300"}`}
									>
										<input
											type="radio"
											name={name}
											value={String(item.value)}
											checked={value === item.value}
											onChange={() => onChange?.(item.value)}
											disabled={disabled}
											className="accent-[var(--color-card-bg)] w-4 h-4"
										/>
										<span className="text-gray-800">{item.name}</span>
									</label>
								</div>
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
							onChange={(e) =>
								onChange
									? onChange(e.target.value)
									: setInternalValue(e.target.value)
							}
							required={required}
							disabled={disabled}
							placeholder={label}
							rows={4}
							className={`w-full min-h-[120px] rounded-md border border-[var(--color-card-bg)] bg-[var(--color-cream-bg)] text-[var(--color-card-bg)] px-4 py-3 outline-none placeholder:text-[var(--color-card-bg)]/60 focus:border-[var(--color-card-bg)] focus:ring-0 resize-none`}
						/>
					</div>
				);

			case "editor": {
				const toolbarOptions = [
					["bold", "italic", "underline", "strike"],
					["blockquote", "code-block"],
					["link", "image", "video", "formula"],
					[{ header: 1 }, { header: 2 }],
					[{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
					[{ script: "sub" }, { script: "super" }],
					[{ indent: "-1" }, { indent: "+1" }],
					[{ direction: "rtl" }],
					[{ size: ["small", false, "large", "huge"] }],
					[{ header: [1, 2, 3, 4, 5, 6, false] }],
					[{ color: [] }, { background: [] }],
					[{ font: [] }],
					[{ align: [] }],
					["clean"],
				];
				const module = { toolbar: toolbarOptions };
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
			}

			case "autocomplete": {
				// 1) Bảo đảm options là array
				const safeOptions = Array.isArray(autocompleteOptions) ? autocompleteOptions : [];

				// 2) Value hiện tại: chấp nhận id hoặc object
				const currentValue =
					typeof value === "object" && value !== null
						? value
						: (safeOptions.find((o: any) => o?.[optionValueKey] === value) ?? null);

				// 3) Lấy nhãn an toàn (fallback nhiều key)
				const labelOf = (o: any) => {
					if (getOptionLabel) return getOptionLabel(o);
					if (typeof o === "string") return o;
					if (!o || typeof o !== "object") return "";
					const lbl = o?.[optionLabelKey] ?? o?.name ?? o?.title ?? o?.label ?? ""; // fallback
					return String(lbl ?? "");
				};

				// 4) So sánh option = value (cover cả id primitive)
				const equals = (o: any, v: any) =>
					isOptionEqualToValue
						? isOptionEqualToValue(o, v)
						: (o?.[optionValueKey] ?? o) === (v?.[optionValueKey] ?? v);

				return (
					<Autocomplete
						disablePortal={false}
						freeSolo={freeSolo}
						options={safeOptions}
						value={currentValue}
						filterOptions={(x) => x}
						onChange={(_, newVal: any) => {
							if (!onChange) return;
							if (!newVal) return onChange(null);
							onChange(valueAs === "object" ? newVal : newVal?.[optionValueKey]);
						}}
						onInputChange={(_, inputVal, reason) => {
							if (reason === "input" && onSearch) onSearch(inputVal);
						}}
						loading={!!loading}
						getOptionLabel={(o) => labelOf(o)}
						isOptionEqualToValue={equals}
						noOptionsText={loading ? "Đang tải..." : "Không có dữ liệu"}
						slotProps={{
							popper: { sx: { zIndex: 1700 } }, // MUI v5+
							paper: { elevation: 4, sx: { maxHeight: 320 } }, // optional
						}}
						// componentsProps={{
						//   popper: { style: { zIndex: 1700 } },
						//   paper:  { elevation: 4, sx: { maxHeight: 320 } },
						// }}

						renderInput={(params) => (
							<TextField
								{...params}
								label={label}
								placeholder={placeholder}
								required={required}
								disabled={disabled}
								variant="outlined"
								size="medium"
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: "0.5rem",
										background: "var(--color-bg-cream)",
									},
									"& .MuiInputLabel-root": { color: "var(--color-card-bg)" },
									mt: 0.5,
									"& .MuiAutocomplete-endAdornment svg": { color: "#5a4a42" },
									"& input": {
										fontFamily: "inherit",
										fontSize: "0.95rem",
										color: "#3b2f29",
									},
								}}
							/>
						)}
					/>
				);
			}

			default:
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

	const showExternalLabel = true;

	return (
		<div className={`flex flex-col gap-2 mb-4 ${className}`}>
			{showExternalLabel && (
				<label
					htmlFor={name}
					className="text-sm font-medium text-[var(--color-card-bg)] tracking-wide"
				>
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
interface RemoteFile {
	url: string;
	name?: string;
}

type FilePickerValue = null | string | RemoteFile | Array<string | RemoteFile> | File | File[];

interface FilePickerProps {
	multiple?: boolean;
	accept?: string;
	disabled?: boolean;
	value?: FilePickerValue;
	onChange?: (v: File[] | File | RemoteFile[] | RemoteFile | null) => void;
}

const isRemote = (v: any): v is RemoteFile =>
	!!v && typeof v === "object" && typeof v.url === "string";
const toRemote = (v: any): RemoteFile | null => {
	if (!v) return null;
	if (typeof v === "string") return { url: v };
	if (isRemote(v)) return v;
	return null;
};

const FilePicker: React.FC<FilePickerProps> = ({ multiple, accept, disabled, value, onChange }) => {
	// Hai nguồn hiển thị: remote (URL có sẵn) và local (File vừa chọn)
	const [remoteFiles, setRemoteFiles] = useState<RemoteFile[]>([]);
	const [localFiles, setLocalFiles] = useState<File[]>([]);

	// index của file ưu tiên trong danh sách đang hiển thị
	const [primaryIndex, setPrimaryIndex] = useState<number | null>(null);

	// Đồng bộ từ prop value vào state hiển thị
	useEffect(() => {
		setPrimaryIndex(null);

		if (value instanceof File) {
			setLocalFiles([value]);
			setRemoteFiles([]);
			setPrimaryIndex(0);
			return;
		}
		if (Array.isArray(value) && value.length > 0 && value[0] instanceof File) {
			setLocalFiles(value as File[]);
			setRemoteFiles([]);
			setPrimaryIndex(0);
			return;
		}

		// Còn lại coi như remote (URL/object) hoặc null
		const arr = Array.isArray(value) ? value : value ? [value] : [];
		const remotes = arr.map((v) => toRemote(v)).filter(Boolean) as RemoteFile[];

		setRemoteFiles(remotes);
		setLocalFiles([]); // remote hiển thị thì clear local
		if (remotes.length) setPrimaryIndex(0);
	}, [value]);

	const inputId = useMemo(() => `fp-${Math.random().toString(36).slice(2)}`, []);

	// Phát dữ liệu ra ngoài theo API cũ, nhưng đưa file ưu tiên lên đầu mảng
	const emitChange = () => {
		if (!multiple) {
			if (localFiles.length) onChange?.(localFiles[0]);
			else if (remoteFiles.length) onChange?.(remoteFiles[0]);
			else onChange?.(null);
			return;
		}

		if (localFiles.length) {
			let out = [...localFiles];
			if (primaryIndex != null && out[primaryIndex]) {
				const [pri] = out.splice(primaryIndex, 1);
				out = [pri, ...out];
			}
			onChange?.(out);
			return;
		}

		if (remoteFiles.length) {
			let out = [...remoteFiles];
			if (primaryIndex != null && out[primaryIndex]) {
				const [pri] = out.splice(primaryIndex, 1);
				out = [pri, ...out];
			}
			onChange?.(out);
			return;
		}

		onChange?.(null);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files ?? []);
		if (!files.length) return;

		if (multiple) {
			setLocalFiles(files);
			setRemoteFiles([]);
			setPrimaryIndex(files.length ? 0 : null);
			onChange?.(files); // phát ngay để parent có data
		} else {
			const f = files[0];
			setLocalFiles([f]);
			setRemoteFiles([]);
			setPrimaryIndex(0);
			onChange?.(f);
		}
		e.currentTarget.value = ""; // cho phép chọn lại cùng tên
	};

	const clearAll = () => {
		setLocalFiles([]);
		setRemoteFiles([]);
		setPrimaryIndex(null);
		onChange?.(null);
	};

	const showingLocal = localFiles.length > 0;
	const total = showingLocal ? localFiles.length : remoteFiles.length;

	const makePrimary = (idx: number) => {
		setPrimaryIndex(idx);
		emitChange();
	};
	const unsetPrimary = () => {
		setPrimaryIndex(null);
		emitChange();
	};

	const removeAt = (idx: number) => {
		if (showingLocal) {
			const next = localFiles.filter((_, i) => i !== idx);
			setLocalFiles(next);
			if (primaryIndex != null) {
				if (idx === primaryIndex) setPrimaryIndex(null);
				else if (idx < primaryIndex) setPrimaryIndex(primaryIndex - 1);
			}
		} else {
			const next = remoteFiles.filter((_, i) => i !== idx);
			setRemoteFiles(next);
			if (primaryIndex != null) {
				if (idx === primaryIndex) setPrimaryIndex(null);
				else if (idx < primaryIndex) setPrimaryIndex(primaryIndex - 1);
			}
		}
		setTimeout(emitChange, 0);
	};

	const looksLikeImage = (urlOrName?: string) =>
		!!urlOrName && /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(urlOrName);

	const prettyMain = useMemo(() => {
		if (localFiles.length)
			return localFiles.length === 1
				? localFiles[0].name
				: `${localFiles.length} tệp đã chọn`;
		if (remoteFiles.length)
			return remoteFiles.length === 1
				? (remoteFiles[0].name ?? remoteFiles[0].url.split("/").pop() ?? "Tệp hiện có")
				: `${remoteFiles.length} tệp hiện có`;
		return "Chưa chọn tệp";
	}, [localFiles, remoteFiles]);

	return (
		<div className="w-full">
			<label
				htmlFor={inputId}
				className={`flex items-center justify-between gap-3 border rounded-lg px-3 py-2 bg-white 
        ${disabled ? "border-gray-200 bg-gray-50 cursor-not-allowed" : "border-gray-300 cursor-pointer"} `}
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
					<div className="truncate text-gray-700">{prettyMain}</div>
				</div>

				<div className="flex items-center gap-2">
					{localFiles.length || remoteFiles.length ? (
						<button
							type="button"
							onClick={(e) => {
								e.preventDefault();
								if (!disabled) clearAll();
							}}
							className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-semibold
                ${disabled ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
							disabled={disabled}
						>
							Xoá hết
						</button>
					) : null}
					<span
						className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-semibold
              ${disabled ? "bg-gray-200 text-gray-500" : "bg-[var(--color-card-bg)] text-white hover:bg-[var(--color-card-light)]"}`}
					>
						Chọn
					</span>
				</div>

				<input
					id={inputId}
					type="file"
					multiple={multiple}
					accept={accept}
					disabled={disabled}
					onChange={handleInputChange}
					className="hidden"
				/>
			</label>

			{(localFiles.length > 0 || remoteFiles.length > 0) && (
				<ul className="mt-2 space-y-2 max-h-64 overflow-auto pr-1">
					{(showingLocal ? localFiles : remoteFiles).map((item, idx) => {
						const label = showingLocal
							? (item as File).name
							: ((item as RemoteFile).name ??
								(item as RemoteFile).url.split("/").pop() ??
								"Tệp");
						const url = showingLocal ? "" : (item as RemoteFile).url;
						const isImg = showingLocal
							? looksLikeImage((item as File).name)
							: looksLikeImage(url);
						const isPrimary = primaryIndex === idx;
						const hasPrimary = primaryIndex != null;

						return (
							<li
								key={`${showingLocal ? "local" : "remote"}-${idx}`}
								className="flex items-center gap-3 border rounded-md p-2"
							>
								{/* thumb */}
								<div className="w-12 h-12 shrink-0 rounded bg-gray-50 border flex items-center justify-center overflow-hidden">
									{isImg && url ? (
										<img
											src={url}
											alt={label}
											className="w-full h-full object-cover"
										/>
									) : (
										<svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-500">
											<path
												fill="currentColor"
												d="M14 2H6a2 2 0 0 0-2 2v16l4-4h10a2 2 0 0 0 2-2V8z"
											/>
										</svg>
									)}
								</div>

								{/* label + link */}
								<div className="flex-1 min-w-0">
									<div className="font-medium text-gray-800 truncate">
										{label}
										{isPrimary && (
											<span className="ml-2 inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-300">
												Ưu tiên
											</span>
										)}
									</div>
									{!showingLocal && url && (
										<a
											href={url}
											target="_blank"
											rel="noreferrer"
											className="text-xs underline text-gray-600 truncate"
											title={url}
										>
											Mở liên kết
										</a>
									)}
								</div>

								{/* actions */}
								<div className="flex items-center gap-2">
									{isPrimary ? (
										<button
											type="button"
											onClick={() => {
												unsetPrimary();
											}}
											disabled={disabled}
											className={`text-sm px-3 py-1.5 rounded-md border
                        ${
							disabled
								? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
								: "bg-yellow-50 text-yellow-800 border-yellow-200 hover:bg-yellow-100"
						}`}
										>
											Bỏ chọn
										</button>
									) : (
										<button
											type="button"
											onClick={() => {
												makePrimary(idx);
											}}
											disabled={disabled || primaryIndex != null}
											title={
												primaryIndex != null
													? "Đã có tệp ưu tiên"
													: "Đặt làm ưu tiên"
											}
											className={`text-sm px-3 py-1.5 rounded-md border
                        ${
							disabled || primaryIndex != null
								? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
								: "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
						}`}
										>
											Chọn làm mặc định
										</button>
									)}

									<button
										type="button"
										onClick={() => removeAt(idx)}
										disabled={disabled}
										className={`text-sm px-3 py-1.5 rounded-md
                      ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-red-50 text-red-700 hover:bg-red-100"}`}
									>
										Xoá
									</button>
								</div>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};
