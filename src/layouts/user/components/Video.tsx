import React from "react";

export const Video = ({ src }) => {
	return (
		<div className="relative w-full h-[500px] overflow-hidden">
			<video className="w-full h-full object-cover" autoPlay loop muted playsInline>
				<source src={src} type="video/mp4" />
				Trình duyệt của bạn không hỗ trợ video.
			</video>

			<div className="absolute inset-0 flex items-center justify-center bg-black/30">
				<h1 className="text-white text-4xl font-bold">Bộ sưu tập mới</h1>
			</div>
		</div>
	);
};
