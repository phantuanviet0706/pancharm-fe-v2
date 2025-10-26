import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	clearScreen: false,
	css: { devSourcemap: false },
	server: {
		host: true,
		port: 5173,
		open: true,
		hmr: {
			overlay: true
		},
		historyApiFallback: true,
		watch: { usePolling: false },
	},
	optimizeDeps: {
		entries: ["./index.html"],
	},
});
