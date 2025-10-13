import React from "react";
import { Button } from "@mui/material";
import BaseLayout from "../../../../components/BaseLayout";
import SwipeSlider from "../../components/SwipeSlider";

const ProductDetail = () => {
	return (
		<BaseLayout>
			<div className="flex justify-center gap-5">
				<div>
					<SwipeSlider showThumbs width="40rem" height="30rem" thumbPosition="left"/>
				</div>
				<div>
					<div>
						<div></div>
						<div></div>
					</div>
					<div>
						<div>
							<div></div>
							<Button>Thêm vào giỏ hàng</Button>
						</div>
						<Button>Mua ngay</Button>
					</div>
				</div>
			</div>
		</BaseLayout>
	);
};

export default ProductDetail;
