import React from "react";
import FieldDisplay from "../../../../components/FieldDisplay";
import Icon from "../../../../components/Icon";
import SwipeSlider from "../../../user/components/SwipeSlider";
import { Product } from "../../../../api/productService";
import NoImage from "../Common/NoImage";
import { formatVND } from "../../../../utils/helper";
import { ProductStatusVariable } from "../../../../constants/productStatus";
import DOMPurify from "dompurify";

interface DetailProps {
	object: Product;
}

const Detail = ({ object }: DetailProps) => {
	const productImages = object.productImages || [];
	let slides = productImages.map((img) => {
		return {
			kind: "image",
			src: img.path,
			content: `Product Image ${img.id}`,
		};
	});

	let status = ProductStatusVariable().map((status) => {
		if (status.value === object.status) {
			return status.name;
		}
	});

	return (
		<>
			<div className="object-detail w-full flex">
				<div className="w-[60%] h-fit">
					{/* Common Info */}
					<div className="label-content uppercase text-xl font-medium mb-4">
						Thông tin chung
					</div>
					<div className="grid grid-cols-1 gap-4">
						<FieldDisplay
							label="Tên sản phẩm"
							value={object?.name || ""}
							icon={<Icon name="prodName" />}
							inline
						></FieldDisplay>
						<FieldDisplay
							label="Mã sản phẩm"
							value={object?.slug || ""}
							icon={<Icon name="prodSlug" />}
							inline
						></FieldDisplay>
						<FieldDisplay
							label="Trạng thái sản phẩm"
							value={status || ""}
							icon={<Icon name="prodStatus" />}
							inline
						></FieldDisplay>
						<FieldDisplay
							label="Danh mục sản phẩm"
							value={object.categoryName || ""}
							icon={<Icon name="prodCategory" />}
							inline
						></FieldDisplay>
						<FieldDisplay
							label="Đơn giá"
							value={formatVND(object?.unitPrice || 0)}
							icon={<Icon name="prodPrice" />}
							inline
						></FieldDisplay>

						<FieldDisplay
							label="Mô tả sản phẩm"
							value={DOMPurify.sanitize(object.description || "")}
							icon={<Icon name="prodDesc" />}
						></FieldDisplay>
					</div>
				</div>
				<div className="image-preview w-[40%] mr-3">
					{slides.length > 0 ? (
						<SwipeSlider showThumbs width="30rem" height="40rem" slides={slides} />
					) : (
						<NoImage />
					)}
				</div>
			</div>
		</>
	);
};

export default Detail;
