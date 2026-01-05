import React, { useMemo, useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import CardItem from "../../components/CardItem";
import { Button, Pagination } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useProducts } from "../../../../hooks/useProducts";
import { useSearchParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

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

// mapping từng label -> khoảng giá
const PRICE_FILTER_RANGES = [
	null, // "Tất cả"
	{ min: 0, max: 200000 }, // Dưới 200K
	{ min: 200000, max: 500000 }, // Từ 200K - 500K
	{ min: 500000, max: 1000000 }, // Từ 500K - 1 triệu
	{ min: 1000000, max: 2000000 }, // Từ 1 - 2 triệu
];

const Product = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	// ===== PAGE =====
	const initialPage = Number(searchParams.get("page") || 1) - 1;
	const [page, setPage] = useState(initialPage < 0 ? 0 : initialPage);

	// ===== PARAM LOẠI / BỘ SƯU TẬP TỪ URL =====
	const categoryIdParam = searchParams.get("categoryId");
	const collectionIdParam = searchParams.get("collectionId");
	const keywordParam = searchParams.get("keyword");

	// ===== CHECKBOX MỨC GIÁ (init từ URL nếu có) =====
	const buildInitialPriceChecks = () => {
		const checks = PRICE_FILTER_LABELS.map(() => false);
		const param = searchParams.get("priceRanges"); // vd: "0-200000,200000-500000"

		if (!param) return checks;

		const rangesFromUrl = param.split(",");
		rangesFromUrl.forEach((r) => {
			const [minStr, maxStr] = r.split("-");
			const min = Number(minStr);
			const max = Number(maxStr);

			PRICE_FILTER_RANGES.forEach((range, idx) => {
				if (!range || checks[idx]) return;
				if (range.min === min && range.max === max) {
					checks[idx] = true;
				}
			});
		});

		// nếu tất cả các khoảng (1..n) đều true -> bật "Tất cả"
		const allSelected = checks.slice(1).every((v) => v === true);
		if (allSelected) checks[0] = true;

		return checks;
	};

	const [priceChecks, setPriceChecks] = useState(buildInitialPriceChecks);

	const togglePriceCheck = (index: number) => {
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

	// ===== SLIDER GIÁ (UI) =====
	const initialMin = Number(searchParams.get("unitPriceFrom") || 200000);
	const initialMax = Number(searchParams.get("unitPriceTo") || 1200000);

	const [unitPriceFrom, setUnitPriceFrom] = useState(
		Number.isNaN(initialMin) ? 200000 : initialMin,
	);
	const [unitPriceTo, setUnitPriceTo] = useState(Number.isNaN(initialMax) ? 1200000 : initialMax);

	// ===== PARAM GỬI CHO BE (từ URL, không từ state) =====
	const priceRangesParam = searchParams.get("priceRanges") || "";
	const unitPriceFromParam = searchParams.get("unitPriceFrom");
	const unitPriceToParam = searchParams.get("unitPriceTo");

	const { products, totalPages, total } = useProducts(
		useMemo(() => {
			const params: any = {
				limit: 20,
				page,
				priceRanges: priceRangesParam,
			};

			// chỉ gắn vào request nếu URL thật sự có
			if (unitPriceFromParam) {
				params.unitPriceFrom = Number(unitPriceFromParam);
			}
			if (unitPriceToParam) {
				params.unitPriceTo = Number(unitPriceToParam);
			}

			// ✅ thêm filter category / collection nếu có
			if (categoryIdParam) {
				params.categoryId = categoryIdParam;
			}
			if (collectionIdParam) {
				params.collectionId = collectionIdParam;
			}

			if (keywordParam) {
				params.keyword = keywordParam;
			}

			return params;
		}, [
			page,
			priceRangesParam,
			unitPriceFromParam,
			unitPriceToParam,
			categoryIdParam,
			collectionIdParam,
		]),
	);

	const formatCurrency = (value: number) => new Intl.NumberFormat("vi-VN").format(value) + "đ";

	const handleMinChange = (e: any) => {
		const value = Number(e.target.value);

		if (unitPriceFrom === PRICE_MIN && unitPriceTo === PRICE_MIN && value > PRICE_MIN) {
			setUnitPriceFrom(PRICE_MIN);
			setUnitPriceTo(value);
			return;
		}

		if (unitPriceFrom === PRICE_MAX && unitPriceTo === PRICE_MAX && value < PRICE_MAX) {
			setUnitPriceFrom(value);
			setUnitPriceTo(PRICE_MAX);
			return;
		}

		if (value > unitPriceTo) {
			setUnitPriceFrom(value);
			setUnitPriceTo(value);
		} else {
			setUnitPriceFrom(value);
		}
	};

	const handleMaxChange = (e: any) => {
		const value = Number(e.target.value);

		if (unitPriceFrom === PRICE_MIN && unitPriceTo === PRICE_MIN && value > PRICE_MIN) {
			setUnitPriceFrom(PRICE_MIN);
			setUnitPriceTo(value);
			return;
		}

		if (unitPriceFrom === PRICE_MAX && unitPriceTo === PRICE_MAX && value < PRICE_MAX) {
			setUnitPriceFrom(value);
			setUnitPriceTo(PRICE_MAX);
			return;
		}

		if (value < unitPriceFrom) {
			setUnitPriceFrom(value);
			setUnitPriceTo(value);
		} else {
			setUnitPriceTo(value);
		}
	};

	const minPercent = ((unitPriceFrom - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
	const maxPercent = ((unitPriceTo - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

	const handleTrackClick = (e: any) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const clickX = e.clientX - rect.left;
		const clickPercent = (clickX / rect.width) * 100;

		let clickValue =
			Math.round(((clickPercent / 100) * (PRICE_MAX - PRICE_MIN)) / PRICE_STEP) * PRICE_STEP +
			PRICE_MIN;

		if (clickValue < PRICE_MIN) clickValue = PRICE_MIN;
		if (clickValue > PRICE_MAX) clickValue = PRICE_MAX;

		const distToMin = Math.abs(clickValue - unitPriceFrom);
		const distToMax = Math.abs(clickValue - unitPriceTo);

		if (distToMin <= distToMax) {
			handleMinChange({ target: { value: clickValue } });
		} else {
			handleMaxChange({ target: { value: clickValue } });
		}
	};

	// ✅ Áp dụng: cập nhật URL (từ state) → BE đọc từ URL param
	const handleApply = () => {
		const next = new URLSearchParams(searchParams);

		// 1. Ghi unitPriceFrom/unitPriceTo vào URL
		next.set("unitPriceFrom", String(unitPriceFrom));
		next.set("unitPriceTo", String(unitPriceTo));

		// 2. Ghi priceRanges từ state checkbox
		const activeRanges: string[] = [];
		priceChecks.forEach((checked, idx) => {
			if (!checked || idx === 0) return; // bỏ "Tất cả"
			const range = PRICE_FILTER_RANGES[idx];
			if (!range) return;
			activeRanges.push(`${range.min}-${range.max}`);
		});

		if (activeRanges.length > 0) {
			next.set("priceRanges", activeRanges.join(","));
		} else {
			next.delete("priceRanges");
		}

		// reset page về 1 khi đổi filter
		next.set("page", "1");
		setSearchParams(next);
		setPage(0);
	};

	const handleReset = () => {
		// reset state checkbox
		setPriceChecks(PRICE_FILTER_LABELS.map(() => false));

		// reset slider về default (UI)
		setUnitPriceFrom(200000);
		setUnitPriceTo(1200000);

		// xoá params liên quan filter khỏi URL
		const next = new URLSearchParams(searchParams);
		next.delete("priceRanges");
		next.delete("unitPriceFrom");
		next.delete("unitPriceTo");
		next.set("page", "1");

		setSearchParams(next);
		setPage(0);
	};

	const [isFilterOpen, setIsFilterOpen] = useState(false);

	return (
		<BaseLayout>
			<div className="products-container px-[5em]">
				{products.length > 0 && (
					<button
						onClick={() => setIsFilterOpen(true)}
						className="xl:hidden w-full flex items-center justify-center gap-2 bg-[#BF6B57] text-white py-3 rounded-xl mb-6 shadow-lg font-bold"
					>
						<FilterListIcon />
						BỘ LỌC TÌM KIẾM
					</button>
				)}
				<div className="products-wrapper flex gap-[1em]">
					{/* ==== FILTER SIDE ==== */}
					<div className="hidden xl:block product-filter w-[20%] rounded-2xl">
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
												value={formatCurrency(unitPriceFrom)}
												readOnly
												className="w-[6.25em] bg-transparent border border-white/40 rounded px-[0.5em] py-[0.2em] text-sm text-white placeholder-white/70 text-center"
											/>
											<span className="text-white">~</span>
											<input
												type="text"
												value={formatCurrency(unitPriceTo)}
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
												value={unitPriceFrom}
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
												value={unitPriceTo}
												onChange={handleMaxChange}
												className="absolute w-full appearance-none bg-transparent top-[0.3125em] pointer-events-none"
												style={{ zIndex: 2 }}
											/>
										</div>
									</div>
								</div>

								<div className="mt-4 flex justify-between">
									<Button
										className="w-[100px]"
										variant="outlined"
										sx={{
											borderColor: "var(--color-cream-bg)",
											color: "var(--color-cream-bg)",
											paddingInline: "0px",
										}}
										onClick={handleReset}
									>
										Khôi phục
									</Button>
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
					<div className="product-list w-[100%] xl:w-[80%]">
						{products.length > 0 ? (
							<>
								<div className="product-items grid grid-cols-1 xl:grid-cols-3 gap-[2em] justify-center justify-items-center mb-[2em]">
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
							</>
						) : (
							<>
								<div className="flex flex-col items-center justify-center text-center py-[4em] px-[2em] bg-[var(--color-cream-soft)]/20 rounded-2xl shadow-sm border border-[var(--color-cream-soft)]/40">
									<div className="text-[3em] mb-[0.3em] opacity-60">🔍</div>
									<h3 className="text-[1.125em] font-semibold text-[var(--color-card-thick)] mb-[0.5em]">
										Không tìm thấy sản phẩm phù hợp
									</h3>
									<p className="text-[0.95em] text-[var(--color-card-bg)] max-w-[26em] leading-relaxed">
										Hãy thử thay đổi bộ lọc hoặc chọn một mức giá khác để xem
										thêm nhiều sản phẩm hơn nhé.
									</p>
								</div>
							</>
						)}
					</div>
				</div>

				<div
					className={`fixed inset-0 z-[999] transition-all ${isFilterOpen ? "visible" : "invisible"}`}
				>
					{/* Nền đen */}
					<div
						className={`absolute inset-0 bg-black/50 transition-opacity ${isFilterOpen ? "opacity-100" : "opacity-0"}`}
						onClick={() => setIsFilterOpen(false)}
					/>

					{/* Nội dung popup */}
					<div
						className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 transition-transform duration-300 ${isFilterOpen ? "translate-y-0" : "translate-y-full"}`}
					>
						{/* Thanh handle nhỏ ở trên cùng (cái gạch ngang trong ảnh của bạn) */}
						<div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

						<div className="flex justify-between items-center mb-6">
							<h2 className="text-lg font-bold text-[#BF6B57]">Bộ lọc sản phẩm</h2>
							<button
								onClick={() => setIsFilterOpen(false)}
								className="p-1 bg-gray-100 rounded-full"
							>
								<CloseIcon />
							</button>
						</div>

						{/* QUAN TRỌNG: Thêm vùng chứa cuộn nếu bộ lọc dài */}
						<div className="max-h-[70vh] overflow-y-auto">
							<div className="filter-container">
								<div className="w-full rounded-2xl bg-[#BF6B57] text-white p-[1em] shadow-md">
									{/* Mức giá */}
									<div className="mb-[1.25em]">
										<h4 className="text-[0.8125em] font-bold uppercase pb-[0.5em] opacity-95">
											Mức giá
										</h4>

										<ul className="space-y-[0.5em] text-[0.875em]">
											{PRICE_FILTER_LABELS.map((label, i) => (
												<li
													key={i}
													className="flex items-center gap-[0.5em]"
												>
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
													value={formatCurrency(unitPriceFrom)}
													readOnly
													className="w-[6.25em] bg-transparent border border-white/40 rounded px-[0.5em] py-[0.2em] text-sm text-white placeholder-white/70 text-center"
												/>
												<span className="text-white">~</span>
												<input
													type="text"
													value={formatCurrency(unitPriceTo)}
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
													value={unitPriceFrom}
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
													value={unitPriceTo}
													onChange={handleMaxChange}
													className="absolute w-full appearance-none bg-transparent top-[0.3125em] pointer-events-none"
													style={{ zIndex: 2 }}
												/>
											</div>
										</div>
									</div>

									<div className="mt-4 flex justify-between">
										<Button
											className="w-[100px]"
											variant="outlined"
											sx={{
												borderColor: "var(--color-cream-bg)",
												color: "var(--color-cream-bg)",
												paddingInline: "0px",
											}}
											onClick={handleReset}
										>
											Khôi phục
										</Button>
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
					</div>
				</div>
			</div>
		</BaseLayout>
	);
};

export default Product;
