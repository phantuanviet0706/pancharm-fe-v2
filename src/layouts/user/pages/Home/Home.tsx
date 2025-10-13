import React from "react";
import SwipeSlider from "../../components/SwipeSlider";
import Slide from "./Slide/Slide";
import { Video } from "../../components/Video";
import BaseLayout from "../../../../components/BaseLayout";

const Home = () => {
	return (
		<>
			<BaseLayout>
				<Video src="https://pancharm.s3.ap-northeast-1.amazonaws.com/video/%C4%90%E1%BB%93ng+h%E1%BB%93+%C4%91%E1%BA%BFm+ng%C6%B0%E1%BB%A3c+d%C3%A0nh+cho+ai+l%C3%A0m+video+10s.mp4"></Video>

				<SwipeSlider />

				<Slide />

				<div className="">
					<div className="flex gap-5 px-15">
						<div className="relative">
							<a className="relative" href="/products">
								<img src="https://wallpaperaccess.com/full/4264145.jpg" />
								<span className="absolute bottom-6 left-6 rounded-lg bg-black/50 px-4 py-2 text-white text-base md:text-lg">
									Ảnh số 1
								</span>
							</a>
						</div>
						<div className="relative">
							<a className="relative" href="#">
								<img src="https://wallpaperaccess.com/full/2586823.jpg" />
								<span className="absolute bottom-6 left-6 rounded-lg bg-black/50 px-4 py-2 text-white text-base md:text-lg">
									Ảnh số 2
								</span>
							</a>
						</div>
					</div>
				</div>
			</BaseLayout>
		</>
	);
};

export default Home;
