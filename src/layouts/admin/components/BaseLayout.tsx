import React from "react";
import Navbar from "./Navbar";

export interface BaseLayoutProps {
	children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
	return (
		<div className="admin-layout-container admin-panel">
			<div
				className="navbar-container relative w-[280px] border-r-[1px] 
                border-r-[var(--color-cream-thick)] h-max bg-[var(--color-cream-thick)]
                text-[var(--color-card-bg)]"
			>
				<Navbar />
			</div>
			<div
				className="body-container relative left-[280px]
            bg-white"
			>
				{children}
			</div>
		</div>
	);
};

export default BaseLayout;
