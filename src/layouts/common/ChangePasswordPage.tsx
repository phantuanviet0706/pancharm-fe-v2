import React, { useRef, useState } from "react";
import AuthPage from "./AuthPage";
import { Button, Link } from "@mui/material";
import FormInput from "../../components/FormInput";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../api/userService";
import { handleKeyDown } from "../../utils/helper";
import { useSnackbar } from "../../contexts/SnackbarProvider";

const ChangePasswordPage = () => {
	const { showSnackbar } = useSnackbar();
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

			return showSnackbar({
				message: res?.message || "Cập nhật thành công",
				severity: "success",
			});
		} catch (err: any) {
			return showSnackbar({
				message: err?.response?.data?.message || err.message,
				severity: "error",
			});
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await handleChangePassword();
	};

	return (
		<>
			<AuthPage title="Đổi mật khẩu" header=" ">
				<form className="nav-content-form" onSubmit={handleSubmit}>
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
							type="submit"
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
						>
							<div className="submit-content">Cập nhật</div>
						</Button>
					</div>
				</form>
			</AuthPage>
		</>
	);
};

export default ChangePasswordPage;
