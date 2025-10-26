import React from "react";
import { Iframe } from "./Iframe";
import Icon from "../../../components/Icon";
import SocialIcons from "../../../components/SocialIcons";

const FOOTER_ITEM = [
	{
		title: "Hỗ trợ khách hàng",
		content: (
			<div className="">
				<div>
					<a href="dieu-khoan">Điều khoản dịch vụ</a>
				</div>
				<div>
					<a href="faq">Câu hỏi thường gặp</a>
				</div>
				<div>
					<a href="van-chuyen">Chính sách vận chuyển</a>
				</div>
				<div>
					<a href="bao-hanh">Chính sách & bảo hành</a>
				</div>
				<div>
					<a href="thanh-toan">Chính sách thanh toán</a>
				</div>
			</div>
		),
		size_grid: 3,
	},
	{
		title: "Về chúng tôi",
		content: (
			<div className="">
				<div>
					<a href="#">Về trang sức Pancharm</a>
				</div>
				<div>
					<a href="#">Kinh doanh bán sỉ</a>
				</div>
				<div>
					<a href="#">Thông tin liên hệ</a>
				</div>
				<div>
					<a href="#">Cửa hàng online & offline</a>
				</div>
				<div>
					<a href="#">Kết nối với gian hàng</a>
				</div>
			</div>
		),
		size_grid: 2,
	},
];

const Footer = () => {
	const date = new Date();

	return (
		<>
			<div className="footer h-full px-10 mt-15 py-10 border-t-black border-t-1 bg-[var(--color-card-bg)] mb-0">
				<div className="lg:grid grid-cols-12 gap-6">
					<div className="footer-item pb-5" style={{ gridColumn: "span 4 / span 4" }}>
						<div className="flex gap-2 mb-2">
							<div className="logo-icon w-7 h-7 md:w-10 md:h-10 flex justify-center">
								<Icon
									name="pancharm"
									sx={{
										width: "30px",
										height: "30px",
									}}
									color="black"
								/>
							</div>
							<h1 className="cursor-pointer text-lg md:text-2xl leading-[28px] uppercase text-[var(--color-cream-bg)]">
								Pancharm
							</h1>
						</div>
						<div className="footer-item-content text-sm leading-relaxed text-[var(--color-cream-bg)]">
							<div>
								<div className="leading-[28px]">
									<span className="font-semibold">Điện thoại: </span>
									<a href="to:0971516201">097 151 6201</a>
									&nbsp;-&nbsp;
									<a href="to:0971516201">097 151 6201</a>
								</div>
								<div className="leading-[28px]">
									<span className="font-semibold">Gmail: </span>
									<span>
										<a href="mailto:vietphan565@gmail.com">
											vietphan565@gmail.com
										</a>
									</span>
								</div>
								<div className="leading-[28px]">
									<span className="font-semibold">Địa chỉ: </span>
									<span>
										<a>92 Đặng Thùy Trâm, Phường Bình Lợi Trung, TP.HCM</a>
									</span>
								</div>
								<div className="leading-[28px]">
									<span className="font-semibold">Giờ làm việc: </span>
									<span>
										<a>8h00 - 17h30</a>
									</span>
								</div>
								<div className="leading-[28px]">
									<SocialIcons></SocialIcons>
								</div>
							</div>
						</div>
					</div>
					{FOOTER_ITEM.map((item, idx) => (
						<div
							key={idx}
							className="footer-item pb-5"
							style={{
								gridColumn: `span ${item.size_grid || 3} / span ${item.size_grid || 3}`,
							}}
						>
							<div className="footer-item-title font-semibold mb-3 uppercase">
								{item.title}
							</div>
							<div className="footer-item-content text-sm leading-[24px]">
								{item.content}
							</div>
						</div>
					))}

					<div className="footer-item pb-5" style={{ gridColumn: "span 3 / span 3" }}>
						<div className="footer-item-title font-semibold mb-3 uppercase">
							Fanpage Pancharm
						</div>
						<div className="footer-item-content text-sm leading-relaxed bg-[var(--color-cream-soft)]">
							<Iframe
								src="https://www.facebook.com/pancharm.official"
								title="Pancharm"
								allowFullScreen
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="copyright-wrapper h-[30px] bg-[var(--color-card-thick)]">
				<div className="leading-[30px]">
					<div className="text-center text-[14px] font-normal text-[var(--color-cream-bg)]">
						Copyright © {date.getFullYear()} vietphan565@gmail.com. Designed by
						Pancharm
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
