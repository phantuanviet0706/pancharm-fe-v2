import React from "react";
import Navbar from "./Navbar";

export interface BaseLayoutProps {
	children: React.ReactNode;
	headers?: React.ReactNode;
}

const BaseLayout = ({ children, headers }: BaseLayoutProps) => {
	return (
		<div className="admin-layout-container admin-panel">
			<div
				className="navbar-container relative w-[17.5em] border-r-[1px] 
                border-r-[var(--color-cream-thick)] h-max bg-[var(--color-cream-thick)]
                text-[var(--color-card-bg)]"
			>
				<Navbar />
			</div>
			<div className="page-content">
				<div className="header-container bg-[#fff] h-[8vh]">{headers}</div>
				<div className="body-container relative ml-[17.5em] bg-[#eee]">{children}</div>
			</div>
		</div>
	);
};

export default BaseLayout;
