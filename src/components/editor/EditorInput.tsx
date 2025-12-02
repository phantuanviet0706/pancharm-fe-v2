import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface EditorInputProps {
	name?: string;
	value?: string;
	placeholder?: string;
	required?: boolean;
	requiredMessage?: string;
	disabled?: boolean;
	onChange?: (value: string) => void;
	className?: string;
	tabIndex?: number;

	/**
	 * Hàm upload ảnh, trả về URL ảnh sau khi upload xong.
	 * BẮT BUỘC truyền để tránh nhúng base64 gây lag.
	 */
	onUploadImage: (file: File) => Promise<string>;
}

/**
 * Toolbar riêng cho editor – dùng được nhiều instance
 */
const QuillToolbar: React.FC<{ toolbarId: string }> = React.memo(({ toolbarId }) => {
	return (
		<div
			id={toolbarId}
			className="
        flex flex-wrap items-center gap-2 mb-2 px-3 py-2
        rounded-xl bg-[var(--color-cream-soft)]/80
        border border-[var(--color-card-bg)]/10 shadow-sm
      "
		>
			{/* Left group: text styles */}
			<div className="flex items-center gap-1 border-r border-[var(--color-card-bg)]/10 pr-2">
				<button className="ql-bold px-2 py-1 rounded-lg hover:bg-white/70" />
				<button className="ql-italic px-2 py-1 rounded-lg hover:bg-white/70" />
				<button className="ql-underline px-2 py-1 rounded-lg hover:bg-white/70" />
				<button className="ql-strike px-2 py-1 rounded-lg hover:bg-white/70" />
			</div>

			{/* Middle group: list & align */}
			<div className="flex items-center gap-1 border-r border-[var(--color-card-bg)]/10 px-2">
				<button
					className="ql-list px-2 py-1 rounded-lg hover:bg-white/70"
					value="ordered"
				/>
				<button className="ql-list px-2 py-1 rounded-lg hover:bg-white/70" value="bullet" />
				<select className="ql-align px-2 py-1 rounded-lg">
					<option value=""></option>
					<option value="center"></option>
					<option value="right"></option>
					<option value="justify"></option>
				</select>
			</div>

			{/* Right group: link / image / clean */}
			<div className="flex items-center gap-1 pl-2">
				<button className="ql-link px-2 py-1 rounded-lg hover:bg-white/70" />
				<button className="ql-image px-2 py-1 rounded-lg hover:bg-white/70" />
				<button className="ql-clean px-2 py-1 rounded-lg hover:bg-white/70" />
			</div>
		</div>
	);
});
QuillToolbar.displayName = "QuillToolbar";

/**
 * Input editor dùng Quill, có validate required + upload ảnh (chỉ dùng URL, không base64)
 */
const EditorInput: React.FC<EditorInputProps> = ({
	name,
	value = "",
	placeholder,
	required,
	requiredMessage,
	disabled,
	onChange,
	className = "",
	tabIndex,
	onUploadImage,
}) => {
	const toolbarId = useId().replace(/:/g, ""); // tránh ký tự lạ
	const [touched, setTouched] = useState(false);

	const quillRef = useRef<ReactQuill | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	// nếu cha đổi value từ ngoài (edit form), sync lại
	const [internalValue, setInternalValue] = useState<string>(value || "");
	useEffect(() => {
		setInternalValue(value || "");
	}, [value]);

	const handleChange = (content: string) => {
		setInternalValue(content);
		onChange?.(content);
	};

	// Quill onBlur: (range, source, quill)
	const handleBlur = () => {
		if (!touched) setTouched(true);
	};

	const isEmpty = (val: string) => {
		if (!val) return true;
		// Strip tags + &nbsp; để check rỗng
		const tmp = val
			.replace(/<(.|\n)*?>/g, "")
			.replace(/&nbsp;/g, " ")
			.trim();
		return tmp.length === 0;
	};

	const hasError = !!required && touched && isEmpty(internalValue);
	const errorText = hasError && (requiredMessage || "Vui lòng nhập thông tin");

	// Handler cho nút image trên toolbar
	const handleImageClick = useCallback(() => {
		if (disabled) return;
		fileInputRef.current?.click();
	}, [disabled]);

	// Xử lý khi user chọn file ảnh
	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		// clear input để chọn cùng 1 file lần sau vẫn trigger được
		e.target.value = "";

		if (!file) return;

		// Lấy instance quill
		const quill = quillRef.current?.getEditor?.();
		if (!quill) return;

		let imageUrl: string | null = null;

		try {
			// BẮT BUỘC dùng onUploadImage (không fallback base64 nữa)
			imageUrl = await onUploadImage(file);
		} catch (err) {
			console.error("Upload image failed: ", err);
			return;
		}

		if (!imageUrl) return;

		// Insert ảnh vào vị trí hiện tại
		const range = quill.getSelection(true);
		const index = range ? range.index : quill.getLength();

		quill.insertEmbed(index, "image", imageUrl, "user");
		quill.setSelection(index + 1);
	};

	const modules = useMemo(
		() => ({
			toolbar: {
				container: `#${toolbarId}`,
				handlers: {
					image: handleImageClick,
				},
			},
		}),
		[toolbarId, handleImageClick],
	);

	const formats = useMemo(
		() => [
			"bold",
			"italic",
			"underline",
			"strike",
			"list",
			"bullet",
			"align",
			"link",
			"image",
			"clean",
		],
		[],
	);

	return (
		<div className={`flex flex-col gap-2 mb-4 ${className}`}>
			<div className="relative">
				<QuillToolbar toolbarId={toolbarId} />

				{/* Input file ẩn để chọn ảnh */}
				<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					className="hidden"
					onChange={handleFileChange}
				/>

				<ReactQuill
					ref={quillRef}
					theme="snow"
					value={internalValue}
					onChange={handleChange}
					onBlur={handleBlur as any}
					modules={modules}
					formats={formats}
					readOnly={disabled}
					placeholder={placeholder}
					className="
                        pc-quill__root
                        rounded-xl border border-[var(--color-card-bg)]/30
                        bg-[var(--color-cream-bg)]
                    "
					tabIndex={tabIndex}
				/>
			</div>

			{hasError && <p className="mt-1 text-xs text-red-500">{errorText}</p>}
		</div>
	);
};

export default EditorInput;
