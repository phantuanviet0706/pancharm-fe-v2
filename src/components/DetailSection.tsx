import { Button } from "@mui/material";
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export interface DetailSectionProps {
	collapsedHeight?: number;
	children: React.ReactNode;
	className?: string;
}

const DetailSection = ({ collapsedHeight = 420, children, className }: DetailSectionProps) => {
	const contentRef = useRef<HTMLDivElement | null>(null);
	const [expanded, setExpanded] = useState(false);
	const [height, setHeight] = useState<number>(collapsedHeight);
	const [fullHeight, setFullHeight] = useState<number | null>(null);

	useLayoutEffect(() => {
		const measure = () => {
			if (contentRef.current) setFullHeight(contentRef.current.scrollHeight);
		};
		measure();

		const observer = new ResizeObserver(measure);
		if (contentRef.current) observer.observe(contentRef.current);

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (expanded && fullHeight) setHeight(fullHeight);
		else setHeight(collapsedHeight);
	}, [expanded, fullHeight, collapsedHeight]);
	return (
		<div className={className}>
			<div className="relative">
				<div
					ref={contentRef}
					style={{
						maxHeight: expanded ? `${height}px` : `${collapsedHeight}px`,
						transition: "max-height 0.4s ease-in-out",
					}}
					className="overflow-hidden"
				>
					{children}
				</div>

				{!expanded && (
					<div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--color-cream-soft)] via-[var(--color-cream-soft)]/80 to-transparent" />
				)}
			</div>

			<div className="flex justify-center">
				<Button
					disableRipple
					onClick={() => setExpanded((prev) => !prev)}
					sx={{
						fontWeight: "semibold",
						fontSize: "1.25rem",
						px: "1.25rem",
						height: "2.75rem",
						width: "100%",
						borderRadius: "9999px",
						color: "var(--color-card-bg)",
						textTransform: "none",
						"&:hover": {
							background: "var(--color-cream-soft)",
						},
					}}
				>
					{expanded ? (
						<>
							Thu gọn <ExpandLessIcon />
						</>
					) : (
						<>
							Xem thêm <ExpandMoreIcon />
						</>
					)}
				</Button>
			</div>
		</div>
	);
};

export default DetailSection;
