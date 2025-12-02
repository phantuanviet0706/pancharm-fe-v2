import { Link } from "@mui/material";
import React from "react";

interface CardProps {
	item: any;
	width?: number;
	height?: number;
	path?: string;
}

const Card = ({ item, width = 360, height = 350, path = "#" }: CardProps) => {
	return (
		<div className="relative group overflow-hidden" style={{ width, height }}>
			<Link href={path} className="block h-full w-full">
				<img
					src={item?.src}
					alt="Card item"
					className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
				/>

				<div
					className="absolute left-0 bottom-0 w-full h-1/3 
                        bg-gradient-to-t from-[var(--color-card-bg)] to-transparent 
                        transition-all duration-500 ease-out group-hover:h-full 
                        group-hover:bg-[var(--color-card-bg)]/25 group-hover:from-[var(--color-card-bg)]/25 group-hover:to-[var(--color-card-bg)]/25 grid"
				>
					<div
						className="
                            self-end justify-self-start mb-3
                            transition-all duration-500 ease-out
                            group-hover:place-self-center group-hover:mb-0
                            uppercase text-white font-semibold tracking-wide text-sm
                            text-center px-3 translate-y-0 group-hover:-translate-y-1
                        "
					>
						{item?.name || "BST Vòng đá phong thủy"}
					</div>
				</div>
			</Link>
		</div>
	);
};

export default Card;
