import React from "react";
import AuthPage from "./AuthPage";
import { Button, Link } from "@mui/material";
import FormInput from "../../components/FormInput";

const RegisterPage = () => {
	return (
		<>
			<AuthPage
				title="Đăng ký tài khoản"
				footer={
					<>
						<div className="nav-footer-wrapper flex justify-center">
							<div className="nav-footer-content w-[30vw]">
								Đã có tài khoản? <br />
								Quay lại đăng nhập để nhận ưu đãi mới nhất
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
									href="login"
									underline="none"
									sx={{
										color: "var(--color-cream-bg)",
										"&:hover": {
											color: "var(--color-cream-bg-hover)",
										},
									}}
								>
									<span className="btn-content">Đăng ký</span>
								</Link>
							</Button>
						</div>
					</>
				}
                // position="right"
			>
				<div className="nav-content-form">
					<div className="nav-form">
						<FormInput type="text" label="Họ và tên"></FormInput>
						<FormInput type="text" label="Tên đăng nhập"></FormInput>
						<FormInput type="text" label="Nhập mật khẩu"></FormInput>
						<FormInput type="text" label="Nhập lại mật khẩu"></FormInput>
						<FormInput type="text" label="Email của bạn"></FormInput>
						<FormInput type="text" label="Số điện thoại"></FormInput>
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
							<div className="submit-content">Đăng ký</div>
						</Button>
					</div>
				</div>
			</AuthPage>
		</>
	);
};

export default RegisterPage;
