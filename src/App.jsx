import "./App.css";
import Footer from "./layouts/user/components/Footer";
import Navbar from "./layouts/user/components/Navbar";
import Home from "./layouts/user/pages/Home/Home";

function App() {
	return (
		<>
			<div className="">
				<Navbar />
				<Home />
				<Footer />
			</div>
		</>
	);
}

export default App;
