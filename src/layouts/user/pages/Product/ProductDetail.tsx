import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button, Slider } from "@mui/material";
import BaseLayout from "../../components/BaseLayout";
import SwipeSlider from "../../components/SwipeSlider";
import InputNumber from "../../../../components/InputNumber";
import DetailSection from "../../../../components/DetailSection";
import CardItem from "../../components/CardItem";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, Product } from "../../../../api/productService";
import { formatVND } from "../../../../utils/helper";

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
	// ---- Get Product ----
	const { id } = useParams<{ id: string }>();
	const [product, setProduct] = useState<Product | null>(null);

	const fetchProduct = async () => {
		try {
			const res = await getProduct(Number.parseInt(id || "")); // ✅ phải await
			if (res?.code === 1 && res?.result) {
				setProduct(res.result);
			}
		} catch (err: any) {
			console.error("Failed to get product:", err.message);
		}
	};

	// ---- Navigate ----
	const navigate = useNavigate();

	useEffect(() => {
		if (id) fetchProduct();
	}, [id]);

	// ~ Handle navigate buy now ~
	const handleBuyNow = () => {
		navigate("/orders", {
			state: {
				mode: "buy-now",
				item: {
					productId: product?.id,
					quantity: 1,
				},
			},
		});
	};

	// ~ Handle add to cart ~
	const handleAddToCart = () => {
		alert("Cart");
	};

	// ---- Scroll description ----
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
							<div className="uppercase font-bold text-2xl pb-4">{product?.name}</div>
							<div className="flex text-3xl font-bold pl-1">
								{formatVND(product?.unitPrice || 0)}đ
							</div>
						</div>
						<div className="pt-8">
							<div className="input-title font-semibold text-xl text-[var(--color-card-bg)] mb-2">
								Số lượng:
							</div>
							<div className="flex justify-between gap-10">
								<div>
									<InputNumber
										min={1}
										max={product?.quantity || 1}
										initial={1}
										// onChange={}
									/>
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
									onClick={handleBuyNow}
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
									onClick={handleAddToCart}
								>
									Thêm vào giỏ hàng
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
			{product?.description && (
				<div className="product-detail px-20 text-[var(--color-card-bg)] mt-10">
					<div className="product-detail-title uppercase text-center text-2xl font-semibold">
						Thông tin sản phẩm
					</div>
					<DetailSection>
						<section className="description-content expanded grid gap-4 mt-4 text-center px-12">
							{product?.description}
						</section>
					</DetailSection>
				</div>
			)}
		</BaseLayout>
	);
};

export default ProductDetail;
