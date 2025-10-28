import React from "react";
import BaseLayout from "../../components/BaseLayout";
import FormInput from "../../../../components/FormInput";
import OrderItem from "../../components/OrderItem";
import { formatVND } from "../../../../utils/helper";
import MoneyDisplay from "../../../../components/MoneyDisplay";
import { Button, Link } from "@mui/material";
import Icon from "../../../../components/Icon";

const selectOpts = [
	{ id: "vtp", name: "ViettelPost" },
	{ id: "njv", name: "NinjaVan" },
	{ id: "spx", name: "SPX" },
	{ id: "ghn", name: "GHN" },
];

const paymentOpts = [
	{ id: "ttdt", name: "Qua cổng thanh toán điện tử" },
	{ id: "card", name: "Visa, mastercard" },
	{ id: "cknh", name: "Chuyển khoản ngân hàng" },
	{ id: "tttt", name: "Thanh toán khi nhận hàng" },
];

const Order = () => {
	const titleStyle = "uppercase font-bold mb-4 text-xl";

	return (
		<BaseLayout>
			<div className="mx-20 flex gap-20 text-[var(--color-card-bg)]">
				<div className="left-panel w-[50%] gap-2 grid grid-cols-1">
					<div className="order-shipping-container">
						<div className={`order-shipping-title ${titleStyle}`}>Giao hàng</div>
						<div className="order-info">
							<FormInput
								type="checkbox"
								label="Sử dụng thông tin của bạn đã thêm trong cài đặt"
								name="use_setting"
							></FormInput>
							<div className="order-form-input w-[60%]">
								<FormInput type="text" label="Họ và tên" name="name"></FormInput>
								<FormInput type="text" label="Địa chỉ" name="name"></FormInput>
								<FormInput type="text" label="Thành phố" name="name"></FormInput>
								<FormInput
									type="text"
									label="Số điện thoại"
									name="name"
								></FormInput>
							</div>
						</div>
					</div>

					<div className="shipping-method-container">
						<div className={`shipping-method-title ${titleStyle}`}>
							Phương thức vận chuyển
						</div>
						<div className="shipping-selection w-[25%]">
							<FormInput
								type="select"
								name="shipping_address"
								options={selectOpts}
							></FormInput>
						</div>
					</div>
				</div>

				<div className="right-panel w-[50%]">
					<div className="order-preview-container">
						<div className={`order-preview-title ${titleStyle}`}>Sản phẩm</div>
						<div className="order-preview-wrapper w-[90%] h-[200px] overflow-y-auto thin-scrollbar pr-4 mb-4">
							{[1, 1].map((item) => (
								<OrderItem
									imageUrl="/cart/DSC02707.jpeg"
									price={2000000}
									quantity={1}
									title="Vòng tay đá phong thủy cao cấp"
									className="mt-2"
								></OrderItem>
							))}
						</div>
						<div className="order-discount">
							<div className="flex justify-start gap-4">
								<div className="discount-input w-[75%]">
									<FormInput
										type="text"
										label="Mã giảm giá hoặc thẻ quà tặng"
										name="discount_code"
									></FormInput>
								</div>
								<div className="discount-btn w-[15%]">
									<Button
										sx={{
											color: "var(--color-cream-bg)",
											backgroundColor: "var(--color-card-bg)",
											"&:hover": {
												color: "var(--color-cream-bg-hover)",
												backgroundColor: "var(--color-card-bg-hover)",
											},
										}}
									>
										<span className="font-semibold normal-case leading-[30px]">
											Áp dụng
										</span>
									</Button>
								</div>
							</div>
						</div>

						<div className="order-total">
							<span className="">Vận chuyển: Miễn phí</span>
							<div className="order-total-wrapper font-semibold">
								<span>Tổng tiền đơn hàng: 4.000.000đ</span>
							</div>
						</div>
					</div>
					<div className="order-payment-container mt-5">
						<div className={`order-payment-title ${titleStyle}`}>Thanh toán</div>
						<div className="order-payment-method w-[75%]">
							<FormInput
								type="select"
								name="payment_method"
								options={paymentOpts}
							></FormInput>
							<Button
								className="shop-now"
								sx={{
									backgroundColor: "var(--color-card-bg)",
									"&:hover": {
										backgroundColor: "var(--color-card-bg-hover)",
									},
									width: "100%",
								}}
							>
								<Link
									href="#"
									underline="none"
									sx={{
										color: "var(--color-cream-bg)",
										"&:hover": {
											color: "var(--color-cream-bg-hover)",
										},
									}}
								>
									<div className="relative">
										<span className="uppercase font-semibold">
											Thanh toán ngay
										</span>
										<span className="absolute right-[10px]">
											<Icon name="cart"></Icon>
										</span>
									</div>
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</BaseLayout>
	);
};

export default Order;
