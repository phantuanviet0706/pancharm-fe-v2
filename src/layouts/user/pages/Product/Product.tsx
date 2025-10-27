import React from "react";
import BaseLayout from "../../components/BaseLayout";
import CardItem from "../../components/CardItem";
import { Pagination } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { FormInput } from "lucide-react";

const Product = () => {
	return (
		<BaseLayout>
			<div className="products-container px-20">
				<div className="products-wrapper flex gap-4">
					<div className="product-filter w-[20%] rounder-2xl ">
						<div className="filter-container">
							<div className="w-[260px] rounded-2xl bg-[#BF6B57] text-white p-4 shadow-md">
								{/* Header */}
								<div className="flex items-center gap-2 mb-3">
									<FilterListIcon />
									<h3 className="text-[15px] font-semibold uppercase tracking-wide">
										Bộ lọc tìm kiếm
									</h3>
								</div>

								{/* Mức giá */}
								<div className="mb-5">
									<h4 className="text-[13px] font-bold uppercase pb-2 opacity-95">
										Mức giá
									</h4>
									<ul className="space-y-2 text-[14px]">
										{[
											"Tất cả",
											"Dưới 200K",
											"Từ 200K - 500K",
											"Từ 500K - 1 triệu",
											"Từ 1 - 2 triệu",
										].map((label, i) => (
											<li key={i} className="flex items-center gap-2">
												<input
													type="checkbox"
													className="size-4 rounded-sm border-white/40 bg-transparent accent-white"
												/>
												<span>{label}</span>
											</li>
										))}
									</ul>

									{/* Khoảng giá */}
									<div className="mt-4">
										<p className="text-[13px] mb-2 opacity-90">
											Hoặc nhập khoảng giá phù hợp với bạn:
										</p>

										{/* Ô nhập giá */}
										<div className="flex items-center justify-between gap-2 mb-3">
											<input
												type="text"
												value="200.000đ"
												readOnly
												className="w-[100px] bg-transparent border border-white/40 rounded px-2 py-[3px] text-sm text-white placeholder-white/70 text-center"
											/>
											<span className="text-white">~</span>
											<input
												type="text"
												value="1.200.000đ"
												readOnly
												className="w-[100px] bg-transparent border border-white/40 rounded px-2 py-[3px] text-sm text-white placeholder-white/70 text-center"
											/>
										</div>

										{/* Thanh range 2 đầu */}
										<div className="relative w-full h-6">
											<input
												type="range"
												min="0"
												max="2000000"
												step="100000"
												defaultValue="200000"
												className="absolute w-full appearance-none bg-transparent pointer-events-none top-[5px]"
												id="range-min"
												style={{ zIndex: 3 }}
											/>
											<input
												type="range"
												min="0"
												max="2000000"
												step="100000"
												defaultValue="1200000"
												className="absolute w-full appearance-none bg-transparent pointer-events-none top-[5px] right-[-35px]"
												id="range-max"
												style={{ zIndex: 2 }}
											/>

											{/* Track nền */}
											<div className="absolute top-1/2 left-0 w-full h-[4px] -translate-y-1/2 bg-white/30 rounded-full"></div>
											{/* Track vùng chọn */}
											<div className="absolute top-1/2 left-[10%] right-[25%] h-[4px] -translate-y-1/2 bg-white rounded-full"></div>
										</div>
									</div>
								</div>

								{/* Màu sắc */}
								<div>
									<h4 className="text-[13px] font-bold uppercase pb-2 opacity-95">
										Màu sắc
									</h4>
									<ul className="space-y-2 text-[14px]">
										{[
											"Xanh ngọc bích",
											"Vàng đỏ huyền bí",
											"Xanh biển ngọc",
											"Cam rực đỏ sáng",
										].map((label, i) => (
											<li key={i} className="flex items-center gap-2">
												<input
													type="checkbox"
													className="size-4 rounded-sm border-white/40 bg-transparent accent-white"
												/>
												<span>{label}</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					</div>

					<div className="product-list w-[80%]">
						<div className="product-description text-[var(--color-card-bg)] text-center mb-4">
							<div className="title uppercase text-2xl font-semibold">
								Vòng tay trà an đính đá
							</div>
							<div className="content mt-2">
								Vòng tay đính đá được xem là một loại trang sức được thiết kế với
								các viên đá quý, hoặc các loại đá lấp lánh được gắn vào mặt vòng
								tay. Các viên đá quý này được chọn lựa cẩn thận để tạo nên sự sang
								trọng, quý phái cho sản phẩm. Những mẫu vòng tay đính đá có thể được
								làm từ các chất liệu như bạc, vàng.
							</div>
						</div>
						<div className="product-items grid grid-cols-3 gap-[2em] justify-items-center mb-8">
							{[1, 1, 1, 1, 1, 1].map((item) => (
								<CardItem item={item}></CardItem>
							))}
						</div>
						<Pagination
							className="flex justify-center"
							size="large"
							count={1}
						></Pagination>
					</div>
				</div>
			</div>
		</BaseLayout>
	);
};

export default Product;
