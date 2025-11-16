import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ConfigProvider } from "./contexts/ConfigProvider.js";
import { CartDialogProvider } from "./layouts/user/pages/Cart/CartDialogProvider.js";
import { SnackbarProvider } from "./contexts/SnackbarProvider.js";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider.js";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<ConfigProvider>
				<SnackbarProvider>
					<AuthProvider>
						<App />
					</AuthProvider>
				</SnackbarProvider>
			</ConfigProvider>
		</BrowserRouter>
	</StrictMode>,
);
