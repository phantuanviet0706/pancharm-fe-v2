import React from "react";
import Card from "./Card/Card";
import BaseLayout from "../../components/BaseLayout";

const COLECTION_OPTS = [
	{ id: "bst_vong_da", name: "BST Vòng đá phong thủy", src: "public/collection/01.jpeg" },
	{ id: "bst_vong_da", name: "BST Vòng đá phong thủy", src: "public/collection/02.JPG" },
	{ id: "bst_vong_tra_an", name: "BST Vòng trà an", src: "public/collection/03.jpg" },
	{ id: "bst_vong_da", name: "BST Vòng đá phong thủy", src: "public/collection/04.JPG" },
];

const Collection = () => {
	return (
		<BaseLayout>
			<div className="collection-container">
				<div className="collection-wrapper">
					<div className="collection-list flex justify-center">
						<div className="grid grid-cols-2 gap-5">
							{COLECTION_OPTS.map((item) => (
								<Card
									item={item}
								></Card>
							))}
						</div>
					</div>
				</div>
			</div>
		</BaseLayout>
	);
};

export default Collection;
