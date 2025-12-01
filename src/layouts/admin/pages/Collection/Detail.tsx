import React from "react";
import FieldDisplay from "../../../../components/FieldDisplay";
import Icon from "../../../../components/Icon";
import { Collection } from "../../../../api/collectionService";
import SwipeSlider from "../../../user/components/SwipeSlider";

interface DetailProps {
	object: Collection;
}

const Detail = ({ object }: DetailProps) => {
	const collectionImages = object.collectionImages || [];
	let slides = collectionImages.map((img) => {
		return {
			kind: "image",
			src: img.path,
			content: `Collection Image ${img.id}`,
		};
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
							label="Tên danh mục"
							value={object?.name || ""}
							icon={<Icon name="catName" />}
							inline
						></FieldDisplay>
						<FieldDisplay
							label="Mã danh mục"
							value={object?.slug || ""}
							icon={<Icon name="catSlug" />}
							inline
						></FieldDisplay>
					</div>

					{/* List Products */}
					{object.products && object.products.length > 0 && (
						<>
							<div
								className="sep mr-6"
								style={{
									borderColor: "#f0f0f0",
									marginBlock: "0.5em",
									marginBottom: "1em",
								}}
							></div>
							<div className="label-content uppercase text-xl font-medium">
								Danh sách sản phẩm
							</div>

							<div className="product-list"></div>
						</>
					)}
				</div>
				<div className="image-preview w-[40%] mr-3">
					<SwipeSlider showThumbs width="30rem" height="40rem" slides={slides} />
				</div>
			</div>
		</>
	);
};

export default Detail;
