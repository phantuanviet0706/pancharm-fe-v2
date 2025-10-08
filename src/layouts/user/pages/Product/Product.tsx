import React from "react";
import BaseLayout from "../../components/BaseLayout";
import CardItem from "../../components/CardItem";

const Product = () => {
	return (
		<BaseLayout>
			<div className="flex justify-center gap-10 flex-wrap">
				{[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item) => (
					<CardItem></CardItem>
				))}
			</div>
		</BaseLayout>
	);
};

export default Product;
