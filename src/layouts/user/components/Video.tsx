import React, { Children } from "react";

interface VideoProps {
	src: string;
	title?: string;
	children?: React.ReactNode;
}

export const Video = ({ src, title = "", children }: VideoProps) => {
	return (
		<div className="w-full flex justify-center">
			<div className="relative w-full h-[100vh] aspect-[3/2] overflow-hidden">
				{/* overlay content */}
				<div className="absolute inset-0 z-10">{children}</div>

				<video
					className="absolute inset-0 w-full h-full object-cover"
					autoPlay
					loop
					muted
					playsInline
				>
					<source src={src} type="video/mp4" />
				</video>
			</div>
		</div>
	);
};
