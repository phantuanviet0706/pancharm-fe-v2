import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ConfigProvider } from "./contexts/ConfigProvider.js";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ConfigProvider>
			<App />
		</ConfigProvider>
	</StrictMode>,
);
