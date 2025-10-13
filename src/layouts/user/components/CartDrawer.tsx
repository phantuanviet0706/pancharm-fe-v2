import React from "react";
import { Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export interface CartItem {
	id: number;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	image: string;
}

export interface Props {
	open: boolean;
	onClose: () => void;
	items: CartItem[];
}

export default function CartDrawer({ open, onClose, items }: Props) {
	const total = items.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);

	return (
		<Drawer
			anchor="right"
			open={open}
			onClose={onClose}
			PaperProps={{
				sx: {
					width: { xs: "100%", sm: 420 },
					bgcolor: "#000",
					color: "white",
				},
			}}
		>
			<div className="flex items-center justify-between px-5 py-4 border-b border-white-800">
				<h2 className="text-lg font-semibold">
					Shopping Cart
					<span className="ml-2 text-sm text-gray-400">({items.length} sản phẩm)</span>
				</h2>
				<IconButton onClick={onClose} sx={{ color: "white" }}>
					<CloseIcon />
				</IconButton>
			</div>

			<div className="flex-1 overflow-auto px-5 py-3">
				{items.map((item) => (
					<div
						key={item.id}
						className="flex items-center justify-between py-4 border-b border-gray-800"
					>
						<div className="flex gap-3 items-center">
							<img
								src={item.image}
								alt={item.name}
								className="w-16 h-16 object-cover"
							/>
							<div>
								<p className="font-medium">{item.name}</p>
								<p className="text-sm text-gray-400">{item.variant}</p>
								<p className="text-sm text-gray-300">
									{item.price.toLocaleString()} VND
								</p>

								<div className="flex items-center mt-1 border border-gray-700 w-max">
									<button className="px-2 text-gray-300 hover:text-white">
										−
									</button>
									<span className="px-2">{item.quantity}</span>
									<button className="px-2 text-gray-300 hover:text-white">
										＋
									</button>
								</div>
							</div>
						</div>
						<IconButton size="small" sx={{ color: "#bbb" }}>
							<DeleteOutlineIcon fontSize="small" />
						</IconButton>
					</div>
				))}
			</div>

			<div className="mt-auto bg-[#0a0a0a] border-t border-gray-800 px-5 py-4">
				<div className="flex justify-between mb-3">
					<span className="text-gray-400">Tổng cộng</span>
					<span className="font-semibold">{total.toLocaleString()} VND</span>
				</div>
				<button className="w-full py-3 bg-yellow-500 text-black font-semibold text-center rounded hover:bg-yellow-400 transition">
					Thanh toán
				</button>
			</div>
		</Drawer>
	);
}
