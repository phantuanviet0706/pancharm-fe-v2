import { Button } from "@mui/material";
import React from "react";

const SlideCard = (p: any) => {
	return (
		<>
			<div className="w-[220px] mx-3 cursor-pointer">
				<img
					className="border-x-[2px] border-t-[2px] border-pink-400 w-full h-[12rem] object-cover object-top"
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
							color: "white"
						},
						border: "2px solid #1976d2"
					}}
				>
					SHOP NOW
				</Button>
			</div>
		</>
	);
};

export default SlideCard;
