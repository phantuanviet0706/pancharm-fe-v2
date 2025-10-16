import React from "react";

export interface IframeProps {
	title: string;
	src: string;
	allowFullScreen?: boolean;
	width?: number;
	height?: number;
}

export const Iframe = ({
	title,
	src,
	allowFullScreen = false,
	width = 320,
	height = 150,
}: IframeProps) => {
	return (
		<div className="w-full max-w-[340px] rounded-md bg-[var(--color-cream-soft)]">
			<h3 className="font-semibold mb-2">{title}</h3>
			<iframe
				title="Facebook Fanpage"
				src={
					"https://www.facebook.com/plugins/page.php" +
					"?href=" +
					encodeURIComponent(src) +
					"&tabs=" +
					"&width=" +
					width +
					"&height=" +
					height +
					"&small_header=false" +
					"&adapt_container_width=true" +
					"&hide_cover=false" +
					"&show_facepile=true"
				}
				width={width}
				height={height}
				style={{ border: "none", overflow: "hidden" }}
				scrolling="no"
				frameBorder="0"
				allowFullScreen={allowFullScreen}
				allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
			></iframe>
		</div>
	);
};
