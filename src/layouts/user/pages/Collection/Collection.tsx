import React, { useEffect, useState } from "react";
import Card from "./Card/Card";
import BaseLayout from "../../components/BaseLayout";
import { Collection as CollectionObject, getDefaultCollections } from "../../../../api/collectionService";
import { CollectionImage } from "../../../../api/collectionImageService";

const COLECTION_OPTS = [
	{ id: "bst_vong_da", name: "BST Vòng đá phong thủy", src: "/collection/01.jpeg" },
	{ id: "bst_vong_da", name: "BST Vòng đá phong thủy", src: "/collection/02.JPG" },
	{ id: "bst_vong_tra_an", name: "BST Vòng trà an", src: "/collection/03.jpg" },
	{ id: "bst_vong_da", name: "BST Vòng đá phong thủy", src: "/collection/04.JPG" },
];

const Collection = () => {
	const [collections, setCollections] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCollections = async () => {
			try {
				const res = await getDefaultCollections();

				if (res?.code === 1 && res?.result) {
					setCollections(res.result);
				} else {
					setCollections([]);
				}
			} catch (error) {
				console.error("Failed to fetch collections:", error);
				setCollections([]);
			} finally {
				setLoading(false);
			}
		};

		fetchCollections();
	}, []);

	const dataToRender = collections.length > 0 ? collections : [];

	return (
		<BaseLayout>
			<div className="collection-container">
				<div className="collection-wrapper">
					<div className="collection-list flex justify-center">
						<div className="grid xl:grid-cols-2 lg:grid-cols-1 gap-5">
							{dataToRender.length > 0 ? (
								dataToRender.map((item: CollectionObject, idx: number) => {
									const defaultImage = item?.collectionImages?.find(
										(item: CollectionImage) => {
											if (item.isDefault) return item.path;
											return null;
										},
									);

									if (defaultImage) {
										item.src = defaultImage.path;
									}
									return (
										<Card
											item={item}
											key={idx}
											path={`products?collectionId=${item.id}`}
										></Card>
									);
								})
							) : (
								<div className="col-span-2 flex flex-col items-center justify-center py-16">
									<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#BF6B57]/10">
										<span className="text-3xl">📿</span>
									</div>
									<h2 className="mb-2 text-lg font-semibold text-[#3F2A26]">
										Hiện chưa có bộ sưu tập nào
									</h2>
									<p className="mb-4 max-w-md text-center text-sm text-gray-500">
										Shop đang sắp xếp lại các BST vòng đá & charm. Bạn có thể
										ghé trang sản phẩm để xem toàn bộ mẫu hiện có nhé.
									</p>
									<a
										href="/products"
										className="inline-flex items-center rounded-full border border-[#BF6B57]/40 bg-[var(--color-card-bg)] px-5 py-2 text-sm font-medium text-[#BF6B57] shadow-sm hover:bg-[#BF6B57] hover:text-white transition-colors"
									>
										Xem tất cả sản phẩm
									</a>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</BaseLayout>
	);
};

export default Collection;
