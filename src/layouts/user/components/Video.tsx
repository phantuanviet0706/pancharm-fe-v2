import React, { Children } from "react";

interface VideoProps {
	src: string;
	title?: string;
	children?: React.ReactNode;
}

export const Video = ({ src, title = "", children }: VideoProps) => {
	return (
		<div className="relative w-full h-[75vh] overflow-hidden">
			{children}
			<video className="w-screen h-[80vh] object-cover" autoPlay loop muted playsInline>
				<source src={src} type="video/mp4" />
				Trình duyệt của bạn không hỗ trợ video.
			</video>
		</div>
	);
};
