import React, { useEffect, useMemo, useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import FormInput from "../../../../components/FormInput";
import OrderItem from "../../components/OrderItem";
import { formatVND } from "../../../../utils/helper";
import { Button } from "@mui/material";
import Icon from "../../../../components/Icon";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchData, Product } from "../../../../api/productService";
import { DEFAULT_ORDER, Order as OrderObject } from "../../../../api/orderService";
import { DEFAULT_SHIPPING_ADDRESS, ShippingAddress } from "../../../../api/shippingAddressService";
import { useSnackbar } from "../../../../contexts/SnackbarProvider";

const selectOpts = [
	{ id: "vtp", name: "ViettelPost" },
	{ id: "njv", name: "NinjaVan" },
	{ id: "spx", name: "SPX" },
	{ id: "ghn", name: "GHN" },
];

const paymentOpts = [
	// { id: "ttdt", name: "Qua cổng thanh toán điện tử" },
	// { id: "card", name: "Visa, mastercard" },
	{ id: "cknh", name: "Chuyển khoản ngân hàng" },
	// { id: "tttt", name: "Thanh toán khi nhận hàng" },
];

const Order = () => {
	const navigate = useNavigate();
	const { showSnackbar } = useSnackbar();

	// ---- Get state from previous page ----
	const location = useLocation() as {
		state?: {
			mode?: "buy-now" | "cart";
			item?: { productId: number; quantity?: number };
			items?: Array<{ productId: number; quantity?: number }>;
		};
	};

	const [products, setProducts] = useState<Product[]>([]);
	const [itemConfig, setItemConfig] = useState<Array<{ id: number; quantity: number }>>([]);

	useEffect(() => {
		const mode = location.state?.mode;
		if (mode === "buy-now" && location.state?.item) {
			const { productId, quantity } = location.state.item;
			setItemConfig([{ id: Number(productId), quantity: Number(quantity ?? 1) }]);
		} else if (location.state?.items?.length) {
			setItemConfig(
				location.state.items.map((it) => ({
					id: Number(it.productId),
					quantity: Number(it.quantity ?? 1),
				})),
			);
		} else {
			setItemConfig([]);
		}

		const note = (location.state as any)?.note;
		if (note) {
			setFormOrder((prev) => ({ ...prev, description: note }));
		}
	}, [location.state]);

	const ids = useMemo(() => itemConfig.map((i) => i.id).filter(Boolean), [itemConfig]);
	const query = useMemo(() => ({ limit: ids.length || 0, ids }), [ids]);

	useEffect(() => {
		if (!ids.length) {
			setProducts([]);
			return;
		}
		let mounted = true;
		fetchData(query)
			.then((res) => {
				const content: Product[] = res?.result?.content ?? [];
				if (mounted) setProducts(content);
			})
			.catch((err) => console.error("Error fetching data:", err?.message || err));
		return () => {
			mounted = false;
		};
	}, [query, ids.length]);

	// ---- Calculate amount ----
	const qtyMap = useMemo(() => {
		const m: Record<number, number> = {};
		for (const it of itemConfig) m[it.id] = it.quantity ?? 1;
		return m;
	}, [itemConfig]);

	const totalAmount = useMemo(() => {
		return products.reduce((sum, p) => {
			const q = qtyMap[p.id as number] ?? 0;
			const price = Number(p.unitPrice ?? 0);
			return sum + price * q;
		}, 0);
	}, [products, qtyMap]);

	// ---- Handle form data ----
	const [formOrder, setFormOrder] = useState<OrderObject>(DEFAULT_ORDER);
	const [formShippingAddress, setFormShippingAddress] =
		useState<ShippingAddress>(DEFAULT_SHIPPING_ADDRESS);

	// ---- Handle submit form ----
	const onSubmit = async () => {
		const okName = validateFormInput(formShippingAddress.recipientName, "tên người mua");
		if (!okName) return;

		const okAddress = validateFormInput(formShippingAddress.address, "địa chỉ");
		if (!okAddress) return;

		const okProvince = validateFormInput(formShippingAddress.province, "thành phố");
		if (!okProvince) return;

		const okPhone = validateFormInput(
			formShippingAddress.phoneNumber,
			"số điện thoại người mua",
		);
		if (!okPhone) return;

		const items = products.map((p) => {
			const q = qtyMap[p.id as number] ?? 1;
			const price = Number(p.unitPrice ?? 0);

			return {
				productId: p.id as number,
				quantity: q,
				unitPrice: price,
			};
		});

		const payload: OrderObject = {
			...formOrder,
			totalPrice: totalAmount,
			shippingAddress: formShippingAddress,
			items,
		};

		navigate("/orders/payment", {
			state: {
				payload: payload,
			},
		});
	};

	const validateFormInput = (field: any, key: string) => {
		if (typeof field == "string" && field.trim() === "") {
			showSnackbar({
				message: "Vui lòng nhập " + key,
				severity: "error",
			});
			return false;
		}

		return true;
	};

	// ---- Style sheet for page ----
	const titleStyle = "uppercase font-bold mb-4 text-xl";

	return (
		<BaseLayout>
			<div className="mx-20 flex gap-20 text-[var(--color-card-bg)]">
				<div className="left-panel w-[50%] gap-2 grid grid-cols-1">
					<div className="order-shipping-container">
						<div className={`order-shipping-title ${titleStyle}`}>Giao hàng</div>
						<div className="order-info">
							{/* <FormInput
								type="checkbox"
								label="Sử dụng thông tin của bạn đã thêm trong cài đặt"
								name="use_setting"
							></FormInput> */}
							<div className="order-form-input w-[60%]">
								<FormInput
									type="text"
									label="Họ và tên"
									name="name"
									value={formShippingAddress.recipientName}
									onChange={(e) =>
										setFormShippingAddress({
											...formShippingAddress,
											recipientName: e,
										})
									}
									required
								></FormInput>
								<FormInput
									type="text"
									label="Địa chỉ"
									name="address"
									value={formShippingAddress.address}
									onChange={(e) =>
										setFormShippingAddress({
											...formShippingAddress,
											address: e,
										})
									}
									required
								></FormInput>
								<FormInput
									type="text"
									label="Thành phố"
									name="city"
									value={formShippingAddress.province}
									onChange={(e) =>
										setFormShippingAddress({
											...formShippingAddress,
											province: e,
										})
									}
									required
								></FormInput>
								<FormInput
									type="text"
									label="Số điện thoại"
									name="phone"
									value={formShippingAddress.phoneNumber}
									onChange={(e) =>
										setFormShippingAddress({
											...formShippingAddress,
											phoneNumber: e,
										})
									}
									required
								></FormInput>
								<FormInput
									type="textarea"
									label="Ghi chú"
									name="description"
									value={formOrder.description}
									onChange={(e) => setFormOrder({ ...formOrder, description: e })}
								></FormInput>
							</div>
						</div>
					</div>

					{/* <div className="shipping-method-container">
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
					</div> */}
				</div>

				<div className="right-panel w-[50%]">
					<div className="order-preview-container">
						<div className={`order-preview-title ${titleStyle}`}>Sản phẩm</div>
						<div className="order-preview-wrapper w-[90%] max-h-[200px] overflow-y-auto thin-scrollbar pr-4 mb-4">
							{products.map((item, idx) => {
								var selectedItem = itemConfig.find((s: any) => {
									if (s.id !== item.id) {
										return;
									}
									return s;
								});

								var defaultImage = item?.productImages?.find((i: any) => {
									if (!i.isDefault) {
										return;
									}
									return i;
								});

								return (
									<OrderItem
										key={idx}
										imageUrl={defaultImage?.path || "/cart/DSC02707.jpeg"}
										price={item.unitPrice}
										quantity={selectedItem?.quantity}
										title={item.name}
										className="mt-2"
									></OrderItem>
								);
							})}
						</div>
						{/* <div className="order-discount">
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
						</div> */}

						<div className="order-total">
							<span className="">Vận chuyển: Miễn phí</span>
							<div className="order-total-wrapper font-semibold">
								<span>Tổng tiền đơn hàng: {formatVND(totalAmount)}đ</span>
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
								onClick={onSubmit}
							>
								{/* <Link
									href="#"
									underline="none"
									sx={{
										color: "var(--color-cream-bg)",
										"&:hover": {
											color: "var(--color-cream-bg-hover)",
										},
									}}
								> */}
								<div className="relative text-[var(--color-cream-bg)] hover:text-[var(--color-cream-bg-hover)]">
									<span className="uppercase font-semibold">Thanh toán ngay</span>
									<span className="absolute right-[10px]">
										<Icon name="cart"></Icon>
									</span>
								</div>
								{/* </Link> */}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</BaseLayout>
	);
};

export default Order;
