import React, { useEffect, useState } from "react";
import Card from "./Card/Card";
import BaseLayout from "../../components/BaseLayout";
import { CollectionObject, getDefaultCollections } from "../../../../api/collectionService";
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
						<div className="grid grid-cols-2 gap-5">
							{dataToRender.map((item: CollectionObject, idx: number) => {
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
							})}
						</div>
					</div>
				</div>
			</div>
		</BaseLayout>
	);
};

export default Collection;
