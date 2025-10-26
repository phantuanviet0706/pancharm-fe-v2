import React from "react";
import AuthPage from "./AuthPage";
import { Button, Link } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FormInput from "../../components/FormInput";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const ForgotPage = () => {
	return (
		<>
			<AuthPage
				title="Quên mật khẩu"
				header={
					<Link
						href="/login"
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
								Quay trở lại đăng nhập
							</div>
						</div>
					</Link>
				}
			>
				<div className="nav-content-form">
					<div className="nav-form">
						<FormInput type="text" label="Email" name="email"></FormInput>
					</div>
					<div className="nav-btn relative text-center">
						<Button
							className="submit-btn min-w-[120px] h-[28px]"
							sx={{
								backgroundColor: "var(--color-card-bg)",
								color: "var(--color-cream-bg)",
								borderRadius: "20px",
								"&:hover": {
									backgroundColor: "var(--color-card-bg-hover)",
									color: "var(--color-cream-bg-hover)",
								},
								paddingInline: "15px",
							}}
						>
							<div className="submit-content">Xác nhận email</div>
						</Button>
					</div>
				</div>
			</AuthPage>
		</>
	);
};

export default ForgotPage;
