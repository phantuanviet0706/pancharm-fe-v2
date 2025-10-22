import React from "react";
import * as MuiIcons from "@mui/icons-material";

type MaterialIconProps = {
	name?: string;
	className?: string;
	sx?: any;
	fontSize?: "inherit" | "small" | "medium" | "large";
	htmlColor?: string;
	[k: string]: any;
};

export function renderMaterialIcon(name?: string, props: MaterialIconProps = {}) {
	if (!name) return null;
	const Comp = (MuiIcons as any)[name];
	if (!Comp) {
		const Fallback = (MuiIcons as any)["HelpOutlineTwoOne"];
		return Fallback ? <Fallback {...props} /> : null;
	}

	return <Comp {...props} />;
}

export const MaterialIcon: React.FC<MaterialIconProps> = ({ name, ...rest }) =>
	renderMaterialIcon(name, rest);
