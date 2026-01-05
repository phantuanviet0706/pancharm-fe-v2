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
import { useSnackbar } from "../../../../contexts/SnackbarProvider";
import { getCart, saveCart } from "../../../../utils/cart";
import DOMPurify from "dompurify";

const VITE_MESSENGER_URL = import.meta.env.VITE_MESSENGER_URL;
const VITE_PAGE_ID = import.meta.env.VITE_PAGE_ID;

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
	// ---- Declare state snackbar ----
	const { showSnackbar } = useSnackbar();

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
					quantity: quantity,
					unitPrice: product?.unitPrice,
				},
			},
		});
	};

	// ~ Handle add to cart ~
	const handleAddToCart = () => {
		const carts = getCart();

		const idx = carts.findIndex((c) => c.productId === product?.id);

		if (idx >= 0) {
			carts[idx].quantity += quantity;
		} else {
			carts.push({
				productId: product?.id ?? 0,
				productName: product?.name ?? "",
				unitPrice: product?.unitPrice ?? 0,
				quantity,
			});
		}

		saveCart(carts);

		showSnackbar({
			message: "Thêm sản phẩm vào giỏ hàng thành công!",
			severity: "success",
		});
	};

	// ~ Handle contact ~
	const handleContact = () => {
		window.open(`${VITE_MESSENGER_URL}/${VITE_PAGE_ID}?ref=${product?.name}`, "_blank");
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

	// ---- Quantity config ----
	const [quantity, setQuantity] = useState(1);

	const productImages = product?.productImages || [];
	const productSlides =
		productImages.length > 0 ? productImages.map((img) => ({ src: img.path })) : [];

	return (
		<BaseLayout>
			<div ref={rootRef} style={{ margin: 0 }}></div>
			<div className="xl:flex justify-between px-10">
				<div className="product-images w-full xl:w-[45%] [--slider-width:80vw] xl:[--slider-width:30rem] mb-4 xl:mb-0">
					<SwipeSlider
						showThumbs
						width="var(--slider-width)"
						height="40rem"
						slides={productSlides}
					/>
				</div>
				<div className="product-basic-info px-0 xl:px-8 w-[55%] flex justify-left">
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
							{/* <div className="input-title font-semibold text-xl text-[var(--color-card-bg)] mb-2">
								Số lượng:
							</div>
							<div className="flex justify-between gap-10">
								<div>
									<InputNumber
										min={1}
										max={product?.quantity || quantity}
										initial={1}
										onChange={(e) => setQuantity(e)}
									/>
								</div>
							</div> */}
							{/* <div className="mt-5"> */}
							<div className="grid gap-2 xl:block xl:gap-0">
								{/* <Button
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
								</Button> */}
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
									onClick={handleContact}
								>
									Liên hệ đặt hàng
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
						<section
							className="description-content expanded grid gap-4 mt-4 text-left px-12"
							dangerouslySetInnerHTML={{
								__html: DOMPurify.sanitize(product.description || ""),
							}}
						/>
					</DetailSection>
				</div>
			)}
		</BaseLayout>
	);
};

export default ProductDetail;
