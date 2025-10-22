import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export interface BaseLayoutProps {
	children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
	return (
		<div className="user-layout-container space-y-5 lg:space-y-10 relative mb-20">
			<Navbar />
			{children}
			<Footer />
		</div>
	);
};

export default BaseLayout;
