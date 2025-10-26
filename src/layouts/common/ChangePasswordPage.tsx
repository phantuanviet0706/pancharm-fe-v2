import React from "react";
import AuthPage from "./AuthPage";
import { Button, Link } from "@mui/material";
import FormInput from "../../components/FormInput";

const ChangePasswordPage = () => {
	return (
		<>
			<AuthPage
				title="Đổi mật khẩu"
                header=" "
			>
				<div className="nav-content-form">
					<div className="nav-form">
						<FormInput type="password" label="Mật khẩu"></FormInput>
						<FormInput type="password" label="Xác nhận mật khẩu"></FormInput>
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
							<div className="submit-content">Cập nhật</div>
						</Button>
					</div>
				</div>
			</AuthPage>
		</>
	);
};

export default ChangePasswordPage;
