import React from "react";
import { Iframe } from "./Iframe";

const FOOTER_ITEM = [
	{
		title: "Chăm sóc khách hàng",
		content: (
			<div className="">
				<div>
					<a href="huong-dan-thanh-toan">Hướng dẫn thanh toán</a>
				</div>
				<div>
					<a href="giao-hang">Giao hàng</a>
				</div>
				<div>
					<a href="chinh-sach-bao-hanh">Chính sách bảo hành</a>
				</div>
				<div>
					<a href="chinh-sach-doi-tra">Chính sách đổi trả</a>
				</div>
				<div>
					<a href="bang-gia-dieu-chinh">Bảng giá phí điều chỉnh sản phẩm</a>
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
					<a href="#">Câu chuyện của Pancharm</a>
				</div>
			</div>
		),
		size_grid: 2,
	},
];

const Footer = () => {
	return (
		<div className="footer h-full px-10 mt-15 pt-5 border-t-black border-t-1">
			<div className="lg:grid grid-cols-12 gap-6">
				<div className="footer-item pb-5" style={{ gridColumn: "span 4 / span 4" }}>
					<div className="footer-item-title font-semibold mb-3 uppercase">
						Kết nối với chúng tôi
					</div>
					<div className="footer-item-content text-sm leading-relaxed">
						<div>
							<div>
								HELIOS tạo ra những chế tác độc đáo dành cho những người đàn ông
								trưởng thành, dám thay đổi, dám khác biệt và tôn thờ sự tự do ngay
								cả trong tâm hồn. Mỗi chế tác đều có tinh thần riêng biệt, được làm
								thủ công từ đôi bàn tay thuần Việt với mong muốn đưa các tác phẩm
								vươn tầm thế giới.
							</div>
							<div>
								Hotline hỗ trợ:{" "}
								<span>
									<a href="tel:0971516201">097.151.6201</a>
								</span>
							</div>
							<div>
								Email:{" "}
								<span>
									<a href="mailto:vietphan565@gmail.com">vietphan565@gmail.com</a>
								</span>
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
						<div className="footer-item-content text-sm leading-relaxed">
							{item.content}
						</div>
					</div>
				))}

				<div className="footer-item pb-5" style={{ gridColumn: "span 3 / span 3" }}>
					<div className="footer-item-title font-semibold mb-3 uppercase">
						Fanpage
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
	);
};

export default Footer;
