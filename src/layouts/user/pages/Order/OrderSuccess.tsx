import React, { useEffect, useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import { Link, useLocation } from "react-router-dom";
import { formatPhoneVN, formatVND } from "../../../../utils/helper";
import { Order } from "../../../../api/orderService";

const OrderSuccess = () => {
	const location = useLocation() as {
		state?: {
			item?: {
				order: Order | null;
			};
		};
	};

	const order = location.state?.item?.order;
	sessionStorage.removeItem("carts");

	return (
		<BaseLayout>
			<div className="min-h-[80vh] bg-[var(--color-cream-bg,#faf7f2)] text-[var(--color-card-bg,#2b2b2b)] flex items-center justify-center p-6">
				<div className="w-full max-w-3xl">
					{/* Card */}
					<div className="relative bg-white/90 backdrop-blur rounded-2xl shadow-lg overflow-hidden">
						{/* Top ribbon */}
						<div className="h-2 bg-gradient-to-r from-amber-300 via-pink-300 to-emerald-300" />

						{/* Header */}
						<div className="px-6 sm:px-10 pt-8 pb-4 text-center">
							<div className="mx-auto mb-5 flex items-center justify-center">
								<span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100">
									<svg
										viewBox="0 0 24 24"
										aria-hidden="true"
										className="w-7 h-7 fill-emerald-700"
									>
										<path d="M20.285 6.709a1 1 0 0 0-1.57-1.246l-8.03 10.13-3.4-3.4a1 1 0 1 0-1.414 1.414l4.2 4.2a1 1 0 0 0 1.52-.09l8.694-11.008z" />
									</svg>
								</span>
							</div>

							<h1 className="text-2xl sm:text-3xl font-bold tracking-wide">
								Cảm ơn bạn đã gửi yêu cầu thanh toán!
							</h1>

							<p className="mt-3 text-base sm:text-lg leading-relaxed text-black/70">
								Đơn hàng của bạn đã được ghi nhận. Pancharm sẽ liên hệ để xác nhận
								và hoàn tất trong thời gian sớm nhất.
								<span className="ml-1 inline-flex align-middle">
									<svg
										viewBox="0 0 24 24"
										aria-hidden="true"
										className="w-5 h-5 fill-emerald-600"
									>
										<path d="M20.73 3.27C15.46 2.7 11.3 4.3 8.1 7.5 5.6 10 4.2 13.17 4 16.9c-.02.37.29.68.66.66 3.73-.2 6.9-1.6 9.4-4.1 3.2-3.2 4.8-7.36 4.23-12.19-.03-.27-.25-.49-.52-.52zM6 20c4.97 0 9-4.03 9-9 0-.55-.45-1-1-1s-1 .45-1 1c0 3.86-3.14 7-7 7-.55 0-1 .45-1 1s.45 1 1 1z" />
									</svg>
								</span>
							</p>
						</div>

						{/* Order summary */}
						<div className="px-6 sm:px-10 py-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-black/5">
							<div className="rounded-xl border border-black/10 p-4">
								<div className="text-xs uppercase tracking-wider text-black/50">
									Mã đơn
								</div>
								<div className="mt-1 font-semibold">{order?.slug}</div>
							</div>
							<div className="rounded-xl border border-black/10 p-4">
								<div className="text-xs uppercase tracking-wider text-black/50">
									Tổng tiền
								</div>
								<div className="mt-1 font-semibold">{formatVND(order?.totalPrice || 0)}đ</div>
							</div>
						</div>

						{/* Tips / status */}
						<div className="px-6 sm:px-10 py-5 border-t border-black/5">
							<div className="flex items-start gap-3">
								<svg
									viewBox="0 0 24 24"
									aria-hidden="true"
									className="w-5 h-5 mt-0.5 fill-pink-500"
								>
									<path d="M12 2l1.6 4.3L18 8l-4.4 1.7L12 14l-1.6-4.3L6 8l4.4-1.7L12 2zm7 9l.9 2.4L22 14l-2.1.6L19 17l-.9-2.4L16 14l2.1-.6L19 11zM5 15l.8 2.1L8 18l-2.2.9L5 21l-.8-2.1L2 18l2.2-.9L5 15z" />
								</svg>
								<p className="text-sm sm:text-base leading-relaxed text-black/70">
									<span className="font-semibold">Gợi ý nhỏ:</span> Giữ điện thoại
									để ý cuộc gọi hoặc tin nhắn xác nhận từ đội ngũ Pancharm. Nếu
									cần hỗ trợ nhanh, bạn có thể liên hệ ngay bên dưới.
								</p>
							</div>
						</div>

						{/* Actions */}
						<div className="px-6 sm:px-10 py-6 border-t border-black/5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
							<div className="flex items-center gap-3 text-sm">
								<span className="inline-flex w-9 h-9 rounded-full bg-sky-100 items-center justify-center">
									<svg
										viewBox="0 0 24 24"
										aria-hidden="true"
										className="w-5 h-5 fill-sky-700"
									>
										<path d="M20 4H4a2 2 0 0 0-2 2v.2l10 6.3 10-6.3V6a2 2 0 0 0-2-2zm0 4.3l-9.4 5.9a1 1 0 0 1-1.2 0L4 8.3V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.3z" />
									</svg>
								</span>
								<div>
									<div className="font-semibold">Hỗ trợ khách hàng</div>
									<div>
										<a
											href={`tel:0971516201`}
											className="underline"
											style={{
												color: "var(--color-card-light)",
											}}
										>
											{formatPhoneVN("0971516201")}
										</a>
									</div>
								</div>
							</div>

							<div className="flex gap-3">
								{/* <Link
									to={"/orders"}
									className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[var(--color-card-bg,#2b2b2b)] text-[var(--color-cream-bg)] hover:opacity-90 transition"
								>
									Xem đơn hàng
								</Link> */}
								<Link
									to={"/"}
									className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-white border border-[var(--color-card-bg)] hover:bg-black/5 transition"
									style={{
										color: "var(--color-card-bg)",
									}}
								>
									Về trang chủ
								</Link>
							</div>
						</div>
					</div>

					{/* subtle footer note */}
					<p className="text-center text-sm text-black/50 mt-4">
						Chúc bạn một ngày an lành và nhiều năng lượng tích cực ✨
					</p>
				</div>
			</div>
		</BaseLayout>
	);
};

export default OrderSuccess;
