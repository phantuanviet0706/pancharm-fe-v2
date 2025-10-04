import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const DEFAULT_SLIDES = [
	{
		src: "https://images.unsplash.com/photo-1514894780887-121968d00567?q=80&w=1600&auto=format&fit=crop",
		content: "New Arrivals",
	},
	{
		src: "https://images.unsplash.com/photo-1516570161787-2fd917215a3d?q=80&w=1600&auto=format&fit=crop",
		content: "Summer Collection",
	},
	{
		src: "https://images.unsplash.com/photo-1520975930498-6f67b5496aa7?q=80&w=1600&auto=format&fit=crop",
		content: "Best Sellers",
	},
];

export default function SwipeSlider({ slides = DEFAULT_SLIDES }) {
	return (
		<div className="w-screen">
			<Swiper
				modules={[Navigation, Pagination, Autoplay, A11y]}
				loop
				autoplay={{ delay: 2500, disableOnInteraction: false }}
				pagination={{ clickable: true }}
				navigation
				a11y={{ enabled: true }}
				style={{ height: "calc(100vh - var(--topbar-h) - var(--navbar-h) - 100px)" }}
				className="w-full"
			>
				{slides.map((s, i) => (
					<SwiperSlide key={i}>
						<div className="relative w-full h-full">
							<img
								src={s.src}
								alt={`slide-${i}`}
								className="absolute inset-0 w-full h-full object-cover"
							/>
							<span className="absolute bottom-6 left-6 rounded-lg bg-black/50 px-4 py-2 text-white text-base md:text-lg">
								{s.content}
							</span>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
