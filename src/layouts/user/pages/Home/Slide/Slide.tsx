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
		className="absolute top-1/2 left-[-20px] transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 z-10"
	>
		<ChevronLeftIcon />
	</button>
);

const NextArrow = ({ onClick }) => (
	<button
		onClick={onClick}
		className="absolute top-1/2 right-[-20px] transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 z-10"
	>
		<ChevronRightIcon />
	</button>
);

export interface SlideProps {
	items?: Object[];
}

const Slide = ({ items = [1, 1, 1, 1, 1, 1] }: SlideProps) => {
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
				{items.map((item, idx) => (
					<CardItem key={idx} item={item} />
				))}
			</Slider>
		</div>
	);
};

export default Slide;
