import React, { useContext, useState } from "react";
import Icon from "../../components/Icon";
import { Button, Link } from "@mui/material";
import AuthPage from "./AuthPage";
import FormInput from "../../components/FormInput";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { login } from "../../api/authService";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const [rememberMe, setRememberMe] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			const res = await login({ username, password, remeber: rememberMe });

			if (res?.code === 1 && res?.result) {
				const result = res.result;
				const token = result.token;

				if (token) {
					if (rememberMe) {
						const maxAge = 60 * 60 * 24 * 30;
						document.cookie = `ACCESS_TOKEN=${token}; Path=/; Max-Age=${maxAge};`;
					} else {
						document.cookie = `ACCESS_TOKEN=${token}; Path=/;`;
					}
				}

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
			<AuthPage
				title="Đăng nhập tài khoản"
				// footer={
				// 	<>
				// 		<div className="nav-footer-wrapper flex justify-center">
				// 			<div className="nav-footer-content w-[30vw]">
				// 				Chưa có tài khoản? Hãy đăng ký <br />
				// 				để trở thành khách hàng thân thiết
				// 			</div>
				// 		</div>
				// 		<div className="nav-footer-btn">
				// 			<Button
				// 				className="submit-btn w-[120px] h-[28px]"
				// 				sx={{
				// 					backgroundColor: "var(--color-card-bg)",
				// 					"&:hover": {
				// 						backgroundColor: "var(--color-card-bg-hover)",
				// 					},
				// 					borderRadius: "20px",
				// 					marginTop: "10px",
				// 				}}
				// 			>
				// 				<Link
				// 					href="register"
				// 					underline="none"
				// 					sx={{
				// 						color: "var(--color-cream-bg)",
				// 						"&:hover": {
				// 							color: "var(--color-cream-bg-hover)",
				// 						},
				// 					}}
				// 				>
				// 					<span className="btn-content">Đăng ký</span>
				// 					<span className="btn-icon">
				// 						<ArrowForwardIcon
				// 							sx={{
				// 								width: "16px",
				// 								height: "16px",
				// 								position: "relative",
				// 								top: "-2px",
				// 								ml: "4px",
				// 							}}
				// 						/>
				// 					</span>
				// 				</Link>
				// 			</Button>
				// 		</div>
				// 	</>
				// }
			>
				<div className="nav-content-form">
					<div className="nav-form">
						<FormInput
							type="text"
							label="Tài khoản"
							value={username}
							onChange={(e) => setUsername(e)}
						></FormInput>
						<FormInput
							type="password"
							label="Mật khẩu"
							value={password}
							onChange={(e) => setPassword(e)}
						></FormInput>
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
							onClick={() => {
								handleLogin();
							}}
						>
							<div className="submit-content">Đăng nhập</div>
						</Button>
					</div>
					{/* <div className="nav-form-footer text-center mt-4">
						<Link href="/forgot" underline="none">
							<div className="forgot-content text-[var(--color-card-bg)] font-medium">
								Quên mật khẩu?
							</div>
						</Link>
					</div> */}
				</div>
			</AuthPage>
		</>
	);
};

export default LoginPage;
