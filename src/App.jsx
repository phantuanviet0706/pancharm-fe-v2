import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import Footer from "./layouts/user/components/Footer";
import Navbar from "./layouts/user/components/Navbar";

// Import User Routes
import UserHome from "./layouts/user/pages/Home/Home";
import Product from "./layouts/user/pages/Product/Product";
import ProductDetail from "./layouts/user/pages/Product/ProductDetail";
import DynamicPage from "./layouts/user/pages/DynamicPage/DynamicPage";
import Order from "./layouts/user/pages/Order/Order";

// Import Admin Routes
import AdminHome from "./layouts/admin/pages/Home/Home";
import Category from "./layouts/admin/pages/Category/Category";
import NotFound from "./layouts/common/NotFound";
import User from "./layouts/admin/pages/User/User";
import LoginPage from "./layouts/common/LoginPage";
import RegisterPage from "./layouts/common/RegisterPage";
import ForgotPage from "./layouts/common/ForgotPage";
import ChangePasswordPage from "./layouts/common/ChangePasswordPage";
import Profile from "./layouts/user/pages/User/Profile";
import UserInfo from "./layouts/user/pages/User/UserInfo";
import Collection from "./layouts/user/pages/Collection/Collection";
import Other from "./layouts/admin/pages/Other/Other";

function App() {
	const SAMPLE_DATA = [
		{
			path: "/huong-dan-thanh-toan",
			name: "Hướng dẫn thanh toán",
			content: `
			01. Hình thức thanh toán

			Helios chấp nhận các loại hình thức thanh toán sau đây:

			Thanh toán sau khi nhận hàng (COD)
			Thanh toán qua chuyển khoản ngân hàng
			02. Thông tin ngân hàng

			Chuyển khoản cho Helios với nội dung: WEB + SĐT tới số tài khoản dưới đây:

			Chủ tài khoản : Nguyễn Tuấn Anh
			Số tài Khoản : 19029037693031
			Chi Nhánh : Techcombank`,
		},
		{
			path: "/giao-hang",
			name: "Giao hàng",
			content: "Chính sách giao hàng của chúng tôi là abcdef",
		},
	];

	return (
		<>
			<Router>
				{/* <Home /> */}
				<Routes>
					{/* User Routes */}
					<Route path="/" element={<UserHome />} />
					<Route path="/products">
						<Route index element={<Product />} />
						<Route path="detail" element={<ProductDetail />} />
					</Route>
					<Route path="/orders">
						<Route index element={<Order />} />
					</Route>
					<Route path="/profile">
						<Route index element={<Profile />}></Route>
						<Route path="info" element={<UserInfo />}></Route>
					</Route>

					<Route path="/collections">
						<Route index element={<Collection />}></Route>
					</Route>

					{SAMPLE_DATA.map((item, index) => (
						<Route
							key={index}
							path={item.path}
							element={<DynamicPage name={item.name} content={item.content} />}
						/>
					))}

					{/* Admin Routes */}
					<Route path="/admin">
						<Route index element={<AdminHome />} />
						<Route path="users" element={<User />} />
						<Route path="others" element={<Other />}></Route>
					</Route>

					{/* Common Routes */}
					<Route path="/login" element={<LoginPage />}></Route>
					<Route path="/register" element={<RegisterPage />}></Route>
					<Route path="/forgot" element={<ForgotPage />}></Route>
					<Route path="/change-password" element={<ChangePasswordPage />}></Route>

					{/* Not Found */}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
