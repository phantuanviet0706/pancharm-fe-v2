import React from "react";
import Icon from "../../components/Icon";
import { Button, Link } from "@mui/material";
import AuthPage from "./AuthPage";
import FormInput from "../../components/FormInput";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const LoginPage = () => {
	return (
		<>
			<AuthPage
				title="Đăng nhập tài khoản"
				footer={
					<>
						<div className="nav-footer-wrapper flex justify-center">
							<div className="nav-footer-content w-[30vw]">
								Chưa có tài khoản? Hãy đăng ký <br />
								để trở thành khách hàng thân thiết
							</div>
						</div>
						<div className="nav-footer-btn">
							<Button
								className="submit-btn w-[120px] h-[28px]"
								sx={{
									backgroundColor: "var(--color-card-bg)",
									"&:hover": {
										backgroundColor: "var(--color-card-bg-hover)",
									},
									borderRadius: "20px",
									marginTop: "10px",
								}}
							>
								<Link
									href="register"
									underline="none"
									sx={{
										color: "var(--color-cream-bg)",
										"&:hover": {
											color: "var(--color-cream-bg-hover)",
										},
									}}
								>
									<span className="btn-content">Đăng ký</span>
									<span className="btn-icon">
										<ArrowForwardIcon
											sx={{
												width: "16px",
												height: "16px",
												position: "relative",
												top: "-2px",
												ml: "4px",
											}}
										/>
									</span>
								</Link>
							</Button>
						</div>
					</>
				}
			>
				<div className="nav-content-form">
					<div className="nav-form">
						<FormInput type="text" label="Tài khoản"></FormInput>
						<FormInput type="password" label="Mật khẩu"></FormInput>
					</div>
					<div className="nav-btn relative text-center">
						<Button
							className="submit-btn w-[120px] h-[28px]"
							sx={{
								backgroundColor: "var(--color-card-bg)",
								color: "var(--color-cream-bg)",
								borderRadius: "20px",
								"&:hover": {
									backgroundColor: "var(--color-card-bg-hover)",
									color: "var(--color-cream-bg-hover)",
								},
							}}
						>
							<div className="submit-content">Đăng nhập</div>
						</Button>
					</div>
					<div className="nav-form-footer text-center mt-4">
						<Link href="/forgot" underline="none">
							<div className="forgot-content text-[var(--color-card-bg)] font-medium">
								Quên mật khẩu?
							</div>
						</Link>
					</div>
				</div>
			</AuthPage>
		</>
	);
};

export default LoginPage;
