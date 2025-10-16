import React from "react";
import { Button } from "@mui/material";
import BaseLayout from "../../../../components/BaseLayout";
import SwipeSlider from "../../components/SwipeSlider";
import InputNumber from "../../../../components/InputNumber";
import ProgressBar from "../../../../components/ProgressBar";
import DetailSection from "../../../../components/DetailSection";

const ProductDetail = () => {
	return (
		<BaseLayout>
			<div className="xl:flex justify-between gap-5 px-10">
				<div className="product-images">
					<SwipeSlider showThumbs width="55rem" height="35rem" />
				</div>
				<div
					className="product-basic-info p-8"
					style={{
						width: "30rem",
					}}
				>
					<div className="text-[var(--color-card-bg)]">
						<div className="uppercase font-bold text-2xl pb-4">
							Vòng tay thiên vi lắc bạc ngọc bích xanh
						</div>
						<div className="flex text-xl font-semibold pl-1">1,000,000đ</div>
					</div>
					<div className="mt-8">
						<ProgressBar quantity={10} max={100} width={"full"}></ProgressBar>
					</div>
					<div className="pt-8">
						<div className="flex justify-between gap-10">
							<div>
								<InputNumber min={1} max={100} initial={1} />
							</div>
							<Button
								sx={{
									border: "1px solid var(--color-text-light)",
									width: "20em",
									background: "white",
									color: "var(--color-card-bg)",
									"&:hover": {
										background: "#eee",
										borderColor: "var(--color-card-light)",
									},
								}}
							>
								Thêm vào giỏ hàng
							</Button>
						</div>
						<div className="mt-5">
							<Button
								sx={{
									width: "100%",
									height: "3.5em",
									border: "1px solid var(--color-text-light)",
									background: "var(--color-card-bg)",
									color: "white",
									"&:hover": {
										background: "var(--color-card-light)",
									},
								}}
							>
								Mua ngay
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div className="product-detail px-20 text-[var(--color-card-bg)]">
				<div className="product-detail-title uppercase text-center text-2xl font-semibold">
					Thông tin sản phẩm
				</div>
				<DetailSection>
					<section className="description-content expanded mt-10">
						<div className="space-y-4 leading-relaxed text-base">
							<p className="whitespace-pre-line">
								<span className="font-semibold">Tên sản phẩm</span>
								<span>: Ontario Lotus Helios Black Silver</span>
								{"\n\n"}
								<span className="font-semibold">Chất liệu</span>
								<span>: Bạc S925</span>
								{"\n\n"}
								<span className="font-semibold">Loại đá sử dụng</span>
								<span>: Không</span>
								{"\n\n"}
								<span className="font-semibold">Thương hiệu</span>
								<span>: HELIOS</span>
								{"\n\n"}
								<span className="font-semibold">Dòng sản phẩm</span>
								<span>
									: Helios Black Silver
									{"\n\n"}
									Helios Black Silver là hạng cao nhất trong các dòng sản phẩm của
									Helios. Các chế tác thuộc dòng này có hàm lượng bạc lớn, đòi hỏi
									độ tỉ mỉ, cầu kỳ cao hơn bất cứ sản phẩm nào khác, do vậy số
									lượng có thể sản xuất cũng rất hạn chế. Bên cạnh đó, các chế tác
									Helios Black Silver cũng được đóng gói trong những bao bì đặc
									biệt, hoàn toàn khác so với dòng sản phẩm thông thường.
								</span>
								{"\n\n"}
								<span className="font-semibold">Bảo hành</span>
								<span>
									: Theo chính sách bảo hành và nhận đánh sáng sản phẩm trọn đời
								</span>
							</p>
						</div>

						<div className="mt-8 text-left">
							<h3 className="text-amber-400 font-semibold tracking-wide">
								ĐẰNG SAU MỖI CHẾ TÁC LUÔN LÀ MỘT CÂU CHUYỆN RIÊNG BIỆT…
							</h3>

							<p className="mt-4 leading-relaxed">
								Hồ Ontario thuộc một trong Ngũ Đại Hồ, nằm ở khu vực Bắc Mỹ. Nơi đây
								được mệnh danh là kho báu sinh học sống, với hệ sinh thái cực kỳ đa
								dạng.
								<br />
								<br />
								Chế tác mang tên địa danh này - Nhẫn bạc Ontario, được ra mắt cùng
								BST Lotus. Các chế tác khác trong BST này cũng đều được đặt tên theo
								những hồ nổi tiếng thế giới. Từng chiếc nhẫn, vòng tay, dây chuyền
								đều mang trong mình câu chuyện và vẻ đẹp riêng biệt của từng hồ, với
								ý nghĩa hoa sen sẽ xuất hiện và sinh tồn ở khắp nơi.
							</p>

							<p className="mt-4 italic text-neutral-300">
								Khi được trao đến tay khách hàng, sản phẩm mang sứ mệnh kể tiếp câu
								chuyện cùng chủ nhân của nó. Vậy, câu chuyện của bạn là gì?
							</p>

							<img
								src="https://cdn.shopify.com/s/files/1/0644/2958/8701/files/1_8fa23769-ece7-404d-9b21-8ea52551925a_600x600.jpg?v=1722844354"
								alt="Ontario Lotus Helios Black Silver - ảnh sản phẩm"
								className="mx-auto my-6 block max-w-full rounded-lg"
							/>
						</div>

						<div className="mt-8 text-left">
							<h3 className="text-amber-400 font-semibold tracking-wide">
								TỪ BÀN TAY THỦ CÔNG ĐẾN NHỮNG THÀNH PHẨM TINH XẢO…
							</h3>
							<p className="mt-4 leading-relaxed">
								Mỗi một sản phẩm bạc tại Helios đều là kết quả của quá trình chế tác
								thủ công kỹ lưỡng, tỉ mỉ và trau chuốt trước khi đến tay khách hàng.
							</p>
							<p className="mt-3 leading-relaxed">
								Khi chọn cách hoàn thiện thủ công, Helios hoàn toàn lường trước được
								việc thành phẩm sẽ không thể đồng nhất 100% từng chi tiết một như
								khi sản xuất công nghiệp bằng máy móc. Song, đây lại là điểm đặc
								biệt nhất, khi mỗi sản phẩm được hoàn thiện đều được ‘cá nhân hoá’
								cho mỗi khách hàng.
							</p>
							<p className="mt-3 italic text-neutral-300">
								Với mỗi chế tác được hoàn thiện, Helios hy vọng đó sẽ là kỷ niệm
								riêng của mỗi người đeo.
							</p>

							<img
								src="https://cdn.shopify.com/s/files/1/0644/2958/8701/files/ANH_XUONG_-_BST_HOA_SEN_2_600x600.jpg?v=1723609839"
								alt="Ảnh xưởng - BST Hoa Sen"
								className="mx-auto my-6 block max-w-full rounded-lg"
							/>
						</div>

						<div className="mt-8 text-left">
							<h3 className="text-amber-400 font-semibold tracking-wide">
								NHỮNG ‘CÂU CHUYỆN’ TẠO RA TỪ CHẤT LIỆU ĐI CÙNG NĂM THÁNG
							</h3>
							<p className="mt-4 leading-relaxed">
								Với các dòng trang sức bạc, Helios sử dụng bạc S925 - một chất liệu
								bền và có tính thẩm mỹ cao. Các sản phẩm với chất liệu này sẽ đi
								cùng năm tháng, đồng hành cùng khách hàng trên mọi khoảnh khắc, mọi
								chặng đường.
							</p>
							<p className="mt-3 leading-relaxed">
								Đối với các chế tác có đá, chúng tôi sử dụng đa số là đá bán quý, có
								đặc trưng tự nhiên như các vân sóng, đốm màu riêng biệt, tạo ra tính
								độc bản cho từng sản phẩm.
							</p>
							<p className="mt-3 italic text-neutral-300">
								Mỗi hành trình đều mang yếu tố cá nhân, có ký ức riêng, câu chuyện
								riêng. Hơn hết, những hành trình ấy đều cần một ‘hành trang' thật sự
								bền vững.
							</p>

							<img
								src="https://cdn.shopify.com/s/files/1/0644/2958/8701/files/ontario-lotus-helios-black-silver_3_600x600.jpg?v=1722844454"
								alt="Ontario Lotus Helios Black Silver - cận cảnh chế tác"
								className="mx-auto my-6 block max-w-full rounded-lg"
							/>
						</div>

						<div className="mt-8 text-left">
							<h3 className="text-amber-400 font-semibold tracking-wide">
								CÁI NHÌN TRẦM ỔN, NAM TÍNH VÀ ĐẦY CHIÊM NGHIỆM
							</h3>
							<p className="mt-4 leading-relaxed">
								Với Helios, ‘tốt gỗ' và ‘tốt nước sơn' là 02 yếu tố bắt buộc song
								song.
							</p>
							<p className="mt-3 leading-relaxed">
								Sự khác biệt trong màu xi của Helios với đa số thương hiệu là điều
								chúng tôi luôn tự hào. Không hướng tới một cái nhìn quá ‘mới', quá
								‘hào nhoáng', Helios sử dụng nước xi đen như một ‘lớp phủ thời
								gian', để ngay khoảnh khắc cầm lên sản phẩm, khách hàng có thể cảm
								nhận được tinh thần trầm ổn, mạnh mẽ và đầy trải nghiệm.
							</p>
							<p className="mt-3 italic text-neutral-300">
								Mọi thứ đều có thể bị mai một, có thể thay mới trong từng giai đoạn
								cuộc đời. Song những gì thuộc về hồi ức, về trải nghiệm cá nhân thì
								không thể thay đổi.
							</p>

							<img
								src="https://cdn.shopify.com/s/files/1/0644/2958/8701/files/ontario-lotus-helios-black-silver-mau_600x600.jpg?v=1722844492"
								alt="Ontario Lotus Helios Black Silver - phối màu xi đen"
								className="mx-auto my-6 block max-w-full rounded-lg"
							/>
						</div>

						<div className="mt-8 text-left">
							<h3 className="text-amber-400 font-semibold tracking-wide">
								PACKAGING ĐẶC BIỆT CHỨA ĐỰNG NHỮNG CÂU CHUYỆN ĐẶC BIỆT
							</h3>
							<p className="mt-4 leading-relaxed">
								Trải nghiệm sản phẩm của khách hàng bắt đầu từ bao bì. Hiểu được
								điều này, Helios luôn chú trọng đến việc thiết kế và tối ưu hoá
								packaging sản phẩm.
							</p>
							<p className="mt-3 leading-relaxed">
								Chúng tôi liên tục phát triển và làm mới bao bì sản phẩm từ 1-2 lần
								mỗi năm, nhằm đảm bảo rằng trải nghiệm unbox của khách hàng luôn đầy
								phấn khích và hấp dẫn.
							</p>
							<p className="mt-3 italic text-neutral-300">
								Với những sản phẩm có câu chuyện đặc biệt riêng, packaging cũng sẽ
								được tùy chỉnh để thể hiện tinh thần riêng của những chế tác bên
								trong.
							</p>
							<p className="mt-2 italic text-amber-400">
								(LƯU Ý: Packaging bên dưới chỉ áp dụng cho đơn hàng có giá trị trên
								1.500K)
							</p>

							<img
								src="https://cdn.shopify.com/s/files/1/0644/2958/8701/files/hop-black-silver_3_600x600.jpg?v=1740973733"
								alt="Hộp Black Silver - packaging đặc biệt"
								className="mx-auto my-6 block max-w-full rounded-lg"
							/>
						</div>
					</section>
				</DetailSection>
			</div>
		</BaseLayout>
	);
};

export default ProductDetail;
