import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export interface BaseLayoutProps {
	children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
	return (
		<div className="user-layout-container space-y-5 lg:space-y-10 relative">
			<Navbar />
			<div className="mt-10">{children}</div>
			<Footer />
		</div>
	);
};

export default BaseLayout;
