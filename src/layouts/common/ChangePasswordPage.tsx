import React, { useRef, useState } from "react";
import AuthPage from "./AuthPage";
import { Button, Link } from "@mui/material";
import FormInput from "../../components/FormInput";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../api/userService";
import { handleKeyDown } from "../../utils/helper";

const ChangePasswordPage = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();

	const buttonRef = useRef<HTMLButtonElement>(null);

	const handleChangePassword = async () => {
		try {
			const res = await changePassword({ password, confirmPassword });
			if (res?.code === 1 && res?.result) {
				navigate("/");
			}
			return { code: res?.code, message: res?.message };
		} catch (err: any) {
			return {
				code: -1,
				message: err?.response?.data?.message || err.message,
			};
		}
	};

	return (
		<>
			<AuthPage title="Đổi mật khẩu" header=" ">
				<div className="nav-content-form">
					<div className="nav-form">
						<FormInput
							type="password"
							name="password"
							label="Mật khẩu"
							value={password}
							onChange={(e) => setPassword(e)}
							tabIndex={1}
						></FormInput>
						<FormInput
							type="password"
							name="confirmPassword"
							label="Xác nhận mật khẩu"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e)}
							tabIndex={2}
						></FormInput>
					</div>
					<div className="nav-btn relative text-center">
						<Button
							ref={buttonRef}
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
							onClick={handleChangePassword}
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
