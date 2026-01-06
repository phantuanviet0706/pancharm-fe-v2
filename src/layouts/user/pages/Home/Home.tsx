import React, { useEffect, useMemo, useState } from "react";
import SwipeSlider from "../../components/SwipeSlider";
import Slide from "./Slide/Slide";
import { Video } from "../../components/Video";
import BaseLayout from "../../components/BaseLayout";
import { Button, Link } from "@mui/material";
import { useCollections } from "../../../../hooks/useCollections";
import { useProducts } from "../../../../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { useConfiguration } from "../../../../hooks/useConfiguration";

const Home = () => {
	const { collections } = useCollections(useMemo(() => ({ limit: 2, isDefault: 1 }), []));
	const { products } = useProducts(useMemo(() => ({ limit: 10 }), []));
	const navigate = useNavigate();

	const { data } = useConfiguration();
	const [videoUrl, setVideoUrl] = useState<string | null>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	useEffect(() => {
		if (data?.config) {
			try {
				const config = JSON.parse(data.config);
				const videoUrlFromConfig = config.videoUrl;
				const imageUrlFromConfig = config.imageUrl;

				if (videoUrlFromConfig && videoUrlFromConfig !== videoUrl) {
					setVideoUrl(videoUrlFromConfig);
				}

				if (imageUrlFromConfig && imageUrlFromConfig !== imageUrl) {
					setImageUrl(imageUrlFromConfig);
				}
			} catch (error) {
				console.error("Error parsing config:", error);
			}
		}
	}, [data?.config, videoUrl, imageUrl]);

	return (
		<>
			<BaseLayout>
				<div className="grid grid-cols-1 gap-6 text-[var(--color-card-bg)] mt-[-40px]">
					{videoUrl && (
						<Video src={videoUrl}>
							<div className="absolute inset-0 flex flex-col items-center justify-end bottom-30 gap-6 text-center z-10">
								<Button
									sx={{
										backgroundColor: "var(--color-cream-bg)",
										"&:hover": {
											backgroundColor: "var(--color-cream-bg-hover)",
											color: "var(--color-card-bg-hover)",
										},
										borderRadius: "9999px",
										paddingInline: "32px",
										paddingBlock: "10px",
										boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
										color: "var(--color-card-bg)",
										fontSize: "1em",
										fontWeight: "700",
										letterSpacing: "0.05em",
									}}
									onClick={() => navigate("/products")}
								>
									Mua ngay
								</Button>
							</div>
						</Video>
					)}

					{/* Câu chuyện thương hiệu */}
					<div className="brand-story">
						<div className="brand-story-container">
							<div></div>
						</div>
					</div>

					<section className="w-full bg-[var(--color-cream-bg)] py-[3em] hidden md:flex justify-center">
						<div className="max-w-[1000px] w-full grid grid-cols-12 gap-[2.2em] items-start">
							<div className="col-span-5 pl-[0.4em] md:pt-[0.6em] relative h-full z-100 text-right">
								<h2 className="relative uppercase font-extrabold leading-tight text-[var(--color-card-bg)] text-[2.1em] md:text-[2.4em] top-[50%] -translate-y-9/10">
									Câu chuyện
									<br />
									thương hiệu
								</h2>
								<p className="mt-[1.1em] text-[var(--color-card-bg)]/85 leading-[1.9] max-w-[36ch] text-[14px] text-right absolute bottom-6 -right-20">
									Tự hào là thương hiệu trang sức phong thủy được bảo hộ độc quyền
									tại Việt Nam, chúng tôi tạo nên những thiết kế mang dấu ấn
									riêng, hài hòa giữa thẩm mỹ và năng lượng. Mỗi sản phẩm là một
									lời chúc lành, được chế tác và kiểm định cẩn trọng, tôn vinh bản
									thể và hành trình riêng của mỗi người.
								</p>
							</div>

							<div className="col-span-7">
								<div
									className="relative aspect-[16/9] overflow-hidden bg-[var(--color-cream-bg)] w-[35em] h-[30em]"
									style={
										{
											"--gap": "0.75rem",
											"--shift": "3em",
										} as React.CSSProperties
									}
								>
									<img
										src={imageUrl || "/product/04.jpeg"}
										alt="brand-story"
										className="absolute inset-0 object-cover w-full h-full"
										style={{
											clipPath: "xywh(0 0 100% 100% round 20% 35% 0% 40%)",

											WebkitMaskImage:
												"radial-gradient(130% 130% at 50% 50%, black 90%, transparent 100%), linear-gradient(#000 0 0), linear-gradient(#000 0 0)",
											maskImage:
												"radial-gradient(130% 130% at 50% 50%, black 90%, transparent 100%), linear-gradient(#000 0 0), linear-gradient(#000 0 0)",

											WebkitMaskSize: "100% 100%, 100% 100%, 10em 12em",
											maskSize: "100% 100%, 100% 100%, 6em 13em",

											WebkitMaskPosition: "center, 0 0, 0 calc(100% - 1em)",
											maskPosition: "center, 0 0, 0 calc(100% - 1em)",

											WebkitMaskRepeat: "no-repeat, no-repeat, no-repeat",
											maskRepeat: "no-repeat, no-repeat, no-repeat",

											WebkitMaskComposite: "source-in, xor",
											maskComposite: "intersect, exclude",
										}}
									/>

									<div
										className="pointer-events-none absolute inset-y-0 -translate-x-1/2"
										style={{
											left: "calc(50% - var(--shift))",
											width: "var(--gap)",
											background: "var(--color-cream-bg)",
										}}
									/>

									<div
										className="pointer-events-none absolute -translate-y-1/2 left-0"
										style={{
											top: "calc(50% + 1em)",
											height: "var(--gap)",
											width: "calc(50% - var(--shift) - (var(--gap) / 2))",
											background: "var(--color-cream-bg)",
										}}
									/>
								</div>
							</div>
						</div>
					</section>

					{products.length > 0 && (
						<div className="text-center">
							<div className="uppercase text-3xl">Sản phẩm</div>
							<Slide items={products} />
						</div>
					)}

					{collections.length > 0 && (
						<div className="grid gap-5 mt-10">
							<div className="uppercase text-3xl text-center font-semibold">
								Bộ sưu tập
							</div>
							<div className="home-page-collections">
								<div className="flex flex-wrap gap-8 xl:gap-5 px-4 xl:px-15 justify-center">
									{collections.map((item, idx) => {
										const defaultImage = item.collectionImages?.find(
											(img) => img.isDefault,
										);

										return (
											<div
												key={idx}
												className="relative w-[90vw] h-[90vw] xl:w-[30em] xl:h-[30em] overflow-hidden rounded-2xl shadow-lg"
											>
												<a className="block w-full h-full" href={`products?collectionId=${item.id}`}>
													<img
														src={
															defaultImage?.path ??
															"/collection/01.jpeg"
														}
														alt={item.name}
														className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
													/>
													<span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-lg bg-black/60 backdrop-blur-sm px-6 py-2 text-white text-base font-medium whitespace-nowrap">
														{item.name}
													</span>
												</a>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					)}
				</div>
			</BaseLayout>
		</>
	);
};

export default Home;
