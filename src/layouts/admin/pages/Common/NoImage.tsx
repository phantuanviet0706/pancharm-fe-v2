import React from "react";
import Icon from "../../../../components/Icon";

interface NoImageProps {
    content?: string;
}

const NoImage = ({content}: NoImageProps) => {
	return (
		<div
			className="
                w-full h-[40rem] ml-[1em]
                flex flex-col items-center justify-center 
                border border-gray-300/70 rounded-xl
                bg-gray-50 text-gray-500
            "
		>
			<Icon name="noImage" size={64} className="mb-4" />
			<span className="text-sm">
                {content || "Không có hình ảnh để hiển thị"}
            </span>
		</div>
	);
};

export default NoImage;
