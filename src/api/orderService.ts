import axios from "axios";
import { BaseQuery } from "./commonService";
import axiosClient from "./axiosClient";
import { DEFAULT_SHIPPING_ADDRESS, ShippingAddress } from "./shippingAddressService";
import { User } from "./userService";
import { OrderStatus } from "../constants/orderStatus";

const API_URL = `${import.meta.env.VITE_APP_URL}/orders`;

export interface Order {
	id?: number;

	slug?: string;

	status: OrderStatus;
    totalPrice: number;
    description: string;

    user?: User | null;
    
    shippingAddress: ShippingAddress;

    items: OrderItem[];
}

export interface OrderItem {
	id?: number;
	unitPrice: number;
	quantity: number;
	productId: number;
}

export interface OrderQuery extends BaseQuery {
	names?: string;
}

export const DEFAULT_ORDER: Order = {
    status: OrderStatus.CONFIRMED,
    totalPrice: 0,
    description: "",
	slug: "",

    shippingAddress: DEFAULT_SHIPPING_ADDRESS,
    items: []
}

export const fetchData = async (query: OrderQuery = {}) => {
	const params = new URLSearchParams();
	Object.entries(query).forEach(([key, value]) => {
		if (value !== undefined && value !== null && value !== "") {
			params.append(key, String(value));
		}
	});

	try {
		const res = await axiosClient.get<{ data: Order[]; total: number }>(
			`${API_URL}?${params.toString()}`,
		);
		return res.data;
	} catch (error) {
		console.error("Failed to fetch order:", error);
		throw error;
	}
};

export const createOrder = async (payload: Omit<Order, "id">) => {
	try {
		const res = await axios.post<Order>(API_URL, payload);
		return res.data;
	} catch (error) {
		console.error("Failed to create order:", error);
		throw error;
	}
};

export const deleteOrder = async (id: number) => {
	try {
		const res = await axiosClient.delete<Order>(`${API_URL}/${id}`);
		return res.data;
	} catch (error) {
		console.error("Failed to delete order:", error);
		throw error;
	}
};
