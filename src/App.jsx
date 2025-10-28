import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import Footer from "./layouts/user/components/Footer";
import Navbar from "./layouts/user/components/Navbar";

// Import User Routes
import UserHome from "./layouts/user/pages/Home/Home";
import Product from "./layouts/user/pages/Product/Product";
import ProductDetail from "./layouts/user/pages/Product/ProductDetail";
import DynamicPage from "./layouts/user/pages/DynamicPage/DynamicPage";
import UserCollection from "./layouts/user/pages/Collection/Collection";
import Profile from "./layouts/user/pages/User/Profile";
import UserInfo from "./layouts/user/pages/User/UserInfo";
import Order from "./layouts/user/pages/Order/Order";

// Import Common Routes
import NotFound from "./layouts/common/NotFound";
import LoginPage from "./layouts/common/LoginPage";
import RegisterPage from "./layouts/common/RegisterPage";
import ForgotPage from "./layouts/common/ForgotPage";
import ChangePasswordPage from "./layouts/common/ChangePasswordPage";

// Import Admin Routes
import AdminHome from "./layouts/admin/pages/Home/Home";
import AdminCategory from "./layouts/admin/pages/Category/Category";
import User from "./layouts/admin/pages/User/User";
import Other from "./layouts/admin/pages/Other/Other";
import Company from "./layouts/admin/pages/Company/Company";
import CompanyInfo from "./layouts/admin/pages/Company/CompanyInfo/CompanyInfo";
import AdminCollection from "./layouts/admin/pages/Collection/Collection";
import AdminProduct from "./layouts/admin/pages/Product/Product";

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
						<Route index element={<UserCollection />}></Route>
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
						<Route path="company">
							<Route index element={<Company />}></Route>
							<Route path="info" element={<CompanyInfo />}></Route>
						</Route>
						<Route path="categories" element={<AdminCategory />}></Route>
						<Route path="collections" element={<AdminCollection />}></Route>
						<Route path="products" element={<AdminProduct />}></Route>
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
