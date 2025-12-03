import React from "react";
import DOMPurify from "dompurify";

interface FieldDisplayProps {
	label: string;
	value?: React.ReactNode;
	icon?: React.ReactNode;
	className?: string;
	inline?: boolean;
	isHtml?: boolean;
}

const FieldDisplay: React.FC<FieldDisplayProps> = ({
	label,
	value = "",
	icon = "",
	className = "",
	inline = false,
	isHtml = false,
}) => {
	const labelIconStyle = icon ? "flex gap-3" : "";
	const inlineStyle = inline ? "flex gap-12" : "";

	// Chuẩn hoá value về string khi render HTML
	const rawValue =
		typeof value === "string"
			? value
			: value !== null && value !== undefined
			? value.toString()
			: "";

	const safeHtml = isHtml ? DOMPurify.sanitize(rawValue) : "";

	return (
		<div className={`field-display-container ${className}`}>
			<div className="field-display-wrapper">
				<div className={`display-field ${inlineStyle}`}>
					<div className={`field-label mb-2 w-[12vw] items-start ${labelIconStyle}`}>
						{icon && <div className="label-icon w-[20px] h-[20px]">{icon}</div>}
						<div className="label-content uppercase font-semibold text-[13px] leading-[20px]">
							{label}
						</div>
					</div>

					{/* Value */}
					{isHtml ? (
						<div
							className="field-value leading-[20px]"
							style={{ width: "calc(100% - 12vw)" }}
							dangerouslySetInnerHTML={{ __html: safeHtml }}
						/>
					) : (
						<div
							className="field-value leading-[20px]"
							title={rawValue}
							style={{ width: "calc(100% - 12vw)" }}
						>
							{value}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default FieldDisplay;
