import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button } from "@mui/material";
import CardItem from "../../../components/CardItem";
import { useNavigate } from "react-router-dom";

const PrevArrow = ({ onClick }) => (
	<button
		onClick={onClick}
		className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 z-10"
	>
		<ChevronLeftIcon />
	</button>
);

const NextArrow = ({ onClick }) => (
	<button
		onClick={onClick}
		className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 z-10"
	>
		<ChevronRightIcon />
	</button>
);

const Slide = () => {
	const navigate = useNavigate();

	const settings = {
		dots: false,
		infinite: true,
		speed: 600,
		slidesToShow: 4,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding: "10px",
		variableWidth: true,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					variableWidth: false,
					centerMode: false,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					variableWidth: false,
					centerMode: false,
				},
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 1,
					variableWidth: false,
					centerMode: false,
					arrows: false,
					dots: true,
				},
			},
		],
	};

	return (
		<div className="py-5 px-16 mx-auto relative">
			<Slider {...settings}>
				{[1, 1, 1, 1, 1, 1].map((item) => (
					<CardItem key={item} item={item} />
				))}
			</Slider>
			<div className="w-full flex justify-center mt-4">
				<Button
					onClick={() => navigate("/products")}
					sx={{
						width: "150px",
						border: "2px solid #e0e0e0",
						borderRadius: "25px",
						"&:hover": {
							backgroundColor: "#125ea5",
							color: "white",
						},
					}}
				>
					Xem tất cả
				</Button>
			</div>
		</div>
	);
};

export default Slide;
