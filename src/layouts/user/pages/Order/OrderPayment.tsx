import React, { useContext } from "react";
import { createOrder, Order } from "../../../../api/orderService";
import { useLocation, useNavigate } from "react-router-dom";
import BaseLayout from "../../components/BaseLayout";
import { Button } from "@mui/material";
import { ConfigContext } from "../../../../contexts/ConfigProvider";
import { parseBankConfig } from "../../../../utils/company";

const OrderPayment = () => {
	const navigate = useNavigate();

	// ---- Setup global state config ----
	const { state: APP_CONFIG } = useContext(ConfigContext);
	const company = APP_CONFIG?.company;

	const location = useLocation() as {
		state?: {
			payload?: Order;
		};
	};

	const payload = location.state?.payload ?? null;

	const onSubmit = async () => {
		const res = await handleSubmit(payload);
		if (res?.code === 1 && res?.result) {
			navigate("/orders/success", {
				state: {
					item: {
						order: res?.result || null,
					},
				},
			});
		}
	};

	const handleSubmit = async (payload: any) => {
		try {
			const res = await createOrder(payload);
			return res;
		} catch (err: any) {
			return { code: -1, message: err?.response?.data?.message || err.message };
		}
	};

	const bankInfo = parseBankConfig(company?.bankConfig);

	let bankInfoHtml = null;

	if (bankInfo) {
		bankInfoHtml = `${bankInfo.bankName} - ${bankInfo?.bankAccountHolder} - ${bankInfo.bankNumber}`;
	}

	return (
		<BaseLayout>
			<div className="w-full max-w-[800px] mx-auto rounded-2xl p-6 md:p-8 bg-[var(--color-cream-bg)] text-[var(--color-card-bg)] shadow-lg">
				<h2 className="text-xl md:text-2xl font-bold mb-4 uppercase tracking-wide text-center">
					Thông tin chuyển khoản
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-[260px,1fr] gap-6 mb-6 items-start">
					<div className="w-full max-w-[260px] mx-auto border border-[var(--color-card-bg)] rounded-xl overflow-hidden bg-white">
						<img
							src={company?.bankAttachment}
							alt="Mã QR / Thông tin chuyển khoản"
							className="w-full h-full object-contain"
						/>
					</div>

					<div className="flex flex-col gap-3 text-sm md:text-base leading-relaxed">
						<p>
							💫 Vui lòng <b>quét mã QR</b> hoặc{" "}
							<b>chuyển khoản theo thông tin bên cạnh</b>:
							<br/>
							<span>{bankInfoHtml}</span>
						</p>
						<p>
							✅ <b>Nội dung chuyển khoản</b>: ghi theo cú pháp{" "}
							<span className="font-semibold italic">
								&quot;Họ tên - SĐT - Đặt vòng Pancharm&quot;
							</span>
							.
						</p>
						<p>
							⏱ Sau khi chuyển khoản thành công, nhấn nút{" "}
							<b>&quot;Xác nhận đã chuyển khoản&quot;</b> bên dưới để shop tiến hành
							xử lý đơn.
						</p>
						<p className="italic text-xs md:text-sm text-[var(--color-sub-text,#8a5a4a)]">
							Lưu ý: Nếu sau 10–15 phút chưa thấy đơn được xác nhận, bạn có thể inbox
							fanpage của shop kèm hình ảnh giao dịch để được hỗ trợ nhanh
							hơn.
						</p>
					</div>
				</div>

				<div className="flex justify-between gap-3 mt-4">
					<Button
						variant="outlined"
						sx={{
							borderColor: "var(--color-card-bg)",
							color: "var(--color-card-bg)",
							"&:hover": {
								borderColor: "var(--color-card-bg-hover)",
								backgroundColor: "transparent",
								color: "var(--color-card-bg-hover)",
							},
							textTransform: "none",
							fontWeight: 600,
							paddingInline: "1.75rem",
						}}
					>
						Quay lại trang chủ
					</Button>

					<Button
						variant="contained"
						onClick={onSubmit}
						sx={{
							backgroundColor: "var(--color-card-bg)",
							"&:hover": {
								backgroundColor: "var(--color-card-bg-hover)",
							},
							textTransform: "none",
							fontWeight: 600,
							paddingInline: "1.75rem",
							color: "var(--color-cream-bg)",
						}}
					>
						Xác nhận đã chuyển khoản
					</Button>
				</div>
			</div>
		</BaseLayout>
	);
};

export default OrderPayment;
