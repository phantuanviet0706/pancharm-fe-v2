import React, { useContext } from "react";
import { Iframe } from "./Iframe";
import Icon from "../../../components/Icon";
import SocialIcons from "../../../components/SocialIcons";
import { ConfigContext } from "../../../contexts/ConfigProvider";
import { formatPhoneVN } from "../../../utils/helper";
import { parseConfig } from "../../../utils/company";

const FOOTER_ITEM = [
	{
		title: "Hỗ trợ khách hàng",
		content: (
			<div className="">
				<div>
					<a href="#">Điều khoản dịch vụ</a>
				</div>
				<div>
					<a href="#">Câu hỏi thường gặp</a>
				</div>
				<div>
					<a href="#">Chính sách vận chuyển</a>
				</div>
				<div>
					<a href="#">Chính sách & bảo hành</a>
				</div>
				<div>
					<a href="#">Chính sách thanh toán</a>
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
	const { state: APP_CONFIG } = useContext(ConfigContext);
	const company = APP_CONFIG?.company || {};

	const date = new Date();

	const config = parseConfig(company?.config);
	const subPhoneNumber = config?.subPhone || null;

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
									color="var(--color-cream-bg)"
								/>
							</div>
							<h1 className="cursor-pointer text-lg md:text-2xl leading-[28px] uppercase text-[var(--color-cream-bg)]">
								{company?.name}
							</h1>
						</div>
						<div className="footer-item-content text-sm leading-relaxed text-[var(--color-cream-bg)]">
							<div>
								<div className="leading-[28px]">
									<span className="font-semibold">Điện thoại: </span>
									<a href={`tel:${company?.phone}`}>
										{formatPhoneVN(company?.phone)}
									</a>
									{subPhoneNumber && (
										<>
											&nbsp;-&nbsp;
											<a href={`tel:${subPhoneNumber}`}>
												{formatPhoneVN(subPhoneNumber)}
											</a>
										</>
									)}
								</div>
								<div className="leading-[28px]">
									<span className="font-semibold">Gmail: </span>
									<span>
										<a href={`mailto:${company?.email}`}>{company?.email}</a>
									</span>
								</div>
								<div className="leading-[28px]">
									<span className="font-semibold">Địa chỉ: </span>
									<span>
										<a>{company?.address}</a>
									</span>
								</div>
								{/* <div className="leading-[28px]">
									<span className="font-semibold">Giờ làm việc: </span>
									<span>
										<a>8h00 - 17h30</a>
									</span>
								</div> */}
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
