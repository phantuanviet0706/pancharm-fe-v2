import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Footer from "./layouts/user/components/Footer";
import Navbar from "./layouts/user/components/Navbar";
import Home from "./layouts/user/pages/Home/Home";
import Product from "./layouts/user/pages/Product/Product";
import ProductDetail from "./layouts/user/pages/Product/ProductDetail";
import DynamicPage from "./layouts/user/pages/DynamicPage/DynamicPage";

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
			content: "Chính sách giao hàng của chúng tôi là abcdef"
		}
	];

	return (
		<>
			<Router>
				<Navbar />
				{/* <Home /> */}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/products">
						<Route index element={<Product />} />
						<Route path="detail" element={<ProductDetail />} />
					</Route>
					{SAMPLE_DATA.map((item, index) => (
						<Route
							key={index}
							path={item.path}
							element={<DynamicPage name={item.name} content={item.content} />}
						/>
					))}
				</Routes>
				<Footer />
			</Router>
		</>
	);
}

export default App;
