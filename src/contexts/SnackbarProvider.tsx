// src/contexts/SnackbarProvider.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

type SnackbarOptions = {
	message: string;
	severity?: AlertColor; // "success" | "error" | "warning" | "info"
	autoHideDuration?: number; // ms
};

type SnackbarContextProps = {
	showSnackbar: (opts: SnackbarOptions) => void;
};

const SnackbarContext = createContext<SnackbarContextProps>({
	showSnackbar: () => {},
});

export const useSnackbar = () => useContext(SnackbarContext);

export function SnackbarProvider({ children }: { children: ReactNode }) {
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState<SnackbarOptions>({
		message: "",
		severity: "info",
		autoHideDuration: 2000,
	});

	const showSnackbar = (opts: SnackbarOptions) => {
		setOptions({
			severity: "info",
			autoHideDuration: 2000,
			...opts,
		});
		setOpen(true);
	};

	const handleClose = () => setOpen(false);

	return (
		<SnackbarContext.Provider value={{ showSnackbar }}>
			{children}

			<Snackbar
				open={open}
				autoHideDuration={options.autoHideDuration}
				onClose={handleClose}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				TransitionProps={{ onExited: handleClose }}
				sx={{
					"& .MuiSnackbar-root": {
						animation: "slideUp 0.35s ease-out",
					},
				}}
			>
				<Alert
					onClose={handleClose}
					severity={options.severity}
					variant="filled"
					sx={{
						width: "100%",
						borderRadius: "12px",
						color: "white",
						fontWeight: 600,
						display: "flex",
						alignItems: "center",
						gap: "8px",
						boxShadow: {
							success: "0 0 12px rgba(34,197,94,0.7)",
							error: "0 0 12px rgba(239,68,68,0.7)",
							warning: "0 0 12px rgba(234,179,8,0.7)",
							info: "0 0 12px rgba(59,130,246,0.7)",
						}[options.severity ?? "info"],

						background: {
							success: "linear-gradient(135deg,#22c55e,#16a34a)",
							error: "linear-gradient(135deg,#ef4444,#b91c1c)",
							warning: "linear-gradient(135deg,#eab308,#ca8a04)",
							info: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
						}[options.severity ?? "info"],

						"& .MuiAlert-icon": {
							animation: "pop 0.5s ease",
							fontSize: "26px",
						},
					}}
				>
					{options.message}
				</Alert>
			</Snackbar>
		</SnackbarContext.Provider>
	);
}
