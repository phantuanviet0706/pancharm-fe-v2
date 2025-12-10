import PropTypes from "prop-types";
import { createContext, useReducer, useEffect } from "react";
import * as actionType from "../store/actions";
import { CONFIG } from "../config/constant";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_APP_URL}`;
const APP_CONFIG_KEY = "APP_CONFIG";

// optional: TTL 30 phút
const CONFIG_TTL = 30 * 60 * 1000;

const initialState = {
	...CONFIG,
	isOpen: [],
	isTrigger: [],
};

const ConfigContext = createContext({});
const { Provider } = ConfigContext;

function ConfigProvider({ children }) {
	let trigger = [];
	let open = [];

	const [state, dispatch] = useReducer((stateData, action) => {
		switch (action.type) {
			case actionType.INIT_CONFIG:
				return {
					...stateData,
					...action.payload,
				};
			case actionType.COLLAPSE_MENU:
				return {
					...stateData,
					collapseMenu: !stateData.collapseMenu,
				};
			case actionType.COLLAPSE_HEADERMENU:
				return {
					...stateData,
					collapseHeaderMenu: !stateData.collapseHeaderMenu,
				};
			case actionType.COLLAPSE_TOGGLE:
				if (action.menu.type === "sub") {
					open = stateData.isOpen;
					trigger = stateData.isTrigger;

					const triggerIndex = trigger.indexOf(action.menu.id);
					if (triggerIndex > -1) {
						open = open.filter((item) => item !== action.menu.id);
						trigger = trigger.filter((item) => item !== action.menu.id);
					} else {
						open = [...open, action.menu.id];
						trigger = [...trigger, action.menu.id];
					}
				} else {
					const triggerIndex = stateData.isTrigger.indexOf(action.menu.id);
					trigger = triggerIndex === -1 ? [action.menu.id] : [];
					open = triggerIndex === -1 ? [action.menu.id] : [];
				}
				return {
					...stateData,
					isOpen: open,
					isTrigger: trigger,
				};
			default:
				return stateData;
		}
	}, initialState);

	const loadConfigFromCache = () => {
		const raw = localStorage.getItem(APP_CONFIG_KEY);
		if (!raw) return null;

		try {
			const parsed = JSON.parse(raw);

			const data = parsed?.data ?? parsed;
			const cachedAt = parsed?.cachedAt ?? 0;

			if (cachedAt && Date.now() - cachedAt > CONFIG_TTL) {
				return null;
			}

			return data;
		} catch (e) {
			console.warn("Invalid APP_CONFIG cache, ignore.");
			return null;
		}
	};

	const saveConfigToCache = (data) => {
		const wrapped = {
			data,
			cachedAt: Date.now(),
		};
		localStorage.setItem(APP_CONFIG_KEY, JSON.stringify(wrapped));
	};

	useEffect(() => {
		let cancelled = false;

		const initConfig = async () => {
			const cached = loadConfigFromCache();
			if (cached) {
				dispatch({ type: actionType.INIT_CONFIG, payload: cached });
			}

			try {
				const res = await axios.get(`${API_URL}/config`);
				const configData = res?.data?.result || {};

				if (!cancelled) {
					dispatch({ type: actionType.INIT_CONFIG, payload: configData });
					saveConfigToCache(configData);
				}
			} catch (err) {
				console.error("Failed to fetch config:", err);
			}
		};

		initConfig();

		// OPTIONAL: auto refresh mỗi X phút nếu muốn cực tươi
		// const interval = setInterval(initConfig, CONFIG_TTL);
		// return () => {
		//   cancelled = true;
		//   clearInterval(interval);
		// };

		return () => {
			cancelled = true;
		};
	}, []);

	return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

ConfigProvider.propTypes = { children: PropTypes.any };
export { ConfigContext, ConfigProvider };
