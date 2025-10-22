import React from "react";
import BaseLayout from "../../components/BaseLayout";
import FormInput from "../../../../components/FormInput";
import OrderItem from "../../components/OrderItem";
import { formatVND } from "../../../../utils/helper";
import MoneyDisplay from "../../../../components/MoneyDisplay";

const Order = () => {
	return (
		<BaseLayout>
			<div className="mx-20 flex gap-10">
				<div className="left-panel w-[50%]">
					<FormInput type="text" label="Tên" name="name"></FormInput>
					<FormInput type="int" label="Số nguyên" name="numI"></FormInput>
					<FormInput type="float" label="Số thập phân" name="numF"></FormInput>
					<FormInput type="date" label="Ngày" name="date"></FormInput>
					<FormInput type="datetime" label="Ngày và giờ" name="datetime"></FormInput>
					<FormInput type="checkbox" label="Hộp kiểm" name="checkbox"></FormInput>
					<FormInput type="radio" label="Button" name="radio"></FormInput>
					<FormInput type="color" label="Màu" name="color"></FormInput>
					<FormInput type="file" label="File" name="file"></FormInput>
					<FormInput type="hidden" label="Ẩn" name="hidden"></FormInput>
				</div>

				<div className="sep" />

				<div className="right-panel w-[50%] relative">
					<div className="sticky top-[150px]">
						<div className="order-preview">
							<OrderItem
								imageUrl="https://cdn.shopify.com/s/files/1/0644/2958/8701/files/ontario-lotus-helios-black-silver_3_128x128.jpg?v=1754845293"
								price={12312}
								quantity={2}
								title="Vòng tay bạc"
							></OrderItem>
						</div>
						<div className="order-total mt-5 ml-2">
							<div className="total-price flex justify-between">
								<div className="label">Tổng phụ</div>
								<div className="content">
									<span>1.000.000</span>
									<span>đ</span>
								</div>
							</div>
							<div className="shipping-price flex justify-between">
								<div className="label">Vận chuyển</div>
								<div className="content">
									<span>Miễn phí</span>
								</div>
							</div>
							<div className="total-final flex justify-between">
								<div className="label">Tổng</div>
								<div className="content">
									<MoneyDisplay price={1000000}></MoneyDisplay>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</BaseLayout>
	);
};

export default Order;
