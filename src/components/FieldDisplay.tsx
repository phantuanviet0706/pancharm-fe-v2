import React from "react";

interface FieldDisplayProps {
	label: string;
	value?: React.ReactNode;
	icon?: React.ReactNode;
	className?: string;
	inline?: boolean;
}

const FieldDisplay = ({
	label,
	value = "",
	icon = "",
	className,
	inline = false,
}: FieldDisplayProps) => {
	const labelIconStyle = icon ? "flex gap-3" : "";
	const inlineStyle = inline ? "flex gap-12" : "";

	return (
		<div className="field-display-container">
			<div className="field-display-wrapper">
				<div className={`display-field ${inlineStyle}`}>
					<div className={`field-label mb-2 w-[12vw] items-start ${labelIconStyle}`}>
						{icon && <div className="label-icon w-[20px] h-[20px]">{icon}</div>}
						<div className="label-content uppercase font-semibold text-[13px] leading-[20px]">
							{label}
						</div>
					</div>
					<div
						className="field-value leading-[20px]"
						title={value?.toString()}
						style={{
							width: "calc(100% - 12vw)",
						}}
					>
						{value}
					</div>
				</div>
			</div>
		</div>
	);
};

export default FieldDisplay;
