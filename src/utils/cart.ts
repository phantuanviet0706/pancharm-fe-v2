export type CartItemType = {
	productId: number;
	unitPrice: number;
	quantity: number;
};

const CART_KEY = "carts";

export function getCart(): CartItemType[] {
	const raw = sessionStorage.getItem(CART_KEY);
	if (!raw) return [];
	try {
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

export function saveCart(carts: CartItemType[]) {
	sessionStorage.setItem(CART_KEY, JSON.stringify(carts));
}
