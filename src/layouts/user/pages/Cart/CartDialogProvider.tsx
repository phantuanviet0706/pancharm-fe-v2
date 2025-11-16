import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import CartDialog from "./CartDialog";

type CartDialogContextValue = {
	openCart: () => void;
	closeCart: () => void;
	toggleCart: () => void;
};

const CartDialogContext = createContext<CartDialogContextValue | null>(null);

export const CartDialogProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const [open, setOpen] = useState(false);

	const openCart = useCallback(() => setOpen(true), []);
	const closeCart = useCallback(() => setOpen(false), []);
	const toggleCart = useCallback(() => setOpen((v) => !v), []);

	const value = useMemo(
		() => ({ openCart, closeCart, toggleCart }),
		[openCart, closeCart, toggleCart],
	);

	const portal =
		typeof document !== "undefined"
			? createPortal(<CartDialog open={open} onClose={closeCart} />, document.body)
			: null;

	return (
		<CartDialogContext.Provider value={value}>
			{children}
			{portal}
		</CartDialogContext.Provider>
	);
};

export const useCartDialog = () => {
	const ctx = useContext(CartDialogContext);
	if (!ctx) throw new Error("useCartDialog must be used within CartDialogProvider");
	return ctx;
};
