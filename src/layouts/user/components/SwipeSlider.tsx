import React, { useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y, Thumbs, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const DEFAULT_SLIDES = [
	{
		kind: "image",
		src: "https://images.unsplash.com/photo-1514894780887-121968d00567?q=80&w=1600&auto=format&fit=crop",
		content: "New Arrivals",
	},
	{
		kind: "video",
		src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
		poster: "https://images.unsplash.com/photo-1516570161787-2fd917215a3d?q=80&w=1600&auto=format&fit=crop",
		content: "Summer Collection (Video)",
		autoplayVideo: true,
		loopVideo: false,
		muted: true,
	},
	{
		src: "https://helios.vn/cdn/shop/files/ontario-lotus-helios-black-silver_3_1080x.jpg?v=1754845293",
		content: "Best Sellers",
	},
	{
		src: "https://helios.vn/cdn/shop/files/ontario-lotus-helios-black-silver_3_1080x.jpg?v=1754845293",
		content: "Best Sellers",
	},
	{
		src: "https://helios.vn/cdn/shop/files/ontario-lotus-helios-black-silver_3_1080x.jpg?v=1754845293",
		content: "Best Sellers",
	},
	{
		src: "https://helios.vn/cdn/shop/files/ontario-lotus-helios-black-silver_3_1080x.jpg?v=1754845293",
		content: "Best Sellers",
	},
];

export default function SwipeSlider({
	slides = DEFAULT_SLIDES,
	width = "100vw",
	height = "calc(100vh - var(--topbar-h) - var(--navbar-h) - 100px)",
	showThumbs = false,
	thumbsPerView = 6,
	thumbsHeight = 84,
	autoplay = { delay: 2500, disableOnInteraction: false },
	loop = true,
	className = "",
	hoverPause = true,
}) {
	const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
	const mainSwiperRef = useRef<any>(null);
	const videoRefs = useRef<HTMLVideoElement[]>([]);

	const containerStyle = useMemo(() => {
		const toCss = (v: any) => (typeof v === "number" ? `${v}px` : v);
		return { width: toCss(width), height: toCss(height) };
	}, [width, height]);

	const isVideo = (s: any) => (s?.kind || "image") === "video";
	const getSlideAt = (i: number) => slides[i] || {};
	const stopAllVideos = () => {
		videoRefs.current.forEach((v) => {
			if (v && !v.paused) {
				try {
					v.pause();
				} catch {}
			}
		});
	};

	const handleTap = (i: number) => {
		const swiper = mainSwiperRef.current;
		const slide = getSlideAt(i);
		if (!isVideo(slide)) return;
		const v = videoRefs.current[i];
		if (!v) return;

		if (v.paused) {
			swiper?.autoplay?.stop?.();
			v.play().catch(() => {});
		} else {
			v.pause();
			if (autoplay) swiper?.autoplay?.start?.();
		}
	};

	useEffect(() => {
		const swiper = mainSwiperRef.current;
		if (!swiper) return;

		const handleUpdateForActive = () => {
			const realIndex = swiper.realIndex;
			const slide = getSlideAt(realIndex);
			stopAllVideos();

			if (isVideo(slide)) {
				const v = videoRefs.current[realIndex];
				if (v && slide.autoplayVideo !== false) {
					if (swiper.params.autoplay && swiper.autoplay?.running) swiper.autoplay.stop();
					v.play().catch(() => {});
					const onEnded = () => {
						if (!slide.loopVideo && swiper) {
							swiper.slideNext();
							if (autoplay) swiper.autoplay?.start?.();
						}
					};
					v.removeEventListener("ended", onEnded);
					v.addEventListener("ended", onEnded, { once: true });
				}
			} else {
				if (autoplay) swiper.autoplay?.start?.();
			}
		};

		swiper.on("slideChange", handleUpdateForActive);
		swiper.on("init", handleUpdateForActive);
		if (swiper.initialized) handleUpdateForActive();

		return () => {
			try {
				swiper.off("slideChange", handleUpdateForActive);
				swiper.off("init", handleUpdateForActive);
			} catch {}
		};
	}, [slides, autoplay]);

	const onMouseEnter = () => {
		const swiper = mainSwiperRef.current;
		if (!hoverPause || !swiper) return;
		if (swiper.params.autoplay && swiper.autoplay?.running) swiper.autoplay.stop();
	};
	const onMouseLeave = () => {
		const swiper = mainSwiperRef.current;
		if (!hoverPause || !swiper) return;
		const active = getSlideAt(swiper.realIndex);
		if (!isVideo(active)) swiper.autoplay?.start?.();
	};

	return (
		<div
			className={`w-full mx-auto ${className}`}
			style={{ width: containerStyle.width }}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<div
				className="flex gap-4 items-stretch flex-col"
				style={{ height: containerStyle.height }}
			>
				<Swiper
					onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
					modules={[Navigation, Pagination, Autoplay, A11y, Thumbs, Keyboard]}
					loop={loop}
					autoplay={autoplay || false}
					pagination={{ clickable: true }}
					navigation
					keyboard={{ enabled: true }}
					a11y={{ enabled: true }}
					thumbs={showThumbs ? { swiper: thumbsSwiper } : undefined}
					style={{ height: containerStyle.height }}
					className="w-full"
				>
					{slides.map((s, i) => {
						const kind = s?.kind || "image";
						return (
							<SwiperSlide key={i}>
								<div
									className="relative w-full h-full cursor-pointer"
									onClick={() => handleTap(i)}
									role={kind === "video" ? "button" : undefined}
									aria-label={
										kind === "video" ? "Toggle play/pause video" : undefined
									}
								>
									{kind === "video" ? (
										<video
											ref={(el) => (videoRefs.current[i] = el!)}
											className="absolute inset-0 w-full h-full object-cover"
											src={s.src}
											poster={s.poster}
											muted={s.muted !== false}
											loop={!!s.loopVideo}
											controls={false}
											playsInline
											preload="metadata"
										/>
									) : (
										<img
											src={s.src}
											alt={`slide-${i}`}
											className="absolute inset-0 w-full h-full object-cover"
											loading="lazy"
										/>
									)}

									{s.content && (
										<span className="absolute bottom-6 left-6 rounded-lg bg-black/50 px-4 py-2 text-white text-base md:text-lg">
											{s.content}
										</span>
									)}
									{kind === "video" && (
										<span className="pointer-events-none absolute top-4 right-4 rounded-md bg-black/55 text-white text-xs md:text-sm px-2 py-1">
											Video
										</span>
									)}
								</div>
							</SwiperSlide>
						);
					})}
				</Swiper>

				{showThumbs && (
					<div className="select-none">
						<Swiper
							modules={[Thumbs, A11y]}
							onSwiper={setThumbsSwiper}
							direction="horizontal"
							watchSlidesProgress
							slidesPerView={Math.min(thumbsPerView, slides.length)}
							spaceBetween={10}
							freeMode
							a11y={{ enabled: true }}
							className="w-full h-full justify-center thin-scrollbar"
							style={{
								overflowX: "auto"
							}}
						>
							{slides.map((s, i) => {
								const kind = s?.kind || "image";
								const thumbSrc =
									kind === "video"
										? s.poster || s.thumb || s.fallback || s.src
										: s.src;

								return (
									<SwiperSlide key={`thumb-${i}`} className="!w-auto !h-auto">
										<button
											type="button"
											onClick={() => mainSwiperRef.current?.slideToLoop(i)}
											style={{
												width: 100,
												height: 100,
											}}
											className="relative inline-flex items-center justify-center overflow-hidden rounded-md border border-transparent hover:border-white/60 focus:outline-none transition-all bg-transparent	rounded-xl"
											aria-label={`Chọn ${kind === "video" ? "video" : "ảnh"} ${i + 1}`}
											title={
												s.content || (kind === "video" ? "Video" : "Ảnh")
											}
										>
											<img
												src={thumbSrc}
												alt={`thumb-${i}`}
												className="block w-full h-full object-cover"
												loading="lazy"
											/>
											{kind === "video" && (
												<span className="pointer-events-none absolute inset-0 flex items-center justify-center">
													<span className="rounded-full bg-black/55 px-2 py-2">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 24 24"
															fill="currentColor"
															className="w-4 h-4 text-white"
														>
															<path d="M8 5v14l11-7z" />
														</svg>
													</span>
												</span>
											)}
										</button>
									</SwiperSlide>
								);
							})}
						</Swiper>
					</div>
				)}
			</div>
		</div>
	);
}
