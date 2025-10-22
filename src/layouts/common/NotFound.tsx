import React from "react";
import BaseLayout from "../user/components/BaseLayout";
import { Link, Navigate } from "react-router-dom";
import Icon from "../../components/Icon";

const NotFound = () => {
	return (
		<>
			<BaseLayout>
				{/* <Navigate to="/not-found" replace /> */}
				<div className="min-h-100 flex flex-col items-center justify-center bg-gradient-to-b from-[#fdfcfb] to-[#e2d1c3] text-gray-700 text-center p-6">
					<div className="flex flex-col items-center space-y-4">
						<div className="flex items-center justify-center space-x-2">
							<Icon name="sparkles" />
							<h1 className="text-4xl font-semibold tracking-wide px-2">
								Trang không tồn tại
							</h1>
							<Icon name="sparkles" />
						</div>

						<p className="max-w-md text-base leading-relaxed text-gray-600">
							Có lẽ bạn vừa bước nhầm sang một chiều không gian khác — nơi năng lượng
							chưa được khai mở{" "}
							<span className="inline-block align-[-0.6em] text-amber-500">
								<Icon name="inlineSparkle" className="w-4 h-4" />
							</span>
							. Hãy quay lại và để Pancharm dẫn bạn về những món đá mang tần số dành
							riêng cho mình nhé.
						</p>

						<Link
							to="/"
							className="mt-6 inline-flex items-center gap-2 rounded-full border border-transparent 
                            bg-gradient-to-b from-[#f6b750] to-[#e69a20] text-white font-medium px-6 py-2 
                            shadow-[0_4px_10px_rgba(230,155,32,0.4)] hover:shadow-[0_6px_14px_rgba(230,155,32,0.55)] 
                            hover:from-[#f8c15a] hover:to-[#e8a42a] 
                            transition-all duration-300 no-underline hover:-translate-y-[1px] active:translate-y-[1px]"
						>
							<Icon name="leaf" className="w-4 h-4" />
							Trở về trang chủ
						</Link>
					</div>
				</div>
			</BaseLayout>
		</>
	);
};

export default NotFound;
