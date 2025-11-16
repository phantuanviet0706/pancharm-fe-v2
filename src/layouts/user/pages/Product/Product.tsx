import React, { useMemo, useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import CardItem from "../../components/CardItem";
import { Button, Pagination } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useProducts } from "../../../../hooks/useProducts";
import { useSearchParams } from "react-router-dom";

const PRICE_MIN = 0;
const PRICE_MAX = 2000000;
const PRICE_STEP = 100000;

const PRICE_FILTER_LABELS = [
	"Tất cả",
	"Dưới 200K",
	"Từ 200K - 500K",
	"Từ 500K - 1 triệu",
	"Từ 1 - 2 triệu",
];

const Product = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	// ===== PAGE =====
	const initialPage = Number(searchParams.get("page") || 1) - 1;
	const [page, setPage] = useState(initialPage < 0 ? 0 : initialPage);

	// ===== CHECKBOX MỨC GIÁ =====
	const [priceChecks, setPriceChecks] = useState(PRICE_FILTER_LABELS.map(() => false));

	const togglePriceCheck = (index) => {
		let newChecks = [...priceChecks];

		if (index === 0) {
			const newVal = !newChecks[0];
			newChecks = newChecks.map(() => newVal);
		} else {
			newChecks[index] = !newChecks[index];
			const allSelected = newChecks.slice(1).every((v) => v === true);
			newChecks[0] = allSelected;
		}

		setPriceChecks(newChecks);
	};

	// ===== SLIDER GIÁ =====
	const initialMin = Number(searchParams.get("minPrice") || 200000);
	const initialMax = Number(searchParams.get("maxPrice") || 1200000);

	const [minPrice, setMinPrice] = useState(Number.isNaN(initialMin) ? 200000 : initialMin);
	const [maxPrice, setMaxPrice] = useState(Number.isNaN(initialMax) ? 1200000 : initialMax);

	const { products, totalPages, total } = useProducts(
		useMemo(
			() => ({
				limit: 20,
				page,
				// có thể truyền minPrice / maxPrice cho BE tại đây
				// minPrice,
				// maxPrice,
			}),
			[page], // + thêm minPrice/maxPrice nếu muốn refetch khi đổi giá
		),
	);

	const formatCurrency = (value) => new Intl.NumberFormat("vi-VN").format(value) + "đ";

	const handleMinChange = (e) => {
		const value = Number(e.target.value);

		if (minPrice === PRICE_MIN && maxPrice === PRICE_MIN && value > PRICE_MIN) {
			setMinPrice(PRICE_MIN);
			setMaxPrice(value);
			return;
		}

		if (minPrice === PRICE_MAX && maxPrice === PRICE_MAX && value < PRICE_MAX) {
			setMinPrice(value);
			setMaxPrice(PRICE_MAX);
			return;
		}

		if (value > maxPrice) {
			setMinPrice(value);
			setMaxPrice(value);
		} else {
			setMinPrice(value);
		}
	};

	const handleMaxChange = (e) => {
		const value = Number(e.target.value);

		if (minPrice === PRICE_MIN && maxPrice === PRICE_MIN && value > PRICE_MIN) {
			setMinPrice(PRICE_MIN);
			setMaxPrice(value);
			return;
		}

		if (minPrice === PRICE_MAX && maxPrice === PRICE_MAX && value < PRICE_MAX) {
			setMinPrice(value);
			setMaxPrice(PRICE_MAX);
			return;
		}

		if (value < minPrice) {
			setMinPrice(value);
			setMaxPrice(value);
		} else {
			setMaxPrice(value);
		}
	};

	const minPercent = ((minPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
	const maxPercent = ((maxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

	const handleTrackClick = (e) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const clickX = e.clientX - rect.left;
		const clickPercent = (clickX / rect.width) * 100;

		let clickValue =
			Math.round(((clickPercent / 100) * (PRICE_MAX - PRICE_MIN)) / PRICE_STEP) * PRICE_STEP +
			PRICE_MIN;

		if (clickValue < PRICE_MIN) clickValue = PRICE_MIN;
		if (clickValue > PRICE_MAX) clickValue = PRICE_MAX;

		const distToMin = Math.abs(clickValue - minPrice);
		const distToMax = Math.abs(clickValue - maxPrice);

		if (distToMin <= distToMax) {
			handleMinChange({ target: { value: clickValue } });
		} else {
			handleMaxChange({ target: { value: clickValue } });
		}
	};

	const handleApply = () => {
		const url = new URL(window.location.href);

		url.searchParams.set("minPrice", String(minPrice));
		url.searchParams.set("maxPrice", String(maxPrice));
		url.searchParams.set("page", String(page + 1));

		window.location.href = url.toString();
	};

	return (
		<BaseLayout>
			<div className="products-container px-[5em]">
				<div className="products-wrapper flex gap-[1em]">
					{/* ==== FILTER SIDE ==== */}
					<div className="product-filter w-[20%] rounded-2xl">
						<div className="filter-container">
							<div className="w-full rounded-2xl bg-[#BF6B57] text-white p-[1em] shadow-md">
								{/* Header */}
								<div className="flex items-center gap-[0.5em] mb-[0.75em]">
									<FilterListIcon />
									<h3 className="text-[0.9375em] font-semibold uppercase tracking-wide">
										Bộ lọc tìm kiếm
									</h3>
								</div>

								{/* Mức giá */}
								<div className="mb-[1.25em]">
									<h4 className="text-[0.8125em] font-bold uppercase pb-[0.5em] opacity-95">
										Mức giá
									</h4>

									<ul className="space-y-[0.5em] text-[0.875em]">
										{PRICE_FILTER_LABELS.map((label, i) => (
											<li key={i} className="flex items-center gap-[0.5em]">
												<input
													type="checkbox"
													checked={priceChecks[i]}
													onChange={() => togglePriceCheck(i)}
													className="size-[1em] rounded-sm border-white/40 bg-transparent accent-white"
												/>
												<span>{label}</span>
											</li>
										))}
									</ul>

									{/* Khoảng giá */}
									<div className="mt-[1em]">
										<p className="text-[0.8125em] mb-[0.5em] opacity-90">
											Hoặc nhập khoảng giá phù hợp với bạn:
										</p>

										{/* Ô hiển thị giá */}
										<div className="flex items-center justify-between gap-[0.5em] mb-[0.75em]">
											<input
												type="text"
												value={formatCurrency(minPrice)}
												readOnly
												className="w-[6.25em] bg-transparent border border-white/40 rounded px-[0.5em] py-[0.2em] text-sm text-white placeholder-white/70 text-center"
											/>
											<span className="text-white">~</span>
											<input
												type="text"
												value={formatCurrency(maxPrice)}
												readOnly
												className="w-[6.25em] bg-transparent border border-white/40 rounded px-[0.5em] py-[0.2em] text-sm text-white placeholder-white/70 text-center"
											/>
										</div>

										{/* Thanh range 2 đầu */}
										<div className="relative w-full h-[1.5em] mt-[0.25em]">
											{/* Track nền (click được) */}
											<div
												className="absolute top-1/2 left-0 w-full h-[0.25em] -translate-y-1/2 bg-white/30 rounded-full cursor-pointer"
												onClick={handleTrackClick}
											/>

											{/* Track vùng chọn */}
											<div
												className="absolute top-1/2 h-[0.25em] -translate-y-1/2 bg-white rounded-full pointer-events-none"
												style={{
													left: `${minPercent}%`,
													width: `${maxPercent - minPercent}%`,
												}}
											/>

											{/* Slider MIN */}
											<input
												type="range"
												min={PRICE_MIN}
												max={PRICE_MAX}
												step={PRICE_STEP}
												value={minPrice}
												onChange={handleMinChange}
												className="absolute w-full appearance-none bg-transparent top-[0.3125em] pointer-events-none"
												style={{ zIndex: 3 }}
											/>

											{/* Slider MAX */}
											<input
												type="range"
												min={PRICE_MIN}
												max={PRICE_MAX}
												step={PRICE_STEP}
												value={maxPrice}
												onChange={handleMaxChange}
												className="absolute w-full appearance-none bg-transparent top-[0.3125em] pointer-events-none"
												style={{ zIndex: 2 }}
											/>
										</div>
									</div>
								</div>

								<div className="mt-4 flex justify-end">
									<Button
										className="w-[100px]"
										sx={{
											backgroundColor: "var(--color-cream-bg)",
											color: "var(--color-card-bg)",
											paddingInline: "0px",
											"&:click": {
												backgroundColor: "var(--color-card-bg)",
											},
											border: "1px solid var(--color-card-thick)",
										}}
										onClick={handleApply}
									>
										Áp dụng
									</Button>
								</div>
							</div>
						</div>
					</div>

					{/* ==== PRODUCT LIST ==== */}
					<div className="product-list w-[80%]">
						<div className="product-items grid grid-cols-1 xl:grid-cols-3 gap-[2em] justify-items-center mb-[2em]">
							{products.map((item, idx) => (
								<CardItem key={idx} item={item} />
							))}
						</div>

						<Pagination
							className="flex justify-center"
							size="large"
							count={totalPages}
							page={page + 1}
							onChange={(e, value) => {
								setPage(value - 1);
								const next = new URLSearchParams(searchParams);
								next.set("page", String(value));
								setSearchParams(next);
							}}
							color="primary"
						/>
					</div>
				</div>
			</div>
		</BaseLayout>
	);
};

export default Product;
