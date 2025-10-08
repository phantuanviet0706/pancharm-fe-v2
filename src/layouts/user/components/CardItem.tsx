import { Button } from "@mui/material";
import React from "react";

const CardItem = () => {
	return (
		<div className="w-[300px] mx-3 cursor-pointer">
			<img
				className="border-x-[2px] border-t-[2px] border-pink-400 w-full h-[20rem] object-cover object-top"
				src=""
				alt=""
			/>
			<div className="border-4 border-black bg-black text-white p-2 text-center mb-2">
				<p className="text-lg font-semibold">Name</p>
				<p className="text-2xl font-bold">100,000VND</p>
			</div>
			<Button
				fullWidth
				sx={{
					backgroundColor: "white",
					color: "#1976d2",
					fontWeight: "bold",
					"&:hover": {
						backgroundColor: "#125ea5",
						color: "white",
						border: "1px solid white",
					},
					border: "1px solid #1976d2",
					textTransform: "uppercase",
				}}
			>
				SHOP NOW
			</Button>
		</div>
	);
};

export default CardItem;
