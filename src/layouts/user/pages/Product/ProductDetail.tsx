import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Button, Slider } from "@mui/material";
import BaseLayout from "../../components/BaseLayout";
import SwipeSlider from "../../components/SwipeSlider";
import InputNumber from "../../../../components/InputNumber";
import ProgressBar from "../../../../components/ProgressBar";
import DetailSection from "../../../../components/DetailSection";
import CardItem from "../../components/CardItem";

const SLIDES = [
	{
		src: "/product/01.jpeg",
	},
	{
		src: "/product/02.jpeg",
	},
	{
		src: "/product/03.jpeg",
	},
	{
		src: "/product/04.jpeg",
	},
	{
		src: "/product/05.jpeg",
	},
];

const ProductDetail = () => {
	const rootRef = useRef<HTMLDivElement | null>(null);

	useLayoutEffect(() => {
		const hasSR = "scrollRestoration" in window.history;
		const prevSR = hasSR ? (window.history as any).scrollRestoration : undefined;
		if (hasSR) (window.history as any).scrollRestoration = "manual";

		const getScrollParent = (el: HTMLElement | null): HTMLElement | Window => {
			let node: HTMLElement | null = el;
			while (node && node !== document.body) {
				const { overflowY } = getComputedStyle(node);
				if (/(auto|scroll|overlay)/.test(overflowY)) return node;
				node = node.parentElement;
			}
			return window;
		};

		const scrollParent = getScrollParent(rootRef.current!);

		const toTop = () => {
			if (scrollParent === window) {
				window.scrollTo({ top: 0, left: 0, behavior: "auto" });
				document.documentElement.scrollTop = 0;
				document.body.scrollTop = 0;
			} else {
				(scrollParent as HTMLElement).scrollTop = 0;
				(scrollParent as HTMLElement).scrollLeft = 0;
			}
		};

		toTop();
		requestAnimationFrame(toTop);
		setTimeout(toTop, 0);
		setTimeout(toTop, 120);

		const imgs = Array.from((rootRef.current ?? document).querySelectorAll("img"));
		const onImg = () => setTimeout(toTop, 0);
		imgs.forEach((img) => {
			if (!img.complete) img.addEventListener("load", onImg, { once: true });
		});

		return () => {
			imgs.forEach((img) => img.removeEventListener("load", onImg));
			if (hasSR && prevSR) (window.history as any).scrollRestoration = prevSR;
		};
	}, []);

	return (
		<BaseLayout>
			<div ref={rootRef} style={{ margin: 0 }}></div>
			<div className="xl:flex justify-between px-10">
				<div className="product-images w-[45%]">
					<SwipeSlider showThumbs width="30rem" height="40rem" slides={SLIDES} />
				</div>
				<div className="product-basic-info px-8 w-[55%] flex justify-left">
					<div
						className="product-info-wrapper"
						style={{
							width: "34rem",
						}}
					>
						<div className="text-[var(--color-card-bg)]">
							<div className="uppercase font-bold text-2xl pb-4">
								Vòng tay đá phong thủy dây lắc bạc đính đá cao cấp
							</div>
							<div className="flex text-3xl font-bold pl-1">2,000,000đ</div>
						</div>
						<div className="pt-8">
							<div className="input-title font-semibold text-xl text-[var(--color-card-bg)] mb-2">
								Số lượng:
							</div>
							<div className="flex justify-between gap-10">
								<div>
									<InputNumber min={1} max={100} initial={3} />
								</div>
							</div>
							<div className="mt-5">
								<Button
									sx={{
										border: "1px solid var(--color-text-light)",
										background: "var(--color-card-bg)",
										color: "white",
										"&:hover": {
											background: "var(--color-card-light)",
										},
										marginRight: "10px",
									}}
								>
									Mua ngay
								</Button>
								<Button
									sx={{
										border: "1px solid var(--color-text-light)",
										background: "var(--color-card-bg)",
										color: "white",
										"&:hover": {
											background: "var(--color-card-light)",
										},
									}}
								>
									Thêm vào giỏ hàng
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="product-detail px-20 text-[var(--color-card-bg)] mt-10">
				<div className="product-detail-title uppercase text-center text-2xl font-semibold">
					Thông tin sản phẩm
				</div>
				<DetailSection>
					<section className="description-content expanded grid gap-4 mt-4 text-center px-12">
						<div>
							Vòng tay phong thủy là món trang sức được chế tác từ đá tự nhiên, có ý
							nghĩa cầu may mắn, tài lộc, sức khỏe và bình an. Vòng có tác dụng hỗ trợ
							tinh thần, cải thiện sức khỏe (như giảm căng thẳng, cải thiện giấc ngủ,
							tăng cường miễn dịch) và giúp bạn kết nối với năng lượng thiên nhiên.
							Việc lựa chọn vòng tay cần dựa trên yếu tố phong thủy (như bản mệnh, màu
							sắc, số hạt) để vòng phát huy tối đa công dụng.
						</div>
						<div className="w-full justify-items-center">
							<div className="w-[50vw] h-[50vh] aspect-[4/3] overflow-hidden">
								<img
									src="/product/04.jpeg"
									alt="Source 1"
									className="w-full h-full object-cover object-center"
								/>
							</div>
						</div>
						<div>
							Vòng tay phong thủy là món trang sức được chế tác từ đá tự nhiên, có ý
							nghĩa cầu may mắn, tài lộc, sức khỏe và bình an. Vòng có tác dụng hỗ trợ
							tinh thần, cải thiện sức khỏe (như giảm căng thẳng, cải thiện giấc ngủ,
							tăng cường miễn dịch) và giúp bạn kết nối với năng lượng thiên nhiên.
							Việc lựa chọn vòng tay cần dựa trên yếu tố phong thủy (như bản mệnh, màu
							sắc, số hạt) để vòng phát huy tối đa công dụng.
						</div>
						<div className="w-full justify-items-center">
							<div className="w-[50vw] h-[50vh] aspect-[4/3] overflow-hidden">
								<img
									src="/product/04.jpeg"
									alt="Source 1"
									className="w-full h-full object-cover object-center"
								/>
							</div>
						</div>
					</section>
				</DetailSection>
			</div>
		</BaseLayout>
	);
};

export default ProductDetail;
