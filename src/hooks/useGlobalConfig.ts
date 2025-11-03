import { useEffect } from "react";
import { useGlobalData } from "../api/globalService";

export function useGlobalConfig() {
	useEffect(() => {
		useGlobalData();
	}, []);
}
