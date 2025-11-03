import axios from "axios";

const API_URL = `${import.meta.env.VITE_APP_URL}/config`;

export const useGlobalData = async () => {
    console.log(API_URL)
	await axios
		.get(API_URL)
		.then((res) => {
			const data = res?.data?.result || {};
			localStorage.setItem("APP_CONFIG", JSON.stringify(data));
		})
		.catch((err) => {
			console.error("Failed to fetch config:", err);
		});
};
