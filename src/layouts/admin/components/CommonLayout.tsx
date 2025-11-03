import React from "react";

interface CommonLayoutProps {
	title: string;
	children: React.ReactNode;
	className?: string;
	width?: number;
}

const CommonLayout = ({ title, children, className, width = 50 }: CommonLayoutProps) => {
	return (
		<div className={"relative my-10 " + className}>
			<div
				className={`page-inner bg-[#fff] mx-auto rounded-2xl`}
				style={{
					width: `${width}vw`,
				}}
			>
				<div className="page-header">
					<div
						className="header-content mx-8 py-4 border-b-1 border-b-[#e0e0e0]
                        text-2xl text-center"
					>
						{title}
					</div>
				</div>
				<div className="page-content">
					<div className="page-content-wrapper">
						<div className="detail-section mx-8 py-4">{children}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CommonLayout;
