import { User } from "./userService";

export interface ShippingAddress {
	id?: number;

	recipientName?: string;
	address?: string;
	ward?: string;

	district?: string;
	province?: string;
	zipCode?: string;

	phoneNumber?: string;

	isDefault?: boolean;
	user?: User | null;
}

export const DEFAULT_SHIPPING_ADDRESS: ShippingAddress = {
	recipientName: "",
	address: "",
	ward: "",
	district: "",
	province: "",
	zipCode: "",
	phoneNumber: "",
	isDefault: false,
	user: null,
};
