import React from "react";

export interface BaseLayoutProps {
	children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
	return <div className="space-y-5 lg:space-y-10 relative top-10 mb-10">{children}</div>;
};

export default BaseLayout;
