import axiosClient from "./axiosClient";

const API_URL = `${import.meta.env.VITE_APP_URL}/configurations`;

export interface Configuration {
	id?: number;
	name: string;
	config?: JSON;
}

export const getConfiguration = async () => {
	try {
		const res = await axiosClient.get(API_URL);
		return res.data;
	} catch (error) {
		console.error("Failed to get configuration:", error);
		throw error;
	}
};

export const updateHomeVideo = async (name: string = "COMPANY_CONFIG", payload: any) => {
	try {
		const res = await axiosClient.post<Configuration>(`${API_URL}/${name}/update-video`, payload);
		return res.data;
	} catch (err) {
		console.error("Failed to update home video:", err);
		throw err;
	}
};

export const updateHomeImage = async (name: string, payload: any) => {
	try {
		const res = await axiosClient.post<Configuration>(`${API_URL}/${name}/update-image`, payload);
		return res.data;
	} catch (err) {
		console.error("Failed to update home image:", err);
		throw err;
	}
};
