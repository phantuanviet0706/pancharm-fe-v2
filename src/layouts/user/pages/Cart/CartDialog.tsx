// components/cart/CartDialog.tsx
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import React from "react";
import Cart from "./Cart";

export interface CartDialogProps {
	open: boolean;
	onClose: () => void;
}

const CartDialog: React.FC<CartDialogProps> = ({ open, onClose }) => {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullWidth
			maxWidth="sm"
			PaperProps={{
				sx: {
					border: "5px solid var(--color-card-thick)",
					borderRadius: "0px",
					backgroundColor: "var(--color-cream-bg)",
					boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
					color: "var(--color-card-bg)",
					textAlign: "center",
				},
			}}
		>
			<DialogTitle sx={{ textTransform: "uppercase", fontWeight: 600 }}>
				Giỏ hàng của bạn
			</DialogTitle>
			<DialogContent>
				<Cart />
			</DialogContent>
		</Dialog>
	);
};

export default CartDialog;
