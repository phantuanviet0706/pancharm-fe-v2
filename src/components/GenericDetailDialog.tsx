import React from "react";
import {
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogProps,
	IconButton,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SxProps, Theme } from "@mui/material/styles";
import { ButtonProps } from "@mui/material/Button";

interface HeaderAction {
	label?: string;
	icon?: React.ReactNode;
	onClick: () => void;
	variant?: ButtonProps["variant"];
	color?: ButtonProps["color"];
	disabled?: boolean;
	sx?: SxProps<Theme>;
}

type DialogBaseProps = Omit<DialogProps, "title">;

export interface GenericDetailDialogProps extends DialogBaseProps {
	open: boolean;
	title: React.ReactNode;
	onClose: () => void;
	children: React.ReactNode;
	headerAction?: HeaderAction;
	maxWidth?: DialogProps["maxWidth"];
}

export default function GenericDetailDialog({
	open,
	title,
	onClose,
	children,
	headerAction,
	maxWidth = "md",
	...dialogProps
}: GenericDetailDialogProps) {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullWidth
			maxWidth={maxWidth}
			scroll="body"
			{...dialogProps}
		>
			{/* Header */}
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					px: 3,
					pt: 2,
					pb: 1,
					borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
				}}
			>
				{/* Title */}
				<Box sx={{ minWidth: 0 }}>
					<div className="font-semibold text-xl uppercase">
						{title}
					</div>
				</Box>

				{/* Actions */}
				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					{headerAction && (
						<Button
							onClick={headerAction.onClick}
							variant={headerAction.variant || "outlined"}
							color={headerAction.color || "primary"}
							disabled={headerAction.disabled}
							startIcon={headerAction.icon}
							sx={headerAction.sx}
						>
							{headerAction.label}
						</Button>
					)}

					<IconButton edge="end" onClick={onClose} size="small">
						<CloseIcon fontSize="small" />
					</IconButton>
				</Box>
			</Box>

			{/* Content */}
			<DialogContent sx={{ px: 3, pt: 2, pb: 3 }}>{children}</DialogContent>
		</Dialog>
	);
}
