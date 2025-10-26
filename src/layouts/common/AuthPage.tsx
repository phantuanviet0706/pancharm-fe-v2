import { Button, Link } from "@mui/material";
import React from "react";
import Icon from "../../components/Icon";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

interface AuthPageProps {
	title: string;
	children: React.ReactNode;
	footer?: React.ReactNode;
	header?: React.ReactNode;
	position?: "left" | "right";
}

const AuthPage = ({ title, children, footer, position = "left", header = "" }: AuthPageProps) => {
	const navLeftContent = (
		<div className="md:w-1/2 p-[30px] flex flex-col justify-between">
			<div className="nav-btn">
				{header || (
					<Link
						href="/"
						underline="none"
						sx={{
							"&:hover": {
								textDecoration: "none",
							},
						}}
					>
						<div className="flex gap-2 items-center">
							<div className="nav-btn-icon bg-[var(--color-card-bg)] w-[22px] h-[22px] flex items-center justify-center rounded-2xl">
								<ArrowBackIosNewIcon
									sx={{
										width: "14px",
										height: "14px",
										color: "var(--color-cream-bg)",
									}}
								/>
							</div>
							<div className="text-[var(--color-card-bg)]">
								Quay trở lại trang chủ
							</div>
						</div>
					</Link>
				)}
			</div>

			<div className="flex flex-col items-center justify-center py-[50px] px-[30px] flex-1">
				<div className="text-[var(--color-card-bg)] text-center">
					<div className="flex justify-center">
						<Icon
							name="pancharm"
							sx={{ width: "40px", height: "40px" }}
							color="var(--color-card-bg)"
						/>
					</div>
					<div className="uppercase pt-2 font-medium">Pancharm</div>
				</div>

				<div className="uppercase pt-6 font-semibold text-[var(--color-card-bg)] text-[16px]">
					{title}
				</div>

				<div className="w-full flex flex-col items-center mt-4">{children}</div>
			</div>

			<div className="text-center">{footer}</div>
		</div>
	);

	const navRightContent = (
		<div className="w-1/2 hidden md:block">
			<div className="sticky top-0 h-screen">
				<img
					className="object-cover w-full h-full"
					src="https://images.pexels.com/photos/12732558/pexels-photo-12732558.jpeg"
					alt="banner"
				/>
			</div>
		</div>
	);

	return (
		<div className="login-container relative min-h-screen">
			<div className="login-wrapper relative md:flex gap-2 min-h-screen">
				{position === "left" ? (
					<>
						{navLeftContent}
						{navRightContent}
					</>
				) : (
					<>
						{navRightContent}
						{navLeftContent}
					</>
				)}
			</div>
		</div>
	);
};

export default AuthPage;
