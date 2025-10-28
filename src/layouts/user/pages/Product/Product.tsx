import React from "react";
import BaseLayout from "../../components/BaseLayout";
import CardItem from "../../components/CardItem";
import { Pagination } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

const Product = () => {
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
										{[
											"Tất cả",
											"Dưới 200K",
											"Từ 200K - 500K",
											"Từ 500K - 1 triệu",
											"Từ 1 - 2 triệu",
										].map((label, i) => (
											<li key={i} className="flex items-center gap-[0.5em]">
												<input
													type="checkbox"
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

										{/* Ô nhập giá */}
										<div className="flex items-center justify-between gap-[0.5em] mb-[0.75em]">
											<input
												type="text"
												value="200.000đ"
												readOnly
												className="w-[6.25em] bg-transparent border border-white/40 rounded px-[0.5em] py-[0.2em] text-sm text-white placeholder-white/70 text-center"
											/>
											<span className="text-white">~</span>
											<input
												type="text"
												value="1.200.000đ"
												readOnly
												className="w-[6.25em] bg-transparent border border-white/40 rounded px-[0.5em] py-[0.2em] text-sm text-white placeholder-white/70 text-center"
											/>
										</div>

										{/* Thanh range */}
										<div className="relative w-full h-[1.5em]">
											<input
												type="range"
												min="0"
												max="2000000"
												step="100000"
												defaultValue="200000"
												className="absolute w-full appearance-none bg-transparent pointer-events-none top-[0.3125em]"
												id="range-min"
												style={{ zIndex: 3 }}
											/>
											<input
												type="range"
												min="0"
												max="2000000"
												step="100000"
												defaultValue="1200000"
												className="absolute w-full appearance-none bg-transparent pointer-events-none top-[0.3125em] right-[-2.2em]"
												id="range-max"
												style={{ zIndex: 2 }}
											/>

											{/* Track nền */}
											<div className="absolute top-1/2 left-0 w-full h-[0.25em] -translate-y-1/2 bg-white/30 rounded-full"></div>
											{/* Track vùng chọn */}
											<div className="absolute top-1/2 left-[10%] right-[25%] h-[0.25em] -translate-y-1/2 bg-white rounded-full"></div>
										</div>
									</div>
								</div>

								{/* Màu sắc */}
								<div>
									<h4 className="text-[0.8125em] font-bold uppercase pb-[0.5em] opacity-95">
										Màu sắc
									</h4>
									<ul className="space-y-[0.5em] text-[0.875em]">
										{[
											"Xanh ngọc bích",
											"Vàng đỏ huyền bí",
											"Xanh biển ngọc",
											"Cam rực đỏ sáng",
										].map((label, i) => (
											<li key={i} className="flex items-center gap-[0.5em]">
												<input
													type="checkbox"
													className="size-[1em] rounded-sm border-white/40 bg-transparent accent-white"
												/>
												<span>{label}</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					</div>

					{/* ==== PRODUCT LIST ==== */}
					<div className="product-list w-[80%]">
						<div className="product-description text-[var(--color-card-bg)] text-center mb-[1em]">
							<div className="title uppercase text-[1.5em] font-semibold">
								Vòng tay trà an đính đá
							</div>
							<div className="content mt-[0.5em] leading-relaxed">
								Vòng tay đính đá được xem là một loại trang sức được thiết kế với
								các viên đá quý, hoặc các loại đá lấp lánh được gắn vào mặt vòng
								tay. Các viên đá quý này được chọn lựa cẩn thận để tạo nên sự sang
								trọng, quý phái cho sản phẩm. Những mẫu vòng tay đính đá có thể được
								làm từ các chất liệu như bạc, vàng.
							</div>
						</div>

						<div className="product-items grid grid-cols-1 xl:grid-cols-3 gap-[2em] justify-items-center mb-[2em]">
							{[1, 1, 1, 1, 1, 1].map((item, idx) => (
								<CardItem key={idx} item={item} />
							))}
						</div>

						<Pagination className="flex justify-center" size="large" count={1} />
					</div>
				</div>
			</div>
		</BaseLayout>
	);
};

export default Product;
