import React from "react";

export interface ProgressBarProps {
	quantity: number;
	max: number;
	width?: number | string;
	height?: number | string;
	progressOnly?: boolean;
}

const ProgressBar = ({
	quantity,
	max,
	width = 180,
	height = 15,
	progressOnly = false,
}: ProgressBarProps) => {
	const toCss = (v: any) => (typeof v === "number" ? `${v}px` : v);

	const pct = max > 0 ? Math.max(0, Math.min(100, (quantity / max) * 100)) : 0;

	return (
		<div
			style={{ width: toCss(width) }}
			aria-label="progress"
			role="progressbar"
			aria-valuemin={0}
			aria-valuemax={max > 0 ? max : 0}
			aria-valuenow={Math.round((pct * (max || 100)) / 100)}
			title={`${Math.round(pct)}%`}
		>
			<style>{`
        @keyframes barberpole {
          from { background-position: 0 0; }
          to   { background-position: 40px 0; }
        }
      `}</style>

			<div
				style={{
					height: toCss(height),
					background: "rgba(0,0,0,0.08)",
					borderRadius: typeof height === "number" ? `${Number(height) / 2}px` : "9999px",
					overflow: "hidden",
					boxShadow: "inset 0 1px 3px rgba(0,0,0,0.08)",
				}}
			>
				<div
					style={{
						width: `${pct}%`,
						height: "100%",
						background: "linear-gradient(90deg, #22c55e 0%, #16a34a 60%, #15803d 100%)",
						backgroundImage:
							"repeating-linear-gradient(45deg, rgba(255,255,255,.2) 0 10px, transparent 10px 20px), linear-gradient(90deg,#22c55e,#16a34a,#15803d)",
						backgroundSize: "40px 40px, 100% 100%",
						animation: "barberpole 3s linear infinite",
						borderRadius: "inherit",
						transition: "width .25s ease",
					}}
				/>
			</div>

			{!progressOnly && (
				<div
					style={{
						marginTop: 6,
						fontSize: 12,
						color: "rgba(0,0,0,0.7)",
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<span>
						{Number.isFinite(quantity) ? quantity : 0} / {max || 0}
					</span>
					<span>{Math.round(pct)}%</span>
				</div>
			)}
		</div>
	);
};

export default ProgressBar;
